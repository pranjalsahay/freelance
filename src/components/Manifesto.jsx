import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Manifesto() {
  return (
    <section id="manifesto" className="py-24 md:py-36 bg-[#F5F3EE] text-center border-b border-[#E5E0D8]">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#8F8D85] block mb-4">
          The Manifesto
        </span>
        <h2 className="text-4xl sm:text-6xl font-serif text-[#141413] mb-6 leading-tight">
          Stop taking notes. <br /> Start building momentum.
        </h2>
        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#5C5B56] leading-relaxed mb-10">
          Startup combines human intent with machine memory. Reclaim 10 hours every week to focus strictly on what moves the needle: shipping product and delighting users.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a 
            href="#canvas" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#141413] text-[#FAF9F6] px-8 py-4 rounded-full text-sm font-semibold hover:bg-black transition-all shadow-sm"
          >
            <span>Download Startup Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#hero" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#141413] border border-[#E5E0D8] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#FAF9F6] transition-colors"
          >
            Back to Top
          </a>
        </div>
      </div>
    </section>
  );
}
