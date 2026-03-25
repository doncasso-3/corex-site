"use client";

import { useEffect, useRef } from "react";

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const SPACING = 22;
    let raf: number;

    type Dot = { x: number; y: number; phase: number; speed: number; isBlue: boolean };
    let dots: Dot[] = [];

    const build = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      dots = [];
      const cols = Math.ceil(canvas.width  / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * SPACING,
            y: r * SPACING,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 0.8,
            isBlue: Math.random() < 0.06,
          });
        }
      }
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const t = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        const pulse = 0.5 + 0.5 * Math.sin(t * d.speed + d.phase);
        const alpha = 0.06 + 0.18 * pulse;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = d.isBlue
          ? `rgba(0,102,255,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
    };

    build();
    draw();

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.8,
        pointerEvents: "none",
      }}
    />
  );
}
