
'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div ref={containerRef}>


    {/*  ============ HERO DE PRECIOS ============  */}
    <section className="prices-hero">
      <div className="container prices-hero-inner">
        <span className="eyebrow-accent">Planes y Tarifas</span>
        <h1>Encuentra el plan ideal para tu investigación</h1>
        <p>Potencia la rigurosidad y el alcance de tu artículo científico con el respaldo de nuestra inteligencia artificial.</p>

        {/*  Toggle selector mensual/anual  */}
        <div className="pricing-toggle-container">
          <span className={`pricing-toggle-label ${!isAnnual ? 'active' : ''}`} onClick={() => setIsAnnual(false)}>Mensual</span>
          <label className="pricing-switch" aria-label="Cambiar tipo de facturación">
            <input type="checkbox" checked={isAnnual} onChange={(e) => setIsAnnual(e.target.checked)} />
            <span className="pricing-slider"></span>
          </label>
          <span className={`pricing-toggle-label ${isAnnual ? 'active' : ''}`} onClick={() => setIsAnnual(true)}>
            Anual <span className="pricing-save-badge">Ahorra 20%</span>
          </span>
        </div>
      </div>
    </section>

    {/*  ============ SECCIÓN TARJETAS DE PLANES ============  */}
    <section className="prices-section">
      <div className="container">
        <div className="pricing-grid">

          {/*  Plan Explorador (Gratis)  */}
          <article className="price-card">
            <div className="price-card-header">
              <h3 className="price-card-title">Explorador</h3>
              <div className="price-card-price">
                <span className="currency">\$</span>
                <span className="value">0</span>
                <span className="period">/ mes</span>
              </div>
              <div className="price-card-billing-detail">Gratis para siempre</div>
            </div>
            <p className="price-card-desc">Para investigadores independientes y estudiantes que dan sus primeros pasos evaluando manuscritos.</p>
            <ul className="price-card-features-list">
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Hasta <strong>2 manuscritos</strong> al mes</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Análisis de similitud <span style={{ fontSize: '11px', fontWeight: '700', background: 'var(--tint-2)', color: 'var(--blue)', padding: '2px 8px', borderRadius: '999px', marginLeft: '4px', letterSpacing: '.03em' }}>Vista previa</span></span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Estimación básica de viabilidad de cuartil</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Sugerencia básica de revistas (top 3)</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Análisis metodológico <span style={{ fontSize: '11px', fontWeight: '700', background: 'var(--tint-2)', color: 'var(--blue)', padding: '2px 8px', borderRadius: '999px', marginLeft: '4px', letterSpacing: '.03em' }}>Resumen general</span></span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Reporte de riesgos <span style={{ fontSize: '11px', fontWeight: '700', background: 'var(--tint-2)', color: 'var(--blue)', padding: '2px 8px', borderRadius: '999px', marginLeft: '4px', letterSpacing: '.03em' }}>Top 2 hallazgos</span></span>
              </li>
            </ul>
            <Link href="/analizar?plan=explorador" className="btn btn-ghost btn-block">Comenzar gratis</Link>
          </article>

          {/*  Plan Investigador Pro (Destacado)  */}
          <article className="price-card featured">
            <div className="price-card-badge">Más Popular</div>
            <div className="price-card-header">
              <h3 className="price-card-title">Investigador Pro</h3>
              <div className="price-card-price">
                <span className="currency">\$</span>
                <div className="price-val-wrapper">
                  <span className="value">{isAnnual ? '15' : '19'}</span>
                </div>
                <span className="period">/ mes</span>
              </div>
              <div className="price-card-billing-detail">
                {isAnnual ? 'Facturado anualmente ($180/año)' : 'Facturado mensualmente'}
              </div>
            </div>
            <p className="price-card-desc">Para académicos, docentes y doctorandos activos que buscan optimizar su flujo y publicar regularmente.</p>
            <ul className="price-card-features-list">
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Diagnósticos de manuscritos <strong>ilimitados</strong></span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Análisis metodológico completo con IA</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Estimación avanzada de viabilidad (Q1 a Q4)</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Reporte de riesgos editorial estructurado</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Búsqueda avanzada e ilimitada de revistas</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Comparación de versiones e historial</span>
              </li>
            </ul>
            <Link href="/analizar?plan=pro" className="btn btn-primary btn-block">Prueba 7 días gratis</Link>
          </article>

          {/*  Plan Institucional (Empresas/Universidad)  */}
          <article className="price-card">
            <div className="price-card-header">
              <h3 className="price-card-title">Institucional</h3>
              <div className="price-card-price">
                <span className="value">Cotizar</span>
              </div>
              <div className="price-card-billing-detail">Según volumen de usuarios</div>
            </div>
            <p className="price-card-desc">Para universidades, institutos, facultades o centros de investigación que desean potenciar su impacto.</p>
            <ul className="price-card-features-list">
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Cuentas para todos los docentes e investigadores</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Panel administrativo con analíticas de impacto</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Servidor dedicado y máxima seguridad de datos</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Integración API (repositorios DSpace, etc.)</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Soporte 24/7 y Account Manager dedicado</span>
              </li>
              <li className="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Capacitación en talleres institucionales</span>
              </li>
            </ul>
            <Link href="/analizar?plan=institucional" className="btn btn-ghost btn-block" style={{ borderColor: 'var(--navy)', background: 'rgba(7, 23, 66, 0.04)' }}>Contactar Ventas</Link>
          </article>

        </div>
      </div>
    </section>

    {/*  ============ TABLA COMPARATIVA DE CARACTERÍSTICAS ============  */}
    <section className="comparison-section">
      <div className="container">
        <div className="comparison-title">
          <h2>Compara todas las características</h2>
          <p>Encuentra el nivel de detalle y soporte que necesitas para tu ruta de publicación.</p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Funcionalidad</th>
                <th>Explorador</th>
                <th>Investigador Pro</th>
                <th>Institucional</th>
              </tr>
            </thead>
            <tbody>

              {/*  Diagnóstico  */}
              <tr className="category-row">
                <td colSpan={4}>Diagnóstico Académico</td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Límite de manuscritos</span>
                  <span className="feature-desc">Cantidad de análisis independientes que puedes realizar.</span>
                </td>
                <td><span className="plan-spec">2 al mes</span></td>
                <td><span className="plan-spec" style={{ color: 'var(--blue)', fontWeight: '700' }}>Ilimitados</span></td>
                <td><span className="plan-spec">Ilimitados</span></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Análisis de similitud</span>
                  <span className="feature-desc">Detección de textos coincidentes con bases de datos.</span>
                </td>
                <td><span className="plan-spec">Básico</span></td>
                <td><span className="plan-spec">Avanzado (Completo)</span></td>
                <td><span className="plan-spec">Avanzado (Completo)</span></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Evaluación metodológica</span>
                  <span className="feature-desc">Análisis de consistencia interna y rigor experimental.</span>
                </td>
                <td><span className="plan-spec" style={{ fontSize: '12.5px', color: 'var(--blue)', background: 'var(--tint-2)', padding: '4px 10px', borderRadius: '999px', fontWeight: '700', letterSpacing: '.03em' }}>Vista parcial</span></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Detección de riesgos críticos</span>
                  <span className="feature-desc">Alertas sobre posibles falencias en estructura, citas y formato.</span>
                </td>
                <td><span className="plan-spec" style={{ fontSize: '12.5px', color: 'var(--blue)', background: 'var(--tint-2)', padding: '4px 10px', borderRadius: '999px', fontWeight: '700', letterSpacing: '.03em' }}>Top 2 hallazgos</span></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Plan de mejora personalizado</span>
                  <span className="feature-desc">Hoja de ruta priorizada con acciones concretas para elevar la calidad del manuscrito.</span>
                </td>
                <td><span className="plan-spec" style={{ fontSize: '12.5px', color: 'var(--blue)', background: 'var(--tint-2)', padding: '4px 10px', borderRadius: '999px', fontWeight: '700', letterSpacing: '.03em' }}>Básico (Acciones limitadas)</span></td>
                <td><span className="plan-spec" style={{ color: 'var(--blue)', fontWeight: '700' }}>Ilimitado y Priorizado</span></td>
                <td><span className="plan-spec">Ilimitado y Priorizado</span></td>
              </tr>

              {/*  Revistas  */}
              <tr className="category-row">
                <td colSpan={4}>Recomendación Editorial</td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Sugerencia de revistas</span>
                  <span className="feature-desc">Revistas sugeridas indexadas ordenadas por fit y compatibilidad.</span>
                </td>
                <td><span className="plan-spec">Top 3 básicas</span></td>
                <td><span className="plan-spec" style={{ color: 'var(--blue)', fontWeight: '700' }}>Ilimitadas</span></td>
                <td><span className="plan-spec">Ilimitadas</span></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Precisión de viabilidad (Q1-Q4)</span>
                  <span className="feature-desc">Modelo predictivo que estima la probabilidad de aceptación según cuartil.</span>
                </td>
                <td><span className="plan-spec">Básica (Estimada)</span></td>
                <td><span className="plan-spec" style={{ color: 'var(--blue)', fontWeight: '700' }}>Fórmula Avanzada</span></td>
                <td><span className="plan-spec">Fórmula Avanzada</span></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Filtros por indexadoras</span>
                  <span className="feature-desc">Filtra por Scopus, Web of Science (WoS), Scielo, Latindex, etc.</span>
                </td>
                <td><svg className="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>

              {/*  Gestión  */}
              <tr className="category-row">
                <td colSpan={4}>Gestión y Herramientas</td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Historial de reportes</span>
                  <span className="feature-desc">Periodo de tiempo en el que tus reportes permanecen guardados.</span>
                </td>
                <td><span className="plan-spec">30 días</span></td>
                <td><span className="plan-spec">Permanente</span></td>
                <td><span className="plan-spec">Permanente</span></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Comparativa de versiones</span>
                  <span className="feature-desc">Mide el progreso y evolución de tu artículo entre cada subida.</span>
                </td>
                <td><svg className="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>

              {/*  Integración e Institución  */}
              <tr className="category-row">
                <td colSpan={4}>Soporte y Seguridad</td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Canal de Soporte</span>
                  <span className="feature-desc">Vía por la cual resolvemos tus inquietudes técnicas o metodológicas.</span>
                </td>
                <td><span className="plan-spec">Comunidad</span></td>
                <td><span className="plan-spec" style={{ color: 'var(--blue)', fontWeight: '700' }}>Prioritario por chat</span></td>
                <td><span className="plan-spec">Dedicado 24/7 (SLA)</span></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Integración de sistemas</span>
                  <span className="feature-desc">API personalizada para enlazar repositorios institucionales de tesis.</span>
                </td>
                <td><svg className="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg className="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>
              <tr>
                <td>
                  <span className="feature-name">Panel de métricas institucionales</span>
                  <span className="feature-desc">Mide la productividad y el avance editorial global de tus investigadores.</span>
                </td>
                <td><svg className="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg className="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg className="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/*  ============ SECCIÓN PREGUNTAS FRECUENTES ============  */}
    <section className="pricing-faq-section">
      <div className="container">
        <div className="pricing-faq-head">
          <h2>Preguntas frecuentes sobre tarifas</h2>
          <p>¿Tienes dudas sobre los planes de pago? Aquí respondemos las más comunes.</p>
        </div>

        <div className="pricing-faq-grid">
          <div className="faq-card">
            <h3>¿Puedo probar el Plan Pro antes de pagar?</h3>
            <p>¡Sí! Ofrecemos una prueba gratuita de 7 días sin restricciones en el Plan Investigador Pro. Puedes registrarte, subir tus artículos y probar todas las funcionalidades premium de forma completamente libre.</p>
          </div>

          <div className="faq-card">
            <h3>¿Cómo funciona el descuento de facturación anual?</h3>
            <p>Al seleccionar la facturación anual, pagas todo el año por adelantado en un solo pago de \$180 USD (lo que equivale a \$15 USD al mes). Esto representa un ahorro directo del 20% en comparación con la tarifa de pago mensual de \$19 USD.</p>
          </div>

          <div className="faq-card">
            <h3>¿Puedo cancelar mi suscripción en cualquier momento?</h3>
            <p>Sí, no tenemos cláusulas de permanencia. Puedes cancelar tu plan mensual o anual directamente desde tu panel de usuario con un solo clic. Seguirás teniendo acceso a tus beneficios hasta que finalice tu ciclo de facturación actual.</p>
          </div>

          <div className="faq-card">
            <h3>¿Qué métodos de pago aceptan?</h3>
            <p>Aceptamos todas las principales tarjetas de crédito y débito internacionales (Visa, Mastercard, American Express). Para suscripciones institucionales de universidades o grupos, también aceptamos transferencia bancaria u orden de compra directa.</p>
          </div>

          <div className="faq-card">
            <h3>¿Qué sucede si supero el límite de 2 manuscritos gratuitos?</h3>
            <p>Tu límite se reinicia automáticamente 30 días después de tu primer diagnóstico. Si necesitas analizar un tercer documento antes de que culmine el mes o desbloquear el detalle completo de tus riesgos, puedes pasar temporalmente al plan Investigador Pro.</p>
          </div>

          <div className="faq-card">
            <h3>¿Mis manuscritos y PDFs están seguros?</h3>
            <p>Completamente. La privacidad es un pilar fundamental en Fynit. Tus documentos se encriptan tanto en tránsito como en reposo, y nunca se utilizan para entrenar modelos públicos de IA ni se comparten con terceros. Tú mantienes el 100% de los derechos de autor.</p>
          </div>
        </div>
      </div>
    </section>

  
</div>
  );
}
