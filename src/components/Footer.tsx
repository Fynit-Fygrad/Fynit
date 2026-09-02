'use client';
import { useEffect, useRef } from 'react';

export default function LegacyComponent() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `<footer class="site-footer">
    <div class="container footer-cta">
      <div class="footer-cta-inner">
        <!-- Mascota 3D � lado izquierdo -->
        <img src="assets/imgs png/fynit_mascot.webp" alt="Fynit 3D" class="footer-mascot" loading="lazy">
        <!-- Texto + CTA � lado derecho -->
        <div class="footer-cta-text">
          <span class="eyebrow" style="color:var(--yellow)">Empieza hoy</span>
          <h2>¿Listo para ver hacia dónde puede llegar tu investigación?</h2>
          <a href="javascript:void(0)" onclick="showComingSoon(event)" class="btn btn-yellow">Crear cuenta<svg>
              <use href="/sprite.svg#ic-arrow" />
            </svg></a>
        </div>
      </div>
    </div>

    <div class="container footer-main">
      <div class="footer-brand">
        <a href="/" class="logo">
          <img src="assets/logos svg/logo-fynit-white.svg" alt="Fynit" class="logo-img">
        </a>
        <p>IA académica que entiende tu investigación, diagnostica su potencial editorial y te conecta con expertos
          para
          que llegue más lejos.</p>
        <div class="footer-social">
          <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn"><svg>
              <use href="/sprite.svg#ic-linkedin" />
            </svg></a>
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><svg>
              <use href="/sprite.svg#ic-ig" />
            </svg></a>
          <a href="https://x.com" target="_blank" rel="noopener" aria-label="X"><svg>
              <use href="/sprite.svg#ic-x" />
            </svg></a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Producto</h4>
        <ul>
          <li><a href="#como-funciona">Cómo funciona</a></li>
          <li><a href="/precios">Precios</a></li>
          <li><a href="seguridad.html">Seguridad y datos</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Recursos</h4>
        <ul>
          <li><a href="/blog">Blog</a></li>
          <li><a href="guias.html">Guías</a></li>
          <li><a href="/faq">Preguntas frecuentes</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Compañía</h4>
        <ul>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="/analizar">Analizar</a></li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>&copy; 2026 Fynit. Todos los derechos reservados.</span>
      <div class="legal">
        <a href="privacidad.html">Privacidad</a>
        <a href="terminos.html">Términos</a>
      </div>
    </div>
  </footer>
<div class="float-stack">

    <!-- Chatbot Widget Window -->
    <div class="chat-widget" id="chatWidget" aria-hidden="true">
      <div class="chat-header">
        <div class="chat-avatar">
          <img src="assets/imgs png/fynit_mascot_bot.webp" alt="Fynit Bot"
            style="width:40px;height:40px;object-fit:contain;border-radius:50%;background:var(--blue);padding:2px;">
        </div>
        <div class="chat-header-info">
          <strong>Fynit IA</strong>
          <span>En línea ahora</span>
        </div>
        <button class="chat-close" id="chatClose" aria-label="Cerrar chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="chat-body" id="chatBody">
        <div class="chat-msg bot">
          <p>¡Hola! Soy el asistente de <strong>Fynit</strong>. ¿En qué te puedo ayudar hoy?</p>
        </div>
        <div class="chat-suggestions" id="chatSuggestions">
          <button class="chat-chip" data-q="que-es">¿Qué es Fynit?</button>
          <button class="chat-chip" data-q="como-funciona">¿Cómo funciona?</button>
          <button class="chat-chip" data-q="que-es-articulo">¿Qué es un artículo científico?</button>
          <button class="chat-chip" data-q="contacto">¿Cuál es el contacto?</button>
          <button class="chat-chip" data-q="precio">¿Cuánto cuesta?</button>
          <button class="chat-chip" data-q="cuartil">¿Qué es un cuartil Q1/Q2?</button>
        </div>
      </div>

      <div class="chat-input-row">
        <input type="text" id="chatInput" class="chat-input" placeholder="Escribe tu pregunta..." autocomplete="off">
        <button id="chatSend" class="chat-send" aria-label="Enviar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22 11 13 2 9l20-7z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Chatbot Trigger Button � mascota always visible, is the toggle -->
    <button class="chat-trigger" id="chatTrigger" aria-label="Abrir asistente Fynit" aria-expanded="false">
      <img src="assets/imgs png/fynit_mascot_bot.webp" alt="Fynit Bot" class="chatbot-mascot-fab icon-bot">
    </button>

    <!-- WhatsApp Button -->
    <a class="whatsapp-float" href="https://wa.me/51999999999" target="_blank" rel="noopener"
      aria-label="Escríbenos por WhatsApp">
      <svg viewBox="0 0 16 16" fill="currentColor">
        <path
          d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
      </svg>
    </a>

  </div>

  ` }} />
  );
}
