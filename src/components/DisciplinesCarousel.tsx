'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import '@/styles/components/disciplines-carousel.css';
import TextType from '@/components/TextType';

const disciplines = [
  {
    id: 1,
    title: 'Biología Avanzada',
    image: 'assets/imgs png/cover_biology.jpg',
    description: 'Revisamos metodologías experimentales y estructuramos tu artículo para journals científicos de alto impacto.',
    color: '#00C9A7',
    theme: 'dark',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
  },
  {
    id: 2,
    title: 'Ciencias de la Computación',
    image: 'assets/imgs png/cover_cs.jpg',
    description: 'Validamos el formato IEEE o ACM y verificamos el rigor técnico del estado del arte.',
    color: '#1B60DF',
    theme: 'dark',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
  },
  {
    id: 3,
    title: 'Medicina Clínica',
    image: 'assets/imgs png/cover_medicine.jpg',
    description: 'Aseguramos que tu reporte o ensayo cumpla con guías como CONSORT y estándares médicos internacionales.',
    color: '#FF5757',
    theme: 'dark',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  },
  {
    id: 4,
    title: 'Derecho Corporativo',
    image: 'assets/imgs png/cover_law.jpg',
    description: 'Adaptamos tu redacción al lenguaje jurídico formal y estructuramos argumentos para revistas de derecho.',
    color: '#FEC600',
    theme: 'dark',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
  },
  {
    id: 5,
    title: 'Economía y Finanzas',
    image: 'assets/imgs png/cover_economics.jpg',
    description: 'Evaluamos la presentación de tus datos financieros y modelos para publicaciones Q1 en economía.',
    color: '#00E5FF',
    theme: 'dark',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
  },
  {
    id: 6,
    title: 'Ingeniería y Tecnología',
    image: 'assets/imgs png/cover_engineering.jpg',
    description: 'Organizamos tus resultados de laboratorio en tablas y gráficos rigurosos listos para publicar.',
    color: '#8B5CF6',
    theme: 'dark',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  }
];

export default function DisciplinesCarousel() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <section className="disciplines-3d-section" id="disciplinas">
      {/* The Cyberpunk Grid Floor (CSS-based, smooth animation) */}
      <div className="disciplines-3d-floor"></div>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        
        <div className="disciplines-grid white-rounded-box">
          
          {/* Columna Derecha (en PC) / Izquierda (en Móvil): Texto */}
          <div className="disciplines-text-col">
            
            {/* ==================================
                CONTENIDO MÓVIL (Mockup de píldora)
                ================================== */}
            <div className="mobile-only-content">
              <div className="disc-header-flex">
                {/* Ícono o badge eliminado a petición del usuario para dejar solo el título */}
                <h2 className="disc-title-mobile">
                  Adaptabilidad<br />
                  para cualquier<br />
                  <span className="text-yellow">área</span>
                </h2>
              </div>
              
              <p className="disciplines-description-mobile">
                Desde ingeniería hasta ciencias sociales, Fynit se adapta a tu campo de estudio.
              </p>
              
              <button className="disc-round-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            {/* ==================================
                CONTENIDO DESKTOP (Diseño original)
                ================================== */}
            <div className="desktop-only-content">
              <div style={{ marginBottom: '16px' }}>
                <TextType 
                  text={[
                    "02 — DISCIPLINAS", 
                    "Múltiples áreas de estudio", 
                    "Adaptabilidad garantizada"
                  ]} 
                  typingSpeed={70} 
                  pauseDuration={1500} 
                  showCursor 
                  cursorCharacter="_" 
                  deletingSpeed={40} 
                  className="premium-typing-text"
                />
              </div>
              <h2 className="disc-title">
                ADAPTABILIDAD<br />
                PARA CUALQUIER<br />
                <em>ÁREA</em>
              </h2>
              <p className="disciplines-description">
                No importa el campo de tu investigación, nuestro equipo domina el lenguaje, la terminología y las normativas de formato de las revistas científicas más exigentes de todas las áreas del conocimiento.
              </p>
              <ul className="disciplines-features">
                <li>
                  <span className="disc-feat-dot"></span>
                  Rigor científico garantizado
                </li>
                <li>
                  <span className="disc-feat-dot"></span>
                  Formatos específicos (APA, IEEE, CONSORT, etc.)
                </li>
                <li>
                  <span className="disc-feat-dot"></span>
                  Estructurado para revistas Q1-Q2
                </li>
              </ul>
              <a href="/analizar" className="btn-disciplines-cta" data-cursor>
                <span>Solicitar análisis editorial</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

          </div>

          {/* Columna Derecha: Animación 3D (Habilitada en móvil también) */}
          <div className="disciplines-carousel-col">
            {/* 3D Scene */}
            <div className="scene-3d">
              <div className="carousel-3d">
                {disciplines.map((d, index) => {
                  const rotateY = index * (360 / disciplines.length);
                  return (
                    <div 
                      key={d.id} 
                      className={`carousel-item-wrapper theme-${d.theme}`} 
                      style={{ 
                        transform: `rotateY(${rotateY}deg) translateZ(220px)` 
                      }}
                    >
                      <div className="carousel-item-inner">
                        {/* Frente de la tarjeta (Cover Image + Título + Icon) */}
                        <div className="card-face card-front" style={{ padding: 0 }}>
                          <img src={d.image} alt={d.title} className="card-cover-image" />
                          <div className="card-cover-overlay"></div>
                          <div className="card-bottom-content">
                            <div className="card-icon-wrapper" style={{ 
                              backgroundColor: d.theme === 'light' ? d.color : '#fff',
                              color: d.theme === 'light' ? '#fff' : '#071742'
                            }}>
                              {d.icon}
                            </div>
                            <h4 className="card-cover-title">{d.title}</h4>
                          </div>
                        </div>

                        {/* Reverso de la tarjeta (Texto) */}
                        <div className="card-face card-back">
                          <div className="card-back-content">
                            <h4>{d.title}</h4>
                            <p>{d.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
