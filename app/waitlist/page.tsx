"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CoreXFooter from "@/components/CoreXFooter";
import DotGrid from "@/components/DotGrid";

export default function WaitlistPage() {
  const [clock, setClock] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const tz = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + tz);
    };
    tick();
    const id = setInterval(tick, 1000);

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
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const transmit = () => {
    const val = email.trim();
    if (!val || !val.includes("@") || !val.includes(".")) {
      setInputError(true);
      setTimeout(() => setInputError(false), 1800);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <DotGrid />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --blue: #0033CC;
          --black: #000000;
          --white: #FFFFFF;
          --dim: #2a2a2a;
          --mid: #555555;
          --muted: #888888;
        }

        .wl-body {
          background: var(--black);
          color: var(--white);
          font-family: 'IBM Plex Mono', monospace;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* Scanline texture */
        .wl-body::after {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            180deg,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.04) 3px,
            rgba(0,0,0,0.04) 4px
          );
          pointer-events: none;
          z-index: 200;
        }

        /* Subtle grid bg */
        .wl-body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,51,204,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,51,204,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
          z-index: 0;
        }

        /* Top Chrome */
        .chrome-top {
          position: fixed;
          top: 0; left: 0; right: 0;
          padding: 22px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          border-bottom: 1px solid var(--dim);
          transition: transform 0.3s ease;
        }

        .chrome-lab {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--muted);
        }

        .chrome-right {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--muted);
          margin-right: 56px;
        }

        .signal-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .signal-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--blue);
          animation: blink 2.4s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }


        /* Right Rail */
        .rail-right {
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          width: 48px;
          border-left: 1px solid var(--dim);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .rail-text {
          font-size: 8px;
          letter-spacing: 0.35em;
          color: var(--mid);
          white-space: nowrap;
          transform: rotate(90deg);
        }

        /* Main */
        .wl-main {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 48px 100px 48px;
          max-width: 820px;
        }

        /* Season tag */
        .season-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
          opacity: 0;
          animation: riseIn 0.7s ease forwards 0.2s;
        }

        .season-tag {
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--blue);
          border: 1px solid var(--blue);
          padding: 5px 12px;
        }

        .season-rule {
          width: 40px;
          height: 1px;
          background: var(--mid);
        }

        .season-label {
          font-size: 9px;
          letter-spacing: 0.25em;
          color: var(--muted);
        }

        /* Title */
        .title-wrap {
          margin-bottom: 0;
          opacity: 0;
          animation: flickerIn 1.1s ease forwards 0.6s;
        }

        .title-line1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 12vw, 150px);
          line-height: 0.85;
          letter-spacing: 0.015em;
          color: var(--white);
          display: inline;
        }

        .title-line2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 12vw, 150px);
          line-height: 0.85;
          letter-spacing: 0.015em;
          color: var(--blue);
          display: inline;
          margin-left: 0.18em;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: var(--blue);
          margin: 32px 0;
          transform-origin: left center;
          transform: scaleX(0);
          animation: expandX 0.9s cubic-bezier(0.4,0,0.2,1) forwards 1.4s;
        }

        @keyframes expandX {
          to { transform: scaleX(1); }
        }

        /* Copy */
        .copy-block {
          max-width: 500px;
          margin-bottom: 48px;
          opacity: 0;
          animation: riseIn 0.7s ease forwards 1.7s;
        }

        .copy-primary {
          font-size: 12px;
          line-height: 1.9;
          letter-spacing: 0.07em;
          color: var(--muted);
        }

        .copy-primary strong {
          color: var(--white);
          font-weight: 500;
        }

        /* Form */
        .form-wrap {
          max-width: 500px;
          opacity: 0;
          animation: riseIn 0.7s ease forwards 1.95s;
        }

        .form-label {
          display: block;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--blue);
          margin-bottom: 14px;
        }

        .input-row {
          display: flex;
          border: 1px solid var(--mid);
          transition: border-color 0.25s;
        }

        .input-row.error {
          border-color: #660000;
        }

        .input-row:focus-within {
          border-color: var(--blue);
        }

        .email-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--white);
          padding: 15px 18px;
          caret-color: var(--blue);
        }

        .email-input::placeholder {
          color: var(--mid);
          letter-spacing: 0.15em;
        }

        .transmit-btn {
          background: transparent;
          border: none;
          border-left: 1px solid var(--mid);
          color: var(--blue);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          padding: 15px 22px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }

        .transmit-btn:hover {
          background: var(--blue);
          color: var(--black);
        }

        .form-footnote {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--mid);
          margin-top: 12px;
        }

        /* Confirmed state */
        .confirmed-state {
          padding: 15px 0;
          opacity: 0;
          animation: riseIn 0.6s ease forwards 0.05s;
        }

        .confirmed-top {
          font-size: 10px;
          letter-spacing: 0.25em;
          color: var(--blue);
          margin-bottom: 6px;
        }

        .confirmed-sub {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--muted);
        }

        /* Animations */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes flickerIn {
          0%   { opacity: 0; }
          8%   { opacity: 0.9; }
          12%  { opacity: 0.1; }
          20%  { opacity: 1; }
          26%  { opacity: 0.6; }
          30%  { opacity: 1; }
          100% { opacity: 1; }
        }

        /* Back button */
        .back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 40px;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: var(--mid);
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s;
        }
        .back:hover { color: var(--white); }
        .back:hover .back-arrow { color: var(--blue); transform: translateX(-3px); }
        .back-arrow {
          font-size: 14px;
          transition: color 0.3s, transform 0.3s;
        }

        /* Mobile */
        @media (max-width: 640px) {
          .wl-main { padding: 100px 28px 80px; }
          .chrome-top { padding: 18px 28px; }
          .rail-right { display: none; }
        }
      `}</style>

      <div className="wl-body">
        {/* Top Chrome */}
        <header className="chrome-top" style={{ transform: headerVisible ? "translateY(0)" : "translateY(-100%)" }}>
          <Link href="/" className="chrome-lab" style={{ textDecoration: "none", color: "inherit" }}>CORE X LAB</Link>
          <div className="chrome-right">
            <div className="signal-indicator">
              <div className="signal-dot" />
              <span>{clock}</span>
            </div>
            <span>SIGNAL ACTIVE</span>
          </div>
        </header>

        {/* Right Rail */}
        <div className="rail-right">
          <span className="rail-text">COMMAND OS · PRE-RELEASE · D-001</span>
        </div>

        {/* Main */}
        <main className="wl-main">
          {/* Season */}
          <div className="season-row">
            <span className="season-tag">SEASON 01</span>
            <div className="season-rule" />
            <span className="season-label">TRANSMISSION 001 · PRE-SIGNAL</span>
          </div>

          {/* Title */}
          <div className="title-wrap">
            <span className="title-line1">COMMAND</span>
            <span className="title-line2">OS</span>
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Copy */}
          <div className="copy-block">
            <p className="copy-primary">
              <strong>The operating system for the modern mind.</strong><br />
              Not released. Not explained. Not for everyone.<br /><br />
              You landed here before it opened. That means something.<br />
              Join the signal. Be in the record when Season 01 begins.
            </p>
          </div>

          {/* Form */}
          <div className="form-wrap">
            {!submitted ? (
              <>
                <span className="form-label">// JOIN THE SIGNAL</span>
                <div className={`input-row${inputError ? " error" : ""}`}>
                  <input
                    className="email-input"
                    type="email"
                    placeholder="ENTER FREQUENCY"
                    autoComplete="off"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && transmit()}
                  />
                  <button className="transmit-btn" onClick={transmit}>TRANSMIT</button>
                </div>
                <p className="form-footnote">// ENTRY LOGGED. THIS MOMENT COMPOUNDS.</p>
                <p className="form-footnote" style={{ marginTop: "8px" }}>// D-001 IS THE BEGINNING OF THE ARCHIVE</p>
              </>
            ) : (
              <div className="confirmed-state">
                <p className="confirmed-top">✓ SIGNAL RECEIVED · D-001 · YOU ARE IN THE RECORD</p>
                <p className="confirmed-sub">// SEASON 01 IS INITIALIZING. STAND BY.</p>
              </div>
            )}
          </div>

          {/* Back to landing */}
          <Link href="/" className="back">
            <span className="back-arrow">←</span>
            <span>RETURN</span>
          </Link>
        </main>

        {/* Site Footer */}
        <div style={{ paddingBottom: "64px" }}>
          <CoreXFooter />
        </div>

      </div>
    </>
  );
}
