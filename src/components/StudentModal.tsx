"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, BrainCircuit, ShieldAlert, TrendingDown } from 'lucide-react';

interface StudentModalProps {
  student: any;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentModal({ student, isOpen, onClose }: StudentModalProps) {
  if (!student) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0F1A]/80 backdrop-blur-xl z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
            className="fixed left-1/2 top-1/2 w-full max-w-3xl bg-[#0E131F] border border-white/5 rounded-3xl shadow-3xl z-[250] overflow-hidden"
          >
            {/* Header */}
            <div className="p-10 border-b border-white/[0.03] flex justify-between items-start bg-white/[0.01]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase italic">Detailed Cognitive Profile</span>
                </div>
                <h2 className="text-3xl font-serif font-light text-white leading-tight">Student-ID-{student.id}</h2>
                <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Grade 10 • Mathematics</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-all transform hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Core Metrics */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-6 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-emerald-500" /> Mastery Vectors
                  </h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Algebraic Manipulation', val: 82 },
                      { label: 'Conceptual Integration', val: 45 },
                      { label: 'Retention Stability', val: 68 },
                    ].map((m, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
                          <span>{m.label}</span>
                          <span className="text-blue-500">{m.val}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${m.val}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                  <h4 className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3" /> Critical Fracture Points
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Student exhibits significant performance decay in **Abstract Variable Mapping**. Retention models suggest a high risk of failure in upcoming calculus units.
                  </p>
                </div>
              </div>

              {/* Right Column: AI Analysis */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-6 flex items-center gap-2">
                    <BrainCircuit className="w-3 h-3 text-blue-500" /> Intelligence Prediction
                  </h3>
                  <div className="glass-panel p-6 bg-white/[0.02]">
                    <div className="text-4xl font-light text-white tracking-tighter mb-2">92%</div>
                    <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4 italic">Recovery Potential</div>
                    <p className="text-slate-500 text-xs leading-relaxed italic">
                      "A surgical focus on prime-node concepts will likely restore 100% stability within 14 days of targeted reinforcement."
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-500/10 active:scale-[0.98]">
                    Send Reinforcement Plan
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-6 py-4 rounded-xl font-bold text-[9px] uppercase tracking-[0.3em] transition-all border border-white/5">
                    Download Full PDF Dossier
                  </button>
                </div>
              </div>
            </div>

            {/* Footer / Status */}
            <div className="p-6 bg-white/[0.01] border-t border-white/[0.03] text-center">
               <span className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.5em]">Cognitive Simulation - Version 2.0.4-Alpha</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
