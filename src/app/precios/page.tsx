
'use client';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `

    <!-- ============ HERO DE PRECIOS ============ -->
    <section class="prices-hero">
      <div class="container prices-hero-inner">
        <span class="eyebrow-accent">Planes y Tarifas</span>
        <h1>Encuentra el plan ideal para tu investigación</h1>
        <p>Potencia la rigurosidad y el alcance de tu artículo científico con el respaldo de nuestra inteligencia artificial.</p>

        <!-- Toggle selector mensual/anual -->
        <div class="pricing-toggle-container">
          <span class="pricing-toggle-label active" id="toggleLabelMensual" onclick="setBilling(false)">Mensual</span>
          <label class="pricing-switch" aria-label="Cambiar tipo de facturación">
            <input type="checkbox" id="pricingToggle">
            <span class="pricing-slider"></span>
          </label>
          <span class="pricing-toggle-label" id="toggleLabelAnual" onclick="setBilling(true)">
            Anual <span class="pricing-save-badge">Ahorra 20%</span>
          </span>
        </div>
      </div>
    </section>

    <!-- ============ SECCIÓN TARJETAS DE PLANES ============ -->
    <section class="prices-section">
      <div class="container">
        <div class="pricing-grid">

          <!-- Plan Explorador (Gratis) -->
          <article class="price-card">
            <div class="price-card-header">
              <h3 class="price-card-title">Explorador</h3>
              <div class="price-card-price">
                <span class="currency">\$</span>
                <span class="value">0</span>
                <span class="period">/ mes</span>
              </div>
              <div class="price-card-billing-detail">Gratis para siempre</div>
            </div>
            <p class="price-card-desc">Para investigadores independientes y estudiantes que dan sus primeros pasos evaluando manuscritos.</p>
            <ul class="price-card-features-list">
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Hasta <strong>2 manuscritos</strong> al mes</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Análisis de similitud <span style="font-size:11px;font-weight:700;background:var(--tint-2);color:var(--blue);padding:2px 8px;border-radius:999px;margin-left:4px;letter-spacing:.03em;">Vista previa</span></span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Estimación básica de viabilidad de cuartil</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Sugerencia básica de revistas (top 3)</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Análisis metodológico <span style="font-size:11px;font-weight:700;background:var(--tint-2);color:var(--blue);padding:2px 8px;border-radius:999px;margin-left:4px;letter-spacing:.03em;">Resumen general</span></span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Reporte de riesgos <span style="font-size:11px;font-weight:700;background:var(--tint-2);color:var(--blue);padding:2px 8px;border-radius:999px;margin-left:4px;letter-spacing:.03em;">Top 2 hallazgos</span></span>
              </li>
            </ul>
            <a href="/analizar?plan=explorador" class="btn btn-ghost btn-block">Comenzar gratis</a>
          </article>

          <!-- Plan Investigador Pro (Destacado) -->
          <article class="price-card featured">
            <div class="price-card-badge">Más Popular</div>
            <div class="price-card-header">
              <h3 class="price-card-title">Investigador Pro</h3>
              <div class="price-card-price">
                <span class="currency">\$</span>
                <div class="price-val-wrapper" id="proPriceValWrapper">
                  <span class="value" id="proPriceVal">19</span>
                </div>
                <span class="period">/ mes</span>
              </div>
              <div class="price-card-billing-detail" id="proBillingDetail">Facturado mensualmente</div>
            </div>
            <p class="price-card-desc">Para académicos, docentes y doctorandos activos que buscan optimizar su flujo y publicar regularmente.</p>
            <ul class="price-card-features-list">
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Diagnósticos de manuscritos <strong>ilimitados</strong></span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Análisis metodológico completo con IA</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Estimación avanzada de viabilidad (Q1 a Q4)</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Reporte de riesgos editorial estructurado</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Búsqueda avanzada e ilimitada de revistas</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Comparación de versiones e historial</span>
              </li>
            </ul>
            <a href="/analizar?plan=pro" class="btn btn-primary btn-block">Prueba 7 días gratis</a>
          </article>

          <!-- Plan Institucional (Empresas/Universidad) -->
          <article class="price-card">
            <div class="price-card-header">
              <h3 class="price-card-title">Institucional</h3>
              <div class="price-card-price">
                <span class="value">Cotizar</span>
              </div>
              <div class="price-card-billing-detail">Según volumen de usuarios</div>
            </div>
            <p class="price-card-desc">Para universidades, institutos, facultades o centros de investigación que desean potenciar su impacto.</p>
            <ul class="price-card-features-list">
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Cuentas para todos los docentes e investigadores</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Panel administrativo con analíticas de impacto</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Servidor dedicado y máxima seguridad de datos</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Integración API (repositorios DSpace, etc.)</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Soporte 24/7 y Account Manager dedicado</span>
              </li>
              <li class="price-card-feature-item">
                <svg aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg>
                <span>Capacitación en talleres institucionales</span>
              </li>
            </ul>
            <a href="/analizar?plan=institucional" class="btn btn-ghost btn-block" style="border-color: var(--navy); background: rgba(7, 23, 66, 0.04);">Contactar Ventas</a>
          </article>

        </div>
      </div>
    </section>

    <!-- ============ TABLA COMPARATIVA DE CARACTERÍSTICAS ============ -->
    <section class="comparison-section">
      <div class="container">
        <div class="comparison-title">
          <h2>Compara todas las características</h2>
          <p>Encuentra el nivel de detalle y soporte que necesitas para tu ruta de publicación.</p>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Funcionalidad</th>
                <th>Explorador</th>
                <th>Investigador Pro</th>
                <th>Institucional</th>
              </tr>
            </thead>
            <tbody>

              <!-- Diagnóstico -->
              <tr class="category-row">
                <td colspan="4">Diagnóstico Académico</td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Límite de manuscritos</span>
                  <span class="feature-desc">Cantidad de análisis independientes que puedes realizar.</span>
                </td>
                <td><span class="plan-spec">2 al mes</span></td>
                <td><span class="plan-spec" style="color:var(--blue); font-weight:700;">Ilimitados</span></td>
                <td><span class="plan-spec">Ilimitados</span></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Análisis de similitud</span>
                  <span class="feature-desc">Detección de textos coincidentes con bases de datos.</span>
                </td>
                <td><span class="plan-spec">Básico</span></td>
                <td><span class="plan-spec">Avanzado (Completo)</span></td>
                <td><span class="plan-spec">Avanzado (Completo)</span></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Evaluación metodológica</span>
                  <span class="feature-desc">Análisis de consistencia interna y rigor experimental.</span>
                </td>
                <td><span class="plan-spec" style="font-size:12.5px;color:var(--blue);background:var(--tint-2);padding:4px 10px;border-radius:999px;font-weight:700;letter-spacing:.03em;">Vista parcial</span></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Detección de riesgos críticos</span>
                  <span class="feature-desc">Alertas sobre posibles falencias en estructura, citas y formato.</span>
                </td>
                <td><span class="plan-spec" style="font-size:12.5px;color:var(--blue);background:var(--tint-2);padding:4px 10px;border-radius:999px;font-weight:700;letter-spacing:.03em;">Top 2 hallazgos</span></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Plan de mejora personalizado</span>
                  <span class="feature-desc">Hoja de ruta priorizada con acciones concretas para elevar la calidad del manuscrito.</span>
                </td>
                <td><span class="plan-spec" style="font-size:12.5px;color:var(--blue);background:var(--tint-2);padding:4px 10px;border-radius:999px;font-weight:700;letter-spacing:.03em;">Básico (Acciones limitadas)</span></td>
                <td><span class="plan-spec" style="color:var(--blue); font-weight:700;">Ilimitado y Priorizado</span></td>
                <td><span class="plan-spec">Ilimitado y Priorizado</span></td>
              </tr>

              <!-- Revistas -->
              <tr class="category-row">
                <td colspan="4">Recomendación Editorial</td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Sugerencia de revistas</span>
                  <span class="feature-desc">Revistas sugeridas indexadas ordenadas por fit y compatibilidad.</span>
                </td>
                <td><span class="plan-spec">Top 3 básicas</span></td>
                <td><span class="plan-spec" style="color:var(--blue); font-weight:700;">Ilimitadas</span></td>
                <td><span class="plan-spec">Ilimitadas</span></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Precisión de viabilidad (Q1-Q4)</span>
                  <span class="feature-desc">Modelo predictivo que estima la probabilidad de aceptación según cuartil.</span>
                </td>
                <td><span class="plan-spec">Básica (Estimada)</span></td>
                <td><span class="plan-spec" style="color:var(--blue); font-weight:700;">Fórmula Avanzada</span></td>
                <td><span class="plan-spec">Fórmula Avanzada</span></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Filtros por indexadoras</span>
                  <span class="feature-desc">Filtra por Scopus, Web of Science (WoS), Scielo, Latindex, etc.</span>
                </td>
                <td><svg class="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>

              <!-- Gestión -->
              <tr class="category-row">
                <td colspan="4">Gestión y Herramientas</td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Historial de reportes</span>
                  <span class="feature-desc">Periodo de tiempo en el que tus reportes permanecen guardados.</span>
                </td>
                <td><span class="plan-spec">30 días</span></td>
                <td><span class="plan-spec">Permanente</span></td>
                <td><span class="plan-spec">Permanente</span></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Comparativa de versiones</span>
                  <span class="feature-desc">Mide el progreso y evolución de tu artículo entre cada subida.</span>
                </td>
                <td><svg class="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>

              <!-- Integración e Institución -->
              <tr class="category-row">
                <td colspan="4">Soporte y Seguridad</td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Canal de Soporte</span>
                  <span class="feature-desc">Vía por la cual resolvemos tus inquietudes técnicas o metodológicas.</span>
                </td>
                <td><span class="plan-spec">Comunidad</span></td>
                <td><span class="plan-spec" style="color:var(--blue); font-weight:700;">Prioritario por chat</span></td>
                <td><span class="plan-spec">Dedicado 24/7 (SLA)</span></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Integración de sistemas</span>
                  <span class="feature-desc">API personalizada para enlazar repositorios institucionales de tesis.</span>
                </td>
                <td><svg class="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg class="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>
              <tr>
                <td>
                  <span class="feature-name">Panel de métricas institucionales</span>
                  <span class="feature-desc">Mide la productividad y el avance editorial global de tus investigadores.</span>
                </td>
                <td><svg class="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg class="cross-icon" aria-hidden="true"><use href="/sprite.svg#ic-close" /></svg></td>
                <td><svg class="check-icon" aria-hidden="true"><use href="/sprite.svg#ic-check" /></svg></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ SECCIÓN PREGUNTAS FRECUENTES ============ -->
    <section class="pricing-faq-section">
      <div class="container">
        <div class="pricing-faq-head">
          <h2>Preguntas frecuentes sobre tarifas</h2>
          <p>¿Tienes dudas sobre los planes de pago? Aquí respondemos las más comunes.</p>
        </div>

        <div class="pricing-faq-grid">
          <div class="faq-card">
            <h3>¿Puedo probar el Plan Pro antes de pagar?</h3>
            <p>¡Sí! Ofrecemos una prueba gratuita de 7 días sin restricciones en el Plan Investigador Pro. Puedes registrarte, subir tus artículos y probar todas las funcionalidades premium de forma completamente libre.</p>
          </div>

          <div class="faq-card">
            <h3>¿Cómo funciona el descuento de facturación anual?</h3>
            <p>Al seleccionar la facturación anual, pagas todo el año por adelantado en un solo pago de \$180 USD (lo que equivale a \$15 USD al mes). Esto representa un ahorro directo del 20% en comparación con la tarifa de pago mensual de \$19 USD.</p>
          </div>

          <div class="faq-card">
            <h3>¿Puedo cancelar mi suscripción en cualquier momento?</h3>
            <p>Sí, no tenemos cláusulas de permanencia. Puedes cancelar tu plan mensual o anual directamente desde tu panel de usuario con un solo clic. Seguirás teniendo acceso a tus beneficios hasta que finalice tu ciclo de facturación actual.</p>
          </div>

          <div class="faq-card">
            <h3>¿Qué métodos de pago aceptan?</h3>
            <p>Aceptamos todas las principales tarjetas de crédito y débito internacionales (Visa, Mastercard, American Express). Para suscripciones institucionales de universidades o grupos, también aceptamos transferencia bancaria u orden de compra directa.</p>
          </div>

          <div class="faq-card">
            <h3>¿Qué sucede si supero el límite de 2 manuscritos gratuitos?</h3>
            <p>Tu límite se reinicia automáticamente 30 días después de tu primer diagnóstico. Si necesitas analizar un tercer documento antes de que culmine el mes o desbloquear el detalle completo de tus riesgos, puedes pasar temporalmente al plan Investigador Pro.</p>
          </div>

          <div class="faq-card">
            <h3>¿Mis manuscritos y PDFs están seguros?</h3>
            <p>Completamente. La privacidad es un pilar fundamental en Fynit. Tus documentos se encriptan tanto en tránsito como en reposo, y nunca se utilizan para entrenar modelos públicos de IA ni se comparten con terceros. Tú mantienes el 100% de los derechos de autor.</p>
          </div>
        </div>
      </div>
    </section>

  ` }} />
  );
}
