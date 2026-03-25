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

export default function TermsOfService() {
  return (
    <>
    <DotGrid />
    <div style={styles.page}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={styles.inner}>

        <Link href="/" style={styles.back}>← BACK</Link>

        <div style={styles.eyebrow}>CORE X LAB — LEGAL</div>
        <div style={styles.title}>TERMS OF<br />SERVICE</div>
        <div style={styles.updated}>LAST UPDATED: MARCH 2026</div>

        <Section title="01 — AGREEMENT">
          <P>These Terms of Service ("Terms") govern your access to and use of Core X Lab's website, Command OS application, and all related digital properties (collectively, the "Systems"). By accessing any Core X system, you agree to be bound by these Terms.</P>
          <P>If you do not agree with any part of these Terms, do not use our Systems. Questions may be directed to <a href="mailto:info@core.x.lab.com" style={styles.email}>info@core.x.lab.com</a>.</P>
        </Section>

        <Section title="02 — WHAT CORE X IS">
          <P>Core X Lab is a mental performance lab. Our Systems — including the Mental OS framework, Command OS application, and associated protocols — are designed as cognitive architecture tools for individuals who choose to operate by design.</P>
          <P>Core X is not a therapy service, medical provider, or licensed mental health platform. Our Systems are not a substitute for professional mental health care. If you are experiencing a mental health crisis, please contact a licensed professional or emergency services.</P>
        </Section>

        <Section title="03 — ELIGIBILITY">
          <P>You must be at least 18 years of age to use Core X Systems. By using our Systems, you confirm that you meet this requirement. Core X does not knowingly collect information from individuals under 18.</P>
        </Section>

        <Section title="04 — WAITLIST AND COMMUNICATIONS">
          <P>By joining the Command OS waitlist, you consent to receive communications from Core X Lab regarding product updates, lab transmissions, and Signal content. You may unsubscribe at any time.</P>
          <P>Joining the waitlist does not guarantee access to any product, feature, or campaign. Core X reserves the right to determine access criteria, release timing, and user selection at its sole discretion.</P>
        </Section>

        <Section title="05 — ACCEPTABLE USE">
          <P>When using Core X Systems, you agree not to:</P>
          <Li>Use the Systems for any unlawful purpose or in violation of any applicable regulations</Li>
          <Li>Attempt to gain unauthorized access to any part of our infrastructure</Li>
          <Li>Reproduce, distribute, or commercially exploit Core X content, protocols, or frameworks without written permission</Li>
          <Li>Misrepresent your identity or affiliation with Core X Lab</Li>
          <Li>Interfere with the integrity or performance of our Systems</Li>
          <Li>Scrape, harvest, or extract data from Core X Systems through automated means</Li>
        </Section>

        <Section title="06 — INTELLECTUAL PROPERTY">
          <P>All Core X content — including but not limited to the Mental OS framework, Command OS protocols, system architecture documents, visual identity, GØST transmissions, and campaign materials — is the exclusive property of Core X Lab.</P>
          <P>Nothing in these Terms grants you any right to use Core X intellectual property without prior written authorization. The Core X mark, logo, and all associated brand elements are protected.</P>
        </Section>

        <Section title="07 — CAMPAIGNS AND DROPS">
          <P>Core X operates a campaign system in which seasonal drops, protocol releases, and access events are distributed on a discretionary basis. Participation in any drop or campaign does not create a contractual entitlement to future drops, continued access, or specific product features.</P>
          <P>Drop 001 and all subsequent campaign releases constitute the intellectual property of Core X Lab. Access granted during a campaign may be modified, revoked, or evolved as the Lab iterates.</P>
        </Section>

        <Section title="08 — DISCLAIMERS">
          <P>Core X Systems are provided "as is" and "as available." We make no warranties — express or implied — regarding the accuracy, completeness, or fitness for a particular purpose of any content within our Systems.</P>
          <P>Core X Lab is not liable for any outcomes resulting from the application of Mental OS protocols, Command OS tools, or any other system content to your personal life, work, or decisions. You operate by design — that means you own your outcomes.</P>
        </Section>

        <Section title="09 — LIMITATION OF LIABILITY">
          <P>To the maximum extent permitted by applicable law, Core X Lab's total liability to you for any claim arising from your use of our Systems shall not exceed the amount you paid to Core X in the twelve months preceding the claim — or $100 USD if no payment was made.</P>
          <P>Core X Lab is not liable for indirect, incidental, consequential, or punitive damages of any kind.</P>
        </Section>

        <Section title="10 — MODIFICATIONS">
          <P>Core X reserves the right to modify these Terms at any time. When changes are made, the date at the top of this document will be updated. Continued use of Core X Systems after changes constitutes acceptance of the revised Terms.</P>
          <P>Material changes will be communicated to active subscribers via email.</P>
        </Section>

        <Section title="11 — GOVERNING LAW">
          <P>These Terms are governed by the laws of the State of Texas, United States, without regard to conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Travis County, Texas.</P>
        </Section>

        <Section title="12 — CONTACT">
          <P>For any questions regarding these Terms of Service:</P>
          <P><a href="mailto:info@core.x.lab.com" style={styles.email}>info@core.x.lab.com</a></P>
        </Section>

      </div>
    </div>
    <CoreXFooter />
    </>
  );
}
