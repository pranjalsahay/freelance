import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  Search,
  MessageSquare,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const MEETINGS_DATA = {
  northwind: {
    id: 'northwind',
    label: 'Northwind × Acme',
    time: '2:30 PM &bull; Today',
    meta: 'Thursday, 2:30 PM &bull; 42 mins',
    title: 'Northwind × Acme — Product Strategy & Architecture',
    badge: 'Synthesized',
    executiveSummary: 'Acme confirmed strong interest in expanding to the full enterprise license. The meeting focused on resolving two key requirements: European data localization in the Frankfurt cluster and custom SSO Okta provisioning. Launch date locked for November 14th.',
    decisions: [
      { label: "Launch Date", desc: "Target release shifted from Oct 31 to Nov 14 to provide buffer for penetration testing." },
      { label: "Hosting", desc: "Database instances for EU enterprise clients will be dedicated to Frankfurt AWS cluster." },
      { label: "Pricing Tier", desc: "Annual commitment of $94,000 approved subject to technical SLA confirmation." },
    ],
    transcript: [
      { speaker: "Alex Morgan", time: "14:22:04", text: "Welcome everyone. Let's start with the onboarding telemetry. Sarah, how are the EU prospects feeling about the timeline?" },
      { speaker: "Sarah Chen", time: "14:22:45", text: "They're supportive, but data sovereignty is non-negotiable. If Frankfurt isn't online by November, they will defer procurement to Q1." },
      { speaker: "James Wilson", time: "14:24:12", text: "We can commit to Frankfurt by October 24th. Our infrastructure team already prepared the Terraform scripts last week." },
      { speaker: "Alex Morgan", time: "14:26:08", text: "Great. Then let's officially lock November 14th as the general release date. I will draft the customer notice." },
    ],
    actions: [
      { id: 1, task: "Provide revised enterprise pricing proposal with Frankfurt hosting addendum", owner: "Alex Morgan", due: "Oct 12", done: true },
      { id: 2, task: "Complete SOC-2 Type II audit checklist for procurement review", owner: "Sarah Chen", due: "Oct 15", done: false },
      { id: 3, task: "Deliver updated interactive onboarding wireframes", owner: "Alex Morgan", due: "Oct 16", done: false },
      { id: 4, task: "Schedule contract review sync with Acme CFO", owner: "James Wilson", due: "Oct 18", done: false },
    ],
    defaultQ: "What were the primary objections raised by Sarah?",
    defaultA: "Sarah raised concerns about EU data localization. She specifically noted that German enterprise clients will reject contracts without Frankfurt hosting guarantees.",
  },
  q4: {
    id: 'q4',
    label: 'Q4 Engineering Planning',
    time: '11:00 AM &bull; Yesterday',
    meta: 'Yesterday, 11:00 AM &bull; 55 mins',
    title: 'Q4 Engineering Planning & Infrastructure Migration',
    badge: 'Approved',
    executiveSummary: 'Engineering leadership agreed to prioritize database partitioning and GraphQL gateway migration ahead of the holiday traffic surge. Zero-downtime blue/green deployment strategy locked.',
    decisions: [
      { label: "Infra", desc: "Postgres database clusters will migrate to Aurora Serverless v2 by Oct 28." },
      { label: "Staffing", desc: "2 senior engineers dedicated to load testing and synthetic benchmark suites." },
      { label: "Feature Freeze", desc: "Code freeze scheduled for Dec 10 to guarantee stability through Q4 enterprise renewals." },
    ],
    transcript: [
      { speaker: "Elena Rostova", time: "11:04:12", text: "We cannot afford an outage during Cyber Week. Database connection pooling failed at 45k concurrent users last quarter." },
      { speaker: "Marcus Thorne", time: "11:08:30", text: "Aurora Serverless v2 automatically scales within 8 seconds. We tested the failover mechanism yesterday with 0 dropped packets." },
      { speaker: "Elena Rostova", time: "11:15:22", text: "Approved. Let's schedule the migration window for Sunday 2 AM UTC." },
    ],
    actions: [
      { id: 5, task: "Benchmark Aurora Serverless v2 cluster at 75k simulated TPS", owner: "Marcus Thorne", due: "Oct 20", done: true },
      { id: 6, task: "Set up automated rollback canary in Datadog", owner: "Elena Rostova", due: "Oct 22", done: false },
      { id: 7, task: "Notify enterprise customers about scheduled 15-minute maintenance window", owner: "Alex Morgan", due: "Oct 25", done: false },
    ],
    defaultQ: "What was the resolution for database scaling?",
    defaultA: "Elena and Marcus approved migrating to Aurora Serverless v2 by Oct 28. Tests showed seamless failover under load with zero packet loss.",
  },
  discovery: {
    id: 'discovery',
    label: 'Enterprise Discovery Call',
    time: 'Oct 4 &bull; 45 mins',
    meta: 'Oct 4, 3:15 PM &bull; 38 mins',
    title: 'Enterprise Discovery Call with Linear Engineering',
    badge: 'Qualified',
    executiveSummary: 'Linear engineering leads explored Cadence two-way sync integrations for automated issue creation and PRD extraction. Mutual agreement on launching a 50-seat pilot program.',
    decisions: [
      { label: "API Access", desc: "Partner webhook API credentials will be provisioned by Friday for testing." },
      { label: "Security", desc: "SOC-2 Type II audit report reviewed and approved by infosec lead." },
      { label: "Pilot Rollout", desc: "50-seat engineering pilot kickoff scheduled for Monday morning." },
    ],
    transcript: [
      { speaker: "Chloe Dubois", time: "15:18:10", text: "Our team wastes 4 hours every sprint translating Zoom discussions into Linear tickets. We want Cadence to auto-generate issue drafts." },
      { speaker: "Alex Morgan", time: "15:22:40", text: "Cadence isolates decisions and extracts assignee, priority, and markdown description automatically. You just click sync." },
      { speaker: "Chloe Dubois", time: "15:30:15", text: "That fits our exact workflow. Let's proceed with the 50-seat sandbox this month." },
    ],
    actions: [
      { id: 8, task: "Generate custom OAuth client ID for Linear workspace", owner: "Alex Morgan", due: "Oct 10", done: true },
      { id: 9, task: "Conduct kickoff sync with Linear design engineering team", owner: "Chloe Dubois", due: "Oct 14", done: false },
    ],
    defaultQ: "What workflow problem did Linear highlight?",
    defaultA: "Chloe highlighted that engineers spend over 4 hours per sprint manually transcribing meeting action items into Linear tickets.",
  },
};

