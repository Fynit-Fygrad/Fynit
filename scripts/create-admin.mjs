// Run only from a trusted server/operator terminal. Never exposed as a web action.
import nextEnv from '@next/env';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

nextEnv.loadEnvConfig(process.cwd());
const { PrismaClient } = await import('@prisma/client');
const [email, outputPath] = process.argv.slice(2);
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !outputPath) {
  console.error('Uso: node scripts/create-admin.mjs correo ruta-privada-de-credenciales');
  process.exit(1);
}
const db = new PrismaClient({ log: [] });
try {
  const existing = await db.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } }, select: { id: true } });
  if (existing) throw new Error('La cuenta ya existe. Este script no cambia contraseñas ni permisos de cuentas existentes.');
  const password = randomBytes(20).toString('base64url');
  const hash = await bcrypt.hash(password, 12);
  // Write privately before creating the account so a disk failure cannot lose the credentials.
  const filename = resolve(outputPath);
  writeFileSync(filename, `Fynit — acceso privado\nURL: http://localhost:3001/login\nCorreo: ${email}\nContraseña: ${password}\n\nNo compartir este archivo.\n`, { mode: 0o600, flag: 'wx' });
  await db.$transaction(async tx => {
    const admin = await tx.user.create({ data: { name: 'Administrador Fynit', email, password: hash, role: 'ADMIN' } });
    await tx.adminAuditLog.create({ data: { actorId: admin.id, targetId: admin.id, action: 'GRANT_ADMIN', reason: 'Alta inicial de administrador solicitada por el propietario.' } });
  });
  console.log(`Administrador creado. Credenciales guardadas en: ${filename}`);
} catch (error) {
  console.error(error instanceof Error && !('clientVersion' in error) ? error.message : 'No se pudo crear el administrador. Verifica conexión, migración y permisos.');
  process.exitCode = 1;
} finally { await db.$disconnect(); }
