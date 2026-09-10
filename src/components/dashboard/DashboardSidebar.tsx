'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Inicio', path: '/dashboard/inicio', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Diagnósticos', path: '/dashboard/diagnosticos', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Mis documentos', path: '/dashboard/documentos', icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2' },
    { name: 'Revistas sugeridas', path: '/dashboard/revistas', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
    { name: 'Riesgos detectados', path: '/dashboard/riesgos', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { name: 'Plan de acción', path: '/dashboard/plan', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'Red de expertos', path: '/dashboard/expertos', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Historial', path: '/dashboard/historial', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <aside className="w-[220px] bg-[#fdfdfd] border-r border-slate-100 flex flex-col h-full z-50 shrink-0 relative dark:bg-[#0B1120] dark:border-slate-800">
      {/* Top Logo Container */}
      <div className="pt-6 pb-3 w-full flex items-center pl-6 shrink-0">
        <Link href="/">
          {/* We use only one image tag and swap source via standard next-themes approach if needed, or just standard logo for now to prevent stacking ghost logos */}
          <img src="/assets/logos svg/logo-fynit.svg" alt="Fynit Logo" className="h-[28px] w-auto" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 pt-2 overflow-y-auto flex flex-col gap-2 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.path);
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-[#f4f7ff] text-[#1b60df] font-medium dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-[#1e293b] font-normal hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <svg className={`w-[16px] h-[16px] shrink-0 ${isActive ? 'text-[#1b60df]' : 'text-[#475569]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-[12px] leading-tight tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-4 shrink-0 pb-5">
        <div className="bg-[#f8fafc] rounded-[14px] p-3.5 mb-3 border border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" className="mb-2" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18h20v2H2v-2zm19-9l-4 3-5-6-5 6-4-3v7h18V9z" />
          </svg>
          <h4 className="text-[13px] font-bold text-[#11244e] mb-1 tracking-wide dark:text-white">
            Upgrade a Pro
          </h4>
          <p className="text-[11px] text-[#64748b] leading-[1.6] mb-3 dark:text-slate-400 font-medium">
            Accede a más diagnósticos, reportes avanzados y análisis ilimitados.
          </p>
          <button className="w-full bg-[#0c1427] hover:bg-slate-800 text-white font-semibold py-1.5 rounded-[6px] text-[11px] transition-colors tracking-wide">
            Actualizar plan
          </button>
        </div>

        <div className="flex items-center gap-2.5 px-1 cursor-pointer group">
          <div className="w-[34px] h-[34px] rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 dark:bg-slate-700 dark:border-slate-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div className="flex-1 overflow-hidden">
            <h5 className="text-[12px] font-medium text-[#0f172a] truncate dark:text-white tracking-tight">Andre De La Torre</h5>
            <p className="text-[10.5px] text-[#64748b] font-normal dark:text-slate-400">Investigador</p>
          </div>
          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </aside>
  );
}
