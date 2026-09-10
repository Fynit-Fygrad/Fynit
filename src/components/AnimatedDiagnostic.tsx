'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, Variants, useMotionValue, useTransform, animate } from 'framer-motion';
import '@/styles/components/AnimatedDiagnostic.css';
import { useMockupCursor } from '@/hooks/useMockupCursor';

export default function AnimatedDiagnostic() {
  const controls = useAnimation();
  const buttonControls = useAnimation();
  const downloadControls = useAnimation();
  const spinnerControls = useAnimation();
  const checkControls = useAnimation();
  const { reset: cursorReset, moveTo, click: cursorClick, hide: cursorHide, CursorNode } = useMockupCursor();
  
  // Motion Values for Counters
  const simVal = useMotionValue(0);
  const readVal = useMotionValue(0);
  const metVal = useMotionValue(0);
  const sumVal = useMotionValue(0);

  const simText = useTransform(simVal, v => `${Math.round(v)}%`);
  const readText = useTransform(readVal, Math.round);
  const metText = useTransform(metVal, Math.round);
  const sumText = useTransform(sumVal, v => `${Math.round(v)}/100`);

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    const runSequence = async () => {
      while (mountedRef.current) {
        // 1. Reset
        controls.set("reset");
        simVal.set(0); readVal.set(0); metVal.set(0); sumVal.set(0);
        cursorReset(280, 130);
        await sleep(500);
        if (!mountedRef.current) return;

        // 2. Fade in + stagger cards
        controls.start("visible");
        controls.start(i => ({
          opacity: 1, y: 0,
          transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
        }));

        // Cursor scans cards while they appear
        moveTo(140, 190, 350);
        await sleep(600);
        if (!mountedRef.current) return;

        // 3. Fill donuts & counters
        controls.start("fillDonut");
        animate(simVal, 18, { duration: 1, ease: "easeOut" });
        animate(readVal, 72, { duration: 1, ease: "easeOut" });
        animate(metVal, 68, { duration: 1, ease: "easeOut" });
        moveTo(330, 190, 400);
        await sleep(800);
        if (!mountedRef.current) return;

        // 4. Line chart + summary
        controls.start("drawLine");
        await sleep(400);
        if (!mountedRef.current) return;
        controls.start("popDot");
        await sleep(200);
        if (!mountedRef.current) return;
        controls.start("fillBar");
        animate(sumVal, 66, { duration: 0.8, ease: "easeOut" });
        moveTo(280, 360, 350);
        await sleep(800);
        if (!mountedRef.current) return;

        // 5. Cursor goes to Download button
        await moveTo(432, 42, 320);
        if (!mountedRef.current) return;
        await cursorClick(432, 42);
        if (!mountedRef.current) return;
        await buttonControls.start({ scale: 0.95, transition: { duration: 0.1 } });
        await buttonControls.start({ scale: 1, transition: { duration: 0.1 } });
        cursorHide(200);

        // 6. Download toast
        downloadControls.set({ opacity: 0, y: -10, display: 'flex' });
        spinnerControls.set({ opacity: 1, rotate: 0 });
        checkControls.set({ opacity: 0, scale: 0.5 });
        await downloadControls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
        if (!mountedRef.current) return;
        spinnerControls.start({ rotate: 360, transition: { duration: 0.6, ease: "linear", repeat: 1 } });
        await sleep(600);
        if (!mountedRef.current) return;
        spinnerControls.start({ opacity: 0, transition: { duration: 0.2 } });
        await checkControls.start({ opacity: 1, scale: 1, transition: { type: "spring", duration: 0.4 } });
        if (!mountedRef.current) return;

        // 7. Hold then fade
        await sleep(1500);
        if (!mountedRef.current) return;
        await controls.start("fadeOut");
        if (!mountedRef.current) return;
        downloadControls.start({ opacity: 0, transition: { duration: 0.5 } });
      }
    };

    runSequence();
    return () => { mountedRef.current = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerVariants: Variants = {
    reset: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    fadeOut: { opacity: 0, transition: { duration: 0.5 } }
  };

  const cardVariants: Variants = {
    reset: { opacity: 0, y: 15 },
    // visible is handled via custom controls.start(i => ...)
  };

  const donutVariants = (target: number): Variants => ({
    reset: { pathLength: 0 },
    fillDonut: { pathLength: target, transition: { duration: 1, ease: "easeOut" } }
  });

  const lineVariants: Variants = {
    reset: { pathLength: 0, opacity: 0 },
    drawLine: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const dotVariants: Variants = {
    reset: { scale: 0, opacity: 0 },
    popDot: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
  };

  const barVariants: Variants = {
    reset: { width: "0%" },
    fillBar: { width: "66%", transition: { duration: 0.8, ease: "easeOut" } }
  };

  // SVGs configs
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="adiag-wrapper" style={{ position: 'relative' }}>
      {CursorNode}
      <motion.div 
        className="adiag-container"
        animate={controls}
        variants={containerVariants}
        initial="reset"
      >
        {/* Header */}
        <motion.div custom={0} animate={controls} variants={cardVariants} className="adiag-header" style={{ position: 'relative' }}>
          <div className="adiag-h-left">
            <div className="adiag-h-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h4 className="adiag-h-title">Artículo_Final.docx</h4>
              <p className="adiag-h-sub">1.8 MB • Cargado hace un momento</p>
            </div>
          </div>
          <div className="adiag-h-status">
            <div className="adiag-h-status-text">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Análisis completado
            </div>
            <div className="adiag-h-time">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Tiempo total: 45s
            </div>
          </div>
          <motion.div className="adiag-h-btn-download" animate={buttonControls} style={{ transformOrigin: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Descargar reporte
          </motion.div>

          {/* Toast de descarga */}
          <motion.div
            animate={downloadControls}
            style={{
              position: 'absolute',
              right: '0px',
              top: 'calc(100% + 8px)',
              backgroundColor: '#1E293B',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              display: 'none',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              zIndex: 50,
              fontSize: '9px',
              fontWeight: 500,
            }}
          >
            <div style={{ backgroundColor: '#EF4444', borderRadius: '4px', padding: '4px', display: 'flex' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            </div>
            <span>Reporte_Artículo_Final.pdf</span>
            
            <div style={{ position: 'relative', width: '12px', height: '12px', marginLeft: '4px' }}>
              <motion.svg animate={spinnerControls} style={{ position: 'absolute', inset: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </motion.svg>
              <motion.svg animate={checkControls} style={{ position: 'absolute', inset: 0, color: '#10B981' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Top 4 Cards Grid */}
        <div className="adiag-grid">
          {/* Card 1: Similitud */}
          <motion.div custom={1} animate={controls} variants={cardVariants} className="adiag-card">
            <div className="adiag-card-content">
              <div className="adiag-c-title">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                SIMILITUD
              </div>
              <div className="adiag-c-value"><motion.span>{simText}</motion.span></div>
              <div className="adiag-badge green">
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor' }} />
                Riesgo bajo
              </div>
              <p className="adiag-c-desc">El nivel de similitud está dentro del rango aceptable.</p>
            </div>
            <div className="adiag-chart-ring">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="4" />
                <motion.circle 
                  cx="28" cy="28" r={radius} fill="none" stroke="#10B981" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={circumference}
                  transform="rotate(-90 28 28)"
                  variants={donutVariants(0.18)}
                />
              </svg>
              <div className="adiag-ring-text">
                <motion.span className="adiag-ring-val">{simText}</motion.span>
                <span className="adiag-ring-sub">de 100%</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Readiness */}
          <motion.div custom={2} animate={controls} variants={cardVariants} className="adiag-card">
            <div className="adiag-card-content">
              <div className="adiag-c-title">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                READINESS
              </div>
              <div className="adiag-c-value"><motion.span>{readText}</motion.span><span style={{fontSize: '14px', color: '#94A3B8'}}>/100</span></div>
              <div className="adiag-badge blue">
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor' }} />
                Buen progreso
              </div>
              <p className="adiag-c-desc">Tu manuscrito tiene una base sólida, pero aún hay mejoras.</p>
            </div>
            <div className="adiag-chart-ring">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="4" />
                <motion.circle 
                  cx="28" cy="28" r={radius} fill="none" stroke="#2563EB" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={circumference}
                  transform="rotate(-90 28 28)"
                  variants={donutVariants(0.72)}
                />
              </svg>
              <div className="adiag-ring-text">
                <motion.span className="adiag-ring-val">{readText}</motion.span>
                <span className="adiag-ring-sub">de 100</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Nivel Editorial */}
          <motion.div custom={3} animate={controls} variants={cardVariants} className="adiag-card">
            <div className="adiag-card-content">
              <div className="adiag-c-title">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                NIVEL EDITORIAL
              </div>
              <div className="adiag-c-value">Q3</div>
              <div className="adiag-badge orange">
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor' }} />
                Q2 posible
              </div>
              <p className="adiag-c-desc">Actualmente en Q3, pero puede aspirar a Q2 con ajustes.</p>
            </div>
            <div className="adiag-chart-ring">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="4" />
                <motion.circle 
                  cx="28" cy="28" r={radius} fill="none" stroke="#EA580C" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={circumference}
                  transform="rotate(-90 28 28)"
                  variants={donutVariants(0.6)} // Aprox Q3/Q4 visual
                />
              </svg>
              <div className="adiag-ring-text">
                <span className="adiag-ring-val">Q3</span>
                <span className="adiag-ring-sub">Actual</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Metodología */}
          <motion.div custom={4} animate={controls} variants={cardVariants} className="adiag-card">
            <div className="adiag-card-content">
              <div className="adiag-c-title">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                METODOLOGÍA
              </div>
              <div className="adiag-c-value"><motion.span>{metText}</motion.span><span style={{fontSize: '14px', color: '#94A3B8'}}>/100</span></div>
              <div className="adiag-badge orange">
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor' }} />
                Mejorable
              </div>
              <p className="adiag-c-desc">La metodología es adecuada, pero hay aspectos por fortalecer.</p>
            </div>
            <div className="adiag-chart-ring">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="4" />
                <motion.circle 
                  cx="28" cy="28" r={radius} fill="none" stroke="#F59E0B" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={circumference}
                  transform="rotate(-90 28 28)"
                  variants={donutVariants(0.68)}
                />
              </svg>
              <div className="adiag-ring-text">
                <motion.span className="adiag-ring-val">{metText}</motion.span>
                <span className="adiag-ring-sub">de 100</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="adiag-bottom-row">
          {/* Chart Card */}
          <motion.div custom={5} animate={controls} variants={cardVariants} className="adiag-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div className="adiag-c-title" style={{ color: '#0F172A', fontWeight: 700 }}>EVOLUCIÓN DEL READINESS</div>
            <div className="adiag-line-chart">
              {/* Y Axis labels */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '8px', color: '#94A3B8' }}>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>
              
              {/* Chart Area */}
              <div style={{ position: 'absolute', left: '20px', right: '10px', top: '4px', bottom: '16px' }}>
                <svg width="100%" height="100%" viewBox="0 0 200 80" preserveAspectRatio="none">
                  {/* Grid line */}
                  <line x1="0" y1="80" x2="200" y2="80" stroke="#E2E8F0" strokeWidth="1" />
                  
                  {/* Gradient Fill */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(37, 99, 235, 0.2)" />
                      <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Animated Path */}
                  <motion.path 
                    d="M 10 60 L 70 45 L 130 35 L 190 20" 
                    fill="none" 
                    stroke="#2563EB" 
                    strokeWidth="2.5" 
                    variants={lineVariants}
                  />
                  
                  {/* Dots */}
                  <motion.circle cx="10" cy="60" r="3" fill="#ffffff" stroke="#2563EB" strokeWidth="2" variants={dotVariants} />
                  <motion.circle cx="70" cy="45" r="3" fill="#ffffff" stroke="#2563EB" strokeWidth="2" variants={dotVariants} />
                  <motion.circle cx="130" cy="35" r="3" fill="#ffffff" stroke="#2563EB" strokeWidth="2" variants={dotVariants} />
                  <motion.circle cx="190" cy="20" r="3" fill="#ffffff" stroke="#2563EB" strokeWidth="2" variants={dotVariants} />
                </svg>

                {/* Values floating above dots */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  <motion.div variants={dotVariants} style={{ position: 'absolute', left: '10px', top: '48px', fontSize: '9px', fontWeight: 700, color: '#0F172A', transform: 'translateX(-50%)' }}>42</motion.div>
                  <motion.div variants={dotVariants} style={{ position: 'absolute', left: '35%', top: '33px', fontSize: '9px', fontWeight: 700, color: '#0F172A', transform: 'translateX(-50%)' }}>55</motion.div>
                  <motion.div variants={dotVariants} style={{ position: 'absolute', left: '65%', top: '23px', fontSize: '9px', fontWeight: 700, color: '#0F172A', transform: 'translateX(-50%)' }}>63</motion.div>
                  <motion.div variants={dotVariants} style={{ position: 'absolute', left: '95%', top: '8px', fontSize: '9px', fontWeight: 700, color: '#0F172A', transform: 'translateX(-50%)' }}>72</motion.div>
                </div>
              </div>

              {/* X Axis labels */}
              <div style={{ position: 'absolute', left: '20px', right: '10px', bottom: '-4px', display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#94A3B8' }}>
                <span>Borrador inicial</span>
                <span>Versión 1</span>
                <span>Versión 2</span>
                <span>Actual</span>
              </div>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div custom={6} animate={controls} variants={cardVariants} className="adiag-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div className="adiag-c-title" style={{ color: '#0F172A', fontWeight: 700 }}>RESUMEN GENERAL</div>
            <p className="adiag-c-desc" style={{ maxWidth: '100%', marginBottom: '12px' }}>
              Tu manuscrito tiene un buen potencial de publicación. Enfócate en las áreas señaladas para aumentar tus posibilidades.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <div className="adiag-c-title" style={{ margin: 0 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> PUNTAJE GLOBAL</div>
              <div className="adiag-c-value" style={{ margin: 0, fontSize: '14px' }}><motion.span>{sumText}</motion.span></div>
            </div>
            
            <div className="adiag-summary-bar-bg">
              <motion.div className="adiag-summary-bar-fill" variants={barVariants} />
            </div>
            
            <div className="adiag-badge green" style={{ margin: 0 }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'currentColor' }} />
              Buen progreso
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
