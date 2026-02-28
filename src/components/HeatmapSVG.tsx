"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HeatmapNode {
  id: string;
  label: string;
  intensity: number; // 0 to 1
}

const DATA: HeatmapNode[] = [
  { id: '1', label: 'Algebraic Identity', intensity: 0.8 },
  { id: '2', label: 'Quadratic Roots', intensity: 0.95 },
  { id: '3', label: 'Trigonometry', intensity: 0.4 },
  { id: '4', label: 'Calculus Basis', intensity: 0.6 },
  { id: '5', label: 'Statistics', intensity: 0.2 },
  { id: '6', label: 'Probability', intensity: 0.75 },
  { id: '7', label: 'Geometry', intensity: 0.3 },
  { id: '8', label: 'Number Theory', intensity: 0.1 },
  { id: '9', label: 'Matrix Op', intensity: 0.85 },
  { id: '10', label: 'Vector Space', intensity: 0.5 },
  { id: '11', label: 'Logarithms', intensity: 0.65 },
  { id: '12', label: 'Complex No', intensity: 0.45 },
];

export function HeatmapSVG() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {DATA.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
            className="relative aspect-square rounded-lg border border-white/5 flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
            style={{
              backgroundColor: `rgba(59, 130, 246, ${node.intensity * 0.4})`,
            }}
          >
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-tighter text-center px-1">
              {node.label}
            </span>
            {node.intensity > 0.8 && (
              <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
            )}
            
            <div className="absolute bottom-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
              {Math.round(node.intensity * 100)}% Attrition
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
