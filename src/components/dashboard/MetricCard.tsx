'use client';

import React from 'react';

export type MetricColor = 'green' | 'blue' | 'orange' | 'amber';

interface MetricCardProps {
  title: string;
  mainValue: string;
  badgeText: string;
  badgeColor: MetricColor;
  description: string;
  chartValue: number; // 0 to 100
  chartColor: MetricColor;
  chartLabelMain: string;
  chartLabelSub: string;
}

const colorMap = {
  green: {
    badgeBg: 'bg-green-100/60 dark:bg-green-900/30',
    badgeText: 'text-green-700 dark:text-green-400',
    badgeDot: 'bg-green-500',
    chartStroke: 'stroke-[#10b981]' // emerald-500
  },
  blue: {
    badgeBg: 'bg-blue-100/60 dark:bg-blue-900/30',
    badgeText: 'text-blue-700 dark:text-blue-400',
    badgeDot: 'bg-blue-500',
    chartStroke: 'stroke-[#2563eb]' // blue-600
  },
  orange: {
    badgeBg: 'bg-orange-100/60 dark:bg-orange-900/30',
    badgeText: 'text-orange-700 dark:text-orange-400',
    badgeDot: 'bg-orange-500',
    chartStroke: 'stroke-[#ea580c]' // orange-600 (darker orange for Nivel Editorial)
  },
  amber: {
    badgeBg: 'bg-amber-100/60 dark:bg-amber-900/30',
    badgeText: 'text-amber-700 dark:text-amber-400',
    badgeDot: 'bg-amber-500',
    chartStroke: 'stroke-[#f59e0b]' // amber-500 (lighter orange for Metodologia)
  }
};

export default function MetricCard({
  title,
  mainValue,
  badgeText,
  badgeColor,
  description,
  chartValue,
  chartColor,
  chartLabelMain,
  chartLabelSub
}: MetricCardProps) {
  // SVG Gauge calculations
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  
  // Actually, looking at the mockup, it's not a full circle. It has a gap at the bottom.
  // A standard way to do this is to rotate the SVG and use dasharray to create the gap.
  // The mockup shows the gap is at the bottom, so it starts at bottom-left and goes to bottom-right.
  // Let's use a 270 degree arc. 
  // We'll rotate the circle by 135 degrees.
  const arcLength = circumference * 0.75; // 75% of the circle is the track
  const gapLength = circumference * 0.25; // 25% is the gap
  
  const strokeDashoffset = arcLength - (chartValue / 100) * arcLength;

  return (
    <div className="bg-white dark:bg-slate-900/60 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm relative overflow-hidden">
      
      {/* Left Content */}
      <div className="flex flex-col flex-1 pr-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span className="text-[11.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        </div>
        
        <h3 className="text-[34px] font-black text-slate-900 dark:text-white leading-none mb-3 tracking-tight">{mainValue}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${colorMap[badgeColor].badgeBg}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${colorMap[badgeColor].badgeDot}`}></div>
            <span className={`text-[11.5px] font-bold ${colorMap[badgeColor].badgeText}`}>{badgeText}</span>
          </div>
        </div>
        
        <p className="text-[12.5px] text-slate-500 dark:text-slate-400 leading-[1.6] pr-2">
          {description}
        </p>
      </div>

      {/* Right Chart */}
      <div className="relative shrink-0 flex items-center justify-center w-[120px] h-[120px]">
        {/* The SVG Donut */}
        <svg width="120" height="120" viewBox="0 0 120 120" className="transform rotate-[135deg]">
          {/* Background Track */}
          <circle 
            cx="60" cy="60" r={radius}
            className="stroke-slate-100 dark:stroke-slate-800/80"
            strokeWidth="11"
            fill="transparent"
            strokeDasharray={`${arcLength} ${gapLength}`}
            strokeLinecap="round"
          />
          {/* Progress Track */}
          <circle 
            cx="60" cy="60" r={radius}
            className={`${colorMap[chartColor].chartStroke} transition-all duration-1000 ease-out`}
            strokeWidth="11"
            fill="transparent"
            strokeDasharray={`${arcLength} ${gapLength}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-1">
          <span className="text-[20px] font-black text-slate-900 dark:text-white leading-none">{chartLabelMain}</span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1">{chartLabelSub}</span>
        </div>
      </div>
    </div>
  );
}
