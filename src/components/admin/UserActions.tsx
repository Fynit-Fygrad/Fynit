'use client';
import { useActionState, useRef, useState } from 'react';
import { manageUser } from '@/app/actions/admin';

export default function UserActions({ user }: { user: { id: string; name: string; email: string; isActive: boolean; updatedAt: string } }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [state, action, pending] = useActionState(manageUser, null);
  const [operation, setOperation] = useState(user.isActive ? 'DEACTIVATE' : 'ACTIVATE');
  return <>
    <button className="ad-text-button" onClick={() => { setOperation(user.isActive ? 'DEACTIVATE' : 'ACTIVATE'); dialog.current?.showModal(); }}>Administrar<span className="sr-only"> a {user.name}</span> <span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className="ad-dialog" aria-labelledby={`manage-${user.id}`} onCancel={e => { if (pending) e.preventDefault(); }}>
      <div className="ad-dialog-heading"><div><span className="ad-kicker">GESTIÓN DE CUENTA</span><h2 id={`manage-${user.id}`}>{user.name}</h2><p>{user.email}</p></div><button aria-label="Cerrar" disabled={pending} onClick={() => dialog.current?.close()}>×</button></div>
      <form action={action} key={user.updatedAt}>
        <input type="hidden" name="userId" value={user.id} /><input type="hidden" name="updatedAt" value={user.updatedAt} />
        <label htmlFor={`operation-${user.id}`}>Acción</label>
        <select id={`operation-${user.id}`} name="action" value={operation} onChange={e => setOperation(e.target.value)} disabled={pending}>
          <option value="DEACTIVATE" disabled={!user.isActive}>Desactivar cuenta</option>
          <option value="ACTIVATE" disabled={user.isActive}>Reactivar cuenta</option>
          <option value="REVOKE_SESSIONS">Cerrar todas las sesiones</option>
        </select>
        <p className="ad-action-explanation">{operation === 'DEACTIVATE' ? 'Se bloqueará el acceso a Fynit y se invalidarán las sesiones abiertas. Los datos del usuario se conservarán.' : operation === 'ACTIVATE' ? 'El usuario podrá volver a iniciar sesión con sus credenciales. Las sesiones antiguas no se recuperarán.' : 'Se cerrará el acceso de todas las sesiones actuales. El usuario deberá iniciar sesión de nuevo.'}</p>
        <label htmlFor={`reason-${user.id}`}>Motivo del cambio</label>
        <textarea id={`reason-${user.id}`} name="reason" placeholder="Describe brevemente el motivo…" required minLength={5} maxLength={500} rows={3} disabled={pending} />
        <small>Este motivo quedará registrado junto con tu cuenta y la fecha.</small>
        {state && <p role={state.success ? 'status' : 'alert'} className={state.success ? 'ad-feedback success' : 'ad-feedback error'}>{state.message}</p>}
        <div className="ad-dialog-footer"><button type="button" className="ad-button secondary" disabled={pending} onClick={() => dialog.current?.close()}>Cerrar</button><button className={`ad-button ${operation === 'DEACTIVATE' ? 'danger' : ''}`} disabled={pending}>{pending ? 'Guardando…' : 'Confirmar cambio'}</button></div>
      </form>
    </dialog>
  </>;
}
