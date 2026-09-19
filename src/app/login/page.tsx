'use client'

import Link from 'next/link'
import { useActionState, useEffect, useState, Suspense } from 'react'
import { login } from '@/app/actions/auth'
import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const isRegistered = searchParams.get('registered') === 'true'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="auth-layout">
      {/* ── Panel Visual (Izquierda - Solo Desktop) ── */}
      <div className="auth-visual-side">
        <div className="auth-visual-glow"></div>
        <img 
          src="/assets/imgs png/mascot-auth.png" 
          alt="Fynit Mascot" 
          className="auth-mascot"
        />
        <div className="auth-visual-text">
          <h3>Investigación Potenciada</h3>
          <p>Tu asistente inteligente para lograr publicaciones de alto impacto de manera rápida y segura.</p>
        </div>
      </div>

      {/* ── Panel Derecho (Formulario) ── */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          
          <Link href="/" className="auth-logo">
            <img 
              src={mounted && theme === 'dark' ? "/assets/logos svg/logo-fynit-white.svg" : "/assets/logos svg/logo-fynit.svg"} 
              alt="Fynit" 
            />
          </Link>

          <div className="auth-header">
            <h1 className="auth-title">Bienvenido de nuevo</h1>
            <p className="auth-subtitle">Ingresa tus credenciales para acceder a tu panel de investigador.</p>
          </div>

          {isRegistered && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 text-center font-medium">
              ¡Tu cuenta fue creada exitosamente! Por favor, inicia sesión.
            </div>
          )}

          {state?.message && (
            <div className="auth-error">
              {state.message}
            </div>
          )}

          <form action={action}>
            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@universidad.edu"
                required
                className="auth-input"
              />
              {state?.errors?.email && (
                <p className="auth-error-field">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="auth-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label htmlFor="password" className="auth-label" style={{ marginBottom: 0 }}>Contraseña</label>
                <Link href="#" style={{ fontSize: '0.8rem', color: 'var(--blue)', fontWeight: 600, textDecoration: 'none' }}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="auth-input"
              />
              {state?.errors?.password && (
                <p className="auth-error-field">{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="auth-btn-primary"
              style={{ marginTop: '32px' }}
            >
              {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="auth-footer-link" style={{ marginTop: '24px' }}>
            ¿No tienes cuenta? <Link href="/registro">Regístrate aquí</Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="auth-layout" />}>
      <LoginForm />
    </Suspense>
  )
}
