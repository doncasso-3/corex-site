"use client";

import Link from "next/link";

const Logo = () => (
  <svg width="72" height="72" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11" y="11" width="14" height="14" rx="2" stroke="white" strokeWidth="2.2" fill="none"/>
    <line x1="11" y1="11" x2="4"  y2="4"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="25" y1="11" x2="32" y2="4"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="11" y1="25" x2="4"  y2="32" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="25" y1="25" x2="32" y2="32" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const navLinks = [
  { label: "Mental OS",   href: "#" },
  { label: "The Lab",     href: "#" },
  { label: "Modern Mind", href: "#" },
  { label: "Command OS",  href: "/waitlist" },
  { label: "Manifesto",   href: "/manifesto" },
  { label: "Signal",      href: "#" },
  { label: "C-Max",       href: "#" },
  { label: "Lab Status",  href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/core.x.lab/" },
  { label: "X",         href: "https://x.com/core_x_lab" },
  { label: "YouTube",   href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy",   href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  color: "rgba(255,255,255,0.38)",
  fontSize: "10px",
  letterSpacing: "0.18em",
  textDecoration: "none",
  display: "block",
  marginBottom: "10px",
  transition: "color 0.2s",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  color: "rgba(255,255,255,0.18)",
  fontSize: "7px",
  letterSpacing: "0.48em",
  marginBottom: "16px",
};

export default function CoreXFooter() {
  return (
    <footer style={{
      background: "#000",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "52px 48px 32px",
      fontFamily: "'IBM Plex Mono', monospace",
    }}>
      {/* Main row */}
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "72px" }}>

        {/* Left — logo + name + tagline */}
        <div style={{ flexShrink: 0 }}>
          <Logo />
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#fff",
            fontSize: "52px",
            letterSpacing: "0.28em",
            marginTop: "16px",
          }}>
            CORE X
          </div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: "rgba(255,255,255,0.28)",
            fontSize: "13px",
            letterSpacing: "0.38em",
            marginTop: "8px",
          }}>
            OPERATE BY DESIGN.
          </div>
        </div>

        {/* Right — three link columns */}
        <div style={{ display: "flex", gap: "56px" }}>

          {/* Navigate */}
          <div>
            <div style={labelStyle}>NAVIGATE</div>
            {navLinks.map(l => (
              <Link
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Signal */}
          <div>
            <div style={labelStyle}>SIGNAL</div>
            {socialLinks.map(l => (
              <Link
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div style={labelStyle}>LEGAL</div>
            {legalLinks.map(l => (
              <Link
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom — copyright + version */}
      <div style={{
        marginTop: "48px",
        paddingTop: "20px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        textAlign: "center",
        fontFamily: "'IBM Plex Mono', monospace",
        color: "rgba(255,255,255,0.15)",
        fontSize: "8px",
        letterSpacing: "0.28em",
      }}>
        © 2026 CORE X LAB — ALL RIGHTS RESERVED &nbsp;·&nbsp; V0.1 LAB RELEASE
      </div>
    </footer>
  );
}
