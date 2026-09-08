'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import TextType from './TextType';
import BlurText from './BlurText';

export default function AboutScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animaciones Tarjeta 1 (Top Left)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const rotate1 = useTransform(scrollYProgress, [0, 0.2], [10, -5]);

  // Animaciones Tarjeta 2 (Bottom Right)
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.35], [100, 0]);
  const rotate2 = useTransform(scrollYProgress, [0.15, 0.35], [-10, 3]);

  // Animaciones Tarjeta 3 (Top Right)
  const opacity3 = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const rotate3 = useTransform(scrollYProgress, [0.3, 0.5], [5, 4]);

  // Animaciones Tarjeta 4 (Bottom Left)
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.45, 0.65], [100, 0]);
  const rotate4 = useTransform(scrollYProgress, [0.45, 0.65], [-5, -2]);

  // Central Text Scale
  const titleScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section ref={containerRef} className="about-scroll-container">
      <div className="about-sticky-view">
        
        {/* Título Central */}
        <motion.div className="about-center-content" style={{ scale: titleScale }}>
          <div className="title-wrapper">
            <TextType 
              text={[
                "Revolucionando la publicación", 
                "El camino editorial claro", 
                "Tu investigación sin barreras"
              ]} 
              typingSpeed={70} 
              pauseDuration={1500} 
              showCursor 
              cursorCharacter="_" 
              deletingSpeed={40} 
              className="premium-typing-text"
            />
            
            <div style={{ width: '100%', maxWidth: '750px', display: 'flex', justifyContent: 'center' }}>
              <BlurText
                text="DE INVESTIGADORES PARA INVESTIGADORES"
                className="massive-title black-title"
                delay={30}
                animateBy="words"
                direction="top"
                style={{ justifyContent: 'center', textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 40px)' }}
              />
            </div>
          </div>
          <p className="subtitle-text">
            Fynit nace de un equipo de académicos que vivió de cerca la frustración de redactar y publicar a ciegas.
            Hemos desarrollado una inteligencia artificial especializada para hacer tu camino editorial claro y riguroso.
          </p>
        </motion.div>

        {/* Tarjeta 1 */}
        <motion.div className="glass-panel panel-1" style={{ opacity: opacity1, y: y1, rotate: rotate1 }}>
          <motion.img 
            src="assets/imgs png/mascot_peeking.webp" 
            alt="Mascot Peeking" 
            className="peeking-mascot-right"
          />
          <span className="panel-number">01</span>
          <h3>Meses sin saber si vas bien</h3>
          <p>Revisas y revisas sin una señal clara de si tu argumento sostiene una publicación.</p>
        </motion.div>

        {/* Tarjeta 2 */}
        <motion.div className="glass-panel panel-2" style={{ opacity: opacity2, y: y2, rotate: rotate2 }}>
          <motion.img 
            src="assets/imgs png/mascot_peeking.webp" 
            alt="Mascot Peeking" 
            className="peeking-mascot-left"
          />
          <span className="panel-number">02</span>
          <h3>Feedback disperso y tardío</h3>
          <p>El asesor lo dice por correo, el jurado en la sustentación, casi nunca a tiempo.</p>
        </motion.div>

        {/* Tarjeta 3 */}
        <motion.div className="glass-panel panel-3" style={{ opacity: opacity3, y: y3, rotate: rotate3 }}>
          <motion.img 
            src="assets/imgs png/mascot_peeking.webp" 
            alt="Mascot Peeking" 
            className="peeking-mascot-left"
          />
          <span className="panel-number">03</span>
          <h3>No sabes dónde postular</h3>
          <p>Cientos de revistas y ningún criterio claro sobre cuál se ajusta a tu perfil.</p>
        </motion.div>

        {/* Tarjeta 4 */}
        <motion.div className="glass-panel panel-4" style={{ opacity: opacity4, y: y4, rotate: rotate4 }}>
          <motion.img 
            src="assets/imgs png/mascot_peeking.webp" 
            alt="Mascot Peeking" 
            className="peeking-mascot-right"
          />
          <span className="panel-number">04</span>
          <h3>El detalle que baja tu originalidad</h3>
          <p>Frases mal formateadas: pequeños descuidos que restan sin que los notes.</p>
        </motion.div>

      </div>
    </section>
  );
}
