import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnswerRecord } from './assessmentData';
import { CognitiveTimeline } from './CognitiveTimeline';
import { EarlyWarningBanner } from './EarlyWarningBanner';
import { AnalysisDrawer } from './AnalysisDrawer';
import { Activity, BrainCircuit, TrendingUp, TrendingDown, Shield, Gauge, Zap, X } from 'lucide-react';

interface DashboardProps {
  answers: AnswerRecord[];
  onRestart: () => void;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(easeProgress * value));
      if (progress < 1) requestAnimationFrame(animateNumber);
    };
    requestAnimationFrame(animateNumber);
  }, [value]);
  return <span>{displayValue}</span>;
}

export function ResultsDashboard({ answers, onRestart }: DashboardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRiskExplainerOpen, setIsRiskExplainerOpen] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [projectionSlider, setProjectionSlider] = useState(0);

  // --- SCORING LOGIC ---
  const totalQuestions = answers.length || 5;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;

  // Base values
  const baseMastery = Math.round((correctCount / totalQuestions) * 100);
  const baseStability = Math.round((correctCount / 5) * 100);
  const baseRisk = 100 - baseMastery;

  // Recovery + Projection
  const recoveryBump = isRecovering ? 15 : 0;
  const projectionBump = projectionSlider * 0.5;

  const overallMastery = Math.min(100, Math.round(baseMastery + recoveryBump + projectionBump));
  const stabilityIndex = Math.min(100, Math.round(baseStability + (isRecovering ? 10 : 0)));
  const riskScore = Math.max(0, 100 - overallMastery);
  const predictedDecline = (riskScore * 0.2).toFixed(1);
  const cci = Math.round((overallMastery * stabilityIndex) / 100);

  // ===== NEW METRICS =====
  // Exam Readiness
  const examReadiness = Math.round((overallMastery * stabilityIndex) / 100);

  // Recovery Probability
  const recoveryProbability = Math.round(100 - (riskScore * 0.5));
  const getRecoveryColor = (val: number) => {
    if (val > 70) return { color: 'text-cogniq-success', hex: '#10B981' };
    if (val >= 40) return { color: 'text-cogniq-warning', hex: '#F59E0B' };
    return { color: 'text-cogniq-danger', hex: '#EF4444' };
  };
  const recoveryColor = getRecoveryColor(recoveryProbability);

  // Data Confidence
  const dataConfidence = Math.min(totalQuestions * 20, 100);

  // Concept Instability (Volatility)
  const conceptScoreValues = answers.map(a => a.isCorrect ? 100 : 30);
  const avgConceptScore = conceptScoreValues.reduce((s, v) => s + v, 0) / conceptScoreValues.length;
  const volatility = Math.round(Math.sqrt(conceptScoreValues.reduce((s, v) => s + Math.pow(v - avgConceptScore, 2), 0) / conceptScoreValues.length));

  // Weak concept count
  const weakConceptCount = answers.filter(a => !a.isCorrect).length;

  // Risk breakdown percentages (for Explainable AI)
  const masteryDeficit = 100 - overallMastery;
  const stabilityWeakness = 100 - stabilityIndex;
  const riskTotal = masteryDeficit + stabilityWeakness + volatility + (weakConceptCount * 10);
  const masteryPct = riskTotal > 0 ? Math.round((masteryDeficit / riskTotal) * 100) : 0;
  const stabilityPct = riskTotal > 0 ? Math.round((stabilityWeakness / riskTotal) * 100) : 0;
  const volatilityPct = riskTotal > 0 ? Math.round((volatility / riskTotal) * 100) : 0;
  const clusterPct = riskTotal > 0 ? Math.round(((weakConceptCount * 10) / riskTotal) * 100) : 0;

  // Cognitive Profile Classification
  const getCognitiveProfile = () => {
    if (overallMastery >= 70 && stabilityIndex >= 70) return { title: 'Strong but Conceptually Fragmented', desc: 'High performance with occasional conceptual gaps.', icon: '🧩' };
    if (overallMastery >= 60 && stabilityIndex < 50) return { title: 'Analytical but Unstable', desc: 'Sharp reasoning undermined by inconsistent application.', icon: '⚡' };
    if (overallMastery < 60 && stabilityIndex >= 60) return { title: 'Consistent but Slow', desc: 'Reliable patterns but limited depth of mastery.', icon: '🔄' };
    return { title: 'Fast but Error-Prone', desc: 'Quick engagement with high error volatility.', icon: '🎯' };
  };
  const cognitiveProfile = getCognitiveProfile();

  // Recovery Momentum
  const getMomentum = () => {
    if (isRecovering) return { label: 'Positive', arrow: '↑', color: 'text-cogniq-success' };
    if (riskScore > 60) return { label: 'Declining', arrow: '↓', color: 'text-cogniq-danger' };
    return { label: 'Stable', arrow: '→', color: 'text-cogniq-warning' };
  };
  const momentum = getMomentum();

  // Learning Friction Points
  const frictionPoints = [
    { label: 'Sign Misinterpretation', active: incorrectCount >= 2 },
    { label: 'Pattern Recognition Delay', active: volatility > 25 },
    { label: 'Concept Transfer Instability', active: weakConceptCount >= 2 },
  ];

  // Concept scores
  const conceptScores: Record<string, number> = {};
  answers.forEach(a => {
    const weakBump = (!a.isCorrect && isRecovering) ? 16 : 0;
    conceptScores[a.concept] = a.isCorrect ? 100 : Math.min(100, 30 + weakBump + projectionBump);
  });

  const getRiskLevel = (score: number) => {
    if (score <= 30) return { label: 'Low', color: 'text-cogniq-success', colorHex: '#10B981' };
    if (score <= 60) return { label: 'Moderate', color: 'text-cogniq-warning', colorHex: '#F59E0B' };
    return { label: 'High', color: 'text-cogniq-danger', colorHex: '#EF4444' };
  };

  const riskLevel = getRiskLevel(riskScore);
  const weakestConcept = answers.find(a => !a.isCorrect)?.concept || 'None Found';
  const secondaryWeakness = answers.filter(a => !a.isCorrect && a.concept !== weakestConcept)[0]?.concept;

  return (
    <div className="w-full relative">
      <EarlyWarningBanner riskScore={riskScore} />

      {isRecovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-7xl mx-auto mb-6 bg-cogniq-cyan/10 border border-cogniq-cyan/30 text-cogniq-cyan rounded-lg p-3 text-center font-bold tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur flex justify-center items-center gap-2"
        >
          <Activity className="w-5 h-5 animate-pulse" />
          COGNITIVE RECOVERY MODE ACTIVATED
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 text-left"
      >
        {/* =================== LEFT COLUMN =================== */}
        <div className="lg:col-span-2 space-y-6">

          {/* Neural Concept Network */}
          <div className="glass-panel p-6 h-[400px] relative overflow-hidden flex flex-col group/network">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4 z-20">Neural Concept Network</h3>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {[
                  { x2: '25%', y2: '30%', delay: 0, score: conceptScores[answers[0]?.concept] || 0 },
                  { x2: '75%', y2: '30%', delay: 0.2, score: conceptScores[answers[1]?.concept] || 0 },
                  { x2: '25%', y2: '70%', delay: 0.4, score: conceptScores[answers[2]?.concept] || 0 },
                  { x2: '75%', y2: '70%', delay: 0.6, score: conceptScores[answers[3]?.concept] || 0 }
                ].map((line, i) => {
                  const strong = line.score > 50;
                  return (
                    <motion.line
                      key={i}
                      x1="50%" y1="50%" x2={line.x2} y2={line.y2}
                      stroke={strong ? "rgba(6, 182, 212, 0.5)" : "rgba(255,255,255,0.05)"}
                      strokeWidth={strong ? Math.max(2, line.score / 20) : 1}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: line.delay }}
                      className="transition-all duration-500 ease-in-out"
                    />
                  );
                })}
              </svg>

              {/* Center Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute w-28 h-28 rounded-full bg-cogniq-bg border border-cogniq-primary flex items-center justify-center z-10 glow-blue text-white shadow-lg shadow-cogniq-primary/20 flex-col cursor-pointer hover:scale-110 transition-transform"
              >
                <div className="flex items-baseline font-bold">
                  <span className="text-3xl"><AnimatedNumber value={overallMastery} /></span>
                  <span className="text-xl">%</span>
                </div>
                <span className="text-[10px] uppercase text-cogniq-cyan tracking-widest">Mastery</span>
              </motion.div>

              {answers.slice(0, 4).map((ans, idx) => {
                const score = conceptScores[ans.concept];
                const nodeLevel = getRiskLevel(100 - score);
                const positions = [
                  { top: '30%', left: '25%', y: '-50%', x: '-50%' },
                  { top: '30%', left: '75%', y: '-50%', x: '-50%' },
                  { top: '70%', left: '25%', y: '-50%', x: '-50%' },
                  { top: '70%', left: '75%', y: '-50%', x: '-50%' },
                ];
                const pos = positions[idx];
                const size = 60 + (score * 0.4);
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + (idx * 0.1), type: "spring" }}
                    className="absolute rounded-full flex items-center justify-center border shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 z-20 group/node"
                    style={{ ...pos, width: size, height: size, backgroundColor: `${nodeLevel.colorHex}20`, borderColor: `${nodeLevel.colorHex}60`, boxShadow: `0 0 15px ${nodeLevel.colorHex}40` }}
                    title={ans.concept}
                  >
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 + idx }} className="absolute inset-0 rounded-full border border-white/10 group-hover/node:border-white/40 transition-colors" />
                    <div className="text-center transition-transform group-hover/node:scale-110">
                      <div className="font-bold text-white text-sm"><AnimatedNumber value={score} />%</div>
                    </div>
                    <div className="absolute -bottom-6 whitespace-nowrap text-xs text-slate-300 font-medium bg-black/50 px-2 py-0.5 rounded backdrop-blur opacity-80 group-hover/node:opacity-100 group-hover/node:text-white transition-all">
                      {ans.concept}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Insights + Predictive Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 border-l-2 border-l-cogniq-cyan relative overflow-hidden flex flex-col justify-between">
              <div className="absolute opacity-10 top-2 right-2 font-mono text-8xl leading-none text-cogniq-cyan pointer-events-none">AI</div>
              <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4">AI Scan Synthesis</h3>
              <div className="space-y-4 text-slate-300 relative z-10 flex-grow">
                <div className="bg-white/5 p-3 rounded-md border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-cogniq-danger mb-1 font-semibold">Primary Weakness</p>
                  <p className="font-medium text-white text-lg">{weakestConcept}</p>
                  <p className="text-xs text-slate-400 mt-1">Requires immediate intervention to stabilize foundational concepts.</p>
                </div>
                {secondaryWeakness && (
                  <div className="bg-white/5 p-3 rounded-md border border-white/5">
                    <p className="text-xs uppercase tracking-widest text-cogniq-warning mb-1 font-semibold">Secondary Observation</p>
                    <p className="font-medium text-slate-200">{secondaryWeakness}</p>
                  </div>
                )}
              </div>
              <button onClick={() => setIsDrawerOpen(true)} className="relative z-10 mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/20 py-3 px-4 rounded transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group">
                <BrainCircuit className="w-4 h-4 text-cogniq-cyan group-hover:animate-pulse" />
                View Cognitive Analysis
              </button>
            </div>

            <div className="glass-panel p-6 border-l-2 border-l-cogniq-danger flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-cogniq-danger/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4">Predictive Impact</h3>
                <p className="text-slate-300 text-lg leading-relaxed">If no intervention occurs, projected performance decline over 30 days:</p>
                <div className="text-5xl font-bold text-cogniq-danger mt-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  <AnimatedNumber value={parseFloat(predictedDecline)} />%
                </div>
              </div>
              {/* Recovery Probability */}
              <div className="relative z-10 mt-4 bg-white/5 p-3 rounded border border-white/10">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Estimated Recovery Probability</p>
                <span className={`text-2xl font-bold font-mono ${recoveryColor.color}`}><AnimatedNumber value={recoveryProbability} />%</span>
              </div>
              <button
                onClick={() => setIsRecovering(true)}
                disabled={isRecovering}
                className="relative z-10 mt-4 bg-cogniq-danger/10 hover:bg-cogniq-danger disabled:opacity-50 disabled:cursor-not-allowed text-white border border-cogniq-danger/50 py-3 px-4 rounded transition-all text-sm font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              >
                {isRecovering ? 'Stabilizing...' : 'Begin Reinforcement'}
              </button>
            </div>
          </div>

          {/* Cognitive Signal Timeline */}
          <CognitiveTimeline currentMastery={Math.round(overallMastery)} currentRisk={Math.round(riskScore)} />

          {/* ===== NEW: Cognitive Profile Classification ===== */}
          <div className="glass-panel p-6 border-l-2 border-white/20">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4">Cognitive Profile</h3>
            <div className="flex items-start gap-4">
              <span className="text-4xl">{cognitiveProfile.icon}</span>
              <div>
                <p className="text-xl font-bold text-white tracking-wide">{cognitiveProfile.title}</p>
                <p className="text-slate-400 text-sm mt-1">{cognitiveProfile.desc}</p>
              </div>
            </div>
          </div>

          {/* ===== NEW: Learning Friction Points ===== */}
          <div className="glass-panel p-6">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cogniq-warning" />
              Learning Friction Points
            </h3>
            <div className="space-y-3">
              {frictionPoints.map((fp, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded border ${fp.active ? 'bg-cogniq-warning/10 border-cogniq-warning/30' : 'bg-white/5 border-white/5 opacity-40'}`}>
                  <span className={`w-2 h-2 rounded-full ${fp.active ? 'bg-cogniq-warning animate-pulse' : 'bg-slate-600'}`}></span>
                  <span className={`text-sm font-medium ${fp.active ? 'text-white' : 'text-slate-500'}`}>{fp.label}</span>
                  {fp.active && <span className="ml-auto text-xs text-cogniq-warning font-mono">DETECTED</span>}
                </div>
              ))}
            </div>
          </div>

          {/* ===== NEW: Performance Projection Slider ===== */}
          <div className="glass-panel p-6">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cogniq-primary" />
              Performance Projection Slider
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs text-slate-500 w-24">Practice +0%</span>
              <input
                type="range"
                min="0" max="100"
                value={projectionSlider}
                onChange={(e) => setProjectionSlider(Number(e.target.value))}
                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-xs text-cogniq-primary font-mono w-16 text-right">+{projectionSlider}%</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Projected Mastery</p>
                <span className="text-xl font-bold text-white font-mono"><AnimatedNumber value={overallMastery} />%</span>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Projected Risk</p>
                <span className={`text-xl font-bold font-mono ${riskLevel.color}`}><AnimatedNumber value={riskScore} />%</span>
              </div>
              <div className="bg-white/5 p-3 rounded border border-white/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Projected Readiness</p>
                <span className="text-xl font-bold text-cogniq-cyan font-mono"><AnimatedNumber value={examReadiness} />%</span>
              </div>
            </div>
          </div>

        </div>

        {/* =================== RIGHT COLUMN =================== */}
        <div className="space-y-6">

          {/* Live Mastery Panel */}
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase flex items-center gap-2">Live Concept Mastery</h3>
              <span className="w-2 h-2 rounded-full bg-cogniq-success animate-pulse"></span>
            </div>
            <div className="space-y-5">
              {answers.map((ans, idx) => {
                const score = conceptScores[ans.concept];
                const nodeLevel = getRiskLevel(100 - score);
                return (
                  <div key={idx} className="group cursor-default">
                    <div className="flex justify-between text-sm mb-1.5 align-baseline">
                      <span className="text-slate-300 tracking-wide">{ans.concept}</span>
                      <span className={`font-bold transition-colors duration-500 ${nodeLevel.color}`}><AnimatedNumber value={score} />%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.2, delay: 0.2 * idx, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: nodeLevel.colorHex, boxShadow: `0 0 8px ${nodeLevel.colorHex}` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Gauge */}
          <div className="glass-panel p-6 flex flex-col items-center relative overflow-hidden">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-6 self-start w-full border-b border-white/10 pb-4">Risk Assessment</h3>
            <div className="relative w-48 h-48 flex items-center justify-center -mt-2">
              <svg className="w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <motion.circle
                  cx="96" cy="96" r="80"
                  fill="transparent"
                  stroke={riskLevel.colorHex}
                  strokeWidth="12"
                  strokeDasharray="502"
                  strokeDashoffset="502"
                  initial={{ strokeDashoffset: 502 }}
                  animate={{ strokeDashoffset: 502 - (502 * riskScore) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 6px ${riskLevel.colorHex})` }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-black font-mono text-white"><AnimatedNumber value={riskScore} /></span>
                <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">Risk Score</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-4 px-4 py-1.5 rounded-full border bg-black/30 font-bold uppercase tracking-widest text-sm"
              style={{ color: riskLevel.colorHex, borderColor: `${riskLevel.colorHex}40` }}
            >
              {riskLevel.label} Level
            </motion.div>
            {/* Explain Risk Score Button */}
            <button
              onClick={() => setIsRiskExplainerOpen(true)}
              className="mt-3 text-xs text-slate-500 hover:text-cogniq-cyan transition-colors tracking-widest uppercase underline underline-offset-4 decoration-dotted"
            >
              Explain Risk Score
            </button>
          </div>

          {/* CCI */}
          <div className="glass-panel p-6 border-l-2 border-cogniq-primary">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-2">Cognitive Confidence Index</h3>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-5xl font-thin font-mono text-white"><AnimatedNumber value={cci} /></span>
            </div>
            <div className="h-0.5 w-full bg-black/60 overflow-hidden rounded-full">
              <motion.div initial={{ width: 0 }} animate={{ width: `${cci}%` }} transition={{ duration: 1.2, delay: 0.4 }} className="h-full bg-cogniq-primary glow-blue" />
            </div>
          </div>

          {/* Stability Index */}
          <div className="glass-panel p-6">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-2">Understanding Stability</h3>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-white"><AnimatedNumber value={stabilityIndex} />%</span>
            </div>
            <div className="h-1 w-full bg-black/60 overflow-hidden rounded-full">
              <motion.div initial={{ width: 0 }} animate={{ width: `${stabilityIndex}%` }} transition={{ duration: 1.2, delay: 0.3 }} className="h-full bg-cogniq-cyan glow-cyan" />
            </div>
          </div>

          {/* ===== NEW: Exam Readiness Projection ===== */}
          <div className="glass-panel p-6 border-l-2 border-cogniq-success">
            <h3 className="text-slate-400 font-medium text-sm tracking-widest uppercase mb-2">Exam Readiness Score</h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-white font-mono"><AnimatedNumber value={examReadiness} />%</span>
            </div>
            <div className="h-1 w-full bg-black/60 overflow-hidden rounded-full mb-2">
              <motion.div initial={{ width: 0 }} animate={{ width: `${examReadiness}%` }} transition={{ duration: 1.2, delay: 0.5 }} className="h-full bg-cogniq-success" style={{ boxShadow: '0 0 8px #10B981' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Projected readiness based on current trajectory.</p>
          </div>

          {/* ===== NEW: Recovery Momentum ===== */}
          <div className="glass-panel p-5 flex items-center justify-between">
            <div>
              <h3 className="text-slate-400 font-medium text-xs tracking-widest uppercase mb-1">Cognitive Recovery Momentum</h3>
              <span className={`text-xl font-bold ${momentum.color}`}>{momentum.label} <span className="text-2xl">{momentum.arrow}</span></span>
            </div>
            {momentum.label === 'Positive' ? <TrendingUp className="w-8 h-8 text-cogniq-success opacity-60" /> : momentum.label === 'Declining' ? <TrendingDown className="w-8 h-8 text-cogniq-danger opacity-60" /> : <Activity className="w-8 h-8 text-cogniq-warning opacity-60" />}
          </div>

          {/* ===== NEW: Data Confidence Score ===== */}
          <div className="glass-panel p-5 flex items-center justify-between">
            <div>
              <h3 className="text-slate-400 font-medium text-xs tracking-widest uppercase mb-1">Data Confidence</h3>
              <span className="text-lg font-mono text-white"><AnimatedNumber value={dataConfidence} />%</span>
            </div>
            <Shield className="w-6 h-6 text-cogniq-primary opacity-50" />
          </div>

        </div>
      </motion.div>

      {/* ===== Explainable AI Panel (Risk Breakdown) ===== */}
      <AnimatePresence>
        {isRiskExplainerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsRiskExplainerOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-cogniq-bg border-l border-white/10 p-6 z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-lg font-bold tracking-wide text-white">Risk Score Breakdown</h2>
                <button onClick={() => setIsRiskExplainerOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-400 text-sm mb-6">This risk score is influenced by:</p>
              <div className="space-y-4">
                {[
                  { label: 'Mastery Deficit', value: masteryPct, color: '#EF4444' },
                  { label: 'Stability Weakness', value: stabilityPct, color: '#F59E0B' },
                  { label: 'Concept Volatility', value: volatilityPct, color: '#8B5CF6' },
                  { label: 'Weak Concept Clustering', value: clusterPct, color: '#06B6D4' },
                ].map((item, i) => (
                  <div key={i} className="glass-panel p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                    <span className="text-white font-bold font-mono"><AnimatedNumber value={item.value} />%</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setIsRiskExplainerOpen(false)} className="w-full mt-8 bg-white/5 hover:bg-white/10 text-white font-medium tracking-wide py-4 rounded-lg transition-colors border border-white/10">
                Acknowledge & Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Cognitive Analysis Drawer */}
      <AnalysisDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} weakestConcept={weakestConcept} />
    </div>
  );
}
