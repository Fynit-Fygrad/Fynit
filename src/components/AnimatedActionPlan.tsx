'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '@/styles/components/AnimatedActionPlan.css';
import { useMockupCursor } from '@/hooks/useMockupCursor';

export default function AnimatedActionPlan() {
  const containerControls = useAnimation();
  const screenAControls = useAnimation();
  const screenBControls = useAnimation();
  const screenCControls = useAnimation();
  const stepControls = useAnimation();
  const badgeControls = useAnimation();
  const avatarControls = useAnimation();
  const verExpertosBtnControls = useAnimation();
  const searchControls = useAnimation();
  const cardControls = useAnimation();
  const contactBtnControls = useAnimation();
  const msg1Controls = useAnimation();
  const typingControls = useAnimation();
  const msg2Controls = useAnimation();
  const dot1 = useAnimation();
  const dot2 = useAnimation();
  const dot3 = useAnimation();

  const mountedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const verExpertosRef = useRef<HTMLDivElement>(null);
  const contactarRef = useRef<HTMLDivElement>(null);

  const { reset: cursorReset, moveTo, moveToEl, clickEl, hide: cursorHide, CursorNode } = useMockupCursor();

  useEffect(() => {
    mountedRef.current = true;

    const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    const runSequence = async () => {
      while (mountedRef.current) {
        containerControls.set("reset");
        screenAControls.set({ opacity: 1, x: 0, display: 'flex' });
        screenBControls.set({ opacity: 0, x: 50, display: 'none' });
        screenCControls.set({ opacity: 0, x: 50, display: 'none' });
        stepControls.set({ opacity: 0, y: 15 });
        badgeControls.set({ opacity: 0, scale: 0.5 });
        avatarControls.set({ opacity: 0, scale: 0.5, x: -10 });
        verExpertosBtnControls.set({ scale: 1 });
        searchControls.set({ opacity: 0, y: -10 });
        cardControls.set({ opacity: 0, y: 20 });
        contactBtnControls.set({ scale: 1 });
        msg1Controls.set({ opacity: 0, scale: 0.9, y: 10, display: 'none' });
        typingControls.set({ opacity: 0, display: 'none' });
        msg2Controls.set({ opacity: 0, scale: 0.9, y: 10, display: 'none' });
        cursorReset(200, 130);

        await sleep(500);
        if (!mountedRef.current) return;

        containerControls.start("visible");
        stepControls.start((i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" } }));
        badgeControls.start((i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.15 + 0.2, type: "spring", stiffness: 300, damping: 15 } }));
        moveTo(200, 130, 350);

        await sleep(800);
        if (!mountedRef.current) return;

        avatarControls.start((i: number) => ({ opacity: 1, scale: 1, x: 0, transition: { delay: i * 0.1, type: "spring", stiffness: 200, damping: 12 } }));

        await sleep(800);
        if (!mountedRef.current) return;

        await moveToEl(verExpertosRef, wrapperRef, 400);
        if (!mountedRef.current) return;

        await sleep(600);
        if (!mountedRef.current) return;

        await clickEl(verExpertosRef, wrapperRef);
        if (!mountedRef.current) return;

        await verExpertosBtnControls.start({ scale: 0.95, transition: { duration: 0.1 } });
        await verExpertosBtnControls.start({ scale: 1, transition: { duration: 0.1 } });
        cursorHide(200);

        await sleep(300);
        if (!mountedRef.current) return;

        screenBControls.set({ display: 'flex' });
        screenAControls.start({ opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeInOut" } });
        await screenBControls.start({ opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } });
        if (!mountedRef.current) return;
        screenAControls.set({ display: 'none' });

        await searchControls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
        if (!mountedRef.current) return;

        cardControls.start((i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" } }));

        await sleep(900);
        if (!mountedRef.current) return;

        await moveToEl(contactarRef, wrapperRef, 400);
        if (!mountedRef.current) return;

        await sleep(600);
        if (!mountedRef.current) return;

        await clickEl(contactarRef, wrapperRef);
        if (!mountedRef.current) return;

        await contactBtnControls.start({ scale: 0.95, transition: { duration: 0.1 } });
        await contactBtnControls.start({ scale: 1, transition: { duration: 0.1 } });
        cursorHide(200);

        await sleep(300);
        if (!mountedRef.current) return;

        screenCControls.set({ display: 'flex' });
        screenBControls.start({ opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeInOut" } });
        await screenCControls.start({ opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } });
        if (!mountedRef.current) return;
        screenBControls.set({ display: 'none' });

        await sleep(300);
        if (!mountedRef.current) return;

        msg1Controls.set({ display: 'block' });
        await msg1Controls.start({ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        if (!mountedRef.current) return;

        await sleep(500);
        if (!mountedRef.current) return;

        typingControls.set({ display: 'flex' });
        typingControls.start({ opacity: 1, transition: { duration: 0.2 } });
        dot1.start({ y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.6, delay: 0 } });
        dot2.start({ y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.6, delay: 0.2 } });
        dot3.start({ y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.6, delay: 0.4 } });

        await sleep(1500);
        if (!mountedRef.current) return;

        typingControls.set({ display: 'none' });
        dot1.stop(); dot2.stop(); dot3.stop();
        msg2Controls.set({ display: 'block' });
        await msg2Controls.start({ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        if (!mountedRef.current) return;

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
    <div className="aplan-wrapper" style={{ position: 'relative' }} ref={wrapperRef}>
      {CursorNode}
      <motion.div
        className="aplan-container"
        animate={containerControls}
        initial="reset"
        variants={{ reset: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } }, fadeOut: { opacity: 0, transition: { duration: 0.5 } } }}
      >
        <motion.div className="aplan-screen" animate={screenAControls}>
          <div className="aplan-header">
            <div className="aplan-h-left">
              <div className="aplan-h-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <div>
                <h4 className="aplan-h-title">Plan de accion y Red de expertos</h4>
                <p className="aplan-h-sub">Articulo_Final.docx</p>
              </div>
            </div>
            <div className="aplan-h-status-text">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              Analisis completado
            </div>
          </div>

          <div className="aplan-steps-container">
            <motion.div custom={0} animate={stepControls} className="aplan-step">
              <div className="aplan-step-num">1</div>
              <div className="aplan-step-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></div>
              <div className="aplan-step-content"><h4>Fortalecer metodologia</h4><p>Ajusta y detalla tu metodologia para mejorar la claridad y replicabilidad.</p></div>
              <motion.div custom={0} animate={badgeControls} className="aplan-badge alta">Alta</motion.div>
            </motion.div>
            <motion.div custom={1} animate={stepControls} className="aplan-step">
              <div className="aplan-step-num">2</div>
              <div className="aplan-step-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
              <div className="aplan-step-content"><h4>Profundizar discusion</h4><p>Amplia el analisis de resultados y relacionalo con literatura reciente.</p></div>
              <motion.div custom={1} animate={badgeControls} className="aplan-badge alta">Alta</motion.div>
            </motion.div>
            <motion.div custom={2} animate={stepControls} className="aplan-step">
              <div className="aplan-step-num">3</div>
              <div className="aplan-step-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
              <div className="aplan-step-content"><h4>Actualizar referencias</h4><p>Incluye estudios recientes y de alto impacto en tu area.</p></div>
              <motion.div custom={2} animate={badgeControls} className="aplan-badge media">Media</motion.div>
            </motion.div>
            <div style={{ position: 'absolute', top: '20px', bottom: '20px', left: '20px', width: '1px', borderLeft: '1px dashed #CBD5E1', zIndex: 1 }}></div>
          </div>

          <div className="aplan-experts-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ color: '#2563EB' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <div>
                <h4 style={{ fontSize: '10px', fontWeight: 700, margin: '0 0 2px 0', color: '#0F172A' }}>Expertos disponibles</h4>
                <p style={{ fontSize: '8px', color: '#64748B', margin: 0, maxWidth: '200px' }}>Metodologos y editores verificados listos para revisar tu paper.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="aplan-avatar-group">
                <motion.div custom={0} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#DBEAFE', color: '#1E3A8A' }}>MP</motion.div>
                <motion.div custom={1} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#DCFCE7', color: '#14532D' }}>LC</motion.div>
                <motion.div custom={2} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#FEF3C7', color: '#78350F' }}>JG</motion.div>
                <motion.div custom={3} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>+12</motion.div>
              </div>
              <motion.div ref={verExpertosRef} animate={verExpertosBtnControls} className="aplan-btn-outline" style={{ transformOrigin: 'center' }}>
                Ver expertos
              </motion.div>
            </div>
          </div>

          <div className="aplan-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <div><h3>Comenzar plan de mejora</h3><p>Sigue la ruta paso a paso y potencia tu manuscrito.</p></div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
        </motion.div>

        <motion.div className="aplan-screen" animate={screenBControls}>
          <div className="aplan-header" style={{ marginBottom: '12px', border: 'none', padding: 0, background: 'transparent' }}>
            <div><h4 className="aplan-h-title" style={{ fontSize: '13px' }}>Red de expertos</h4><p className="aplan-h-sub" style={{ fontSize: '9px' }}>Articulo_Final.docx</p></div>
            <div className="aplan-btn-outline" style={{ border: 'none', background: '#EFF6FF' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> Filtros
            </div>
          </div>
          <motion.div animate={searchControls} className="aplan-search-bar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Buscar por nombre, especialidad o institucion...
          </motion.div>
          <div className="aplan-experts-grid">
            <motion.div custom={0} animate={cardControls} className="aplan-expert-card">
              <div className="aplan-exp-header">
                <div className="aplan-exp-avatar" style={{ backgroundColor: '#F3E8FF', color: '#9333EA' }}>MP</div>
                <div className="aplan-exp-status">Disponible</div>
              </div>
              <div className="aplan-exp-info"><h4>Dr. Martin Perez</h4><p>Metodologo de investigacion</p><p>Univ. Nacional Mayor de San Marcos</p></div>
              <div style={{ marginTop: '6px' }}><span className="aplan-badge" style={{ backgroundColor: '#F3E8FF', color: '#9333EA' }}>Metodologia</span></div>
              <div className="aplan-exp-stats">
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 15 anos de exp.</div>
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> 342 revisiones</div>
              </div>
              <motion.div ref={contactarRef} animate={contactBtnControls} className="aplan-btn-contact" style={{ transformOrigin: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Contactar
              </motion.div>
            </motion.div>
            <motion.div custom={1} animate={cardControls} className="aplan-expert-card">
              <div className="aplan-exp-header">
                <div className="aplan-exp-avatar" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>LC</div>
                <div className="aplan-exp-status ocupado">Ocupado</div>
              </div>
              <div className="aplan-exp-info"><h4>Dra. Luisa Carvajal</h4><p>Editora cientifica</p><p>Pontificia Universidad Catolica</p></div>
              <div style={{ marginTop: '6px' }}><span className="aplan-badge" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>Edicion</span></div>
              <div className="aplan-exp-stats">
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 12 anos de exp.</div>
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> 289 revisiones</div>
              </div>
              <div className="aplan-btn-contact" style={{ borderColor: '#E2E8F0', color: '#94A3B8' }}>No disponible</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="aplan-screen" animate={screenCControls}>
          <div className="aplan-chat-header">
            <div className="aplan-chat-back"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="aplan-exp-avatar" style={{ backgroundColor: '#F3E8FF', color: '#9333EA', width: '28px', height: '28px' }}>MP</div>
              <div>
                <h4 style={{ fontSize: '11px', fontWeight: 700, margin: '0 0 2px 0', color: '#0F172A' }}>Dr. Martin Perez</h4>
                <div className="aplan-exp-status">En linea</div>
              </div>
            </div>
          </div>
          <div className="aplan-chat-messages">
            <motion.div animate={msg1Controls} className="aplan-chat-msg user" style={{ transformOrigin: 'bottom right' }}>
              Hola Dr. Martin, me gustaria que revise la seccion de metodologia de mi paper para la revista Journal of Research Methods.
            </motion.div>
            <motion.div animate={typingControls} className="aplan-chat-msg expert aplan-typing">
              <motion.div animate={dot1} className="aplan-typing-dot" />
              <motion.div animate={dot2} className="aplan-typing-dot" />
              <motion.div animate={dot3} className="aplan-typing-dot" />
            </motion.div>
            <motion.div animate={msg2Controls} className="aplan-chat-msg expert" style={{ transformOrigin: 'bottom left' }}>
              Hola! Claro que si, veo que tu manuscrito tiene un fit muy alto con esa revista. Empecemos a revisar los enfoques mixtos.
            </motion.div>
          </div>
          <div className="aplan-chat-input-area">
            <div className="aplan-chat-input">Escribe un mensaje...</div>
            <div className="aplan-chat-send"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}