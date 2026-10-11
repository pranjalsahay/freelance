import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Pricing({ onOpenWorkspace }) {
  const [isAnnual, setIsAnnual] = useState(true);
  const { addToast } = useToast();

  const plans = [
    {
      name: "Free",
      tagline: "For individual builders exploring meeting clarity.",
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        "Unlimited local 48kHz audio capture",
        "30 AI note enhancements / month",
        "macOS & Windows desktop app",
        "Markdown & plain text export",
        "Zero bots in your meetings",
      ],
      cta: "Download Free App",
      popular: false,
    },
    {
      name: "Pro",
      tagline: "For operators in back-to-back high-stakes calls.",
      priceMonthly: 20,
      priceAnnual: 16,
      features: [
        "Unlimited AI meeting notes & transcripts",
        "Pre-meeting briefing dossier",
        "Cross-meeting AI memory & semantic search",
        "Two-way sync with Linear, Notion, & Slack",
        "Priority Claude 3.5 & GPT-4o inference",
      ],
      cta: "Start 14-Day Free Trial",
      popular: true,
    },
    {
      name: "Team",
      tagline: "For collaborative squads sharing organizational memory.",
      priceMonthly: 38,
      priceAnnual: 30,
      features: [
        "Everything in Pro, plus:",
        "Shared organizational knowledge graph",
        "Team meeting templates & repositories",
        "Automated team action item delegation",
        "Admin user management & seat billing",
      ],
      cta: "Create Team Workspace",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 md:py-36 bg-[#F8F7F2] border-b border-[#E8E6DF]">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#88867F] block mb-3">
            Predictable Plans
          </span>
          <h2 className="text-4xl sm:text-6xl font-[550] tracking-tight text-[#171717]">
            Simple pricing for serious teams.
          </h2>
          <p className="mt-4 text-base text-[#5F5D57]">
            Start free without a credit card. Upgrade when you need continuous cross-meeting intelligence.
          </p>

          {/* Billing Switcher with Fluid layoutId Pill */}
          <div className="inline-flex items-center gap-1 bg-white p-1.5 rounded-full border border-[#DCDAD2] mt-8 shadow-xs relative">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                !isAnnual
                  ? 'text-white font-semibold'
                  : 'text-[#5F5D57] hover:text-[#171717]'
              }`}
            >
              {!isAnnual && (
                <motion.div
                  layoutId="billingTogglePill"
                  className="absolute inset-0 bg-[#171717] rounded-full shadow-xs -z-0"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">Monthly Billing</span>
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                isAnnual
                  ? 'text-white font-semibold'
                  : 'text-[#5F5D57] hover:text-[#171717]'
              }`}
            >
              {isAnnual && (
                <motion.div
                  layoutId="billingTogglePill"
                  className="absolute inset-0 bg-[#171717] rounded-full shadow-xs -z-0"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Annual Billing</span>
                <span className="bg-[#C8E63A] text-[#171717] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Clean 3-Tier Grid with Lime Pro Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={i}
                className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-white border-2 border-[#171717] shadow-xl md:-translate-y-2'
                    : 'bg-white border border-[#DCDAD2] shadow-xs hover:border-[#171717] hover:-translate-y-1'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-8 bg-[#C8E63A] text-[#171717] text-[11px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-[#171717]/10 flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    Recommended
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-[550] text-[#171717]">{plan.name}</h3>
                    <p className="text-xs text-[#5F5D57] mt-1 min-h-[34px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price with Smooth AnimatePresence */}
                  <div className="mb-6 pb-6 border-b border-[#E8E6DF]">
                    <div className="flex items-baseline gap-1">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.2 }}
                          className="text-5xl font-[550] text-[#171717] inline-block font-sans"
                        >
                          ${price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-xs text-[#88867F] font-mono">
                        / user / month
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 text-xs text-[#4A4843] mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    if (plan.cta.includes("Free App") && onOpenWorkspace) {
                      onOpenWorkspace('northwind');
                    } else if (onOpenWorkspace) {
                      onOpenWorkspace('northwind');
                      addToast(`Selected ${plan.name} plan & loaded workspace`);
                    } else {
                      addToast(`Selected ${plan.name} tier`);
                    }
                  }}
                  className={`w-full py-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-[#C8E63A] text-[#171717] hover:bg-[#B8D62E] shadow-xs hover:shadow-md'
                      : 'bg-[#F8F7F2] border border-[#DCDAD2] text-[#171717] hover:bg-[#F1F0EA]'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
