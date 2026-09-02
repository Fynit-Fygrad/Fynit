'use client';
import { useEffect, useRef } from 'react';

export default function LegacyComponent() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `


    <!-- ============ HERO ============ -->
    <section class="hero" id="inicio">
      <div class="container hero-grid">
        <div class="hero-copy" data-aos="fade-up">
          <span class="eyebrow">IA ACADÉMICA · DIAGNÓSTICO EDITORIAL</span>
          <h1>
            De tu investigación a una
            <span class="highlight">ruta publicable
              <svg viewBox="0 0 300 24" preserveAspectRatio="none">
                <path d="M2 18C60 8 240 8 298 18" fill="none" stroke-width="9" stroke-linecap="round" />
              </svg>
            </span>, sin adivinar.
          </h1>
          <p class="lead">Sube tu documento y en pocos segundos obtén un diagnóstico honesto: qué tan cerca estás de
            publicar, en qué revista tienes opciones reales y qué corregir primero.</p>
          <div class="hero-ctas">
            <a href="javascript:void(0)" onclick="showComingSoon(event)" class="btn btn-primary">Registrarse</a>
            <a href="#como-funciona" class="btn btn-ghost">Ver cómo funciona</a>
          </div>
          <div class="hero-honest"></div>
        </div>

        <div class="hero-visual" style="display: flex; align-items: center; justify-content: center;" data-aos="zoom-in"
          data-aos-delay="200">
          <img src="assets/imgs png/hero-mockup.webp" alt="Mockup de Fynit en laptop y smartphone"
            style="width: 100%; max-width: 850px; height: auto; object-fit: contain; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));"
            loading="eager">
        </div>
      </div>
    </section>

    <!-- ============ MARQUEE DISCIPLINAS ============ -->
    <section class="marquee-section" id="disciplinas">
      <div class="marquee-head" data-aos="fade-up">
        <span class="eyebrow">Para toda el área académica</span>
        <h2 style="font-size:clamp(1.7rem,2.6vw,2.2rem)">No importa tu disciplina, hablamos tu idioma editorial</h2>
      </div>
      <div class="marquee-wrap">
        <div class="marquee-track-left">
          <!-- Set 1 (1-6) duplicated for seamless loop -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
          <!-- Duplicate 1 -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
          <!-- Duplicate 2 -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
          <!-- Duplicate 3 -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
        </div>
      </div>

      <div class="marquee-wrap">
        <div class="marquee-track-right">
          <!-- Set 2 (7-12) duplicated for seamless loop -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
          <!-- Duplicate 1 -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
          <!-- Duplicate 2 -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
          <!-- Duplicate 3 -->
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span class="pill"><svg class="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
        </div>
      </div>
    </section>

    <!-- ============ SOBRE FYNIT / PROBLEMA ============ -->
    <section class="section about" id="nosotros">
      <div class="container about-grid">
        <div class="about-copy" data-aos="fade-up">
          <div class="about-hero-image" style="margin-bottom: 24px; animation: floaty 6s ease-in-out infinite;">
            <img src="assets/imgs png/mascot_about.webp" alt="Fynit Mascota"
              style="width: 100%; max-width: 220px; height: auto; object-fit: contain;">
          </div>
          <h2>De investigadores para investigadores.</h2>
          <p style="text-align: justify;">Fynit nace de un equipo de académicos que vivió de cerca la frustración de
            redactar y publicar a ciegas. Por eso, hemos desarrollado una inteligencia artificial especializada y
            entrenada para hacer tu camino editorial claro, riguroso y, sobre todo, predecible.</p>
          <div style="margin-top:32px;">
            <a href="#equipo" class="btn btn-ghost">Más sobre nosotros <svg>
                <use href="/sprite.svg#ic-arrow" />
              </svg></a>
          </div>
        </div>

        <div class="pain-grid">
          <div class="pain-card" data-aos="fade-up" data-aos-delay="100">
            <div class="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-alert" />
              </svg>
            </div>
            <h3>Meses sin saber si vas bien</h3>
            <p>Revisas y revisas sin una señal clara de si tu metodología o tu argumento realmente sostienen una
              publicación.</p>
          </div>
          <div class="pain-card" data-aos="fade-up" data-aos-delay="200">
            <div class="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-list" />
              </svg>
            </div>
            <h3>Feedback disperso y tardío</h3>
            <p>El asesor lo dice por correo, el jurado en la sustentación, la revista al rechazarte. Casi nunca a
              tiempo.</p>
          </div>
          <div class="pain-card" data-aos="fade-up" data-aos-delay="300">
            <div class="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-journal" />
              </svg>
            </div>
            <h3>No sabes dónde postular</h3>
            <p>Cientos de revistas y conferencias, y ningún criterio claro sobre cuál se ajusta a tu perfil y tus
              tiempos.</p>
          </div>
          <div class="pain-card" data-aos="fade-up" data-aos-delay="400">
            <div class="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-target" />
              </svg>
            </div>
            <h3>El detalle que baja tu originalidad</h3>
            <p>Frases parafraseadas de más, citas mal formateadas: pequeños descuidos que restan sin que los notes.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>


    <!-- ============ COMO FUNCIONA (núcleo interactivo) ============ -->
    <section class="section how" id="como-funciona">
      <div class="container" style="position:relative;">
        <!-- Mascota Fynit 2 3D -->
        <img src="assets/imgs png/fynit_mascot_2.webp" alt="Fynit Bot" class="fynit-mascot-active" loading="lazy"
          style="margin-top: 20px;">

        <div class="section-head" data-aos="fade-up">
          <span class="eyebrow">Cómo funciona</span>
          <h2>De tu manuscrito al plan de publicación</h2>
          <p>Cuatro pasos precisos. Sin código, sin esperas, sin adivinar.</p>
        </div>

        <div class="how-grid">
          <div class="how-steps" id="howSteps">
            <div class="step-card is-active" data-step="1">
              <span class="step-num">01</span>
              <div class="step-body">
                <h3>Carga y Diagnóstico Inmediato</h3>
                <p>Sube tu artículo (PDF/Word) y en segundos nuestra IA evalúa similitud, readiness y calidad
                  metodológica.</p>
              </div>
            </div>
            <div class="step-card" data-step="2">
              <span class="step-num">02</span>
              <div class="step-body">
                <h3>Detección de Riesgos y Cuartil</h3>
                <p>Descubre qué secciones necesitan trabajo y conoce tu nivel de publicación actual (Q1-Q4) sin
                  adivinar.</p>
              </div>
            </div>
            <div class="step-card" data-step="3">
              <span class="step-num">03</span>
              <div class="step-body">
                <h3>Match con Revistas Ideales</h3>
                <p>Recibe recomendaciones precisas de revistas y conferencias indexadas (Scopus, WoS) según tu fit
                  real.
                </p>
              </div>
            </div>
            <div class="step-card" data-step="4">
              <span class="step-num">04</span>
              <div class="step-body">
                <h3>Plan de Acción y Red de Expertos</h3>
                <p>Sigue una ruta de mejora paso a paso o conecta con metedólogos y editores verificados para potenciar
                  tu paper.</p>
              </div>
            </div>
          </div>

          <div class="how-visual">
            <div class="visual-frame">
              <!-- Badges flotantes eliminados -->
              <div class="visual-chrome"><span></span><span></span><span></span></div>
              <div class="visual-body" id="visualBody">

                <!-- Panel 1: Carga -->
                <div class="visual-panel is-active" data-panel="1">
                  <img src="assets/imgs png/paso1_laptop_carga.webp" alt="Dashboard Fynit - Carga de documento"
                    style="width:100%; height:100%; object-fit:contain; border-radius:8px;">
                </div>

                <!-- Panel 2: Diagnóstico -->
                <div class="visual-panel" data-panel="2">
                  <img src="assets/imgs png/paso2_laptop_diagnostico.webp" alt="Dashboard Fynit - Diagnóstico con IA"
                    style="width:100%; height:100%; object-fit:contain; border-radius:8px;">
                </div>

                <!-- Panel 3: Match con Revistas -->
                <div class="visual-panel" data-panel="3">
                  <img src="assets/imgs png/paso3_laptop_revistas.webp" alt="Dashboard Fynit - Match con Revistas"
                    style="width:100%; height:100%; object-fit:contain; border-radius:8px;">
                </div>

                <!-- Panel 4: Plan de Acción y Red de Expertos -->
                <div class="visual-panel" data-panel="4">
                  <img src="assets/imgs png/paso4_laptop_plan.webp" alt="Dashboard Fynit - Plan de Acción"
                    style="width:100%; height:100%; object-fit:contain; border-radius:8px;">
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ NUMEROS ============ -->
    <section class="numbers">
      <div class="container" style="position:relative; z-index:2;">

        <div class="numbers-grid">
          <div class="number-item" data-aos="fade-up" data-aos-delay="100">
            <div class="icon-wrap"><svg>
                <use href="/sprite.svg#ic-sparkles" />
              </svg></div>
            <div class="num"><span class="accent">Segundos</span></div>
            <div class="lbl">Para tu diagnóstico inicial completo — no días, no horas</div>
          </div>
          <div class="number-item" data-aos="fade-up" data-aos-delay="200">
            <div class="icon-wrap"><svg>
                <use href="/sprite.svg#ic-target" />
              </svg></div>
            <div class="num" data-count="6"><span class="accent">6</span></div>
            <div class="metric-word">Métricas</div>
            <div class="lbl">Evaluadas en cada análisis con IA: similitud, metodología, readiness y más</div>
          </div>
          <div class="number-item" data-aos="fade-up" data-aos-delay="300">
            <div class="icon-wrap"><svg>
                <use href="/sprite.svg#ic-alert" />
              </svg></div>
            <div class="num"><span class="accent">3 a 5</span></div>
            <div class="metric-word">Riesgos</div>
            <div class="lbl">Priorizados automáticamente, no listados al azar</div>
          </div>
          <div class="number-item" data-aos="fade-up" data-aos-delay="400">
            <div class="icon-wrap"><svg>
                <use href="/sprite.svg#ic-journal" />
              </svg></div>
            <div class="num" data-count="1"><span class="accent">1</span></div>
            <div class="metric-word">Ruta clara</div>
            <div class="lbl">Hacia la revista que sí tiene sentido para ti</div>
          </div>
        </div>
    </section>

    <!-- ============ INDEXACIONES (Marquee) ============ -->
    <section class="indexing-marquee">
      <div class="indexing-label">Compatible con indexaciones y estándares de</div>
      <div class="marquee-outer" aria-hidden="true">
        <div class="marquee-reel">
          <!-- Scopus -->
          <div class="idx-logo">
            <img src="assets/logos svg/logo-scopus.svg" alt="Scopus" loading="lazy">
          </div>
          <!-- Web of Science -->
          <div class="idx-logo">
            <img src="assets/logos svg/logo-wos.svg" alt="Web of Science" loading="lazy">
          </div>
          <!-- IEEE -->
          <div class="idx-logo">
            <img src="assets/logos svg/logo-ieee.svg" alt="IEEE Xplore" loading="lazy">
          </div>
          <!-- DOAJ -->
          <div class="idx-logo">
            <img src="assets/logos svg/logo-doaj.svg" alt="DOAJ" loading="lazy">
          </div>
          <!-- Latindex -->
          <div class="idx-logo">
            <img src="assets/logos svg/logo-latindex.svg" alt="Latindex" loading="lazy">
          </div>
          <!-- SciELO -->
          <div class="idx-logo">
            <img src="assets/logos svg/logo-scielo.svg" alt="SciELO" loading="lazy">
          </div>
          <!-- Duplicate set for seamless loop -->
          <div class="idx-logo">
            <img src="assets/logos svg/logo-scopus.svg" alt="Scopus" loading="lazy">
          </div>
          <div class="idx-logo">
            <img src="assets/logos svg/logo-wos.svg" alt="Web of Science" loading="lazy">
          </div>
          <div class="idx-logo">
            <img src="assets/logos svg/logo-ieee.svg" alt="IEEE Xplore" loading="lazy">
          </div>
          <div class="idx-logo">
            <img src="assets/logos svg/logo-doaj.svg" alt="DOAJ" loading="lazy">
          </div>
          <div class="idx-logo">
            <img src="assets/logos svg/logo-latindex.svg" alt="Latindex" loading="lazy">
          </div>
          <div class="idx-logo">
            <img src="assets/logos svg/logo-scielo.svg" alt="SciELO" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <!-- ============ TESTIMONIOS ============ -->
    <section class="section testimonials" id="testimonios">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Lo que dicen los primeros usuarios</span>
          <h2>Investigadores que ya lo probaron</h2>
          <p>Estos son los primeros investigadores que confiaron en Fynit. Su feedback construyó la herramienta.</p>
        </div>
        <div class="testi-grid">
          <div class="testi-card">
            <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote>"Tenía un artículo dando vueltas sin saber a dónde enviarlo. Fynit me dijo en minutos que
              tenía
              potencial Q3 y cuatro cosas concretas que mejorar. No me dio una lista genérica: me dió foco."
            </blockquote>
            <div class="testi-author">
              <div class="testi-avatar"><img
                  src="https://ui-avatars.com/api/?name=Maria+Quispe&background=009ca6&color=fff&size=128"
                  alt="Investigadora" loading="lazy"></div>
              <div class="testi-info">
                <strong>Dra. María Sol Quispe</strong>
                <span>Investigadora en Educación, UNMSM</span>
              </div>
            </div>
          </div>
          <div class="testi-card featured">
            <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote>"Subi mi tesis de maestría y en cuestión de segundos tenía un reporte que nunca había visto
              igual: similitud, metodología, cuartil alcanzable. Mi asesor quedó impresionado con el nivel del
              análisis."</blockquote>
            <div class="testi-author">
              <div class="testi-avatar"><img
                  src="https://ui-avatars.com/api/?name=Rodrigo+Salas&background=101728&color=fff&size=128"
                  alt="Investigador" loading="lazy"></div>
              <div class="testi-info">
                <strong>Mg. Rodrigo Salas</strong>
                <span>Doctorado en Ing. Civil, PUCP</span>
              </div>
            </div>
          </div>
          <div class="testi-card">
            <div class="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote>"Lo que más me impresionó fue la honestidad del diagnóstico. No infla los números. Te dice
              exactamente dónde estás y cuánto te falta para el siguiente nivel editorial. Eso no tiene precio."
            </blockquote>
            <div class="testi-author">
              <div class="testi-avatar"><img
                  src="https://ui-avatars.com/api/?name=Carmen+Vidal&background=ff8c00&color=fff&size=128"
                  alt="Investigadora" loading="lazy"></div>
              <div class="testi-info">
                <strong>Prof. Carmen Vidal, PhD</strong>
                <span>Directora de Investigación, UPC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PRECIOS ============ -->
    <section class="section pricing" id="precios">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow">Planes &amp; Precios</span>
          <h2>Elige el plan que se ajusta a tu etapa</h2>
          <p>Sin sorpresas. Empieza y escala cuando estés listo.</p>
        </div>
        <div class="pricing-grid">
          <!-- Plan Gratuito -->
          <div class="price-card">
            <div class="price-badge">Gratis</div>
            <div class="price-title">Explorador</div>
            <div class="price-amount"><span class="price-num">$0</span><span class="price-per">/mes</span></div>
            <p class="price-desc">Ideal para evaluar el potencial de tus primeros manuscritos.</p>
            <ul class="price-features">
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Hasta 2 manuscritos al mes</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Similitud + Readiness básico</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Hasta 3 revistas recomendadas</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Plan de mejora (Vista parcial)</li>
              <li class="off"><svg>
                  <use href="/sprite.svg#ic-close" />
                </svg> Reporte completo descargable</li>
            </ul>
            <a href="analizar.html" class="btn btn-ghost btn-block">Empezar</a>
          </div>
          <!-- Plan Pro -->
          <div class="price-card popular">
            <div class="price-pop-label">Más popular</div>
            <div class="price-badge pro">Pro</div>
            <div class="price-title">Investigador</div>
            <div class="price-amount"><span class="price-num">$19</span><span class="price-per">/mes</span></div>
            <p class="price-desc">Para investigadores activos que quieren publicar este año.</p>
            <ul class="price-features">
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Análisis ilimitados</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> 6 métricas completas con IA</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Top 10 revistas + conferencias</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Plan de mejora priorizado</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Seguimiento de versiones</li>
            </ul>
            <a href="analizar.html" class="btn btn-primary btn-block">Empezar 14 días gratis <svg>
                <use href="/sprite.svg#ic-arrow" />
              </svg></a>
          </div>
          <!-- Plan Institucional -->
          <div class="price-card">
            <div class="price-badge inst">Institucional</div>
            <div class="price-title">Facultad</div>
            <div class="price-amount"><span class="price-num" style="font-size:2rem">A medida</span></div>
            <p class="price-desc">Para universidades, facultades y grupos de investigación.</p>
            <ul class="price-features">
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Licencias múltiples</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Dashboard del coordinador</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Integración con plataformas LMS</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> Soporte dedicado y onboarding</li>
              <li><svg>
                  <use href="/sprite.svg#ic-check" />
                </svg> SLA garantizado</li>
            </ul>
            <a href="analizar.html" class="btn btn-ghost btn-block">Contactar ventas</a>
          </div>
        </div>
        <div style="text-align: center; margin-top: 32px; margin-bottom: 24px;">
          <a href="precios.html" class="btn btn-ghost">Ver más detalle</a>
        </div>
        <p class="pricing-note">Todos los planes incluyen seguridad de datos y privacidad de tu investigación. <a
            href="seguridad.html">Ver política de datos &rarr;</a></p>
      </div>
    </section>

    <!-- ============ PRE-BLOG ============ -->
    <section class="section" id="blog">
      <div class="container">
        <div class="blog-head">
          <div class="section-head" style="margin-bottom:0">
            <span class="eyebrow">Recursos</span>
            <h2>Últimos artículos</h2>
          </div>
          <a href="blog.html" class="see-all">Ver todos <svg>
              <use href="/sprite.svg#ic-arrow" />
            </svg></a>
        </div>

        <div class="blog-grid">
          <a href="blog.html#q1-vs-q2" class="article-card">
            <div class="article-thumb t1"><span>Publicación académica</span></div>
            <div class="article-body">
              <h3>Q1 vs Q2: cómo decidir sin perder el semestre</h3>
              <p>Una guía directa para elegir tu revista objetivo según tu perfil real, no según el prestigio.</p>
              <div class="article-meta"><span>12 jul 2026</span><span class="rd">6 min <svg>
                    <use href="/sprite.svg#ic-arrow" />
                  </svg></span></div>
            </div>
          </a>
          <a href="blog.html#errores-citacion" class="article-card">
            <div class="article-thumb t2"><span>Buenas prácticas</span></div>
            <div class="article-body">
              <h3>5 errores de citación que más bajan tu originalidad</h3>
              <p>Los descuidos más comunes al parafrasear — y cómo detectarlos antes que el sistema antiplagio.</p>
              <div class="article-meta"><span>3 jul 2026</span><span class="rd">4 min <svg>
                    <use href="/sprite.svg#ic-arrow" />
                  </svg></span></div>
            </div>
          </a>
          <a href="blog.html#checklist-revision" class="article-card">
            <div class="article-thumb t3"><span>Checklist</span></div>
            <div class="article-body">
              <h3>Qué revisar antes de enviar a revisión por pares</h3>
              <p>Ocho puntos que casi nadie verifica antes de enviar — y que sí revisa el comité editorial.</p>
              <div class="article-meta"><span>28 jun 2026</span><span class="rd">5 min <svg>
                    <use href="/sprite.svg#ic-arrow" />
                  </svg></span></div>
            </div>
          </a>
        </div>
      </div>
    </section>

  
    ` }}>
    </div>
  );
}
