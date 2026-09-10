'use client';

import React from 'react';
import { motion } from 'framer-motion';
import '@/styles/components/disciplines-carousel.css';
import TextType from '@/components/TextType';

const disciplines = [
  {
    id: 1,
    title: 'Biología Avanzada',
    image: 'assets/imgs png/cover_biology.jpg',
    description: 'Revisamos metodologías experimentales y estructuramos tu artículo para journals científicos de alto impacto.',
    color: '#00C9A7',
  },
  {
    id: 2,
    title: 'Ciencias de la Computación',
    image: 'assets/imgs png/cover_cs.jpg',
    description: 'Validamos el formato IEEE o ACM y verificamos el rigor técnico del estado del arte.',
    color: '#1B60DF',
  },
  {
    id: 3,
    title: 'Medicina Clínica',
    image: 'assets/imgs png/cover_medicine.jpg',
    description: 'Aseguramos que tu reporte o ensayo cumpla con guías como CONSORT y estándares médicos internacionales.',
    color: '#FF5757',
  },
  {
    id: 4,
    title: 'Derecho Corporativo',
    image: 'assets/imgs png/cover_law.jpg',
    description: 'Adaptamos tu redacción al lenguaje jurídico formal y estructuramos argumentos para revistas de derecho.',
    color: '#FEC600',
  },
  {
    id: 5,
    title: 'Economía y Finanzas',
    image: 'assets/imgs png/cover_economics.jpg',
    description: 'Evaluamos la presentación de tus datos financieros y modelos para publicaciones Q1 en economía.',
    color: '#00E5FF',
  },
  {
    id: 6,
    title: 'Ingeniería y Tecnología',
    image: 'assets/imgs png/cover_engineering.jpg',
    description: 'Organizamos tus resultados de laboratorio en tablas y gráficos rigurosos listos para publicar.',
    color: '#8B5CF6',
  }
];

export default function DisciplinesCarousel() {
  return (
    <section className="disciplines-3d-section" id="disciplinas">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <div className="disciplines-grid">
          
          {/* Columna Izquierda: Cards de iconos en lugar de foto stock */}
          <div className="disciplines-carousel-col">
            {/* Desktop 3D Scene */}
            <div className="scene-3d desktop-only">
              <div className="carousel-3d">
                {disciplines.map((d, index) => {
                  const rotateY = index * (360 / disciplines.length);
                  return (
                    <div 
                      key={d.id} 
                      className="carousel-item-wrapper" 
                      style={{ 
                        transform: `rotateY(${rotateY}deg) translateZ(220px)` 
                      }}
                    >
                      <div className="carousel-item-inner">
                        {/* Frente de la tarjeta (Cover Image + Título) */}
                        <div className="card-face card-front" style={{ padding: 0 }}>
                          <img src={d.image} alt={d.title} className="card-cover-image" />
                          <div className="card-cover-overlay"></div>
                          <h4 className="card-cover-title">{d.title}</h4>
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

            {/* Mobile Marquee Slider */}
            <div className="mobile-snap-slider mobile-only">
              <div className="mobile-marquee-track">
                {[...disciplines, ...disciplines].map((d, idx) => (
                  <div key={`${d.id}-${idx}`} className="snap-card">
                    <div className="snap-card-inner">
                      <div className="snap-icon-wrap cover-wrap" style={{ padding: 0, height: '200px', overflow: 'hidden', position: 'relative' }}>
                        <img src={d.image} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="snap-content">
                        <h4>{d.title}</h4>
                        <p>{d.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Texto */}
          <div className="disciplines-text-col">
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
      </div>
    </section>
  );
}
