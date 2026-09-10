'use client';

import React, { useState, useRef, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useRouter } from 'next/navigation';

export default function RiesgosDetectados() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  
  const totalWordsOriginal = 1368;
  const initialPlagiarismWords = 245;
  const [maxExcerptWords, setMaxExcerptWords] = useState(32);
  
  const [plagiarismWords, setPlagiarismWords] = useState(initialPlagiarismWords);
  const [plagiarismScore, setPlagiarismScore] = useState(18); // 18% initially
  const [lastUpdated, setLastUpdated] = useState("Actualizado hace 30 segundos");
  const [hasDocument, setHasDocument] = useState<boolean | null>(null);
  const [docText, setDocText] = useState<string | null>(null);

  // Effect 1: Read session storage and set document availability
  useEffect(() => {
    const docName = sessionStorage.getItem('fynit_sim_doc_name');
    const storedText = sessionStorage.getItem('fynit_sim_doc_text');
    
    if (!docName) {
      setHasDocument(false);
      return;
    }
    
    setDocText(storedText);
    setHasDocument(true);
  }, []);

  // Effect 2: Inject HTML into the editor AFTER it has been rendered (hasDocument === true)
  useEffect(() => {
    if (hasDocument !== true) return;
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== '') return;

    if (docText) {
      // Use ALL paragraphs from the PDF
      const allParagraphs = docText.split('\n').filter((p: string) => p.trim().length > 30);

      // Calculate real total word count
      const realTotalWords = allParagraphs.reduce((acc: number, p: string) => {
        return acc + p.trim().split(/\s+/).length;
      }, 0);

      // Target ~18% of total words to highlight as plagiarism
      const targetHighlightWords = Math.round(realTotalWords * 0.18);
      let totalHighlightedWords = 0;

      let htmlContent = '';

      allParagraphs.forEach((p: string, i: number) => {
        let modifiedText = p.trim();
        const words = modifiedText.split(' ');

        // Spread highlights: highlight 1 phrase roughly every ~5 paragraphs
        // Stop once we hit the 18% target
        if (totalHighlightedWords < targetHighlightWords && words.length > 12) {
          const roll = i % 5; // deterministic so it's consistent each render

          if (roll === 0 || roll === 2) { // red highlight (plagiarism)
            const start = Math.floor(words.length * 0.25);
            const length = Math.min(18, words.length - start);
            if (length > 4) {
              const highlight = words.slice(start, start + length).join(' ');
              totalHighlightedWords += length;
              modifiedText = modifiedText.replace(
                highlight,
                `<span class="plagiarism-marker" style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px; border-radius: 4px;">${highlight}</span>`
              );
            }
          } else if (roll === 3) { // orange highlight (methodology)
            const start = Math.floor(words.length * 0.4);
            const length = Math.min(12, words.length - start);
            if (length > 4) {
              const highlight = words.slice(start, start + length).join(' ');
              modifiedText = modifiedText.replace(
                highlight,
                `<span class="methodology-marker" style="background-color: #fef3c7; color: #b45309; padding: 2px 4px; border-radius: 4px;">${highlight}</span>`
              );
            }
          }
        }

        htmlContent += `<p style="margin-bottom: 16px; line-height: 1.9; color: #475569; font-size: 14px;">${modifiedText}</p>\n`;
      });

      // Update stats with real data
      setPlagiarismWords(Math.round(realTotalWords * 0.18));
      setPlagiarismScore(18);
      setMaxExcerptWords(totalHighlightedWords || 50);

      editorRef.current.innerHTML = htmlContent || '<p>No se pudo procesar el texto del documento.</p>';
    } else {
      // Fallback: no PDF text extracted (e.g. DOCX)
      editorRef.current.innerHTML = `
        <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #1e293b;">Introducción <span style="color: #ef4444; font-size: 12px; font-weight: bold;">• 2 hallazgos</span></h3>
        <p style="margin-bottom: 24px; line-height: 1.8; color: #475569; font-size: 14px;">
          En la última década, <span class="plagiarism-marker" style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px; border-radius: 4px;">múltiples estudios han demostrado que el aprendizaje colaborativo mejora significativamente el rendimiento académico.</span> Según Johnson y Johnson (2014), esta metodología <span class="plagiarism-marker" style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px; border-radius: 4px;">promueve la interdependencia positiva y la responsabilidad individual</span> entre los estudiantes.
        </p>
        <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; margin-top: 24px; color: #1e293b;">Metodología <span style="color: #f59e0b; font-size: 12px; font-weight: bold;">• 3 hallazgos</span></h3>
        <p style="margin-bottom: 24px; line-height: 1.8; color: #475569; font-size: 14px;">
          Se utilizó un <span class="methodology-marker" style="background-color: #fef3c7; color: #b45309; padding: 2px 4px; border-radius: 4px;">diseño cuasiexperimental con una muestra no probabilística de 120 estudiantes</span> de educación secundaria.
        </p>
        <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px; margin-top: 24px; color: #1e293b;">Discusión <span style="color: #ef4444; font-size: 12px; font-weight: bold;">• 2 hallazgos</span></h3>
        <p style="margin-bottom: 24px; line-height: 1.8; color: #475569; font-size: 14px;">
          Los resultados muestran que el aprendizaje colaborativo tiene un impacto positivo en el rendimiento. <span class="plagiarism-marker" style="background-color: #fee2e2; color: #991b1b; padding: 2px 4px; border-radius: 4px;">Estos hallazgos coinciden con lo reportado por varios autores en contextos similares.</span>
        </p>
      `;
      setMaxExcerptWords(32);
    }
  }, [hasDocument, docText]);


  const handleInput = () => {
    if (!editorRef.current) return;
    
    const markers = editorRef.current.querySelectorAll('.plagiarism-marker');
    let currentHighlightedWords = 0;
    
    markers.forEach(marker => {
      const text = marker.textContent || "";
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      currentHighlightedWords += words;
    });

    // Ratio of remaining highlighted words vs the original count
    const reductionRatio = maxExcerptWords > 0 ? currentHighlightedWords / maxExcerptWords : 0;
    const safeRatio = Math.max(0, Math.min(1, reductionRatio));
    
    const newPlagiarismWords = Math.round(plagiarismWords * safeRatio);
    setPlagiarismWords(newPlagiarismWords);
    
    // The actual score is how many highlighted words remain vs the full doc word count
    // We use plagiarismWords as the "initial highlighted word count at 18%"
    const realTotalWords = docText
      ? docText.split('\n').filter((p: string) => p.trim().length > 30)
          .reduce((acc: number, p: string) => acc + p.trim().split(/\s+/).length, 0)
      : totalWordsOriginal;

    const newScore = realTotalWords > 0 
      ? Math.round((newPlagiarismWords / realTotalWords) * 100)
      : 0;
    setPlagiarismScore(Math.max(0, newScore));
    
    setLastUpdated("Actualizado justo ahora");
  };

  if (hasDocument === null) return <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]"></div>;

  if (hasDocument === false) {
    return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
        <DashboardHeader 
          title="Riesgos detectados" 
          breadcrumb="Inicio > Riesgos detectados" 
        />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl p-10 max-w-md w-full flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h3 className="text-[20px] font-bold text-slate-900 dark:text-white mb-3">
              Aún no hay riesgos detectados
            </h3>
            <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Sube un archivo y realiza un diagnóstico en la pantalla de Inicio para que podamos analizar y detectar los riesgos de tu documento.
            </p>
            <button 
              onClick={() => router.push('/dashboard/inicio')}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-8 rounded-xl text-[14px] transition-colors shadow-sm"
            >
              Ir a Inicio y subir archivo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
      <DashboardHeader 
        title="Riesgos detectados en el documento" 
        breadcrumb="Inicio > Diagnósticos > Riesgos"
      />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row gap-8 pb-10">
          
          {/* Left Column: Interactive Document Viewer */}
          <div className="flex-1 flex flex-col">
            <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">Identificamos problemas que pueden afectar la calidad y publicación de tu manuscrito.</p>
            
            <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              
              {/* Editor Toolbar */}
              <div className="h-14 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-[14px] text-slate-800 dark:text-slate-200">Vista del documento analizado</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-600 dark:text-slate-300">
                    <button className="hover:text-blue-600">−</button>
                    <span>100%</span>
                    <button className="hover:text-blue-600">+</button>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  </button>
                </div>
              </div>

              {/* Editable Content Area */}
              <div 
                className="flex-1 p-8 outline-none dark:bg-[#0c1322]"
                ref={editorRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={handleInput}
                spellCheck={false}
              >
                {/* HTML is injected here via useEffect to prevent React hydration mismatches with contentEditable */}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[450px] flex flex-col gap-6 shrink-0 mt-6 lg:mt-0">
            
            {/* Top Right Widget (Plagiarism Score) */}
            <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400">Similitud general (Índice de plagio)</span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className={`text-[36px] font-black leading-none ${plagiarismScore > 10 ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'} transition-colors duration-500`}>
                      {plagiarismScore}%
                    </span>
                    <span className="text-[12px] font-medium text-slate-400">{plagiarismWords} / {totalWordsOriginal} palabras</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors duration-500 ${plagiarismScore > 10 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                  {plagiarismScore > 10 ? 'Riesgo alto' : 'Riesgo bajo'}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {lastUpdated}
              </div>

              {/* Decorative Line Chart */}
              <div className="absolute right-6 bottom-6 w-[120px] h-[40px] opacity-80 pointer-events-none">
                <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                  {plagiarismScore > 10 ? (
                    <polyline points="0,30 20,20 40,25 60,10 80,15 100,5" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <polyline points="0,5 20,15 40,10 60,25 80,20 100,30" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                  {plagiarismScore > 10 && <circle cx="100" cy="5" r="2.5" fill="white" stroke="#ef4444" strokeWidth="1.5" />}
                  {plagiarismScore <= 10 && <circle cx="100" cy="30" r="2.5" fill="white" stroke="#22c55e" strokeWidth="1.5" />}
                </svg>
              </div>
            </div>

            {/* Risk List Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Lista de riesgos detectados
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </h3>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filtrar por tipo
              </button>
            </div>

            {/* Risk Cards */}
            <div className="flex flex-col gap-4">
              
              {/* Risk 1 (High) */}
              <div className="bg-white dark:bg-slate-900 rounded-[20px] p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-300 dark:hover:border-red-900/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 dark:bg-red-900/20 dark:text-red-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[14px] text-slate-900 dark:text-white">Similitud alta en texto y frases</h4>
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-bold dark:bg-red-900/30 dark:text-red-400">Riesgo alto</span>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">Se detectaron coincidencias textuales y de parafraseo con fuentes externas.</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-slate-400">Ubicaciones</span>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300"><span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-red-50 text-red-600 text-[10px] mr-1.5 dark:bg-red-900/30 dark:text-red-400">2</span> 821 palabras</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-slate-400">Fuentes principales</span>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300">scielo.org, redalyc.org</span>
                    </div>
                  </div>
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 dark:text-blue-500">
                    Ver detalle <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>

              {/* Risk 2 (Medium) */}
              <div className="bg-white dark:bg-slate-900 rounded-[20px] p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-orange-300 dark:hover:border-orange-900/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 dark:bg-orange-900/20 dark:text-orange-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[14px] text-slate-900 dark:text-white">Limitaciones metodológicas</h4>
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold dark:bg-orange-900/30 dark:text-orange-400">Riesgo medio</span>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">Se identificaron aspectos metodológicos que podrían afectar la validez del estudio.</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-slate-400">Ubicaciones</span>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300"><span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-orange-50 text-orange-600 text-[10px] mr-1.5 dark:bg-orange-900/30 dark:text-orange-400">3</span> 542 palabras</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-slate-400">Secciones afectadas</span>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300">Metodología, Discusión</span>
                    </div>
                  </div>
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 dark:text-blue-500">
                    Ver detalle <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>

              {/* Risk 3 (Low) */}
              <div className="bg-white dark:bg-slate-900 rounded-[20px] p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-green-300 dark:hover:border-green-900/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0 dark:bg-green-900/20 dark:text-green-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[14px] text-slate-900 dark:text-white">Referencias desactualizadas</h4>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold dark:bg-green-900/30 dark:text-green-400">Riesgo bajo</span>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">Algunas referencias tienen más de 7 años de antigüedad.</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-slate-400">Ubicaciones</span>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300"><span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-green-50 text-green-600 text-[10px] mr-1.5 dark:bg-green-900/30 dark:text-green-400">2</span> 198 palabras</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-medium text-slate-400">Referencias afectadas</span>
                      <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300">15 referencias</span>
                    </div>
                  </div>
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 dark:text-blue-500">
                    Ver detalle <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Info Box */}
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-[20px] p-5 border border-blue-100 dark:border-blue-900/30 flex items-start gap-4">
              <div className="text-blue-500 shrink-0 mt-0.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg></div>
              <div className="flex flex-col">
                <p className="text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed mb-1.5">Estos riesgos son sugerencias de mejora. Revisa cada detalle y decide cómo abordarlos.</p>
                <a href="#" className="text-[13px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 dark:text-blue-500">
                  Ver guía de interpretación de riesgos
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
