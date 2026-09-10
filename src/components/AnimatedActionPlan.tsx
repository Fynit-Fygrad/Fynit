'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
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
  const { reset: cursorReset, moveTo, click: cursorClick, hide: cursorHide, CursorNode } = useMockupCursor();

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      while (isMounted) {
        // 1. Reset
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
        await new Promise(resolve => setTimeout(resolve, 500));

        // 2. Fade in
        containerControls.start("visible");

        // 3. Stagger steps
        stepControls.start(i => ({
          opacity: 1, y: 0,
          transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
        }));
        badgeControls.start(i => ({
          opacity: 1, scale: 1,
          transition: { delay: i * 0.15 + 0.2, type: "spring", stiffness: 300, damping: 15 }
        }));
        moveTo(200, 130, 350);
        await new Promise(resolve => setTimeout(resolve, 800));

        // 4. Avatars cascade
        avatarControls.start(i => ({
          opacity: 1, scale: 1, x: 0,
          transition: { delay: i * 0.1, type: "spring", stiffness: 200, damping: 12 }
        }));
        moveTo(340, 270, 400);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 5. Cursor to "Ver expertos" — click triggers transition
        await moveTo(510, 256, 300);
        await cursorClick(510, 256);
        await verExpertosBtnControls.start({ scale: 0.95, transition: { duration: 0.1 } });
        await verExpertosBtnControls.start({ scale: 1,    transition: { duration: 0.1 } });
        cursorHide(200);
        await new Promise(resolve => setTimeout(resolve, 300));

        // 6. Screen B
        screenBControls.set({ display: 'flex' });
        screenAControls.start({ opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeInOut" } });
        await screenBControls.start({ opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } });
        screenAControls.set({ display: 'none' });

        await searchControls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
        cardControls.start(i => ({
          opacity: 1, y: 0,
          transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
        }));
        // Cursor reappears — scans expert cards
        cursorReset(200, 280);
        await moveTo(200, 280, 300);
        await new Promise(resolve => setTimeout(resolve, 1200));

        // 7. Cursor to "Contactar" — click fires immediately
        await moveTo(158, 264, 300);
        await cursorClick(158, 264);
        await contactBtnControls.start({ scale: 0.95, transition: { duration: 0.1 } });
        await contactBtnControls.start({ scale: 1,    transition: { duration: 0.1 } });
        cursorHide(200);
        await new Promise(resolve => setTimeout(resolve, 300));

        // 8. Screen C (Chat)
        screenCControls.set({ display: 'flex' });
        screenBControls.start({ opacity: 0, x: -50, transition: { duration: 0.4, ease: "easeInOut" } });
        await screenCControls.start({ opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } });
        screenBControls.set({ display: 'none' });
        await new Promise(resolve => setTimeout(resolve, 300));

        // 9. Chat animation
        msg1Controls.set({ display: 'block' });
        await msg1Controls.start({ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        await new Promise(resolve => setTimeout(resolve, 500));
        typingControls.set({ display: 'flex' });
        typingControls.start({ opacity: 1, transition: { duration: 0.2 } });
        dot1.start({ y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.6, delay: 0 } });
        dot2.start({ y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.6, delay: 0.2 } });
        dot3.start({ y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.6, delay: 0.4 } });
        await new Promise(resolve => setTimeout(resolve, 1500));
        typingControls.set({ display: 'none' });
        dot1.stop(); dot2.stop(); dot3.stop();
        msg2Controls.set({ display: 'block' });
        await msg2Controls.start({ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });

        // 10. Hold then fade
        await new Promise(resolve => setTimeout(resolve, 2500));
        await containerControls.start("fadeOut");
      }
    };

    runSequence();
    return () => { isMounted = false; };
  }, [containerControls, screenAControls, screenBControls, screenCControls, stepControls, badgeControls, avatarControls, verExpertosBtnControls, searchControls, cardControls, contactBtnControls, msg1Controls, typingControls, msg2Controls, dot1, dot2, dot3, cursorReset, moveTo, cursorClick, cursorHide]);

  return (
    <div className="aplan-wrapper" style={{ position: 'relative' }}>
      {CursorNode}
      <motion.div 
        className="aplan-container"
        animate={containerControls}
        initial="reset"
        variants={{
          reset: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
          fadeOut: { opacity: 0, transition: { duration: 0.5 } }
        }}
      >
        {/* SCREEN A: Plan de Acción */}
        <motion.div className="aplan-screen" animate={screenAControls}>
          <div className="aplan-header">
            <div className="aplan-h-left">
              <div className="aplan-h-icon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <div>
                <h4 className="aplan-h-title">Plan de acción & Red de expertos</h4>
                <p className="aplan-h-sub">Artículo_Final.docx</p>
              </div>
            </div>
            <div className="aplan-h-status-text">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              Análisis completado
            </div>
          </div>

          <div className="aplan-steps-container">
            {/* Paso 1 */}
            <motion.div custom={0} animate={stepControls} className="aplan-step">
              <div className="aplan-step-num">1</div>
              <div className="aplan-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <div className="aplan-step-content">
                <h4>Fortalecer metodología</h4>
                <p>Ajusta y detalla tu metodología para mejorar la claridad y replicabilidad.</p>
              </div>
              <motion.div custom={0} animate={badgeControls} className="aplan-badge alta">Alta</motion.div>
            </motion.div>

            {/* Paso 2 */}
            <motion.div custom={1} animate={stepControls} className="aplan-step">
              <div className="aplan-step-num">2</div>
              <div className="aplan-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="aplan-step-content">
                <h4>Profundizar discusión</h4>
                <p>Amplía el análisis de resultados y relaciónalo con literatura reciente.</p>
              </div>
              <motion.div custom={1} animate={badgeControls} className="aplan-badge alta">Alta</motion.div>
            </motion.div>

            {/* Paso 3 */}
            <motion.div custom={2} animate={stepControls} className="aplan-step">
              <div className="aplan-step-num">3</div>
              <div className="aplan-step-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div className="aplan-step-content">
                <h4>Actualizar referencias</h4>
                <p>Incluye estudios recientes y de alto impacto en tu área.</p>
              </div>
              <motion.div custom={2} animate={badgeControls} className="aplan-badge media">Media</motion.div>
            </motion.div>
            
            {/* Línea conectora */}
            <div style={{ position: 'absolute', top: '20px', bottom: '20px', left: '20px', width: '1px', borderLeft: '1px dashed #CBD5E1', zIndex: 1 }}></div>
          </div>

          <div className="aplan-experts-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ color: '#2563EB' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <div>
                <h4 style={{ fontSize: '10px', fontWeight: 700, margin: '0 0 2px 0', color: '#0F172A' }}>Expertos disponibles</h4>
                <p style={{ fontSize: '8px', color: '#64748B', margin: 0, maxWidth: '200px' }}>Metodólogos y editores verificados listos para revisar tu paper.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="aplan-avatar-group">
                <motion.div custom={0} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#DBEAFE', color: '#1E3A8A' }}>MP</motion.div>
                <motion.div custom={1} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#DCFCE7', color: '#14532D' }}>LC</motion.div>
                <motion.div custom={2} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#FEF3C7', color: '#78350F' }}>JG</motion.div>
                <motion.div custom={3} animate={avatarControls} className="aplan-avatar" style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>+12</motion.div>
              </div>
              <motion.div animate={verExpertosBtnControls} className="aplan-btn-outline" style={{ transformOrigin: 'center' }}>
                Ver expertos
              </motion.div>
            </div>
          </div>

          <div className="aplan-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <div>
                <h3>Comenzar plan de mejora</h3>
                <p>Sigue la ruta paso a paso y potencia tu manuscrito.</p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
        </motion.div>

        {/* SCREEN B: Red de Expertos */}
        <motion.div className="aplan-screen" animate={screenBControls}>
          <div className="aplan-header" style={{ marginBottom: '12px', border: 'none', padding: 0, background: 'transparent' }}>
            <div>
              <h4 className="aplan-h-title" style={{ fontSize: '13px' }}>Red de expertos</h4>
              <p className="aplan-h-sub" style={{ fontSize: '9px' }}>Artículo_Final.docx</p>
            </div>
            <div className="aplan-btn-outline" style={{ border: 'none', background: '#EFF6FF' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> Filtros
            </div>
          </div>

          <motion.div animate={searchControls} className="aplan-search-bar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Buscar por nombre, especialidad o institución...
          </motion.div>

          <div className="aplan-experts-grid">
            {/* Experto 1 */}
            <motion.div custom={0} animate={cardControls} className="aplan-expert-card">
              <div className="aplan-exp-header">
                <div className="aplan-exp-avatar" style={{ backgroundColor: '#F3E8FF', color: '#9333EA' }}>MP</div>
                <div className="aplan-exp-status">Disponible</div>
              </div>
              <div className="aplan-exp-info">
                <h4>Dr. Martín Pérez</h4>
                <p>Metodólogo de investigación</p>
                <p>Univ. Nacional Mayor de San Marcos</p>
              </div>
              <div style={{ marginTop: '6px' }}>
                <span className="aplan-badge" style={{ backgroundColor: '#F3E8FF', color: '#9333EA' }}>Metodología</span>
              </div>
              <div className="aplan-exp-stats">
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 15 años de exp.</div>
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> 342 revisiones</div>
              </div>
              <motion.div animate={contactBtnControls} className="aplan-btn-contact" style={{ transformOrigin: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Contactar
              </motion.div>
            </motion.div>

            {/* Experto 2 */}
            <motion.div custom={1} animate={cardControls} className="aplan-expert-card">
              <div className="aplan-exp-header">
                <div className="aplan-exp-avatar" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>LC</div>
                <div className="aplan-exp-status ocupado">Ocupado</div>
              </div>
              <div className="aplan-exp-info">
                <h4>Dra. Luisa Carvajal</h4>
                <p>Editora científica</p>
                <p>Pontificia Universidad Católica</p>
              </div>
              <div style={{ marginTop: '6px' }}>
                <span className="aplan-badge" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>Edición</span>
              </div>
              <div className="aplan-exp-stats">
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 12 años de exp.</div>
                <div className="aplan-exp-stat"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> 289 revisiones</div>
              </div>
              <div className="aplan-btn-contact" style={{ borderColor: '#E2E8F0', color: '#94A3B8' }}>
                No disponible
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* SCREEN C: Chat */}
        <motion.div className="aplan-screen" animate={screenCControls}>
          <div className="aplan-chat-header">
            <div className="aplan-chat-back">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="aplan-exp-avatar" style={{ backgroundColor: '#F3E8FF', color: '#9333EA', width: '28px', height: '28px' }}>MP</div>
              <div>
                <h4 style={{ fontSize: '11px', fontWeight: 700, margin: '0 0 2px 0', color: '#0F172A' }}>Dr. Martín Pérez</h4>
                <div className="aplan-exp-status">En línea</div>
              </div>
            </div>
          </div>

          <div className="aplan-chat-messages">
            <motion.div animate={msg1Controls} className="aplan-chat-msg user" style={{ transformOrigin: 'bottom right' }}>
              Hola Dr. Martín, me gustaría que revise la sección de metodología de mi paper para la revista Journal of Research Methods.
            </motion.div>
            
            <motion.div animate={typingControls} className="aplan-chat-msg expert aplan-typing">
              <motion.div animate={dot1} className="aplan-typing-dot" />
              <motion.div animate={dot2} className="aplan-typing-dot" />
              <motion.div animate={dot3} className="aplan-typing-dot" />
            </motion.div>

            <motion.div animate={msg2Controls} className="aplan-chat-msg expert" style={{ transformOrigin: 'bottom left' }}>
              ¡Hola! Claro que sí, veo que tu manuscrito tiene un fit muy alto con esa revista. Empecemos a revisar los enfoques mixtos.
            </motion.div>
          </div>

          <div className="aplan-chat-input-area">
            <div className="aplan-chat-input">Escribe un mensaje...</div>
            <div className="aplan-chat-send">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
