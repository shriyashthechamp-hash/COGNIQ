"use client";

import React from 'react';
import { motion } from 'framer-motion';

const POINTS = [
  { x: 0, y: 80 },
  { x: 20, y: 75 },
  { x: 40, y: 85 },
  { x: 60, y: 82 },
  { x: 80, y: 90 },
  { x: 100, y: 88 },
];

export function TrendChart() {
  const pathData = POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`).join(' ');

  return (
    <div className="w-full h-full p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cognitive Velocity Trend</h4>
        <span className="text-emerald-500 text-[10px] font-bold">+4.2% Growth</span>
      </div>
      
      <div className="flex-1 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {[0, 25, 50, 75, 100].map((line) => (
            <line
              key={line}
              x1="0" y1={line} x2="100" y2={line}
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          ))}
          
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {POINTS.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={100 - p.y}
              r="1.5"
              fill="#3B82F6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
            />
          ))}

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex justify-between mt-4 text-[8px] font-bold text-slate-700 uppercase tracking-widest">
        <span>Week 01</span>
        <span>Week 04</span>
      </div>
    </div>
  );
}
