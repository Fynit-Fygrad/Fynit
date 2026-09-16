'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export const actions = [
  { title: 'Fortalecer la metodología', detail: 'Justifica el tamaño de la muestra, documenta los criterios de selección y describe la validación del instrumento.', area: 'Metodología', priority: 'Alta', impact: '+8 puntos', time: '2–3 horas' },
  { title: 'Profundizar la discusión', detail: 'Contrasta los resultados con tres estudios recientes y explica las limitaciones y sus implicaciones.', area: 'Discusión', priority: 'Alta', impact: '+6 puntos', time: '2 horas' },
  { title: 'Actualizar las referencias', detail: 'Incorpora al menos 12 referencias recientes y comprueba que cada cita figure en la bibliografía.', area: 'Referencias', priority: 'Media', impact: '+4 puntos', time: '1–2 horas' },
  { title: 'Revisar la similitud', detail: 'Reformula los fragmentos señalados con tu propia interpretación y conserva las atribuciones a sus autores.', area: 'Introducción', priority: 'Media', impact: '−6% similitud', time: '1 hora' },
];
export type Evaluation = { version: number; date: string; readiness: number; similarity: number; methodology: number; quartile: string };
export type Project = { id: string; name: string; size: string; date: string; tasks: number[]; expert: string | null; reviewed: boolean; journal: string | null; prepared: boolean; evaluations: Evaluation[]; events: { id: string; text: string; date: string; kind: string }[]; messages: { text: string; author: string }[] };
type Workspace = { projects: Project[]; activeId: string };
const KEY = 'fynit_workspace_v1';
const initialEvaluation = (date: string): Evaluation => ({ version: 1, date, readiness: 72, similarity: 18, methodology: 68, quartile: 'Q3' });
function makeProject(name: string, size: string, id = crypto.randomUUID()): Project {
  const date = new Date().toISOString();
  return { id, name, size, date, tasks: [], expert: null, reviewed: false, journal: null, prepared: false, evaluations: [initialEvaluation(date)], events: [{ id: `${id}-initial`, text: 'Primer diagnóstico completado', date, kind: 'Diagnóstico' }], messages: [] };
}
function seed(): Workspace {
  const first = makeProject('Aprendizaje colaborativo en educación superior.docx', '1.8 MB', 'demo-education');
  first.tasks = [2];
  const second = makeProject('Tecnología y participación estudiantil.pdf', '2.4 MB', 'demo-technology');
  const third = makeProject('Competencias digitales docentes.docx', '960 KB', 'demo-teachers');
  third.tasks = [0, 1, 2, 3];
  third.evaluations.push({ ...initialEvaluation(third.date), version: 2, readiness: 84, similarity: 12, methodology: 82, quartile: 'Q2' });
  return { projects: [first, second, third], activeId: first.id };
}
function syncLegacy(project: Project) {
  const previous = sessionStorage.getItem('fynit_sim_doc_name');
  if (previous !== project.name) sessionStorage.removeItem('fynit_sim_doc_text');
  sessionStorage.setItem('fynit_sim_doc_name', project.name);
  sessionStorage.setItem('fynit_sim_doc_size', project.size);
  sessionStorage.setItem('fynit_sim_doc_date', formatDate(project.date));
}
export const formatDate = (date: string) => new Date(date).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
export function projectStatus(project: Project) { return project.prepared ? 'Listo para enviar' : project.evaluations.length > 1 ? 'Reevaluado' : 'En mejora'; }
type ContextValue = { projects: Project[]; active: Project; select: (id: string) => void; add: (files: { name: string; size: string }[]) => void; update: (change: (p: Project) => Project, text?: string, kind?: string) => void; reevaluate: () => void; storageWarning: boolean };
const Context = createContext<ContextValue | null>(null);
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [storageWarning, setStorageWarning] = useState(false);
  useEffect(() => {
    let data = seed();
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.projects) && parsed.projects.length && parsed.projects.every((p: Project) => p.id && p.name && Array.isArray(p.tasks) && Array.isArray(p.evaluations) && p.evaluations.length && Array.isArray(p.events) && Array.isArray(p.messages))) data = parsed;
      } else {
        const legacyName = sessionStorage.getItem('fynit_sim_doc_name');
        if (legacyName) { const project = makeProject(legacyName, sessionStorage.getItem('fynit_sim_doc_size') || '1.8 MB'); data.projects.unshift(project); data.activeId = project.id; }
      }
      if (!data.projects.some(p => p.id === data.activeId)) data.activeId = data.projects[0].id;
      syncLegacy(data.projects.find(p => p.id === data.activeId)!);
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // Browser storage is only available after hydration; initialize the fallback once.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStorageWarning(true);
    }
    setWorkspace(data);
  }, []);
  function save(next: Workspace) {
    try { localStorage.setItem(KEY, JSON.stringify(next)); syncLegacy(next.projects.find(p => p.id === next.activeId)!); } catch { setStorageWarning(true); }
    setWorkspace(next);
  }
  if (!workspace) return <div className="flex h-full items-center justify-center text-slate-500">Preparando tu espacio de investigación…</div>;
  const active = workspace.projects.find(p => p.id === workspace.activeId)!;
  function update(change: (p: Project) => Project, text?: string, kind = 'Actividad') {
    const next = change(active);
    if (text) next.events = [{ id: crypto.randomUUID(), text, date: new Date().toISOString(), kind }, ...next.events];
    save({ ...workspace!, projects: workspace!.projects.map(p => p.id === active.id ? next : p) });
  }
  return <Context.Provider value={{ projects: workspace.projects, active, storageWarning,
    select: id => { if (workspace.projects.some(p => p.id === id)) save({ ...workspace, activeId: id }); },
    add: files => { const projects = files.map(f => makeProject(f.name, f.size)); if (projects.length) save({ projects: [...projects, ...workspace.projects], activeId: projects[0].id }); },
    update,
    reevaluate: () => update(p => {
      const count = p.tasks.length;
      const result: Evaluation = { version: p.evaluations.length + 1, date: new Date().toISOString(), readiness: 72 + count * 3, similarity: p.tasks.includes(3) ? 12 : 18, methodology: p.tasks.includes(0) ? 82 : 68, quartile: count === 4 ? 'Q2' : 'Q3' };
      return { ...p, prepared: false, evaluations: [...p.evaluations, result] };
    }, 'Nueva evaluación simulada completada', 'Diagnóstico'),
  }}>{children}</Context.Provider>;
}
export function useWorkspace() { const context = useContext(Context); if (!context) throw new Error('WorkspaceProvider is required'); return context; }
