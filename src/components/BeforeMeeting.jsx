import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, HelpCircle, CheckCircle2, Clock, Calendar, Sparkles, AlertCircle } from 'lucide-react';

export default function BeforeMeeting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const [score, setScore] = useState(0);

  // Bidirectional continuous scroll parallax & 3D tilt
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftCardsY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rightGaugeY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Dynamic 3D tilt angles that fan out as you scroll
  const card1Tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-3.5, -2, -0.5]);
  const card2Tilt = useTransform(scrollYProgress, [0, 0.5, 1], [3, 2, 0.5]);
  const card3Tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-2, -1, 0]);

  useEffect(() => {
    if (!isInView) {
      setScore(0);
      return;
    }
    const stages = [0, 25, 48, 72, 92];
    let step = 0;
    const interval = setInterval(() => {
      if (step < stages.length) {
        setScore(stages[step]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="idea" ref={containerRef} className="py-28 md:py-36 bg-[#F8F7F2] border-b border-[#E8E6DF] overflow-hidden relative">
      {/* Subtle ambient colored lighting in the background */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#C8E63A]/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#88867F]">
              01 &bull; THE IDEA
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#171717] leading-[0.95]">
            Intelligence is <span className="font-serif italic font-normal">contextual.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F5D57] leading-relaxed">
            Human intelligence is never truly detached from the individual using it. What someone knows, what they have experienced, what they are trying to achieve, what surrounds them and what happens after they act all influence the way they think.
          </p>
        </div>

        {/* Asymmetric Product Storytelling Grid with Parallax & 3D Stacking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: 3D Overlapping Tilted Cards with z-index layering */}
          <motion.div 
            style={{ y: leftCardsY }}
            className="lg:col-span-7 space-y-3 relative perspective-[1200px]"
          >
            {/* Card 1: Context & Objectives (z-30, tilted left) */}
            <motion.div
              style={{ rotate: card1Tilt }}
              whileHover={{ zIndex: 40, rotate: 0, scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 10 }}
              transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-30 bg-white p-6 sm:p-7 rounded-3xl border border-blue-200/80 shadow-[0_8px_30px_rgba(37,99,235,0.06)] hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] mb-4">
                <span className="text-xs font-mono text-blue-700 font-semibold uppercase bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Context &bull; What Someone Knows
                </span>
                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-mono font-medium shadow-xs">
                  Fundamental
                </span>
              </div>
              <h3 className="text-xl font-[550] text-[#171717]">
                Context changes meaning &mdash; not just metadata
              </h3>
              <div className="flex items-center gap-2 text-xs text-[#5F5D57] mt-2 font-mono">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
                  CX
                </span>
                <span>Active Objective</span>
                <span className="text-[#88867F]">&bull;</span>
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                  EX
                </span>
                <span>Lived Experience</span>
              </div>
            </motion.div>

            {/* Card 2: Synthesized Historical Discussions (z-20, tilted right, overlapping) */}
            <motion.div
              style={{ rotate: card2Tilt }}
              whileHover={{ zIndex: 40, rotate: 0, scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 10 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 bg-white p-6 sm:p-7 rounded-3xl border border-violet-200/80 shadow-[0_8px_30px_rgba(124,58,237,0.06)] hover:shadow-xl transition-shadow cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-violet-900 font-semibold text-xs bg-violet-50 px-2.5 py-1 rounded-full border border-violet-200">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  <span>The Breakthrough Principle</span>
                </div>
                <span className="text-[10px] font-mono text-[#88867F]">Knull Philosophy</span>
              </div>
              <p className="text-xs text-[#4A4843] leading-relaxed">
                The next breakthrough may not come from making intelligence bigger. <strong className="text-[#171717] bg-violet-50 px-1 rounded">It may come from making intelligence different.</strong>
              </p>
            </motion.div>

            {/* Card 3: Reality & Consequence (z-10, tilted left) */}
            <motion.div
              style={{ rotate: card3Tilt }}
              whileHover={{ zIndex: 40, rotate: 0, scale: 1.02, y: -4, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 10 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 bg-white p-6 sm:p-7 rounded-3xl border border-amber-200/80 shadow-[0_8px_30px_rgba(245,158,11,0.06)] hover:shadow-xl transition-shadow cursor-pointer space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Behaviour &amp; Environment</span>
                </div>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full">
                  Continuous Feedback
                </span>
              </div>
              <ul className="text-xs text-[#5F5D57] space-y-1.5 list-disc list-inside">
                <li>What surrounds the system dictates operational relevance</li>
                <li>What happens after action informs future cognitive pathways</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* RIGHT: Knull Cognitive Gauge */}
          <motion.div
            style={{ y: rightGaugeY }}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 15 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-emerald-200/60 shadow-[0_20px_60px_rgba(16,185,129,0.06)] flex flex-col justify-between min-h-[460px] relative overflow-hidden"
          >
            {/* Soft inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8E63A]/15 rounded-full filter blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#88867F]">
                  Cognitive Synthesis
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Large Score Counter */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-7xl sm:text-8xl font-[550] tracking-tight text-[#171717]">
                  {score}%
                </span>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold uppercase border border-emerald-200">
                  Contextual Grounding
                </span>
              </div>

              <p className="text-xs text-[#5F5D57] leading-relaxed mb-6">
                Intelligence developed around context, objectives, experience and behaviour rather than broad abstract generalization.
              </p>

              {/* Progress bar with Gradient Lime-Emerald */}
              <div className="w-full bg-[#F1F0EA] h-2.5 rounded-full overflow-hidden mb-6 p-0.5">
                <motion.div
                  className="bg-gradient-to-r from-[#C8E63A] to-[#10B981] h-full rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 text-xs font-medium text-[#171717]">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Objective-driven reasoning active</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-blue-50/50 border border-blue-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Experience incorporation online</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAFDF0] border border-[#C8E63A]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#171717] shrink-0" />
                  <span>Non-generalized contextual boundary</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E6DF] flex items-center justify-between text-xs font-mono relative z-10">
              <span className="text-[#88867F]">Detached generalization: 0%</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Contextual
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
