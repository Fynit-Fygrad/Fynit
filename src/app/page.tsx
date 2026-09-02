'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { showComingSoon } from '@/components/Toaster';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInteracted, setUserInteracted] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const howSectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLElement>(null);

  // Autoplay para "Cómo funciona"
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!userInteracted) {
      timer = setInterval(() => {
        setCurrentStep(prev => (prev % 4) + 1);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [userInteracted]);

  // Observer para "Contador de números"
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCountersVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (countersRef.current) {
      observer.observe(countersRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    setUserInteracted(true);
  };

  return (
    <>
    {/*  ============ HERO ============  */}
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy" data-aos="fade-up">
          <span className="eyebrow">IA ACADÉMICA · DIAGNÓSTICO EDITORIAL</span>
          <h1>
            De tu investigación a una{' '}
            <span className="highlight">ruta publicable
              <svg viewBox="0 0 300 24" preserveAspectRatio="none">
                <path d="M2 18C60 8 240 8 298 18" fill="none" strokeWidth="9" strokeLinecap="round" />
              </svg>
            </span>
            , sin adivinar.
          </h1>
          <p className="lead">Sube tu documento y en pocos segundos obtén un diagnóstico honesto: qué tan cerca estás de
            publicar, en qué revista tienes opciones reales y qué corregir primero.</p>
          <div className="hero-ctas">
            <a href="#" onClick={showComingSoon} className="btn btn-primary">Registrarse</a>
            <Link href="#como-funciona" className="btn btn-ghost">Ver cómo funciona</Link>
          </div>
          <div className="hero-honest"></div>
        </div>

        <div className="hero-visual" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} data-aos="zoom-in"
          data-aos-delay="200">
          <img src="assets/imgs png/hero-mockup.webp" alt="Mockup de Fynit en laptop y smartphone"
            style={{ width: '100%', maxWidth: '850px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
            loading="eager" />
        </div>
      </div>
    </section>

    {/*  ============ MARQUEE DISCIPLINAS ============  */}
    <section className="marquee-section" id="disciplinas">
      <div className="marquee-head" data-aos="fade-up">
        <span className="eyebrow">Para toda el área académica</span>
        <h2 style={{ fontSize: 'clamp(1.7rem,2.6vw,2.2rem)' }}>No importa tu disciplina, hablamos tu idioma editorial</h2>
      </div>
      <div className="marquee-wrap">
        <div className="marquee-track-left">
          {/*  Set 1 (1-6) duplicated for seamless loop  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
          {/*  Duplicate 1  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
          {/*  Duplicate 2  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
          {/*  Duplicate 3  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-bio" />
            </svg> Biología Avanzada</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-laptop" />
            </svg> Ciencias de la Computación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-scale" />
            </svg> Derecho Corporativo</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-brain" />
            </svg> Psicología Cognitiva</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-chart-bar" />
            </svg> Administración y Negocios</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-stethoscope" />
            </svg> Medicina Clínica</span>
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track-right">
          {/*  Set 2 (7-12) duplicated for seamless loop  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
          {/*  Duplicate 1  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
          {/*  Duplicate 2  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
          {/*  Duplicate 3  */}
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-leaf" />
            </svg> Ciencias Ambientales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-book" />
            </svg> Educación</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-cog" />
            </svg> Ingeniería y Tecnología</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-coins" />
            </svg> Economía</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-landmark" />
            </svg> Ciencias Sociales</span>
          <span className="pill"><svg className="ic-svg">
              <use href="/sprite.svg#ic-flask" />
            </svg> Química</span>
        </div>
      </div>
    </section>

    {/*  ============ SOBRE FYNIT / PROBLEMA ============  */}
    <section className="section about" id="nosotros">
      <div className="container about-grid">
        <div className="about-copy" data-aos="fade-up">
          <div className="about-hero-image" style={{ marginBottom: '24px', animation: 'floaty 6s ease-in-out infinite' }}>
            <img src="assets/imgs png/mascot_about.webp" alt="Fynit Mascota"
              style={{ width: '100%', maxWidth: '220px', height: 'auto', objectFit: 'contain' }} />
          </div>
          <h2>De investigadores para investigadores.</h2>
          <p style={{ textAlign: 'justify' }}>Fynit nace de un equipo de académicos que vivió de cerca la frustración de
            redactar y publicar a ciegas. Por eso, hemos desarrollado una inteligencia artificial especializada y
            entrenada para hacer tu camino editorial claro, riguroso y, sobre todo, predecible.</p>
          <div style={{ marginTop: '32px' }}>
            <Link href="#equipo" className="btn btn-ghost">Más sobre nosotros <svg>
                <use href="/sprite.svg#ic-arrow" />
              </svg></Link>
          </div>
        </div>

        <div className="pain-grid">
          <div className="pain-card" data-aos="fade-up" data-aos-delay="100">
            <div className="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-alert" />
              </svg>
            </div>
            <h3>Meses sin saber si vas bien</h3>
            <p>Revisas y revisas sin una señal clara de si tu metodología o tu argumento realmente sostienen una
              publicación.</p>
          </div>
          <div className="pain-card" data-aos="fade-up" data-aos-delay="200">
            <div className="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-list" />
              </svg>
            </div>
            <h3>Feedback disperso y tardío</h3>
            <p>El asesor lo dice por correo, el jurado en la sustentación, la revista al rechazarte. Casi nunca a
              tiempo.</p>
          </div>
          <div className="pain-card" data-aos="fade-up" data-aos-delay="300">
            <div className="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-journal" />
              </svg>
            </div>
            <h3>No sabes dónde postular</h3>
            <p>Cientos de revistas y conferencias, y ningún criterio claro sobre cuál se ajusta a tu perfil y tus
              tiempos.</p>
          </div>
          <div className="pain-card" data-aos="fade-up" data-aos-delay="400">
            <div className="icon-wrap">
              <svg>
                <use href="/sprite.svg#ic-target" />
              </svg>
            </div>
            <h3>El detalle que baja tu originalidad</h3>
            <p>Frases parafraseadas de más, citas mal formateadas: pequeños descuidos que restan sin que los notes.</p>
          </div>
        </div>
      </div>
    </section>


    {/*  ============ COMO FUNCIONA (núcleo interactivo) ============  */}
    <section className="section how" id="como-funciona" ref={howSectionRef}>
      <div className="container" style={{ position: 'relative' }}>
        {/*  Mascota Fynit 2 3D  */}
        <img src="assets/imgs png/fynit_mascot_2.webp" alt="Fynit Bot" className="fynit-mascot-active" loading="lazy"
          style={{ marginTop: '20px' }} />

        <div className="section-head" data-aos="fade-up">
          <span className="eyebrow">Cómo funciona</span>
          <h2>De tu manuscrito al plan de publicación</h2>
          <p>Cuatro pasos precisos. Sin código, sin esperas, sin adivinar.</p>
        </div>

        <div className="how-grid">
          <div className="how-steps" id="howSteps">
            <div className={`step-card ${currentStep === 1 ? "is-active" : ""}`} onClick={() => handleStepClick(1)} style={{ cursor: "pointer" }}>
              <span className="step-num">01</span>
              <div className="step-body">
                <h3>Carga y Diagnóstico Inmediato</h3>
                <p>Sube tu artículo (PDF/Word) y en segundos nuestra IA evalúa similitud, readiness y calidad
                  metodológica.</p>
              </div>
            </div>
            <div className={`step-card ${currentStep === 2 ? "is-active" : ""}`} onClick={() => handleStepClick(2)} style={{ cursor: "pointer" }}>
              <span className="step-num">02</span>
              <div className="step-body">
                <h3>Detección de Riesgos y Cuartil</h3>
                <p>Descubre qué secciones necesitan trabajo y conoce tu nivel de publicación actual (Q1-Q4) sin
                  adivinar.</p>
              </div>
            </div>
            <div className={`step-card ${currentStep === 3 ? "is-active" : ""}`} onClick={() => handleStepClick(3)} style={{ cursor: "pointer" }}>
              <span className="step-num">03</span>
              <div className="step-body">
                <h3>Match con Revistas Ideales</h3>
                <p>Recibe recomendaciones precisas de revistas y conferencias indexadas (Scopus, WoS) según tu fit
                  real.
                </p>
              </div>
            </div>
            <div className={`step-card ${currentStep === 4 ? "is-active" : ""}`} onClick={() => handleStepClick(4)} style={{ cursor: "pointer" }}>
              <span className="step-num">04</span>
              <div className="step-body">
                <h3>Plan de Acción y Red de Expertos</h3>
                <p>Sigue una ruta de mejora paso a paso o conecta con metedólogos y editores verificados para potenciar
                  tu paper.</p>
              </div>
            </div>
          </div>

          <div className="how-visual">
            <div className="visual-frame">
              {/*  Badges flotantes eliminados  */}
              <div className="visual-chrome"><span></span><span></span><span></span></div>
              <div className="visual-body" id="visualBody">

                {/*  Panel 1: Carga  */}
                <div className={`visual-panel ${currentStep === 1 ? "is-active" : ""}`}>
                  <img src="assets/imgs png/paso1_laptop_carga.webp" alt="Dashboard Fynit - Carga de documento"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                </div>

                {/*  Panel 2: Diagnóstico  */}
                <div className={`visual-panel ${currentStep === 2 ? "is-active" : ""}`}>
                  <img src="assets/imgs png/paso2_laptop_diagnostico.webp" alt="Dashboard Fynit - Diagnóstico con IA"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                </div>

                {/*  Panel 3: Match con Revistas  */}
                <div className={`visual-panel ${currentStep === 3 ? "is-active" : ""}`}>
                  <img src="assets/imgs png/paso3_laptop_revistas.webp" alt="Dashboard Fynit - Match con Revistas"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                </div>

                {/*  Panel 4: Plan de Acción y Red de Expertos  */}
                <div className={`visual-panel ${currentStep === 4 ? "is-active" : ""}`}>
                  <img src="assets/imgs png/paso4_laptop_plan.webp" alt="Dashboard Fynit - Plan de Acción"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  ============ NUMEROS ============  */}
    <section className="numbers" ref={countersRef}>
      <div className="container" style={{ position: 'relative', zIndex: '2' }}>

        <div className="numbers-grid">
          <div className="number-item" data-aos="fade-up" data-aos-delay="100">
            <div className="icon-wrap"><svg>
                <use href="/sprite.svg#ic-sparkles" />
              </svg></div>
            <div className="num"><span className="accent">Segundos</span></div>
            <div className="lbl">Para tu diagnóstico inicial completo — no días, no horas</div>
          </div>
          <div className="number-item" data-aos="fade-up" data-aos-delay="200">
            <div className="icon-wrap"><svg>
                <use href="/sprite.svg#ic-target" />
              </svg></div>
            <div className="num"><AnimatedCounter target={6} visible={countersVisible} /></div>
            <div className="metric-word">Métricas</div>
            <div className="lbl">Evaluadas en cada análisis con IA: similitud, metodología, readiness y más</div>
          </div>
          <div className="number-item" data-aos="fade-up" data-aos-delay="300">
            <div className="icon-wrap"><svg>
                <use href="/sprite.svg#ic-alert" />
              </svg></div>
            <div className="num"><span className="accent">3 a 5</span></div>
            <div className="metric-word">Riesgos</div>
            <div className="lbl">Priorizados automáticamente, no listados al azar</div>
          </div>
          <div className="number-item" data-aos="fade-up" data-aos-delay="400">
            <div className="icon-wrap"><svg>
                <use href="/sprite.svg#ic-journal" />
              </svg></div>
            <div className="num"><AnimatedCounter target={1} visible={countersVisible} /></div>
            <div className="metric-word">Ruta clara</div>
            <div className="lbl">Hacia la revista que sí tiene sentido para ti</div>
          </div>
        </div>
      </div>
    </section>

    {/*  ============ INDEXACIONES (Marquee) ============  */}
    <section className="indexing-marquee">
      <div className="indexing-label">Compatible con indexaciones y estándares de</div>
      <div className="marquee-outer" aria-hidden="true">
        <div className="marquee-reel">
          {/*  Scopus  */}
          <div className="idx-logo">
            <img src="assets/logos svg/logo-scopus.svg" alt="Scopus" loading="lazy" />
          </div>
          {/*  Web of Science  */}
          <div className="idx-logo">
            <img src="assets/logos svg/logo-wos.svg" alt="Web of Science" loading="lazy" />
          </div>
          {/*  IEEE  */}
          <div className="idx-logo">
            <img src="assets/logos svg/logo-ieee.svg" alt="IEEE Xplore" loading="lazy" />
          </div>
          {/*  DOAJ  */}
          <div className="idx-logo">
            <img src="assets/logos svg/logo-doaj.svg" alt="DOAJ" loading="lazy" />
          </div>
          {/*  Latindex  */}
          <div className="idx-logo">
            <img src="assets/logos svg/logo-latindex.svg" alt="Latindex" loading="lazy" />
          </div>
          {/*  SciELO  */}
          <div className="idx-logo">
            <img src="assets/logos svg/logo-scielo.svg" alt="SciELO" loading="lazy" />
          </div>
          {/*  Duplicate set for seamless loop  */}
          <div className="idx-logo">
            <img src="assets/logos svg/logo-scopus.svg" alt="Scopus" loading="lazy" />
          </div>
          <div className="idx-logo">
            <img src="assets/logos svg/logo-wos.svg" alt="Web of Science" loading="lazy" />
          </div>
          <div className="idx-logo">
            <img src="assets/logos svg/logo-ieee.svg" alt="IEEE Xplore" loading="lazy" />
          </div>
          <div className="idx-logo">
            <img src="assets/logos svg/logo-doaj.svg" alt="DOAJ" loading="lazy" />
          </div>
          <div className="idx-logo">
            <img src="assets/logos svg/logo-latindex.svg" alt="Latindex" loading="lazy" />
          </div>
          <div className="idx-logo">
            <img src="assets/logos svg/logo-scielo.svg" alt="SciELO" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    {/*  ============ TESTIMONIOS ============  */}
    <section className="section testimonials" id="testimonios">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Lo que dicen los primeros usuarios</span>
          <h2>Investigadores que ya lo probaron</h2>
          <p>Estos son los primeros investigadores que confiaron en Fynit. Su feedback construyó la herramienta.</p>
        </div>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote>"Tenía un artículo dando vueltas sin saber a dónde enviarlo. Fynit me dijo en minutos que
              tenía
              potencial Q3 y cuatro cosas concretas que mejorar. No me dio una lista genérica: me dió foco."
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar"><img
                  src="https://ui-avatars.com/api/?name=Maria+Quispe&background=009ca6&color=fff&size=128"
                  alt="Investigadora" loading="lazy" /></div>
              <div className="testi-info">
                <strong>Dra. María Sol Quispe</strong>
                <span>Investigadora en Educación, UNMSM</span>
              </div>
            </div>
          </div>
          <div className="testi-card featured">
            <div className="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote>"Subi mi tesis de maestría y en cuestión de segundos tenía un reporte que nunca había visto
              igual: similitud, metodología, cuartil alcanzable. Mi asesor quedó impresionado con el nivel del
              análisis."</blockquote>
            <div className="testi-author">
              <div className="testi-avatar"><img
                  src="https://ui-avatars.com/api/?name=Rodrigo+Salas&background=101728&color=fff&size=128"
                  alt="Investigador" loading="lazy" /></div>
              <div className="testi-info">
                <strong>Mg. Rodrigo Salas</strong>
                <span>Doctorado en Ing. Civil, PUCP</span>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote>"Lo que más me impresionó fue la honestidad del diagnóstico. No infla los números. Te dice
              exactamente dónde estás y cuánto te falta para el siguiente nivel editorial. Eso no tiene precio."
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar"><img
                  src="https://ui-avatars.com/api/?name=Carmen+Vidal&background=ff8c00&color=fff&size=128"
                  alt="Investigadora" loading="lazy" /></div>
              <div className="testi-info">
                <strong>Prof. Carmen Vidal, PhD</strong>
                <span>Directora de Investigación, UPC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  ============ PRECIOS ============  */}
    <section className="section pricing" id="precios">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Planes &amp; Precios</span>
          <h2>Elige el plan que se ajusta a tu etapa</h2>
          <p>Sin sorpresas. Empieza y escala cuando estés listo.</p>
        </div>
        <div className="pricing-grid">
          {/*  Plan Gratuito  */}
          <div className="price-card">
            <div className="price-badge">Gratis</div>
            <div className="price-title">Explorador</div>
            <div className="price-amount"><span className="price-num">$0</span><span className="price-per">/mes</span></div>
            <p className="price-desc">Ideal para evaluar el potencial de tus primeros manuscritos.</p>
            <ul className="price-features">
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
              <li className="off"><svg>
                  <use href="/sprite.svg#ic-close" />
                </svg> Reporte completo descargable</li>
            </ul>
            <Link href="analizar.html" className="btn btn-ghost btn-block">Empezar</Link>
          </div>
          {/*  Plan Pro  */}
          <div className="price-card popular">
            <div className="price-pop-label">Más popular</div>
            <div className="price-badge pro">Pro</div>
            <div className="price-title">Investigador</div>
            <div className="price-amount"><span className="price-num">$19</span><span className="price-per">/mes</span></div>
            <p className="price-desc">Para investigadores activos que quieren publicar este año.</p>
            <ul className="price-features">
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
            <Link href="analizar.html" className="btn btn-primary btn-block">Empezar 14 días gratis <svg>
                <use href="/sprite.svg#ic-arrow" />
              </svg></Link>
          </div>
          {/*  Plan Institucional  */}
          <div className="price-card">
            <div className="price-badge inst">Institucional</div>
            <div className="price-title">Facultad</div>
            <div className="price-amount"><span className="price-num" style={{ fontSize: '2rem' }}>A medida</span></div>
            <p className="price-desc">Para universidades, facultades y grupos de investigación.</p>
            <ul className="price-features">
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
            <Link href="analizar.html" className="btn btn-ghost btn-block">Contactar ventas</Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '24px' }}>
          <Link href="precios.html" className="btn btn-ghost">Ver más detalle</Link>
        </div>
        <p className="pricing-note">Todos los planes incluyen seguridad de datos y privacidad de tu investigación. <Link
            href="seguridad.html">Ver política de datos &rarr;</Link></p>
      </div>
    </section>

    {/*  ============ PRE-BLOG ============  */}
    <section className="section" id="blog">
      <div className="container">
        <div className="blog-head">
          <div className="section-head" style={{ marginBottom: '0' }}>
            <span className="eyebrow">Recursos</span>
            <h2>Últimos artículos</h2>
          </div>
          <Link href="blog.html" className="see-all">Ver todos <svg>
              <use href="/sprite.svg#ic-arrow" />
            </svg></Link>
        </div>

        <div className="blog-grid">
          <Link href="blog.html#q1-vs-q2" className="article-card">
            <div className="article-thumb t1"><span>Publicación académica</span></div>
            <div className="article-body">
              <h3>Q1 vs Q2: cómo decidir sin perder el semestre</h3>
              <p>Una guía directa para elegir tu revista objetivo según tu perfil real, no según el prestigio.</p>
              <div className="article-meta"><span>12 jul 2026</span><span className="rd">6 min <svg>
                    <use href="/sprite.svg#ic-arrow" />
                  </svg></span></div>
            </div>
          </Link>
          <Link href="blog.html#errores-citacion" className="article-card">
            <div className="article-thumb t2"><span>Buenas prácticas</span></div>
            <div className="article-body">
              <h3>5 errores de citación que más bajan tu originalidad</h3>
              <p>Los descuidos más comunes al parafrasear — y cómo detectarlos antes que el sistema antiplagio.</p>
              <div className="article-meta"><span>3 jul 2026</span><span className="rd">4 min <svg>
                    <use href="/sprite.svg#ic-arrow" />
                  </svg></span></div>
            </div>
          </Link>
          <Link href="blog.html#checklist-revision" className="article-card">
            <div className="article-thumb t3"><span>Checklist</span></div>
            <div className="article-body">
              <h3>Qué revisar antes de enviar a revisión por pares</h3>
              <p>Ocho puntos que casi nadie verifica antes de enviar — y que sí revisa el comité editorial.</p>
              <div className="article-meta"><span>28 jun 2026</span><span className="rd">5 min <svg>
                    <use href="/sprite.svg#ic-arrow" />
                  </svg></span></div>
            </div>
          </Link>
        </div>
      </div>
    </section>

    </>
  );
}


function AnimatedCounter({ target, visible }: { target: number, visible: boolean }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!visible) return;
    let start: number;
    const duration = 1100;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, visible]);
  
  return <span className="accent">{count}</span>;
}
