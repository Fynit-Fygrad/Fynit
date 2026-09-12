'use client';

import React, { useRef, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Sphere, Points, PointMaterial, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import TextType from './TextType';
import BlurText from './BlurText';

interface IndexationItem {
  id: string;
  name: string;
  logo: string;
}

const INDEXATIONS: IndexationItem[] = [
  { id: 'scopus',   name: 'Scopus',         logo: '/assets/logos svg/logo-scopus.svg' },
  { id: 'wos',      name: 'Web of Science', logo: '/assets/logos svg/logo-wos.svg' },
  { id: 'pubmed',   name: 'PubMed',         logo: '/assets/logos svg/logo-pubmed.svg' },
  { id: 'ieee',     name: 'IEEE',           logo: '/assets/logos svg/logo-ieee.svg' },
  { id: 'scielo',   name: 'SciELO',         logo: '/assets/logos svg/logo-scielo.svg' },
  { id: 'latindex', name: 'Latindex',       logo: '/assets/logos svg/logo-latindex.svg' },
  { id: 'doaj',     name: 'DOAJ',           logo: '/assets/logos svg/logo-doaj.svg' },
  { id: 'springer', name: 'Springer',       logo: '/assets/logos svg/logo-springer.svg' },
  { id: 'ebsco',    name: 'EBSCO',          logo: '/assets/logos svg/logo-ebsco.svg' },
  { id: 'redalyc',  name: 'Redalyc',        logo: '/assets/logos svg/logo-redalyc.svg' },
  { id: 'crossref', name: 'Crossref',       logo: '/assets/logos svg/logo-crossref.svg' },
  { id: 'dialnet',  name: 'Dialnet',        logo: '/assets/logos svg/logo-dialnet.svg' },
];

// Helper to generate evenly distributed points on a sphere
function getFibonacciSpherePoints(samples: number, radius: number) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

// Generates a field of tiny stars/particles around the globe
function ParticleRing({ isDark }: { isDark: boolean }) {
  const count = 1000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 3 + Math.random() * 1.5;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#60A5FA' : '#1B60DF'}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.4 : 0.2}
      />
    </Points>
  );
}

// 3D Scene Component
function GlobeScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  // Distribute logos on a sphere with radius 3.2
  const logoPositions = useMemo(() => getFibonacciSpherePoints(INDEXATIONS.length, 3.2), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow down rotation if a logo is hovered
      const targetSpeed = hoveredLogo ? 0.05 : 0.2;
      groupRef.current.rotation.y += delta * targetSpeed;
      // Slight floating effect on the whole group
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={isDark ? 0.5 : 1} />
      <directionalLight position={[10, 10, 10]} intensity={isDark ? 2 : 2.5} color={isDark ? '#60A5FA' : '#ffffff'} />
      <directionalLight position={[-10, -10, -10]} intensity={isDark ? 1 : 1.5} color="#3B82F6" />

      {/* The Core Globe - Data Network / Wireframe style (looks premium without HDRI) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Outer glowing nodes */}
        <Points>
          <sphereGeometry args={[2.2, 48, 48]} />
          <pointsMaterial
            color={isDark ? '#60A5FA' : '#3B82F6'}
            size={0.015}
            transparent
            opacity={isDark ? 0.6 : 0.4}
            sizeAttenuation={true}
          />
        </Points>

        {/* Inner solid sphere to block logos behind it */}
        <Sphere ref={sphereRef} args={[2.15, 32, 32]}>
          <meshBasicMaterial
            color={isDark ? '#020617' : '#f8fafc'}
            transparent
            opacity={isDark ? 0.9 : 0.95}
            depthWrite={true}
          />
        </Sphere>

        {/* Techy wireframe */}
        <Sphere args={[2.16, 24, 24]}>
          <meshBasicMaterial
            color={isDark ? '#3B82F6' : '#3B82F6'}
            wireframe
            transparent
            opacity={isDark ? 0.15 : 0.15}
          />
        </Sphere>
      </Float>

      <ParticleRing isDark={isDark} />

      {/* Orbiting Logos */}
      {INDEXATIONS.map((item, i) => {
        const isHovered = hoveredLogo === item.id;
        const scale = isHovered ? 1.2 : 1;
        
        return (
          <Html
            key={item.id}
            position={logoPositions[i]}
            // Occulde behind the core sphere
            occlude={[sphereRef as any]}
            center // Crucial: centers the HTML element precisely on the 3D coordinate
            zIndexRange={[100, 0]}
            style={{
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: `scale(${scale})`,
              opacity: isHovered ? 1 : 0.8,
              pointerEvents: 'auto', // Ensure it receives hover events properly
            }}
          >
            <div
              onPointerEnter={() => setHoveredLogo(item.id)}
              onPointerLeave={() => setHoveredLogo(null)}
              className="idx-3d-pill"
            >
              <img src={item.logo} alt={item.name} draggable={false} />
            </div>
          </Html>
        );
      })}
    </group>
  );
}

