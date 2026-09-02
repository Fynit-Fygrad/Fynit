'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';

const faqData = [
  {
    id: 1,
    category: 'general',
    question: '¿Qué es Fynit y cómo me ayuda en mi proceso de investigación?',
    answer: (
      <>
        <p><strong>Fynit</strong> es un asistente académico impulsado por inteligencia artificial especialmente diseñado para investigadores, doctorandos y docentes universitarios. Fynit analiza tus borradores de artículos científicos y te entrega una <strong>evaluación honesta en segundos</strong>.</p>
        <p>Te ayuda a detectar problemas de similitud, identificar falencias en tu metodología, estimar la viabilidad de aceptación en diferentes cuartiles de revistas indexadas (Q1, Q2, etc.) y estructurar un plan de acción paso a paso para optimizar tu manuscrito antes de enviarlo a revisión por pares.</p>
      </>
    )
  },
  {
    id: 2,
    category: 'general',
    question: '¿Fynit reemplaza el trabajo de un editor humano o un asesor metodológico?',
    answer: (
      <>
        <p><strong>No.</strong> Fynit actúa como un primer filtro y un copiloto interactivo de alta velocidad. Su IA te permite automatizar las tareas repetitivas y de diagnóstico inicial (como formateo de citas, detección de textos redundantes y preselección de revistas).</p>
        <p>Esto te ahorra semanas de trabajo, pero la revisión final y el aporte intelectual profundo siguen correspondiendo al investigador. En planes avanzados, Fynit además te permite conectar tu reporte directamente con consultores humanos expertos para una mentoría especializada de alto nivel.</p>
      </>
    )
  },
  {
    id: 3,
    category: 'diagnostico',
    question: '¿Qué tipos de archivos puedo subir y cuál es el tamaño máximo?',
    answer: (
      <>
        <p>Actualmente puedes subir manuscritos en formato <strong>PDF</strong> y documentos de Microsoft Word (<strong>.docx</strong>).</p>
        <p>El límite de peso por archivo es de <strong>15 MB</strong> para el plan Explorador (gratuito) y hasta <strong>35 MB</strong> en el plan Investigador Pro, lo cual es más que suficiente para almacenar artículos con gráficos, tablas y fórmulas complejas de alta resolución.</p>
      </>
    )
  },
  {
    id: 4,
    category: 'diagnostico',
    question: '¿Cómo funciona el diagnóstico de similitud y qué tan confiable es?',
    answer: (
      <>
        <p>Nuestra IA escanea el texto de tu manuscrito y lo contrasta en tiempo real con una base de datos global indexada que contiene millones de artículos científicos, tesis de posgrado, libros académicos y contenidos web públicos.</p>
        <p>El reporte te indica el porcentaje global de similitud e identifica las frases específicas que requieren parafraseo o una cita formal para evitar malas interpretaciones o sospechas de plagio involuntario. Su precisión y rigurosidad son equivalentes a los estándares empleados por las principales revistas científicas.</p>
      </>
    )
  },
  {
    id: 5,
    category: 'diagnostico',
    question: '¿Qué es la puntuación de "Readiness" o nivel de preparación?',
    answer: (
      <>
        <p>El <strong>Readiness Score</strong> es una métrica desarrollada por Fynit que va de 0 a 100 y evalúa el nivel de madurez técnica de tu artículo.</p>
        <p>Analiza si el manuscrito cumple con la estructura estándar (como IMRyD: Introducción, Metodología, Resultados y Discusión), si las citas bibliográficas están completas y consistentes, y si el hilo argumental es coherente. Un puntaje superior a <strong>80/100</strong> indica que tu artículo tiene una probabilidad considerablemente menor de sufrir un rechazo de escritorio (*desk reject*) automático.</p>
      </>
    )
  },
  {
    id: 6,
    category: 'revistas',
    question: '¿Cómo determina la IA qué revistas y qué cuartil son viables?',
    answer: (
      <>
        <p>Fynit analiza la temática, las palabras clave, el nivel de complejidad del marco metodológico y la bibliografía de tu artículo. Posteriormente, utiliza modelos semánticos avanzados para comparar tu manuscrito con artículos publicados recientemente en revistas indexadas en <strong>Scopus y Web of Science (WoS)</strong>.</p>
        <p>De este modo, Fynit estima la compatibilidad temática (<em>Fit Rate</em>) y calcula de forma probabilística qué tan viable es postular a una revista Q1, Q2, Q3 o Q4, permitiéndote tomar decisiones informadas para evitar pérdidas de tiempo en rechazos reiterados.</p>
      </>
    )
  },
  {
    id: 7,
    category: 'revistas',
    question: '¿Qué indexadoras académicas cubre la base de datos de Fynit?',
    answer: (
      <>
        <p>Nuestra base de datos se sincroniza periódicamente con las principales redes y directorios mundiales:</p>
        <ul>
          <li><strong>Scopus</strong> (SJR - Cuartiles Q1 a Q4)</li>
          <li><strong>Web of Science</strong> (JCR - WoS Core Collection)</li>
          <li><strong>SciELO</strong> (Bases de datos regionales latinoamericanas e ibéricas)</li>
          <li><strong>Latindex Catálogo 2.0</strong> y <strong>Redalyc</strong> (Revistas de acceso abierto)</li>
        </ul>
      </>
    )
  },
  {
    id: 8,
    category: 'planes',
    question: '¿Cómo garantizan la privacidad de mi manuscrito y mi propiedad intelectual?',
    answer: (
      <>
        <p>La seguridad y la privacidad son prioridades absolutas para Fynit. Implementamos políticas estrictas:</p>
        <p>1. <strong>Cifrado extremo:</strong> Tus archivos se encriptan mediante protocolos SSL/TLS en tránsito y AES-256 en reposo en nuestros servidores seguros.</p>
        <p>2. <strong>Sin uso para entrenamiento:</strong> Tus manuscritos nunca se utilizan para entrenar o ajustar modelos de IA públicos comerciales. Tus artículos permanecen 100% privados y tú retienes la propiedad intelectual y los derechos de autor absolutos en todo momento.</p>
        <p>3. <strong>Eliminación de datos:</strong> Puedes eliminar de forma definitiva tus documentos e historial de reportes del sistema cuando lo desees.</p>
      </>
    )
  },
  {
    id: 9,
    category: 'planes',
    question: '¿Qué limitaciones tiene el plan gratuito "Explorador"?',
    answer: (
      <>
        <p>El plan <strong>Explorador</strong> está diseñado para que pruebes la potencia de la herramienta de forma permanente.</p>
        <p>Te permite realizar <strong>1 diagnóstico completo al mes</strong>, lo cual incluye el análisis de similitud básico, un resumen de viabilidad y sugerencia limitada de las 3 revistas con mejor índice de fit. No incluye el reporte avanzado de riesgos metodológicos, historial permanente de versiones, ni descarga de informes detallados en PDF.</p>
      </>
    )
  },
  {
    id: 10,
    category: 'planes',
    question: '¿Cuáles son los métodos de pago aceptados y cómo cancelo?',
    answer: (
      <>
        <p>Aceptamos tarjetas de crédito y débito internacionales (Visa, Mastercard, American Express) de forma segura a través de nuestra pasarela de pagos.</p>
        <p>No existen contratos de permanencia obligatoria ni plazos ocultos. Puedes cancelar o pausar tu suscripción directamente en tu cuenta con un solo clic. Si cancelas, seguirás teniendo acceso completo a las funciones contratadas hasta la finalización de tu periodo actual de facturación.</p>
      </>
    )
  }
];

