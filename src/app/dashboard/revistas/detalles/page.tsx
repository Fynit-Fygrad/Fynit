'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const allJournalsData = [
  {
    id: 1,
    name: "Computers & Education",
    area: "Educational Technology",
    issn: "0360-1315",
    cuartil: "Q1",
    databases: ["Scopus", "WoS"],
    fit: 86,
    color: "bg-[#2563eb]",
    domain: "www.sciencedirect.com/journal/computers-and-education",
    compatibility: { thematic: 91, methodology: 84, scope: 82, references: 87 },
    coincidenceAreas: ["Investigación educativa", "Metodología", "Tecnología educativa", "Análisis de datos"]
  },
  {
    id: 2,
    name: "Educational Researcher",
    area: "Education Research",
    issn: "0013-189X",
    cuartil: "Q1",
    databases: ["Scopus", "WoS"],
    fit: 79,
    color: "bg-[#357546]",
    domain: "journals.sagepub.com/home/edr",
    compatibility: { thematic: 82, methodology: 75, scope: 80, references: 79 },
    coincidenceAreas: ["Políticas educativas", "Revisión sistemática", "Estudios empíricos"]
  },
  {
    id: 3,
    name: "British Journal of Educational Technology",
    area: "Education",
    issn: "1467-8535",
    cuartil: "Q2",
    databases: ["Scopus", "WoS"],
    fit: 74,
    color: "bg-[#30214a]",
    domain: "bera-journals.onlinelibrary.wiley.com/journal/14678535",
    compatibility: { thematic: 75, methodology: 72, scope: 78, references: 70 },
    coincidenceAreas: ["Educación internacional", "Tecnología de la información", "Evaluación"]
  },
  {
    id: 4,
    name: "Journal of Educational Psychology",
    area: "Educational Psychology",
    issn: "0022-0663",
    cuartil: "Q1",
    databases: ["Scopus", "WoS"],
    fit: 68,
    color: "bg-[#7db4cc]",
    domain: "www.apa.org/pubs/journals/edu",
    compatibility: { thematic: 70, methodology: 65, scope: 68, references: 69 },
    coincidenceAreas: ["Aprendizaje", "Instrucción", "Psicología cognitiva"]
  }
];

