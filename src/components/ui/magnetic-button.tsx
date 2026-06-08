"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const pullX = (clientX - centerX) * 0.35;
    const pullY = (clientY - centerY) * 0.35;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const buttonClasses = cn(
    "magnetic-btn relative select-none",
    variant === "primary" ? "magnetic-btn-primary" : "magnetic-btn-secondary",
    className
  );

  const innerContent = (
    <motion.div
      style={{ x: springX, y: springY }}
      className="flex items-center justify-center gap-2 w-full h-full"
    >
      {children}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        href.startsWith("#") ? (
          <a
            href={href}
            onClick={onClick}
            className={buttonClasses}
          >
            {innerContent}
          </a>
        ) : (
          <Link
            href={href}
            onClick={onClick}
            className={buttonClasses}
            target="_blank"
            rel="noopener noreferrer"
          >
            {innerContent}
          </Link>
        )
      ) : (
        <button
          onClick={onClick}
          className={buttonClasses}
        >
          {innerContent}
        </button>
      )}
    </div>
  );
}
