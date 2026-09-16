'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from './WorkspaceProvider';
import { Badge, Icon } from './WorkspaceUI';
const conferences = [
  { name: 'Conferencia de Innovación Educativa · Ejemplo', area: 'Educación', fit: '88%', time: '2–4 meses', risk: 'Medio' },
  { name: 'Encuentro de Tecnología y Aprendizaje · Ejemplo', area: 'Tecnología', fit: '81%', time: '3–5 meses', risk: 'Bajo' },
];
export function PublicationOptions() {
  const [expanded, setExpanded] = useState(false);
  const [area, setArea] = useState('Todas');
  const { update } = useWorkspace();
  const router = useRouter();
  return <section className="ws-card"><div className="ws-row"><div><h3>También hay un espacio para compartir tus avances</h3><p>Explora conferencias como una ruta complementaria de difusión.</p></div><button className="ws-text-button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Ocultar' : 'Ver conferencias'}<Icon name="arrow" /></button></div>{expanded && <><div className="ws-toolbar" style={{ marginTop: 20 }}><Badge>Convocatorias ficticias de demostración</Badge><select className="ws-select" aria-label="Área de conferencia" value={area} onChange={e => setArea(e.target.value)}>{['Todas', 'Educación', 'Tecnología'].map(a => <option key={a}>{a}</option>)}</select></div><div className="ws-table-wrap"><table className="ws-table"><thead><tr><th>CONFERENCIA</th><th>FIT</th><th>RIESGO</th><th>TIEMPO ESTIMADO</th><th>ACCIÓN</th></tr></thead><tbody>{conferences.filter(c => area === 'Todas' || c.area === area).map(c => <tr key={c.name}><td>{c.name}<p className="ws-muted">{c.area} · Indexación por confirmar</p></td><td>{c.fit}</td><td><Badge tone="amber">{c.risk}</Badge></td><td>{c.time}</td><td><button className="ws-text-button" onClick={() => { update(p => ({ ...p, journal: c.name, prepared: false }), `Destino seleccionado: ${c.name}`, 'Envío'); router.push('/dashboard/envio'); }}>Seleccionar</button></td></tr>)}</tbody></table></div></>}</section>;
}