export default function DetalleRevista() {
  const router = useRouter();
  const [documentName, setDocumentName] = useState("Artículo_Final.docx");
  const [journal, setJournal] = useState(allJournalsData[0]);

  useEffect(() => {
    const simDocName = sessionStorage.getItem('fynit_sim_doc_name');
    if (simDocName) {
      setDocumentName(simDocName);
    }

    const simJournalId = sessionStorage.getItem('fynit_sim_journal_id');
    if (simJournalId) {
      const foundJournal = allJournalsData.find(j => j.id.toString() === simJournalId);
      if (foundJournal) {
        setJournal(foundJournal);
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
      <DashboardHeader 
        title="Detalle de revista" 
        breadcrumb={`Inicio > Diagnósticos > ${documentName} > Revistas sugeridas > ${journal.name}`}
      />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar flex justify-center">
        <div className="max-w-[1200px] w-full flex flex-col gap-6 pb-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
            
            {/* Main Content (Left & Middle Columns) */}
            <div className="flex flex-col gap-6">
              
              {/* Back Button */}
              <button 
                onClick={() => router.push('/dashboard/revistas')}
                className="flex items-center gap-2 text-[14px] font-bold text-slate-500 hover:text-[#2563eb] transition-colors w-fit dark:text-slate-400 dark:hover:text-blue-400"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Volver a sugerencias
              </button>

              {/* Top Info Card */}
              <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${journal.color}`}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-[22px] font-black text-slate-900 dark:text-white leading-tight">{journal.name}</h2>
                    <p className="text-[14px] text-slate-500 dark:text-slate-400 mt-0.5">{journal.area}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className="text-[12px] font-medium text-slate-400 dark:text-slate-500">ISSN: {journal.issn}</span>
                      <span className="inline-flex px-3 py-1 rounded-full text-[12px] font-bold bg-green-100/60 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {journal.cuartil}
                      </span>
                      {journal.databases.includes('Scopus') && (
                        <span className="inline-flex px-3 py-1 rounded-full bg-orange-100/60 text-[#ea580c] text-[12px] font-bold dark:bg-orange-900/20 dark:text-orange-400">Scopus</span>
                      )}
                      {journal.databases.includes('WoS') && (
                        <span className="inline-flex px-3 py-1 rounded-full bg-purple-100/60 text-[#7e22ce] text-[12px] font-bold dark:bg-purple-900/20 dark:text-purple-400">WoS</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end min-w-[200px] w-full md:w-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:border-green-800/50 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-[12px] font-bold">Alta compatibilidad</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 w-full justify-end">
                    <span className="text-[32px] font-black text-green-600 dark:text-green-500 leading-none">{journal.fit}%</span>
                    <span className="text-[14px] text-slate-400 dark:text-slate-500 font-medium">Fit real</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 dark:bg-green-500 rounded-full" style={{ width: `${journal.fit}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Grid 2 Columns for Inner Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Sub-Column */}
                <div className="flex flex-col gap-6">
                  {/* Why Good Option Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 dark:bg-blue-900/30 dark:text-blue-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="4"></circle>
                          <line x1="12" y1="2" x2="12" y2="5"></line>
                          <line x1="12" y1="19" x2="12" y2="22"></line>
                          <line x1="4.93" y1="4.93" x2="7.07" y2="7.07"></line>
                          <line x1="16.93" y1="16.93" x2="19.07" y2="19.07"></line>
                          <line x1="2" y1="12" x2="5" y2="12"></line>
                          <line x1="19" y1="12" x2="22" y2="12"></line>
                          <line x1="4.93" y1="19.07" x2="7.07" y2="16.93"></line>
                          <line x1="16.93" y1="7.07" x2="19.07" y2="4.93"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight mb-1">¿Por qué es una buena opción?</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400">Esta revista se ajusta muy bien a tu manuscrito por los siguientes factores:</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="flex gap-4">
                        <div className="text-blue-500 mt-0.5 shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="8"></line><line x1="12" y1="16" x2="12" y2="22"></line><line x1="2" y1="12" x2="8" y2="12"></line><line x1="16" y1="12" x2="22" y2="12"></line></svg></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">Alineación temática</span>
                            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">Alta</span>
                          </div>
                          <p className="text-[12.5px] text-slate-500 dark:text-slate-400">Coincide con el enfoque en métodos de investigación en educación.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="text-blue-500 mt-0.5 shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">Alcance</span>
                            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">Alta</span>
                          </div>
                          <p className="text-[12.5px] text-slate-500 dark:text-slate-400">Tiene un alcance internacional y buena visibilidad en la comunidad académica.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="text-blue-500 mt-0.5 shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">Metodología</span>
                            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">Alta</span>
                          </div>
                          <p className="text-[12.5px] text-slate-500 dark:text-slate-400">Valora estudios con enfoque empírico y métodos mixtos.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="text-blue-500 mt-0.5 shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">Referencias</span>
                            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">Alta</span>
                          </div>
                          <p className="text-[12.5px] text-slate-500 dark:text-slate-400">Cita trabajos recientes y de alto impacto en educación.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coincidence Areas Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 dark:bg-blue-900/30 dark:text-blue-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight mb-1">Áreas de coincidencia</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400">Temas y palabras clave que coinciden con esta revista.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {journal.coincidenceAreas.map((area, index) => (
                        <span key={index} className="inline-flex px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[12.5px] font-medium border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50 dark:text-blue-400">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Middle Sub-Column */}
                <div className="flex flex-col gap-6">
                  {/* Compatibility Analysis Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                    <div className="flex items-start gap-3 mb-8">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 dark:bg-blue-900/30 dark:text-blue-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3v18h18"></path>
                          <path d="M18 17V9"></path>
                          <path d="M13 17V5"></path>
                          <path d="M8 17v-3"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight mb-1">Análisis de compatibilidad</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400">Nivel de coincidencia de tu manuscrito con los criterios de la revista.</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[13px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300">Alineación temática</span>
                          <span className="text-slate-900 dark:text-white">{journal.compatibility.thematic}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 dark:bg-green-500 rounded-full" style={{ width: `${journal.compatibility.thematic}%` }}></div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[13px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300">Metodología</span>
                          <span className="text-slate-900 dark:text-white">{journal.compatibility.methodology}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: `${journal.compatibility.methodology}%` }}></div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[13px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300">Alcance</span>
                          <span className="text-slate-900 dark:text-white">{journal.compatibility.scope}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 dark:bg-purple-400 rounded-full" style={{ width: `${journal.compatibility.scope}%` }}></div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[13px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300">Referencias</span>
                          <span className="text-slate-900 dark:text-white">{journal.compatibility.references}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 dark:bg-orange-400 rounded-full" style={{ width: `${journal.compatibility.references}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 dark:bg-blue-900/30 dark:text-blue-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900 dark:text-white leading-tight mb-1">Requisitos y criterios editoriales</h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-400">Principales requisitos de la revista.</p>
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-100/60 text-green-700 flex items-center justify-center text-[13px] font-bold dark:bg-green-900/30 dark:text-green-400">Q2</div>
                        <span className="text-[10px] text-center text-slate-500 font-medium leading-tight dark:text-slate-400 max-w-[50px]">Cuartil<br/>(Q2)</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-orange-100/60 text-[#ea580c] flex items-center justify-center text-[13px] font-bold dark:bg-orange-900/20 dark:text-orange-400">
                          S
                        </div>
                        <span className="text-[10px] text-center text-slate-500 font-medium leading-tight dark:text-slate-400 max-w-[50px]">Indexada en<br/>Scopus</span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100/60 text-[#7e22ce] flex items-center justify-center text-[13px] font-bold dark:bg-purple-900/20 dark:text-purple-400">
                          W
                        </div>
                        <span className="text-[10px] text-center text-slate-500 font-medium leading-tight dark:text-slate-400 max-w-[50px]">Indexada en<br/>Web of Science</span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center dark:bg-blue-900/20 dark:text-blue-400">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <span className="text-[10px] text-center text-slate-500 font-medium leading-tight dark:text-slate-400 max-w-[50px]">Revisión por<br/>pares</span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center dark:bg-green-600">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-[10px] text-center text-slate-500 font-medium leading-tight dark:text-slate-400 max-w-[50px]">Compatible con<br/>tu manuscrito</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="bg-[#f0fdf4] dark:bg-green-900/10 rounded-[24px] p-6 border border-green-200 dark:border-green-900/30 flex items-start gap-4">
                <div className="w-10 h-10 bg-white dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 shadow-sm border border-green-100 dark:border-transparent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-green-800 dark:text-green-400 mb-0.5">Recomendación de Fynit</h3>
                  <p className="text-[13.5px] text-green-700/80 dark:text-green-500/90 leading-relaxed">Tu manuscrito presenta una alta alineación temática con esta revista. Recomendamos revisar metodología y formato antes de enviar.</p>
                </div>
              </div>
            </div>

            {/* Right Column (Actions) */}
            <div className="flex flex-col gap-4 sticky top-8">
              
              <button 
                onClick={() => window.open('https://' + journal.domain, '_blank')}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#2563eb] text-white font-bold text-[14px] shadow-sm hover:bg-[#1d4ed8] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Ir al sitio de la revista
              </button>

              <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#2563eb] text-[#2563eb] font-bold text-[14px] shadow-sm hover:bg-blue-50 transition-colors dark:bg-[#0B1120] dark:hover:bg-blue-900/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                Guardar en favoritas
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
