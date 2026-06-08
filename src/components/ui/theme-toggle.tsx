"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full glass border flex items-center justify-center cursor-pointer text-zinc-400 hover:text-white transition-colors relative overflow-hidden"
      style={{
        borderColor: "var(--border-primary)",
        background: "var(--bg-card)",
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180, scale: theme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <RiMoonLine size={18} className="text-indigo-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === "light" ? 0 : -180, scale: theme === "light" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <RiSunLine size={18} className="text-amber-500" />
      </motion.div>
    </motion.button>
  );
}
