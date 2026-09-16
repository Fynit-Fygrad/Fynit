'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { actions, useWorkspace } from '@/components/dashboard/WorkspaceProvider';
import { Page, Badge, Icon, DocumentBar, Journey } from '@/components/dashboard/WorkspaceUI';

export default function Plan() {
  const { active, update, reevaluate } = useWorkspace();
  const router = useRouter();
  const [filter, setFilter] = useState('Todas');
  const count = active.tasks.length;
  const visible = actions.map((a, id) => ({ ...a, id })).filter(a => filter === 'Todas' || (filter === 'Completadas' ? active.tasks.includes(a.id) : !active.tasks.includes(a.id)));
  return <Page title="Plan de acción" description="Acciones priorizadas a partir del diagnóstico del manuscrito." action={<button className="ws-button" disabled={!count} onClick={() => { reevaluate(); router.push('/dashboard/historial'); }}><Icon name="chart" />Reevaluar documento</button>}>
    <DocumentBar /><Journey /><div className="ws-split"><section className="ws-card"><div className="ws-row"><div><h3>Acciones de mejora</h3><p>Marca las acciones completadas antes de reevaluar.</p></div><Badge>{count} de 4 completadas</Badge></div><div className="ws-progress" role="progressbar" aria-label="Avance del plan" aria-valuenow={count * 25} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${count * 25}%` }} /></div><div className="ws-toolbar" style={{ marginTop: 22, marginBottom: 0 }}><div className="ws-tabs">{['Todas', 'Pendientes', 'Completadas'].map(f => <button aria-pressed={filter === f} key={f} onClick={() => setFilter(f)}>{f}</button>)}</div><span className="ws-muted">Prioridad más alta primero</span></div>
      {visible.map(a => <label key={a.id} className={`ws-task ${active.tasks.includes(a.id) ? 'ws-task-done' : ''}`}><input type="checkbox" checked={active.tasks.includes(a.id)} onChange={() => update(p => ({ ...p, prepared: false, tasks: p.tasks.includes(a.id) ? p.tasks.filter(id => id !== a.id) : [...p.tasks, a.id] }), `${active.tasks.includes(a.id) ? 'Se reabrió' : 'Se completó'}: ${a.title}`, 'Mejora')} /><div><h4>{a.title}</h4><div className="ws-task-meta"><Badge tone={a.priority === 'Alta' ? 'amber' : 'blue'}>Prioridad {a.priority.toLowerCase()}</Badge><span>{a.area}</span></div><p>{a.detail}</p><div className="ws-task-meta"><Icon name="clock" />{a.time}<span style={{ color: '#248451', marginLeft: 10 }}>Impacto orientativo: {a.impact}</span></div></div></label>)}
      {!visible.length && <p style={{ padding: '30px 0' }}>No hay acciones en este estado.</p>}
    </section><aside className="ws-stack"><div className="ws-card"><h3>Proyección editorial</h3><p>Nivel actual y objetivo de publicación.</p><div className="ws-row" style={{ margin: '26px 0' }}><div><span className="ws-muted">Actual</span><div style={{ fontSize: 32, fontWeight: 700 }}>{active.evaluations.at(-1)!.quartile}</div></div><Icon name="arrow" /><div><span className="ws-muted">Objetivo</span><div style={{ fontSize: 32, fontWeight: 700, color: '#1b60df' }}>Q2</div></div></div><Badge tone="green">{count * 25}% del plan completado</Badge><p style={{ marginTop: 15 }}>El cuartil proyectado se actualiza al reevaluar el documento.</p></div><div className="ws-callout"><Icon name="people" /><h3 style={{ marginTop: 15 }}>Revisión especializada</h3><p>Consulta un especialista para resolver observaciones metodológicas o editoriales.</p><Link className="ws-text-button" href="/dashboard/expertos">Explorar expertos<Icon name="arrow" /></Link></div><Link className="ws-footer-link" href="/dashboard/riesgos">Revisar hallazgos del documento<Icon name="arrow" /></Link></aside></div>
  </Page>;
}
