'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function LegacyComponent() {
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('siteHeader');
      if (header) {
        if (window.scrollY > 12) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }
    };
    
    // Ejecutar al montar y cuando cambie la ruta
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `<div class="sidebar-overlay" id="sidebarOverlay"></div>
  <aside class="sidebar" id="sidebar" aria-hidden="true">
    <div class="sidebar-top">
      <div class="logo">
        <img src="assets/logos svg/logo-fynit-white.svg" alt="Fynit" class="logo-img">
      </div>
      <button class="sidebar-close" id="sidebarClose" aria-label="Cerrar menú"><svg>
          <use href="/sprite.svg#ic-close" />
        </svg></button>
    </div>

    <nav class="sidebar-nav" aria-label="Navegación principal">
      <a href="/" data-nav-link>Inicio</a>
      <a href="/#como-funciona" data-nav-link>Cómo funciona</a>

      <!-- Accordion: Recursos -->
      <div class="sidebar-accordion">
        <button class="accordion-btn" aria-expanded="false">
          Recursos
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div class="accordion-content">
          <a href="/blog" data-nav-link>Blog</a>
          <a href="/faq" data-nav-link>Preguntas Frecuentes</a>
        </div>
      </div>

      <!-- Accordion: Nosotros -->
      <div class="sidebar-accordion">
        <button class="accordion-btn" aria-expanded="false">
          Nosotros
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div class="accordion-content">
          <a href="/nosotros" data-nav-link>Sobre Fynit</a>
          <a href="/equipo" data-nav-link>Nuestro Equipo</a>
        </div>
      </div>

      <a href="/precios">Precios</a>
    </nav>
  </aside>
<header class="site-header" id="siteHeader">
    <div class="header-row">
      <a href="/" class="logo" aria-label="Fynit � inicio">
        <img src="assets/logos svg/logo-fynit.svg" alt="Fynit" class="logo-img">
      </a>



      <div class="header-actions" style="white-space: nowrap; display: flex; align-items: center; gap: 8px;">

        <a href="javascript:void(0)" onclick="showComingSoon(event)"
          style="font-family:'Sora',sans-serif; font-weight:600; font-size:14.5px; color:var(--ink-70); text-decoration:none; padding:6px 0; margin-right:4px;">Iniciar
          Sesión</a>
        <a href="javascript:void(0)" onclick="showComingSoon(event)" class="btn btn-ghost btn-sm">Registrarse</a>
        <a href="/analizar" class="btn btn-primary btn-sm" id="headerCta">Analizar</a>
        <button class="hamburger" id="hamburgerBtn" aria-label="Abrir menú" aria-expanded="false"
          aria-controls="sidebar" style="display: flex;">
          <svg>
            <use href="/sprite.svg#ic-menu" />
          </svg>
        </button>
      </div>
    </div>
  </header>` }} />
  );
}
