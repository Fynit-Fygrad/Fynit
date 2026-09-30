import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { db } from '@/lib/db'
import { validAccountSession } from '@/lib/admin-policy'

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const matches = (route: string) => path === route || path.startsWith(route + '/')
  const adminRoute = matches('/admin')
  const researcherRoute = ['/dashboard', '/analizar'].some(matches)
  const protectedRoute = adminRoute || researcherRoute
  const adminAuthRoute = path === '/administracion/login'
  const researcherAuthRoute = ['/login', '/registro'].some(matches)
  const authRoute = adminAuthRoute || researcherAuthRoute
  if (!protectedRoute && !authRoute) return NextResponse.next()
  const session = await decrypt(req.cookies.get('session')?.value)
  if (!session || typeof session.userId !== 'string') {
    if (protectedRoute) return NextResponse.redirect(new URL(adminRoute ? '/administracion/login' : '/login', req.url))
    return NextResponse.next()
  }
  // Check the database on every protected navigation, including RSC requests.
  // A valid JWT alone does not grant access to disabled or revoked accounts.
  let user
  try {
    user = await db.user.findUnique({ where: { id: session.userId }, select: { id: true, role: true, isActive: true, sessionVersion: true } })
  } catch {
    return new NextResponse('No se pudo comprobar el acceso. Inténtalo de nuevo en unos minutos.', { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
  if (!validAccountSession(user, session)) {
    const loginUrl = adminRoute ? '/administracion/login?session=expired' : '/login?session=expired'
    const response = protectedRoute ? NextResponse.redirect(new URL(loginUrl, req.url)) : NextResponse.next()
    response.cookies.delete('session')
    return response
  }
  if (adminRoute && user!.role !== 'ADMIN') return NextResponse.redirect(new URL('/dashboard', req.url))
  if (authRoute) return NextResponse.redirect(new URL(user!.role === 'ADMIN' ? '/admin' : '/dashboard', req.url))
  return NextResponse.next()
}
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/analizar/:path*', '/administracion/login', '/login', '/registro'],
}
