'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface LusionCardProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function LusionCard({ children, isActive = false, onClick, className, style }: LusionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Posición del ratón (-0.5 a 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Control de hover para el brillo
  const isHovered = useMotionValue(0);

  // Detect mobile to disable physics
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Resortes para que el movimiento se sienta líquido y pesado (Lusion style)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);
  const hoverSpring = useSpring(isHovered, { stiffness: 300, damping: 20 });

  // Transformar la posición del ratón en grados de rotación 3D
  // Eje X invierte el Y del ratón, Eje Y usa el X del ratón.
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Calcular la posición del brillo (glare) en porcentaje
  // Se mueve opuesto a la inclinación para simular que la luz viene de un punto fijo
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordenadas del ratón relativas al elemento
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convertir a porcentajes centrados (-0.5 a 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    // Al salir, el resorte vuelve al centro de forma natural
    x.set(0);
    y.set(0);
    isHovered.set(0);
  };

  // Crear un template dinámico para el gradiente
  const background = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  if (isMobile) {
    return (
      <div className={className} onClick={onClick} style={{ ...style, position: 'relative', overflow: 'hidden', zIndex: isActive ? 10 : 1 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Permite que el contenido interno tenga profundidad 3D
        perspective: "1000px", // Define cuán dramático es el efecto 3D
        position: 'relative',
        overflow: 'hidden',
        // Efecto de levantamiento general en hover
        zIndex: isActive ? 10 : 1,
      }}
      whileHover={{ scale: 1.03, zIndex: 20 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Capa de Brillo Físico (Glare) */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background,
          opacity: hoverSpring, // Fade in/out suave
          pointerEvents: 'none',
          zIndex: 0,
          // Eliminamos mixBlendMode que causaba el whiteout en modo oscuro
        }}
      />
      
      {/* Contenedor del texto con profundidad Z real */}
      <div style={{ transform: "translateZ(40px)", position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        {children}
      </div>
    </motion.div>
  );
}
