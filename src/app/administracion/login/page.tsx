'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { adminLogin } from '@/app/actions/auth'
import '@/styles/admin-login.css'

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(adminLogin, undefined)
  return <main className="admin-login-page">
    <section className="admin-login-brand" aria-label="Fynit Administración">
      <Link href="/" className="admin-login-logo"><img src="/assets/logos svg/logo-fynit-white.svg" alt="Fynit" /></Link>
      <div><span className="admin-login-kicker">PORTAL INTERNO</span><h1>Control claro para una plataforma confiable.</h1><p>Gestiona accesos, protege las cuentas y revisa cada cambio desde un solo lugar.</p></div>
      <small>Acceso exclusivo para personal autorizado de Fynit.</small>
    </section>
    <section className="admin-login-form-side">
      <div className="admin-login-card">
        <div className="admin-login-mark" aria-hidden="true">FY</div>
        <span className="admin-login-eyebrow">ADMINISTRACIÓN</span>
        <h2>Iniciar sesión</h2>
        <p className="admin-login-intro">Ingresa tus credenciales administrativas para continuar.</p>
        {state?.message && <p className="admin-login-error" role="alert">{state.message}</p>}
        <form action={action}>
          <label htmlFor="admin-email">Correo administrativo</label>
          <input id="admin-email" name="email" type="email" autoComplete="username" placeholder="administrador@fynit.app" required />
          {state?.errors?.email && <small className="admin-login-field-error">{state.errors.email[0]}</small>}
          <label htmlFor="admin-password">Contraseña</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" placeholder="••••••••••••" required />
          {state?.errors?.password && <small className="admin-login-field-error">{state.errors.password[0]}</small>}
          <button type="submit" disabled={pending}>{pending ? 'Verificando acceso…' : 'Acceder al panel'}<span aria-hidden="true">→</span></button>
        </form>
        <Link href="/login" className="admin-login-back">← Volver al acceso de investigadores</Link>
      </div>
    </section>
  </main>
}
