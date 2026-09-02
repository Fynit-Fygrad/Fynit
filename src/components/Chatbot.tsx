'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const faqDatabase: Record<string, { q: string; a: string; keywords: string[] }> = {
  "que-es": {
    q: "¿Qué es Fynit?",
    a: "Fynit es un asistente académico con IA. Te ayuda a diagnosticar la similitud de tus documentos, evaluar la rigurosidad metodológica, estimar el cuartil editorial viable (Q1, Q2, etc.) y guiarte paso a paso en tu ruta para publicar con éxito.",
    keywords: ["que es", "qué es", "fynit", "para que sirve", "de que trata", "que hacen"]
  },
  "como-funciona": {
    q: "¿Cómo funciona?",
    a: "¡Es muy sencillo! Sube tu documento en PDF o Word. Nuestra IA evalúa tu artículo en pocos segundos comparándolo con millones de registros. Luego te da un reporte detallado con riesgos detectados, revistas recomendadas y un plan de acción priorizado.",
    keywords: ["como funciona", "cómo funciona", "como usar", "como lo uso", "instrucciones", "sirve", "funciona"]
  },
  "que-es-articulo": {
    q: "¿Qué es un artículo científico?",
    a: "Es un informe escrito que describe resultados originales de investigación. Suele contar con secciones como Introducción, Metodología, Resultados y Discusión (IMRyD), y debe cumplir con criterios académicos rigurosos para ser aceptado por revistas indexadas.",
    keywords: ["articulo cientifico", "artículo", "investigacion", "paper"]
  },
  "contacto": {
    q: "¿Cuál es el contacto?",
    a: "Puedes escribirnos directamente a nuestro canal de WhatsApp oficial haciendo clic en el botón flotante, o enviarnos un mensaje a través de nuestro formulario en la página de Contacto.",
    keywords: ["contacto", "whatsapp", "telefono", "teléfono", "correo", "email", "contactar", "hablar"]
  },
  "precio": {
    q: "¿Cuánto cuesta?",
    a: "Tenemos el plan Explorador que es gratis (1 análisis al mes). El plan Investigador Pro cuesta $19/mes con análisis ilimitados y planes de mejora avanzados, y un plan Institucional para facultades.",
    keywords: ["precio", "costo", "cuesta", "pagar", "gratis", "planes", "suscripcion", "dolares", "mensualidad"]
  },
  "cuartil": {
    q: "¿Qué es un cuartil Q1/Q2?",
    a: "Las revistas científicas se agrupan en cuatro cuartiles (Q1, Q2, Q3, Q4) según su impacto. Q1 representa al 25% superior de las revistas más prestigiosas. Fynit analiza tu contenido para orientar a qué cuartil es más viable postular.",
    keywords: ["cuartil", "q1", "q2", "q3", "q4", "indexacion", "scopus", "wos", "scielo"]
  },
  "seguridad": {
    q: "¿Es segura mi investigación?",
    a: "Absolutamente. Tu investigación es confidencial. Usamos tu documento únicamente para realizar el análisis solicitado. No publicamos ni adquirimos derechos sobre tu trabajo. Puedes revisar nuestra política de privacidad.",
    keywords: ["seguridad", "seguro", "privacidad", "confidencial", "robar", "derechos", "plagio", "publican"]
  },
  "registro": {
    q: "¿Cómo me registro?",
    a: "Para registrarte, haz clic en el botón 'Registrarse' o 'Iniciar Sesión' en la parte superior de la página. Puedes crear tu cuenta gratis en menos de un minuto.",
    keywords: ["registro", "registrarme", "cuenta", "crear", "iniciar sesion", "login"]
  }
};

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '¡Hola! Soy el asistente de <strong>Fynit</strong>. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    const lowerText = text.toLowerCase();
    let bestMatch = null;
    let maxMatches = 0;

    if (/(hola|buenas|buenos|saludos|hey)/i.test(lowerText)) {
      bestMatch = "¡Hola! ¿En qué te puedo ayudar hoy? Puedes seleccionar una de las preguntas sugeridas o escribirme tu consulta.";
    } else {
      Object.keys(faqDatabase).forEach(key => {
        const item = faqDatabase[key];
        let matchCount = 0;
        item.keywords.forEach(kw => {
          if (lowerText.includes(kw)) matchCount++;
        });
        if (matchCount > maxMatches) {
          maxMatches = matchCount;
          bestMatch = item.a;
        }
      });
    }

    const response = bestMatch || "Por el momento puedo ayudarte mejor con las preguntas recomendadas de la lista o mediante nuestro canal de WhatsApp para una atención personalizada.";

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 1000 + Math.random() * 600);
  };

  const chipKeys = ["que-es", "como-funciona", "precio", "seguridad", "contacto", "registro"];

  return (
    <div className="float-stack">
      {/* Chatbot Widget Window */}
      <div className={`chat-widget ${isOpen ? 'is-open' : ''}`} id="chatWidget" aria-hidden={!isOpen}>
        <div className="chat-header">
          <div className="chat-avatar">
            <img src="assets/imgs png/fynit_mascot_bot.webp" alt="Fynit Bot"
              style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '50%', background: 'var(--blue)', padding: '2px' }} />
          </div>
          <div className="chat-header-info">
            <strong>Fynit IA</strong>
            <span>En línea ahora</span>
          </div>
          <button className="chat-close" id="chatClose" aria-label="Cerrar chat" onClick={() => setIsOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="chat-body" id="chatBody" ref={chatBodyRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-msg ${msg.sender}`}>
              <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-msg bot chat-typing">
              <p><span className="chat-typing-dots"><span></span><span></span><span></span></span></p>
            </div>
          )}

          <div className="chat-suggestions" id="chatSuggestions">
            {chipKeys.map(key => (
              <button key={key} className="chat-chip" onClick={() => handleSend(faqDatabase[key].q)}>
                {faqDatabase[key].q}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-input-row">
          <input 
            type="text" 
            id="chatInput" 
            className="chat-input" 
            placeholder="Escribe tu pregunta..." 
            autoComplete="off" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
          />
          <button id="chatSend" className="chat-send" aria-label="Enviar" onClick={() => handleSend(inputValue)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9l20-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chatbot Trigger Button */}
      <button className={`chat-trigger ${isOpen ? 'is-open' : ''}`} id="chatTrigger" aria-label="Abrir asistente Fynit" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <img src="assets/imgs png/fynit_mascot_bot.webp" alt="Fynit Bot" className="chatbot-mascot-fab icon-bot" />
      </button>

      {/* WhatsApp Button */}
      <Link className="whatsapp-float" href="https://wa.me/51999999999" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </Link>
    </div>
  );
}
