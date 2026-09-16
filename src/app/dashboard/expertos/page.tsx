'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useWorkspace } from '@/components/dashboard/WorkspaceProvider';
import { Page, DocumentBar, Badge, Icon, Journey, Empty } from '@/components/dashboard/WorkspaceUI';
const experts = [
  { name: 'Dra. Sofía Ramírez', initials: 'SR', field: 'Metodología', experience: '15 años de experiencia · 120 proyectos', description: 'Diseño de investigación, validación de instrumentos y metodología educativa.', price: 120, rating: '4.9', reviews: 128, color: '#edf3ff' },
  { name: 'Dr. Carlos Mendoza', initials: 'CM', field: 'Estadística', experience: '12 años de experiencia · 96 proyectos', description: 'Análisis cuantitativo, modelos estadísticos e interpretación de resultados.', price: 95, rating: '4.8', reviews: 86, color: '#ecf8f1' },
  { name: 'Dra. Lucía Torres', initials: 'LT', field: 'Edición', experience: '10 años de experiencia · 150 proyectos', description: 'Redacción científica, estructura del manuscrito y preparación editorial.', price: 85, rating: '4.9', reviews: 104, color: '#f3eefd' },
];
export default function Experts() {
  const { active, update } = useWorkspace();
  const [filter, setFilter] = useState('Todos');
  const [message, setMessage] = useState('');
  const visible = experts.filter(e => filter === 'Todos' || e.field === filter);
  return <Page title="Red de expertos" description="Especialistas en metodología, estadística y edición científica."><DocumentBar /><Journey />
    <div className="ws-toolbar" style={{ marginBottom: 0 }}><div className="ws-tabs">{['Todos', 'Metodología', 'Estadística', 'Edición'].map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div><span className="ws-muted">Directorio de demostración · Tarifas referenciales</span></div>
    <div className="ws-experts">{visible.map(e => <article className="ws-card ws-expert" key={e.name}>
      <div className="ws-avatar">{e.initials}</div>
      <div className="ws-expert-info"><h3>{e.name}</h3><span className="ws-expert-specialty">{e.field}</span><p>{e.description}</p><p>{e.experience} · {e.rating}/5 ({e.reviews} reseñas)</p></div>
      <div className="ws-expert-actions"><Badge tone="green">Disponible</Badge><strong>$ {e.price}<span className="ws-muted"> / hora</span></strong><button className="ws-button ws-secondary" disabled={active.expert === e.name} onClick={() => update(p => ({ ...p, expert: e.name, reviewed: false, prepared: false, messages: [{ author: e.name, text: 'Revisaremos la metodología y la discusión. Indica qué sección necesitas trabajar.' }] }), 'Revisión solicitada a ' + e.name, 'Experto')}>{active.expert === e.name ? 'Seleccionado' : 'Solicitar revisión'}</button></div>
    </article>)}</div>
    {!visible.length && <Empty text="Selecciona otra especialidad." />}
    {active.expert ? <section className="ws-split"><div className="ws-card"><div className="ws-row"><div><h3>Revisión del documento</h3><p>{active.expert} · Conversación simulada</p></div><Badge tone={active.reviewed ? 'green' : 'blue'}>{active.reviewed ? 'Revisión completada' : 'En revisión'}</Badge></div><div className="ws-chat" aria-live="polite">{active.messages.map((m, i) => <div key={i} className={`ws-message ${m.author === 'Tú' ? 'mine' : ''}`}><small>{m.author}</small>{m.text}</div>)}</div><form className="ws-chat-form" onSubmit={e => { e.preventDefault(); if (!message.trim()) return; update(p => ({ ...p, messages: [...p.messages, { author: 'Tú', text: message.trim() }, { author: p.expert!, text: 'Respuesta de ejemplo: revisa la justificación de la muestra y conecta los resultados con estudios recientes. Encontrarás estas acciones en tu plan de mejora.' }] }), 'Comentario añadido a la revisión simulada', 'Experto'); setMessage(''); }}><input aria-label="Mensaje para el experto simulado" placeholder="Escribe un comentario…" value={message} maxLength={1000} onChange={e => setMessage(e.target.value)} /><button className="ws-button" disabled={!message.trim()}>Enviar</button></form></div><div className="ws-callout"><h3>Estado de la revisión</h3><p>Finaliza la revisión para continuar con la preparación editorial.</p><button className="ws-button" disabled={active.reviewed} onClick={() => update(p => ({ ...p, reviewed: true }), `Revisión simulada completada por ${active.expert}`, 'Experto')}>{active.reviewed ? 'Revisión completada' : 'Completar revisión de prueba'}</button><Link href="/dashboard/plan" className="ws-footer-link">Consultar plan de acción<Icon name="arrow" /></Link></div></section> : <div className="ws-callout"><h3>Sin revisión asignada</h3><p style={{ marginBottom: 0 }}>Selecciona un especialista para iniciar la revisión del manuscrito.</p></div>}
  </Page>;
}
