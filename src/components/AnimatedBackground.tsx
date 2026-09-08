'use client';
import { useState, useEffect, useMemo } from 'react';
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from 'next-themes';

export default function AnimatedBackground() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const particleColor = isDark ? "#A3B5D1" : "#071742";
  const linkColor = isDark ? "#A3B5D1" : "#071742";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const particlesOptions = useMemo(() => {
    return {
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: false },
          resize: { enable: true, delay: 0.5 },
        },
      },
      particles: {
        color: { value: particleColor },
        links: {
          color: linkColor,
          distance: 140,
          enable: true,
          opacity: isDark ? 0.15 : 0.25,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: true,
          speed: 0.6,
          straight: false,
        },
        number: {
          density: { enable: true, width: 800, height: 800 },
          value: 80,
        },
        opacity: { value: isDark ? 0.3 : 0.45 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: 40, // Reduce density on mobile
              },
              move: {
                enable: false, // Completely disable movement to save CPU/Battery
              },
              links: {
                enable: true, // Keep the neural network visible
              }
            }
          }
        }
      ]
    };
  }, [isDark, particleColor, linkColor]);

  if (!mounted) return null;

  return (
    <div className="animated-bg-container">
      {/* Mesh Gradient Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* Neural Network Particles */}
      <ParticlesProvider init={loadSlim}>
        <Particles
          id="tsparticles"
          options={particlesOptions as any}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
      </ParticlesProvider>
    </div>
  );
}
