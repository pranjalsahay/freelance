import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Founder() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-80px' });
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.2, 0.9]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleContact = () => {
    setCopied(true);
    navigator.clipboard?.writeText("arjun@knull.ai");
    addToast('Founder contact copied: arjun@knull.ai');
    setTimeout(() => {
      setCopied(false);
      window.location.href = "mailto:arjun@knull.ai?subject=Inquiry%20regarding%20Knull";
    }, 900);
  };

  return (
    <section 
      id="founder"
      ref={containerRef}
      className="py-28 md:py-36 bg-[#0B0B0D] text-[#F8F7F2] relative overflow-hidden border-b border-[#222225] select-none"
    >
      {/* Subtle Engineering Matrix Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Ambient Radial Lighting Glow */}
      <motion.div
        style={{ scale: glowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[580px] h-[580px] bg-[#5865F2]/15 rounded-full filter blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Founder Bio & Directives */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Monospace Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#6E82FE] font-medium">
                THE FOUNDER
              </span>
            </motion.div>

            {/* Bold Name Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase"
            >
              ARJUN R.
            </motion.h2>

            {/* Background Bio Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed max-w-xl font-normal"
            >
              Founder of Knull. Background across business, finance, entrepreneurship, and environmental research.
            </motion.p>

            {/* Core Philosophy Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed max-w-xl font-normal">
                &ldquo;Knull was born from looking at complex systems across disciplines. The most important behaviour is often found in the relationships between things, not in the things themselves.&rdquo;
              </p>
            </motion.div>

            {/* Interactive Contact Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pt-4"
            >
              <button
                onClick={handleContact}
                className="group inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-mono text-xs font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(88,101,242,0.35)] cursor-pointer tracking-wider uppercase"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied (arjun@knull.ai)</span>
                  </>
                ) : (
                  <>
                    <span>CONTACT ARJUN</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Minimalist AR Monogram Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              ref={cardRef}
              style={{ y: cardY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] bg-[#121215] rounded-3xl border border-[#27272A] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between items-center text-center overflow-hidden group cursor-pointer"
            >
              {/* Subtle dynamic sheen on mouse hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(88, 101, 242, 0.15), transparent 70%)`
                }}
              />

              {/* Top metadata pill */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#71717A] border-b border-[#222226] pb-4 relative z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2] animate-pulse" />
                  <span>KNULL LABS</span>
                </span>
                <span className="uppercase">FOUNDER</span>
              </div>

              {/* Center AR Monogram with elegant depth */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto select-none">
                <motion.div
                  animate={{
                    x: mousePos.x * 12,
                    y: mousePos.y * 12,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative"
                >
                  <span className="font-sans font-bold text-7xl sm:text-8xl tracking-[0.18em] text-[#2C2C32] group-hover:text-[#42424A] transition-colors duration-300 block pl-3">
                    AR
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-sans font-bold text-7xl sm:text-8xl tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent block pl-3">
                      AR
                    </span>
                  </div>
                </motion.div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#52525B] mt-4 block">
                  ARJUN R.
                </span>
              </div>

              {/* Bottom Card Footer */}
              <div className="w-full pt-4 border-t border-[#222226] flex items-center justify-between text-[10px] font-mono text-[#71717A] relative z-10">
                <span>Artificial Individuals</span>
                <span className="text-[#6E82FE] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#5865F2]" />
                  <span>Research Lead</span>
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
