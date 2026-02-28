"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const NODES = [...Array(12)].map((_, i) => ({
  id: i,
  angle: (i / 12) * Math.PI * 2,
  distance: 120 + Math.random() * 40,
  size: 4 + Math.random() * 6,
  speed: 0.2 + Math.random() * 0.5
}));

export function CognitiveTopology() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 relative overflow-hidden bg-[#0A0E17]/30">
      {/* Background Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        {[100, 160, 220].map((radius) => (
          <div 
            key={radius}
            className="absolute rounded-full border border-blue-500"
            style={{ width: radius * 2, height: radius * 2 }}
          />
        ))}
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Central Intelligence Node */}
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.2)",
              "0 0 40px rgba(59, 130, 246, 0.4)",
              "0 0 20px rgba(59, 130, 246, 0.2)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="z-10 bg-blue-600 p-4 rounded-full border border-blue-400/50 shadow-blue-500/50"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>

        {/* Orbitals */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="neuralPath" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {NODES.map((node) => (
          <motion.div
            key={node.id}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 / node.speed, repeat: Infinity, ease: "linear" }}
            className="absolute flex items-center justify-center"
            style={{ width: node.distance * 2, height: node.distance * 2 }}
          >
            <div className="relative w-full h-full">
               <motion.div
                 animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                 transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                 className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-400 rounded-full blur-[2px]"
                 style={{ width: node.size, height: node.size }}
               />
               
               {/* Pulsing Signal Trail */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: [0, 0.3, 0], scale: [1, 1.5, 2] }}
                 transition={{ duration: 3, repeat: Infinity, delay: node.id * 0.2 }}
                 className="absolute top-0 left-1/2 -translate-x-1/2 border border-blue-500/30 rounded-full"
                 style={{ width: node.size * 4, height: node.size * 4, marginTop: -node.size * 1.5 }}
               />
            </div>
          </motion.div>
        ))}

        {/* Neural Connectors Simulation (Static SVG Layer) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
           {NODES.map((node, i) => (
             <motion.line 
               key={i}
               x1="50%" y1="50%"
               x2="50%" y2={`calc(50% - ${node.distance}px)`}
               stroke="url(#neuralPath)"
               strokeWidth="1"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0.1, 0.4, 0.1] }}
               transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
               style={{ transformOrigin: 'center', transform: `rotate(${node.angle}rad)` }}
             />
           ))}
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 flex flex-col gap-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Network Topology</span>
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
           <span className="text-[8px] font-mono text-blue-400 font-bold">12.4k Active Neural Vectors</span>
        </div>
      </div>
    </div>
  );
}
