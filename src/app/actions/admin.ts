'use server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-access';
import { accountActionError } from '@/lib/admin-policy';

export type AdminActionState = { success: boolean; message: string } | null;
const schema = z.object({
  userId: z.string().min(1).max(100),
  action: z.enum(['DEACTIVATE', 'ACTIVATE', 'REVOKE_SESSIONS']),
  updatedAt: z.iso.datetime(),
  reason: z.string().trim().min(5, 'Indica un motivo de al menos 5 caracteres.').max(500),
});

export async function manageUser(_state: AdminActionState, form: FormData): Promise<AdminActionState> {
  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };
  try {
    const actor = await getCurrentUser();
    if (!actor || actor.role !== 'ADMIN') return { success: false, message: 'Tu sesión no tiene permisos de administrador. Vuelve a iniciar sesión.' };
    const { userId, action, reason, updatedAt } = parsed.data;
    const result = await db.$transaction(async tx => {
      const currentActor = await tx.user.findUnique({ where: { id: actor.id } });
      const target = await tx.user.findUnique({ where: { id: userId } });
      const error = accountActionError(currentActor, target, action);
      if (error) return error;
      if (currentActor!.sessionVersion !== actor.sessionVersion) return 'La sesión ha caducado. Vuelve a iniciar sesión.';
      const changed = await tx.user.updateMany({ where: { id: userId, updatedAt: new Date(updatedAt), role: 'USER' }, data: {
        sessionVersion: { increment: 1 },
        ...(action === 'DEACTIVATE' ? { isActive: false, disabledAt: new Date() } : {}),
        ...(action === 'ACTIVATE' ? { isActive: true, disabledAt: null } : {}),
      } });
      if (!changed.count) return 'Otro proceso modificó esta cuenta. Actualiza el listado e inténtalo de nuevo.';
      await tx.adminAuditLog.create({ data: { actorId: actor.id, targetId: userId, action, reason } });
      return null;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    if (result) return { success: false, message: result };
  } catch {
    return { success: false, message: 'No se pudo guardar el cambio. Comprueba la conexión y actualiza el listado antes de reintentar.' };
  }
  revalidatePath('/admin');
  revalidatePath('/admin/actividad');
  return { success: true, message: 'Cambio guardado y registrado. Las sesiones anteriores de esta cuenta han quedado invalidadas.' };
}
