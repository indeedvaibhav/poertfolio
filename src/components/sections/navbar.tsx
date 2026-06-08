"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Intro", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Coding", href: "#coding" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Detect scroll for backdrop opacity
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Intersection observer to highlight active nav item
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus on middle portion of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // Update hash in URL gracefully
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "top-3 md:top-4" : "top-0"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div
          className={`flex h-14 items-center justify-between rounded-full px-6 transition-all duration-300 ${
            isScrolled
              ? "frosted-glass shadow-[0_8px_30px_rgb(0,0,0,0.5)] border-white/8 bg-black/40"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className="text-sm font-semibold tracking-wider text-white uppercase focus-ring rounded-full px-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Vaibhav
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors duration-300 focus-ring rounded-full ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white focus-ring md:hidden"
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d={
                  mobileMenuOpen
                    ? "M3.75 12.25L12.25 3.75M3.75 3.75L12.25 12.25"
                    : "M2.5 4.75H13.5M2.5 8H13.5M2.5 11.25H13.5"
                }
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-16 z-40 mx-auto max-w-sm px-6 md:hidden"
          >
            <div className="frosted-glass rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={`block rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all focus-ring ${
                        isActive
                          ? "bg-white/10 text-white border-l-2 border-indigo-500 pl-3"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
