"use client";

import PageLoader from "@/components/ui/page-loader";
import CustomCursor from "@/components/ui/custom-cursor";
import Navbar from "@/components/ui/navbar";
import CommandPalette from "@/components/ui/command-palette";
import ThemeToggle from "@/components/ui/theme-toggle";
import MusicToggle from "@/components/ui/music-toggle";
import AiWidget from "@/components/ui/ai-widget";
import Footer from "@/components/ui/footer";

// Page Sections — 6 focused sections + terminal as optional feature
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ProjectsSection from "@/components/sections/projects";
import CodingSection from "@/components/sections/coding";
import DeveloperTerminal from "@/components/sections/terminal";
import LeadershipSection from "@/components/sections/leadership";
import ContactSection from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white" style={{ background: "var(--bg-primary)" }}>
      {/* Loading animation sequence */}
      <PageLoader />

      {/* Modern Cursor System */}
      <CustomCursor />

      {/* Global Command Center */}
      <CommandPalette />

      {/* Floating Header */}
      <Navbar />

      {/* Sections — clear hierarchy, generous spacing */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CodingSection />
        <DeveloperTerminal />
        <LeadershipSection />
        <ContactSection />
      </main>

      {/* Accessibility Control Dock (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3">
        <ThemeToggle />
        <MusicToggle />
      </div>

      {/* Conversational Assistant Widget (Bottom Right) */}
      <AiWidget />

      {/* Shared Footer block */}
      <Footer />
    </div>
  );
}
