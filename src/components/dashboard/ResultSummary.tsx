'use client';

import React from 'react';

interface ResultSummaryProps {
  text: string;
  globalScore: number;
  statusText: string;
}

export default function ResultSummary({ text, globalScore, statusText }: ResultSummaryProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-[12px] font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
          Resumen General
        </h3>
        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed pr-2">
          {text}
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span className="text-[11.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Puntaje Global
            </span>
          </div>
          <span className="text-[16px] font-black text-slate-900 dark:text-white">{globalScore}/100</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 overflow-hidden">
          <div 
            className="h-full bg-[#2563eb] rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${globalScore}%` }}
          ></div>
        </div>
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100/60 dark:bg-green-900/30">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span className="text-[11.5px] font-bold text-green-700 dark:text-green-400">{statusText}</span>
        </div>
      </div>
    </div>
  );
}
