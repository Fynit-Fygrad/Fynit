export type Account = { id: string; role: string; isActive: boolean; sessionVersion: number };
export type AccountAction = 'DEACTIVATE' | 'ACTIVATE' | 'REVOKE_SESSIONS';
export function validAccountSession(user: Account | null, session: Record<string, unknown> | null) {
  return !!user && !!session && user.id === session.userId && user.isActive && user.sessionVersion === (session.sessionVersion ?? 0);
}
export function accountActionError(actor: Account | null, target: Account | null, action: AccountAction): string | null {
  if (!actor?.isActive || actor.role !== 'ADMIN') return 'No tienes permiso para administrar usuarios.';
  if (!target) return 'El usuario ya no está disponible.';
  if (actor.id === target.id) return 'No puedes modificar tu propia cuenta desde este panel.';
  if (target.role === 'ADMIN') return 'Las cuentas de administrador están protegidas.';
  if (action === 'ACTIVATE' && target.isActive) return 'La cuenta ya está activa. Actualiza el listado.';
  if (action === 'DEACTIVATE' && !target.isActive) return 'La cuenta ya está desactivada. Actualiza el listado.';
  return null;
}
