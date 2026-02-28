"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap, AlertCircle } from 'lucide-react';

const SEATS = [...Array(30)].map((_, i) => ({
  id: 100 + i,
  row: Math.floor(i / 6),
  col: i % 6,
  status: Math.random() > 0.8 ? 'Critical' : Math.random() > 0.6 ? 'At-Risk' : 'Stable',
  focus: Math.floor(60 + Math.random() * 40),
}));

export function ClassroomMap() {
  return (
    <div className="w-full h-full p-8 flex flex-col items-center justify-center bg-[#0A0E17]/20">
      <div className="mb-12 w-full max-w-md h-2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full flex items-center justify-center">
        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.5em] -translate-y-6">Front of Classroom (Board)</span>
      </div>

      <div className="grid grid-cols-6 gap-6">
        {SEATS.map((seat) => (
          <motion.div
            key={seat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (seat.row * 6 + seat.col) * 0.02 }}
            className={`relative w-12 h-14 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer ${
              seat.status === 'Critical' 
                ? 'bg-rose-500/10 border-rose-500/30' 
                : seat.status === 'At-Risk' 
                ? 'bg-amber-500/10 border-amber-500/30' 
                : 'bg-white/5 border-white/10 hover:border-blue-500/30'
            }`}
          >
            <User className={`w-5 h-5 ${seat.status === 'Critical' ? 'text-rose-500' : seat.status === 'At-Risk' ? 'text-amber-500' : 'text-slate-500'}`} />
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1 rounded-full ${i < (seat.focus / 33) ? 'bg-blue-500' : 'bg-white/5'}`} />
              ))}
            </div>

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-[#0E131F] border border-white/5 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 w-32">
              <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">ID-{seat.id}</p>
              <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
                 <span className="text-[8px] font-bold text-slate-500 uppercase">Focus</span>
                 <span className="text-[8px] font-bold text-blue-400">{seat.focus}%</span>
              </div>
              <div className="mt-1 flex justify-between items-center bg-white/5 p-1.5 rounded">
                 <span className="text-[8px] font-bold text-slate-500 uppercase">Status</span>
                 <span className={`text-[8px] font-bold ${seat.status === 'Critical' ? 'text-rose-500' : 'text-emerald-500'}`}>{seat.status}</span>
              </div>
            </div>

            {/* Neural Connector Simulation (Pulse) */}
            {seat.status === 'Critical' && (
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-xl border border-rose-500/50"
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex gap-8">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-rose-500" />
           <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Immediate Attention</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-3 flex gap-0.5">
              <div className="w-1 h-full bg-blue-500 rounded-full" />
              <div className="w-1 h-full bg-blue-500 rounded-full" />
           </div>
           <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Cognitive Focus Velocity</span>
        </div>
      </div>
    </div>
  );
}
