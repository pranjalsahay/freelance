import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Sparkles, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AIMemory() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-60px' });
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("What did customers say about onboarding?");
  const [activeQuery, setActiveQuery] = useState("What did customers say about onboarding?");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  // Bidirectional continuous scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const workspaceY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.35, 0.1]);

  const sampleQueries = [
    "What did customers say about onboarding?",
    "What did we promise Acme?",
    "When is the Frankfurt AWS cluster launching?",
  ];

  const handleRunSearch = (q) => {
    setIsSearching(true);
    setSearchQuery(q);
    setActiveQuery(q);

    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      addToast(`Retrieved cited answers for: "${q}"`);
    }, 750);
  };

  return (
    <section id="memory" ref={containerRef} className="py-28 md:py-36 bg-white border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#88867F]">
              04 &bull; Cross-Meeting Recall
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-[550] tracking-[-0.04em] text-[#171717] leading-[0.95]">
            Remember <span className="font-serif italic font-normal">everything.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5F5D57] leading-relaxed">
            Ask Cadence what happened across every conversation. Uncover commitments, customer feedback, and technical decisions cited directly to the exact spoken second.
          </p>
        </div>

        {/* AI Memory Search Workspace with Parallax */}
        <motion.div 
          style={{ y: workspaceY }}
          className="bg-[#F8F7F2] rounded-3xl border border-[#DCDAD2] p-6 sm:p-10 shadow-xs space-y-8 relative overflow-hidden"
        >
          {/* Subtle SVG Connection Line with Dynamic Scroll Opacity */}
          <motion.svg 
            style={{ opacity: lineOpacity }}
            className="absolute inset-0 w-full h-full pointer-events-none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 120 100 Q 240 180 400 220 T 800 320"
              fill="none"
              stroke="#171717"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </motion.svg>

          {/* Search Input Bar with Smooth Expansion */}
          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DCDAD2] focus-within:border-[#171717] transition-all shadow-xs">
              <Search className="w-5 h-5 text-[#88867F] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunSearch(searchQuery)}
                placeholder="Ask anything about your past conversations..."
                className="w-full bg-transparent text-sm sm:text-base text-[#171717] placeholder-[#88867F] focus:outline-none"
              />
              <button
                onClick={() => handleRunSearch(searchQuery)}
                disabled={isSearching}
                className="px-5 py-2.5 rounded-xl bg-[#171717] text-[#FAF9F5] text-xs font-semibold hover:bg-black transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {isSearching ? (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-bounce" style={{ animationDelay: '120ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A] animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                ) : (
                  <>
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Clickable Example Prompts */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#88867F] font-mono text-[11px]">Example queries:</span>
              {sampleQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => handleRunSearch(q)}
                  className={`px-3 py-1 rounded-full border text-[11px] transition-all cursor-pointer ${
                    activeQuery === q
                      ? 'bg-[#171717] text-[#C8E63A] border-[#171717] font-semibold scale-105'
                      : 'bg-white text-[#5F5D57] border-[#DCDAD2] hover:border-[#171717]'
                  }`}
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>

          {/* AI Synthesized Response Area with AnimatePresence */}
          <AnimatePresence mode="wait">
            {hasSearched && (
              <motion.div
                key={activeQuery}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCDAD2] space-y-6 relative z-10 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#171717] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
                    <span>Synthesized Across 14 Meetings</span>
                  </div>

                  {activeQuery.includes("Acme") ? (
                    <p className="text-sm sm:text-base text-[#171717] leading-relaxed font-sans">
                      "You committed to sending the revised pricing proposal by Friday. David Miller confirmed that Frankfurt data residency is a non-negotiable blocker for their 450 engineering seats."
                    </p>
                  ) : activeQuery.includes("Frankfurt") ? (
                    <p className="text-sm sm:text-base text-[#171717] leading-relaxed font-sans">
                      "Alex Morgan and Sarah Chen locked November 14th for the dedicated Frankfurt AWS deployment, providing a two-week buffer for penetration testing."
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base text-[#171717] leading-relaxed font-sans">
                      "Across 14 customer conversations, onboarding friction appeared repeatedly. Specifically, <span className="lime-highlight font-medium">8 enterprise teams</span> requested self-serve SSO, while 6 pointed to confusion in workspace invitations."
                    </p>
                  )}
                </div>

                {/* Source Cards with Tooltips */}
                <div className="pt-5 border-t border-[#E8E6DF] space-y-3">
                  <span className="text-[11px] font-mono text-[#88867F] uppercase block">
                    Verified Citations (Hover to inspect spoken snippet):
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {[
                      {
                        title: "Customer Discovery with Figma",
                        date: "Sept 14 &bull; 10:30 AM",
                        snippet: "'Three designers got stuck waiting for IT admin approval during OAuth setup.'",
                      },
                      {
                        title: "Product Architecture Review",
                        date: "Sept 21 &bull; 3:00 PM",
                        snippet: "'Alex: Let's prioritize SSO invite-links in sprint 24 to clear up customer tickets.'",
                      },
                      {
                        title: "Enterprise Call with Acme",
                        date: "Sept 28 &bull; 2:15 PM",
                        snippet: "'David Miller: We cannot deploy to our 450 developers without Okta SCIM provisioning.'",
                      },
                    ].map((source, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.18 }}
                        className="p-4 rounded-xl border border-[#E8E6DF] bg-[#FAF9F5] hover:bg-white hover:border-[#171717] transition-all space-y-2 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#88867F]">
                          <span dangerouslySetInnerHTML={{ __html: source.date }} />
                          <FileText className="w-3.5 h-3.5 text-[#5F5D57] group-hover:text-[#171717]" />
                        </div>
                        <h4 className="font-semibold text-xs text-[#171717] group-hover:underline">
                          {source.title}
                        </h4>
                        <p className="text-[11px] text-[#5F5D57] italic leading-snug">
                          {source.snippet}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
