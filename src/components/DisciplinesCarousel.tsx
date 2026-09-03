'use client';

import React from 'react';
import '@/styles/components/disciplines-carousel.css';

const disciplines = [
  {
    id: 1,
    title: 'Biología Avanzada',
    icon: 'ic-bio',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Analizamos metodologías experimentales, revisamos citas de papers recientes y estructuramos tu artículo para journals científicos de alto impacto.'
  },
  {
    id: 2,
    title: 'Ciencias de la Computación',
    icon: 'ic-laptop',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Validamos el formato IEEE o ACM, revisamos la claridad de tu pseudocódigo y comprobamos el estado del arte de algoritmos similares.'
  },
  {
    id: 3,
    title: 'Medicina Clínica',
    icon: 'ic-stethoscope',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    description: 'Aseguramos que tu reporte de caso clínico o ensayo randomizado cumpla con las guías CONSORT y los rigurosos estándares médicos.'
  },
  {
    id: 4,
    title: 'Derecho Corporativo',
    icon: 'ic-scale',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    description: 'Adaptamos tu redacción al lenguaje jurídico formal, verificamos jurisprudencia y estructuramos argumentos para revistas de derecho.'
  },
  {
    id: 5,
    title: 'Economía y Finanzas',
    icon: 'ic-coins',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    description: 'Evaluamos el rigor de tus modelos econométricos y la presentación de tus datos financieros para publicaciones Q1 en economía.'
  },
  {
    id: 6,
    title: 'Ingeniería y Tecnología',
    icon: 'ic-cog',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Desde ingeniería civil hasta nanotecnología. Organizamos tus resultados de laboratorio en tablas y gráficos listos para publicar.'
  }
];

export default function DisciplinesCarousel() {
  return (
    <section className="disciplines-3d-section" id="disciplinas">
      <div className="disciplines-head" data-aos="fade-up">
        <span className="disciplines-eyebrow">Múltiples Disciplinas</span>
        <h2>No importa tu área,<br />hablamos tu idioma editorial</h2>
      </div>

      <div className="marquee-3d-wrap" data-aos="fade-up" data-aos-delay="100">
        <div className="marquee-3d-track">
          {/* Se mapea 3 veces para asegurar que el loop infinito nunca se corte */}
          {[...disciplines, ...disciplines, ...disciplines].map((d, index) => (
            <div className="flip-card-container" key={`${d.id}-${index}`}>
              <div className="flip-card-inner">
                
                {/* FRENTE DE LA TARJETA */}
                <div 
                  className="flip-card-front" 
                  style={{ backgroundImage: `url(${d.image})` }}
                >
                  <div className="flip-card-content-front">
                    <div className="flip-icon-wrap">
                      <svg width="24" height="24">
                        <use href={`/sprite.svg#${d.icon}`} />
                      </svg>
                    </div>
                    <h3>{d.title}</h3>
                  </div>
                </div>

                {/* DORSO DE LA TARJETA */}
                <div className="flip-card-back">
                  <h4>{d.title}</h4>
                  <p>{d.description}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
