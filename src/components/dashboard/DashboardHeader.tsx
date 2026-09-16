'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DashboardHeaderProps {
  title: string;
  breadcrumb: string;
  action?: React.ReactNode;
  compact?: boolean;
}

export default function DashboardHeader({ title, breadcrumb, action, compact = false }: DashboardHeaderProps) {
  const [notifications, setNotifications] = useState(false);
  return (
    <header className="min-h-[75px] relative gap-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between px-4 md:px-8 py-3 shrink-0 dark:bg-[#0B1120] dark:border-slate-800">
      <div className="min-w-0 flex flex-col gap-1.5">
        {compact ? <div className="ws-breadcrumb"><span>Espacio de trabajo</span><span aria-hidden="true">/</span><strong>{title}</strong></div> : <><h1 className="text-[20px] font-bold text-slate-900 m-0 leading-tight tracking-tight dark:text-white">{title}</h1>{breadcrumb && <span className="text-[12px] text-slate-500 font-medium dark:text-slate-400">{breadcrumb}</span>}</>}
      </div>

      <div className="flex items-center gap-4">
        {action && (
          <div className="mr-2">
            {action}
          </div>
        )}
        
        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-[12px] font-medium border border-amber-100/50 dark:bg-amber-900/20 dark:text-amber-500 dark:border-amber-900/30">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Créditos <span className="font-extrabold ml-0.5">3</span>
        </div>
        
        <button aria-label="Notificaciones" aria-expanded={notifications} onClick={() => setNotifications(!notifications)} className="relative w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <div className="absolute top-[7px] right-[8px] w-1.5 h-1.5 bg-blue-500 rounded-full border-[1.5px] border-white dark:border-[#0B1120]"></div>
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-200 dark:border-slate-700">
          <span className="ws-user-avatar" aria-label="Andre De La Torre">AT</span>
        </div>
      </div>
      {notifications && <div className="absolute right-4 top-full z-30 bg-white border border-slate-200 rounded-xl p-5 shadow-lg max-w-[300px] dark:bg-slate-900"><p className="text-sm font-semibold">Tu espacio está listo</p><p className="text-xs text-slate-500 my-3">Explora las acciones y novedades de tu investigación.</p><Link href="/dashboard/historial" onClick={() => setNotifications(false)} className="text-xs text-blue-600">Ver actividad →</Link></div>}
    </header>
  );
}
