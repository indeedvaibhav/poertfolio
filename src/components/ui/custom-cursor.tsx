"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Position values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for follower ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hoverable") ||
        target.closest(".hoverable") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button";

      setIsHovered(!!isClickable);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Follower Ring */}
      <motion.div
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          backgroundColor: isHovered ? "rgba(99, 102, 241, 0.08)" : "rgba(255, 255, 255, 0)",
          borderColor: isHovered ? "rgba(139, 92, 246, 0.6)" : "rgba(255, 255, 255, 0.3)",
          width: isHovered ? "48px" : "32px",
          height: isHovered ? "48px" : "32px",
          boxShadow: isHovered ? "0 0 20px rgba(99, 102, 241, 0.3)" : "none",
        }}
        transition={{ type: "tween", duration: 0.15 }}
        className="fixed rounded-full border border-white/30 pointer-events-none"
      />

      {/* Center Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.6 : 1.0,
          backgroundColor: isHovered ? "var(--accent-secondary)" : "var(--accent-primary)",
        }}
        transition={{ type: "tween", duration: 0.1 }}
        className="fixed w-2 h-2 rounded-full pointer-events-none"
      />
    </div>
  );
}
