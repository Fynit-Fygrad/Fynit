
'use client';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `

    <!-- ============ HERO NOSOTROS ============ -->
    <section class="about-hero">
      <div class="container about-hero-grid">
        <div class="about-hero-copy">
          <span class="eyebrow-accent">SOBRE NOSOTROS</span>
          <h1 style="font-size: 3rem; margin-bottom: 20px; color: var(--navy);">El propósito detrás de cada paper</h1>
          <p class="lead" style="font-size: 1.15rem; color: var(--ink-70); line-height: 1.7; font-weight: 300;">
            Fynit nace para guiar a los investigadores en su ruta editorial, eliminando la incertidumbre en el proceso de revisión y publicación de artículos científicos.
          </p>
        </div>
        <div class="about-hero-visual">
          <img src="assets/imgs png/nosotros_hero_visual.webp" alt="Fynit Mascota Analizando Documentos">
        </div>
      </div>
    </section>

    <!-- ============ MISION & VISION ============ -->
    <section class="mission-vision">
      <div class="container">
        <div class="mv-grid">
          <div class="mv-card">
            <div class="mv-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h3>Nuestra Misión</h3>
            <p>Democratizar el acceso a un diagnóstico editorial honesto, transparente y rápido para investigadores de cualquier parte del mundo.</p>
          </div>
          <div class="mv-card">
            <div class="mv-card-icon" style="background: var(--yellow);">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--navy)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            </div>
            <h3>Nuestra Visión</h3>
            <p>Convertirnos en el estándar global de validación metodológica y alineación científica antes de cualquier envío editorial.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PILARES DE FYNIT ============ -->
    <section class="pilares">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow-accent">NUESTRA FILOSOFÍA</span>
          <h2 style="font-size: 2.2rem; margin-top: 12px;">Los tres pilares de Fynit</h2>
          <p style="color: var(--ink-70); margin-top: 10px;">Bajo qué principios construimos nuestra tecnología de diagnóstico.</p>
        </div>
        
        <div class="pilares-grid">
          <div class="pilar-card">
            <div class="pilar-icon-wrap">
              <svg><use href="/sprite.svg#ic-flag" /></svg>
            </div>
            <h3>Transparencia absoluta</h3>
            <p>No inflamos métricas ni te hacemos promesas falsas. Te mostramos la madurez de tu manuscrito con total honestidad.</p>
          </div>
          
          <div class="pilar-card">
            <div class="pilar-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="3" width="15" height="18" rx="2.2" /><path d="M8.2 8h7.6M8.2 12h7.6M8.2 16h5" /></svg>
            </div>
            <h3>Rigor Científico</h3>
            <p>Nuestra inteligencia artificial está configurada de acuerdo con las guías internacionales más respetadas del ámbito científico.</p>
          </div>
          
          <div class="pilar-card">
            <div class="pilar-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
            </div>
            <h3>Facilidad e Impacto</h3>
            <p>Hacemos lo complejo increíblemente sencillo. Una plataforma limpia y ágil para que enfoques tu energía en investigar.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ TEAM TEASER (Lado Humano) ============ -->
    <section class="team-teaser">
      <div class="container team-teaser-inner">
        <span class="eyebrow" style="color: var(--yellow); margin-bottom: 16px; letter-spacing: .12em;">— EL EQUIPO HUMANO</span>
        <h2>Detrás de la IA, hay un equipo que vivió tu misma frustración</h2>
        <p>Somos un grupo de investigadores, metodólogos y desarrolladores que se cansaron de escribir "a ciegas" y decidieron crear la herramienta que les hubiese gustado tener desde su primer artículo.</p>
        <a href="/equipo" class="btn btn-yellow">Conocer al Equipo Humano <svg><use href="/sprite.svg#ic-arrow" /></svg></a>
      </div>
    </section>

  ` }} />
  );
}
