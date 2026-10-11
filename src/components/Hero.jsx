import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X, Sparkles } from 'lucide-react';
import HeroProductMockup from './HeroProductMockup';
import { useToast } from '../context/ToastContext';
import { smoothScrollTo } from '../utils/scroll';

export default function Hero({ onOpenWorkspace }) {
  const containerRef = useRef(null);
  const { addToast } = useToast();
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Scroll parallax for product mockup & background decorative element (Section 7)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const bgShapeY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-[#F8F7F2] border-b border-[#E8E6DF] cadence-subtle-grid"
    >
      {/* Decorative ambient background blur */}
      <motion.div
        style={{ y: bgShapeY }}
        className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#C8E63A]/10 rounded-full filter blur-[120px] pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Asymmetric 55/45 Editorial Grid (Section 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Actions */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Redesigned Announcement Pill (Section 11) */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#DCDAD2] text-xs shadow-xs hover:border-[#171717] transition-all cursor-pointer group">
              <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
              <span className="font-mono text-[#5F5D57] text-[11px] font-medium tracking-tight">
                Cadence 2.0 &bull; The calm AI workspace
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5F5D57] transition-transform duration-200 group-hover:translate-x-1" />
            </div>

            {/* Editorial Contrast Headline (Section 4 & 5) */}
            <h1 className="text-6xl sm:text-7xl lg:text-[100px] xl:text-[112px] font-[550] tracking-[-0.055em] text-[#171717] leading-[0.91]">
              <span className="block font-sans">Meetings,</span>
              <span className="block font-serif font-normal text-[#171717]">
                made <span className="italic">useful.</span>
              </span>
            </h1>

            {/* Subhead with clear storytelling */}
            <p className="text-lg sm:text-xl text-[#5F5D57] max-w-lg leading-relaxed font-normal">
              Your AI workspace for every conversation. Prepare before the call. Stay present during it. Turn meetings into useful work afterward.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#pricing', -80);
                }}
                className="group inline-flex items-center justify-center gap-2 bg-[#C8E63A] text-[#171717] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#B8D62E] transition-all transform hover:-translate-y-0.5 shadow-xs cursor-pointer"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => {
                  setShowDemoModal(true);
                  addToast('Opening 90-second product demo');
                }}
                className="group inline-flex items-center justify-center gap-2 bg-white text-[#171717] border border-[#DCDAD2] px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[#F1F0EA] transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#5F5D57] transition-transform duration-200 group-hover:scale-110" />
                <span>Watch demo</span>
              </button>
            </div>

            {/* Subtle metadata footnote */}
            <div className="pt-2 text-xs font-mono text-[#88867F] flex items-center gap-3">
              <span>Zero bot attendees</span>
              <span>&bull;</span>
              <span>Local 48kHz audio capture</span>
              <span>&bull;</span>
              <span>macOS &bull; Windows</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Floating Asymmetric Product Visual (Section 6, 7, 8) */}
          <div className="lg:col-span-6 relative perspective-[1200px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotateX: 6, y: 80 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: mockupY }}
              className="w-full"
            >
              <HeroProductMockup onOpenFullWorkspace={() => onOpenWorkspace('northwind')} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Demo Modal with AnimatePresence */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDemoModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl bg-[#FAF9F5] rounded-3xl border border-[#DCDAD2] p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-[#171717]">Cadence Walkthrough &bull; 90 Seconds</h3>
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="p-1.5 rounded-full text-[#88867F] hover:text-[#171717] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="aspect-video w-full bg-[#171717] rounded-2xl flex flex-col items-center justify-center text-center p-8 text-[#F8F7F2] relative overflow-hidden">
                <Sparkles className="w-10 h-10 text-[#C8E63A] mb-3 animate-pulse" />
                <h4 className="text-xl font-semibold mb-2">Simulated Interactive Workspace</h4>
                <p className="text-xs text-[#88867F] max-w-md mb-6 leading-relaxed">
                  Cadence records locally without inviting a bot to the call. Transcripts, decisions, and tasks are extracted and synced seamlessly with Linear, Notion, and Slack.
                </p>
                <button
                  onClick={() => {
                    setShowDemoModal(false);
                    onOpenWorkspace('northwind');
                  }}
                  className="bg-[#C8E63A] text-[#171717] px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#B8D62E] transition-colors cursor-pointer"
                >
                  Launch Active Workspace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
