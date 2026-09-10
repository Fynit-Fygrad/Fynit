'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import TextType from './TextType';
import BlurText from './BlurText';

interface IndexationItem {
  id: string;
  name: string;
  logo: string;
  tilt: number;
  w: number;
  h: number;
}

const INDEXATIONS: IndexationItem[] = [
  { id: 'scopus',   name: 'Scopus',         logo: '/assets/logos svg/logo-scopus.svg',   tilt: -5,  w: 155, h: 88 },
  { id: 'wos',      name: 'Web of Science', logo: '/assets/logos svg/logo-wos.svg',      tilt:  8,  w: 145, h: 82 },
  { id: 'pubmed',   name: 'PubMed',         logo: '/assets/logos svg/logo-pubmed.svg',   tilt: -12, w: 138, h: 92 },
  { id: 'ieee',     name: 'IEEE',           logo: '/assets/logos svg/logo-ieee.svg',     tilt:  14, w: 148, h: 78 },
  { id: 'scielo',   name: 'SciELO',         logo: '/assets/logos svg/logo-scielo.svg',   tilt: -8,  w: 150, h: 86 },
  { id: 'latindex', name: 'Latindex',       logo: '/assets/logos svg/logo-latindex.svg', tilt:  10, w: 142, h: 78 },
  { id: 'doaj',     name: 'DOAJ',           logo: '/assets/logos svg/logo-doaj.svg',     tilt: -14, w: 132, h: 88 },
  { id: 'springer', name: 'Springer',       logo: '/assets/logos svg/logo-springer.svg', tilt:  5,  w: 158, h: 82 },
  { id: 'ebsco',    name: 'EBSCO',          logo: '/assets/logos svg/logo-ebsco.svg',    tilt: -10, w: 145, h: 80 },
  { id: 'redalyc',  name: 'Redalyc',        logo: '/assets/logos svg/logo-redalyc.svg',  tilt:  12, w: 150, h: 86 },
  { id: 'crossref', name: 'Crossref',       logo: '/assets/logos svg/logo-crossref.svg', tilt: -5,  w: 162, h: 82 },
  { id: 'dialnet',  name: 'Dialnet',        logo: '/assets/logos svg/logo-dialnet.svg',  tilt:  8,  w: 142, h: 82 },
];

