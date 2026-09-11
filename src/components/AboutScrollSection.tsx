'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from './BlurText';
import TextType from './TextType';

export default function AboutScrollSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate movement for the right-side cards
  // We want the cards to scroll up while the left side stays pinned.
  // There are 4 cards. We move from 0% to roughly -75% so the last card reaches the top/center.
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="pinned-scroll-section">
      <div className="pinned-sticky-container">
        
        {/* Left Side: Pinned Content */}
        <div className="pinned-left-content">
          <div className="pinned-header">
            <div className="title-wrapper" style={{ alignItems: 'flex-start', marginBottom: '15px' }}>
              <TextType 
                text="TU INVESTIGACIÓN" 
                className="premium-typing-text" 
                delay={50} 
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
          <motion.div style={{ y: cardsY }} className="pinned-cards-track">
            
            {/* CARD 01 */}
            <div className="pinned-card">
              <div className="card-glass"></div>
              <div className="card-number">01</div>
              <div className="card-content">
                <h3>Meses sin saber si vas bien</h3>
                <p>Revisas y revisas sin una señal clara de si tu argumento sostiene una publicación real.</p>
              </div>
              <div className="card-abstract-icon icon-1"></div>
            </div>

            {/* CARD 02 */}
            <div className="pinned-card">
              <div className="card-glass"></div>
              <div className="card-number">02</div>
              <div className="card-content">
                <h3>Feedback disperso y tardío</h3>
                <p>El asesor lo dice por correo, el jurado en la sustentación, casi nunca a tiempo.</p>
              </div>
              <div className="card-abstract-icon icon-2"></div>
            </div>

            {/* CARD 03 */}
            <div className="pinned-card">
              <div className="card-glass"></div>
              <div className="card-number">03</div>
              <div className="card-content">
                <h3>No sabes dónde postular</h3>
                <p>Cientos de revistas y ningún criterio claro sobre cuál se ajusta a tu perfil o nivel actual.</p>
              </div>
              <div className="card-abstract-icon icon-3"></div>
            </div>

            {/* CARD 04 */}
            <div className="pinned-card">
              <div className="card-glass"></div>
              <div className="card-number">04</div>
              <div className="card-content">
                <h3>El detalle que baja tu originalidad</h3>
                <p>Frases mal formateadas o referencias incorrectas que restan calidad sin que lo notes.</p>
              </div>
              <div className="card-abstract-icon icon-4"></div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
