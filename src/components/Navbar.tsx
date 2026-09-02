'use client';
import Link from 'next/link';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { showComingSoon } from './Toaster';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
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

  const sidebarRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const preLayers = preLayersRef.current;
    if (!sidebar || !overlay || !preLayers) return;

    const layers = Array.from(preLayers.querySelectorAll('.fynit-prelayer'));
    const navItems = Array.from(sidebar.querySelectorAll('.sidebar-nav > *'));

    const ctx = gsap.context(() => {
      if (isSidebarOpen) {
        tlRef.current?.kill();
        const tl = gsap.timeline();
        tlRef.current = tl;

        // Play sequence
        tl.set(sidebar, { visibility: 'visible' });
        tl.set(overlay, { pointerEvents: 'auto', display: 'block' });

        // Animate overlay
        tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0);

        // Animate pre-layers
        layers.forEach((layer, i) => {
          tl.fromTo(layer, { x: '100%' }, { x: '0%', duration: 0.25, ease: 'power4.out' }, i * 0.04);
        });

        // Animate sidebar panel
        const panelTime = layers.length * 0.04 + 0.05;
        tl.fromTo(sidebar, { x: '100%' }, { x: '0%', duration: 0.35, ease: 'power4.out', clearProps: 'transform' }, panelTime);

        // Stagger nav items
        tl.fromTo(
          navItems,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.03, ease: 'power2.out' },
          panelTime + 0.1
        );
      } else {
        // CLOSE ANIMATION
        tlRef.current?.kill();
        const tl = gsap.timeline();
        tlRef.current = tl;

        const all = [...layers, sidebar];
        tl.to(overlay, { opacity: 0, pointerEvents: 'none', duration: 0.2 }, 0);
        tl.to(all, { x: '100%', duration: 0.2, ease: 'power3.in' }, 0);
        tl.set(overlay, { display: 'none' });
      }
    });

    return () => ctx.revert();
  }, [isSidebarOpen]);

  return (
    <>
      <div 
        ref={overlayRef}
        className={`sidebar-overlay ${isSidebarOpen ? 'is-open' : ''}`} 
        id="sidebarOverlay"
        onClick={() => setIsSidebarOpen(false)}
        style={{ transition: 'none' }}
      ></div>

      <div ref={preLayersRef} style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: 'min(400px, 88vw)', zIndex: 9998, pointerEvents: 'none' }}>
        <div className="fynit-prelayer" style={{ position: 'absolute', inset: 0, background: '#1B60DF', transform: 'translateX(100%)' }}></div>
        <div className="fynit-prelayer" style={{ position: 'absolute', inset: 0, background: '#071742', transform: 'translateX(100%)' }}></div>
      </div>
      
      <aside 
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? 'is-open' : ''}`} 
        id="sidebar" 
        aria-hidden={!isSidebarOpen}
        style={{ transition: 'none' }}
      >
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
          <img src={mounted && theme === 'dark' ? "assets/logos svg/logo-fynit-white.svg" : "assets/logos svg/logo-fynit.svg"} alt="Fynit" style={{ height: '32px', width: 'auto' }} />
        </Link>

        {/* Espacio central vacío como en el diseño */}
        <div className="nav-links">
        </div>

        <div className="nav-actions">
          {mounted && (
            <button 
              className="btn-circle" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Alternar Modo Oscuro"
              style={{ width: '42px', height: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--white)', border: '1px solid rgba(128,128,128,0.2)' }}
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
          )}
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
