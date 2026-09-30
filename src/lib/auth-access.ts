import 'server-only';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { validAccountSession } from '@/lib/admin-policy';

export async function getCurrentUser() {
  const session = await getSession();
  if (typeof session?.userId !== 'string') return null;
  const user = await db.user.findUnique({ where: { id: session.userId }, select: {
    id: true, name: true, email: true, role: true, isActive: true, sessionVersion: true,
  } });
  return validAccountSession(user, session) ? user : null;
}
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect('/administracion/login');
  if (user.role !== 'ADMIN') redirect('/dashboard');
  return user;
}
