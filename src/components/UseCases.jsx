import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, Compass, UserCheck, Shield, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UseCases() {
  const [activeTab, setActiveTab] = useState('sales');

  const tabs = [
    { id: 'sales', label: 'Sales & Revenue', icon: Briefcase, color: 'text-emerald-400' },
    { id: 'product', label: 'Product & Design', icon: Compass, color: 'text-blue-400' },
    { id: 'engineering', label: 'Engineering', icon: Code, color: 'text-violet-400' },
    { id: 'recruiting', label: 'Recruiting', icon: UserCheck, color: 'text-amber-400' },
    { id: 'leadership', label: 'Leadership', icon: Shield, color: 'text-indigo-400' },
  ];

  const contentMap = {
    sales: {
      headline: "Capture prospect pain points and push structured CRM updates in seconds.",
      tag: "Revenue Operations",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      metricBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      bullets: [
        "Identifies budget, authority, need, and timeline (BANT) signals automatically.",
        "Logs call highlights, commitments, and objections directly into Salesforce or HubSpot.",
        "Drafts personalized follow-up emails highlighting the customer's exact words.",
      ],
      metric: "3.5 hrs saved per rep weekly",
      metricSub: "Measured across 250 enterprise quota carriers.",
    },
    product: {
      headline: "Transform user interviews into actionable feature specs and bug reports.",
      tag: "Product Discovery",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
      metricBadge: "bg-blue-50 text-blue-800 border-blue-200",
      bullets: [
        "Synthesizes recurring user friction across 20+ qualitative interviews.",
        "Auto-extracts verbatim customer quotes for user journey mapping and PRDs.",
        "Generates initial feature problem statements directly for Linear or Jira.",
      ],
      metric: "Zero lost user insights",
      metricSub: "100% customer feedback mapped to active backlog.",
    },
    engineering: {
      headline: "Preserve technical architecture decisions without taking engineers out of flow.",
      tag: "Technical Architecture",
      badgeColor: "bg-violet-50 text-violet-800 border-violet-200",
      metricBadge: "bg-violet-50 text-violet-800 border-violet-200",
      bullets: [
        "Documents tradeoffs discussed during sprint planning and RFC debates.",
        "Auto-tags assigned engineers, blockers, and dependencies in issue trackers.",
        "Retains exact technical reasoning behind complex infrastructure pivots.",
      ],
      metric: "100% RFC clarity",
      metricSub: "Eliminates repeated debates on past technical decisions.",
    },
    recruiting: {
      headline: "Conduct candid candidate evaluations while maintaining structured records.",
      tag: "Talent Acquisition",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      metricBadge: "bg-amber-50 text-amber-800 border-amber-200",
      bullets: [
        "Scores interview competencies objectively against role scorecards.",
        "Summarizes strengths, weaknesses, and potential red flags without bias.",
        "Syncs debrief notes directly into Greenhouse, Lever, or Ashby.",
      ],
      metric: "40% faster hiring decisions",
      metricSub: "Hiring managers reach consensus in single debrief session.",
    },
    leadership: {
      headline: "Maintain accountability across cross-functional leadership syncs.",
      tag: "Executive Governance",
      badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
      metricBadge: "bg-indigo-50 text-indigo-800 border-indigo-200",
      bullets: [
        "Tracks commitments made across executive committee meetings.",
        "Creates board meeting summaries and investor update bullet points instantly.",
        "Preserves the institutional memory of how critical company decisions were made.",
      ],
      metric: "Total executive alignment",
      metricSub: "Zero dropped commitments between board meetings.",
    },
  };

  const current = contentMap[activeTab];

  return (
    <section className="py-28 md:py-36 bg-white border-b border-[#E8E6DF] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        <div className="max-w-2xl mb-14 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#88867F]">
              Tailored For Teams
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-[550] tracking-tight text-[#171717]">
            Purpose-built for every department.
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#E8E6DF] relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-[#C8E63A] font-semibold'
                    : 'text-[#5F5D57] hover:text-[#171717] hover:bg-[#F8F7F2]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeUseCasePill"
                    className="absolute inset-0 bg-[#171717] rounded-full shadow-xs -z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? tab.color : 'text-current'}`} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content with Animated Crossfade & Tasteful Color Elevation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-gradient-to-br from-[#FAF9F5] to-[#F3F2EC] p-8 sm:p-12 rounded-3xl border border-[#DCDAD2] shadow-[0_12px_40px_rgba(23,23,23,0.04)]"
          >
            <div className="lg:col-span-8 space-y-6">
              <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border inline-block ${current.badgeColor}`}>
                {current.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-[550] text-[#171717] leading-snug">
                {current.headline}
              </h3>
              <ul className="space-y-3.5 text-sm text-[#4A4843] leading-relaxed">
                {current.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#171717] mt-0.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 bg-white p-7 sm:p-8 rounded-2xl border border-[#DCDAD2] text-center space-y-3 shadow-xs">
              <span className="text-[10px] font-mono text-[#88867F] uppercase tracking-wider block">
                Impact Outcome
              </span>
              <div className={`text-xl sm:text-2xl font-[550] py-2 px-3 rounded-xl border font-sans ${current.metricBadge}`}>
                {current.metric}
              </div>
              <p className="text-xs text-[#5F5D57] leading-relaxed">
                {current.metricSub}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
