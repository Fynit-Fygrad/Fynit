'use client';
import { useRef } from 'react';
import { motion, Variants } from 'framer-motion';

import TextType from './TextType';
import BlurText from './BlurText';

export default function AboutScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Variantes para la animación de entrada
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.15,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  // Variantes para la animación de flotación constante (micro-interacción)
  const floatVariants: Variants = {
    float: (custom: number) => ({
      y: [0, -15, 0],
      transition: {
        duration: 4 + (custom % 2), // Tiempos ligeramente distintos para que sea orgánico
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom * 0.5
      }
    })
  };

  return (
    <section ref={containerRef} className="about-static-container">
      <div className="about-static-view">
        
        {/* Título Central */}
        <motion.div 
          className="about-center-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
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
            
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}>
              <BlurText
                text="DE INVESTIGADORES PARA INVESTIGADORES"
                highlightIndices={[3]}
                className="massive-title black-title"
                delay={30}
                animateBy="words"
                direction="top"
              />
            </div>
          </div>
          <p className="subtitle-text">
            Fynit nace de un equipo de académicos que vivió de cerca la frustración de redactar y publicar a ciegas.
            Hemos desarrollado una inteligencia artificial especializada para hacer tu camino editorial claro y riguroso.
          </p>
        </motion.div>

        {/* Contenedor de Tarjetas (Bento Grid) */}
        <div className="about-bento-grid">
          {/* Tarjeta 1 */}
          <motion.div 
            className="glass-panel"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={floatVariants} animate="float" custom={1} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <span className="panel-number">01</span>
              <h3>Meses sin saber si vas bien</h3>
              <p>Revisas y revisas sin una señal clara de si tu argumento sostiene una publicación.</p>
              <img 
                src="assets/imgs png/mascot_peeking.webp" 
                alt="Mascot Peeking" 
                className="bento-mascot bottom-right"
              />
            </motion.div>
          </motion.div>

          {/* Tarjeta 2 */}
          <motion.div 
            className="glass-panel"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={floatVariants} animate="float" custom={2} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <span className="panel-number">02</span>
              <h3>Feedback disperso y tardío</h3>
              <p>El asesor lo dice por correo, el jurado en la sustentación, casi nunca a tiempo.</p>
              <img 
                src="assets/imgs png/mascot_peeking.webp" 
                alt="Mascot Peeking" 
                className="bento-mascot top-right flip-horizontal"
              />
            </motion.div>
          </motion.div>

          {/* Tarjeta 3 */}
          <motion.div 
            className="glass-panel"
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={floatVariants} animate="float" custom={3} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <span className="panel-number">03</span>
              <h3>No sabes dónde postular</h3>
              <p>Cientos de revistas y ningún criterio claro sobre cuál se ajusta a tu perfil.</p>
              <img 
                src="assets/imgs png/mascot_peeking.webp" 
                alt="Mascot Peeking" 
                className="bento-mascot bottom-right"
              />
            </motion.div>
          </motion.div>

          {/* Tarjeta 4 */}
          <motion.div 
            className="glass-panel"
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={floatVariants} animate="float" custom={4} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <span className="panel-number">04</span>
              <h3>El detalle que baja tu originalidad</h3>
              <p>Frases mal formateadas: pequeños descuidos que restan sin que los notes.</p>
              <img 
                src="assets/imgs png/mascot_peeking.webp" 
                alt="Mascot Peeking" 
                className="bento-mascot top-right flip-horizontal"
              />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
