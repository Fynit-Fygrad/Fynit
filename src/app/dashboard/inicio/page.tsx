'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import '@/styles/dashboard/upload.css';

export default function NuevoDiagnostico() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [files, setFiles] = useState<{name: string, type: 'pdf' | 'docx', size: string, fileObj: File}[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const addFile = (file: File) => {
    const isPdf = file.name.toLowerCase().endsWith('.pdf');
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const newFile = {
      name: file.name,
      type: isPdf ? 'pdf' : 'docx' as 'pdf' | 'docx',
      size: sizeInMB + ' MB',
      fileObj: file
    };
    setFiles(prev => [...prev, newFile]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => {
        addFile(file);
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        addFile(file);
      });
    }
  };

  const handleDiagnostico = async () => {
    if (files.length === 0 || !acceptedPrivacy) return;
    setIsProcessing(true);
    
    const file = files[0];

    // Save to session storage for the diagnosis simulation
    sessionStorage.setItem('fynit_sim_doc_name', file.name);
    sessionStorage.setItem('fynit_sim_doc_size', file.size);
    sessionStorage.setItem('fynit_sim_doc_date', new Date().toLocaleString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
    
    // Attempt to extract text if it's a PDF
    if (file.type === 'pdf') {
      try {
        const formData = new FormData();
        formData.append('file', file.fileObj);
        
        const res = await fetch('/api/extract-pdf', {
          method: 'POST',
          body: formData,
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            sessionStorage.setItem('fynit_sim_doc_text', data.text);
          }
        }
      } catch (err) {
        console.error('Error extracting PDF:', err);
      }
    }

    // Redirect to diagnosis page
    router.push('/dashboard/diagnosticos');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
      <DashboardHeader 
        title="Nuevo diagnóstico" 
        breadcrumb="Inicio > Nuevo diagnóstico" 
      />
      
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex justify-center">
        <div className="max-w-[950px] w-full mt-2">
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[22px] font-bold text-slate-900 tracking-tight dark:text-white">Carga tu documento</h2>
              <p className="text-slate-500 text-[13px] leading-relaxed dark:text-slate-400">
                Sube tu artículo en PDF, DOCX o ambos formatos.<br/>
                Nuestra IA analizará similitud, readiness, cuartil y calidad metodológica.
              </p>
            </div>
            
            <button className="flex items-center gap-1.5 text-[#1b60df] bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors border border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              ¿Qué analizamos?
            </button>
          </div>

          <div className="flex gap-4 h-[380px]">
            {/* Left: Drag and Drop Area */}
            <div 
              className={`flex-1 relative rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center bg-white dark:bg-slate-900/50 ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50/50 dark:border-blue-500/50 dark:bg-blue-900/10' 
                  : 'border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <img src="/assets/icons/upload-cloud.svg" alt="Upload Cloud" className="w-[120px] h-[120px] object-contain mb-4" />
              <div className="flex flex-col items-center justify-center gap-4 text-center mt-2">
                <h3 className="text-[19px] font-extrabold text-[#0f172a] tracking-tight dark:text-white">
                  Arrastra y suelta tus archivos aquí
                </h3>
                <p className="text-[13.5px] font-medium text-slate-500 dark:text-slate-400">
                  o <label htmlFor="file-upload" className="text-[#1b60df] cursor-pointer hover:underline font-semibold">haz clic</label> para seleccionar
                </p>
                
                <p className="text-[11.5px] text-slate-400 font-medium mt-1">Formatos permitidos: PDF, DOCX • Tamaño máx.: 50 MB</p>
              
                <label htmlFor="file-upload" className="inline-flex items-center gap-2 bg-[#124bc5] hover:bg-[#0e3a9c] text-white font-semibold py-2.5 px-6 rounded-lg cursor-pointer transition-colors shadow text-[13px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Seleccionar archivos
                </label>
                <input 
                  id="file-upload" 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  multiple
                  className="hidden"
                  onChange={handleFileInput}
                />
              </div>
            </div>

            {/* Right: Selected Files List & Action Area */}
            <div className="w-[320px] bg-white border border-slate-200 rounded-3xl p-5 flex flex-col dark:bg-slate-900/50 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13.5px] font-bold text-slate-900 dark:text-white">Archivos subidos</h3>
                <div className="bg-slate-100 text-slate-600 text-[10.5px] font-bold w-5 h-5 rounded flex items-center justify-center dark:bg-slate-800 dark:text-slate-400">
                  {files.length}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 custom-scrollbar mb-4">
                {files.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-1.5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    <p className="text-[11.5px] text-center px-4">Sube tus documentos para comenzar el análisis</p>
                  </div>
                ) : (
                  files.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-sm relative group dark:bg-slate-800 dark:border-slate-700">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[11px] shrink-0 ${
                        file.type === 'pdf' ? 'bg-[#ef4444]' : 'bg-[#2563eb]'
                      }`}>
                        {file.type.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="text-[12.5px] font-bold text-slate-900 truncate mb-0.5 dark:text-white">{file.name}</p>
                        <p className="text-[11px] text-slate-500 font-medium dark:text-slate-400">{file.size}</p>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="absolute right-3 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Eliminar archivo"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Action Button Area */}
              <div className="shrink-0 pt-3 border-t border-slate-100 dark:border-slate-700">
                <label className="flex items-start gap-2.5 mb-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={acceptedPrivacy}
                      onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    />
                    <div className="w-4 h-4 rounded-[4px] border border-slate-300 bg-white peer-checked:bg-[#1b60df] peer-checked:border-[#1b60df] transition-colors dark:bg-slate-800 dark:border-slate-600"></div>
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-[10.5px] text-slate-500 leading-snug dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    He leído y acepto la <button type="button" className="text-[#1b60df] hover:underline font-medium" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowPrivacyModal(true); }}>Política de Privacidad</button> y los términos de confidencialidad.
                  </span>
                </label>

                <button 
                  onClick={handleDiagnostico}
                  disabled={files.length === 0 || !acceptedPrivacy || isProcessing}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-[13px] transition-all shadow-sm ${
                    files.length > 0 && acceptedPrivacy && !isProcessing
                      ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      Realizar Diagnóstico
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-slate-500 gap-2 pb-10 dark:text-slate-400">
            <div className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <div>
                <h4 className="text-[12.5px] font-bold text-slate-900 m-0 leading-tight dark:text-white">Tu investigación es confidencial.</h4>
                <p className="text-[11.5px] m-0 text-slate-500">Usamos tu documento únicamente para realizar el análisis solicitado. No publicamos ni adquirimos derechos.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] w-full max-w-[700px] max-h-[85vh] flex flex-col shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-[19px] font-bold text-[#0f172a] dark:text-white">Política de Privacidad</h2>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-7 py-6 custom-scrollbar text-[13.5px] text-[#475569] dark:text-slate-400 leading-[1.6]">
              <p className="mb-6">En Fynit respetamos la privacidad de nuestros usuarios y la confidencialidad de sus investigaciones. Esta Política explica de forma sencilla qué información recopilamos, para qué la utilizamos y cómo la protegemos.</p>
              
              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">1. ¿Quién es responsable de tus datos?</h3>
                <p className="mb-3">Fynit es un producto operado por:</p>
                <p className="font-bold text-[#0f172a] dark:text-slate-200">FYGRAD S.A.C.</p>
                <p>RUC N.° 20615739678<br/>Correo de contacto: <span className="font-bold text-[#0f172a] dark:text-white">hola@fynit.app</span></p>
                <p className="mt-3">FYGRAD S.A.C. es responsable del tratamiento de los datos personales recopilados mediante Fynit.<br/>Banco de datos personales: <strong className="font-bold text-[#0f172a] dark:text-white">Usuarios Fynit</strong>.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">2. ¿Qué información recopilamos?</h3>
                <p className="mb-2">Podemos recopilar:</p>
                <ul className="list-disc pl-5 mb-3 marker:text-slate-400">
                  <li>nombres y apellidos;</li>
                  <li>correo electrónico;</li>
                  <li>información proporcionada mediante nuestros formularios;</li>
                  <li>manuscritos, artículos científicos y archivos enviados voluntariamente;</li>
                  <li>información académica incluida en dichos documentos;</li>
                  <li>respuestas, preferencias y comentarios sobre el servicio;</li>
                  <li>información técnica básica necesaria para el funcionamiento y seguridad de la plataforma.</li>
                </ul>
                <p>Solicitamos únicamente la información razonablemente necesaria para prestar nuestros servicios.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">3. ¿Para qué utilizamos tu información?</h3>
                <p className="mb-2">Utilizamos tus datos principalmente para:</p>
                <ul className="list-disc pl-5 mb-3 marker:text-slate-400">
                  <li>analizar el manuscrito que nos envías;</li>
                  <li>identificar revistas, conferencias u otras rutas de publicación compatibles;</li>
                  <li>elaborar y enviarte recomendaciones o reportes;</li>
                  <li>comunicarnos contigo respecto del análisis solicitado;</li>
                  <li>evaluar y mejorar el funcionamiento de Fynit;</li>
                  <li>prevenir fraude, usos indebidos o incidentes de seguridad; y</li>
                  <li>cumplir obligaciones legales o requerimientos de autoridades competentes.</li>
                </ul>
                <p>Las comunicaciones comerciales o promocionales se enviarán únicamente cuando corresponda y podrás dejar de recibirlas en cualquier momento.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">4. Confidencialidad y propiedad de tu investigación</h3>
                <p className="font-bold text-[#0f172a] dark:text-white mb-2">Tu investigación continúa siendo tuya.</p>
                <p className="mb-2">Al cargar un manuscrito en Fynit no transfieres ni cedes derechos de autor, propiedad intelectual, resultados, metodologías, datos ni derechos sobre tu investigación.</p>
                <p className="mb-2">Fynit recibe únicamente una autorización limitada para procesar el documento con la finalidad de realizar el análisis solicitado.</p>
                <p className="mb-2">No vendemos, publicamos ni comercializamos los manuscritos enviados por nuestros usuarios.</p>
                <p>El usuario declara que cuenta con los derechos, permisos o autorizaciones necesarios para proporcionar el documento y la información que contiene, incluyendo, cuando corresponda, información perteneciente a coautores o terceros.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">5. Uso de inteligencia artificial y proveedores tecnológicos</h3>
                <p className="mb-2">Fynit puede utilizar herramientas tecnológicas para apoyar el procesamiento y análisis de los documentos, incluyendo servicios de inteligencia artificial.</p>
                <p className="mb-2">Durante la etapa actual de validación, Fynit aplica medidas orientadas a reducir la exposición de información:</p>
                <ul className="list-disc pl-5 mb-2 marker:text-slate-400">
                  <li>minimización o anonimización de información cuando sea posible; y</li>
                  <li>acceso limitado al personal autorizado.</li>
                </ul>
                <p className="mb-2">El procesamiento mediante proveedores tecnológicos puede implicar que determinada información sea procesada en servidores ubicados fuera del país del usuario, incluyendo Estados Unidos u otras jurisdicciones.</p>
                <p>Fynit procurará que dichos tratamientos se realicen únicamente para las finalidades informadas y de acuerdo con la legislación aplicable.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">6. ¿Quién puede acceder a tu información?</h3>
                <p className="mb-2">El acceso podrá limitarse a:</p>
                <ul className="list-disc pl-5 mb-3 marker:text-slate-400">
                  <li>personal autorizado de FYGRAD S.A.C./Fynit;</li>
                  <li>colaboradores sujetos a obligaciones de confidencialidad;</li>
                  <li>proveedores tecnológicos necesarios para prestar el servicio; y</li>
                  <li>autoridades públicas cuando exista una obligación legal válida.</li>
                </ul>
                <p className="mb-2 font-bold text-[#0f172a] dark:text-white">Fynit no vende datos personales a terceros.</p>
                <p>También podremos comunicar información cuando resulte razonablemente necesario para proteger nuestros derechos, prevenir fraude, atender incidentes de seguridad o cumplir una obligación legal.</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">7. ¿Cuánto tiempo conservamos la información?</h3>
                <p className="mb-2">Como política general:</p>
                <ul className="list-disc pl-5 mb-3 marker:text-slate-400">
                  <li className="mb-1"><strong className="font-bold text-[#0f172a] dark:text-white">Manuscrito y análisis:</strong> hasta 30 días después de la entrega del resultado, salvo que el usuario solicite su eliminación antes o exista una obligación legal que requiera conservarlos.</li>
                  <li className="mb-1"><strong className="font-bold text-[#0f172a] dark:text-white">Datos de contacto y registro del consentimiento:</strong> hasta 24 meses desde la última interacción, salvo obligación legal de conservación por un plazo diferente.</li>
                  <li><strong className="font-bold text-[#0f172a] dark:text-white">Datos para comunicaciones comerciales:</strong> hasta que el usuario retire su consentimiento.</li>
                </ul>
                <p>Podremos conservar estadísticas agregadas o información debidamente anonimizada cuando ya no sea razonablemente posible identificar al usuario o reconstruir su manuscrito.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">8. Seguridad</h3>
                <p>Aplicamos medidas técnicas, organizativas y de acceso razonables para proteger la información frente a pérdida, alteración, acceso no autorizado o divulgación indebida. Adoptando medidas razonables para prevenirlos, detectarlos y responder ante ellos.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">9. Tus derechos</h3>
                <p className="mb-2">Dependiendo de la legislación aplicable, puedes solicitar:</p>
                <ul className="list-disc pl-5 mb-3 marker:text-slate-400">
                  <li>acceso a tus datos;</li>
                  <li>corrección o actualización;</li>
                  <li>eliminación o supresión;</li>
                  <li>oposición o limitación del tratamiento;</li>
                  <li>portabilidad, cuando corresponda;</li>
                  <li>información sobre el tratamiento realizado; o</li>
                  <li>revocación del consentimiento.</li>
                </ul>
                <p className="mb-2">Puedes realizar tu solicitud gratuitamente escribiendo a <a href="mailto:hola@fynit.app" className="font-bold text-[#0f172a] hover:underline dark:text-white">hola@fynit.app</a>.</p>
                <p className="mb-2">Fynit atenderá las solicitudes dentro de los plazos establecidos por la legislación aplicable.</p>
                <p>También podrás acudir ante la autoridad de protección de datos competente de tu país cuando consideres que tus derechos no han sido atendidos adecuadamente.</p>
              </div>

              <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">10. Usuarios de distintos países</h3>
                <p className="mb-2">FYGRAD S.A.C. se encuentra constituida en Perú y esta Política se interpreta principalmente conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, y su normativa vigente.</p>
                <p className="mb-2">Cuando Fynit preste servicios a usuarios de otros países, también respetará las disposiciones obligatorias de protección de datos que resulten aplicables en la jurisdicción correspondiente.</p>
                <p>Si una disposición de esta Política entra en conflicto con una norma imperativa aplicable al usuario, prevalecerá dicha norma respecto de ese tratamiento.</p>
              </div>

              <div className="mb-8">
                <h3 className="text-[15px] font-bold text-[#0f172a] dark:text-white mb-2">11. Cambios a esta Política</h3>
                <p className="mb-2">Fynit podrá actualizar esta Política para reflejar cambios legales, tecnológicos, operativos o en nuestros servicios.</p>
                <p>La versión vigente estará disponible permanentemente en nuestra plataforma indicando su fecha de última actualización.</p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-[12px] text-center text-slate-500">
                <p className="font-bold text-[#0f172a] dark:text-slate-300">FYNIT</p>
                <p>Producto operado por FYGRAD S.A.C.<br/>RUC N.° 20615739678<br/>hola@fynit.app</p>
                <p className="mt-2">© 2026 FYGRAD S.A.C. Todos los derechos reservados.</p>
              </div>
            </div>

            <div className="px-7 py-5 border-t border-slate-100 flex justify-end gap-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-[20px]">
              <a 
                href="/assets/Politica_de_Privacidad_Fynit.pdf"
                download="Politica_de_Privacidad_Fynit.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-lg text-[13px] font-bold bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Descargar PDF
              </a>
              <button 
                onClick={() => {
                  setAcceptedPrivacy(true);
                  setShowPrivacyModal(false);
                }}
                className="px-6 py-2.5 rounded-lg text-[13px] font-bold bg-[#1b60df] text-white hover:bg-[#124bc5] transition-colors shadow-sm"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
