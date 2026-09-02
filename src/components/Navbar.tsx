'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { showComingSoon } from './Toaster';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar sidebar al cambiar de ruta
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'is-open' : ''}`} 
        id="sidebarOverlay"
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      
      <aside className={`sidebar ${isSidebarOpen ? 'is-open' : ''}`} id="sidebar" aria-hidden={!isSidebarOpen}>
        <div className="sidebar-top">
          <div className="logo">
            <img src="assets/logos svg/logo-fynit-white.svg" alt="Fynit" className="logo-img" />
          </div>
          <button className="sidebar-close" id="sidebarClose" aria-label="Cerrar menú" onClick={() => setIsSidebarOpen(false)}>
            <svg>
              <use href="/sprite.svg#ic-close" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          <Link href="/" data-nav-link>Inicio</Link>
          <Link href="/#como-funciona" data-nav-link>Cómo funciona</Link>

          {/* Accordion: Recursos */}
          <div className={`sidebar-accordion ${openAccordion === 'recursos' ? 'open' : ''}`}>
            <button className="accordion-btn" aria-expanded={openAccordion === 'recursos'} onClick={() => toggleAccordion('recursos')}>
              Recursos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="accordion-content" style={{ maxHeight: openAccordion === 'recursos' ? '200px' : '0' }}>
              <Link href="/blog" data-nav-link>Blog</Link>
              <Link href="/faq" data-nav-link>Preguntas Frecuentes</Link>
            </div>
          </div>

          {/* Accordion: Nosotros */}
          <div className={`sidebar-accordion ${openAccordion === 'nosotros' ? 'open' : ''}`}>
            <button className="accordion-btn" aria-expanded={openAccordion === 'nosotros'} onClick={() => toggleAccordion('nosotros')}>
              Nosotros
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="accordion-content" style={{ maxHeight: openAccordion === 'nosotros' ? '200px' : '0' }}>
              <Link href="/nosotros" data-nav-link>Sobre Fynit</Link>
              <Link href="/equipo" data-nav-link>Nuestro Equipo</Link>
            </div>
          </div>

          <Link href="/precios">Precios</Link>
          
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); showComingSoon(); }} style={{ textAlign: 'center', padding: '12px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>Registrarse</a>
            <a href="#" onClick={(e) => { e.preventDefault(); showComingSoon(); }} style={{ textAlign: 'center', padding: '12px', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>Iniciar Sesión</a>
          </div>
        </nav>
      </aside>

      <header className="floating-navbar" id="siteHeader">
        <Link href="/" className="logo" aria-label="Fynit inicio">
          <img src="assets/logos svg/logo-fynit.svg" alt="Fynit" style={{ height: '32px', width: 'auto' }} />
        </Link>

        {/* Espacio central vacío como en el diseño */}
        <div className="nav-links">
        </div>

        <div className="nav-actions">
          <a href="#" onClick={(e) => { e.preventDefault(); showComingSoon(); }} className="nav-link-subtle">Iniciar Sesión</a>
          <a href="#" onClick={(e) => { e.preventDefault(); showComingSoon(); }} className="btn-pill-outline">Registrarse</a>
          <Link href="/analizar" className="btn-pill-blue">Analizar</Link>
          <button className="btn-circle" id="hamburgerBtn" aria-label="Abrir menú" aria-expanded={isSidebarOpen} onClick={() => setIsSidebarOpen(true)} aria-controls="sidebar">
            <svg>
              <use href="/sprite.svg#ic-menu" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
