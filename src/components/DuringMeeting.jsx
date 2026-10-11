import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Layers, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CornerDownRight,
  Check,
  Radio,
  FileText
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function DuringMeeting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const { addToast } = useToast();
  
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(28); // seconds

  // Smooth vertical parallax without crooked rotation tilts
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftCardY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rightCardY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const centerConduitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  const comparisons = [
    {
      id: "launch",
      title: "Release Timeline",
      typed: "launch moved to Nov 14",
      category: "Release Timeline",
      categoryColor: "bg-amber-50 text-amber-900 border-amber-200",
      speaker: "James Wilson",
      role: "CTO & Co-Founder",
      initials: "JW",
      avatarBg: "bg-indigo-600",
      timestamp: "14:35:12",
      enhanced: "Agreement: General public rollout pushed back 2 weeks to November 14th to complete penetration testing and infrastructure audits.",
      decision: "Target release locked for Nov 14. Freeze date set for Nov 7.",
      actionItem: "Draft customer release advisory and update public status page.",
      assignee: "James Wilson • Due Friday",
      ticketTag: "Linear #REL-104",
      audioQuote: "Let's officially lock November 14th as the general release date. I will draft the customer notice today.",
    },
    {
      id: "hosting",
      title: "GDPR Compliance",
      typed: "Frankfurt EU hosting required",
      category: "GDPR Compliance",
      categoryColor: "bg-blue-50 text-blue-900 border-blue-200",
      speaker: "Sarah Chen",
      role: "VP of Information Security",
      initials: "SC",
      avatarBg: "bg-emerald-600",
      timestamp: "14:28:45",
      enhanced: "Strict requirement: Database cluster must reside exclusively within the Frankfurt AWS availability zone for GDPR data localization.",
      decision: "Database instances for European enterprise clients will be dedicated to Frankfurt AWS.",
      actionItem: "Deliver Frankfurt infrastructure architecture diagram to procurement.",
      assignee: "Sarah Chen • Due Monday",
      ticketTag: "Linear #SEC-312",
      audioQuote: "Data sovereignty is non-negotiable for German enterprise clients. If Frankfurt isn't online, they will defer procurement.",
    },
    {
      id: "pricing",
      title: "Commercial Terms",
      typed: "pricing concern raised by Alex",
      category: "Commercial Terms",
      categoryColor: "bg-violet-50 text-violet-900 border-violet-200",
      speaker: "Alex Morgan",
      role: "Lead Product Strategist",
      initials: "AM",
      avatarBg: "bg-purple-600",
      timestamp: "14:22:18",
      enhanced: "Alex's procurement team flagged budget constraints for 450 engineering seats. Requested volume discount addendum before Friday sign-off.",
      decision: "Annual commitment of $94,000 approved subject to technical SLA confirmation.",
      actionItem: "Provide revised enterprise pricing proposal with Frankfurt hosting addendum.",
      assignee: "Alex Morgan • Due Thursday",
      ticketTag: "HubSpot Deal #450",
      audioQuote: "Our finance team wants to ensure the 450 seats come with priority SLA support without ballooning next quarter's budget.",
    },
  ];

  // Audio playback ticker simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackTime((prev) => (prev >= 42 ? 28 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      addToast(`Playing 48kHz audio snippet from ${comparisons[activeItemIndex].speaker}`);
    }
  };

  const handleSelectMoment = (idx) => {
    setActiveItemIndex(idx);
    addToast(`Switched context to ${comparisons[idx].category} (${comparisons[idx].speaker})`);
  };

  const current = comparisons[activeItemIndex];

  return (
    <section 
      id="during" 
      ref={containerRef} 
      className="py-24 md:py-32 bg-[#F8F7F2] border-b border-[#E8E6DF] overflow-hidden relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-emerald-300/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-[#C8E63A]/15 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#88867F]">
              02 &bull; In-Flight Presence
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#171717] leading-[0.95]">
            Stay <span className="font-serif italic font-normal">present.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F5D57] leading-relaxed">
            Stop frantically typing every sentence. Write short fragments; Cadence automatically expands and structures them with audio context in real time.
          </p>
        </div>

        {/* =========================================================================
            TOP: Precision Audio Capture Console (Ultra-Clean, Organized Layout)
            ========================================================================= */}
        <div className="bg-white p-4 sm:px-6 sm:py-4.5 rounded-2xl border border-[#DCDAD2] shadow-[0_8px_30px_rgba(23,23,23,0.03)] mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left: Playback Controls & Live Stream Status */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={togglePlayback}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                  isPlaying 
                    ? 'bg-[#171717] text-[#C8E63A] ring-2 ring-[#C8E63A]/50' 
                    : 'bg-[#C8E63A] text-[#171717] hover:bg-[#B8D62E]'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause Audio' : 'Play Audio Snippet'}</span>
              </button>

              <div className="flex items-center gap-2 bg-[#F8F7F2] px-3 py-1.5 rounded-xl border border-[#E8E6DF]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#171717]">
                  48kHz Local Mic Stream
                </span>
              </div>

              {/* Active Speaker Badge */}
              <div className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 px-3 py-1.5 rounded-xl">
                <span className={`w-4 h-4 rounded-full ${current.avatarBg} text-white flex items-center justify-center text-[9px] font-bold`}>
                  {current.initials}
                </span>
                <span className="text-xs font-mono text-emerald-950 font-semibold">
                  {current.speaker}
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-medium hidden sm:inline">
                  (Speaking)
                </span>
              </div>
            </div>

            {/* Center / Right: Waveform & Privacy Guarantees */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 sm:gap-5">
              {/* Responsive Waveform Visualizer */}
              <div className="flex items-center gap-1 h-6 px-3 bg-[#F8F7F2] rounded-xl border border-[#E8E6DF]">
                {[35, 75, 45, 95, 60, 85, 40, 90, 70, 50, 80, 100, 65, 45, 90, 30].map((h, i) => (
                  <span
                    key={i}
                    className={`w-[2.5px] rounded-full transition-all duration-150 ${
                      isPlaying 
                        ? 'bg-emerald-600 animate-pulse' 
                        : 'bg-[#171717]/40'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(25, (h * (0.6 + (i % 3) * 0.2))) % 100}%` : `${h * 0.4}%`,
                      animationDuration: `${0.35 + (i % 4) * 0.15}s`,
                      animationDelay: `${i * 0.04}s`,
                    }}
                  />
                ))}
                <span className="ml-2 text-xs font-mono font-semibold text-[#171717]">
                  14:{playbackTime < 10 ? `0${playbackTime}` : playbackTime}
                </span>
              </div>

              {/* Verified Privacy Pills */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-emerald-800 font-medium bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">No Bot In Meeting</span>
                </span>
                <span className="flex items-center gap-1 text-[#88867F] bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#DCDAD2]">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>12ms Latency</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOMENT SELECTOR TABS: Clean, Interactive Segmented Control
            ========================================================================= */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171717]">
              Inspect Live Moment:
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#EFECE6] p-1 rounded-xl border border-[#DCDAD2]">
            {comparisons.map((item, idx) => {
              const isSelected = activeItemIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectMoment(idx)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#5F5D57] hover:text-[#171717]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeMomentTab"
                      className="absolute inset-0 bg-white rounded-lg shadow-xs border border-[#DCDAD2]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.avatarBg}`} />
                    <span>{item.category}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MAIN TRANSFORMATION GRID (Balanced Symmetrical Layout)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* =====================================================================
              LEFT CARD: Raw User Scratchpad (Clean, Balanced, Tactile Depth)
              ===================================================================== */}
          <motion.div
            style={{ y: leftCardY }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Subtle parallel layered back-sheet for elegant depth (NO diagonal askew angles) */}
            <div className="absolute inset-0 bg-[#EFECE6] rounded-3xl border border-[#DCDAD2] translate-y-2 translate-x-2 -z-10 transition-transform group-hover:translate-y-2.5 group-hover:translate-x-2.5" />

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#DCDAD2] shadow-[0_16px_40px_rgba(23,23,23,0.05)] h-full flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E6DF]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-mono uppercase text-amber-950 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      What You Typed
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#88867F] bg-[#FAF9F5] px-2.5 py-1 rounded-md border border-[#DCDAD2] flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#88867F]" />
                    In-Flight Scratchpad
                  </span>
                </div>

                {/* Micro Subheading */}
                <p className="text-xs text-[#5F5D57] mb-4">
                  Type quick 3-word fragments during conversation. Click any note to see real-time synthesis:
                </p>

                {/* Selectable Jotted Fragments */}
                <div className="space-y-3">
                  {comparisons.map((item, idx) => {
                    const isSelected = activeItemIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectMoment(idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-50/70 to-white border-amber-400 shadow-sm ring-1 ring-amber-400/30'
                            : 'bg-[#FAF9F5] border-[#E8E6DF] hover:bg-white hover:border-[#DCDAD2] opacity-80 hover:opacity-100'
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeFragmentBar"
                            className="absolute -left-1 top-3.5 bottom-3.5 w-1.5 bg-amber-500 rounded-full"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${item.categoryColor}`}>
                            {item.category}
                          </span>
                          <span className="text-[11px] font-mono text-[#88867F]">
                            {item.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-amber-600 font-mono text-sm font-bold">&gt;</span>
                          <p className="text-sm font-mono text-[#171717] font-semibold">
                            &ldquo;{item.typed}&rdquo;
                            {isSelected && (
                              <span className="inline-block w-1.5 h-4 ml-1 bg-amber-500 animate-pulse align-middle" />
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Helper */}
              <div className="pt-4 mt-6 text-xs text-[#88867F] font-mono flex items-center justify-between border-t border-[#E8E6DF]">
                <span>Status: Capture Active</span>
                <span className="text-amber-800 font-semibold">Click note to preview</span>
              </div>
            </div>
          </motion.div>

          {/* =====================================================================
              CENTER TRANSFORMATION CONDUIT (Interactive Neural Bridge)
              ===================================================================== */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center text-center space-y-4 py-8">
            <motion.div 
              style={{ scale: centerConduitScale }}
              className="w-14 h-14 rounded-2xl bg-[#171717] text-[#C8E63A] flex items-center justify-center shadow-lg border border-[#333230] relative group cursor-pointer"
              whileHover={{ scale: 1.12, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={() => handleSelectMoment((activeItemIndex + 1) % comparisons.length)}
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span className="absolute -inset-1 rounded-2xl bg-[#C8E63A]/25 filter blur-sm -z-10 animate-pulse" />
            </motion.div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#171717] block bg-white px-2.5 py-1 rounded-full border border-[#DCDAD2] shadow-xs">
                Context Bridge
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 via-[#C8E63A] to-emerald-500 mx-auto rounded-full" />
              <span className="text-[9px] font-mono text-[#88867F] block">
                Local Speech &bull; Matched
              </span>
            </div>
          </div>

          {/* =====================================================================
              RIGHT CARD: Cadence Real-Time Contextual Synthesis
              ===================================================================== */}
          <motion.div
            style={{ y: rightCardY }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Matching parallel layered back-sheet for balanced depth */}
            <div className="absolute inset-0 bg-[#EFECE6] rounded-3xl border border-[#DCDAD2] translate-y-2 -translate-x-2 -z-10 transition-transform group-hover:translate-y-2.5 group-hover:-translate-x-2.5" />

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-emerald-300 shadow-[0_20px_50px_rgba(16,185,129,0.07)] h-full flex flex-col justify-between">
              <div>
                {/* Card Header with Speaker Info */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E6DF]">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-7 h-7 rounded-full ${current.avatarBg} text-white flex items-center justify-center text-[10px] font-bold shadow-xs`}>
                      {current.initials}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-[#171717] block leading-tight">
                        {current.speaker}
                      </span>
                      <span className="text-[10px] text-[#88867F] font-mono">
                        {current.role} &bull; {current.timestamp}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Synthesized
                  </span>
                </div>

                {/* Dynamic Enhanced Content with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3.5"
                  >
                    {/* Executive Synthesis Box (Cadence Lime Highlight) */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAFDF0] to-white border border-[#C8E63A]/80 space-y-1.5 shadow-xs">
                      <span className="text-[10px] font-mono text-[#5F5D57] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#8CB800]" />
                        Real-Time Executive Expansion
                      </span>
                      <p className="text-xs sm:text-sm text-[#171717] leading-relaxed font-sans font-medium">
                        {current.enhanced}
                      </p>
                    </div>

                    {/* Agreed Decision */}
                    <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-1 text-xs">
                      <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                        Agreed Decision:
                      </span>
                      <p className="text-[#171717] font-medium leading-snug">
                        {current.decision}
                      </p>
                    </div>

                    {/* Auto-extracted Action Item */}
                    <div className="p-3 rounded-xl bg-white border border-indigo-100 flex items-center justify-between shadow-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-medium text-[#171717] block">
                            {current.actionItem}
                          </span>
                          <span className="text-[10px] font-mono text-[#88867F]">
                            {current.assignee}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-medium">
                        {current.ticketTag}
                      </span>
                    </div>

                    {/* Verbatim Spoken Ground Truth Snippet */}
                    <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-950 font-mono italic">
                      &ldquo;{current.audioQuote}&rdquo;
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-6 border-t border-[#E8E6DF] flex items-center justify-between text-xs font-mono">
                <span className="text-indigo-700 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  Synced: Linear &bull; Notion
                </span>
                <span className="text-emerald-700 font-bold">100% Verbatim Match</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
