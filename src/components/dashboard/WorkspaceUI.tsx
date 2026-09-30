'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, type ReactNode } from 'react';
import DashboardHeader from './DashboardHeader';
import { useWorkspace } from './WorkspaceProvider';
import { createReportPdf } from '@/lib/dashboard-report';

export function Icon({ name = 'file', className = '' }: { name?: string; className?: string }) {
  const paths: Record<string, string> = { file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h5', check: 'M5 12l4 4L19 6', arrow: 'M4 12h16 M14 6l6 6-6 6', clock: 'M12 8v4l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0', chart: 'M4 4v16h16 M8 15l4-5 4 2 4-7', people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0', search: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0', plus: 'M12 5v14 M5 12h14' };
  return <svg className={className} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.file} /></svg>;
}
export function Badge({ children, tone = 'blue' }: { children: ReactNode; tone?: string }) { return <span className={`ws-badge ws-${tone}`}>{children}</span>; }

export function Page({ title, description, children, action, requireDoc = true }: { title: string; description: string; children: ReactNode; action?: ReactNode; requireDoc?: boolean }) {
  const router = useRouter();
  const { active } = useWorkspace();
  const [hasDocument, setHasDocument] = useState<boolean | null>(null);

  useEffect(() => {
    if (requireDoc) {
      const simDocName = sessionStorage.getItem('fynit_sim_doc_name');
      setHasDocument(!!simDocName);
    } else {
      setHasDocument(true);
    }
  }, [active?.id, requireDoc]);

  if (requireDoc && hasDocument === null) {
    return <div className="h-full flex items-center justify-center text-slate-500">Cargando...</div>;
  }

  if (requireDoc && hasDocument === false) {
    return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B1120]">
        <DashboardHeader title={title} breadcrumb={`Inicio > ${title}`} compact />
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
            <p className="text-slate-500 mb-8 dark:text-slate-400">Debes subir un archivo y realizar un diagnóstico en la pantalla de Inicio para ver esta sección.</p>
            <button onClick={() => router.push('/dashboard/inicio')} className="bg-[#1b60df] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#124bc5] transition-colors">
              Ir a Inicio y subir archivo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div className="ws-page"><DashboardHeader title={title} breadcrumb={title} compact /><main className="ws-scroll"><div className="ws-container"><div className="ws-heading"><div><h1>{title}</h1><p>{description}</p></div>{action}</div>{children}</div></main></div>;
}
export function DocumentBar() { return null; }
export function Stat({ label, value, detail, icon = 'chart' }: { label: string; value: ReactNode; detail: string; icon?: string }) { return <div className="ws-card ws-stat"><span className="ws-icon"><Icon name={icon} /></span><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>; }
export function Empty({ text }: { text: string }) { return <div className="ws-empty"><Icon name="search" /><h3>No encontramos resultados</h3><p>{text}</p></div>; }
export function Journey() { return null; }
export function DemoNotice() { const { storageWarning } = useWorkspace(); return <div className="ws-demo" role="status"><span className="ws-demo-dot" /><span>Versión de demostración · Datos y servicios simulados{storageWarning && ' · Guardado no disponible en este navegador.'}</span></div>; }
export function ReportButton() {
  const { active } = useWorkspace();
  const [generated, setGenerated] = useState(false);
  function download() {
    const metric = active.evaluations.at(-1)!;
    const report = ['FYNIT — INFORME DEMOSTRATIVO', 'Datos simulados. No constituye una evaluación editorial real.', '', active.name, `Versión: ${metric.version}`, `Readiness: ${metric.readiness}/100`, `Similitud: ${metric.similarity}%`, `Metodología: ${metric.methodology}/100`, `Nivel editorial: ${metric.quartile}`, `Acciones completadas: ${active.tasks.length}/4`, `Revista: ${active.journal || 'Pendiente'}`, `Revisión experta: ${active.reviewed ? 'Completada (simulada)' : 'Pendiente'}`].join('\n');
    const bytes = createReportPdf(report.split('\n'));
    const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/pdf' }));
    const a = document.createElement('a'); a.href = url; a.download = `Informe_Fynit_v${metric.version}.pdf`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setGenerated(true);
  }
  return <div><button className="ws-button ws-secondary" onClick={download}><Icon name="file" />Descargar informe</button>{generated && <p role="status" className="ws-muted" style={{ marginTop: 8 }}>Informe PDF generado.</p>}</div>;
}
