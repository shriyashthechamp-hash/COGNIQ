"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, AlertTriangle, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { HeatmapSVG } from './HeatmapSVG';
import { TrendChart } from './TrendChart';

export function InstitutionalDashboard() {
  const stats = [
    { label: 'Active Scans', value: '1,248', icon: Users, color: 'text-blue-500', border: 'border-blue-500/20' },
    { label: 'Avg Mastery', value: '76.4%', icon: GraduationCap, color: 'text-emerald-500', border: 'border-emerald-500/20' },
    { label: 'Critical Risk', value: '12%', icon: AlertTriangle, color: 'text-rose-500', border: 'border-rose-500/20' },
    { label: 'Weakest Link', value: 'Quadratic', icon: BookOpen, color: 'text-amber-500', border: 'border-amber-500/20' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* HEADER */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-blue-500/50"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase italic">Institutional Monitoring</span>
          </div>
          <h2 className="text-4xl font-serif font-light text-white leading-tight">System Intelligence Snapshot</h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Network Active
        </motion.div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel p-8 space-y-4 border-t-2 ${stat.border} hover:bg-white/[0.04] transition-colors group cursor-default`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{stat.label}</span>
              <stat.icon className={`w-4 h-4 \${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div className="text-3xl font-light text-white tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* MAIN VISUALS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Heatmap Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="glass-panel overflow-hidden border-white/[0.03] min-h-[400px] flex flex-col bg-white/[0.01]"
        >
          <div className="p-8 border-b border-white/[0.03] flex justify-between items-center bg-[#0B0F1A]/50">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Concept Attrition Heatmap</h3>
            <span className="text-[8px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded tracking-tighter uppercase">High Resolution</span>
          </div>
          <div className="flex-1">
            <HeatmapSVG />
          </div>
        </motion.div>

        {/* Trend Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="glass-panel overflow-hidden border-white/[0.03] min-h-[400px] flex flex-col bg-white/[0.01]"
        >
          <div className="p-8 border-b border-white/[0.03] flex justify-between items-center bg-[#0B0F1A]/50">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Cognitive Acceleration</h3>
            <TrendingUp className="w-3 h-3 text-emerald-500 opacity-50" />
          </div>
          <div className="flex-1">
            <TrendChart />
          </div>
        </motion.div>
      </div>

      {/* STUDENT GRID */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-10 border-white/[0.03]"
      >
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Critical Intelligence Grid</h3>
          <div className="flex gap-4">
            <button className="text-[9px] font-bold text-blue-500 border border-blue-500/30 px-4 py-1.5 rounded-full hover:bg-blue-500/5 transition-all uppercase tracking-widest">Generate Report</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[...Array(6)].map((_, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -4 }}
               className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all group flex flex-col justify-between min-h-[140px]"
             >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Grade 10 • Mathematics</p>
                    <p className="text-white text-sm font-medium tracking-tight">Student-ID-{(2409 + i).toString()}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">High Risk</span>
                    <span className="text-2xl font-light text-white tracking-tighter">{68 + i * 3}%</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/[0.03] flex justify-between items-center">
                  <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Last Activity: 12m ago</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-blue-500 uppercase tracking-widest">View Profile →</button>
                </div>
             </motion.div>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
