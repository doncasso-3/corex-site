import Link from "next/link";
import CoreXFooter from "@/components/CoreXFooter";
import DotGrid from "@/components/DotGrid";

const styles = {
  page: {
    background: "#000",
    minHeight: "100vh",
    padding: "80px 0",
    fontFamily: "'IBM Plex Mono', monospace",
  } as React.CSSProperties,
  inner: {
    maxWidth: "680px",
    margin: "0 auto",
    padding: "0 32px",
  } as React.CSSProperties,
  eyebrow: {
    color: "rgba(255,255,255,0.25)",
    fontSize: "8px",
    letterSpacing: "0.5em",
    marginBottom: "20px",
  } as React.CSSProperties,
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    color: "#fff",
    fontSize: "42px",
    letterSpacing: "0.1em",
    lineHeight: 1,
    marginBottom: "8px",
  } as React.CSSProperties,
  updated: {
    color: "rgba(255,255,255,0.2)",
    fontSize: "8px",
    letterSpacing: "0.28em",
    marginBottom: "56px",
  } as React.CSSProperties,
  divider: {
    borderTop: "1px solid rgba(255,255,255,0.07)",
    margin: "40px 0",
  } as React.CSSProperties,
  section: {
    marginBottom: "40px",
  } as React.CSSProperties,
  h2: {
    color: "#0033CC",
    fontSize: "10px",
    letterSpacing: "0.38em",
    marginBottom: "16px",
  } as React.CSSProperties,
  p: {
    color: "rgba(255,255,255,0.55)",
    fontSize: "12px",
    letterSpacing: "0.04em",
    lineHeight: 1.9,
    marginBottom: "14px",
  } as React.CSSProperties,
  li: {
    color: "rgba(255,255,255,0.55)",
    fontSize: "12px",
    letterSpacing: "0.04em",
    lineHeight: 1.9,
    marginBottom: "8px",
    paddingLeft: "16px",
    position: "relative",
  } as React.CSSProperties,
  bullet: {
    position: "absolute",
    left: 0,
    color: "#0033CC",
  } as React.CSSProperties,
  email: {
    color: "#0033CC",
    textDecoration: "none",
  } as React.CSSProperties,
  back: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "rgba(255,255,255,0.3)",
    fontSize: "8px",
    letterSpacing: "0.3em",
    textDecoration: "none",
    marginBottom: "56px",
    cursor: "pointer",
    transition: "color 0.2s",
  } as React.CSSProperties,
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={styles.section}>
    <div style={styles.h2}>{title}</div>
    {children}
    <div style={styles.divider} />
  </div>
);

const P = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{ ...styles.p, ...style }}>{children}</p>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <div style={styles.li}>
    <span style={styles.bullet}>—</span>
    {children}
  </div>
);

export default function PrivacyPolicy() {
  return (
    <>
    <DotGrid />
    <div style={styles.page}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={styles.inner}>

        <Link href="/" style={styles.back}>← BACK</Link>

        <div style={styles.eyebrow}>CORE X LAB — LEGAL</div>
        <div style={styles.title}>PRIVACY<br />POLICY</div>
        <div style={styles.updated}>LAST UPDATED: MARCH 2026</div>

        <Section title="01 — WHO WE ARE">
          <P>Core X Lab ("Core X," "we," "us," or "our") is a mental performance lab building the operating system for the modern mind. We operate the Core X website, the Command OS application, and associated digital properties.</P>
          <P>This Privacy Policy explains what information we collect, how we use it, and what rights you have over it. If you have questions, contact us at <a href="mailto:info@core.x.lab.com" style={styles.email}>info@core.x.lab.com</a>.</P>
        </Section>

        <Section title="02 — WHAT WE COLLECT">
          <P>We collect only what we need. Nothing more.</P>
          <Li>Email address — when you join the Command OS waitlist or subscribe to Signal communications</Li>
          <Li>Usage data — pages visited, time on site, interactions with the sphere interface, collected anonymously via standard analytics</Li>
          <Li>Device and browser data — browser type, operating system, screen resolution, used to ensure the site functions correctly</Li>
          <Li>IP address — collected automatically as part of standard web server logs, used for security and geographic analytics only</Li>
          <P style={{ marginTop: "16px" }}>We do not collect sensitive personal information. We do not collect payment data directly — any future transactions are processed through compliant third-party payment processors.</P>
        </Section>

        <Section title="03 — HOW WE USE YOUR DATA">
          <P>Your data is used to operate and improve Core X systems. Specifically:</P>
          <Li>To send you Command OS waitlist communications and lab updates via Signal</Li>
          <Li>To understand how people interact with our systems and improve them</Li>
          <Li>To ensure the security and stability of our infrastructure</Li>
          <Li>To comply with legal obligations when required</Li>
          <P style={{ marginTop: "16px" }}>We do not sell your data. We do not use your data to serve you third-party advertising. Core X products are built for the operator — not for advertisers.</P>
        </Section>

        <Section title="04 — DATA SHARING">
          <P>We share data only with service providers necessary to operate Core X systems — including hosting infrastructure, email delivery, and analytics platforms. These providers are contractually bound to process your data only as directed by us.</P>
          <P>We do not share, sell, or trade your personal data with third parties for marketing or commercial purposes. If we are legally required to disclose data, we will notify you to the extent permitted by law.</P>
        </Section>

        <Section title="05 — DATA RETENTION">
          <P>We retain your email address for as long as you are subscribed to Core X communications. You may unsubscribe at any time using the link in any email we send, or by contacting <a href="mailto:info@core.x.lab.com" style={styles.email}>info@core.x.lab.com</a>.</P>
          <P>Anonymous analytics data is retained for up to 24 months. Server logs are purged on a rolling 90-day cycle.</P>
        </Section>

        <Section title="06 — YOUR RIGHTS">
          <P>Depending on your location, you may have rights including:</P>
          <Li>The right to access the personal data we hold about you</Li>
          <Li>The right to correct inaccurate data</Li>
          <Li>The right to request deletion of your data</Li>
          <Li>The right to withdraw consent at any time</Li>
          <Li>The right to data portability</Li>
          <P style={{ marginTop: "16px" }}>To exercise any of these rights, contact <a href="mailto:info@core.x.lab.com" style={styles.email}>info@core.x.lab.com</a>. We will respond within 30 days.</P>
        </Section>

        <Section title="07 — COOKIES">
          <P>Core X uses minimal cookies necessary for the site to function — session cookies and anonymous analytics identifiers. We do not use advertising cookies or cross-site tracking.</P>
          <P>You may disable cookies in your browser settings. This may affect certain site functionality.</P>
        </Section>

        <Section title="08 — SECURITY">
          <P>Core X implements industry-standard security measures to protect your data — including encrypted data transmission (HTTPS), access controls, and regular security reviews. No system is perfectly secure. In the event of a data breach affecting your rights, we will notify you as required by applicable law.</P>
        </Section>

        <Section title="09 — CHANGES TO THIS POLICY">
          <P>We may update this Privacy Policy as Core X systems evolve. When we do, we will update the date at the top of this document and notify active subscribers via email. Continued use of Core X after changes constitutes acceptance of the updated policy.</P>
        </Section>

        <Section title="10 — CONTACT">
          <P>Questions, requests, or concerns about this Privacy Policy should be directed to:</P>
          <P><a href="mailto:info@core.x.lab.com" style={styles.email}>info@core.x.lab.com</a></P>
        </Section>

      </div>
    </div>
    <CoreXFooter />
    </>
  );
}
