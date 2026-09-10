'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import '@/styles/components/AnimatedRealtimeCorrection.css';
import { useMockupCursor } from '@/hooks/useMockupCursor';

export default function AnimatedRealtimeCorrection() {
  const containerControls = useAnimation();
  
  // Similarity score
  const simVal = useMotionValue(18);
  const simText = useTransform(simVal, v => `${Math.round(v)}%`);
  const graphControls = useAnimation();
  const graphPath = useTransform(simVal, v => {
    // A simple mapping to simulate the graph dropping
    if (v >= 18) return "M 0 20 L 10 10 L 20 15 L 30 5 L 40 0";
    if (v >= 14) return "M 0 20 L 10 15 L 20 18 L 30 12 L 40 8";
    return "M 0 20 L 10 20 L 20 22 L 30 18 L 40 16";
  });

  // Text editing state
  const t1Old = "múltiples estudios han demostrado que el aprendizaje colaborativo mejora significativamente";
  const t1New = "la literatura reciente indica que el trabajo grupal potencia";
  const t1Idx = useMotionValue(t1Old.length);
  const t1Str = useTransform(t1Idx, v => t1Old.slice(0, Math.round(v)));
  const t1NIdx = useMotionValue(0);
  const t1NStr = useTransform(t1NIdx, v => t1New.slice(0, Math.round(v)));

  const t2Old = "cuestionario adaptado de investigaciones previas";
  const t2New = "instrumento propio previamente validado";
  const t2Idx = useMotionValue(t2Old.length);
  const t2Str = useTransform(t2Idx, v => t2Old.slice(0, Math.round(v)));
  const t2NIdx = useMotionValue(0);
  const t2NStr = useTransform(t2NIdx, v => t2New.slice(0, Math.round(v)));

  const cursor1Controls = useAnimation();
  const cursor2Controls = useAnimation();

  // Highlight wrapper controls
  const hl1Controls = useAnimation();
  const hl2Controls = useAnimation();

  // Risk badges & icons
  const risk1BadgeControls = useAnimation();
  const risk1IconControls = useAnimation();
  const risk2BadgeControls = useAnimation();
  const risk2IconControls = useAnimation();

  const toastControls = useAnimation();
  const { reset: cursorReset, moveTo, click: cursorClick, hide: cursorHide, CursorNode } = useMockupCursor();

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      while (isMounted) {
        // 1. Reset
        containerControls.set("reset");
        simVal.set(18);
        t1Idx.set(t1Old.length);
        t1NIdx.set(0);
        t2Idx.set(t2Old.length);
        t2NIdx.set(0);
        hl1Controls.set({ display: 'inline', backgroundColor: '#FEE2E2', color: '#B91C1C' });
        hl2Controls.set({ display: 'inline', backgroundColor: '#FEF3C7', color: '#B45309' });
        cursor1Controls.set({ display: 'none', opacity: 1 });
        cursor2Controls.set({ display: 'none', opacity: 1 });
        risk1BadgeControls.set({ backgroundColor: '#FEE2E2', color: '#EF4444' });
        risk1IconControls.set({ backgroundColor: '#FEE2E2', color: '#EF4444' });
        risk2BadgeControls.set({ backgroundColor: '#FEF3C7', color: '#D97706' });
        risk2IconControls.set({ backgroundColor: '#FEF3C7', color: '#D97706' });
        toastControls.set({ opacity: 0, y: 20 });
        cursorReset(110, 215);
        await new Promise(resolve => setTimeout(resolve, 500));

        // 2. Fade in
        containerControls.start("visible");
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 3. Cursor moves to text 1, click + text edit start simultaneously
        await moveTo(195, 215, 300);
        await cursorClick(195, 215);
        // cursor1Controls and text deletion start right after click
        cursor1Controls.set({ display: 'inline-block' });
        await new Promise(resolve => setTimeout(resolve, 400));
        await animate(t1Idx, 0, { duration: 0.5, ease: "linear" });
        hl1Controls.set({ display: 'none' });
        await animate(t1NIdx, t1New.length, { duration: 0.6, ease: "linear" });
        cursor1Controls.set({ display: 'none' });
        cursorHide(150);

        animate(simVal, 14, { duration: 0.6, ease: "easeInOut" });
        risk1BadgeControls.start({ backgroundColor: '#FEF3C7', color: '#D97706', transition: { duration: 0.5 } });
        risk1IconControls.start({ backgroundColor: '#FEF3C7', color: '#D97706', transition: { duration: 0.5 } });
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 4. Cursor moves to text 2, click + text edit start simultaneously
        await moveTo(200, 282, 300);
        await cursorClick(200, 282);
        cursor2Controls.set({ display: 'inline-block' });
        await new Promise(resolve => setTimeout(resolve, 400));
        await animate(t2Idx, 0, { duration: 0.4, ease: "linear" });
        hl2Controls.set({ display: 'none' });
        await animate(t2NIdx, t2New.length, { duration: 0.5, ease: "linear" });
        cursor2Controls.set({ display: 'none' });
        cursorHide(150);

        animate(simVal, 9, { duration: 0.6, ease: "easeInOut" });
        risk2BadgeControls.start({ backgroundColor: '#DCFCE7', color: '#10B981', transition: { duration: 0.5 } });
        risk2IconControls.start({ backgroundColor: '#DCFCE7', color: '#10B981', transition: { duration: 0.5 } });
        await new Promise(resolve => setTimeout(resolve, 800));

        // 5. Success toast
        await toastControls.start({ opacity: 1, y: 0, transition: { type: "spring", damping: 15 } });

        // 6. Hold then fade
        await new Promise(resolve => setTimeout(resolve, 2500));
        await containerControls.start("fadeOut");
      }
    };

    runSequence();
    return () => { isMounted = false; };
  }, [containerControls, simVal, hl1Controls, hl2Controls, cursor1Controls, cursor2Controls, risk1BadgeControls, risk1IconControls, risk2BadgeControls, risk2IconControls, toastControls, cursorReset, moveTo, cursorClick, cursorHide]);

  return (
    <div className="areal-wrapper" style={{ position: 'relative' }}>
      {CursorNode}
      <motion.div 
        className="areal-container"
        animate={containerControls}
        initial="reset"
        variants={{
          reset: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
          fadeOut: { opacity: 0, transition: { duration: 0.5 } }
        }}
      >
        <div className="areal-header">
          <div className="areal-h-left">
            <div className="areal-h-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <h4 className="areal-h-title">Riesgos detectados en el documento</h4>
              <p className="areal-h-sub">Identificamos problemas que afectan la calidad.</p>
            </div>
          </div>
          <div className="areal-header-stats">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '7px', color: '#64748B' }}>Similitud general</div>
                <motion.div className="areal-header-value">{simText}</motion.div>
              </div>
              {/* Mini gráfico */}
              <div style={{ width: '40px', height: '24px' }}>
                <svg width="100%" height="100%" viewBox="0 -5 45 30" preserveAspectRatio="none">
                  <motion.path 
                    d={graphPath} 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <circle cx="40" cy="0" r="2" fill="#EF4444" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="areal-body">
          {/* Left Panel: Document */}
          <div className="areal-doc">
            <div className="areal-doc-section">
              <h4>Introducción <span style={{ fontSize: '7px', color: '#EF4444', fontWeight: 600 }}>• 2 hallazgos</span></h4>
              <p>
                En la última década,{' '}
                <motion.span animate={hl1Controls} className="areal-hl-red">
                  <motion.span>{t1Str}</motion.span>
                </motion.span>
                <motion.span style={{ color: '#0F172A' }}>{t1NStr}</motion.span>
                <motion.span animate={cursor1Controls} className="areal-cursor" />
                {' '}el rendimiento académico.
              </p>
            </div>
            <div className="areal-doc-section">
              <h4>Metodología <span style={{ fontSize: '7px', color: '#D97706', fontWeight: 600 }}>• 1 hallazgo</span></h4>
              <p>
                Se utilizó un diseño cuasiexperimental con una muestra no probabilística. Los datos fueron recolectados mediante un{' '}
                <motion.span animate={hl2Controls} className="areal-hl-orange">
                  <motion.span>{t2Str}</motion.span>
                </motion.span>
                <motion.span style={{ color: '#0F172A' }}>{t2NStr}</motion.span>
                <motion.span animate={cursor2Controls} className="areal-cursor" />
                {' '}y analizados con estadística descriptiva e inferencial.
              </p>
            </div>
          </div>

          {/* Right Panel: Risks */}
          <div className="areal-risks">
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Lista de riesgos detectados</div>
            
            {/* Risk 1 */}
            <div className="areal-risk-card">
              <div className="areal-rc-header">
                <div className="areal-rc-title">
                  <motion.div className="areal-rc-icon" animate={risk1IconControls}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </motion.div>
                  <h5>Similitud alta en texto y frases</h5>
                </div>
                <motion.div animate={risk1BadgeControls} className="areal-badge-risk">Riesgo alto</motion.div>
              </div>
              <p className="areal-rc-desc">Se detectaron coincidencias textuales con fuentes externas (scielo.org).</p>
            </div>

            {/* Risk 2 */}
            <div className="areal-risk-card">
              <div className="areal-rc-header">
                <div className="areal-rc-title">
                  <motion.div className="areal-rc-icon" animate={risk2IconControls}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  </motion.div>
                  <h5>Limitaciones metodológicas</h5>
                </div>
                <motion.div animate={risk2BadgeControls} className="areal-badge-risk">Riesgo medio</motion.div>
              </div>
              <p className="areal-rc-desc">Aspectos metodológicos que podrían afectar la validez del estudio.</p>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        <motion.div animate={toastControls} className="areal-toast-success">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          ¡Buen progreso! Riesgo reducido
        </motion.div>
      </motion.div>
    </div>
  );
}
