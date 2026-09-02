
'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>


    {/*  ============ BLOG HERO ============  */}
    <section className="blog-hero">
      <div className="container blog-hero-inner">
        <span className="eyebrow-accent">Blog Académico</span>
        <h1>Recursos para investigadores que publican</h1>
        <p>Guías prácticas, análisis editoriales y estrategias con IA para que tu artículo llegue más lejos.</p>
        <div className="blog-filter-tabs">
          <button className="blog-filter-btn active" data-filter="all">Todo</button>
          <button className="blog-filter-btn" data-filter="redaccion">Redacción</button>
          <button className="blog-filter-btn" data-filter="metodologia">Metodología</button>
          <button className="blog-filter-btn" data-filter="publicacion">Publicación</button>
          <button className="blog-filter-btn" data-filter="ia">IA Académica</button>
        </div>
      </div>
    </section>

    {/*  ============ ARTÍCULO DESTACADO ============  */}
    <section className="featured-section" data-filter-item="ia">
      <div className="container">
        <div style={{ marginBottom: '24px' }}>
          <span className="eyebrow">Artículo Destacado</span>
        </div>
        <Link href="#" className="featured-card" style={{ textDecoration: 'none', display: 'grid' }}>
          <div className="featured-card-visual">
            <img src="assets/imgs png/fynit_mascot_2.webp" alt="Fynit IA Diagnóstico" loading="eager" />
          </div>
          <div className="featured-card-body">
            <div className="featured-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/></svg>
              IA Académica
            </div>
            <h2>Cómo la IA está redefiniendo el proceso de revisión por pares en revistas Q1 y Q2</h2>
            <div className="post-meta">
              <span className="post-meta-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-user" /></svg>
                Equipo Fynit
              </span>
              <span className="post-meta-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-calendar" /></svg>
                3 agosto, 2026
              </span>
              <span className="post-meta-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-clock" /></svg>
                8 min de lectura
              </span>
            </div>
            <p>La incorporación de modelos de lenguaje avanzados en el flujo editorial de las principales revistas indexadas está transformando radicalmente la eficiencia del proceso de desk review, la detección temprana de falencias metodológicas y la reducción de sesgos humanos en la evaluación inicial de manuscritos científicos.</p>
            <span className="post-read-link">
              Leer artículo completo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
            </span>
          </div>
        </Link>
      </div>
    </section>

    {/*  ============ BLOG GRID ============  */}
    <section className="blog-grid-section">
      <div className="container">
        <div className="blog-grid" id="blogGrid">

          {/*  Artículo 1 — Redacción  */}
          <article className="article-card" data-category="redaccion">
            <div className="article-card-thumb">
              <div className="article-thumb-placeholder">
                <span></span>
              </div>
            </div>
            <div className="article-card-body">
              <span className="article-category-tag">Redacción</span>
              <h3>La estructura IMRyD explicada paso a paso para investigadores de ciencias sociales</h3>
              <p>Dominar la estructura Introducción-Metodología-Resultados-Discusión es el primer requisito para que un artículo supere la revisión de escritorio de las revistas indexadas más exigentes.</p>
              <div className="article-card-footer">
                <div className="article-meta-mini">
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-calendar" /></svg>
                  28 julio, 2026
                  &nbsp;·&nbsp;
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-clock" /></svg>
                  6 min
                </div>
                <Link href="#" className="article-read-link">
                  Leer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
                </Link>
              </div>
            </div>
          </article>

          {/*  Artículo 2 — Metodología  */}
          <article className="article-card" data-category="metodologia">
            <div className="article-card-thumb">
              <div className="article-thumb-placeholder">
                <span></span>
              </div>
            </div>
            <div className="article-card-body">
              <span className="article-category-tag">Metodología</span>
              <h3>Cuándo usar análisis cuantitativo y cuándo cualitativo: una guía para no equivocarse</h3>
              <p>Elegir el enfoque metodológico incorrecto es una de las causas más frecuentes de rechazo editorial. Te explicamos cuándo es conveniente cada paradigma y cómo justificarlo correctamente en tu artículo.</p>
              <div className="article-card-footer">
                <div className="article-meta-mini">
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-calendar" /></svg>
                  22 julio, 2026
                  &nbsp;·&nbsp;
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-clock" /></svg>
                  9 min
                </div>
                <Link href="#" className="article-read-link">
                  Leer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
                </Link>
              </div>
            </div>
          </article>

          {/*  Artículo 3 — Publicación  */}
          <article className="article-card" data-category="publicacion">
            <div className="article-card-thumb">
              <div className="article-thumb-placeholder">
                <span></span>
              </div>
            </div>
            <div className="article-card-body">
              <span className="article-category-tag">Publicación</span>
              <h3>Scopus vs. Web of Science: diferencias clave para elegir en qué revista publicar</h3>
              <p>Muchos investigadores desconocen las diferencias de cobertura, indexación y factor de impacto entre Scopus y WoS. Analizamos ambas bases para que tomes la decisión editorial correcta.</p>
              <div className="article-card-footer">
                <div className="article-meta-mini">
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-calendar" /></svg>
                  15 julio, 2026
                  &nbsp;·&nbsp;
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-clock" /></svg>
                  7 min
                </div>
                <Link href="#" className="article-read-link">
                  Leer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
                </Link>
              </div>
            </div>
          </article>

          {/*  Artículo 4 — IA  */}
          <article className="article-card" data-category="ia">
            <div className="article-card-thumb">
              <div className="article-thumb-placeholder">
                <span></span>
              </div>
            </div>
            <div className="article-card-body">
              <span className="article-category-tag">IA Académica</span>
              <h3>¿Puede una IA detectar si tu artículo será rechazado antes de enviarlo?</h3>
              <p>Los nuevos modelos de diagnóstico editorial predictivo ya logran estimar con alta precisión la probabilidad de desk rejection. Así es cómo funciona la evaluación automática de Fynit.</p>
              <div className="article-card-footer">
                <div className="article-meta-mini">
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-calendar" /></svg>
                  10 julio, 2026
                  &nbsp;·&nbsp;
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-clock" /></svg>
                  5 min
                </div>
                <Link href="#" className="article-read-link">
                  Leer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
                </Link>
              </div>
            </div>
          </article>

          {/*  Artículo 5 — Redacción  */}
          <article className="article-card" data-category="redaccion">
            <div className="article-card-thumb">
              <div className="article-thumb-placeholder">
                <span></span>
              </div>
            </div>
            <div className="article-card-body">
              <span className="article-category-tag">Redacción</span>
              <h3>Los 10 errores de redacción científica que hacen que los editores rechacen de inmediato</h3>
              <p>Desde el uso impreciso de terminología hasta la ausencia de limitaciones del estudio, conoce los fallos más frecuentes que detectamos tras analizar miles de manuscritos rechazados.</p>
              <div className="article-card-footer">
                <div className="article-meta-mini">
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-calendar" /></svg>
                  5 julio, 2026
                  &nbsp;·&nbsp;
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-clock" /></svg>
                  10 min
                </div>
                <Link href="#" className="article-read-link">
                  Leer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
                </Link>
              </div>
            </div>
          </article>

          {/*  Artículo 6 — Metodología  */}
          <article className="article-card" data-category="metodologia">
            <div className="article-card-thumb">
              <div className="article-thumb-placeholder">
                <span></span>
              </div>
            </div>
            <div className="article-card-body">
              <span className="article-category-tag">Metodología</span>
              <h3>Cómo calcular el tamaño muestral adecuado y por qué es crítico para la aceptación editorial</h3>
              <p>Un tamaño muestral mal justificado es una señal inmediata de debilidad metodológica para cualquier revisor. Aprende a calcularlo y a explicarlo correctamente en tu artículo de investigación.</p>
              <div className="article-card-footer">
                <div className="article-meta-mini">
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-calendar" /></svg>
                  29 junio, 2026
                  &nbsp;·&nbsp;
                  <svg aria-hidden="true"><use href="/sprite.svg#ic-clock" /></svg>
                  8 min
                </div>
                <Link href="#" className="article-read-link">
                  Leer
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
                </Link>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>

    {/*  ============ NEWSLETTER CTA ============  */}
    <section className="blog-newsletter">
      <div className="container blog-newsletter-inner">
        <span className="eyebrow" style={{ color: 'var(--yellow)', marginBottom: '16px' }}>Newsletter Académico</span>
        <h2>Recursos semanales directo a tu correo</h2>
        <p>Recibe cada semana una selección de guías, estrategias de publicación y novedades sobre IA académica redactadas por el equipo de Fynit.</p>
        <form className="newsletter-form" onSubmit={(event) => { (window as any).handleNewsletter && (window as any).handleNewsletter(event) }}>
          <input type="email" className="newsletter-input" id="newsletterEmail" placeholder="correo@universidad.edu" required />
          <button type="submit" className="btn btn-yellow">
            Suscribirme
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}><path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/></svg>
          </button>
        </form>
        <p id="newsletterSuccessMsg" style={{ display: 'none', marginTop: '16px', color: 'var(--yellow)', fontWeight: '600', fontSize: '14px' }}>
          ¡Suscripción confirmada! Pronto recibirás el primer boletín.
        </p>
      </div>
    </section>

  
</div>
  );
}
