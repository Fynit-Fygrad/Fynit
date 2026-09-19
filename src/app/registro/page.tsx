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

          <p className="auth-footer-link">
            ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
          </p>

        </div>
      </div>

    </div>
  )
}
