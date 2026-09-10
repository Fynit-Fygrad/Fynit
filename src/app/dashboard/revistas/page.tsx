'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

// Mock Data
const defaultMockData = {
  document: {
    name: "Artículo_Final.docx",
    size: "1.8 MB",
    uploadedAt: "24 may, 2025 10:42 a. m.",
    status: "Análisis completado",
    timeTaken: "45 segundos"
  },
  bestMatchId: 1,
  journals: [
    {
      id: 1,
      name: "Computers & Education",
      area: "Educational Technology",
      issn: "0360-1315",
      cuartil: "Q1",
      databases: ["Scopus", "WoS"],
      fit: 86,
      color: "bg-[#2563eb]"
    },
    {
      id: 2,
      name: "Educational Researcher",
      area: "Education Research",
      issn: "0013-189X",
      cuartil: "Q1",
      databases: ["Scopus", "WoS"],
      fit: 79,
      color: "bg-[#357546]"
    },
    {
      id: 3,
      name: "British Journal of Educational Technology",
      area: "Education",
      issn: "1467-8535",
      cuartil: "Q2",
      databases: ["Scopus", "WoS"],
      fit: 74,
      color: "bg-[#30214a]"
    },
    {
      id: 4,
      name: "Journal of Educational Psychology",
      area: "Educational Psychology",
      issn: "0022-0663",
      cuartil: "Q1",
      databases: ["Scopus", "WoS"],
      fit: 68,
      color: "bg-[#7db4cc]"
    }
  ]
};

