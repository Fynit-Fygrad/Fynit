'use client';

import React from 'react';

interface DataPoint {
  label: string;
  value: number; // 0 to 100
}

interface EvolutionChartProps {
  data: DataPoint[];
}

export default function EvolutionChart({ data }: EvolutionChartProps) {
  // SVG dimensions
  const width = 600;
  const height = 200;
  
  // Chart area
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 40;
  const paddingBottom = 40;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  // Calculate X and Y coordinates
  const points = data.map((d, i) => {
    const x = data.length === 1 
      ? paddingLeft + chartWidth / 2 
      : paddingLeft + (chartWidth / (data.length - 1)) * i;
    const y = paddingTop + chartHeight - (d.value / 100) * chartHeight;
    return { x, y, value: d.value, label: d.label };
  });

  // Generate SVG path string
  const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  
  // Generate Area path (same as line but closed to bottom)
  const areaD = `${pathD} L ${points[points.length - 1].x},${paddingTop + chartHeight} L ${points[0].x},${paddingTop + chartHeight} Z`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
      <h3 className="text-[12px] font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-6">
        Evolución del Readiness
      </h3>
      
      <div className="flex-1 w-full relative min-h-[200px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blueGradientDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines (Y-axis) */}
          {[0, 50, 100].map(val => {
            const y = paddingTop + chartHeight - (val / 100) * chartHeight;
            return (
              <g key={val}>
                <line 
                  x1={paddingLeft - 10} 
                  y1={y} 
                  x2={width - paddingRight + 10} 
                  y2={y} 
                  className={`stroke-slate-200 dark:stroke-slate-700 ${val === 0 ? 'stroke-slate-300 dark:stroke-slate-600' : ''}`}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}

          {/* Area (Only if multiple points) */}
          {points.length > 1 && (
            <>
              <path 
                d={areaD} 
                fill="url(#blueGradient)" 
                className="dark:hidden"
                vectorEffect="non-scaling-stroke"
              />
              <path 
                d={areaD} 
                fill="url(#blueGradientDark)" 
                className="hidden dark:block"
                vectorEffect="non-scaling-stroke"
              />
            </>
          )}

          {/* Line (Only if multiple points) */}
          {points.length > 1 && (
            <path 
              d={pathD} 
              fill="none" 
              className="stroke-[#2563eb] dark:stroke-[#3b82f6]" 
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          )}

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Outer circle (white bg) */}
              <circle 
                cx={p.x} 
                cy={p.y} 
                r="6" 
                fill="white" 
                className="stroke-[#2563eb] dark:stroke-[#3b82f6] dark:fill-slate-900" 
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </svg>

        {/* Empty State Text for Single Point */}
        {points.length === 1 && (
          <div className="absolute inset-x-0 bottom-0 top-[20px] flex items-center justify-center text-center pointer-events-none px-12">
            <div className="bg-white/80 dark:bg-slate-900/80 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm border border-slate-100 dark:border-slate-800">
              <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
                Este es tu primer análisis.<br/>Sube nuevas versiones para ver tu curva de evolución.
              </p>
            </div>
          </div>
        )}

        {/* Text Labels Overlay */}

        {/* Y-axis labels */}
        {[0, 50, 100].map(val => {
          const topPercent = ((paddingTop + chartHeight - (val / 100) * chartHeight) / height) * 100;
          return (
            <div 
              key={`y-${val}`}
              className="absolute left-0 text-[11px] font-medium text-slate-400 dark:text-slate-500 w-[40px] text-right transform -translate-y-1/2"
              style={{ top: `${topPercent}%` }}
            >
              {val}
            </div>
          );
        })}

        {/* X-axis labels and Values */}
        {points.map((p, i) => {
          const leftPercent = (p.x / width) * 100;
          const topPercent = (p.y / height) * 100;
          return (
            <React.Fragment key={`x-${i}`}>
              {/* Value Text Above Circle */}
              <div 
                className="absolute text-[13px] font-black text-slate-900 dark:text-white transform -translate-x-1/2 -translate-y-full pb-3"
                style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              >
                {p.value}
              </div>
              {/* Label Text Below */}
              <div 
                className="absolute text-[11px] font-medium text-slate-400 dark:text-slate-500 transform -translate-x-1/2 pt-2"
                style={{ left: `${leftPercent}%`, top: `${((paddingTop + chartHeight) / height) * 100}%` }}
              >
                {p.label}
              </div>
            </React.Fragment>
          );
        })}

      </div>
    </div>
  );
}
