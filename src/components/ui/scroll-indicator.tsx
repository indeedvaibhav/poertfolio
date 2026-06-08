"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  const handleScrollClick = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer select-none"
      onClick={handleScrollClick}
    >
      <span
        className="text-[10px] font-mono uppercase tracking-[0.2em]"
        style={{ color: "var(--text-muted)" }}
      >
        Scroll Down
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 rounded-full border-2 flex justify-center p-1"
        style={{ borderColor: "var(--border-hover)" }}
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-indigo-500"
        />
      </motion.div>
    </div>
  );
}
