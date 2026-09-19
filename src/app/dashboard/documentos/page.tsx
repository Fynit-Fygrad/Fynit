'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWorkspace, formatDate, projectStatus } from '@/components/dashboard/WorkspaceProvider';
import { Page, Badge, Icon, Empty } from '@/components/dashboard/WorkspaceUI';

export default function Documents() {
  const { projects, active, select } = useWorkspace();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [sort, setSort] = useState('recent');
  const visible = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && (filter === 'Todos' || projectStatus(p) === filter))
    .sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name, 'es') : new Date(b.evaluations.at(-1)!.date).getTime() - new Date(a.evaluations.at(-1)!.date).getTime());
  function open(id: string) { select(id); router.push('/dashboard/diagnosticos'); }
  return <Page title="Mis documentos" description="Administra tus manuscritos y consulta sus evaluaciones." action={<Link className="ws-button" href="/dashboard/inicio"><Icon name="plus" />Subir documento</Link>}>
    <section className="ws-library" aria-label="Biblioteca de documentos">
      <div className="ws-toolbar ws-library-tools">
        <div className="ws-search"><Icon name="search" /><input aria-label="Buscar documentos" placeholder="Buscar documento" value={search} onChange={e => setSearch(e.target.value)} /></div>
        <select aria-label="Ordenar documentos" className="ws-select" value={sort} onChange={e => setSort(e.target.value)}><option value="recent">Evaluación más reciente</option><option value="name">Nombre: A–Z</option></select>
      </div>
      {visible.length ? <div className="ws-table-wrap"><table className="ws-table">
        <thead><tr><th>Nombre del documento</th><th>Última evaluación</th><th>Readiness</th><th>Estado</th><th><span className="sr-only">Acciones</span></th></tr></thead>
        <tbody>{visible.map(p => <tr key={p.id} data-active={p.id === active.id}>
          <td><div className="ws-file"><span className={`ws-file-type ${p.name.endsWith('.pdf') ? 'pdf' : ''}`}>{p.name.split('.').at(-1)?.toUpperCase()}</span><div><button className="ws-document-name" onClick={() => open(p.id)}>{p.name.replace(/\.(pdf|docx)$/i, '')}</button><small>{p.size} <span>·</span> Evaluación {p.evaluations.length}{p.id === active.id && <span className="ws-active-label">Documento activo</span>}</small></div></div></td>
          <td className="ws-muted">{formatDate(p.evaluations.at(-1)!.date)}</td>
          <td><div className="ws-score"><strong>{p.evaluations.at(-1)!.readiness}<small>/100</small></strong><span><i style={{width:`${p.evaluations.at(-1)!.readiness}%`}} /></span></div></td>
          <td><Badge tone={p.prepared ? 'green' : p.evaluations.length > 1 ? 'blue' : 'amber'}>{projectStatus(p)}</Badge></td>
          <td><button className="ws-text-button" aria-label={`Abrir ${p.name}`} onClick={() => open(p.id)}>Abrir<Icon name="arrow" /></button></td>
        </tr>)}</tbody>
      </table></div> : <Empty text="Prueba otro nombre o cambia el filtro de estado." />}
      <footer className="ws-library-footer"><span>{visible.length} de {projects.length} documentos</span><span>PDF y DOCX · Hasta 50 MB por archivo</span></footer>
    </section>
    <p className="ws-local-note">Los documentos y el progreso de esta demostración se conservan en este navegador.</p>
  </Page>;
}
