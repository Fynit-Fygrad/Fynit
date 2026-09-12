'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { showComingSoon } from '@/components/Toaster';
import BlurText from '@/components/BlurText';
import TextType from '@/components/TextType';
import LusionCard from '@/components/LusionCard';
import AnimatedDropzone from '@/components/AnimatedDropzone';
import AnimatedDiagnostic from '@/components/AnimatedDiagnostic';
import AnimatedMatch from '@/components/AnimatedMatch';
import AnimatedActionPlan from '@/components/AnimatedActionPlan';
import AnimatedRealtimeCorrection from '@/components/AnimatedRealtimeCorrection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    num: '01',
    title: 'Carga y Diagnóstico Inmediato',
    desc: 'Sube tu artículo (PDF/Word) y en segundos nuestra IA evalúa similitud, readiness y calidad metodológica.',
  },
  {
    num: '02',
    title: 'Detección de Riesgos y Cuartil',
    desc: 'Descubre qué secciones necesitan trabajo y conoce tu nivel de publicación actual (Q1-Q4) sin adivinar.',
  },
  {
    num: '03',
    title: 'Match con Revistas Ideales',
    desc: 'Recibe recomendaciones precisas de revistas y conferencias indexadas (Scopus, WoS) según tu fit real.',
  },
  {
    num: '04',
    title: 'Plan de Acción y Red de Expertos',
    desc: 'Sigue una ruta de mejora paso a paso o conecta con metodólogos y editores verificados para potenciar tu paper.',
  },
  {
    num: '05',
    title: 'Corrección en Tiempo Real',
    desc: 'Edita tu manuscrito y observa cómo baja tu porcentaje de similitud al instante: un detector de originalidad en vivo que premia cada mejora que realizas.',
  },
];

export default function HowSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepKey, setStepKey] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  // Check mobile to unmount heavy animations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    setStepKey(k => k + 1);
    setHasInteracted(true);
  };

  useGSAP(() => {
    // ── 1. Mascot bounce on entry ──────────────────────────────
    gsap.from(mascotRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse', // replay on re-enter
      },
    });

    // ── 2. Cards stagger — each slides up & fades in ───────────
    // Set initial invisible state (removed blur for performance)
    gsap.set('.how-step-card', { opacity: 0, y: 44 });

    ScrollTrigger.batch('.how-step-card', {
      start: 'top 82%',
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
          overwrite: true,
        });
      },
      onLeaveBack: (batch) => {
        // Reset to hidden when scrolling back up
        gsap.to(batch, {
          opacity: 0,
          y: 44,
          duration: 0.3,
          stagger: 0.04,
          ease: 'power2.in',
          overwrite: true,
        });
      },
    });

    // ── 3. Mac frame slides in from right ──────────────────────
    if (frameRef.current) {
      gsap.from(frameRef.current, {
        opacity: 0,
        x: 60,
        scale: 0.94,
        duration: 0.65,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse', // replay on re-enter
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      className="section how bg-hero-gradient"
      id="como-funciona"
      ref={sectionRef}
      style={{ position: 'relative', paddingTop: '60px' }}
    >
      {/* ── Encabezado ─────────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', marginBottom: '40px' }}>
        <img
          ref={mascotRef}
          src="assets/imgs png/fynit_mascot_2.webp"
          alt="Fynit Bot"
          className="fynit-mascot-active"
          loading="lazy"
          style={{ marginTop: '20px' }}
        />
        <div
          className="section-head"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <div className="title-wrapper" style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
            <TextType
              text={['Cómo funciona', 'El proceso', 'Paso a paso']}
              typingSpeed={70}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={40}
              className="premium-typing-text"
            />
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <BlurText
                text="DE TU MANUSCRITO AL PLAN DE PUBLICACIÓN"
                highlightWords={['PUBLICACIÓN']}
                className="massive-title black-title"
                delay={30}
                animateBy="words"
                direction="top"
                style={{ justifyContent: 'flex-start', fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', lineHeight: '0.93' }}
              />
            </div>
          </div>
          <p>Descubre el proceso en acción. <strong>Haz clic</strong> en cualquier paso para explorarlo.</p>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────── */}
      <div className="how-container" style={{ position: 'relative' }}>
        <div className="container">
          <div className="how-grid" style={{ alignItems: 'flex-start' }}>

            {/* Left: steps list */}
            <div
              className="how-steps-container"
              ref={stepsRef}
              style={{ display: 'flex', gap: '20px', position: 'relative' }}
            >
              {/* Vertical progress track — con luz viajera (Mejora 5) */}
              <div
                className="scroll-timeline-track"
                style={{ width: '4px', background: 'var(--line)', borderRadius: '4px', position: 'relative', overflow: 'hidden', marginTop: '22px', marginBottom: '22px' }}
              >
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--color-fynit-blue, var(--blue))', transformOrigin: 'top' }}
                  animate={{ scaleY: currentStep / 5 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
                {/* Shimmer / traveling light overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '-100%',
                  width: '100%',
                  height: '40%',
                  background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.8), transparent)',
                  animation: 'travelLight 2s ease-in-out infinite',
                  pointerEvents: 'none',
                }} />
              </div>

              <div className="how-steps" id="howSteps" style={{ flex: 1 }}>
                {STEPS.map((step, i) => {
                  const stepNum = i + 1;
                  const isActive = currentStep === stepNum;
                  return (
                    <LusionCard
                      key={step.num}
                      className={`step-card how-step-card ${isActive ? 'is-active' : ''}`}
                      isActive={isActive}
                      onClick={() => handleStepClick(stepNum)}
                    >
                      <span className="step-num">{step.num}</span>
                      <div className="step-body">
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                      {!hasInteracted && stepNum === 1 && <span className="step-hint-dot" />}
                    </LusionCard>
                  );
                })}
              </div>
            </div>

            {/* Right: macOS frame (HIDDEN ON MOBILE TO PREVENT CPU LAG FROM BACKGROUND ANIMATIONS) */}
            {!isMobile && (
              <div className="how-visual">
                <div className="visual-frame" ref={frameRef}>
                  <div className="visual-chrome">
                    <span /><span /><span />
                  </div>
                  <div
                    className="visual-body"
                    style={{ display: 'grid', position: 'relative', width: '100%', minHeight: '450px' }}
                  >
                    {/* Hint label */}
                    <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, zIndex: 10, fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                      Animación ilustrativa de cómo funciona —
                      <span onClick={() => showComingSoon()} style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>Regístrate para probarlo tú mismo</span>
                    </div>

                    {/* Step visuals stacked on same grid cell */}
                    {[
                      { comp: <AnimatedDropzone key={`drop-${stepKey}`} />, step: 1 },
                      { comp: <AnimatedDiagnostic key={`diag-${stepKey}`} />, step: 2 },
                      { comp: <AnimatedMatch key={`match-${stepKey}`} />, step: 3 },
                      { comp: <AnimatedActionPlan key={`aplan-${stepKey}`} />, step: 4 },
                      { comp: <AnimatedRealtimeCorrection key={`areal-${stepKey}`} />, step: 5 },
                    ].map(({ comp, step }) => (
                      <div
                        key={step}
                        style={{
                          gridArea: '1 / 1 / 2 / 2',
                          opacity: currentStep === step ? 1 : 0,
                          visibility: currentStep === step ? 'visible' : 'hidden',
                          transition: 'opacity 0.4s ease-in-out',
                          zIndex: currentStep === step ? 20 : 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingTop: '44px',
                        }}
                      >
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
