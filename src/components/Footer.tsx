'use client';
import Link from 'next/link';
import Chatbot from './Chatbot';
import { showComingSoon } from './Toaster';

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-cta">
          <div className="footer-cta-inner">
            {/* Mascota 3D lado izquierdo */}
            <img src="assets/imgs png/fynit_mascot.webp" alt="Fynit 3D" className="footer-mascot" loading="lazy" />
            {/* Texto + CTA lado derecho */}
            <div className="footer-cta-text">
              <span className="eyebrow" style={{ color: 'var(--yellow)' }}>Empieza hoy</span>
              <h2>¿Listo para ver hacia dónde puede llegar tu investigación?</h2>
              <a href="#" onClick={showComingSoon} className="btn btn-yellow">
                Crear cuenta
                <svg>
                  <use href="/sprite.svg#ic-arrow" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-main">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <img src="assets/logos svg/logo-fynit-white.svg" alt="Fynit" className="logo-img" />
            </Link>
            <p>IA académica que entiende tu investigación, diagnostica su potencial editorial y te conecta con expertos para que llegue más lejos.</p>
            <div className="footer-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg><use href="/sprite.svg#ic-linkedin" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg><use href="/sprite.svg#ic-ig" /></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg><use href="/sprite.svg#ic-x" /></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Producto</h4>
            <ul>
              <li><Link href="/#como-funciona">Cómo funciona</Link></li>
              <li><Link href="/precios">Precios</Link></li>
              <li><Link href="/#seguridad">Seguridad y datos</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Recursos</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/#guias">Guías</Link></li>
              <li><Link href="/faq">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Compañía</h4>
            <ul>
              <li><Link href="/#nosotros">Nosotros</Link></li>
              <li><Link href="/analizar">Analizar</Link></li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>&copy; 2026 Fynit. Todos los derechos reservados.</span>
          <div className="legal">
            <Link href="/#privacidad">Privacidad</Link>
            <Link href="/#terminos">Términos</Link>
          </div>
        </div>
      </footer>

      <Chatbot />
    </>
  );
}