export default function OrbitalIndexaciones() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const sectionRef    = useRef<HTMLElement>(null);
  const orbitRef      = useRef<HTMLDivElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const svgEllipseRef = useRef<SVGEllipseElement | null>(null);
  const angleRef      = useRef<number>(0);
  const themeRef      = useRef<string>('light');

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { themeRef.current = resolvedTheme ?? 'light'; }, [resolvedTheme]);

  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    let animId: number;
    const tiltRad = -7 * (Math.PI / 180);
    const cosTilt = Math.cos(tiltRad);
    const sinTilt = Math.sin(tiltRad);

    const tick = () => {
      const W        = window.innerWidth;
      const isMobile = W < 768;
      const isDark   = themeRef.current === 'dark';

      const rx = isMobile ? Math.min(W * 0.38, 180) : Math.min(W * 0.34, 490);
      const ry = isMobile ? 88 : 175;

      // Update section background
      if (sectionRef.current) {
        sectionRef.current.style.background = isDark
          ? 'linear-gradient(135deg, #050c1f 0%, #071428 50%, #0c1d3d 100%)'
          : 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 40%, #ede9fe 70%, #fce7f3 100%)';
      }

      // Update orbit ellipse
      if (svgEllipseRef.current) {
        svgEllipseRef.current.setAttribute('rx', String(rx));
        svgEllipseRef.current.setAttribute('ry', String(ry));
        svgEllipseRef.current.setAttribute('stroke',
          isDark ? 'rgba(99,179,237,0.15)' : 'rgba(99,122,200,0.20)'
        );
      }

      angleRef.current += 0.0022;

      const total = INDEXATIONS.length;
      const step  = (2 * Math.PI) / total;

      for (let i = 0; i < total; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const theta = angleRef.current + i * step;
        const x0 = Math.cos(theta) * rx;
        const y0 = Math.sin(theta) * ry;
        const x  = x0 * cosTilt - y0 * sinTilt;
        const y  = x0 * sinTilt + y0 * cosTilt;

        const depth = Math.sin(theta);
        const norm  = (depth + 1) / 2;

        const scale   = 0.52 + norm * 0.55;
        const opacity = 0.35 + norm * 0.65;
        const zIndex  = depth < 0
          ? Math.floor(2  + norm * 5)
          : Math.floor(12 + norm * 8);

        const baseTilt    = INDEXATIONS[i].tilt;
        const dynamicTilt = baseTilt + (x / rx) * 5;

        // ── Card styles per theme ──────────────────────────────────────
        if (isDark) {
          // Deep navy card — same as in user's dark screenshot
          el.style.background  = 'linear-gradient(145deg, #112057 0%, #0d1a4a 100%)';
          el.style.border      = '1px solid rgba(99,179,237,0.15)';
          el.style.boxShadow   = '0 12px 36px -6px rgba(0,0,0,0.65), 0 4px 12px rgba(0,10,50,0.45)';
        } else {
          // Frosted white card — same as in user's light screenshot
          el.style.background  = 'rgba(255,255,255,0.82)';
          el.style.border      = '1px solid rgba(255,255,255,0.95)';
          el.style.boxShadow   = '0 10px 32px -6px rgba(80,100,200,0.14), 0 4px 12px rgba(80,100,200,0.08)';
        }

        el.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale}) rotate(${dynamicTilt}deg)`;
        el.style.zIndex    = String(zIndex);
        el.style.opacity   = String(opacity);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);



  return (
    <section
      ref={sectionRef}
      id="indexaciones"
      className="bg-hero-gradient"
      style={{
        position:       'relative',
        width:          '100%',
        minHeight:      '660px',
        overflow:       'hidden',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '60px 0',
      }}
    >
      <style>{`
        .desktop-only { display: block !important; }
        .mobile-only { display: none !important; }
        
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          
          #indexaciones {
            flex-direction: column !important;
            padding: 40px 0 60px 0 !important;
            min-height: auto !important;
          }
        }

        .marquee-wrapper {
          width: 100vw;
          overflow: hidden;
          position: relative;
          padding: 30px 0;
          margin-top: 40px;
          /* display: flex is handled by .mobile-only */
        }

        .marquee-content {
          display: flex;
          gap: 20px;
          animation: marquee 50s linear infinite;
          padding-left: 20px;
        }

        .marquee-card {
          flex: 0 0 auto;
          width: 140px;
          height: 75px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(255,255,255,0.95);
          box-shadow: 0 10px 32px -6px rgba(80,100,200,0.14);
        }

        [data-theme='dark'] .marquee-card {
          background: linear-gradient(145deg, #112057 0%, #0d1a4a 100%);
          border: 1px solid rgba(99,179,237,0.15);
          box-shadow: 0 12px 36px -6px rgba(0,0,0,0.65);
        }

        .marquee-card img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 20px)); }
        }
      `}</style>

      {/* ── SVG orbit track ── */}
      <svg
        className="desktop-only"
        style={{
          position:      'absolute',
          top:           0, left: 0,
          width:         '100%', height: '100%',
          pointerEvents: 'none',
          zIndex:        3,
          overflow:      'visible',
        }}
      >
        <ellipse
          ref={svgEllipseRef}
          cx="50%" cy="50%"
          rx="490" ry="175"
          fill="none"
          stroke="rgba(99,122,200,0.20)"
          strokeWidth="1.5"
          strokeDasharray="6 7"
          style={{ transform: 'rotate(-7deg)', transformOrigin: '50% 50%' }}
        />
      </svg>

      {/* ── Orbit origin ── */}
      <div
        ref={orbitRef}
        className="desktop-only"
        style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 5 }}
      >
        {INDEXATIONS.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => { cardRefs.current[idx] = el; }}
            style={{
              position:       'absolute',
              top: 0, left: 0,
              width:          `${item.w}px`,
              height:         `${item.h}px`,
              marginLeft:     `-${item.w / 2}px`,
              marginTop:      `-${item.h / 2}px`,
              borderRadius:   '14px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              padding:        '14px 18px',
              willChange:     'transform, opacity',
              pointerEvents:  'none',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              // initial values; updated by rAF
              background:     'rgba(255,255,255,0.82)',
              border:         '1px solid rgba(255,255,255,0.95)',
              boxShadow:      '0 10px 32px -6px rgba(80,100,200,0.14)',
              transition:     'background 0.4s, border 0.4s, box-shadow 0.4s',
            }}
          >
            <img
              src={item.logo}
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ── Center title ── */}
      <div
        style={{
          position:       'relative',
          zIndex:         10,
          textAlign:      'center',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          pointerEvents:  'none',
          maxWidth:       '720px',
          padding:        '0 20px',
        }}
      >
        <TextType
          text={['Compatible con estándares globales', 'Bases de datos e indexaciones', 'Máximo impacto científico']}
          typingSpeed={65}
          pauseDuration={1600}
          showCursor
          cursorCharacter="_"
          deletingSpeed={35}
          className="premium-typing-text"
          style={{ justifyContent: 'center', marginBottom: '12px' }}
        />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <BlurText
            text="INDEXACIONES"
            className="massive-title black-title"
            delay={30}
            animateBy="words"
            direction="top"
            style={{ justifyContent: 'center' }}
          />
        </div>
        <p
          suppressHydrationWarning
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize:   'clamp(13px, 1.4vw, 15.5px)',
            color:      isDark ? 'rgba(148,163,184,1)' : '#64748b',
            fontWeight: 400,
            margin:     '14px 0 0 0',
            maxWidth:   '500px',
            lineHeight: 1.55,
          }}
        >
          Validadas para convocatorias{' '}
          <strong suppressHydrationWarning style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}>Renacyt, MinCiencias, Concytec</strong>{' '}
          y comités editoriales internacionales.
        </p>
      </div>

      {/* ── Mobile Marquee (replaces Orbit on small screens) ── */}
      <div className="mobile-only marquee-wrapper">
        <div className="marquee-content">
          {/* Double the list to make infinite scrolling smooth */}
          {[...INDEXATIONS, ...INDEXATIONS].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="marquee-card">
              <img src={item.logo} alt={item.name} draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
