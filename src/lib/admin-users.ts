import 'server-only';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-access';

export type AdminSearch = { q?: string | string[]; status?: string | string[]; role?: string | string[]; page?: string | string[] };
const scalar = (value: string | string[] | undefined) => typeof value === 'string' ? value : '';
export async function getAdminUsers(search: AdminSearch) {
  const admin = await requireAdmin();
  const q = scalar(search.q).trim().slice(0, 120);
  const status = ['active', 'inactive'].includes(scalar(search.status)) ? scalar(search.status) : 'all';
  const role = ['USER', 'ADMIN'].includes(scalar(search.role)) ? scalar(search.role) : 'all';
  const where: Prisma.UserWhereInput = {
    ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }] } : {}),
    ...(status !== 'all' ? { isActive: status === 'active' } : {}),
    ...(role !== 'all' ? { role: role as 'USER' | 'ADMIN' } : {}),
  };
  const [total, active, administrators, newUsers, filtered] = await Promise.all([
    db.user.count(), db.user.count({ where: { isActive: true } }), db.user.count({ where: { role: 'ADMIN' } }),
    db.user.count({ where: { createdAt: { gte: new Date(Date.now() - 7 * 86400000) } } }), db.user.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(filtered / 20));
  const requested = Number(search.page);
  const page = Math.min(pages, Math.max(1, Number.isSafeInteger(requested) ? requested : 1));
  const users = await db.user.findMany({ where, orderBy: [{ createdAt: 'desc' }, { id: 'asc' }], skip: (page - 1) * 20, take: 20, select: {
    id: true, name: true, email: true, role: true, isActive: true, createdAt: true, updatedAt: true, lastLoginAt: true, disabledAt: true,
  } });
  return { admin, users, stats: { total, active, inactive: total - active, administrators, newUsers }, filtered, page, pages, q, status, role };
}

export async function getAdminActivity(pageInput?: string | string[]) {
  await requireAdmin();
  const count = await db.adminAuditLog.count();
  const pages = Math.max(1, Math.ceil(count / 30));
  const requested = Number(pageInput);
  const page = Math.min(pages, Math.max(1, Number.isSafeInteger(requested) ? requested : 1));
  const events = await db.adminAuditLog.findMany({ take: 30, skip: (page - 1) * 30, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], select: {
    id: true, action: true, reason: true, createdAt: true,
    actor: { select: { name: true, email: true } }, target: { select: { name: true, email: true } },
  } });
  return { events, count, page, pages };
}
