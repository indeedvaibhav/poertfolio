"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { RiMusic2Line, RiMusic2Fill } from "react-icons/ri";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.value = 110; // low A drone
      osc2.type = "triangle";
      osc2.frequency.value = 165; // E fifth interval drone

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 300;

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5); // Warm fade-in

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      oscillator1Ref.current = osc1;
      oscillator2Ref.current = osc2;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  };

  const stopSynth = () => {
    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    const osc1 = oscillator1Ref.current;
    const osc2 = oscillator2Ref.current;

    if (ctx && gain) {
      try {
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        setTimeout(() => {
          osc1?.stop();
          osc2?.stop();
          ctx.close();
        }, 800);
      } catch (e) {
        console.warn("Error stopping synth", e);
      }
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-10 px-3.5 rounded-full glass border flex items-center gap-2.5 cursor-pointer text-zinc-400 hover:text-white transition-colors relative"
      style={{
        borderColor: "var(--border-primary)",
        background: "var(--bg-card)",
      }}
      aria-label="Toggle ambient synth"
    >
      {isPlaying ? (
        <RiMusic2Fill size={16} className="text-indigo-400 animate-pulse" />
      ) : (
        <RiMusic2Line size={16} className="text-zinc-500" />
      )}

      {/* Audio Visualizer Bars */}
      <div className="flex items-end gap-[2px] h-3 w-4">
        {[
          { duration: 0.6, height: [4, 12, 4] },
          { duration: 0.8, height: [2, 10, 2] },
          { duration: 0.5, height: [5, 12, 5] },
          { duration: 0.7, height: [3, 8, 3] },
        ].map((bar, i) => (
          <motion.span
            key={i}
            animate={isPlaying ? { height: bar.height } : { height: 3 }}
            transition={
              isPlaying
                ? { duration: bar.duration, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            className="w-[2px] bg-indigo-400 rounded-full"
            style={{ height: 3 }}
          />
        ))}
      </div>
      <span className="text-[9px] font-mono tracking-wider text-zinc-500 hidden sm:inline">
        {isPlaying ? "AMBIENT: ON" : "AMBIENT: OFF"}
      </span>
    </motion.button>
  );
}
