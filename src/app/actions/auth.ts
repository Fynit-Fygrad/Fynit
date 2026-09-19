'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { createSession, deleteSession } from '@/lib/session'
import {
  SignupFormSchema,
  LoginFormSchema,
  SignupFormState,
  LoginFormState,
} from '@/lib/definitions'

// ─────────────────────────────────────────────
// REGISTRO
// ─────────────────────────────────────────────
export async function signup(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  // 1. Validar campos
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  // 2. Verificar que el email no esté registrado
  const existingUser = await db.user.findUnique({ where: { email } })
  if (existingUser) {
    return {
      errors: {
        email: ['Este correo electrónico ya está registrado.'],
      },
    }
  }

  // 3. Hashear contraseña
  const hashedPassword = await bcrypt.hash(password, 10)

  // 4. Crear usuario en la BD
  const user = await db.user.create({
    data: { name, email, password: hashedPassword },
  })

  if (!user) {
    return { message: 'Ocurrió un error al crear tu cuenta. Intenta de nuevo.' }
  }

  // 5. Crear sesión y redirigir
  await createSession(user.id)
  redirect('/dashboard')
}

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────
export async function login(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  // 1. Validar campos
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  // 2. Buscar usuario
  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    return {
      message: 'Correo o contraseña incorrectos.',
    }
  }

  // 3. Verificar contraseña
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return {
      message: 'Correo o contraseña incorrectos.',
    }
  }

  // 4. Crear sesión y redirigir
  await createSession(user.id)
  redirect('/dashboard')
}

// ─────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────
export async function logout() {
  await deleteSession()
  redirect('/login')
}
