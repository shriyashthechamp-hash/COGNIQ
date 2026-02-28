"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Users, FileText, Settings, X, ChevronRight, CornerDownLeft, ArrowDownUp } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: string) => void;
}

const ACTIONS = [
  { id: 'search-students', label: 'Search Students', icon: Users, shortcut: 'S', category: 'Data' },
  { id: 'export-report', label: 'Export Institutional PDF', icon: FileText, shortcut: 'E', category: 'Actions' },
  { id: 'toggle-live', label: 'Toggle Live Simulation', icon: Settings, shortcut: 'L', category: 'System' },
  { id: 'clear-filters', label: 'Reset All Filters', icon: X, shortcut: 'R', category: 'Data' },
];

export function CommandPalette({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle is handled by the parent
      }
      
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
      if (e.key === 'ArrowUp') setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
      if (e.key === 'Enter' && filteredActions.length > 0) {
        onSelectAction(filteredActions[selectedIndex].id);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredActions = ACTIONS.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B0F1A]/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-[#0E131F] border border-white/5 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/[0.03] flex items-center gap-4">
              <Search className="w-5 h-5 text-slate-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white focus:outline-none text-sm uppercase tracking-widest font-bold placeholder:text-slate-700"
              />
              <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded border border-white/10">
                <Command className="w-3 h-3 text-slate-500" />
                <span className="text-[10px] font-bold text-slate-500">K</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                filteredActions.map((action, i) => (
                  <motion.div
                    key={action.id}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onClick={() => {
                      onSelectAction(action.id);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${selectedIndex === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-4">
                      <action.icon className={`w-4 h-4 ${selectedIndex === i ? 'text-white' : 'text-blue-500/50'}`} />
                      <div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedIndex === i ? 'text-white' : 'text-white/80'}`}>{action.label}</p>
                        <p className={`text-[8px] font-bold uppercase tracking-widest opacity-40`}>{action.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${selectedIndex === i ? 'border-white/20 bg-white/10' : 'border-white/5 bg-white/5 text-slate-700'}`}>
                        {action.shortcut}
                      </span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${selectedIndex === i ? 'translate-x-1' : 'opacity-0'}`} />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-10 text-center">
                  <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">No commands found.</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-white/[0.01] border-t border-white/[0.03] flex justify-between">
              <div className="flex gap-4">
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                   <ArrowDownUp className="w-2 h-2" /> Navigate
                </span>
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest flex items-center gap-1">
                   <CornerDownLeft className="w-2 h-2" /> Select
                </span>
              </div>
              <span className="text-[8px] font-bold text-slate-800 uppercase tracking-widest">Cognitive Intelligence Interface</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
