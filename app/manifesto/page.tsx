"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CoreXFooter from "@/components/CoreXFooter";

const LINES: { cls: string; delay: number; text: string }[] = [
  { cls: "line-opening",    delay: 800,   text: "Most people are not lost." },
  { cls: "line-opening",    delay: 1600,  text: "They are running the wrong system." },
  { cls: "line-label",      delay: 2800,  text: "The Default" },
  { cls: "line-body",       delay: 3200,  text: "It was installed before you could question it." },
  { cls: "line-body",       delay: 3700,  text: "The world handed you a framework — try this, feel better,\nrepeat — and called it progress. Every wellness trend.\nEvery app promising clarity in five minutes. All of it\nbuilt on the same broken assumption:" },
  { cls: "line-body white", delay: 4600,  text: "That your mind is a problem to manage." },
  { cls: "line-body",       delay: 5100,  text: "It isn't. It is a system to architect." },
  { cls: "line-body",       delay: 5600,  text: "The tools got faster. The noise got louder. The distraction\nbecame more engineered. And the gap widened — between\nthose who operate and those who perform the idea of it." },
  { cls: "line-body white", delay: 6600,  text: "You have felt this gap your entire life." },
  { cls: "line-label",      delay: 7400,  text: "What We Reject" },
  { cls: "line-reject",     delay: 7800,  text: "We reject the wellness narrative." },
  { cls: "line-reject",     delay: 8200,  text: "We reject ambition without architecture." },
  { cls: "line-reject",     delay: 8600,  text: "We reject tools built for people who don't want to think." },
  { cls: "line-body",       delay: 9200,  text: "If you need to be motivated, this is not for you.\nIf you need to be validated, this is not for you.\nIf you are comfortable in default, this is not for you." },
  { cls: "line-body white", delay: 10000, text: "We do not build for comfort. We build for operators." },
  { cls: "line-label",      delay: 10800, text: "The Standard" },
  { cls: "line-body",       delay: 11200, text: "The mind is not a wound. It is an instrument." },
  { cls: "line-body",       delay: 11700, text: "Control is not a feeling — it is a standard.\nClarity is not a mood — it is an architecture.\nSovereignty is not a destination — it is a discipline\nyou install and maintain." },
  { cls: "line-body",       delay: 12700, text: "The mental athlete does not wait for conditions to be right.\nThey build the conditions. They do not react to the game.\nThey run the system." },
  { cls: "line-body white", delay: 13600, text: "Core X exists to prove that the modern mind, properly\narchhitected, is the highest performance edge that exists." },
  { cls: "line-label",      delay: 14600, text: "Who This Is For" },
  { cls: "line-body",       delay: 15000, text: "You already know something is wrong with the default install." },
  { cls: "line-body",       delay: 15500, text: "You have felt the loop — same ceiling, same reversion,\nsame noise dressed up as progress. You looked for something\nthat matched the seriousness of what you were trying to build.\nIt wasn't there." },
  { cls: "line-body",       delay: 16600, text: "This is the lab that builds it." },
  { cls: "line-body white", delay: 17200, text: "Not for everyone.\nFor the one who is done running on a system they never chose." },
];

const MAX_DELAY   = 17200;
const CURSOR_DELAY = MAX_DELAY + 700;
const BACK_DELAY   = CURSOR_DELAY + 600;

