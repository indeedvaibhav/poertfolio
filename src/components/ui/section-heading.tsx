"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && (
          <motion.p
            className="mt-5 text-base max-w-2xl"
            style={{
              color: "var(--text-secondary)",
              margin: align === "center" ? "1rem auto 0" : "1rem 0 0",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          className="mt-6 h-[2px] rounded-full"
          style={{
            background: "var(--gradient-primary)",
            width: align === "center" ? "60px" : "80px",
            margin: align === "center" ? "0 auto" : "0",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </div>
  );
}
