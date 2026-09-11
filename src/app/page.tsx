'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showComingSoon } from '@/components/Toaster';
import { useTheme } from 'next-themes';
import DisciplinesCarousel from '@/components/DisciplinesCarousel';
import AboutScrollSection from '@/components/AboutScrollSection';
import OrbitalIndexaciones from '@/components/OrbitalIndexaciones';
import AwwwardsStats from '@/components/AwwwardsStats';
import HowSection from '@/components/HowSection';
import TextType from '@/components/TextType';
import BlurText from '@/components/BlurText';
import LusionCard from '@/components/LusionCard';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepKey, setStepKey] = useState(0);
  const [countersVisible, setCountersVisible] = useState(false);
  const howSectionRef = useRef<HTMLElement>(null);

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const countersRef = useRef<HTMLElement>(null);

  // Observer para "Contador de números"
  useEffect(() => {
    setMounted(true);

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
    setStepKey(k => k + 1);
    setHasInteracted(true);
  };

  const isDark = mounted && theme === 'dark';
  const heroBg = isDark ? "assets/imgs png/hero-bg-dark.webp" : "assets/imgs png/hero-bg.webp";
  const mascotImg = isDark ? "assets/imgs png/epic-mascot-dark.webp" : "assets/imgs png/epic-mascot.webp";

  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
      <link rel="preload" as="image" href={heroBg} fetchPriority="high" />
      <link rel="preload" as="image" href={mascotImg} fetchPriority="high" />

      {/*  ============ EPIC HERO ============  */}
      <section className="epic-hero-section" id="inicio">
      {/* 
        Hero Section
        NOTA: Hemos eliminado WebGLBackground global para mejorar radicalmente 
        el rendimiento y eliminar el lag en el modo oscuro.
      */} 
        <div
          className="epic-hero-bg"
          style={{ backgroundImage: `url('${heroBg}')` }}
          aria-hidden="true"
        />

        {/* Main content grid: Left | Center | Right */}
        <div className="epic-main-grid">

          {/* ── LEFT: copy ── */}
          <div className="epic-left">
            <div className="epic-eyebrow">
              <span className="epic-num">01</span>
              <span>PLATAFORMA DE INTELIGENCIA ARTIFICIAL</span>
            </div>

            <h1 className="epic-h1">
              DIAGNÓSTICO.<br />
              PUBLICACIÓN.<br />
              <em>IMPACTO.</em>
            </h1>

            <p className="epic-lead">
              Fynit es la plataforma de IA que potencia cada etapa
              de tu investigación, desde la idea hasta la publicación
              en revistas de alto impacto.
            </p>

            <div className="epic-ctas">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); showComingSoon(); }}
                className="epic-btn-yellow"
                data-cursor
              >
                <span>Registrarse</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <Link href="#demo" className="epic-btn-ghost" data-cursor>
                Ver cómo funciona →
              </Link>
            </div>
          </div>

          {/* ── CENTER: mascot ── */}
          <div className="epic-center">
            <img
              src={mascotImg}
              alt="Fynit AI Mascot"
              className="epic-mascot"
              fetchPriority="high"
              width={800}
              height={800}
            />
          </div>

          {/* ── RIGHT: features ── */}
          <aside className="epic-features">

            <div className="epic-feature">
              <div className="epic-feat-connector"></div>
              <div className="epic-feat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              </div>
              <div className="epic-feat-text">
                <h3>ANÁLISIS<br />INTELIGENTE</h3>
                <p>Evaluación profunda de calidad, originalidad y pertinencia académica.</p>
              </div>
            </div>

            <div className="epic-feature">
              <div className="epic-feat-connector"></div>
              <div className="epic-feat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              </div>
              <div className="epic-feat-text">
                <h3>SUGERENCIAS<br />PERSONALIZADAS</h3>
                <p>Recomendaciones de mejora y journals ideales para tu investigación.</p>
              </div>
            </div>

            <div className="epic-feature">
              <div className="epic-feat-connector"></div>
              <div className="epic-feat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </div>
              <div className="epic-feat-text">
                <h3>PUBLICACIÓN<br />ESTRATÉGICA</h3>
                <p>Te guiamos para lograr publicaciones en revistas de alto impacto.</p>
              </div>
            </div>

          </aside>

          {/* Pager */}
          <div className="epic-pager">
            <button aria-label="Anterior">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button aria-label="Siguiente">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>


        </div>
      </section>


      {/*  ============ CAROUSEL 3D DISCIPLINAS ============  */}
      <DisciplinesCarousel />

      {/*  ============ SOBRE FYNIT / PROBLEMA (Rediseñado Scroll Storytelling) ============  */}
      <AboutScrollSection />

      {/*  ============ COMO FUNCIONA (GSAP Stagger + click) ============  */}
      <HowSection />


      {/*  ============ ESTADÍSTICAS AWWWARDS ============  */}
      <AwwwardsStats />

      {/*  ============ INDEXACIONES (Orbital 3D / ANUBI style) ============  */}
      <OrbitalIndexaciones />

      {/*  ============ TESTIMONIOS ============  */}
      <section className="section testimonials bg-hero-gradient" id="testimonios">
        <div className="container">
          <div className="section-head center" data-aos="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="title-wrapper" style={{ alignItems: 'center', marginBottom: '16px' }}>
              <TextType
                text={["Lo que dicen los usuarios", "Casos de éxito", "Nuestra comunidad"]}
                typingSpeed={70} pauseDuration={1500} showCursor cursorCharacter="_" deletingSpeed={40}
                className="premium-typing-text"
              />
              <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <BlurText text="INVESTIGADORES QUE YA LO PROBARON" highlightWords={['PROBARON']} className="massive-title black-title" delay={30} animateBy="words" direction="top" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', lineHeight: '0.93' }} />
              </div>
            </div>
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
      <section className="section pricing bg-hero-gradient" id="precios">
        <div className="container">
          <div className="section-head center" data-aos="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            <div className="title-wrapper" style={{ alignItems: 'center', marginBottom: '16px' }}>
              <TextType
                text={["Planes & Precios", "Tu inversión", "Escala tu impacto"]}
                typingSpeed={70} pauseDuration={1500} showCursor cursorCharacter="_" deletingSpeed={40}
                className="premium-typing-text"
              />
              <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <BlurText text="ELIGE EL PLAN QUE SE AJUSTA A TU ETAPA" highlightWords={['PLAN']} className="massive-title black-title" delay={30} animateBy="words" direction="top" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', lineHeight: '0.93' }} />
              </div>
            </div>
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
      <section className="section bg-hero-gradient" id="blog">
        <div className="container">
          <div className="blog-head">
            <div className="section-head" style={{ marginBottom: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="title-wrapper" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                <TextType
                  text={["Recursos", "Blog y Guías", "Aprende más"]}
                  typingSpeed={70} pauseDuration={1500} showCursor cursorCharacter="_" deletingSpeed={40}
                  className="premium-typing-text"
                />
                <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <BlurText text="ÚLTIMOS ARTÍCULOS" highlightWords={['ARTÍCULOS']} className="massive-title black-title" delay={30} animateBy="words" direction="top" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', lineHeight: '0.93' }} />
                </div>
              </div>
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
      </div>
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
