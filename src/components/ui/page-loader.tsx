"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const totalTime = 1200; // 1.2s loading
    const intervalTime = 30;
    const step = 100 / (totalTime / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="page-loader"
        >
          {/* Logo / Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-widest text-white uppercase font-display"
          >
            <span className="gradient-text glow-text">Vaibhav</span>
          </motion.div>

          {/* Loading status */}
          <div className="loader-progress">
            <div
              className="loader-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <span className="text-[10px] font-mono mt-3 tracking-[0.25em]" style={{ color: "var(--text-muted)" }}>
            {Math.round(progress)}% LOADED
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
