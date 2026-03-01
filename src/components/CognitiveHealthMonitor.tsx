"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Battery, BatteryLow, BatteryMedium, BatteryWarning, Zap } from 'lucide-react';

interface CognitiveHealthProps {
  level: number; // 0 to 100
  isOverloaded?: boolean;
}

export function CognitiveHealthMonitor({ level, isOverloaded }: CognitiveHealthProps) {
  const getStatusColor = () => {
    if (level > 70) return 'text-emerald-500';
    if (level > 30) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getBatteryIcon = () => {
    if (level > 80) return Battery;
    if (level > 50) return BatteryMedium;
    if (level > 20) return BatteryLow;
    return BatteryWarning;
  };

  const Icon = getBatteryIcon();

  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${getStatusColor()}`} />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cognitive Reserve</span>
        </div>
        <span className={`text-[12px] font-bold ${getStatusColor()}`}>{level}%</span>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          className={`h-full transition-colors duration-1000 ${
            level > 70 ? 'bg-emerald-500' : level > 30 ? 'bg-amber-500' : 'bg-rose-500'
          }`}
        />
        {isOverloaded && (
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-white/20"
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-1">
        <div className="flex items-center gap-1">
          <Zap className={`w-3 h-3 ${isOverloaded ? 'text-rose-500 animate-pulse' : 'text-slate-700'}`} />
          <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tighter">
            {isOverloaded ? 'NEURAL OVERLOAD DETECTED' : 'PROCESSING STABLE'}
          </span>
        </div>
        {level < 30 && (
          <span className="text-[8px] font-bold text-rose-500 animate-bounce uppercase tracking-tighter">
            Rest Recommended
          </span>
        )}
      </div>
    </div>
  );
}
