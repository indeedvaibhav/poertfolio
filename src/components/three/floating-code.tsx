"use client";

import { useEffect, useRef } from "react";

const CODE_SNIPPETS = [
  "const dev = true;",
  "import React from 'react';",
  "npm run build",
  "git commit -m 'feat'",
  "<div>",
  "</div>",
  "Map<String, Object>",
  "public static void main",
  "class Solution {",
  "const [state, setState]",
  "await fetch(url)",
  "docker-compose up -d",
  "SELECT * FROM users;",
  "return response.json();",
  "System.out.println()",
  "export default function",
  "const cn = (...inputs) =>",
  "new Promise((resolve) =>",
];

interface FloatingCodeSnippet {
  x: number;
  y: number;
  text: string;
  speed: number;
  opacity: number;
  fontSize: number;
}

export default function FloatingCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let snippets: FloatingCodeSnippet[] = [];
    const snippetCount = 18;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initSnippets();
    };

    const initSnippets = () => {
      snippets = [];
      for (let i = 0; i < snippetCount; i++) {
        snippets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
          speed: Math.random() * 0.3 + 0.15,
          opacity: Math.random() * 0.08 + 0.02,
          fontSize: Math.floor(Math.random() * 4) + 10,
        });
      }
    };

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snippets.forEach((s) => {
        ctx.fillStyle = `rgba(99, 102, 241, ${s.opacity})`;
        ctx.font = `${s.fontSize}px var(--font-mono), Courier, monospace`;
        ctx.fillText(s.text, s.x, s.y);

        s.y -= s.speed;

        if (s.y < -30) {
          s.y = canvas.height + 30;
          s.x = Math.random() * canvas.width;
          s.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          s.speed = Math.random() * 0.3 + 0.15;
          s.opacity = Math.random() * 0.08 + 0.02;
          s.fontSize = Math.floor(Math.random() * 4) + 10;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
