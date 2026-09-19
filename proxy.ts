import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

// Rutas que requieren sesión activa
const protectedRoutes = ['/dashboard', '/analizar']

// Rutas públicas que redirigen al dashboard si ya hay sesión
const authRoutes = ['/login', '/registro']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route))

  // Leer y desencriptar la cookie de sesión
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')?.value
  const session = await decrypt(sessionCookie)

  // Si ruta protegida y sin sesión → redirigir a /login
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Si ruta de auth y ya hay sesión → redirigir a /dashboard
  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

// El proxy no corre en archivos estáticos ni en rutas de API internas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.webp$).*)'],
}