export default function OrbitalIndexaciones() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <section
      id="indexaciones"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 0',
        background: isDark
          ? 'radial-gradient(ellipse at right center, #0F172A 0%, #020617 100%)'
          : 'radial-gradient(ellipse at right center, #F8FAFC 0%, #EEF2F6 100%)',
      }}
    >
      <style>{`
        .idx-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 5%;
        }

        .idx-3d-pill {
          width: 140px;
          height: 54px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 10px 18px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        /* Light mode pill */
        [data-theme='light'] .idx-3d-pill {
          background: rgba(255, 255, 255, 0.7);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255, 255, 255, 1);
          transition: all 0.3s ease;
        }
        [data-theme='light'] .idx-3d-pill:hover {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 12px 48px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255, 255, 255, 1);
        }
        [data-theme='light'] .idx-3d-pill img {
          filter: grayscale(100%) opacity(0.5);
          transition: filter 0.3s, transform 0.3s;
        }
        [data-theme='light'] .idx-3d-pill:hover img {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.05);
        }

        /* Dark mode pill */
        [data-theme='dark'] .idx-3d-pill {
          background: rgba(15, 23, 42, 0.5);
          border-color: rgba(59, 130, 246, 0.15);
          box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: all 0.3s ease;
        }
        [data-theme='dark'] .idx-3d-pill:hover {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(59, 130, 246, 0.4);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        [data-theme='dark'] .idx-3d-pill img {
          filter: brightness(0) invert(1) opacity(0.5);
          transition: filter 0.3s, transform 0.3s;
        }
        [data-theme='dark'] .idx-3d-pill:hover img {
          filter: brightness(0) invert(1) opacity(1) drop-shadow(0 0 8px rgba(255,255,255,0.3));
          transform: scale(1.05);
        }

        .idx-3d-pill img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .idx-grid-layout {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 0;
          }
          .idx-text-col {
            align-items: center;
            margin-bottom: 20px;
            padding: 0 16px;
          }
          .idx-canvas-col {
            height: min(50vh, 440px) !important;
          }
        }

        @media (max-width: 640px) {
          .idx-grid-layout {
            padding: 0 16px;
          }
          .idx-text-col {
            text-align: left;
            align-items: flex-start;
          }
          .idx-3d-pill {
            width: 110px;
            height: 42px;
            padding: 8px 12px;
          }
          .idx-canvas-col {
            height: min(45vh, 360px) !important;
          }
        }
      `}</style>

      <div className="idx-grid-layout">
        {/* ── Izquierda: Texto Editorial ── */}
        <div className="idx-text-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', height: '24px' }}>
            <TextType
              text={['Estándares globales', 'Bases de datos', 'Impacto científico']}
              typingSpeed={65}
              pauseDuration={1600}
              showCursor
              cursorCharacter="_"
              deletingSpeed={35}
              className="premium-typing-text"
            />
          </div>
          
          <BlurText
            text="INDEXACIONES"
            className="massive-title black-title"
            delay={30}
            animateBy="words"
            direction="top"
            style={{
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              lineHeight: 0.9,
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          />
          
          <p
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: isDark ? 'rgba(148,163,184,1)' : '#475569',
              fontWeight: 400,
              marginTop: '24px',
              maxWidth: '420px',
              lineHeight: 1.6,
            }}
          >
            Nuestros diagnósticos están calibrados con las exigencias de 
            <strong style={{ color: isDark ? '#e2e8f0' : '#0f172a', fontWeight: 600 }}> Renacyt, MinCiencias y Concytec</strong>, 
            garantizando que tu artículo apunte a los cuartiles más altos en la comunidad internacional.
          </p>
        </div>

        {/* ── Derecha: Esfera Interactiva 3D ── */}
        <div className="idx-canvas-col" style={{ position: 'relative', width: '100%', height: '750px', minHeight: '300px', overflow: 'hidden' }}>
          {mounted && (
            <Canvas
              camera={{ position: [0, 0, 8.5], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              style={{ overflow: 'visible' }}
            >
              <GlobeScene isDark={isDark} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          )}
        </div>
      </div>
    </section>
  );
}