export default function MeetingWorkspace({ onClose, initialMeetingId = 'northwind' }) {
  const { addToast } = useToast();
  const [selectedMeetingId, setSelectedMeetingId] = useState(
    MEETINGS_DATA[initialMeetingId] ? initialMeetingId : 'northwind'
  );
  const [activeTab, setActiveTab] = useState('notes');
  const [aiQuery, setAiQuery] = useState('');
  const [isAiAnswering, setIsAiAnswering] = useState(false);

  // Keyboard shortcut listener to close workspace
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentMeeting = MEETINGS_DATA[selectedMeetingId] || MEETINGS_DATA.northwind;
  const [meetingActions, setMeetingActions] = useState(currentMeeting.actions);
  const [aiAnswers, setAiAnswers] = useState([
    {
      q: currentMeeting.defaultQ,
      a: currentMeeting.defaultA,
    }
  ]);

  // Update actions and AI answers when meeting changes
  useEffect(() => {
    const m = MEETINGS_DATA[selectedMeetingId] || MEETINGS_DATA.northwind;
    setMeetingActions(m.actions);
    setAiAnswers([
      {
        q: m.defaultQ,
        a: m.defaultA,
      }
    ]);
  }, [selectedMeetingId]);

  const toggleAction = (id) => {
    setMeetingActions(prev =>
      prev.map(a => a.id === id ? { ...a, done: !a.done } : a)
    );
    addToast('Updated task status');
  };

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const q = aiQuery;
    setAiQuery('');
    setIsAiAnswering(true);

    setTimeout(() => {
      setIsAiAnswering(false);
      setAiAnswers(prev => [
        ...prev,
        {
          q,
          a: `According to the ${currentMeeting.label} conversation context: "The team confirmed unanimous consensus. All technical blockers and timelines have been locked and integrated into the workflow."`,
        }
      ]);
      addToast('AI Assistant synthesized answer from meeting memory');
    }, 750);
  };

  const TABS = [
    { id: 'notes', label: 'Summary & Notes' },
    { id: 'transcript', label: 'Raw Transcript' },
    { id: 'actions', label: `Actions (${meetingActions.filter(a => !a.done).length})` },
    { id: 'ai', label: 'AI Assistant' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.985, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.985, y: 16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9980] bg-[#F8F7F2] text-[#171717] flex flex-col font-sans overflow-hidden shadow-2xl"
    >
      {/* Top Application Bar */}
      <header className="h-14 bg-white/95 backdrop-blur-md border-b border-[#E8E6DF] px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="group flex items-center gap-1.5 text-xs font-semibold text-[#5F5D57] hover:text-[#171717] px-3.5 py-1.5 rounded-full hover:bg-[#F1F0EA] transition-all cursor-pointer border border-[#DCDAD2]"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Overview</span>
          </button>
          <div className="h-4 w-px bg-[#E8E6DF] hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8E63A] animate-pulse" />
            <span className="font-semibold text-xs sm:text-sm text-[#171717]">
              Cadence Workspace Desktop
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('Exported markdown to Linear & Notion')}
            className="flex items-center gap-1.5 text-xs text-[#171717] bg-[#F8F7F2] hover:bg-[#E6E4DC] px-3.5 py-1.5 rounded-full border border-[#DCDAD2] transition-colors cursor-pointer font-medium"
          >
            <Share2 className="w-3.5 h-3.5 text-[#5F5D57]" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <div className="w-7 h-7 rounded-lg bg-[#171717] text-[#C8E63A] flex items-center justify-center text-xs font-bold font-mono">
            AM
          </div>
        </div>
      </header>

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR with Fluid layoutId */}
        <aside className="w-64 bg-[#F1F0EA] border-r border-[#E8E6DF] p-4 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#88867F] block px-2 mb-2">
                Good afternoon, Alex
              </span>
              <div className="p-3 bg-white rounded-xl border border-[#DCDAD2] space-y-1 shadow-xs">
                <span className="text-[11px] font-semibold text-[#171717] block">3 Meetings Today</span>
                <span className="text-[10px] text-[#5F5D57]">
                  {meetingActions.filter(a => !a.done).length} Open action items assigned
                </span>
              </div>
            </div>

            {/* Sidebar Meeting Buttons with Sliding layoutId Active Pill */}
            <nav className="space-y-1">
              {Object.values(MEETINGS_DATA).map((item) => {
                const isSelected = selectedMeetingId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedMeetingId(item.id);
                      addToast(`Switched view to ${item.label}`);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer relative ${
                      isSelected
                        ? 'text-[#171717] font-semibold'
                        : 'text-[#5F5D57] hover:text-[#171717]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeMeetingBg"
                        className="absolute inset-0 bg-white rounded-xl border border-[#DCDAD2] shadow-xs -z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className="font-medium text-xs">{item.label}</div>
                      <div className="text-[10px] font-mono text-[#88867F]" dangerouslySetInnerHTML={{ __html: item.time }} />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#E8E6DF] text-[11px] text-[#5F5D57] space-y-1 font-mono shadow-xs">
            <span className="text-[#171717] font-semibold block">Local Mic Stream:</span>
            <span className="text-emerald-700 text-[10px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active &bull; 0 Bots Present
            </span>
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {/* Meeting Title & Meta Subheader with Animated Transition */}
          <div className="p-6 border-b border-[#E8E6DF] bg-[#F8F7F2] flex flex-wrap items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMeetingId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="text-[11px] font-mono text-[#88867F]"
                    dangerouslySetInnerHTML={{ __html: currentMeeting.meta }}
                  />
                  <span className="text-[10px] font-mono text-[#171717] bg-[#C8E63A] px-2 py-0.5 rounded-full font-semibold">
                    {currentMeeting.badge}
                  </span>
                </div>
                <h1 className="text-2xl font-[550] tracking-tight text-[#171717]">
                  {currentMeeting.title}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Tab Switcher with Fluid layoutId Tab Pill */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#DCDAD2] shadow-xs text-xs relative">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer relative ${
                      isActive ? 'text-[#FAF9F5] font-semibold' : 'text-[#5F5D57] hover:text-[#171717]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeWorkspaceTabPill"
                        className="absolute inset-0 bg-[#171717] rounded-full shadow-xs -z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Smooth Tab Views with AnimatePresence */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 max-w-4xl">
            <AnimatePresence mode="wait">
              {activeTab === 'notes' && (
                <motion.div 
                  key={`notes-${selectedMeetingId}`}
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 text-xs sm:text-sm"
                >
                  <div className="p-6 rounded-2xl bg-[#F8F7F2] border border-[#E8E6DF] space-y-2">
                    <span className="text-[10px] font-mono text-[#88867F] uppercase">Executive Synthesis</span>
                    <p className="text-[#171717] leading-relaxed font-sans">
                      {currentMeeting.executiveSummary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-[#171717]">
                      Agreed Decisions ({currentMeeting.decisions.length})
                    </h3>
                    <div className="space-y-2">
                      {currentMeeting.decisions.map((dec, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-[#E8E6DF] bg-white flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#171717] mt-2 shrink-0" />
                          <div>
                            <strong className="text-[#171717]">{dec.label}:</strong> {dec.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'transcript' && (
                <motion.div 
                  key={`transcript-${selectedMeetingId}`}
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 text-xs font-sans"
                >
                  {currentMeeting.transcript.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#F8F7F2] border border-[#E8E6DF] space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="font-bold text-[#171717]">{item.speaker}</span>
                        <span className="text-[#88867F]">{item.time}</span>
                      </div>
                      <p className="text-[#5F5D57] leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'actions' && (
                <motion.div 
                  key={`actions-${selectedMeetingId}`}
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF]">
                    <span className="font-semibold text-[#171717]">
                      {meetingActions.filter(a => a.done).length} of {meetingActions.length} Completed
                    </span>
                    <span className="text-[11px] font-mono text-[#88867F]">Click checkbox to toggle</span>
                  </div>

                  <div className="space-y-2">
                    {meetingActions.map((act) => (
                      <div
                        key={act.id}
                        onClick={() => toggleAction(act.id)}
                        className="p-3.5 rounded-xl border border-[#DCDAD2] bg-white flex items-center justify-between cursor-pointer hover:border-[#171717] transition-all hover:-translate-y-0.5 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${act.done ? 'bg-[#171717] border-[#171717] text-[#C8E63A]' : 'border-[#DCDAD2]'}`}>
                            {act.done && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`transition-colors ${act.done ? 'line-through text-[#88867F]' : 'text-[#171717] font-medium'}`}>
                            {act.task}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[10px] text-[#88867F]">
                          <span>{act.owner}</span>
                          <span>Due {act.due}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'ai' && (
                <motion.div 
                  key={`ai-${selectedMeetingId}`}
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 text-xs"
                >
                  <div className="space-y-4">
                    {aiAnswers.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="p-3 rounded-xl bg-[#F1F0EA] text-[#171717] font-medium max-w-lg ml-auto shadow-xs">
                          {item.q}
                        </div>
                        <div className="p-4 rounded-xl bg-[#F8F7F2] border border-[#DCDAD2] text-[#5F5D57] leading-relaxed space-y-1 shadow-xs">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#171717] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8E63A]" />
                            <span>Cadence Intelligence Synthesis</span>
                          </div>
                          <p>{item.a}</p>
                        </div>
                      </div>
                    ))}

                    {isAiAnswering && (
                      <div className="p-4 rounded-xl bg-[#F8F7F2] border border-[#DCDAD2] text-[#88867F] flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#171717] animate-spin" />
                        <span>Synthesizing answer from audio transcript...</span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleAskAI} className="flex gap-2 pt-4 border-t border-[#E8E6DF]">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask any question regarding this meeting's discussion..."
                      className="flex-1 bg-[#F8F7F2] border border-[#DCDAD2] rounded-xl px-4 py-2.5 text-xs text-[#171717] placeholder-[#88867F] focus:outline-none focus:border-[#171717]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#C8E63A] text-[#171717] font-semibold hover:bg-[#B8D62E] transition-colors cursor-pointer shadow-xs"
                    >
                      Ask
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
