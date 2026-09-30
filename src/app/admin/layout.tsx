import Link from 'next/link';
import { requireAdmin } from '@/lib/auth-access';
import { adminLogout } from '@/app/actions/auth';
import '@/styles/admin.css';

export const metadata = { title: 'Administración | Fynit', robots: { index: false, follow: false } };
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <div className="ad-shell"><aside className="ad-sidebar">
    <Link href="/admin" className="ad-logo"><img src="/assets/logos svg/logo-fynit.svg" alt="Fynit" /><span>ADMINISTRACIÓN</span></Link>
    <div className="ad-nav-label">PLATAFORMA</div>
    <nav aria-label="Administración"><Link href="/admin">Usuarios <span>↗</span></Link><Link href="/admin/actividad">Registro de actividad <span>↗</span></Link></nav>
    <div className="ad-sidebar-footer"><Link href="/dashboard">← Panel de investigador</Link><div className="ad-admin-profile"><span>{admin.name.slice(0, 2).toUpperCase()}</span><div><strong>{admin.name}</strong><small>Administrador</small></div></div><form action={adminLogout}><button>Cerrar sesión</button></form></div>
  </aside><div className="ad-main"><header className="ad-topbar"><span>Fynit <i>/</i> Administración</span><span className="ad-access-badge">Acceso restringido</span></header>{children}</div></div>;
}
