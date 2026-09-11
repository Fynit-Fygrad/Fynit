'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export function TopographicManuscript({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Creamos un plano detallado que actuará como la topografía de los datos
  const geometry = useMemo(() => new THREE.PlaneGeometry(40, 40, 70, 70), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = geometry.attributes.position;
    
    // Animación matemática suave original
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      const wave1 = Math.sin(x * 0.2 + time * 0.3) * 0.8;
      const wave2 = Math.cos(y * 0.15 + time * 0.2) * 0.8;
      const wave3 = Math.sin((x + y) * 0.1 - time * 0.1) * 0.5;
      
      positions.setZ(i, wave1 + wave2 + wave3);
    }
    
    positions.needsUpdate = true;
    
    // Rotación suave original
    meshRef.current.rotation.z = time * 0.02;
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      // Inclinamos el plano para que parezca un suelo/escenario infinito
      rotation={[-Math.PI / 2 + 0.3, 0, 0]} 
      position={[0, -3, -8]}
    >
      <meshBasicMaterial 
        color={isDark ? "#38BDF8" : "#1B60DF"} 
        wireframe={true} 
        transparent={true} 
        opacity={isDark ? 0.4 : 0.6} 
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <TopographicManuscript isDark={isDark} />
      </Canvas>
    </div>
  );
}
