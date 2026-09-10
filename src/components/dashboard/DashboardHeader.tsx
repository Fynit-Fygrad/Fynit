'use client';

import React from 'react';

interface DashboardHeaderProps {
  title: string;
  breadcrumb: string;
  action?: React.ReactNode;
}

export default function DashboardHeader({ title, breadcrumb, action }: DashboardHeaderProps) {
  return (
    <header className="h-[75px] border-b border-slate-100 bg-white flex items-center justify-between px-8 shrink-0 dark:bg-[#0B1120] dark:border-slate-800">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[20px] font-bold text-slate-900 m-0 leading-tight tracking-tight dark:text-white">{title}</h1>
        {breadcrumb && <span className="text-[12px] text-slate-500 font-medium dark:text-slate-400">{breadcrumb}</span>}
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
        
        <button className="relative w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <div className="absolute top-[7px] right-[8px] w-1.5 h-1.5 bg-blue-500 rounded-full border-[1.5px] border-white dark:border-[#0B1120]"></div>
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-200 dark:border-slate-700">
          <img src="/assets/imgs png/mascot_peeking.webp" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
