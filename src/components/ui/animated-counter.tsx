"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  target,
  duration = 1.2,
  className = "",
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(totalMiliseconds / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.round(start + (end - start) * easeProgress);

      setCount(currentCount);

      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [target, duration, isInView]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
