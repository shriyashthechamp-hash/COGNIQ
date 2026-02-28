"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, AlertTriangle, BookOpen, GraduationCap, TrendingUp, Search, BarChart3, Globe, Zap, Cpu, Wifi, Command, Share2, LayoutGrid, MonitorPlay } from 'lucide-react';
import { HeatmapSVG } from './HeatmapSVG';
import { TrendChart } from './TrendChart';
import { StudentModal } from './StudentModal';
import { InstitutionalPDF } from './InstitutionalPDF';
import { CommandPalette } from './CommandPalette';
import { CognitiveTopology } from './CognitiveTopology';
import { ClassroomMap } from './ClassroomMap';
import { TeacherCoPilot } from './TeacherCoPilot';

export function InstitutionalDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'standard' | 'comparison' | 'topology' | 'teacher'>('standard');
  const [neuralPulse, setNeuralPulse] = useState(false);
  
  // Simulation State
  const [liveStats, setLiveStats] = useState({
    scans: 1248,
    mastery: 76.4,
    ping: 24
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live Simulation Engine & Neural Pulse Trigger
  useEffect(() => {
    const interval = setInterval(() => {
      const pingChange = Math.random() > 0.8;
      if (pingChange) {
        setNeuralPulse(true);
        setTimeout(() => setNeuralPulse(false), 1000);
      }

      setLiveStats(prev => ({
        scans: prev.scans + (Math.random() > 0.7 ? 1 : 0),
        mastery: +(prev.mastery + (Math.random() - 0.5) * 0.1).toFixed(1),
        ping: Math.floor(20 + Math.random() * 10)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Scans', value: liveStats.scans.toLocaleString(), icon: Users, color: 'text-blue-500', border: 'border-blue-500/20' },
    { label: 'Avg Mastery', value: `${liveStats.mastery}%`, icon: GraduationCap, color: 'text-emerald-500', border: 'border-emerald-500/20' },
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

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.id.includes(searchQuery);
    const matchesFilter = filter === 'All' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCommandAction = (action: string) => {
    if (action === 'search-students') {
      const el = document.getElementById('search-input');
      el?.focus();
    }
    if (action === 'clear-filters') {
      setFilter('All');
      setSearchQuery('');
    }
  };

  return (
    <div id="institutional-dashboard" className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Neural Pulse Overlay */}
      <AnimatePresence>
        {neuralPulse && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[100] border-[1px] border-blue-500/20 shadow-[inset_0_0_100px_rgba(59,130,246,0.1)]"
          />
        )}
      </AnimatePresence>

      <CommandPalette 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
        onSelectAction={handleCommandAction}
      />

      {/* SYSTEM HEALTH TICKER */}
      <div className="mb-8 flex justify-end gap-6 border-b border-white/[0.03] pb-4">
        <div className="flex items-center gap-2">
           <Cpu className="w-3 h-3 text-blue-500/50" />
           <span className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.2em]">Core Usage: 14%</span>
        </div>
        <div className="flex items-center gap-2">
           <Wifi className={`w-3 h-3 transition-colors ${neuralPulse ? 'text-blue-500' : 'text-emerald-500/50'}`} />
           <span className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.2em]">Latency: {liveStats.ping}ms</span>
        </div>
      </div>

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
          <h2 className="text-4xl font-serif font-light text-white leading-tight">Intelligence Snapshot</h2>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setViewMode('standard')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${viewMode === 'standard' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <Activity className="w-3 h-3" /> Real-time Nodes
            </button>
            <button 
              onClick={() => setViewMode('comparison')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${viewMode === 'comparison' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <BarChart3 className="w-3 h-3" /> Cohorts
            </button>
            <button 
              onClick={() => setViewMode('topology')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${viewMode === 'topology' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <Share2 className="w-3 h-3" /> Topology
            </button>
            <button 
              onClick={() => setViewMode('teacher')}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${viewMode === 'teacher' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <MonitorPlay className="w-3 h-3" /> Teacher Mode
            </button>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-6">
          <InstitutionalPDF />
          <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-4 py-2 rounded-full border border-white/10 group cursor-pointer" onClick={() => setIsCommandOpen(true)}>
            <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'standard' && (
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
                  <motion.div 
                    key={stat.value}
                    initial={{ opacity: 0.5, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl font-light text-white tracking-tight"
                  >
                    {stat.value}
                  </motion.div>
                </motion.div>
              ))}
            </div>

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
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Cognitive Acceleration Projection</h3>
                  <TrendingUp className="w-3 h-3 text-emerald-500 opacity-50" />
                </div>
                <div className="flex-1">
                  <TrendChart />
                </div>
              </div>
            </div>

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
                      id="search-input"
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
                     onClick={() => {
                        setSelectedStudent(s);
                        setIsModalOpen(true);
                     }}
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
        )}

        {viewMode === 'teacher' && (
           <motion.div
             key="teacher"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.98 }}
             className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-8 h-[70vh]"
           >
              <div className="glass-panel border-white/[0.03] overflow-hidden flex flex-col">
                 <div className="p-8 border-b border-white/[0.03] flex justify-between items-center bg-[#0B0F1A]/50">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Classroom Velocity Mapping</h3>
                    <div className="flex items-center gap-4">
                       <span className="text-[8px] font-bold text-blue-500 uppercase">30 Learners Synchronized</span>
                       <LayoutGrid className="w-3 h-3 text-slate-700" />
                    </div>
                 </div>
                 <div className="flex-1">
                    <ClassroomMap />
                 </div>
              </div>
              <TeacherCoPilot />
           </motion.div>
        )}

        {viewMode === 'topology' && (
          <motion.div
            key="topology"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full h-[70vh] glass-panel border-white/[0.03] overflow-hidden"
          >
             <CognitiveTopology />
          </motion.div>
        )}

        {viewMode === 'comparison' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              { name: 'Grade 09', mastery: 68, risk: 18, color: 'text-blue-500' },
              { name: 'Grade 10', mastery: 72, risk: 24, color: 'text-emerald-500' },
              { name: 'Grade 11', mastery: 84, risk: 8, color: 'text-amber-500' },
              { name: 'Grade 12', mastery: 91, risk: 4, color: 'text-rose-500' },
            ].map((cohort, i) => (
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