export default function ManifestoPage() {
  const [revealed, setRevealed]           = useState<Set<number>>(new Set());
  const [cursorVisible, setCursorVisible] = useState(false);
  const [backVisible, setBackVisible]     = useState(false);
  const [skipped, setSkipped]             = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    LINES.forEach((line, i) => {
      const t = setTimeout(() => setRevealed(prev => new Set([...prev, i])), line.delay);
      timers.current.push(t);
    });
    const t1 = setTimeout(() => setCursorVisible(true), CURSOR_DELAY);
    const t2 = setTimeout(() => setBackVisible(true), BACK_DELAY);
    timers.current.push(t1, t2);
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) setHeaderVisible(true);
      else if (y > lastY) setHeaderVisible(false);
      else setHeaderVisible(true);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const skipAll = () => {
    if (skipped) return;
    setSkipped(true);
    timers.current.forEach(clearTimeout);
    setRevealed(new Set(LINES.map((_, i) => i)));
    setCursorVisible(true);
    setBackVisible(true);
  };

  const renderContent = () => {
    const nodes: React.ReactNode[] = [];

    LINES.forEach((line, i) => {
      const isVisible = revealed.has(i);
      const isLabel   = line.cls.includes("line-label");
      const isOpening = line.cls.includes("line-opening");
      const prevIsOpening = i > 0 && LINES[i - 1].cls.includes("line-opening");
      const prevIsLabel   = i > 0 && LINES[i - 1].cls.includes("line-label");

      // lg spacer: after the opening block (before first label)
      if (isLabel && prevIsOpening) {
        nodes.push(<span key={`sp-lg-op-${i}`} className="line-spacer-lg" />);
      }
      // lg spacer: between section groups (label following body)
      if (isLabel && !prevIsOpening && i !== 0) {
        nodes.push(<span key={`sp-lg-${i}`} className="line-spacer-lg" />);
      }
      // sm spacer: between body/reject lines (not directly after a label)
      if (!isLabel && !isOpening && !prevIsLabel && i > 0) {
        nodes.push(<span key={`sp-sm-${i}`} className="line-spacer-sm" />);
      }

      nodes.push(
        <span
          key={i}
          className={`line ${line.cls}`}
          style={isVisible ? { animation: "revealLine 0.5s ease forwards" } : {}}
        >
          {line.text.split("\n").map((part, j, arr) => (
            <span key={j}>{part}{j < arr.length - 1 && <br />}</span>
          ))}
        </span>
      );
    });

    return nodes;
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --black: #000000;
          --white: #ffffff;
          --blue: #0033CC;
          --dim: #333333;
          --muted: #666666;
          --text: #cccccc;
        }
        .mf-body {
          background: var(--black);
          color: var(--white);
          font-family: 'IBM Plex Mono', monospace;
          min-height: 100vh;
          overflow-x: hidden;
          cursor: default;
        }
        .mf-body::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.012) 2px,
            rgba(255,255,255,0.012) 4px
          );
          pointer-events: none;
          z-index: 100;
        }
        .access-tag {
          position: fixed;
          top: 32px; left: 40px;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--blue);
          text-transform: uppercase;
          z-index: 10;
          opacity: 0;
          animation: fadeTag 0.4s ease 0.2s forwards;
          transition: transform 0.3s ease;
        }
        .doc-id {
          position: fixed;
          top: 32px; right: 40px;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--dim);
          text-transform: uppercase;
          z-index: 10;
          opacity: 0;
          animation: fadeTag 0.4s ease 0.2s forwards;
          transition: transform 0.3s ease;
        }
        .back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 48px;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--dim);
          text-transform: uppercase;
          text-decoration: none;
          opacity: 0;
          transition: opacity 0.3s, color 0.3s;
        }
        .back.visible { opacity: 1; }
        .back:hover { color: var(--white); }
        .back:hover .back-arrow { color: var(--blue); transform: translateX(-3px); }
        .back-arrow {
          font-size: 14px;
          transition: color 0.3s, transform 0.3s;
        }
        .content {
          max-width: 560px;
          margin: 0 auto;
          padding: 120px 40px 160px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .line {
          opacity: 0;
          display: block;
          white-space: pre-wrap;
        }
        .line-opening {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 6vw, 64px);
          letter-spacing: 0.04em;
          color: var(--white);
          line-height: 1.1;
        }
        .line-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--blue);
          text-transform: uppercase;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #0033CC44;
        }
        .line-body {
          font-size: 14px;
          line-height: 2;
          color: var(--text);
          font-weight: 400;
        }
        .line-body.white { color: var(--white); }
        .line-reject {
          font-size: 15px;
          line-height: 1.9;
          color: var(--white);
          font-weight: 400;
        }
        .line-spacer    { display: block; height: 40px; }
        .line-spacer-sm { display: block; height: 20px; }
        .line-spacer-lg { display: block; height: 64px; }
        .cursor-line {
          margin-top: 72px;
          height: 22px;
          display: flex;
          align-items: center;
          opacity: 0;
        }
        .cursor-line.visible { animation: revealCursor 0.6s ease forwards; }
        .cursor {
          display: inline-block;
          width: 2px; height: 18px;
          background: var(--blue);
          animation: blink 1.1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes fadeTag {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealLine {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealCursor {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div className="mf-body" onClick={skipAll}>
        <div className="access-tag" style={{ transform: headerVisible ? "translateY(0)" : "translateY(-160%)" }}><Link href="/" style={{ textDecoration: "none", color: "inherit" }}>CORE X LAB</Link> &nbsp;/&nbsp; MANIFESTO</div>
        <div className="doc-id" style={{ transform: headerVisible ? "translateY(0)" : "translateY(-160%)" }}>DOC — 001 &nbsp;/&nbsp; RESTRICTED</div>

        <main className="content">
          {renderContent()}
          <div className={`cursor-line${cursorVisible ? " visible" : ""}`}>
            <span className="cursor" />
          </div>

          <Link
            href="/"
            className={`back${backVisible ? " visible" : ""}`}
            onClick={e => e.stopPropagation()}
          >
            <span className="back-arrow">←</span>
            <span>RETURN</span>
          </Link>
        </main>

        <CoreXFooter />
      </div>
    </>
  );
}
