"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, AlertTriangle, BookOpen, GraduationCap, TrendingUp, Search, BarChart3, Globe, Zap } from 'lucide-react';
import { HeatmapSVG } from './HeatmapSVG';
import { TrendChart } from './TrendChart';
import { StudentModal } from './StudentModal';
import { InstitutionalPDF } from './InstitutionalPDF';

export function InstitutionalDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'standard' | 'comparison'>('standard');

  const stats = [
    { label: 'Active Scans', value: '1,248', icon: Users, color: 'text-blue-500', border: 'border-blue-500/20' },
    { label: 'Avg Mastery', value: '76.4%', icon: GraduationCap, color: 'text-emerald-500', border: 'border-emerald-500/20' },
    { label: 'Critical Risk', value: '12%', icon: AlertTriangle, color: 'text-rose-500', border: 'border-rose-500/20' },
    { label: 'Weakest Link', value: 'Quadratic', icon: BookOpen, color: 'text-amber-500', border: 'border-amber-500/20' },
  ];

  const students = [
    { id: '2409', grade: '10', subject: 'Math', risk: 82, status: 'Critical' },
    { id: '2410', grade: '11', subject: 'Math', risk: 45, status: 'Stable' },
    { id: '2411', grade: '10', subject: 'Math', risk: 78, status: 'Critical' },
    { id: '2412', grade: '12', subject: 'Math', risk: 32, status: 'Stable' },
    { id: '2413', grade: '10', subject: 'Math', risk: 89, status: 'Critical' },
    { id: '2414', grade: '9', subject: 'Math', risk: 55, status: 'At-Risk' },
  ];

  const cohorts = [
    { name: 'Grade 09', mastery: 68, risk: 18, color: 'text-blue-500' },
    { name: 'Grade 10', mastery: 72, risk: 24, color: 'text-emerald-500' },
    { name: 'Grade 11', mastery: 84, risk: 8, color: 'text-amber-500' },
    { name: 'Grade 12', mastery: 91, risk: 4, color: 'text-rose-500' },
  ];

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.id.includes(searchQuery);
    const matchesFilter = filter === 'All' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div id="institutional-dashboard" className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* HEADER */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-blue-500/50"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase italic">Institutional Monitoring</span>
          </div>
          <h2 className="text-4xl font-serif font-light text-white leading-tight">System Intelligence Snapshot</h2>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setViewMode('standard')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${viewMode === 'standard' ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <Activity className="w-3 h-3" /> Real-time Nodes
            </button>
            <button 
              onClick={() => setViewMode('comparison')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${viewMode === 'comparison' ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <BarChart3 className="w-3 h-3" /> Cohort Cross-Section
            </button>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-6">
          <InstitutionalPDF />
          <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Network Active
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'standard' ? (
          <motion.div
            key="standard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-10"
          >
            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                    <stat.icon className={`w-4 h-4 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <div className="text-3xl font-light text-white tracking-tight">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* MAIN VISUALS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-panel overflow-hidden border-white/[0.03] min-h-[400px] flex flex-col bg-white/[0.01]">
                <div className="p-8 border-b border-white/[0.03] flex justify-between items-center bg-[#0B0F1A]/50">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Concept Attrition Heatmap</h3>
                  <span className="text-[8px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded tracking-tighter uppercase">High Resolution</span>
                </div>
                <div className="flex-1">
                  <HeatmapSVG />
                </div>
              </div>

              <div className="glass-panel overflow-hidden border-white/[0.03] min-h-[400px] flex flex-col bg-white/[0.01]">
                <div className="p-8 border-b border-white/[0.03] flex justify-between items-center bg-[#0B0F1A]/50">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Cognitive Acceleration</h3>
                  <TrendingUp className="w-3 h-3 text-emerald-500 opacity-50" />
                </div>
                <div className="flex-1">
                  <TrendChart />
                </div>
              </div>
            </div>

            {/* STUDENT GRID */}
            <div className="glass-panel p-10 border-white/[0.03]">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">Critical Intelligence Grid</h3>
                  <p className="text-slate-600 text-[10px] uppercase tracking-widest leading-none">Showing {filteredStudents.length} identified clusters</p>
                </div>
                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                  <div className="relative flex-1 lg:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
                    <input 
                      type="text" 
                      placeholder="Search ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-[10px] text-white focus:outline-none focus:border-blue-500/40 transition-all uppercase tracking-widest"
                    />
                  </div>
                  <div className="flex gap-2">
                    {['All', 'Critical', 'At-Risk', 'Stable'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border ${filter === f ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredStudents.map((s) => (
                   <motion.div 
                     key={s.id} 
                     layout
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     whileHover={{ y: -4 }}
                     onClick={() => handleStudentClick(s)}
                     className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all group flex flex-col justify-between min-h-[140px] cursor-pointer"
                   >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Grade {s.grade} • Mathematics</p>
                          <p className="text-white text-sm font-medium tracking-tight">Student-ID-{s.id}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`text-[10px] font-bold uppercase tracking-tighter ${s.status === 'Critical' ? 'text-rose-500' : s.status === 'At-Risk' ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {s.status}
                          </span>
                          <span className="text-2xl font-light text-white tracking-tighter">{s.risk}%</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-white/[0.03] flex justify-between items-center">
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Last Activity: 12m ago</span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-blue-500 uppercase tracking-widest">Analyze Data →</button>
                      </div>
                   </motion.div>
                 ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {cohorts.map((cohort, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 border-white/[0.03] flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Globe className={`w-5 h-5 ${cohort.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-light text-white tracking-tighter">{cohort.name}</p>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">Mastery Profile</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                       <span>Aggregate Mastery</span>
                       <span className="text-white">{cohort.mastery}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cohort.mastery}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                       <span>Fracture Risk Velocity</span>
                       <span className="text-rose-500">{cohort.risk}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cohort.risk}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-rose-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-700">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-blue-500" />
                    Momentum: +2.4pts
                  </div>
                  <button className="text-blue-500 hover:text-white transition-colors">Compare Stats →</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <StudentModal 
        student={selectedStudent} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
