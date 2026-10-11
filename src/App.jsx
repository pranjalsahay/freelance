import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ScrollController from './components/ScrollController';
import CommandPalette from './components/CommandPalette';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import BeforeMeeting from './components/BeforeMeeting';
import DuringMeeting from './components/DuringMeeting';
import AfterMeeting from './components/AfterMeeting';
import AIMemory from './components/AIMemory';
import FeaturesSection from './components/FeaturesSection';
import Integrations from './components/Integrations';
import UseCases from './components/UseCases';
import Testimonials from './components/Testimonials';
import Security from './components/Security';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import MeetingWorkspace from './components/MeetingWorkspace';
import { initLenis, getLenis } from './utils/scroll';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [workspaceMeetingId, setWorkspaceMeetingId] = useState('northwind');

  // Initialize Lenis smooth inertia scrolling
  useEffect(() => {
    const scrollHandler = initLenis();
    return () => {
      scrollHandler?.destroy();
    };
  }, []);

  // Pause Lenis and lock body scroll when workspace view is open
  useEffect(() => {
    const lenis = getLenis();
    if (workspaceOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [workspaceOpen]);

  const handleOpenWorkspace = (meetingId = 'northwind') => {
    setWorkspaceMeetingId(meetingId);
    setWorkspaceOpen(true);
  };

  const handleCloseWorkspace = () => {
    setWorkspaceOpen(false);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F8F7F2] text-[#171717] font-sans selection:bg-[#C8E63A] selection:text-[#171717] relative overflow-x-hidden">
        {/* Custom cursor on desktop */}
        <CustomCursor />

        {/* Top 2px scroll progress indicator */}
        <ScrollProgress />

        {/* Bidirectional scroll navigator (Up & Down) */}
        <ScrollController />

        {/* Command Palette (Cmd + K) */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenWorkspace={handleOpenWorkspace}
        />

        {/* Global Floating Pill Navbar */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenWorkspace={handleOpenWorkspace}
        />

        {/* Smooth Landing Page Content Wrapper */}
        <motion.div
          animate={{
            scale: workspaceOpen ? 0.985 : 1,
            opacity: workspaceOpen ? 0.35 : 1,
            filter: workspaceOpen ? 'blur(8px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="origin-top"
        >
          {/* Main Editorial Product Journey */}
          <main>
            <Hero onOpenWorkspace={handleOpenWorkspace} />
            <SocialProof />
            <BeforeMeeting />
            <DuringMeeting />
            <AfterMeeting />
            <AIMemory />
            <FeaturesSection />
            <Integrations />
            <UseCases />
            <Testimonials />
            <Security />
            <Pricing onOpenWorkspace={handleOpenWorkspace} />
            <FinalCTA onOpenWorkspace={handleOpenWorkspace} />
          </main>

          {/* Dark Editorial Footer */}
          <Footer />
        </motion.div>

        {/* Full Interactive Application Workspace Modal with Smooth AnimatePresence */}
        <AnimatePresence>
          {workspaceOpen && (
            <MeetingWorkspace
              key="active-workspace-screen"
              initialMeetingId={workspaceMeetingId}
              onClose={handleCloseWorkspace}
            />
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}
