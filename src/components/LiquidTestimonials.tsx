'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const testimonials = [
  {
    id: 1,
    quote: "Tenía un artículo dando vueltas sin saber a dónde enviarlo. Fynit me dijo en minutos que tenía potencial Q3 y cuatro cosas concretas que mejorar. No me dio una lista genérica: me dio foco.",
    author: "Dra. María Sol Quispe",
    role: "Investigadora en Educación, UNMSM",
    color: "#009ca6"
  },
  {
    id: 2,
    quote: "Subí mi tesis de maestría y en cuestión de segundos tenía un reporte que nunca había visto igual: similitud, metodología, cuartil alcanzable. Mi asesor quedó impresionado con el nivel del análisis.",
    author: "Mg. Rodrigo Salas",
    role: "Doctorado en Ing. Civil, PUCP",
    color: "#3B82F6"
  },
  {
    id: 3,
    quote: "Lo que más me impresionó fue la honestidad del diagnóstico. No infla los números. Te dice exactamente dónde estás y cuánto te falta para el siguiente nivel editorial. Eso no tiene precio.",
    author: "Prof. Carmen Vidal, PhD",
    role: "Directora de Investigación, UPC",
    color: "#ff8c00"
  }
];

// Pure Three.js glass background - No external dependencies or complex shaders
function GlassOcean({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      // Ondulación lenta para simular líquido/cristal
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.cos(t * 0.2) * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Esfera gigante distorsionada que actúa como el fondo líquido */}
      <sphereGeometry args={[4, 64, 64]} />
      <meshPhysicalMaterial 
        color={isDark ? '#0f172a' : '#ffffff'}
        metalness={0.1}
        roughness={0.2}
        transmission={0.9} // Glass effect
        thickness={2}
        ior={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={isDark ? '#1e3a8a' : '#bae6fd'}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Particles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(900).map(() => (Math.random() - 0.5) * 15), 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color={isDark ? "#60a5fa" : "#3b82f6"} 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
}

export default function LiquidTestimonials() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;
  const isDark = resolvedTheme === 'dark';
  const activeTestimonial = testimonials[activeIndex];

  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        background: isDark ? '#020617' : '#f8fafc',
        overflow: 'hidden'
      }}
    >
      {/* Título */}
      <div 
        style={{
          position: 'absolute',
          top: '8%',
          width: '100%',
          textAlign: 'center',
          zIndex: 20,
          pointerEvents: 'none'
        }}
      >
        <h2 
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 800,
            color: isDark ? '#ffffff' : '#0f172a',
            margin: 0,
            letterSpacing: '-1px'
          }}
        >
          INVESTIGADORES QUE YA LO <span style={{ color: '#F59E0B' }}>PROBARON</span>
        </h2>
        <p style={{ color: isDark ? '#94a3b8' : '#64748b', marginTop: '10px', fontSize: '1.1rem' }}>
          Su feedback construyó la herramienta.
        </p>
      </div>

      {/* HTML Overlay para los textos (100% a prueba de fallos) */}
      <div 
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          padding: '0 5%'
        }}
      >
        <div 
          key={activeTestimonial.id}
          style={{
            maxWidth: '800px',
            textAlign: 'center',
            animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <p 
            style={{ 
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', 
              color: isDark ? '#f1f5f9' : '#1e293b',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '40px',
              textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : 'none'
            }}
          >
            "{activeTestimonial.quote}"
          </p>

          <div 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: activeTestimonial.color,
              marginBottom: '16px',
              boxShadow: `0 0 20px ${activeTestimonial.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px'
            }}
          >
            {activeTestimonial.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>

          <h3 style={{ margin: 0, color: isDark ? '#ffffff' : '#0f172a', fontSize: '1.2rem' }}>
            {activeTestimonial.author}
          </h3>
          <p style={{ margin: '8px 0 0 0', color: activeTestimonial.color, fontSize: '0.9rem', fontWeight: 600 }}>
            {activeTestimonial.role}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* WebGL Background Seguro */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      >
        <ambientLight intensity={isDark ? 0.5 : 1} />
        <directionalLight position={[10, 10, 10]} intensity={isDark ? 2 : 3} color={isDark ? "#60A5FA" : "#ffffff"} />
        <directionalLight position={[-10, -10, -10]} intensity={isDark ? 1 : 2} color={isDark ? "#3B82F6" : "#e2e8f0"} />
        
        <GlassOcean isDark={isDark} />
        <Particles isDark={isDark} />
      </Canvas>
    </section>
  );
}
