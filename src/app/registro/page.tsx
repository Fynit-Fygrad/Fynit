'use client'

import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import { signup } from '@/app/actions/auth'
import { useTheme } from 'next-themes'

export default function Page() {
  const [state, action, pending] = useActionState(signup, undefined)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="auth-layout">
      {/* ── Panel Izquierdo (Formulario) ── */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          
          <Link href="/" className="auth-logo">
            <img 
              src={mounted && theme === 'dark' ? "/assets/logos svg/logo-fynit-white.svg" : "/assets/logos svg/logo-fynit.svg"} 
              alt="Fynit" 
            />
          </Link>

          <div className="auth-header">
            <h1 className="auth-title">Crea tu cuenta</h1>
            <p className="auth-subtitle">Únete a miles de investigadores que optimizan sus publicaciones con Fynit.</p>
          </div>

          {state?.message && (
            <div className="auth-error">
              {state.message}
            </div>
          )}

          <form action={action}>
            <div className="auth-form-group">
              <label htmlFor="name" className="auth-label">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ej. Ana García"
                required
                className="auth-input"
              />
              {state?.errors?.name && (
                <p className="auth-error-field">{state.errors.name[0]}</p>
              )}
            </div>

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
              <label htmlFor="password" className="auth-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
                className="auth-input"
              />
              {state?.errors?.password && (
                <p className="auth-error-field">{state.errors.password[0]}</p>
              )}
            </div>

            <div className="auth-form-group">
              <label htmlFor="confirmPassword" className="auth-label">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                required
                minLength={8}
                className="auth-input"
              />
              {state?.errors?.confirmPassword && (
                <p className="auth-error-field">{state.errors.confirmPassword[0]}</p>
              )}
            </div>

            <div className="auth-checkbox-group">
              <input
                type="checkbox"
                id="terms"
                required
                className="auth-checkbox"
              />
              <label htmlFor="terms" className="auth-checkbox-text">
                Acepto los <Link href="/#terminos">Términos de Servicio</Link> y la <Link href="/assets/Politica_de_Privacidad_Fynit.pdf">Política de Privacidad</Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="auth-btn-primary"
            >
              {pending ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="auth-divider">o regístrate con</div>

          <button
            type="button"
            className="auth-btn-google"
            onClick={() => alert("Próximamente: Integración con Google SSO")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar con Google
          </button>

          <p className="auth-footer-link">
            ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
          </p>

        </div>
      </div>

      {/* ── Panel Derecho (Visual - Solo Desktop) ── */}
      <div className="auth-visual-side">
        <div className="auth-visual-glow"></div>
        <img 
          src="/assets/imgs png/epic-mascot-dark.webp" 
          alt="Fynit AI" 
          className="auth-mascot"
        />
        <div className="auth-visual-text">
          <h3>Investigación Potenciada</h3>
          <p>Tu asistente inteligente para lograr publicaciones de alto impacto de manera rápida y segura.</p>
        </div>
      </div>
    </div>
  )
}