export default function RevistasSugeridas() {
  const router = useRouter();
  const [mockData, setMockData] = useState(defaultMockData);
  const [hasDocument, setHasDocument] = useState<boolean | null>(null);

  useEffect(() => {
    const simDocName = sessionStorage.getItem('fynit_sim_doc_name');
    const simDocSize = sessionStorage.getItem('fynit_sim_doc_size');
    const simDocDate = sessionStorage.getItem('fynit_sim_doc_date');

    if (simDocName) {
      setMockData(prev => ({
        ...prev,
        document: {
          ...prev.document,
          name: simDocName,
          size: simDocSize || "0 KB",
          uploadedAt: simDocDate || new Date().toLocaleDateString()
        }
      }));
      setHasDocument(true);
    } else {
      setHasDocument(false);
    }
  }, []);

  if (hasDocument === null) {
    return <div className="h-full flex items-center justify-center text-slate-500">Cargando sugerencias...</div>;
  }

  if (hasDocument === false) {
    return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
        <DashboardHeader title="Match con revistas ideales" breadcrumb="Inicio > Revistas sugeridas" />
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8">
          <div className="bg-white p-10 rounded-[32px] border border-slate-200 text-center max-w-md shadow-sm dark:bg-slate-900/50 dark:border-slate-800">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">Aún no hay recomendaciones</h2>
            <p className="text-slate-500 mb-8 dark:text-slate-400">Sube un archivo y realiza un diagnóstico en la pantalla de Inicio para que podamos buscar las mejores revistas para ti.</p>
            <button onClick={() => router.push('/dashboard/inicio')} className="bg-[#1b60df] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#124bc5] transition-colors">
              Ir a Inicio y subir archivo
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getFitBarColor = (fit: number) => {
    if (fit >= 80) return "bg-[#16a34a]"; // green-600
    if (fit >= 75) return "bg-[#22c55e]"; // green-500
    return "bg-[#f97316]"; // orange-500
  };

  const getCuartilColor = (cuartil: string) => {
    return cuartil === 'Q2' 
      ? "bg-green-100/60 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : "bg-orange-100/60 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
  };

  const bestMatch = mockData.journals.find(j => j.id === mockData.bestMatchId) || mockData.journals[0];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
      <DashboardHeader 
        title="Match con revistas ideales" 
        breadcrumb={`Inicio > Diagnósticos > ${mockData.document.name}`}
      />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar flex justify-center">
        <div className="max-w-[1000px] w-full flex flex-col gap-6 pb-10">
          
          {/* Top Document Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] p-4 md:p-5 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-400 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[14px] md:text-[15px] font-bold text-slate-900 dark:text-white leading-snug truncate max-w-[200px] md:max-w-[300px]">{mockData.document.name}</h3>
                <p className="text-[11.5px] md:text-[12.5px] text-slate-500 dark:text-slate-400">{mockData.document.size} • Analizado el {mockData.document.uploadedAt}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-end">
              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-[12px] md:text-[13px] font-bold">{mockData.document.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-[10.5px] md:text-[11.5px] font-medium">Tiempo total: {mockData.document.timeTaken}</span>
                </div>
              </div>

              <button 
                onClick={() => router.push('/dashboard/diagnosticos')}
                className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl border-2 border-[#2563eb] text-[#2563eb] font-bold text-[12px] md:text-[13px] hover:bg-blue-50 transition-colors dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20 whitespace-nowrap"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                Ver diagnóstico
              </button>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <h2 className="text-[22px] font-black text-slate-900 dark:text-white leading-tight">Revistas recomendadas para tu manuscrito</h2>
              <p className="text-[13.5px] text-slate-500 dark:text-slate-400 mt-0.5">Selección basada en Scopus & WoS y el fit real de tu investigación.</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[12px] font-bold border border-blue-100 dark:border-blue-800">
              Metodología: Scopus AI Fit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-70">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm mt-2 shrink-0 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <div className="min-w-[850px]">
                {/* Table Header */}
                <div className="grid grid-cols-[3fr_1fr_1.5fr_1.5fr_1fr] gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 tracking-wider">REVISTA</span>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider text-center">CUARTIL</span>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider text-center">BASE DE DATOS</span>
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400 tracking-wider">
                  FIT REAL 
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider text-right">ACCIÓN</span>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col">
                {mockData.journals.map((journal, index) => (
                  <div key={journal.id} className={`grid grid-cols-[3fr_1fr_1.5fr_1.5fr_1fr] gap-4 items-center px-6 py-5 ${index !== mockData.journals.length - 1 ? 'border-b border-slate-100 dark:border-slate-800/60' : ''}`}>
                    
                    {/* Journal Info */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex flex-col justify-center items-center gap-1.5 shrink-0 ${journal.color}`}>
                        <div className="w-6 h-0.5 bg-white/70 rounded-full"></div>
                        <div className="w-6 h-0.5 bg-white/70 rounded-full"></div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-[15px] font-bold text-slate-900 dark:text-white truncate" title={journal.name}>{journal.name}</h4>
                        <span className="text-[12.5px] text-slate-500 dark:text-slate-400 truncate" title={journal.area}>{journal.area}</span>
                        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">ISSN: {journal.issn}</span>
                      </div>
                    </div>

                    {/* Cuartil */}
                    <div className="flex justify-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[12px] font-bold ${getCuartilColor(journal.cuartil)}`}>
                        {journal.cuartil}
                      </span>
                    </div>

                    {/* Databases */}
                    <div className="flex items-center justify-center gap-2">
                      {journal.databases.includes('Scopus') && (
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-orange-100/60 text-[#ea580c] text-[11.5px] font-bold dark:bg-orange-900/20 dark:text-orange-400">
                          Scopus
                        </span>
                      )}
                      {journal.databases.includes('WoS') && (
                        <span className="inline-flex px-2.5 py-1 rounded-full bg-purple-100/60 text-[#7e22ce] text-[11.5px] font-bold dark:bg-purple-900/20 dark:text-purple-400">
                          WoS
                        </span>
                      )}
                    </div>

                    {/* Fit Real */}
                    <div className="flex flex-col items-center justify-center w-full px-2">
                      <div className="flex items-center gap-1 mb-1.5">
                        <span className={`text-[15px] font-black ${journal.fit >= 75 ? 'text-green-600 dark:text-green-500' : 'text-orange-500 dark:text-orange-400'}`}>
                          {journal.fit}%
                        </span>
                        <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">Fit real</span>
                      </div>
                      <div className="w-full max-w-[120px] h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                        <div className={`h-full rounded-full ${getFitBarColor(journal.fit)}`} style={{ width: `${journal.fit}%` }}></div>
                      </div>
                    </div>

                    {/* Accion */}
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          sessionStorage.setItem('fynit_sim_journal_id', journal.id.toString());
                          router.push('/dashboard/revistas/detalles');
                        }}
                        className="px-4 py-2 rounded-xl border-[1.5px] border-[#2563eb] text-[#2563eb] font-bold text-[12.5px] hover:bg-blue-50 transition-colors dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20 whitespace-nowrap"
                      >
                        Ver detalles
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* Best Match Card */}
          <div className="bg-[#f0f4ff] dark:bg-blue-900/10 rounded-[24px] p-6 border border-blue-100 dark:border-blue-900/30 flex flex-col md:flex-row items-start md:items-center justify-between mt-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 shadow-sm border border-slate-100 dark:border-transparent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[17px] font-bold text-[#1e40af] dark:text-blue-400 leading-snug mb-0.5">Mejor opción para ti</h3>
                <p className="text-[13.5px] text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">Según el análisis de tu manuscrito, esta revista tiene el mayor fit real y alineación temática.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 py-3 px-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm w-full md:w-auto">
              <div className="flex items-center gap-3 w-full justify-center sm:justify-start">
                <div className={`w-10 h-10 rounded-lg flex flex-col justify-center items-center gap-1 shrink-0 ${bestMatch.color}`}>
                   <div className="w-5 h-0.5 bg-white/70 rounded-full"></div>
                   <div className="w-5 h-0.5 bg-white/70 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                    {bestMatch.name.replace('Journal of', 'J.')}
                  </span>
                  <span className="text-[12px] font-bold text-green-600 dark:text-green-500">{bestMatch.fit}% fit real</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  sessionStorage.setItem('fynit_sim_journal_id', bestMatch.id.toString());
                  router.push('/dashboard/revistas/detalles');
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2563eb] text-white font-bold text-[12.5px] hover:bg-[#1d4ed8] transition-colors whitespace-nowrap shadow-sm"
              >
                Ver detalles
              </button>
            </div>
          </div>

          {/* Info Footer */}
          <div className="flex items-center gap-2.5 px-6 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span className="text-[12.5px] font-medium leading-relaxed">
              Los porcentajes representan el fit real de tu manuscrito con la revista, basado en análisis semántico, citaciones y alcance.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
