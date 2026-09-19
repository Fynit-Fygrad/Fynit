import { z } from 'zod'

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Por favor ingresa un correo electrónico válido.' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Por favor ingresa un correo electrónico válido.' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'La contraseña es requerida.' })
    .trim(),
})

export type SignupFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
