
'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Page() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === 'dark';
  const cardBg = isDark ? '#071742' : '#fff';
  const softBg = isDark ? '#0B1425' : '#f8fbff';
  const softBgHover = isDark ? '#101B2E' : '#f0f6ff';
  const textColor = isDark ? '#fff' : '#111827';
  const textMuted = isDark ? '#A3B5D1' : '#6b7280';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#e1ecfb';
  const borderHover = isDark ? 'rgba(255,255,255,0.2)' : '#bcd4fc';
  const containerRef = useRef(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitState, setSubmitState] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > 15 * 1024 * 1024) {
      alert("Tu archivo pesa " + (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB. Por favor comprímelo para que pese máximo 15 MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor, adjunta tu artículo científico antes de enviar.');
      return;
    }

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    
    // Validaciones
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
    
    // Add file explicitly since controlled by state maybe? 
    // Actually the file is in the input, but we can append it if not.
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
       // it's already in formData under "documento"
    } else {
       formData.set('documento', file);
    }

    setSubmitState('loading');
    setUploadProgress(0);
    
    // Simular progreso de subida realista (llega rápido a 85-90% y espera al backend)
    let currentProg = 0;
    const progressInterval = setInterval(() => {
      currentProg += Math.random() * 15;
      if (currentProg > 92) currentProg = 92;
      setUploadProgress(Math.floor(currentProg));
    }, 200);
    
    try {
      const response = await fetch('/api/enviar-articulo', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      clearInterval(progressInterval);
      
      if (response.ok) {
        setUploadProgress(100);
        setSubmitState('success');
        setTimeout(() => {
          if (formRef.current) formRef.current.reset();
          setFile(null);
          setSubmitState('idle');
          setUploadProgress(0);
        }, 4000);
      } else {
        setSubmitState('error');
        setErrorMsg(result.error || 'Error al enviar');
        setTimeout(() => setSubmitState('idle'), 3500);
      }
    } catch (error) {
      clearInterval(progressInterval);
      setSubmitState('error');
      setErrorMsg('Sin conexión con el servidor');
      setTimeout(() => setSubmitState('idle'), 3500);
    }
  };


  return (
    <div ref={containerRef}>


    {/*  ============ CONTACTO NUEVO LAYOUT ============  */}
    
    <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spinBtn { to { transform: rotate(360deg); } }
        @keyframes successPulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 16px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @keyframes checkDraw {
          0%   { stroke-dashoffset: 40; opacity: 0; transform: scale(0.5); }
          50%  { opacity: 1; transform: scale(1.2); }
          100% { stroke-dashoffset: 0; opacity: 1; transform: scale(1); }
        }
        .state-loading { cursor: wait !important; background: #0B1425 !important; border: 1px solid rgba(27,96,223,0.3) !important; color: #fff !important; }
        .state-success { background: #16a34a !important; color: #fff !important; border-color: #16a34a !important; box-shadow: 0 12px 24px rgba(22,163,74,0.35) !important; animation: successPulse 0.8s ease-out; }
        .state-error   { background: #dc2626 !important; color: #fff !important; border-color: #dc2626 !important; box-shadow: 0 12px 24px rgba(220,38,38,0.3) !important; }
        
        .progress-bar-bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, #1652cf, #2374ff);
          transition: width 0.3s ease-out;
          z-index: 0;
        }
    `}} />
    
    <section className="contact-hero-section">

      {/*  Network Background Decoration (Optional subtle nodes)  */}
      <div className="contact-hero-bg">
      </div>

      <div className="container" style={{ position: 'relative', zIndex: '2' }}>

        {/*  HEADER  */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{ fontFamily: '\'Sora\',sans-serif', fontSize: '11px', fontWeight: '700', color: '#1B60DF', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '24px', height: '2px', background: '#1B60DF' }}></span> EVALUAR <span
              style={{ width: '24px', height: '2px', background: 'transparent' }}></span>
          </span>
          <h1
            style={{ fontFamily: '\'Sora\',sans-serif', fontSize: '32px', fontWeight: '700', color: textColor, margin: '12px 0 16px', letterSpacing: '-0.02em' }}>
            Hablemos de tu investigación</h1>
          <p style={{ color: textMuted, fontSize: '15px', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }}>Envíanos tu artículo
            científico para un diagnóstico inicial rápido<br />y personalizado sobre su potencial editorial.</p>
        </div>

        {/*  MAIN FORM CARD WRAPPER  */}
        <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto' }}>

          {/*  MASCOTA FLOTANTE  */}
          <img src="assets/imgs png/fynit-contacto.webp" className="mascota-flotante" alt="Mascota Fynit" />
          <div className="contact-form-card">



            <form id="contactForm" ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Honeypot field - Invisible for humans, tempting for bots */}
              <input type="text" name="telefono_secundario" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: cardBg, padding: '40px', borderRadius: '24px', boxShadow: isDark ? '0 12px 40px rgba(0,0,0,0.5)' : '0 12px 40px rgba(27,96,223,0.08)', position: 'relative', zIndex: '2' }}>

                {/*  LEFT COLUMN: TUS DATOS  */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                  {/*  Title  */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div
                      style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B60DF' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <h3
                      style={{ fontFamily: '\'Sora\',sans-serif', fontSize: '11px', fontWeight: '700', color: '#1B60DF', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0' }}>
                      TUS DATOS</h3>
                  </div>

                  {/*  Input Apellidos  */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      style={{ display: 'block', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', fontWeight: '600', color: textColor, marginBottom: '6px' }}>Apellidos</label>
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <input type="text" name="apellidos" required placeholder="Tus apellidos"
                        style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #f3f4f6', background: softBg, borderRadius: '10px', padding: '12px 12px 12px 42px', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', color: textColor, outline: 'none', transition: 'all 0.2s' }}
                        onFocus={(event) => { event.currentTarget.style.borderColor='#1B60DF';event.currentTarget.style.background=isDark ? '#101B2E' : '#fff';event.currentTarget.style.boxShadow='0 0 0 4px rgba(27,96,223,0.1)'; }}
                        onBlur={(event) => { event.currentTarget.style.borderColor='#f3f4f6';event.currentTarget.style.background=softBg;event.currentTarget.style.boxShadow='none'; }} />
                    </div>
                  </div>

                  {/*  Input Nombres  */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      style={{ display: 'block', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', fontWeight: '600', color: textColor, marginBottom: '6px' }}>Nombres</label>
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <input type="text" name="nombres" placeholder="Tus nombres" required
                        style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #f3f4f6', background: softBg, borderRadius: '10px', padding: '12px 12px 12px 42px', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', color: textColor, outline: 'none', transition: 'all 0.2s' }}
                        onFocus={(event) => { event.currentTarget.style.borderColor='#1B60DF';event.currentTarget.style.background=isDark ? '#101B2E' : '#fff';event.currentTarget.style.boxShadow='0 0 0 4px rgba(27,96,223,0.1)'; }}
                        onBlur={(event) => { event.currentTarget.style.borderColor='#f3f4f6';event.currentTarget.style.background=softBg;event.currentTarget.style.boxShadow='none'; }} />
                    </div>
                  </div>

                  {/*  Input Correo  */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      style={{ display: 'block', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', fontWeight: '600', color: textColor, marginBottom: '6px' }}>Correo
                      electrónico </label>
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <input type="email" name="email" placeholder="tu@correo.com" required
                        style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #f3f4f6', background: softBg, borderRadius: '10px', padding: '12px 12px 12px 42px', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', color: textColor, outline: 'none', transition: 'all 0.2s' }}
                        onFocus={(event) => { event.currentTarget.style.borderColor='#1B60DF';event.currentTarget.style.background=isDark ? '#101B2E' : '#fff';event.currentTarget.style.boxShadow='0 0 0 4px rgba(27,96,223,0.1)'; }}
                        onBlur={(event) => { event.currentTarget.style.borderColor='#f3f4f6';event.currentTarget.style.background=softBg;event.currentTarget.style.boxShadow='none'; }} />
                    </div>
                  </div>

                  {/*  Estado del artículo  */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', fontWeight: '600', color: textColor, marginBottom: '6px' }}>Estado del artículo</label>
                    <div className="custom-radio-group grid-4">
                      <label>
                        <input type="radio" name="estado_articulo" value="borrador" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          </div>
                          <span className="custom-radio-text">Borrador</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="estado_articulo" value="terminado" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15l2 2 4-4"></path></svg>
                          </div>
                          <span className="custom-radio-text">Terminado</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="estado_articulo" value="enviado" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          </div>
                          <span className="custom-radio-text">Ya fue enviado</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="estado_articulo" value="rechazado" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          </div>
                          <span className="custom-radio-text" style={{ fontSize: '10px' }}>Fue rechazado</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/*  ¿Qué buscas?  */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', fontWeight: '600', color: textColor, marginBottom: '6px' }}>¿Qué buscas?</label>
                    <div className="custom-radio-group grid-3">
                      <label>
                        <input type="radio" name="que_buscas" value="revista" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                          </div>
                          <span className="custom-radio-text">Revista</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="que_buscas" value="conferencia" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                          </div>
                          <span className="custom-radio-text">Conferencia</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="que_buscas" value="no_seguro" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                          </div>
                          <span className="custom-radio-text">No estoy seguro</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/*  ¿Qué indexación buscas?  */}
                  <div style={{ marginBottom: 'auto' }}>
                    <label style={{ display: 'block', fontFamily: '\'Inter\',sans-serif', fontSize: '13px', fontWeight: '600', color: textColor, marginBottom: '6px' }}>¿Qué indexación buscas?</label>
                    <div className="custom-radio-group grid-4">
                      <label>
                        <input type="radio" name="indexacion" value="scopus" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon icon-scopus">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" stroke="none" fill="currentColor">SC</text></svg>
                          </div>
                          <span className="custom-radio-text">Scopus</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="indexacion" value="wos" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon icon-wos">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10"></circle><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">W</text></svg>
                          </div>
                          <span className="custom-radio-text">WoS</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="indexacion" value="scielo" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon icon-scielo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                          </div>
                          <span className="custom-radio-text">SciELO</span>
                        </div>
                      </label>
                      <label>
                        <input type="radio" name="indexacion" value="no_claro" className="custom-radio-input" />
                        <div className="custom-radio-label">
                          <div className="custom-radio-icon icon-notengo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                          </div>
                          <span className="custom-radio-text" style={{ fontSize: '10px' }}>No lo tengo claro</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/*  Tu Investigación es confidencial info box  */}
                  <div style={{ background: softBg, borderRadius: '10px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '8px', border: `1px solid ${borderColor}` }}>
                    <div style={{ color: '#1B60DF', flexShrink: '0' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily: '\'Sora\',sans-serif', fontSize: '12px', fontWeight: '700', color: textColor, margin: '0 0 4px' }}>Tu Investigación es confidencial</h4>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', color: textMuted, lineHeight: '1.4' }}>Usamos tu documento únicamente para realizar el análisis solicitado.<br />No publicamos ni adquirimos derechos sobre tu investigación.</p>
                      <p style={{ margin: '0', fontSize: '11px', color: textMuted, lineHeight: '1.4' }}>Consulta nuestra <Link href="javascript:void(0)" onClick={(event) => { setIsModalOpen(true) }} style={{ color: '#1B60DF', fontWeight: '600', textDecoration: 'none' }}>política de privacidad</Link>.</p>
                    </div>
                  </div>

                </div>

                {/*  RIGHT COLUMN: TU ARTICULO CIENTIFICO  */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                  {/*  Title  */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div
                      style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B60DF' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <line x1="10" x2="8" y1="9" y2="9" />
                      </svg>
                    </div>
                    <h3
                      style={{ fontFamily: '\'Sora\',sans-serif', fontSize: '11px', fontWeight: '700', color: '#1B60DF', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0' }}>
                      TU ARTÍCULO CIENTÍFICO</h3>
                  </div>

                  {/*  DROP ZONE  */}
                  <div id="dropZone"
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={handleDrop}
                    style={{ position: 'relative', flexGrow: '1', borderRadius: '16px', padding: '32px', textAlign: 'center', cursor: 'pointer', background: isDragging ? 'linear-gradient(180deg, #f0f6ff 0%, #e1ecfb 100%)' : softBg, overflow: 'hidden', border: isDragging ? '1px solid #1B60DF' : `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', boxShadow: isDark ? 'inset 0 0 20px rgba(0,0,0,0.2)' : 'inset 0 0 20px rgba(255,255,255,0.5)' }}
                    onClick={() => { if(fileInputRef.current) fileInputRef.current.click() }}>

                    {/*  Tech border accents  */}
                    <div
                      style={{ position: 'absolute', top: '10px', left: '10px', width: '30px', height: '30px', borderTop: '2px solid #bcd4fc', borderLeft: '2px solid #bcd4fc', borderRadius: '10px 0 0 0' }}>
                    </div>
                    <div
                      style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderTop: '2px solid #bcd4fc', borderRight: '2px solid #bcd4fc', borderRadius: '0 10px 0 0' }}>
                    </div>
                    <div
                      style={{ position: 'absolute', bottom: '10px', left: '10px', width: '30px', height: '30px', borderBottom: '2px solid #bcd4fc', borderLeft: '2px solid #bcd4fc', borderRadius: '0 0 0 10px' }}>
                    </div>
                    <div
                      style={{ position: 'absolute', bottom: '10px', right: '10px', width: '30px', height: '30px', borderBottom: '2px solid #bcd4fc', borderRight: '2px solid #bcd4fc', borderRadius: '0 0 10px 0' }}>
                    </div>

                    {/*  Tech Background details  */}
                    <svg
                      style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', opacity: '0.05' }}
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0 50 L 50 50 L 70 30 L 100 30" stroke="#1B60DF" strokeWidth="2" fill="none" />
                      <path d="M 100% 150 L 90% 150 L 85% 170 L 70% 170" stroke="#1B60DF" strokeWidth="2"
                        fill="none" />
                      <path d="M 0 250 L 30 250 L 50 230 L 80 230" stroke="#1B60DF" strokeWidth="2" fill="none" />
                      <circle cx="100" cy="30" r="3" fill="#1B60DF" />
                      <circle cx="70%" cy="170" r="3" fill="#1B60DF" />
                      <circle cx="80" cy="230" r="3" fill="#1B60DF" />
                    </svg>

                    {!file && (<div id="dropContent" style={{ position: 'relative', zIndex: '2', width: '100%' }}>
                      {/*  AI Document Icon  */}
                      <div
                        style={{ margin: '0 auto 16px', width: '64px', height: '64px', background: isDark ? '#101B2E' : 'linear-gradient(135deg, #ffffff, #f0f6ff)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 32px rgba(27,96,223,0.15), inset 0 2px 4px rgba(255,255,255,1)', border: '2px solid #fff', position: 'relative' }}>
                        {/*  Rings  */}
                        <div
                          style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', border: '1px solid rgba(27,96,223,0.1)', transform: 'rotateX(60deg)' }}>
                        </div>
                        <div
                          style={{ position: 'absolute', inset: '-18px', borderRadius: '50%', border: '1px dashed rgba(27,96,223,0.2)', transform: 'rotateX(60deg) rotate(45deg)' }}>
                        </div>

                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B60DF" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 15v-4" />
                          <path d="M12 15h3" />
                        </svg>
                      </div>

                      <h4
                        style={{ fontFamily: '\'Sora\',sans-serif', fontSize: '15px', fontWeight: '700', color: textColor, margin: '0 0 6px' }}>
                        Arrastra tu artículo aquí</h4>
                      <p style={{ color: textMuted, fontSize: '12px', margin: '0 0 16px' }}>o haz clic para seleccionar</p>

                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
                        <span
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: '700', color: textColor, background: cardBg, padding: '4px 10px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                          <div
                            style={{ background: '#ef4444', color: '#fff', borderRadius: '4px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>
                            PDF</div> PDF
                        </span>
                        <span
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: '700', color: textColor, background: cardBg, padding: '4px 10px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                          <div
                            style={{ background: '#2563eb', color: '#fff', borderRadius: '4px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>
                            W</div> DOCX
                        </span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '11px', margin: '0', fontWeight: '500' }}>Tamaño máximo: 15 MB</p>
                    </div>)}

                    {file && (<div id="fileInfo" style={{ display: 'block', position: 'relative', zIndex: '2', width: '100%' }}>
                      <div
                        style={{ background: cardBg, borderRadius: '12px', padding: '16px', border: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: isDark ? '0 8px 16px rgba(0,0,0,0.2)' : '0 8px 16px rgba(27,96,223,0.06)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="file-badge-icon"
                              style={{ width: '28px', height: '28px', background: (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') ? '#ef4444' : '#2563eb', color: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') ? '9px' : '12px' }}>
                              {(file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') ? 'PDF' : 'W'}</div>
                            <span id="fileName"
                              style={{ fontFamily: '\'Inter\',sans-serif', fontSize: '13px', fontWeight: '600', color: textColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{file.name}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span id="fileSize" style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                               {file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : (file.size / 1024).toFixed(1) + ' KB'}
                            </span>
                            <div
                              style={{ background: '#22c55e', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        {/*  Progress bar  */}
                        <div
                          style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden', width: '100%', display: 'flex' }}>
                          <div style={{ width: '100%', height: '100%', background: '#22c55e', borderRadius: '3px' }}></div>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '11px', color: '#22c55e', fontWeight: '700' }}>100%
                          Completado</div>
                      </div>
                    </div>)}

                    <input type="file" id="cf-archivo" name="documento" ref={fileInputRef} onChange={(e) => { if(e.target.files && e.target.files.length > 0) handleFile(e.target.files[0]); }}
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      style={{ position: 'absolute', inset: '0', opacity: '0', width: '100%', height: '100%', cursor: 'pointer' }} />
                  </div>

                </div>
              </div>

              {/*  BOTTOM SECTION: SUBMIT BUTTON & PRIVACY  */}
              <div style={{ marginTop: '0' }}>

                {/*  Checkbox de Privacidad  */}
                <label
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', cursor: 'pointer', padding: '12px', background: softBg, border: `1px solid ${borderColor}`, borderRadius: '10px', transition: 'all 0.2s' }}
                  onMouseOver={(event) => { event.currentTarget.style.background=softBgHover;event.currentTarget.style.borderColor=borderHover; }}
                  onMouseOut={(event) => { event.currentTarget.style.background=softBg;event.currentTarget.style.borderColor=borderColor; }}>
                  <input type="checkbox" required name="terminos" id="aceptoTerminos"
                    style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#1B60DF', cursor: 'pointer' }} />
                  <span
                    style={{ fontFamily: '\'Inter\', sans-serif', fontSize: '12px', color: textMuted, lineHeight: '1.4', userSelect: 'none' }}>
                    He leído y acepto la <Link href="javascript:void(0)" onClick={(event) => { setIsModalOpen(true) }}
                      style={{ color: '#1B60DF', fontWeight: '600', textDecoration: 'none' }}
                      onMouseOver={(event) => { event.currentTarget.style.textDecoration='underline' }}
                      onMouseOut={(event) => { event.currentTarget.style.textDecoration='none' }}>Política de Privacidad</Link> y autorizo el tratamiento de mis datos para realizar el análisis solicitado.
                  </span>
                </label>

                <button id="submitBtn" type="submit"
                  disabled={submitState === 'loading' || submitState === 'success'}
                  className={`state-${submitState !== 'idle' ? submitState : 'idle'}`}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    background: submitState === 'success' ? '#16a34a' : submitState === 'error' ? '#dc2626' : submitState === 'loading' ? '#0B1425' : 'linear-gradient(90deg, #1652cf, #1B60DF, #2374ff)', 
                    border: submitState === 'loading' ? '1px solid rgba(27,96,223,0.3)' : '1px solid transparent', 
                    borderRadius: '12px', 
                    color: '#fff', 
                    fontFamily: '\'Sora\', sans-serif', 
                    fontSize: '15px', 
                    fontWeight: '700', 
                    cursor: submitState === 'loading' ? 'wait' : 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px', 
                    boxShadow: submitState === 'success' ? '0 12px 24px rgba(22,163,74,0.35)' : submitState === 'error' ? '0 12px 24px rgba(220,38,38,0.3)' : '0 12px 24px rgba(27,96,223,0.3)', 
                    transition: 'all 0.3s ease', 
                    position: 'relative', 
                    overflow: 'hidden' 
                  }}
                  onMouseOver={(event) => { if(!event.currentTarget.disabled){event.currentTarget.style.transform='translateY(-2px)';event.currentTarget.style.boxShadow=submitState === 'success' ? '0 16px 32px rgba(22,163,74,0.45)' : '0 16px 32px rgba(27,96,223,0.4)';} }} 
                  onMouseOut={(event) => { if(!event.currentTarget.disabled){event.currentTarget.style.transform='translateY(0)';event.currentTarget.style.boxShadow=submitState === 'success' ? '0 12px 24px rgba(22,163,74,0.35)' : '0 12px 24px rgba(27,96,223,0.3)';} }}> 
                  
                  {submitState === 'loading' && (
                     <div className="progress-bar-bg" style={{ width: `${uploadProgress}%` }}></div>
                  )}

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {submitState === 'loading' && (
                       <>
                         <span style={{ width: '18px', height: '18px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spinBtn 0.7s linear infinite', flexShrink: '0' }}></span>
                         <span>Analizando documento... {uploadProgress}%</span>
                       </>
                    )}
                    
                    {submitState === 'success' && (
                      <>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}>
                            <polyline points="20 6 9 17 4 12" strokeDasharray="40" strokeDashoffset="40" style={{animation: 'checkDraw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards'}}/>
                        </svg>
                        <span>Artículo enviado con éxito</span>
                      </>
                    )}
                    
                    {submitState === 'error' && (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: '0' }}>
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        <span>{errorMsg || 'Error al analizar'}</span>
                      </>
                    )}
                    
                    {submitState === 'idle' && (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ transform: 'rotate(45deg)', marginTop: '-2px', flexShrink: '0' }}>
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        <span>Enviar Artículo</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>

    

    {/*  Modal de Privacidad  */}
    <div className={`privacy-modal-overlay ${isModalOpen ? 'active' : ''}`} id="privacyModal" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false) }}>
      <div className="privacy-modal-content">
        <div className="privacy-modal-header">
          <h2 className="privacy-modal-title">Política de Privacidad</h2>
          <div className="privacy-modal-actions">
            <button className="btn-close-modal" onClick={(event) => { setIsModalOpen(false) }} aria-label="Cerrar modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        <div className="privacy-modal-body" id="privacyModalBody">
          <p>En Fynit respetamos la privacidad de nuestros usuarios y la confidencialidad de sus investigaciones. Esta Política explica de forma sencilla qué información recopilamos, para qué la utilizamos y cómo la protegemos.</p>
          
          <h2>1. ¿Quién es responsable de tus datos?</h2>
          <p>Fynit es un producto operado por:</p>
          <p><b>FYGRAD S.A.C.</b><br />RUC N.° 20615739678<br />Correo de contacto: <b>hola@fynit.app</b></p>
          <p>FYGRAD S.A.C. es responsable del tratamiento de los datos personales recopilados mediante Fynit.<br />Banco de datos personales: <b>Usuarios Fynit</b>.</p>
          
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
          
          <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <p style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
            <b>FYNIT</b><br />
            Producto operado por <b>FYGRAD S.A.C.</b><br />
            RUC N.° 20615739678<br />
            <b>hola@fynit.app</b><br /><br />
            © 2026 FYGRAD S.A.C. Todos los derechos reservados.
          </p>
        </div>
        <div className="privacy-modal-footer" style={{ padding: '16px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', background: '#fff', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
          <Link href="assets/Politica_de_Privacidad_Fynit.pdf" target="_blank" rel="noopener" download="Politica_de_Privacidad_Fynit.pdf" className="btn-download-pdf" style={{ background: '#f3f4f6', color: '#4b5563', fontSize: '14px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Descargar PDF
          </Link>
          <button onClick={(event) => { document.getElementById('aceptoTerminos')?.click(); setIsModalOpen(false); }} style={{ padding: '10px 24px', background: '#1B60DF', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: '\'Inter\', sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(event) => { event.currentTarget.style.background='#1652cf' }} onMouseOut={(event) => { event.currentTarget.style.background='#1B60DF' }}>
            Aceptar
          </button>
        </div>
      </div>
    </div>

  
</div>
  );
}
