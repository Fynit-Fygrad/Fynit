'use client';
import { useState } from 'react';
import Link from 'next/link';
import { formatDate, useWorkspace } from '@/components/dashboard/WorkspaceProvider';
import { Page, DocumentBar, Journey, Badge, Icon, ReportButton } from '@/components/dashboard/WorkspaceUI';
export default function History() {
  const { active, reevaluate } = useWorkspace();
  const [filter, setFilter] = useState('Toda la actividad');
  const first = active.evaluations[0];
  const latest = active.evaluations.at(-1)!;
  const events = active.events.filter(e => filter === 'Toda la actividad' || e.kind === filter);
  const comparison = [
    ['Similitud', `${first.similarity}%`, `${latest.similarity}%`, `${latest.similarity - first.similarity} pp`],
    ['Readiness', `${first.readiness}/100`, `${latest.readiness}/100`, `${latest.readiness >= first.readiness ? '+' : ''}${latest.readiness - first.readiness} puntos`],
    ['Nivel editorial', first.quartile, latest.quartile, first.quartile === latest.quartile ? 'Sin cambio' : `${first.quartile} → ${latest.quartile}`],
    ['Calidad metodológica', `${first.methodology}/100`, `${latest.methodology}/100`, `${latest.methodology >= first.methodology ? '+' : ''}${latest.methodology - first.methodology} puntos`],
  ];
  return <Page title="Historial" description="Evaluaciones, cambios y actividad del documento." action={<ReportButton />}>
    <DocumentBar /><Journey />
    <div className="ws-split ws-history-layout">
      <div className="ws-stack">
        <section className="ws-card">
          <div className="ws-section-heading"><div><h3>Comparación de resultados</h3><p>Evaluación inicial y último resultado disponible.</p></div><Badge>{active.evaluations.length} evaluaciones</Badge></div>
          <div className="ws-table-wrap"><table className="ws-table ws-comparison-table"><thead><tr><th>Indicador</th><th>Inicial</th><th>Actual</th><th>Variación</th></tr></thead><tbody>{comparison.map(([label, before, after, change]) => <tr key={label}><td>{label}</td><td className="ws-muted">{before}</td><td><strong>{after}</strong></td><td><span className={before !== after ? 'ws-delta' : 'ws-muted'}>{change}</span></td></tr>)}</tbody></table></div>
          <div className="ws-section-footer"><span className="ws-muted">Última evaluación: {formatDate(latest.date)}</span><button className="ws-text-button" disabled={!active.tasks.length} onClick={reevaluate}>Reevaluar<Icon name="arrow" /></button></div>
        </section>
        <section className="ws-card"><div className="ws-section-heading"><h3>Registro de actividad</h3><select className="ws-select" aria-label="Filtrar actividad" value={filter} onChange={e => setFilter(e.target.value)}>{['Toda la actividad', 'Diagnóstico', 'Mejora', 'Experto', 'Envío'].map(f => <option key={f}>{f}</option>)}</select></div>
          <ol className="ws-timeline">{events.map(e => <li key={e.id}><div><strong>{e.text}</strong><small>{e.kind}</small></div><time dateTime={e.date}>{formatDate(e.date)}</time></li>)}</ol>{!events.length && <p className="ws-muted">No hay actividad para este filtro.</p>}
        </section>
      </div>
      <aside className="ws-stack ws-side-panel"><section className="ws-card"><h3>Evaluaciones guardadas</h3><div className="ws-versions">{[...active.evaluations].reverse().map(e => <div className="ws-version" key={e.version}><span className="ws-version-number">{String(e.version).padStart(2,'0')}</span><div><strong>Evaluación {e.version}</strong><p>{formatDate(e.date)}</p></div><span className="ws-version-score">{e.readiness}<small>/100</small></span></div>)}</div></section><div className="ws-callout"><h3>Preparación editorial</h3><p>Consulta los requisitos pendientes antes del envío.</p><Link className="ws-text-button" href="/dashboard/envio">Preparar envío<Icon name="arrow" /></Link></div></aside>
    </div>
  </Page>;
}
