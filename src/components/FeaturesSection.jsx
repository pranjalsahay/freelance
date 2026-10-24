import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Database, 
  CheckSquare, 
  Calendar, 
  Check, 
  Sparkles,
  ArrowRight,
  Brain,
  ShieldAlert,
  Zap
} from 'lucide-react';

export default function FeaturesSection() {
  const showcaseFeatures = [
    {
      title: "CONTEXT",
      category: "PILLAR 01",
      categoryColor: "bg-blue-50 text-blue-700 border-blue-200",
      borderColor: "hover:border-blue-400 hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)]",
      headline: "Context is not metadata. Context changes meaning.",
      desc: "Intelligence should understand why information matters here, now, and for this objective.",
      visual: () => (
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#DCDAD2] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#88867F]">
            <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              CONTEXTUAL ANCHORING
            </span>
            <span className="text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px]">
              Active Objective
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-blue-100 space-y-1 font-sans text-xs shadow-xs">
            <span className="font-semibold text-[#171717] block flex items-center gap-1.5 text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Core Principle:
            </span>
            <p className="text-[#5F5D57]">"Intelligence must understand why information matters here, now, and for this objective."</p>
          </div>
        </div>
      ),
    },
    {
      title: "MEMORY",
      category: "PILLAR 02",
      categoryColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      borderColor: "hover:border-[#C8E63A] hover:shadow-[0_20px_50px_rgba(200,230,58,0.12)]",
      headline: "Experience should matter.",
      desc: "An intelligence that forgets everything is forced to repeatedly rediscover the world.",
      visual: () => (
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#DCDAD2] space-y-3 font-mono text-xs">
          <div className="p-3 bg-white rounded-xl border border-amber-100 space-y-1 font-sans text-xs">
            <span className="text-[10px] font-mono text-amber-700 uppercase font-semibold">The Rediscovery Flaw:</span>
            <p className="font-mono text-[#171717]">"Stateless models reset context after each interaction."</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-white to-[#F9FCED] rounded-xl border border-[#C8E63A]/80 space-y-1 font-sans text-xs shadow-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-800 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A]" />
              <span>Persistent Reality Grounding</span>
            </div>
            <p className="text-[#5F5D57] leading-relaxed">
              "Experience accumulates continuously across time, grounding all future decisions."
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "ADAPTATION",
      category: "PILLAR 03",
      categoryColor: "bg-violet-50 text-violet-700 border-violet-200",
      borderColor: "hover:border-violet-400 hover:shadow-[0_20px_50px_rgba(139,92,246,0.08)]",
      headline: "Intelligence should change when reality changes.",
      desc: "Continuous incorporation of meaningful information into active reasoning.",
      visual: () => (
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#DCDAD2] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-violet-700 font-medium">REALITY SHIFT DETECTED</span>
            <span className="text-violet-900 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full font-semibold text-[10px]">
              Continuous Loop
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-violet-100 space-y-1 font-sans text-xs shadow-xs">
            <span className="font-semibold text-[#171717] block text-violet-800">Operational Adjustment:</span>
            <p className="text-[#5F5D57]">"Understand. Adapt. Act. Learn. An unbroken cycle rather than static prompts."</p>
          </div>
        </div>
      ),
    },
    {
      title: "INDIVIDUALITY",
      category: "PILLAR 04",
      categoryColor: "bg-amber-50 text-amber-800 border-amber-200",
      borderColor: "hover:border-amber-400 hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)]",
      headline: "Different environments should produce different intelligence.",
      desc: "This difference is not a flaw; it is the point.",
      visual: () => (
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#DCDAD2] space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-indigo-100 text-xs font-sans shadow-xs">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-medium text-[#171717]">Environment Alpha &rarr; Specialized Logic</span>
            </div>
            <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              Grounded
            </span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-100 text-xs font-sans shadow-xs">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-medium text-[#171717]">Environment Beta &rarr; Distinct Cognition</span>
            </div>
            <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Individual
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="individuals" className="py-28 md:py-36 bg-[#F8F7F2] border-b border-[#E8E6DF] relative overflow-hidden">
      {/* Subtle ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-300/5 via-violet-300/5 to-[#C8E63A]/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#88867F]">
              05 &bull; RESEARCH DIRECTION
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#171717] leading-[0.95]">
            Artificial <span className="font-serif italic font-normal">individuals.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F5D57] leading-relaxed">
            A different way to think about machine intelligence. Systems designed to develop intelligence around context, objectives, experience and behaviour.
          </p>
        </div>

        {/* Large Editorial Showcase Blocks with 3D Hover Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1200px]">
          {showcaseFeatures.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, rotateX: 2, transition: { duration: 0.25 } }}
              className={`bg-white p-8 sm:p-10 rounded-3xl border border-[#DCDAD2] shadow-xs ${feat.borderColor} transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
            >
              <div className="space-y-4 mb-8">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border inline-block ${feat.categoryColor}`}>
                  {feat.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-[550] tracking-tight text-[#171717] leading-snug">
                  {feat.headline}
                </h3>
                <p className="text-sm text-[#5F5D57] leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>

              {/* Large interactive UI visual */}
              <div>
                {feat.visual()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
