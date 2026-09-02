
'use client';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `

    <!-- ============ CONTACTO NUEVO LAYOUT ============ -->
    <section class="contact-hero-section">

      <!-- Network Background Decoration (Optional subtle nodes) -->
      <div class="contact-hero-bg">
      </div>

      <div class="container" style="position: relative; z-index: 2;">

        <!-- HEADER -->
        <div style="margin-bottom: 40px;">
          <span
            style="font-family:'Sora',sans-serif;font-size:11px;font-weight:700;color:#1B60DF;letter-spacing:0.1em;text-transform:uppercase;display:inline-flex;align-items:center;gap:12px;">
            <span style="width:24px;height:2px;background:#1B60DF;"></span> EVALUAR <span
              style="width:24px;height:2px;background:transparent;"></span>
          </span>
          <h1
            style="font-family:'Sora',sans-serif;font-size:32px;font-weight:700;color:#0e1f45;margin:12px 0 16px;letter-spacing:-0.02em;">
            Hablemos de tu investigación</h1>
          <p style="color:#6b7280;font-size:15px;max-width:540px;margin:0 auto;line-height:1.6;">Envíanos tu artículo
            científico para un diagnóstico inicial rápido<br>y personalizado sobre su potencial editorial.</p>
        </div>

        <!-- MAIN FORM CARD WRAPPER -->
        <div style="position: relative; max-width: 960px; margin: 0 auto;">

          <!-- MASCOTA FLOTANTE -->
          <img src="assets/imgs png/fynit-contacto.webp" class="mascota-flotante" alt="Mascota Fynit">
          <div class="contact-form-card">



            <form id="contactForm" enctype="multipart/form-data">

              <div class="contact-form-grid">

                <!-- LEFT COLUMN: TUS DATOS -->
                <div style="display: flex; flex-direction: column;">

                  <!-- Title -->
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <div
                      style="width: 28px; height: 28px; border-radius: 8px; background: #f0f6ff; display: flex; align-items: center; justify-content: center; color: #1B60DF;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <h3
                      style="font-family:'Sora',sans-serif;font-size:11px;font-weight:700;color:#1B60DF;letter-spacing:0.06em;text-transform:uppercase;margin:0;">
                      TUS DATOS</h3>
                  </div>

                  <!-- Input Apellidos -->
                  <div style="margin-bottom: 16px;">
                    <label
                      style="display:block;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;margin-bottom:6px;">Apellidos</label>
                    <div style="position: relative;">
                      <div
                        style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <input type="text" name="apellidos" placeholder="Tus apellidos" required
                        style="width:100%;box-sizing:border-box;border:1px solid #f3f4f6;background:#f9fafb;border-radius:10px;padding:12px 12px 12px 42px;font-family:'Inter',sans-serif;font-size:13px;color:#111827;outline:none;transition:all 0.2s;"
                        onfocus="this.style.borderColor='#1B60DF';this.style.background='#fff';this.style.boxShadow='0 0 0 4px rgba(27,96,223,0.1)';"
                        onblur="this.style.borderColor='#f3f4f6';this.style.background='#f9fafb';this.style.boxShadow='none';">
                    </div>
                  </div>

                  <!-- Input Nombres -->
                  <div style="margin-bottom: 16px;">
                    <label
                      style="display:block;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;margin-bottom:6px;">Nombres</label>
                    <div style="position: relative;">
                      <div
                        style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <input type="text" name="nombres" placeholder="Tus nombres" required
                        style="width:100%;box-sizing:border-box;border:1px solid #f3f4f6;background:#f9fafb;border-radius:10px;padding:12px 12px 12px 42px;font-family:'Inter',sans-serif;font-size:13px;color:#111827;outline:none;transition:all 0.2s;"
                        onfocus="this.style.borderColor='#1B60DF';this.style.background='#fff';this.style.boxShadow='0 0 0 4px rgba(27,96,223,0.1)';"
                        onblur="this.style.borderColor='#f3f4f6';this.style.background='#f9fafb';this.style.boxShadow='none';">
                    </div>
                  </div>

                  <!-- Input Correo -->
                  <div style="margin-bottom: 16px;">
                    <label
                      style="display:block;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;margin-bottom:6px;">Correo
                      electrónico </label>
                    <div style="position: relative;">
                      <div
                        style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <input type="email" name="email" placeholder="tu@correo.com" required
                        style="width:100%;box-sizing:border-box;border:1px solid #f3f4f6;background:#f9fafb;border-radius:10px;padding:12px 12px 12px 42px;font-family:'Inter',sans-serif;font-size:13px;color:#111827;outline:none;transition:all 0.2s;"
                        onfocus="this.style.borderColor='#1B60DF';this.style.background='#fff';this.style.boxShadow='0 0 0 4px rgba(27,96,223,0.1)';"
                        onblur="this.style.borderColor='#f3f4f6';this.style.background='#f9fafb';this.style.boxShadow='none';">
                    </div>
                  </div>

                  <!-- Estado del artículo -->
                  <div style="margin-bottom: 16px;">
                    <label style="display:block;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;margin-bottom:6px;">Estado del artículo</label>
                    <div class="custom-radio-group grid-4">
                      <label>
                        <input type="radio" name="estado_articulo" value="borrador" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          </div>
                          <span class="custom-radio-text">Borrador</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="estado_articulo" value="terminado" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15l2 2 4-4"></path></svg>
                          </div>
                          <span class="custom-radio-text">Terminado</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="estado_articulo" value="enviado" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          </div>
                          <span class="custom-radio-text">Ya fue enviado</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="estado_articulo" value="rechazado" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          </div>
                          <span class="custom-radio-text" style="font-size: 10px;">Fue rechazado</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- ¿Qué buscas? -->
                  <div style="margin-bottom: 16px;">
                    <label style="display:block;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;margin-bottom:6px;">¿Qué buscas?</label>
                    <div class="custom-radio-group grid-3">
                      <label>
                        <input type="radio" name="que_buscas" value="revista" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                          </div>
                          <span class="custom-radio-text">Revista</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="que_buscas" value="conferencia" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                          </div>
                          <span class="custom-radio-text">Conferencia</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="que_buscas" value="no_seguro" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                          </div>
                          <span class="custom-radio-text">No estoy seguro</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- ¿Qué indexación buscas? -->
                  <div style="margin-bottom: auto;">
                    <label style="display:block;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;margin-bottom:6px;">¿Qué indexación buscas?</label>
                    <div class="custom-radio-group grid-4">
                      <label>
                        <input type="radio" name="indexacion" value="scopus" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon icon-scopus">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" stroke="none" fill="currentColor">SC</text></svg>
                          </div>
                          <span class="custom-radio-text">Scopus</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="indexacion" value="wos" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon icon-wos">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10"></circle><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="white">W</text></svg>
                          </div>
                          <span class="custom-radio-text">WoS</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="indexacion" value="scielo" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon icon-scielo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                          </div>
                          <span class="custom-radio-text">SciELO</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="indexacion" value="no_claro" class="custom-radio-input">
                        <div class="custom-radio-label">
                          <div class="custom-radio-icon icon-notengo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                          </div>
                          <span class="custom-radio-text" style="font-size: 10px;">No lo tengo claro</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Tu Investigación es confidencial info box -->
                  <div style="background: #ffffff; border-radius: 10px; padding: 12px; display: flex; gap: 12px; align-items: flex-start; margin-top: 8px; border: 1px solid #eef4ff;">
                    <div style="color: #1B60DF; flex-shrink: 0;">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <div>
                      <h4 style="font-family:'Sora',sans-serif;font-size:12px;font-weight:700;color:#111827;margin:0 0 4px;">Tu Investigación es confidencial</h4>
                      <p style="margin:0 0 4px;font-size:11px;color:#6b7280;line-height:1.4;">Usamos tu documento únicamente para realizar el análisis solicitado.<br>No publicamos ni adquirimos derechos sobre tu investigación.</p>
                      <p style="margin:0;font-size:11px;color:#6b7280;line-height:1.4;">Consulta nuestra <a href="javascript:void(0)" onclick="openPrivacyModal(event)" style="color:#1B60DF;font-weight:600;text-decoration:none;">política de privacidad</a>.</p>
                    </div>
                  </div>

                </div>

                <!-- RIGHT COLUMN: TU ARTICULO CIENTIFICO -->
                <div style="display: flex; flex-direction: column;">

                  <!-- Title -->
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <div
                      style="width: 28px; height: 28px; border-radius: 8px; background: #f0f6ff; display: flex; align-items: center; justify-content: center; color: #1B60DF;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <line x1="10" x2="8" y1="9" y2="9" />
                      </svg>
                    </div>
                    <h3
                      style="font-family:'Sora',sans-serif;font-size:11px;font-weight:700;color:#1B60DF;letter-spacing:0.06em;text-transform:uppercase;margin:0;">
                      TU ARTÍCULO CIENTÍFICO</h3>
                  </div>

                  <!-- DROP ZONE -->
                  <div id="dropZone"
                    style="position: relative; flex-grow: 1; border-radius: 16px; padding: 32px; text-align: center; cursor: pointer; background: linear-gradient(180deg, #f8fbff 0%, #f0f6ff 100%); overflow: hidden; border: 1px solid #e1ecfb; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; box-shadow: inset 0 0 20px rgba(255,255,255,0.5);"
                    onclick="document.getElementById('cf-archivo').click()">

                    <!-- Tech border accents -->
                    <div
                      style="position: absolute; top: 10px; left: 10px; width: 30px; height: 30px; border-top: 2px solid #bcd4fc; border-left: 2px solid #bcd4fc; border-radius: 10px 0 0 0;">
                    </div>
                    <div
                      style="position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-top: 2px solid #bcd4fc; border-right: 2px solid #bcd4fc; border-radius: 0 10px 0 0;">
                    </div>
                    <div
                      style="position: absolute; bottom: 10px; left: 10px; width: 30px; height: 30px; border-bottom: 2px solid #bcd4fc; border-left: 2px solid #bcd4fc; border-radius: 0 0 0 10px;">
                    </div>
                    <div
                      style="position: absolute; bottom: 10px; right: 10px; width: 30px; height: 30px; border-bottom: 2px solid #bcd4fc; border-right: 2px solid #bcd4fc; border-radius: 0 0 10px 0;">
                    </div>

                    <!-- Tech Background details -->
                    <svg
                      style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.05;"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0 50 L 50 50 L 70 30 L 100 30" stroke="#1B60DF" stroke-width="2" fill="none" />
                      <path d="M 100% 150 L 90% 150 L 85% 170 L 70% 170" stroke="#1B60DF" stroke-width="2"
                        fill="none" />
                      <path d="M 0 250 L 30 250 L 50 230 L 80 230" stroke="#1B60DF" stroke-width="2" fill="none" />
                      <circle cx="100" cy="30" r="3" fill="#1B60DF" />
                      <circle cx="70%" cy="170" r="3" fill="#1B60DF" />
                      <circle cx="80" cy="230" r="3" fill="#1B60DF" />
                    </svg>

                    <div id="dropContent" style="position: relative; z-index: 2; width: 100%;">
                      <!-- AI Document Icon -->
                      <div
                        style="margin: 0 auto 16px; width: 64px; height: 64px; background: linear-gradient(135deg, #ffffff, #f0f6ff); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 16px 32px rgba(27,96,223,0.15), inset 0 2px 4px rgba(255,255,255,1); border: 2px solid #fff; position: relative;">
                        <!-- Rings -->
                        <div
                          style="position: absolute; inset: -10px; border-radius: 50%; border: 1px solid rgba(27,96,223,0.1); transform: rotateX(60deg);">
                        </div>
                        <div
                          style="position: absolute; inset: -18px; border-radius: 50%; border: 1px dashed rgba(27,96,223,0.2); transform: rotateX(60deg) rotate(45deg);">
                        </div>

                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B60DF" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 15v-4" />
                          <path d="M12 15h3" />
                        </svg>
                      </div>

                      <h4
                        style="font-family:'Sora',sans-serif;font-size:15px;font-weight:700;color:#111827;margin:0 0 6px;">
                        Arrastra tu artículo aquí</h4>
                      <p style="color:#6b7280;font-size:12px;margin:0 0 16px;">o haz clic para seleccionar</p>

                      <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
                        <span
                          style="display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #374151; background: #fff; padding: 4px 10px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                          <div
                            style="background:#ef4444;color:#fff;border-radius:4px;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;">
                            PDF</div> PDF
                        </span>
                        <span
                          style="display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: #374151; background: #fff; padding: 4px 10px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                          <div
                            style="background:#2563eb;color:#fff;border-radius:4px;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;">
                            W</div> DOCX
                        </span>
                      </div>
                      <p style="color:#9ca3af;font-size:11px;margin:0;font-weight:500;">Tamaño máximo: 15 MB</p>
                    </div>

                    <!-- Simulating upload state (hidden initially, matches exactly the requested image) -->
                    <div id="fileInfo" style="display: none; position: relative; z-index: 2; width: 100%;">
                      <div
                        style="background: #fff; border-radius: 12px; padding: 16px; border: 1px solid #e1ecfb; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 8px 16px rgba(27,96,223,0.06);">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="file-badge-icon"
                              style="width: 28px; height: 28px; background: #2563eb; color: #fff; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px;">
                              W</div>
                            <span id="fileName"
                              style="font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;">mi_articulo_final.docx</span>
                          </div>
                          <div style="display: flex; align-items: center; gap: 12px;">
                            <span id="fileSize" style="font-size:12px;color:#6b7280;font-weight:500;">12.4 MB</span>
                            <div
                              style="background:#22c55e;color:#fff;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <!-- Progress bar -->
                        <div
                          style="height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; width: 100%; display: flex;">
                          <div style="width: 100%; height: 100%; background: #22c55e; border-radius: 3px;"></div>
                        </div>
                        <div style="text-align: center; font-size: 11px; color: #22c55e; font-weight: 700;">100%
                          Completado</div>
                      </div>
                    </div>

                    <input type="file" id="cf-archivo" name="documento"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      style="position:absolute;inset:0;opacity:0;width:100%;height:100%;cursor:pointer;">
                  </div>

                </div>
              </div>

              <!-- BOTTOM SECTION: SUBMIT BUTTON & PRIVACY -->
              <div style="margin-top: 0;">

                <!-- Checkbox de Privacidad -->
                <label
                  style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px; cursor: pointer; padding: 12px; background: #f8fbff; border: 1px solid #e1ecfb; border-radius: 10px; transition: all 0.2s;"
                  onmouseover="this.style.background='#f0f6ff';this.style.borderColor='#bcd4fc';"
                  onmouseout="this.style.background='#f8fbff';this.style.borderColor='#e1ecfb';">
                  <input type="checkbox" required name="terminos" id="aceptoTerminos"
                    style="width: 16px; height: 16px; margin-top: 2px; accent-color: #1B60DF; cursor: pointer;">
                  <span
                    style="font-family: 'Inter', sans-serif; font-size: 12px; color: #4b5563; line-height: 1.4; user-select: none;">
                    He leído y acepto la <a href="javascript:void(0)" onclick="openPrivacyModal(event)"
                      style="color: #1B60DF; font-weight: 600; text-decoration: none;"
                      onmouseover="this.style.textDecoration='underline'"
                      onmouseout="this.style.textDecoration='none'">Política de Privacidad</a> y autorizo el tratamiento de mis datos para realizar el análisis solicitado.
                  </span>
                </label>

                <button id="submitBtn" type="submit"
                  style="width: 100%; padding: 14px; background: linear-gradient(90deg, #1652cf, #1B60DF, #2374ff); border: none; border-radius: 10px; color: #fff; font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 12px 24px rgba(27,96,223,0.3); transition: transform 0.2s, box-shadow 0.2s, background 0.4s; position: relative; overflow: hidden;"
                  onmouseover="if(!this.disabled){this.style.transform='translateY(-2px)';this.style.boxShadow='0 16px 32px rgba(27,96,223,0.4)';}" 
                  onmouseout="if(!this.disabled){this.style.transform='translateY(0)';this.style.boxShadow='0 12px 24px rgba(27,96,223,0.3)';}"> 
                  <!-- Spinner (oculto por defecto) -->
                  <span id="submitSpinner" style="display:none; width:18px; height:18px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spinBtn 0.7s linear infinite; flex-shrink:0;"></span>
                  <!-- Icono enviar -->
                  <svg id="submitIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    style="transform: rotate(45deg); margin-top:-2px; flex-shrink:0;">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span id="submitText">Enviar Artículo</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>

    <script>
      /* ── Animación spinner del botón ── */
      const btnStyle = document.createElement('style');
      btnStyle.textContent = \`
        @keyframes spinBtn { to { transform: rotate(360deg); } }
        @keyframes successPulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 12px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 30; }
          to   { stroke-dashoffset: 0; }
        }
        #submitBtn.state-loading { cursor: wait !important; background: linear-gradient(90deg,#1652cf,#1B60DF,#2374ff) !important; }
        #submitBtn.state-success { background: #16a34a !important; box-shadow: 0 12px 24px rgba(22,163,74,0.35) !important; animation: successPulse 0.6s ease-out; }
        #submitBtn.state-error   { background: #dc2626 !important; box-shadow: 0 12px 24px rgba(220,38,38,0.3) !important; }
      \`;
      document.head.appendChild(btnStyle);

      const dropZone = document.getElementById('dropZone');
      const fileInput = document.getElementById('cf-archivo');

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
      });

      function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
      }

      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
          dropZone.style.background = 'linear-gradient(180deg, #f0f6ff 0%, #e1ecfb 100%)';
          dropZone.style.borderColor = '#1B60DF';
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
          dropZone.style.background = 'linear-gradient(180deg, #f8fbff 0%, #f0f6ff 100%)';
          dropZone.style.borderColor = '#e1ecfb';
        }, false);
      });

      dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
          fileInput.files = files; // Assign files to the hidden input
          handleFile(files[0]);
        }
      }, false);

      fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
          handleFile(this.files[0]);
        }
      });

      function handleFile(file) {
        if (file.size > 15 * 1024 * 1024) {
          alert(\`Tu archivo pesa \${(file.size / (1024 * 1024)).toFixed(1)} MB. Por favor comprímelo para que pese máximo 15 MB.\`);
          document.getElementById('cf-archivo').value = ""; // Limpiar el input
          return;
        }

        const dropContent = document.getElementById('dropContent');
        const fileInfo = document.getElementById('fileInfo');
        const fileNameSpan = document.getElementById('fileName');

        dropContent.style.display = 'none';
        fileInfo.style.display = 'block';
        fileNameSpan.textContent = file.name;

        // Calculate size
        let size = file.size;
        let sizeStr = '';
        if (size > 1024 * 1024) {
          sizeStr = (size / (1024 * 1024)).toFixed(1) + ' MB';
        } else if (size > 1024) {
          sizeStr = (size / 1024).toFixed(1) + ' KB';
        } else {
          sizeStr = size + ' B';
        }

        // Find the elements to update size and icon
        const sizeSpan = document.getElementById('fileSize');
        if (sizeSpan) sizeSpan.textContent = sizeStr;

        const iconDiv = fileInfo.querySelector('.file-badge-icon');

        if (iconDiv) {
          if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
            iconDiv.style.background = '#ef4444';
            iconDiv.textContent = 'PDF';
            iconDiv.style.fontSize = '9px';
          } else {
            iconDiv.style.background = '#2563eb';
            iconDiv.textContent = 'W';
            iconDiv.style.fontSize = '12px';
          }
        }

        dropZone.style.background = '#ffffff';
        dropZone.style.borderColor = '#1B60DF';
      }

      // Interceptar envío del formulario
      const contactForm = document.getElementById('contactForm');
      const submitBtn = document.getElementById('submitBtn');
      const submitText = document.getElementById('submitText');
      const submitIcon = document.getElementById('submitIcon');

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Verificar que haya un archivo adjunto
        if (!fileInput.files || fileInput.files.length === 0) {
          alert('Por favor, adjunta tu artículo científico antes de enviar.');
          return;
        }

        const formData = new FormData(contactForm);

        // Validaciones manuales para los radio buttons (ya que están ocultos visualmente)
        if (!formData.get('estado_articulo')) {
          alert('Por favor, selecciona el Estado del artículo.');
          return;
        }
        if (!formData.get('que_buscas')) {
          alert('Por favor, selecciona Qué buscas (Revista, Conferencia, etc.).');
          return;
        }
        if (!formData.get('indexacion')) {
          alert('Por favor, selecciona Qué indexación buscas.');
          return;
        }

        // ── Estado: CARGANDO ──
        submitBtn.disabled = true;
        submitBtn.className = 'state-loading';
        submitBtn.style.transform = 'none';
        submitSpinner.style.display = 'block';
        submitIcon.style.display = 'none';
        submitText.textContent = 'Enviando...';

        try {
          const response = await fetch('/api/enviar-articulo', {
            method: 'POST',
            body: formData
          });

          const result = await response.json();

          if (response.ok) {
            // ── Estado: ÉXITO ──
            submitBtn.className = 'state-success';
            submitSpinner.style.display = 'none';
            submitIcon.style.display = 'block';
            submitIcon.style.transform = 'none';
            submitIcon.innerHTML = \`<polyline points="20 6 9 17 4 12" stroke-dasharray="30" stroke-dashoffset="30"
              style="animation:checkDraw 0.4s ease-out 0.05s forwards;"/>\`;
            submitText.textContent = 'Artículo enviado';

            setTimeout(() => {
              contactForm.reset();
              document.getElementById('dropContent').style.display = 'block';
              document.getElementById('fileInfo').style.display = 'none';
              resetButton();
            }, 4000);
          } else {
            // ── Estado: ERROR ──
            submitBtn.className = 'state-error';
            submitSpinner.style.display = 'none';
            submitIcon.style.display = 'block';
            submitIcon.style.transform = 'none';
            submitIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
            submitText.textContent = result.error || 'Error al enviar';
            setTimeout(resetButton, 3500);
          }
        } catch (error) {
          console.error(error);
          submitBtn.className = 'state-error';
          submitSpinner.style.display = 'none';
          submitIcon.style.display = 'block';
          submitIcon.style.transform = 'none';
          submitIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
          submitText.textContent = 'Sin conexión con el servidor';
          setTimeout(resetButton, 3500);
        }
      });

      const submitSpinner = document.getElementById('submitSpinner');

      function resetButton() {
        submitBtn.disabled = false;
        submitBtn.className = '';
        submitBtn.style.cssText = 'width:100%;padding:14px;background:linear-gradient(90deg,#1652cf,#1B60DF,#2374ff);border:none;border-radius:10px;color:#fff;font-family:Sora,sans-serif;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 12px 24px rgba(27,96,223,0.3);transition:transform 0.2s,box-shadow 0.2s,background 0.4s;position:relative;overflow:hidden;';
        submitSpinner.style.display = 'none';
        submitIcon.style.display = 'block';
        submitIcon.style.transform = 'rotate(45deg)';
        submitIcon.innerHTML = '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>';
        submitText.textContent = 'Enviar Artículo';
      }
      // Lógica del Modal de Privacidad
      function openPrivacyModal(e) {
        if (e) e.preventDefault();
        document.getElementById('privacyModal').classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      
      function closePrivacyModal() {
        document.getElementById('privacyModal').classList.remove('active');
        document.body.style.overflow = '';
      }

      function acceptPrivacyFromModal() {
        document.getElementById('aceptoTerminos').checked = true;
        closePrivacyModal();
      }
      
      // Cerrar modal al clickear afuera
      document.getElementById('privacyModal').addEventListener('click', function(e) {
        if(e.target === this) {
          closePrivacyModal();
        }
      });

    </script>

    <!-- Modal de Privacidad -->
    <div class="privacy-modal-overlay" id="privacyModal">
      <div class="privacy-modal-content">
        <div class="privacy-modal-header">
          <h2 class="privacy-modal-title">Política de Privacidad</h2>
          <div class="privacy-modal-actions">
            <button class="btn-close-modal" onclick="closePrivacyModal()" aria-label="Cerrar modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        <div class="privacy-modal-body" id="privacyModalBody">
          <p>En Fynit respetamos la privacidad de nuestros usuarios y la confidencialidad de sus investigaciones. Esta Política explica de forma sencilla qué información recopilamos, para qué la utilizamos y cómo la protegemos.</p>
          
          <h2>1. ¿Quién es responsable de tus datos?</h2>
          <p>Fynit es un producto operado por:</p>
          <p><b>FYGRAD S.A.C.</b><br>RUC N.° 20615739678<br>Correo de contacto: <b>hola@fynit.app</b></p>
          <p>FYGRAD S.A.C. es responsable del tratamiento de los datos personales recopilados mediante Fynit.<br>Banco de datos personales: <b>Usuarios Fynit</b>.</p>
          
          <h2>2. ¿Qué información recopilamos?</h2>
          <p>Podemos recopilar:</p>
          <ul>
            <li>nombres y apellidos;</li>
            <li>correo electrónico;</li>
            <li>información proporcionada mediante nuestros formularios;</li>
            <li>manuscritos, artículos científicos y archivos enviados voluntariamente;</li>
            <li>información académica incluida en dichos documentos;</li>
            <li>respuestas, preferencias y comentarios sobre el servicio;</li>
            <li>información técnica básica necesaria para el funcionamiento y seguridad de la plataforma.</li>
          </ul>
          <p>Solicitamos únicamente la información razonablemente necesaria para prestar nuestros servicios.</p>

          <h2>3. ¿Para qué utilizamos tu información?</h2>
          <p>Utilizamos tus datos principalmente para:</p>
          <ul>
            <li>analizar el manuscrito que nos envías;</li>
            <li>identificar revistas, conferencias u otras rutas de publicación compatibles;</li>
            <li>elaborar y enviarte recomendaciones o reportes;</li>
            <li>comunicarnos contigo respecto del análisis solicitado;</li>
            <li>evaluar y mejorar el funcionamiento de Fynit;</li>
            <li>prevenir fraude, usos indebidos o incidentes de seguridad; y</li>
            <li>cumplir obligaciones legales o requerimientos de autoridades competentes.</li>
          </ul>
          <p>Las comunicaciones comerciales o promocionales se enviarán únicamente cuando corresponda y podrás dejar de recibirlas en cualquier momento.</p>

          <h2>4. Confidencialidad y propiedad de tu investigación</h2>
          <p><b>Tu investigación continúa siendo tuya.</b></p>
          <p>Al cargar un manuscrito en Fynit <b>no transfieres ni cedes derechos de autor, propiedad intelectual, resultados, metodologías, datos ni derechos sobre tu investigación.</b></p>
          <p>Fynit recibe únicamente una autorización limitada para procesar el documento con la finalidad de realizar el análisis solicitado.</p>
          <p>No vendemos, publicamos ni comercializamos los manuscritos enviados por nuestros usuarios.</p>
          <p>El usuario declara que cuenta con los derechos, permisos o autorizaciones necesarios para proporcionar el documento y la información que contiene, incluyendo, cuando corresponda, información perteneciente a coautores o terceros.</p>

          <h2>5. Uso de inteligencia artificial y proveedores tecnológicos</h2>
          <p>Fynit puede utilizar herramientas tecnológicas para apoyar el procesamiento y análisis de los documentos, incluyendo servicios de inteligencia artificial.</p>
          <p>Durante la etapa actual de validación, Fynit aplica medidas orientadas a reducir la exposición de información:</p>
          <ul>
            <li>minimización o anonimización de información cuando sea posible; y</li>
            <li>acceso limitado al personal autorizado.</li>
          </ul>
          <p>El procesamiento mediante proveedores tecnológicos puede implicar que determinada información sea procesada en servidores ubicados fuera del país del usuario, incluyendo Estados Unidos u otras jurisdicciones.</p>
          <p>Fynit procurará que dichos tratamientos se realicen únicamente para las finalidades informadas y de acuerdo con la legislación aplicable.</p>

          <h2>6. ¿Quién puede acceder a tu información?</h2>
          <p>El acceso podrá limitarse a:</p>
          <ul>
            <li>personal autorizado de FYGRAD S.A.C./Fynit;</li>
            <li>colaboradores sujetos a obligaciones de confidencialidad;</li>
            <li>proveedores tecnológicos necesarios para prestar el servicio; y</li>
            <li>autoridades públicas cuando exista una obligación legal válida.</li>
          </ul>
          <p>Fynit <b>no vende datos personales a terceros.</b></p>
          <p>También podremos comunicar información cuando resulte razonablemente necesario para proteger nuestros derechos, prevenir fraude, atender incidentes de seguridad o cumplir una obligación legal.</p>

          <h2>7. ¿Cuánto tiempo conservamos la información?</h2>
          <p>Como política general:</p>
          <ul>
            <li><b>Manuscrito y análisis:</b> hasta 30 días después de la entrega del resultado, salvo que el usuario solicite su eliminación antes o exista una obligación legal que requiera conservarlos.</li>
            <li><b>Datos de contacto y registro del consentimiento:</b> hasta 24 meses desde la última interacción, salvo obligación legal de conservación por un plazo diferente.</li>
            <li><b>Datos para comunicaciones comerciales:</b> hasta que el usuario retire su consentimiento.</li>
          </ul>
          <p>Podremos conservar estadísticas agregadas o información debidamente anonimizada cuando ya no sea razonablemente posible identificar al usuario o reconstruir su manuscrito.</p>

          <h2>8. Seguridad</h2>
          <p>Aplicamos medidas técnicas, organizativas y de acceso razonables para proteger la información frente a pérdida, alteración, acceso no autorizado o divulgación indebida. Adoptando medidas razonables para prevenirlos, detectarlos y responder ante ellos.</p>

          <h2>9. Tus derechos</h2>
          <p>Dependiendo de la legislación aplicable, puedes solicitar:</p>
          <ul>
            <li>acceso a tus datos;</li>
            <li>corrección o actualización;</li>
            <li>eliminación o supresión;</li>
            <li>oposición o limitación del tratamiento;</li>
            <li>portabilidad, cuando corresponda;</li>
            <li>información sobre el tratamiento realizado; o</li>
            <li>revocación del consentimiento.</li>
          </ul>
          <p>Puedes realizar tu solicitud gratuitamente escribiendo a <b>hola@fynit.app</b>.</p>
          <p>Fynit atenderá las solicitudes dentro de los plazos establecidos por la legislación aplicable.</p>
          <p>También podrás acudir ante la autoridad de protección de datos competente de tu país cuando consideres que tus derechos no han sido atendidos adecuadamente.</p>

          <h2>10. Usuarios de distintos países</h2>
          <p>FYGRAD S.A.C. se encuentra constituida en Perú y esta Política se interpreta principalmente conforme a la <b>Ley N.° 29733, Ley de Protección de Datos Personales, y su normativa vigente.</b></p>
          <p>Cuando Fynit preste servicios a usuarios de otros países, también respetará las disposiciones obligatorias de protección de datos que resulten aplicables en la jurisdicción correspondiente.</p>
          <p>Si una disposición de esta Política entra en conflicto con una norma imperativa aplicable al usuario, prevalecerá dicha norma respecto de ese tratamiento.</p>

          <h2>11. Cambios a esta Política</h2>
          <p>Fynit podrá actualizar esta Política para reflejar cambios legales, tecnológicos, operativos o en nuestros servicios.</p>
          <p>La versión vigente estará disponible permanentemente en nuestra plataforma indicando su fecha de última actualización.</p>
          
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            <b>FYNIT</b><br>
            Producto operado por <b>FYGRAD S.A.C.</b><br>
            RUC N.° 20615739678<br>
            <b>hola@fynit.app</b><br><br>
            © 2026 FYGRAD S.A.C. Todos los derechos reservados.
          </p>
        </div>
        <div class="privacy-modal-footer" style="padding: 16px 24px; border-top: 1px solid #f3f4f6; display: flex; justify-content: flex-end; align-items: center; gap: 12px; background: #fff; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
          <a href="assets/Politica_de_Privacidad_Fynit.pdf" target="_blank" rel="noopener" download="Politica_de_Privacidad_Fynit.pdf" class="btn-download-pdf" style="background: #f3f4f6; color: #4b5563; font-size: 14px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Descargar PDF
          </a>
          <button onclick="acceptPrivacyFromModal()" style="padding: 10px 24px; background: #1B60DF; color: #fff; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#1652cf'" onmouseout="this.style.background='#1B60DF'">
            Aceptar
          </button>
        </div>
      </div>
    </div>

  ` }} />
  );
}
