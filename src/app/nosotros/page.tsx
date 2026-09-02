
'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>


    {/*  ============ HERO NOSOTROS ============  */}
    <section className="about-hero">
      <div className="container about-hero-grid">
        <div className="about-hero-copy">
          <span className="eyebrow-accent">SOBRE NOSOTROS</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--navy)' }}>El propósito detrás de cada paper</h1>
          <p className="lead" style={{ fontSize: '1.15rem', color: 'var(--ink-70)', lineHeight: '1.7', fontWeight: '300' }}>
            Fynit nace para guiar a los investigadores en su ruta editorial, eliminando la incertidumbre en el proceso de revisión y publicación de artículos científicos.
          </p>
        </div>
        <div className="about-hero-visual">
          <img src="assets/imgs png/nosotros_hero_visual.webp" alt="Fynit Mascota Analizando Documentos" />
        </div>
      </div>
    </section>

    {/*  ============ MISION & VISION ============  */}
    <section className="mission-vision">
      <div className="container">
        <div className="mv-grid">
          <div className="mv-card">
            <div className="mv-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h3>Nuestra Misión</h3>
            <p>Democratizar el acceso a un diagnóstico editorial honesto, transparente y rápido para investigadores de cualquier parte del mundo.</p>
          </div>
          <div className="mv-card">
            <div className="mv-card-icon" style={{ background: 'var(--yellow)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            </div>
            <h3>Nuestra Visión</h3>
            <p>Convertirnos en el estándar global de validación metodológica y alineación científica antes de cualquier envío editorial.</p>
          </div>
        </div>
      </div>
    </section>

    {/*  ============ PILARES DE FYNIT ============  */}
    <section className="pilares">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow-accent">NUESTRA FILOSOFÍA</span>
          <h2 style={{ fontSize: '2.2rem', marginTop: '12px' }}>Los tres pilares de Fynit</h2>
          <p style={{ color: 'var(--ink-70)', marginTop: '10px' }}>Bajo qué principios construimos nuestra tecnología de diagnóstico.</p>
        </div>
        
        <div className="pilares-grid">
          <div className="pilar-card">
            <div className="pilar-icon-wrap">
              <svg><use href="/sprite.svg#ic-flag" /></svg>
            </div>
            <h3>Transparencia absoluta</h3>
            <p>No inflamos métricas ni te hacemos promesas falsas. Te mostramos la madurez de tu manuscrito con total honestidad.</p>
          </div>
          
          <div className="pilar-card">
            <div className="pilar-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4.5" y="3" width="15" height="18" rx="2.2" /><path d="M8.2 8h7.6M8.2 12h7.6M8.2 16h5" /></svg>
            </div>
            <h3>Rigor Científico</h3>
            <p>Nuestra inteligencia artificial está configurada de acuerdo con las guías internacionales más respetadas del ámbito científico.</p>
          </div>
          
          <div className="pilar-card">
            <div className="pilar-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
            </div>
            <h3>Facilidad e Impacto</h3>
            <p>Hacemos lo complejo increíblemente sencillo. Una plataforma limpia y ágil para que enfoques tu energía en investigar.</p>
          </div>
        </div>
      </div>
    </section>

    {/*  ============ TEAM TEASER (Lado Humano) ============  */}
    <section className="team-teaser">
      <div className="container team-teaser-inner">
        <span className="eyebrow" style={{ color: 'var(--yellow)', marginBottom: '16px', letterSpacing: '.12em' }}>— EL EQUIPO HUMANO</span>
        <h2>Detrás de la IA, hay un equipo que vivió tu misma frustración</h2>
        <p>Somos un grupo de investigadores, metodólogos y desarrolladores que se cansaron de escribir &quot;a ciegas&quot; y decidieron crear la herramienta que les hubiese gustado tener desde su primer artículo.</p>
        <Link href="/equipo" className="btn btn-yellow">Conocer al Equipo Humano <svg><use href="/sprite.svg#ic-arrow" /></svg></Link>
      </div>
    </section>

  
</div>
  );
}
