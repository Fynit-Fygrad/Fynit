'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants, useMotionValue, useTransform, animate } from 'framer-motion';
import '@/styles/components/AnimatedDropzone.css';
import { useMockupCursor } from '@/hooks/useMockupCursor';

export default function AnimatedDropzone() {
  const controls = useAnimation();
  const fillControls = useAnimation();
  const progress = useMotionValue(0);
  const roundedProgress = useTransform(progress, Math.round);
  const percentageText = useTransform(roundedProgress, (v) => `${v}%`);
  
  const [buttonState, setButtonState] = useState<'realizar' | 'analizando' | 'ir'>('realizar');
  const { reset: cursorReset, moveTo, click: cursorClick, hide: cursorHide, CursorNode } = useMockupCursor();

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      while (isMounted) {
        // 0. Reset
        controls.set("reset");
        fillControls.set({ width: "0%" });
        progress.set(0);
        setButtonState('realizar');
        cursorReset(115, 185); // dropzone center
        await new Promise(resolve => setTimeout(resolve, 800));

        // 1. PDF flies in — cursor moves to dropzone to "receive" it
        controls.start("flyIn");
        await moveTo(115, 185, 320); // move arrives as PDF finishes flying

        // 2. Dropzone activates — cursor click triggers drop
        controls.start("active");
        await new Promise(resolve => setTimeout(resolve, 150));
        await cursorClick(115, 185); // click fires: drop + success start simultaneously
        await controls.start("drop");
        controls.start("success");
        await new Promise(resolve => setTimeout(resolve, 300));

        // 3. File appears in sidebar — cursor slides right to see it
        controls.start("sidebarFile");
        moveTo(380, 175, 350); // move in parallel with sidebar animation
        await new Promise(resolve => setTimeout(resolve, 400));

        // 4. Cursor goes to checkbox — click ticks it
        await moveTo(365, 282, 300);
        await cursorClick(365, 282);
        controls.start("checkboxTick"); // ticks right after click
        await new Promise(resolve => setTimeout(resolve, 400));

        // 5. Cursor goes to button — click starts loading
        await moveTo(370, 314, 300);
        await cursorClick(370, 314);
        await controls.start("buttonActive"); // button scales right after click

        // Progress bar fills
        setButtonState('analizando');
        const fillDuration = 1.8;
        fillControls.start({
          width: "100%",
          transition: { duration: fillDuration, ease: "easeInOut" }
        });
        const progressAnim = animate(progress, 100, {
          duration: fillDuration,
          ease: "easeInOut"
        });

        // Cursor idles near the button while loading
        cursorHide(200);
        await progressAnim;

        // 6. Done
        setButtonState('ir');
        controls.start("buttonFinish");
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 7. Fade out
        await controls.start("fadeOut");
      }
    };

    runSequence();

    return () => { isMounted = false; };
  }, [controls, fillControls, progress, cursorReset, moveTo, cursorClick, cursorHide]);

  // Framer Motion Variants
  const dropzoneVariants: Variants = {
    reset: { borderColor: "var(--border, #CBD5E1)", backgroundColor: "transparent", opacity: 1 },
    active: { borderColor: "#175CD3", backgroundColor: "rgba(23, 92, 211, 0.04)" },
    success: { borderColor: "var(--border, #CBD5E1)", backgroundColor: "transparent" },
    fadeOut: { opacity: 0 }
  };

  const cloudVariants: Variants = {
    reset: { scale: 1, opacity: 1, y: 0 },
    active: { scale: 1.05, y: -5 },
    success: { scale: 0, opacity: 0 },
  };

  const pdfVariants: Variants = {
    reset: { x: 250, y: -250, rotate: 20, opacity: 0, scale: 0.5 },
    flyIn: { 
      x: 0, y: -70, rotate: -10, opacity: 1, scale: 1.1,
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    },
    drop: { 
      y: 0, rotate: 0, scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 15 } 
    },
    success: { scale: 0, opacity: 0, transition: { delay: 0.2 } },
  };

  const checkVariants: Variants = {
    reset: { scale: 0, opacity: 0 },
    success: { 
      scale: 1.1, opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.2 }
    },
  };

  const sidebarFileVariants: Variants = {
    reset: { opacity: 0, x: 40 },
    sidebarFile: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  const countVariants: Variants = {
    reset: { opacity: 1 },
    sidebarFile: { opacity: 0 }
  };

  const countActiveVariants: Variants = {
    reset: { opacity: 0, scale: 0.5 },
    sidebarFile: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
  };

  const checkboxVariants: Variants = {
    reset: { scale: 1, backgroundColor: "transparent", borderColor: "var(--border, #CBD5E1)" },
    checkboxTick: { 
      scale: [1, 0.8, 1.1, 1], 
      backgroundColor: "#10B981", 
      borderColor: "#10B981",
      transition: { duration: 0.3 }
    }
  };

  const checkmarkPathVariants: Variants = {
    reset: { pathLength: 0, opacity: 0 },
    checkboxTick: { pathLength: 1, opacity: 1, transition: { delay: 0.1, duration: 0.2 } }
  };

  const buttonWrapperVariants: Variants = {
    reset: { scale: 1 },
    buttonActive: { scale: [1, 0.97, 1], transition: { duration: 0.3 } },
    buttonFinish: { scale: [1, 1.03, 1], transition: { duration: 0.4 } }
  };

  return (
    <div className="ad-wrapper" style={{ position: 'relative' }}>
      {CursorNode}
      <motion.div 
        className="ad-container"
        animate={controls}
        variants={{ reset: { opacity: 1 }, fadeOut: { opacity: 0, transition: { duration: 0.5 } } }}
      >
        
        {/* Left Side: Dropzone */}
        <div className="ad-left">
          <h3 className="ad-title">Carga tu documento</h3>
          <p className="ad-subtitle">
            Sube tu artículo en PDF, DOCX o ambos formatos. Nuestra IA analizará similitud, readiness, cuartil y calidad metodológica.
          </p>

          <motion.div 
            animate={controls}
            variants={dropzoneVariants}
            className="ad-dropzone"
          >
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '16px', width: '100%', height: '44px' }}>
              {/* Animated PDF Icon */}
              <motion.div
                animate={controls}
                variants={pdfVariants}
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  width: '36px',
                  height: '36px',
                  background: '#EF4444',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '11px'
                }}
              >
                PDF
              </motion.div>

              {/* Default Cloud Icon */}
              <motion.div animate={controls} variants={cloudVariants} style={{ position: 'absolute', top: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" className="ad-cloud-icon" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" style={{ fill: 'rgba(56, 189, 248, 0.15)', stroke: '#38BDF8' }} />
                  <path d="M12 15V9" stroke="#0284C7" strokeWidth="2" />
                  <path d="m9 12 3-3 3 3" stroke="#0284C7" strokeWidth="2" />
                </svg>
              </motion.div>

              {/* Success Check Icon */}
              <motion.div
                animate={controls}
                variants={checkVariants}
                style={{ position: 'absolute', top: 0, bottom: 0, margin: 'auto' }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: '#10B981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </motion.div>
            </div>

            <h4 className="ad-dz-title">Arrastra y suelta tus archivos aquí</h4>
            <p className="ad-dz-sub">o haz clic para seleccionar</p>
            <p className="ad-dz-formats">Formatos permitidos: PDF, DOCX • Tamaño máx.: 50 MB</p>
            
            <div className="ad-dz-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Seleccionar archivos
            </div>
          </motion.div>
        </div>

        {/* Right Side: Sidebar */}
        <div className="ad-right">
          <div className="ad-sb-header">
            <span className="ad-sb-title">Archivos subidos</span>
            <div style={{ position: 'relative', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.span animate={controls} variants={countVariants} className="ad-sb-count" style={{ position: 'absolute' }}>0</motion.span>
              <motion.span animate={controls} variants={countActiveVariants} className="ad-sb-count" style={{ position: 'absolute', background: '#10B981', color: 'white' }}>1</motion.span>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            <motion.div animate={controls} variants={countVariants} className="ad-empty-state" style={{ position: 'absolute', inset: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px', opacity: 0.4 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="20 8 14 8 14 2" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Sube tus documentos para comenzar el análisis
            </motion.div>

            <motion.div animate={controls} variants={sidebarFileVariants} style={{ position: 'absolute', inset: 0 }}>
              <div className="ad-file-item">
                <div style={{ width: '28px', height: '28px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="20 8 14 8 14 2" />
                  </svg>
                </div>
                <div className="ad-file-info">
                  <span className="ad-file-name" style={{ fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>Manuscrito_Final.pdf</span>
                  <span className="ad-file-size" style={{ fontSize: '10px', color: '#64748B' }}>1.2 MB</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </motion.div>
          </div>

          <div className="ad-checkbox-row">
            <motion.div animate={controls} variants={checkboxVariants} className="ad-checkbox" style={{ width: '12px', height: '12px', borderWidth: '1.5px', borderRadius: '3px' }}>
              <motion.svg animate={controls} variants={checkmarkPathVariants} width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            </motion.div>
            <span className="ad-checkbox-text" style={{ fontSize: '9px', lineHeight: 1.4 }}>
              He leído y acepto la <span style={{ color: '#175CD3', fontWeight: 600 }}>Política de Privacidad</span> y términos de confidencialidad.
            </span>
          </div>

          <motion.div 
            className="ad-submit-btn-wrapper"
            animate={controls}
            variants={buttonWrapperVariants}
          >
            <motion.div className="ad-submit-btn-fill" animate={fillControls} />
            
            <div className={`ad-submit-btn-content ${buttonState !== 'realizar' ? 'active' : ''}`} style={{ fontSize: '11px', padding: '10px' }}>
              {buttonState === 'realizar' && (
                <>
                  Realizar Diagnóstico
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
              {buttonState === 'analizando' && (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>
                  Analizando... <motion.span>{percentageText}</motion.span>
                </>
              )}
              {buttonState === 'ir' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Ir a diagnóstico
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </motion.div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
