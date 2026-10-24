import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  Check, 
  Copy, 
  ChevronRight, 
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function HeroProductMockup({ onOpenFullWorkspace }) {
  const containerRef = useRef(null);
  const { addToast } = useToast();
  const [aiEnhancedVisible, setAiEnhancedVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll transforms for the 3D overlapping tilted card stack
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Back Card 1 (Calendar Dossier - Tilted Left)
  const card1Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, -9, -13]);
  const card1X = useTransform(scrollYProgress, [0, 0.5, 1], [-25, -55, -90]);
  const card1Y = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 10, 35]);

  // Back Card 2 (AI Semantic Memory - Tilted Right)
  const card2Rotate = useTransform(scrollYProgress, [0, 0.5, 1], [4, 7, 11]);
  const card2X = useTransform(scrollYProgress, [0, 0.5, 1], [25, 55, 90]);
  const card2Y = useTransform(scrollYProgress, [0, 0.5, 1], [-20, -35, -55]);

  // Front Card 3 (Main Notepad)
  const frontCardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -3]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAiEnhancedVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText("Frankfurt AWS cluster locked for EU data sovereignty. Launch target: Nov 14th.");
    addToast('Meeting synthesis copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      data-cursor="interactive"
      className="relative w-full perspective-[1200px] select-none py-6 sm:py-10"
    >
      {/* =========================================================================
          BACK CARD 1 (Z-INDEX 10): Tilted Left — Calendar & Pre-Meeting Brief
          Palette: Soft Cobalt Blue, Fresh Emerald, Calm Ivory
          ========================================================================= */}
      <motion.div
        style={{
          rotate: card1Rotate,
          x: card1X,
          y: card1Y,
        }}
        whileHover={{ zIndex: 40, scale: 1.03, rotate: -2, transition: { duration: 0.25 } }}
        className="absolute -top-6 left-2 sm:-left-4 w-[85%] sm:w-[80%] bg-[#FFFFFF]/90 backdrop-blur-md rounded-3xl border border-blue-200/80 p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)] z-10 transition-shadow hover:shadow-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Calendar Sync &bull; Google Meet
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#88867F]">In 14 mins</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-[550] text-[#171717]">
            Acme Corp &mdash; Q4 Architecture &amp; Licensing
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-[#5F5D57]">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
              ER
            </span>
            <span>Elena Rostova (VP Eng)</span>
            <span className="text-[#88867F]">&bull;</span>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
              DM
            </span>
            <span>David Miller (Security)</span>
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#E8E6DF] flex items-center justify-between">
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            92% Dossier Ready
          </span>
          <span className="text-[10px] font-mono text-[#88867F]">3 Unresolved Objections Flagged</span>
        </div>
      </motion.div>

      {/* =========================================================================
          BACK CARD 2 (Z-INDEX 20): Tilted Right — Cross-Meeting AI Recall
          Palette: Electric Violet, Warm Amber, Dark Slate
          ========================================================================= */}
      <motion.div
        style={{
          rotate: card2Rotate,
          x: card2X,
          y: card2Y,
        }}
        whileHover={{ zIndex: 40, scale: 1.03, rotate: 2, transition: { duration: 0.25 } }}
        className="absolute -top-4 right-2 sm:-right-4 w-[85%] sm:w-[80%] bg-[#FFFFFF]/90 backdrop-blur-md rounded-3xl border border-violet-200/80 p-5 shadow-[0_20px_50px_rgba(124,58,237,0.08)] z-20 transition-shadow hover:shadow-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF] mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-violet-700 font-semibold bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
              Cross-Meeting Neural Recall
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#88867F] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
            Linear #ENG-842
          </span>
        </div>

        <p className="text-xs text-[#171717] leading-relaxed font-sans">
          &ldquo;David confirmed German enterprise prospects will refuse renewal without Frankfurt AWS data residency guarantees.&rdquo;
        </p>

        <div className="mt-3.5 pt-3 border-t border-[#E8E6DF] flex items-center justify-between text-[10px] font-mono text-[#88867F]">
          <span className="text-violet-700 font-semibold">14 Linked Calls</span>
          <span>Cited: Sept 28 @ 14:28</span>
        </div>
      </motion.div>

      {/* =========================================================================
          FRONT MAIN CARD (Z-INDEX 30): Primary Cadence Live Meeting Notepad
          Palette: Pure White, Deep Ink, Cadence Lime, Emerald & Cobalt Chips
          ========================================================================= */}
      <motion.div 
        style={{
          rotateX: frontCardRotateX,
        }}
        className="relative z-30 w-full bg-[#FFFFFF] rounded-3xl border border-[#DCDAD2] shadow-[0_32px_80px_-20px_rgba(23,23,23,0.16)] overflow-hidden transition-all duration-300"
      >
        {/* Top Application Header Bar */}
        <div className="bg-[#F8F7F2] px-5 py-3 border-b border-[#E8E6DF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E6DF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E6DF]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E6DF]" />
            </div>
            <span className="text-xs font-mono text-[#5F5D57] font-medium">
              Knull &bull; Artificial Individual &times; Active Context
            </span>
          </div>

          {/* Live Recording Indicator with Emerald Pulse + Lime Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-900 font-semibold text-[11px]">Context Active</span>
            </div>

            <button
              onClick={onOpenFullWorkspace}
              className="text-xs font-medium text-[#171717] bg-white hover:bg-[#F1F0EA] px-2.5 py-1 rounded-full border border-[#DCDAD2] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Research</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Split Mockup Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] text-xs">
          
          {/* Left Side: Live Meeting & Note Stream */}
          <div className="md:col-span-7 bg-white p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E6DF]">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#88867F]">Continuous Loop &bull; Real-time</span>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                      Contextual AI
                    </span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="text-[#88867F] hover:text-[#171717] transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-[550] tracking-tight text-[#171717]">
                  Artificial Individual &mdash; Operational Loop
                </h2>
              </div>

              {/* What user typed: Raw Scratchpad */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#88867F]">
                    Observed Inputs
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Active reality
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8F7F2] border border-[#E8E6DF] text-xs text-[#171717] font-mono space-y-1.5">
                  <p>&bull; Generalization creates distance; to generalize is to abstract</p>
                  <p>&bull; Context is not metadata; context changes meaning</p>
                  <p>&bull; Long-term advantage is accumulated experience in reality</p>
                </div>
              </div>

              {/* AI Enhancement Reveal with Violet + Lime Highlight */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#88867F]">
                    Knull Synthesis
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full font-semibold border border-violet-200">
                    <Sparkles className="w-2.5 h-2.5 text-violet-600" />
                    Cognitive Loop
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={aiEnhancedVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-white to-[#FAFDF0] border border-[#C8E63A]/70 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-xs text-[#171717]">Core Thesis:</h4>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                      Validated
                    </span>
                  </div>
                  <p className="text-xs text-[#5F5D57] leading-relaxed">
                    Human intelligence is never truly detached from the individual using it. Systems designed to develop intelligence around <span className="lime-highlight font-medium text-[#171717]">context, objectives, experience and behaviour</span>.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E6DF] text-[11px] text-[#88867F] font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Adaptive Loop: Understand &bull; Adapt &bull; Act &bull; Learn
              </span>
              <span className="text-[#171717] font-semibold">Individualized</span>
            </div>
          </div>

          {/* Right Side: Action Items & Decisions */}
          <div className="md:col-span-5 bg-[#F8F7F2] p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E6DF]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#171717] font-semibold">
                  Autonomous Directives
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium">
                  3 Loops
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { task: "Understand: Decode situational objectives & constraints", owner: "Context Engine", due: "Continuous", done: true, tag: "Loop #01", tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200" },
                  { task: "Adapt: Incorporate environmental reality changes", owner: "Adaptive Core", due: "Active", done: true, tag: "Loop #02", tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { task: "Learn: Commit accumulated experience into memory", owner: "Memory Vault", due: "Persistent", done: false, tag: "Loop #03", tagColor: "bg-amber-50 text-amber-700 border-amber-200" },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#E8E6DF] space-y-1.5 shadow-xs hover:border-[#171717] transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${item.done ? 'text-emerald-600' : 'text-[#DCDAD2]'}`} />
                      <span className={`text-xs ${item.done ? 'text-[#5F5D57]' : 'text-[#171717] font-medium'}`}>
                        {item.task}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#88867F] pl-5">
                      <span>{item.owner}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] border font-medium ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-gradient-to-r from-white to-[#F9F8F2] rounded-xl border border-amber-200/70 text-[11px] text-[#5F5D57] space-y-1 font-mono shadow-xs">
                <span className="text-amber-900 font-semibold block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Core Principle:
                </span>
                <p className="text-[#171717] font-sans">&bull; Long-term advantage is the accumulated experience of systems in reality.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E6DF] text-[11px] font-mono text-[#88867F] flex items-center justify-between">
              <span className="text-indigo-700 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                Loop: Understand &bull; Adapt &bull; Act &bull; Learn
              </span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Active Loop
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
