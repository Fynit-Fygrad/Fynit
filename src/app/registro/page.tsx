'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signup } from '@/app/actions/auth'

export default function Page() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <div>
      {/* Card Container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 transition-all my-8">

        {/* Header / Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <img src="/assets/logos%20svg/favicon.svg" alt="Fynit" className="h-9 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crea tu cuenta en Fynit</h1>
          <p className="text-sm text-gray-500">Únete a miles de investigadores que optimizan sus publicaciones.</p>
        </div>

        {/* Error general */}
        {state?.message && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
            {state.message}
          </div>
        )}

        {/* Formulario */}
        <form action={action} className="space-y-4">

          {/* Nombre completo */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ej. Ana García"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
            />
            {state?.errors?.name && (
              <p className="mt-1 text-xs text-red-500">{state.errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@universidad.edu"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
            />
            {state?.errors?.email && (
              <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mínimo 8 caracteres"
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
            />
            {state?.errors?.password && (
              <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Repite tu contraseña"
              required
              minLength={8}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
            />
            {state?.errors?.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{state.errors.confirmPassword[0]}</p>
            )}
          </div>

          {/* Términos */}
          <div className="pt-1">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition-colors cursor-pointer"
              />
              <span className="text-sm text-gray-500 leading-tight">
                Acepto los{' '}
                <Link href="#" className="text-brand-600 hover:underline">Términos de Servicio</Link>
                {' '}y la{' '}
                <Link href="#" className="text-brand-600 hover:underline">Política de Privacidad</Link>
                {' '}de Fynit.
              </span>
            </label>
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl shadow-sm shadow-brand-500/30 transition-all hover:shadow-md hover:-translate-y-0.5 mt-4"
          >
            {pending ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-8">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
            Inicia sesión aquí
          </Link>
        </p>

      </div>
    </div>
  )
}
