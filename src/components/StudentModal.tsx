"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, BrainCircuit, ShieldAlert, TrendingDown, Target, Zap } from 'lucide-react';
import { CognitiveHealthMonitor } from './CognitiveHealthMonitor';

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
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B0F1A]/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0E131F] border border-white/5 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] h-[80vh] lg:h-[600px]">
              {/* Left Side: Cognitive Profile */}
              <div className="p-10 overflow-y-auto space-y-10 border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Cognitive Dossier</span>
                    </div>
                    <h2 className="text-3xl font-serif font-light text-white leading-tight">Student ID-{student.id}</h2>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">Mathematics • Grade {student.grade} • Class 10-B</p>
                  </div>
                  <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-500 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <Activity className="w-4 h-4 text-blue-500 mb-2" />
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Mastery Velocity</p>
                    <p className="text-xl font-light text-white tracking-tight">{100 - student.risk}%</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-rose-500">
                    <ShieldAlert className="w-4 h-4 mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Fracture Risk</p>
                    <p className="text-xl font-light tracking-tight">{student.risk}%</p>
                  </div>
                </div>

                {/* Cognitive Health Monitor Integration */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intelligence Vitals</h4>
                  <CognitiveHealthMonitor 
                    level={100 - (student.risk * 0.8) - (Math.random() * 10)} 
                    isOverloaded={student.status === 'Critical'} 
                  />
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Concept Vector Analysis</h4>
                  <div className="space-y-4">
                    {['Algebraic Loops', 'Trigonometric Sync', 'Calculus Overload'].map((c, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                           <span className="text-slate-400">{c}</span>
                           <span className="text-white">{Math.floor(60 + Math.random() * 30)}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500/50 w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: AI Insights & Radar */}
              <div className="p-10 bg-white/[0.01] overflow-y-auto space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-blue-500" />
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Neural Intelligence Feed</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Zap, text: 'Identifying logic fracture in Step 2 of Quadratic Equations.', color: 'text-rose-500', bg: 'bg-rose-500/10' },
                      { icon: Target, text: 'Strong alignment with spatial reasoning clusters.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                      { icon: TrendingDown, text: 'Focus velocity decreasing. Estimated fatigue threshold in 12m.', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    ].map((insight, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04]">
                        <div className={`p-2 rounded-lg ${insight.bg}`}>
                          <insight.icon className={`w-3 h-3 ${insight.color}`} />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{insight.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5 space-y-6">
                  <h4 className="text-[10px] font-bold font-serif italic text-slate-500">Authorized Actions</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <button className="py-3 bg-blue-600 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                        Sync Data
                     </button>
                     <button className="py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                        Alert Parent
                     </button>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                   <p className="text-[8px] font-bold text-blue-500 uppercase tracking-[0.4em] mb-1 italic text-center">Cognitive Velocity Index</p>
                   <div className="h-10 flex items-end gap-1 px-4">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 bg-blue-500/20 h-full rounded-t-sm" style={{ height: `${20 + Math.random() * 80}%` }} />
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
