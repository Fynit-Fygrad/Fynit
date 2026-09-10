'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MetricCard, { MetricColor } from '@/components/dashboard/MetricCard';
import EvolutionChart from '@/components/dashboard/EvolutionChart';
import ResultSummary from '@/components/dashboard/ResultSummary';

const defaultMockData = {
  document: {
    name: "Artículo_Final.docx",
    size: "1.8 MB",
    uploadedAt: "24 may, 2025 10:42 a. m.",
    status: "Análisis completado",
    timeTaken: "45 segundos"
  },
  metrics: {
    similitud: { 
      value: 18, 
      label: "18%", 
      status: "Riesgo bajo", 
      statusColor: "green" as MetricColor, 
      description: "El nivel de similitud está dentro del rango aceptable." 
    },
    readiness: { 
      value: 72, 
      label: "72/100", 
      status: "Buen progreso", 
      statusColor: "orange" as MetricColor, 
      chartColor: "blue" as MetricColor,
      description: "Tu manuscrito tiene una base sólida, pero aún hay mejoras por hacer." 
    },
    editorial: { 
      value: 75, 
      label: "Q3", 
      status: "Q2 posible", 
      statusColor: "orange" as MetricColor, 
      description: "Actualmente en Q3, pero puede aspirar a Q2 con ajustes." 
    },
    metodologia: { 
      value: 68, 
      label: "68/100", 
      status: "Mejorable", 
      statusColor: "orange" as MetricColor, 
      chartColor: "amber" as MetricColor,
      description: "La metodología es adecuada, pero hay aspectos por fortalecer." 
    }
  },
  evolution: [
    { label: "Análisis actual", value: 72 } // Only 1 point for the first simulation
  ],
  summary: {
    text: "Tu manuscrito tiene un buen potencial de publicación. Enfócate en las áreas señaladas para aumentar tus posibilidades de aceptación.",
    globalScore: 66,
    status: "Buen progreso",
    statusColor: "green"
  }
};

export default function ResultadosDiagnostico() {
  const router = useRouter();
  const [mockData, setMockData] = useState(defaultMockData);
  const [hasDocument, setHasDocument] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    // Check if the user uploaded a file in the simulator
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
    return <div className="h-full flex items-center justify-center text-slate-500">Cargando resultados...</div>;
  }

  if (hasDocument === false) {
    return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
        <DashboardHeader 
          title="Resultados de diagnóstico" 
          breadcrumb="Inicio > Diagnósticos"
        />
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-8">
          <div className="bg-white p-10 rounded-[32px] border border-slate-200 text-center max-w-md shadow-sm dark:bg-slate-900/50 dark:border-slate-800">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">Aún no hay resultados</h2>
            <p className="text-slate-500 mb-8 dark:text-slate-400">Debes subir un archivo y realizar un diagnóstico en la pantalla de Inicio para ver los resultados aquí.</p>
            <button 
              onClick={() => router.push('/dashboard/inicio')}
              className="bg-[#1b60df] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#124bc5] transition-colors"
            >
              Ir a Inicio y subir archivo
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleNewDiagnosis = () => {
    sessionStorage.removeItem('fynit_sim_doc_name');
    sessionStorage.removeItem('fynit_sim_doc_size');
    sessionStorage.removeItem('fynit_sim_doc_date');
    router.push('/dashboard/inicio');
  };

  const newDiagnosisButton = (
    <button 
      onClick={handleNewDiagnosis}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1b60df] text-white font-bold text-[13px] shadow-sm hover:bg-[#124bc5] transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Nuevo Diagnóstico
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
      <DashboardHeader 
        title="Resultados de diagnóstico" 
        breadcrumb={`Inicio > Diagnósticos > ${mockData.document.name}`}
        action={newDiagnosisButton}
      />
      
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex justify-center">
        <div className="max-w-[1000px] w-full flex flex-col gap-6 pb-10">
          
          {/* Top Document Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[24px] p-5 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-400 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-snug">{mockData.document.name}</h3>
                <p className="text-[12.5px] text-slate-500 dark:text-slate-400">{mockData.document.size} • Cargado el {mockData.document.uploadedAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-[13px] font-bold">{mockData.document.status}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-[11.5px] font-medium">Tiempo total: {mockData.document.timeTaken}</span>
                </div>
              </div>

              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#2563eb] text-[#2563eb] font-bold text-[13px] hover:bg-blue-50 transition-colors dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Descargar reporte
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            <MetricCard 
              title="Similitud"
              mainValue={mockData.metrics.similitud.label}
              badgeText={mockData.metrics.similitud.status}
              badgeColor={mockData.metrics.similitud.statusColor}
              description={mockData.metrics.similitud.description}
              chartValue={mockData.metrics.similitud.value}
              chartColor={mockData.metrics.similitud.statusColor}
              chartLabelMain={mockData.metrics.similitud.label}
              chartLabelSub="de 100%"
            />
            <MetricCard 
              title="Readiness"
              mainValue={mockData.metrics.readiness.label}
              badgeText={mockData.metrics.readiness.status}
              badgeColor={mockData.metrics.readiness.statusColor}
              description={mockData.metrics.readiness.description}
              chartValue={mockData.metrics.readiness.value}
              chartColor={mockData.metrics.readiness.chartColor || mockData.metrics.readiness.statusColor}
              chartLabelMain={mockData.metrics.readiness.value.toString()}
              chartLabelSub="de 100"
            />
            <MetricCard 
              title="Nivel Editorial"
              mainValue={mockData.metrics.editorial.label}
              badgeText={mockData.metrics.editorial.status}
              badgeColor={mockData.metrics.editorial.statusColor}
              description={mockData.metrics.editorial.description}
              chartValue={mockData.metrics.editorial.value}
              chartColor={mockData.metrics.editorial.statusColor}
              chartLabelMain={mockData.metrics.editorial.label}
              chartLabelSub="Actual"
            />
            <MetricCard 
              title="Metodología"
              mainValue={mockData.metrics.metodologia.label}
              badgeText={mockData.metrics.metodologia.status}
              badgeColor={mockData.metrics.metodologia.statusColor}
              description={mockData.metrics.metodologia.description}
              chartValue={mockData.metrics.metodologia.value}
              chartColor={mockData.metrics.metodologia.chartColor || mockData.metrics.metodologia.statusColor}
              chartLabelMain={mockData.metrics.metodologia.value.toString()}
              chartLabelSub="de 100"
            />
          </div>

          {/* Bottom Area: Evolution & Summary */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <EvolutionChart data={mockData.evolution} />
            </div>
            <div className="col-span-1">
              <ResultSummary 
                text={mockData.summary.text}
                globalScore={mockData.summary.globalScore}
                statusText={mockData.summary.status}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