export default function Page() {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    // Convert components to string for searching
    // Here we just search the question text for simplicity
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div ref={containerRef}>
      {/*  ============ HERO DE FAQ ============  */}
      <section className="faq-hero">
        <div className="container faq-hero-inner">
          <span className="eyebrow-accent">Centro de Ayuda</span>
          <h1>Preguntas Frecuentes</h1>
          <p>Encuentra respuestas rápidas sobre cómo funciona Fynit, el diagnóstico con IA y la seguridad de tus manuscritos.</p>

          {/*  Buscador interactivo  */}
          <div className="faq-search-container">
            <svg className="faq-search-icon" aria-hidden="true"><use href="/sprite.svg#ic-search" /></svg>
            <input 
              type="text" 
              className="faq-search-input" 
              placeholder="Busca tu pregunta (ej. similitud, Pro, privacidad...)" 
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/*  ============ SECCIÓN TABS & FAQ LIST ============  */}
      <section className="faq-tabs-section">
        <div className="container">

          {/*  Botones de pestaña / categorías  */}
          <div className="faq-tabs-container">
            <button className={`faq-tab-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>Mostrar Todo</button>
            <button className={`faq-tab-btn ${activeCategory === 'general' ? 'active' : ''}`} onClick={() => setActiveCategory('general')}>General</button>
            <button className={`faq-tab-btn ${activeCategory === 'diagnostico' ? 'active' : ''}`} onClick={() => setActiveCategory('diagnostico')}>Diagnóstico con IA</button>
            <button className={`faq-tab-btn ${activeCategory === 'revistas' ? 'active' : ''}`} onClick={() => setActiveCategory('revistas')}>Revistas y Publicación</button>
            <button className={`faq-tab-btn ${activeCategory === 'planes' ? 'active' : ''}`} onClick={() => setActiveCategory('planes')}>Cuenta y Seguridad</button>
          </div>

          {/*  Lista de acordeones  */}
          <div className="faq-list">
            {filteredFaqs.map((faq) => (
              <div className={`faq-item ${openQuestion === faq.id ? 'open' : ''}`} key={faq.id}>
                <button className="faq-trigger" aria-expanded={openQuestion === faq.id} onClick={() => toggleQuestion(faq.id)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>
                <div className="faq-content" style={{ maxHeight: openQuestion === faq.id ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*  Estado Sin Resultados  */}
          {filteredFaqs.length === 0 && (
            <div className="faq-no-results" style={{ display: 'block' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <h3>No encontramos resultados</h3>
              <p>No hay preguntas que coincidan con tu búsqueda. Intenta con otros términos o limpia el buscador.</p>
              <button className="btn btn-ghost btn-sm" onClick={() => setSearchQuery('')}>Limpiar búsqueda</button>
            </div>
          )}

          {/*  FAQ Teaser de Contacto  */}
          <div className="faq-contact-teaser">
            <div className="faq-contact-teaser-inner">
              <h2>¿Aún tienes alguna pregunta sin responder?</h2>
              <p>Si no encontraste lo que buscabas, nuestro equipo de soporte académico está listo para ayudarte con tu caso específico.</p>
              <Link href="/analizar" className="btn btn-primary">Escríbenos una duda</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
