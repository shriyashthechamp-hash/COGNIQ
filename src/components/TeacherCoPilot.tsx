"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Users, Target, Info, MessageSquare, Zap } from 'lucide-react';

const INSIGHTS = [
  { id: 1, title: 'Cluster Fractal Alert', desc: '4 students (Back-Right) are fracturing on "Quadratic Formula" Step 2.', type: 'Critical', icon: Zap },
  { id: 2, title: 'Mastery Accelerator', desc: 'Grade 10 is 14% ahead of projection. Recalibrate pace for "Exponential Growth".', type: 'Optimize', icon: Target },
  { id: 3, title: 'Grouping Suggestion', desc: 'Sync ID-2409 (Critical) with ID-2412 (Stable) for collaborative realignment.', type: 'Action', icon: Users },
];

export function TeacherCoPilot() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0B0F1A]/40 border-l border-white/5 overflow-hidden">
      <div className="p-8 border-b border-white/[0.03] bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-2">
           <Sparkles className="w-3 h-3 text-blue-500" />
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Mission Intelligence</span>
        </div>
        <h3 className="text-xl font-serif font-light text-white tracking-tight">AI Co-pilot</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {INSIGHTS.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-2xl border transition-all hover:bg-white/[0.02] cursor-default border-white/5 ${insight.type === 'Critical' ? 'bg-rose-500/[0.03]' : 'bg-white/[0.01]'}`}
          >
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                  <insight.icon className={`w-3 h-3 ${insight.type === 'Critical' ? 'text-rose-500' : 'text-blue-500'}`} />
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${insight.type === 'Critical' ? 'text-rose-500' : 'text-slate-500'}`}>{insight.title}</span>
               </div>
               <Info className="w-3 h-3 text-slate-700 hover:text-white transition-colors cursor-pointer" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium uppercase tracking-widest">{insight.desc}</p>
            
            <button className="mt-4 w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] font-bold uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group">
               Deploy Correction <MessageSquare className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        ))}

        {/* Neural Activity Simulation */}
        <div className="pt-8 border-t border-white/[0.03] space-y-4">
           <div className="flex justify-between items-center text-[8px] font-bold text-slate-600 uppercase tracking-widest">
              <span>Session Momentum</span>
              <span>12.4x Speed</span>
           </div>
           <div className="flex gap-1 h-8 items-end">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [10, 20 + Math.random() * 20, 10] }}
                  transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                  className="flex-1 bg-blue-500/20 rounded-t-sm"
                />
              ))}
           </div>
        </div>
      </div>

      <div className="p-4 bg-white/[0.02] border-t border-white/[0.03] text-center">
         <span className="text-[7px] font-bold text-slate-800 uppercase tracking-[0.6em]">Cognitive Velocity Authorized</span>
      </div>
    </div>
  );
}
