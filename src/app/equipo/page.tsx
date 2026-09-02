
'use client';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `

    <!-- ============ HERO EQUIPO ============ -->
    <section class="team-hero">
      <div class="container">
        <div class="team-hero-inner">
          <span class="eyebrow-accent">EL EQUIPO</span>
          <h1>Los investigadores detrás del código</h1>
          <p>Unimos la rigurosidad y pasión del ámbito académico con la capacidad de desarrollo y despliegue tecnológico
            más moderno. Nos mueve el mismo objetivo: acelerar la ciencia honesta.</p>
        </div>
      </div>
    </section>

    <!-- ============ FUNDADORES & CORE TEAM ============ -->
    <section class="team" style="background:var(--white);">
      <div class="container">
        <div class="section-head center">
          <span class="eyebrow-accent">CORE TEAM</span>
          <h2>Equipo de Fynit</h2>
          <p style="color:var(--ink-70); margin-top:10px;">Profesionales comprometidos con el desarrollo científico y
            tecnológico.</p>
        </div>

        <div class="team-grid">
          <!-- Miembro 1 -->
          <div class="team-card">
            <div class="team-avatar">
              <!-- Cuando tengas la foto: agrega el src aquí y borra el div .team-avatar-placeholder -->
              <img src="" alt="Dr. Alejandro Ruiz" class="team-avatar-img">
              <div class="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div class="team-role">Cargo o rol</div>
            <p class="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div class="team-social">
              <a href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></a>
              <a href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></a>
              <a href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></a>
              <a href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></a>
            </div>
          </div>

          <!-- Miembro 2 -->
          <div class="team-card">
            <div class="team-avatar">
              <img src="" alt="Ing. Sofía Mendoza" class="team-avatar-img">
              <div class="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div class="team-role">Cargo o Rol</div>
            <p class="team-bio">Resumen profesional o académico del integrante del equipo.
            </p>
            <div class="team-social">
              <a href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></a>
              <a href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></a>
              <a href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></a>
              <a href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></a>
            </div>
          </div>

          <!-- Miembro 3 -->
          <div class="team-card">
            <div class="team-avatar">
              <img src="" alt="Dr. Carlos Varela" class="team-avatar-img">
              <div class="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div class="team-role">Cargo o rol</div>
            <p class="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div class="team-social">
              <a href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></a>
              <a href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></a>
              <a href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></a>
              <a href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></a>
            </div>
          </div>

          <!-- Miembro 4 -->
          <div class="team-card">
            <div class="team-avatar">
              <img src="" alt="Nombre Apellido" class="team-avatar-img">
              <div class="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div class="team-role">Cargo o rol</div>
            <p class="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div class="team-social">
              <a href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></a>
              <a href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></a>
              <a href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></a>
              <a href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></a>
            </div>
          </div>

          <!-- Miembro 5 -->
          <div class="team-card">
            <div class="team-avatar">
              <img src="" alt="Nombre Apellido" class="team-avatar-img">
              <div class="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div class="team-role">Cargo o rol</div>
            <p class="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div class="team-social">
              <a href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></a>
              <a href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></a>
              <a href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></a>
              <a href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></a>
            </div>
          </div>

          <!-- Miembro 6 -->
          <div class="team-card">
            <div class="team-avatar">
              <img src="" alt="Nombre Apellido" class="team-avatar-img">
              <div class="team-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </div>
            </div>
            <h3>Nombre Apellido</h3>
            <div class="team-role">Cargo o rol</div>
            <p class="team-bio">Resumen profesional o académico del integrante del equipo.</p>
            <div class="team-social">
              <a href="#" aria-label="Facebook"><svg>
                  <use href="/sprite.svg#ic-facebook" />
                </svg></a>
              <a href="#" aria-label="LinkedIn"><svg>
                  <use href="/sprite.svg#ic-linkedin" />
                </svg></a>
              <a href="#" aria-label="X"><svg>
                  <use href="/sprite.svg#ic-x" />
                </svg></a>
              <a href="#" aria-label="Instagram"><svg>
                  <use href="/sprite.svg#ic-ig" />
                </svg></a>
            </div>
          </div>
        </div>
      </div>
    </section>

  ` }} />
  );
}
