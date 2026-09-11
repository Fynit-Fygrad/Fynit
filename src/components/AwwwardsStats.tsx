'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function AwwwardsStats() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: false, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Mouse Tracking for Torch Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Parallax effects for the giant background numbers
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  // Subtle opacity fade in/out (very low opacity so it's a watermark)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.04, 0.04, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="awwwards-stats-section">
      <div className="mouse-torch"></div>
      <div className="awwwards-stats-container">
        
        {/* Background Giant Numbers (Parallax) */}
        <div className="giant-numbers-wrapper">
          <motion.div style={{ y: y1, opacity }} className="giant-number gn-1">SEC</motion.div>
          <motion.div style={{ y: y2, opacity }} className="giant-number gn-2">6</motion.div>
          <motion.div style={{ y: y3, opacity }} className="giant-number gn-3">3-5</motion.div>
          <motion.div style={{ y: y4, opacity }} className="giant-number gn-4">1</motion.div>
        </div>

        {/* Foreground Content */}
        <motion.div 
          ref={gridRef}
          className="stats-content-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          <motion.div variants={itemVariants} className="stat-block">
            <h3 className="stat-value text-accent">Segundos</h3>
            <div className="stat-divider-wrapper"><div className="stat-divider"></div></div>
            <p className="stat-desc">Para tu diagnóstico inicial completo — no días, no horas.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="stat-block">
            <h3 className="stat-value text-accent">6 Métricas</h3>
            <div className="stat-divider-wrapper"><div className="stat-divider"></div></div>
            <p className="stat-desc">Evaluadas en cada análisis con IA: similitud, metodología, readiness y más.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="stat-block">
            <h3 className="stat-value text-accent">3 a 5 Riesgos</h3>
            <div className="stat-divider-wrapper"><div className="stat-divider"></div></div>
            <p className="stat-desc">Priorizados automáticamente, no listados al azar.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="stat-block">
            <h3 className="stat-value text-accent">1 Ruta clara</h3>
            <div className="stat-divider-wrapper"><div className="stat-divider"></div></div>
            <p className="stat-desc">Hacia la revista que sí tiene sentido para tu investigación.</p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
