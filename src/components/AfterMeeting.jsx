import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Sparkles, Check, RefreshCw, Copy, CheckCircle2, ArrowRight, Share2, Layers } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AfterMeeting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const { addToast } = useToast();
  const [animatingStep, setAnimatingStep] = useState(0); // 0: idle, 1: processing, 2: enhanced
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('executive'); // 'executive' | 'prd' | 'sales'

  // Bidirectional continuous scroll parallax & 3D tilt
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rawCardTilt = useTransform(scrollYProgress, [0, 0.5, 1], [-2.5, -1, 0.5]);
  const resultCardTilt = useTransform(scrollYProgress, [0, 0.5, 1], [2.5, 1, -0.5]);
  const sandboxY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const rawBullets = [
    "pricing concern raised by Alex",
    "timeline delayed by 2 weeks",
    "Frankfurt EU hosting mandatory",
    "talk to Alex by Friday on wireframes",
  ];

  const handleEnhance = () => {
    if (animatingStep === 1) return;
    setAnimatingStep(1);

    setTimeout(() => {
      setAnimatingStep(2);
      addToast('Notes synthesized into executive decisions');
    }, 1200);
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText("Frankfurt AWS cluster approved. General launch locked for Nov 14th.");
    addToast('Structured meeting notes copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="after" ref={containerRef} className="py-28 md:py-36 bg-[#F8F7F2] border-b border-[#E8E6DF] overflow-hidden relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-400/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C8E63A]/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#88867F]">
              03 &bull; Post-Meeting Execution
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#171717] leading-[0.95]">
            Leave with <span className="font-serif italic font-normal">clarity.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F5D57] leading-relaxed">
            The moment you hang up, Cadence extracts structured summaries, decisions, assigned owners, and deadlines. No 20-minute recap writing needed.
          </p>
        </div>

        {/* Polished Product Interaction Sandbox with 3D Overlapping Depth */}
        <motion.div 
          style={{ y: sandboxY }}
          className="bg-white rounded-3xl border border-[#DCDAD2] p-6 sm:p-10 shadow-[0_20px_60px_rgba(23,23,23,0.06)] relative overflow-hidden"
        >
          {/* Thin accent scanning line when processing */}
          {animatingStep === 1 && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#C8E63A] z-30 shadow-[0_0_16px_#C8E63A]"
            />
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E6DF] gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 border border-violet-200 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-violet-700 font-semibold bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                  Interactive Sandbox
                </span>
                <h3 className="text-xl font-[550] text-[#171717]">Try the Cadence AI Note Enhancer</h3>
              </div>
            </div>

            {/* Template Selector Chips */}
            <div className="flex items-center gap-1.5 bg-[#F8F7F2] p-1 rounded-full border border-[#DCDAD2] text-xs font-mono">
              {[
                { id: 'executive', label: 'Executive' },
                { id: 'prd', label: 'Linear PRD' },
                { id: 'sales', label: 'Sales CRM' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedFormat === fmt.id
                      ? 'bg-[#171717] text-[#FAF9F5] font-semibold shadow-xs'
                      : 'text-[#5F5D57] hover:text-[#171717]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center perspective-[1200px]">
            
            {/* LEFT: Raw Fragments (3D tilted left) */}
            <motion.div 
              style={{ rotate: rawCardTilt }}
              whileHover={{ rotate: 0, scale: 1.01, transition: { duration: 0.2 } }}
              className={`lg:col-span-5 bg-gradient-to-br from-[#FAF9F5] to-[#F1F0EA] p-6 rounded-2xl border border-amber-200/80 space-y-4 transition-all duration-300 shadow-xs cursor-pointer ${
                animatingStep === 1 ? 'filter blur-[1px] opacity-75' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-amber-800 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Raw Scratchpad Input
                </span>
                <span className="text-[10px] font-mono bg-white text-[#5F5D57] px-2 py-0.5 rounded border border-[#DCDAD2]">
                  4 Fragments
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#171717] font-mono leading-relaxed">
                {rawBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-[#E8E6DF] shadow-xs">
                    <span className="text-[#88867F] select-none">&bull;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[11px] text-[#88867F] font-mono">
                Typed during the conversation with zero formatting.
              </div>
            </motion.div>

            {/* CENTER: Enhance Button with Micro Animation */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnhance}
                disabled={animatingStep === 1}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  animatingStep === 2
                    ? 'bg-[#171717] text-[#C8E63A] border border-[#171717]'
                    : 'bg-[#C8E63A] text-[#171717] hover:bg-[#B8D62E]'
                }`}
              >
                {animatingStep === 1 ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#171717]" />
                    <span>Synthesizing...</span>
                  </>
                ) : animatingStep === 2 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C8E63A]" />
                    <span>✓ Enhanced</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Enhance notes</span>
                  </>
                )}
              </motion.button>
              <span className="text-[10px] font-mono text-[#88867F] text-center">
                Uses contextual audio
              </span>
            </div>

            {/* RIGHT: Structured Meeting Result (3D tilted right with colorful cards) */}
            <motion.div 
              style={{ rotate: resultCardTilt }}
              whileHover={{ rotate: 0, scale: 1.01, transition: { duration: 0.2 } }}
              className="lg:col-span-5 bg-gradient-to-br from-white to-[#F8FBF0] p-6 rounded-2xl border border-emerald-200/80 space-y-4 min-h-[300px] flex flex-col justify-between shadow-xs cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Structured Meeting Output
                  </span>
                  {animatingStep === 2 && (
                    <button
                      onClick={handleCopy}
                      className="text-[10px] font-mono text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer shadow-xs"
                    >
                      {copied ? 'Copied ✓' : 'Copy Spec'}
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {animatingStep === 2 ? (
                    <motion.div
                      key={`enhanced-${selectedFormat}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-3 text-xs"
                    >
                      {/* Executive Summary in Violet Card */}
                      <div className="p-3.5 bg-white rounded-xl border border-violet-100 space-y-1 shadow-xs">
                        <span className="text-[10px] font-mono text-violet-700 uppercase font-semibold">
                          Executive Synthesis
                        </span>
                        <p className="text-[#171717] leading-relaxed">
                          Alex raised pricing sensitivity for 450 engineers. <span className="lime-highlight font-medium">Frankfurt AWS hosting</span> remains a firm prerequisite before procurement sign-off.
                        </p>
                      </div>

                      {/* Agreed Decision in Emerald Card */}
                      <div className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-xs">
                        <span className="text-[10px] font-mono text-emerald-700 uppercase font-semibold">
                          Agreed Decision
                        </span>
                        <p className="text-[#171717] font-medium leading-relaxed">
                          Rollout shifted by 2 weeks to November 14th to allow SOC-2 and Frankfurt deployment completion.
                        </p>
                      </div>

                      {/* Assigned Tasks with Colored Chips */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-[#88867F] uppercase">Assigned Tasks (2)</span>
                        <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#E8E6DF] text-[11px] shadow-xs">
                          <span className="font-medium text-[#171717]">Deliver updated onboarding wireframes</span>
                          <span className="text-indigo-700 bg-indigo-50 border border-indigo-200 font-mono px-1.5 py-0.5 rounded text-[10px]">
                            Alex &bull; Friday
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#E8E6DF] text-[11px] shadow-xs">
                          <span className="font-medium text-[#171717]">Send Frankfurt AWS architecture</span>
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 font-mono px-1.5 py-0.5 rounded text-[10px]">
                            Sarah &bull; Monday
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-14 text-center text-[#88867F] text-xs"
                    >
                      <Sparkles className="w-8 h-8 text-[#C8E63A] mb-3 animate-pulse" />
                      <span className="max-w-xs">Click &ldquo;Enhance notes&rdquo; to transform raw bullets into executive decisions and action items.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-3 border-t border-[#E8E6DF] text-[10px] font-mono flex items-center justify-between">
                <span className="text-indigo-700 font-medium">Output: Markdown &bull; Slack &bull; Linear &bull; Notion</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ready to Push
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
