'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import '@/styles/components/AnimatedMatch.css';
import { useMockupCursor } from '@/hooks/useMockupCursor';

export default function AnimatedMatch() {
  const containerControls = useAnimation();
  const screenAControls = useAnimation();
  const screenBControls = useAnimation();
  const rowControls = useAnimation();
  const bannerControls = useAnimation();
  const clickControls = useAnimation();
  const bBarsControls = useAnimation();
  const tagControls = useAnimation();

  const mountedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const verDetallesBtn1Ref = useRef<HTMLDivElement>(null);
  const verDetallesBtn2Ref = useRef<HTMLDivElement>(null);

  const { reset: cursorReset, moveTo, moveToEl, clickEl, hide: cursorHide, CursorNode } = useMockupCursor();

  const fit1 = useMotionValue(0);
  const fit2 = useMotionValue(0);
  const fit3 = useMotionValue(0);
  const fit1Text = useTransform(fit1, (v: number) => `${Math.round(v)}%`);
  const fit2Text = useTransform(fit2, (v: number) => `${Math.round(v)}%`);
  const fit3Text = useTransform(fit3, (v: number) => `${Math.round(v)}%`);
  const fit1Width = useTransform(fit1, (v: number) => `${v}%`);
  const fit2Width = useTransform(fit2, (v: number) => `${v}%`);
  const fit3Width = useTransform(fit3, (v: number) => `${v}%`);

  const b1 = useMotionValue(0);
  const b2 = useMotionValue(0);
  const b3 = useMotionValue(0);
  const b4 = useMotionValue(0);
  const b1Text = useTransform(b1, (v: number) => `${Math.round(v)}%`);
  const b2Text = useTransform(b2, (v: number) => `${Math.round(v)}%`);
  const b3Text = useTransform(b3, (v: number) => `${Math.round(v)}%`);
  const b4Text = useTransform(b4, (v: number) => `${Math.round(v)}%`);

  useEffect(() => {
    mountedRef.current = true;

    const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    const runSequence = async () => {
      while (mountedRef.current) {
        containerControls.set("reset");
        screenAControls.set({ opacity: 1, x: 0, display: 'flex' });
        screenBControls.set({ opacity: 0, x: 50, display: 'none' });
        rowControls.set({ opacity: 0, y: 15 });
        bannerControls.set({ opacity: 0, scale: 0.95 });
        clickControls.set({ scale: 1 });
        bBarsControls.set({ width: '0%' });
        tagControls.set({ opacity: 0, scale: 0.8 });
        fit1.set(0); fit2.set(0); fit3.set(0);
        b1.set(0); b2.set(0); b3.set(0); b4.set(0);
        cursorReset(200, 125);

        await sleep(500);
        if (!mountedRef.current) return;

        containerControls.start("visible");
        rowControls.start((i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" } }));
        moveTo(200, 125, 350);

        await sleep(600);
        if (!mountedRef.current) return;

        animate(fit1, 86, { duration: 0.8, ease: "easeOut" });
        animate(fit2, 79, { duration: 0.8, ease: "easeOut" });
        animate(fit3, 74, { duration: 0.8, ease: "easeOut" });

        await moveToEl(verDetallesBtn2Ref, wrapperRef, 500);
        if (!mountedRef.current) return;

        await sleep(350);
        if (!mountedRef.current) return;

        await moveToEl(verDetallesBtn1Ref, wrapperRef, 350);
        if (!mountedRef.current) return;

        await sleep(500);
        if (!mountedRef.current) return;

        await bannerControls.start({ opacity: 1, scale: 1, transition: { type: "spring", duration: 0.6 } });
        if (!mountedRef.current) return;

        await sleep(700);
        if (!mountedRef.current) return;

        await clickEl(verDetallesBtn1Ref, wrapperRef);
        if (!mountedRef.current) return;

        await clickControls.start({ scale: 0.95, transition: { duration: 0.1 } });
        await clickControls.start({ scale: 1, transition: { duration: 0.1 } });
        cursorHide(200);

        await sleep(300);
        if (!mountedRef.current) return;

        screenBControls.set({ display: 'flex' });
        screenAControls.start({ opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeInOut" } });
        await screenBControls.start({ opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } });
        if (!mountedRef.current) return;
        screenAControls.set({ display: 'none' });

        await sleep(300);
        if (!mountedRef.current) return;

        bBarsControls.start((i: number) => {
          const targets = ['91%', '84%', '82%', '87%'];
          return { width: targets[i], transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } };
        });
        animate(b1, 91, { duration: 0.6, ease: "easeOut", delay: 0 });
        animate(b2, 84, { duration: 0.6, ease: "easeOut", delay: 0.1 });
        animate(b3, 82, { duration: 0.6, ease: "easeOut", delay: 0.2 });
        animate(b4, 87, { duration: 0.6, ease: "easeOut", delay: 0.3 });
        tagControls.start((i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1 + 0.4, type: "spring", duration: 0.4 } }));

        await sleep(2500);
        if (!mountedRef.current) return;

        await containerControls.start("fadeOut");
      }
    };

    runSequence();
    return () => { mountedRef.current = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="amatch-wrapper" style={{ position: 'relative' }} ref={wrapperRef}>
      {CursorNode}
      <motion.div
        className="amatch-container"
        animate={containerControls}
        initial="reset"
        variants={{ reset: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } }, fadeOut: { opacity: 0, transition: { duration: 0.5 } } }}
      >
        <motion.div className="amatch-screen" animate={screenAControls}>
          <div className="amatch-header">
            <div className="amatch-h-left">
              <div className="amatch-h-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <div>
                <h4 className="amatch-h-title">Articulo_Final.docx</h4>
                <p className="amatch-h-sub">Match con revistas ideales</p>
              </div>
            </div>
            <div className="amatch-h-status-text">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              Analisis completado
            </div>
          </div>

          <div className="amatch-table">
            <motion.div custom={0} animate={rowControls} className="amatch-row">
              <div className="amatch-r-main">
                <div className="amatch-r-icon" style={{ backgroundColor: '#2563EB' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                </div>
                <div className="amatch-r-info"><h4>Journal of Research Methods</h4><p>ISSN: 1743-188X</p></div>
              </div>
              <div className="amatch-r-badges">
                <span className="amatch-badge q2">Q2</span>
                <span className="amatch-badge scopus">Scopus</span>
                <span className="amatch-badge wos">WoS</span>
              </div>
              <div className="amatch-r-fit" style={{ width: '60px' }}>
                <div className="amatch-r-fit-header">
                  <motion.span style={{ color: '#10B981' }}>{fit1Text}</motion.span>
                  <span style={{ color: '#94A3B8', fontWeight: 500 }}>Fit real</span>
                </div>
                <div className="amatch-r-fit-bar-bg"><motion.div className="amatch-r-fit-bar-fill" style={{ backgroundColor: '#10B981', width: fit1Width }} /></div>
              </div>
              <motion.div ref={verDetallesBtn1Ref} className="amatch-btn-outline" animate={clickControls} style={{ transformOrigin: 'center' }}>
                Ver detalles
              </motion.div>
            </motion.div>

            <motion.div custom={1} animate={rowControls} className="amatch-row">
              <div className="amatch-r-main">
                <div className="amatch-r-icon" style={{ backgroundColor: '#166534' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                </div>
                <div className="amatch-r-info"><h4>Academic Science Review</h4><p>ISSN: 1022-1301</p></div>
              </div>
              <div className="amatch-r-badges">
                <span className="amatch-badge q2">Q2</span>
                <span className="amatch-badge scopus">Scopus</span>
                <span className="amatch-badge wos">WoS</span>
              </div>
              <div className="amatch-r-fit" style={{ width: '60px' }}>
                <div className="amatch-r-fit-header">
                  <motion.span style={{ color: '#10B981' }}>{fit2Text}</motion.span>
                  <span style={{ color: '#94A3B8', fontWeight: 500 }}>Fit real</span>
                </div>
                <div className="amatch-r-fit-bar-bg"><motion.div className="amatch-r-fit-bar-fill" style={{ backgroundColor: '#10B981', width: fit2Width }} /></div>
              </div>
              <div ref={verDetallesBtn2Ref} className="amatch-btn-outline">Ver detalles</div>
            </motion.div>

            <motion.div custom={2} animate={rowControls} className="amatch-row">
              <div className="amatch-r-main">
                <div className="amatch-r-icon" style={{ backgroundColor: '#312E81' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                </div>
                <div className="amatch-r-info"><h4>International Journal of Education</h4><p>ISSN: 0020-7233</p></div>
              </div>
              <div className="amatch-r-badges">
                <span className="amatch-badge q3">Q3</span>
                <span className="amatch-badge scopus">Scopus</span>
                <span className="amatch-badge wos">WoS</span>
              </div>
              <div className="amatch-r-fit" style={{ width: '60px' }}>
                <div className="amatch-r-fit-header">
                  <motion.span style={{ color: '#EA580C' }}>{fit3Text}</motion.span>
                  <span style={{ color: '#94A3B8', fontWeight: 500 }}>Fit real</span>
                </div>
                <div className="amatch-r-fit-bar-bg"><motion.div className="amatch-r-fit-bar-fill" style={{ backgroundColor: '#EA580C', width: fit3Width }} /></div>
              </div>
              <div className="amatch-btn-outline">Ver detalles</div>
            </motion.div>
          </div>

          <motion.div className="amatch-banner" animate={bannerControls}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="amatch-banner-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12l5.25 5 12.75-12"/></svg>
              </div>
              <div>
                <h3>Mejor opcion para ti</h3>
                <p>Segun el analisis de tu manuscrito, esta revista tiene el mayor fit real.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ fontSize: '9px', fontWeight: 700, margin: '0 0 2px 0', color: '#0F172A' }}>J. Research Methods</h4>
                <div style={{ fontSize: '8px', color: '#10B981', fontWeight: 600 }}>86% fit real</div>
              </div>
              <div className="amatch-btn-outline" style={{ backgroundColor: '#2563EB', color: 'white', border: 'none' }}>Ver detalles</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="amatch-screen" animate={screenBControls}>
          <div className="amatch-back-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Volver a sugerencias
          </div>
          <div className="amatch-header" style={{ marginBottom: '12px' }}>
            <div className="amatch-h-left">
              <div className="amatch-h-icon" style={{ backgroundColor: '#2563EB', color: 'white' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              </div>
              <div>
                <h4 className="amatch-h-title" style={{ fontSize: '12px' }}>Computers and Education</h4>
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                  <span className="amatch-badge q2">Q1</span>
                  <span className="amatch-badge scopus">Scopus</span>
                  <span className="amatch-badge wos">WoS</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="amatch-h-status-text" style={{ justifyContent: 'flex-end', marginBottom: '2px' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                Alta compatibilidad
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                86% <span style={{ fontSize: '8px', color: '#94A3B8', fontWeight: 500 }}>Fit real</span>
              </div>
            </div>
          </div>
          <div className="amatch-det-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="amatch-det-card">
                <div className="amatch-det-title">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  Por que es una buena opcion
                </div>
                <div className="amatch-det-factor">
                  <div className="amatch-det-factor-head"><span>Alineacion tematica</span><span style={{ color: '#10B981' }}>Alta</span></div>
                  <p className="amatch-det-factor-desc">Coincide con el enfoque en metodos de investigacion en educacion.</p>
                </div>
                <div className="amatch-det-factor">
                  <div className="amatch-det-factor-head"><span>Alcance</span><span style={{ color: '#10B981' }}>Alta</span></div>
                  <p className="amatch-det-factor-desc">Tiene un alcance internacional y buena visibilidad.</p>
                </div>
              </div>
              <div className="amatch-det-card" style={{ flex: 1 }}>
                <div className="amatch-det-title">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                  Areas de coincidencia
                </div>
                <div style={{ marginTop: '8px' }}>
                  <motion.span custom={0} animate={tagControls} className="amatch-tag">Investigacion educativa</motion.span>
                  <motion.span custom={1} animate={tagControls} className="amatch-tag">Metodologia</motion.span>
                  <motion.span custom={2} animate={tagControls} className="amatch-tag">Tecnologia educativa</motion.span>
                  <motion.span custom={3} animate={tagControls} className="amatch-tag">Analisis de datos</motion.span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="amatch-det-card">
                <div className="amatch-det-title">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  Analisis de compatibilidad
                </div>
                <div className="amatch-r-fit" style={{ marginBottom: '8px' }}>
                  <div className="amatch-r-fit-header" style={{ color: '#0F172A' }}>Alineacion tematica <motion.span>{b1Text}</motion.span></div>
                  <div className="amatch-r-fit-bar-bg"><motion.div custom={0} animate={bBarsControls} className="amatch-r-fit-bar-fill" style={{ backgroundColor: '#10B981' }} /></div>
                </div>
                <div className="amatch-r-fit" style={{ marginBottom: '8px' }}>
                  <div className="amatch-r-fit-header" style={{ color: '#0F172A' }}>Metodologia <motion.span>{b2Text}</motion.span></div>
                  <div className="amatch-r-fit-bar-bg"><motion.div custom={1} animate={bBarsControls} className="amatch-r-fit-bar-fill" style={{ backgroundColor: '#2563EB' }} /></div>
                </div>
                <div className="amatch-r-fit" style={{ marginBottom: '8px' }}>
                  <div className="amatch-r-fit-header" style={{ color: '#0F172A' }}>Alcance <motion.span>{b3Text}</motion.span></div>
                  <div className="amatch-r-fit-bar-bg"><motion.div custom={2} animate={bBarsControls} className="amatch-r-fit-bar-fill" style={{ backgroundColor: '#9333EA' }} /></div>
                </div>
                <div className="amatch-r-fit">
                  <div className="amatch-r-fit-header" style={{ color: '#0F172A' }}>Referencias <motion.span>{b4Text}</motion.span></div>
                  <div className="amatch-r-fit-bar-bg"><motion.div custom={3} animate={bBarsControls} className="amatch-r-fit-bar-fill" style={{ backgroundColor: '#EA580C' }} /></div>
                </div>
              </div>
              <div className="amatch-det-card" style={{ flex: 1 }}>
                <div className="amatch-det-title">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Requisitos
                </div>
                <div className="amatch-req-grid">
                  <div className="amatch-req-item"><div className="amatch-req-circle" style={{ border: '1px solid #10B981', color: '#10B981' }}>Q1</div><span className="amatch-req-text">Cuartil</span></div>
                  <div className="amatch-req-item"><div className="amatch-req-circle" style={{ border: '1px solid #D97706', color: '#D97706' }}>S</div><span className="amatch-req-text">Scopus</span></div>
                  <div className="amatch-req-item"><div className="amatch-req-circle" style={{ border: '1px solid #9333EA', color: '#9333EA' }}>W</div><span className="amatch-req-text">WoS</span></div>
                  <div className="amatch-req-item"><div className="amatch-req-circle" style={{ backgroundColor: '#10B981', color: 'white' }}>OK</div><span className="amatch-req-text">Compatible</span></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}