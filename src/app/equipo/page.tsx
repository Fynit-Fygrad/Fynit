
'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>


    {/*  ============ HERO EQUIPO ============  */}
    <section className="team-hero">
      <div className="container">
        <div className="team-hero-inner">
          <span className="eyebrow-accent">EL EQUIPO</span>
          <h1>Los investigadores detrás del código</h1>
          <p>Unimos la rigurosidad y pasión del ámbito académico con la capacidad de desarrollo y despliegue tecnológico
            más moderno. Nos mueve el mismo objetivo: acelerar la ciencia honesta.</p>
        </div>
      </div>
    </section>

    {/*  ============ FUNDADORES & CORE TEAM ============  */}
    <section className="team" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow-accent">CORE TEAM</span>
          <h2>Equipo de Fynit</h2>
          <p style={{ color: 'var(--ink-70)', marginTop: '10px' }}>Profesionales comprometidos con el desarrollo científico y
            tecnológico.</p>
        </div>

        <div className="team-grid">
          {/*  Miembro 1  */}
          <div className="team-card">
            <div className="team-avatar">
              {/*  Cuando tengas la foto: agrega el src aquí y borra el div .team-avatar-placeholder  */}
              <img src="" alt="Dr. Alejandro Ruiz" className="team-avatar-img" />
              <div className="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div className="team-role">Cargo o rol</div>
            <p className="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div className="team-social">
              <Link href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></Link>
              <Link href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></Link>
              <Link href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></Link>
              <Link href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></Link>
            </div>
          </div>

          {/*  Miembro 2  */}
          <div className="team-card">
            <div className="team-avatar">
              <img src="" alt="Ing. Sofía Mendoza" className="team-avatar-img" />
              <div className="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div className="team-role">Cargo o Rol</div>
            <p className="team-bio">Resumen profesional o académico del integrante del equipo.
            </p>
            <div className="team-social">
              <Link href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></Link>
              <Link href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></Link>
              <Link href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></Link>
              <Link href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></Link>
            </div>
          </div>

          {/*  Miembro 3  */}
          <div className="team-card">
            <div className="team-avatar">
              <img src="" alt="Dr. Carlos Varela" className="team-avatar-img" />
              <div className="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div className="team-role">Cargo o rol</div>
            <p className="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div className="team-social">
              <Link href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></Link>
              <Link href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></Link>
              <Link href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></Link>
              <Link href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></Link>
            </div>
          </div>

          {/*  Miembro 4  */}
          <div className="team-card">
            <div className="team-avatar">
              <img src="" alt="Nombre Apellido" className="team-avatar-img" />
              <div className="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div className="team-role">Cargo o rol</div>
            <p className="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div className="team-social">
              <Link href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></Link>
              <Link href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></Link>
              <Link href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></Link>
              <Link href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></Link>
            </div>
          </div>

          {/*  Miembro 5  */}
          <div className="team-card">
            <div className="team-avatar">
              <img src="" alt="Nombre Apellido" className="team-avatar-img" />
              <div className="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div className="team-role">Cargo o rol</div>
            <p className="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div className="team-social">
              <Link href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></Link>
              <Link href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></Link>
              <Link href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></Link>
              <Link href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></Link>
            </div>
          </div>

          {/*  Miembro 6  */}
          <div className="team-card">
            <div className="team-avatar">
              <img src="" alt="Nombre Apellido" className="team-avatar-img" />
              <div className="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div className="team-role">Cargo o rol</div>
            <p className="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div className="team-social">
              <Link href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></Link>
              <Link href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></Link>
              <Link href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></Link>
              <Link href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></Link>
            </div>
          </div>
        </div>
      </div>
    </section>

  
</div>
  );
}
