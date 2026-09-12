'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from './BlurText';
import TextType from './TextType';

export default function AboutScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // En mobile desactivamos el parallax — cardsY se queda en 0%
  const cardsY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-75%"]
  );

  const CARDS = [
    { num: "01", title: "Meses sin saber si vas bien", desc: "Revisas y revisas sin una señal clara de si tu argumento sostiene una publicación real.", iconClass: "icon-1" },
    { num: "02", title: "Feedback disperso y tardío", desc: "El asesor lo dice por correo, el jurado en la sustentación, casi nunca a tiempo.", iconClass: "icon-2" },
    { num: "03", title: "No sabes dónde postular", desc: "Cientos de revistas y ningún criterio claro sobre cuál se ajusta a tu perfil o nivel actual.", iconClass: "icon-3" },
    { num: "04", title: "El detalle que baja tu originalidad", desc: "Frases mal formateadas o referencias incorrectas que restan calidad sin que lo notes.", iconClass: "icon-4" }
  ];

  const renderCards = () => CARDS.map((c, i) => (
    <div key={i} className="pinned-card">
      <div className="card-glass"></div>
      <div className="card-number">{c.num}</div>
      <div className="card-content">
        <h3>{c.title}</h3>
        <p>{c.desc}</p>
      </div>
      <div className={`card-abstract-icon ${c.iconClass}`}></div>
    </div>
  ));

  return (
    <section ref={containerRef} className="pinned-scroll-section">
      <div className="pinned-sticky-container">

        {/* Left Side: Pinned Content */}
        <div className="pinned-left-content">
          <div className="pinned-header">
            <div className="title-wrapper" style={{ alignItems: 'flex-start', marginBottom: '15px' }}>
              <TextType
                text={["TU INVESTIGACIÓN", "TU PUBLICACIÓN", "TU FUTURO ACADÉMICO", "TU ÉXITO"]}
                className="premium-typing-text"
                typingSpeed={60}
                deletingSpeed={40}
                pauseDuration={2000}
                loop={true}
              />
            </div>

            <BlurText
              text="DE INVESTIGADORES PARA INVESTIGADORES"
              highlightIndices={[3]}
              className="massive-title black-title"
              delay={30}
              animateBy="words"
              direction="top"
              style={{ justifyContent: 'flex-start' }}
            />
            <p className="pinned-paragraph">
              Fynit nace de un equipo de académicos que vivió de cerca la
              frustración de redactar y publicar a ciegas. Hemos desarrollado
              una inteligencia artificial especializada para hacer tu camino
              editorial claro y riguroso.
            </p>
          </div>
        </div>

        {/* Right Side: Scrolling Cards */}
        <div className="pinned-right-content">
          {isMobile ? (
            <div className="pinned-cards-track-mobile">
              <div className="mobile-horizontal-scroll">
                {renderCards()}
              </div>
              <div className="mobile-swipe-hint">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                <span>Deslizar tarjetas</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          ) : (
            <motion.div style={{ y: cardsY }} className="pinned-cards-track">
              {renderCards()}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
