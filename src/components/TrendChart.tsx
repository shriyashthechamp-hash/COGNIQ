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

const PREDICTIONS = [
  { x: 100, y: 88 },
  { x: 120, y: 92 },
  { x: 140, y: 95 },
  { x: 160, y: 94 },
];

export function TrendChart() {
  const pathData = POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`).join(' ');
  const predictionData = PREDICTIONS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${100 - p.y}`).join(' ');

  return (
    <div className="w-full h-full p-8 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cognitive Velocity Trend</h4>
          <p className="text-[8px] font-bold text-blue-500/50 uppercase tracking-widest mt-1">Real-time + Predictive Ensemble</p>
        </div>
        <div className="text-right">
          <span className="text-emerald-500 text-[10px] font-bold">+4.2% Growth</span>
          <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Confidence: 94%</p>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <svg viewBox="0 0 160 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map((line) => (
            <line
              key={line}
              x1="0" y1={line} x2="160" y2={line}
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Trend Line (Past) */}
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

          {/* Forecast Trail (Future) */}
          <motion.path
            d={predictionData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
          />
          
          {/* Indicator Pulse at current time */}
          <motion.circle
            cx="100"
            cy={100 - 88}
            r="3"
            stroke="#3B82F6"
            strokeWidth="1"
            fill="transparent"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Points (Past) */}
          {POINTS.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={100 - p.y}
              r="1.5"
              fill={i === POINTS.length - 1 ? "#3B82F6" : "#1E293B"}
              stroke="#3B82F6"
              strokeWidth="0.5"
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

      <div className="flex justify-between mt-6 text-[8px] font-bold text-slate-700 uppercase tracking-[0.3em]">
        <span>Historical Vector</span>
        <span className="text-blue-500/50">4-Week Projection</span>
      </div>
    </div>
  );
}
