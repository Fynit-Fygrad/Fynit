// Read-only smoke test for the local administration panel.
import nextEnv from '@next/env';
import { SignJWT } from 'jose';

nextEnv.loadEnvConfig(process.cwd());
const { PrismaClient } = await import('@prisma/client');
const db = new PrismaClient({ log: [] });
const baseUrl = process.argv[2] || 'http://localhost:3001';

async function sessionFor(user) {
  const key = new TextEncoder().encode(process.env.SESSION_SECRET);
  return new SignJWT({ userId: user.id, sessionVersion: user.sessionVersion })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(key);
}

try {
  const admin = await db.user.findFirst({ where: { role: 'ADMIN', isActive: true } });
  const user = await db.user.findFirst({ where: { role: 'USER', isActive: true } });
  if (!admin || !user) throw new Error('Faltan cuentas activas para ejecutar la prueba.');

  const anonymous = await fetch(`${baseUrl}/admin`, { redirect: 'manual' });
  const adminLogin = await fetch(`${baseUrl}/administracion/login`, { redirect: 'manual' });
  const ordinary = await fetch(`${baseUrl}/admin`, { redirect: 'manual', headers: { cookie: `session=${await sessionFor(user)}` } });
  const authorized = await fetch(`${baseUrl}/admin`, { headers: { cookie: `session=${await sessionFor(admin)}` } });
  const html = await authorized.text();

  const checks = {
    anonymousRedirectsToAdminLogin: anonymous.status === 307 && anonymous.headers.get('location')?.includes('/administracion/login'),
    adminLoginIsIndependent: adminLogin.status === 200 && (await adminLogin.text()).includes('Correo administrativo'),
    ordinaryUserRedirectsToDashboard: ordinary.status === 307 && ordinary.headers.get('location')?.includes('/dashboard'),
    adminLoads: authorized.status === 200,
    adminPageContainsDirectory: html.includes('Directorio de usuarios'),
    adminPageDoesNotExposePasswords: !html.includes(admin.password) && !html.includes(user.password),
  };
  console.log(checks);
  if (Object.values(checks).some(value => !value)) process.exitCode = 1;
} finally {
  await db.$disconnect();
}
