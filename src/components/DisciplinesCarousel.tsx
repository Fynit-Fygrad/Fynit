'use client';

import React from 'react';
import '@/styles/components/disciplines-carousel.css';

import TextType from './TextType';
import BlurText from './BlurText';

const disciplines = [
  {
    id: 1,
    title: 'Biología Avanzada',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    description: 'Revisamos metodologías experimentales y estructuramos tu artículo para journals científicos de alto impacto.',
  },
  {
    id: 2,
    title: 'Ciencias de la Computación',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    description: 'Validamos el formato IEEE o ACM y verificamos el rigor técnico del estado del arte.',
  },
  {
    id: 3,
    title: 'Medicina Clínica',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    description: 'Aseguramos que tu reporte o ensayo cumpla con guías como CONSORT y estándares médicos internacionales.',
  },
  {
    id: 4,
    title: 'Derecho Corporativo',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80',
    description: 'Adaptamos tu redacción al lenguaje jurídico formal y estructuramos argumentos para revistas de derecho.',
  },
  {
    id: 5,
    title: 'Economía y Finanzas',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80',
    description: 'Evaluamos la presentación de tus datos financieros y modelos para publicaciones Q1 en economía.',
  },
  {
    id: 6,
    title: 'Ingeniería y Tecnología',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
    description: 'Organizamos tus resultados de laboratorio en tablas y gráficos rigurosos listos para publicar.',
  }
];

export default function DisciplinesCarousel() {
  return (
    <section className="disciplines-3d-section" id="disciplinas">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <div className="disciplines-grid">
          
          {/* Columna Izquierda: Carrusel 3D Puro */}
          <div className="disciplines-carousel-col" data-aos="fade-right">
            <div className="scene-3d">
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
                        {/* Frente de la tarjeta (Imagen) */}
                        <div className="card-face card-front">
                          <img src={d.image} alt={d.title} />
                          <div className="carousel-item-overlay">
                            <h4>{d.title}</h4>
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

          {/* Columna Derecha: Texto */}
          <div className="disciplines-text-col" data-aos="fade-left">
            <div className="title-wrapper" style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
              <TextType 
                text={["Múltiples Disciplinas", "Expertise por área", "Formato especializado"]} 
                typingSpeed={70} pauseDuration={1500} showCursor cursorCharacter="_" deletingSpeed={40} 
                className="premium-typing-text"
              />
              <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <BlurText text="ADAPTABILIDAD PARA CUALQUIER ÁREA" className="massive-title black-title" delay={30} animateBy="words" direction="top" style={{ fontSize: 'clamp(1.5rem, 3vw, 40px)' }} />
              </div>
            </div>
            <p className="disciplines-description">
              No importa el campo de tu investigación, nuestro equipo domina el lenguaje, la terminología y las normativas de formato de las revistas científicas más exigentes de todas las áreas del conocimiento.
            </p>
            <ul className="disciplines-features">
              <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B60DF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Rigor científico garantizado</li>
              <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B60DF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Formatos específicos (APA, IEEE, etc.)</li>
              <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B60DF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Estructurado para revistas Q1-Q2</li>
            </ul>
            <a href="/analizar" className="btn-disciplines-cta">
              Solicitar análisis editorial
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
