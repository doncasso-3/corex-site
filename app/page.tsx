"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import DotGrid from "@/components/DotGrid";

const NODE_ROUTES: Record<string, string> = {
  "command-os": "/waitlist",
  "manifesto":  "/manifesto",
};

const ACCENT = "#0033CC";
const ACCENT_HEX = 0x0033cc;

const NODES = [
  { id: "mental-os",   label: "MENTAL OS",   sub: "Framework",   phi: 1.10, theta: 0.60, primer: false },
  { id: "lab",         label: "THE LAB",     sub: "Origin",      phi: 1.90, theta: 2.20, primer: false },
  { id: "modern-mind", label: "MODERN MIND", sub: "Sub-brand",   phi: 2.40, theta: 1.30, primer: false },
  { id: "command-os",  label: "COMMAND OS",  sub: "The Install", phi: 1.00, theta: 3.70, primer: true  },
  { id: "manifesto",   label: "MANIFESTO",   sub: "Doctrine",    phi: 0.90, theta: 5.80, primer: true  },
  { id: "signal",      label: "SIGNAL",      sub: "Media",       phi: 2.60, theta: 4.60, primer: false },
  { id: "c-max",       label: "C-MAX",       sub: "Protocol",    phi: 1.55, theta: 5.40, primer: false },
  { id: "lab-status",  label: "LAB STATUS",  sub: "Roadmap",     phi: 1.30, theta: 2.85, primer: false },
];

const CONNECTIONS = [
  [1,0],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],
  [2,5],[2,4],
  [6,3],
  [0,4],
  [3,5],
];

const R = 2.2;

function toCart(phi: number, theta: number) {
  return new THREE.Vector3(
    R * Math.sin(phi) * Math.cos(theta),
    R * Math.cos(phi),
    R * Math.sin(phi) * Math.sin(theta)
  );
}

type NodeType = typeof NODES[number];

export default function App() {
  const mountRef  = useRef<HTMLDivElement>(null);
  const router    = useRouter();
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef  = useRef<Record<string, unknown>>({});
  const [hovered,  setHovered]  = useState<NodeType | null>(null);
  const [clock,    setClock]    = useState("");
  const [loaded,   setLoaded]   = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [transitioning, setTransitioning] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Kept in a ref so the useEffect canvas-click closure always sees the latest version
  const navigateRef = useRef<(id: string) => void>(() => {});
  navigateRef.current = (id: string) => {
    const route = NODE_ROUTES[id];
    if (route) setTransitioning(route);
  };

  const navigate = (id: string) => navigateRef.current(id);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const tickClock = () => {
      const now = new Date();
      const tz = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + tz);
    };
    tickClock();
    const clockId = setInterval(tickClock, 1000);

    const el = mountRef.current!;
    let W = el.clientWidth;
    let H = el.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W/H, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const wfSphere = new THREE.Mesh(
      new THREE.SphereGeometry(R, 32, 20),
      new THREE.MeshBasicMaterial({ color: 0x0a0a0a, wireframe: true, transparent: true, opacity: 0.15 })
    );
    scene.add(wfSphere);

    const group = new THREE.Group();
    scene.add(group);

    const positions = NODES.map(n => toCart(n.phi, n.theta));

    CONNECTIONS.forEach(([a, b]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([positions[a].clone(), positions[b].clone()]);
      group.add(new THREE.Line(geo,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.38, linewidth: 2 })
      ));
    });

    const haloMeshes: THREE.Mesh[] = [];

    NODES.forEach((n, i) => {
      const r = n.primer ? 0.10 : 0.07;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(r, 20, 14),
        new THREE.MeshBasicMaterial({ color: n.primer ? ACCENT_HEX : 0xbbbbbb, transparent: true, opacity: n.primer ? 1 : 0.85 })
      );
      mesh.position.copy(positions[i]);
      mesh.userData.index = i;
      group.add(mesh);

      if (n.primer) {
        [0.18, 0.32].forEach((hr, j) => {
          const halo = new THREE.Mesh(
            new THREE.SphereGeometry(hr, 12, 8),
            new THREE.MeshBasicMaterial({ color: ACCENT_HEX, transparent: true, opacity: j === 0 ? 0.12 : 0.04 })
          );
          halo.position.copy(positions[i]);
          halo.userData.baseOpacity = j === 0 ? 0.12 : 0.04;
          halo.userData.phase = j * Math.PI;
          group.add(halo);
          haloMeshes.push(halo);
        });
      }
    });

    const hitMeshes = NODES.map((_, i) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 8, 6),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      m.position.copy(positions[i]);
      m.userData.index = i;
      group.add(m);
      return m;
    });

    stateRef.current = { group, wfSphere, positions, haloMeshes };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovIdx = -1;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / W) * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / H) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(hitMeshes);
      const idx  = hits.length > 0 ? hits[0].object.userData.index : -1;
      if (idx !== hovIdx) { hovIdx = idx; setHovered(idx >= 0 ? NODES[idx] : null); }
    };
    el.addEventListener("mousemove", onMouseMove);

    const onCanvasClick = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / W) * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / H) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(hitMeshes);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.index;
        navigateRef.current(NODES[idx].id);
      }
    };
    el.addEventListener("click", onCanvasClick);

    setTimeout(() => setLoaded(true), 400);

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      const rotY = t * 0.12;
      group.rotation.y    = rotY;
      group.rotation.x    = 0.22;
      wfSphere.rotation.y = rotY;
      wfSphere.rotation.x = 0.22;

      haloMeshes.forEach(h => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + h.userData.phase);
        (h.material as THREE.MeshBasicMaterial).opacity = h.userData.baseOpacity * (0.35 + 1.65 * pulse);
        h.scale.setScalar(1 + 0.22 * pulse);
      });

      labelRefs.current.forEach((lbl, i) => {
        if (!lbl) return;
        const worldPos = positions[i].clone().applyEuler(new THREE.Euler(group.rotation.x, group.rotation.y, 0, "XYZ"));
        const proj = worldPos.clone().project(camera);
        lbl.style.left    = ((proj.x *  0.5 + 0.5) * W) + "px";
        lbl.style.top     = ((proj.y * -0.5 + 0.5) * H) + "px";
        lbl.style.opacity = worldPos.z > -R * 0.2 ? "1" : "0.04";
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      W = el.clientWidth; H = el.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(clockId);
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("click", onCanvasClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener('resize', checkMobile);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{
      width:"100vw", height:"100vh", background:"#000", overflow:"hidden", position:"relative",
      opacity: loaded ? 1 : 0,
      transition: transitioning ? "transform 0.5s ease-in" : "opacity 1.6s ease",
      transform: transitioning ? "scale(1.07)" : "scale(1)",
    }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <DotGrid />

      <div ref={mountRef} style={{ position:"absolute", inset:0 }} />

      {/* Scanlines */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:3,
        background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)" }} />

      {/* Vignette */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:2,
        background:"radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.72) 100%)" }} />

      {/* Node labels */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:6 }}>
        {NODES.map((n, i) => (
          <div key={n.id} ref={el => { labelRefs.current[i] = el; }}
            style={{ position:"absolute", transform:"translate(-50%, calc(-100% - 14px))",
              fontFamily:"'IBM Plex Mono', monospace", textAlign:"center",
              whiteSpace:"nowrap", pointerEvents:"none", transition:"opacity 0.4s" }}>
            <div style={{
              color: n.primer ? ACCENT : "#ccc",
              fontSize: "10px", letterSpacing: "0.22em", fontWeight: n.primer ? 700 : 400,
              textShadow: n.primer
                ? "0 0 18px rgba(0,51,204,1), 0 0 40px rgba(0,51,204,0.4)"
                : "0 0 10px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)",
            }}>{n.label}</div>
            {n.primer && (
              <div style={{
                color: "rgba(0,51,204,0.8)",
                fontSize:"7px", letterSpacing:"0.18em", marginTop:"3px",
              }}>▸ ENTER</div>
            )}
          </div>
        ))}
      </div>

      {/* Top-center logo */}
      <div style={{ position:"absolute", top:28, left:"50%", transform:"translateX(-50%)", zIndex:10 }}>
        <svg width={isMobile ? 18 : 22} height={isMobile ? 18 : 22} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="11" y="11" width="14" height="14" rx="2" stroke="white" strokeWidth="2.2" fill="none"/>
          <line x1="11" y1="11" x2="4"  y2="4"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="25" y1="11" x2="32" y2="4"  stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="11" y1="25" x2="4"  y2="32" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="25" y1="25" x2="32" y2="32" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Top-left */}
      <div style={{ position:"absolute", top: isMobile ? 18 : 28, left: isMobile ? 16 : 32, zIndex:10 }}>
        <div style={{ fontFamily:"'IBM Plex Mono', monospace", color:"rgba(255,255,255,0.28)", fontSize: isMobile ? "11px" : "18px", letterSpacing:"0.44em" }}>CORE X LAB</div>
        <div style={{ fontFamily:"'Bebas Neue', sans-serif", color:"#fff", fontSize: isMobile ? "18px" : "30px", letterSpacing:"0.24em", marginTop:"6px" }}>SYSTEM MAP</div>
      </div>

      {/* Top-right: online + clock + hamburger */}
      <div style={{ position:"absolute", top: isMobile ? 18 : 28, right: isMobile ? 16 : 32, zIndex:20, fontFamily:"'IBM Plex Mono', monospace", display:"flex", alignItems:"center", gap:"18px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ color:ACCENT, fontSize: isMobile ? "9px" : "11px", letterSpacing:"0.3em" }}>● ONLINE</div>
          {!isMobile && <div style={{ color:"rgba(255,255,255,0.18)", fontSize:"12px" }}>{clock}</div>}
        </div>
        <button onClick={() => setMenuOpen(o => !o)} style={{
          background:"none", border:"none", outline:"none",
          cursor:"pointer", padding:"4px 0",
          display:"flex", flexDirection:"column", gap:"5px", alignItems:"center",
        }}>
          {[0,1,2].map(j => (
            <div key={j} style={{
              width:"20px", height:"1px",
              background: menuOpen ? ACCENT : "rgba(255,255,255,0.75)",
              transition:"all 0.25s",
              transform: menuOpen
                ? j===0 ? "rotate(45deg) translate(4px,4px)"
                : j===2 ? "rotate(-45deg) translate(4px,-4px)"
                : "scaleX(0)"
                : "none",
            }} />
          ))}
        </button>
      </div>

      {/* Dropdown nav */}
      <div style={{
        position:"absolute", top:0, right:0, zIndex:15,
        width: isMobile ? "100vw" : "260px",
        background:"rgba(0,0,0,0.55)",
        backdropFilter:"blur(24px) saturate(160%)",
        WebkitBackdropFilter:"blur(24px) saturate(160%)",
        maxHeight: menuOpen ? "100vh" : "0",
        overflow:"hidden",
        transition:"max-height 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ padding:"72px 28px 28px", overflowY:"auto", maxHeight:"100vh" }}>
          {NODES.map((n, i) => (
            <div key={n.id} onClick={() => navigate(n.id)} style={{
              display:"flex", alignItems:"center", gap:"14px",
              padding:"11px 0",
              borderBottom:"none",
              cursor:"pointer", fontFamily:"'IBM Plex Mono', monospace",
              transition:"padding-left 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.paddingLeft = "8px"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.paddingLeft = "0px"}
            >
              <div style={{
                width:"6px", height:"6px", borderRadius:"50%", flexShrink:0,
                background: n.primer ? ACCENT : "rgba(255,255,255,0.3)",
                boxShadow: n.primer ? `0 0 8px ${ACCENT}` : "none",
              }} />
              <div style={{ flex:1 }}>
                <div style={{ color: n.primer ? ACCENT : "#fff", fontSize:"15px", letterSpacing:"0.18em" }}>{n.label}</div>
                <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"10px", letterSpacing:"0.12em", marginTop:"2px" }}>{n.sub}</div>
              </div>
              {n.primer && <div style={{ color:ACCENT, fontSize:"10px", letterSpacing:"0.18em" }}>START</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-left */}
      <div style={{ position:"absolute", bottom: isMobile ? 16 : 28, left: isMobile ? 16 : 32, zIndex:10 }}>
        <div style={{ fontFamily:"'Bebas Neue', sans-serif", color:"#fff", fontSize: isMobile ? "28px" : "49px", letterSpacing:"0.1em", lineHeight:1.0 }}>
          OPERATE<br/>BY DESIGN.
        </div>
        <div style={{ fontFamily:"'IBM Plex Mono', monospace", color:"rgba(255,255,255,0.2)", fontSize: isMobile ? "10px" : "19px", letterSpacing:"0.4em", marginTop:"10px" }}>
          REJECT DEFAULT
        </div>
      </div>

      {/* Bottom-right: primers */}
      <div style={{ position:"absolute", bottom: isMobile ? 16 : 28, right: isMobile ? 16 : 32, zIndex:10, textAlign:"right", fontFamily:"'IBM Plex Mono', monospace" }}>
        <div style={{ color:"rgba(255,255,255,0.18)", fontSize: isMobile ? "10px" : "18px", letterSpacing:"0.34em", marginBottom:"10px" }}>START HERE</div>
        <div style={{ display:"flex", gap:"8px", justifyContent:"flex-end" }}>
          {NODES.filter(n => n.primer).map(n => (
            <div key={n.id} onClick={() => navigate(n.id)} style={{
              color:ACCENT, fontSize: isMobile ? "11px" : "19px", letterSpacing:"0.2em",
              border:"1px solid rgba(0,51,204,0.45)", padding: isMobile ? "5px 10px" : "6px 14px",
              boxShadow:"0 0 18px rgba(0,51,204,0.14)", cursor:"pointer",
            }}>{n.label}</div>
          ))}
        </div>
      </div>

      {/* Hover tooltip */}
      {hovered && (
        <div style={{
          position:"absolute", left:"50%", bottom:"calc(50% + 70px)",
          transform:"translateX(-50%)", zIndex:20,
          background:"rgba(0,0,0,0.98)",
          border:`1px solid ${hovered.primer ? ACCENT : "rgba(255,255,255,0.12)"}`,
          padding:"14px 22px", fontFamily:"'IBM Plex Mono', monospace",
          pointerEvents:"none",
          boxShadow: hovered.primer ? "0 0 40px rgba(0,51,204,0.2)" : "none",
          minWidth:"190px",
        }}>
          <div style={{ color: hovered.primer ? ACCENT : "#fff", fontSize:"10px", letterSpacing:"0.22em", fontWeight:700 }}>{hovered.label}</div>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:"7.5px", letterSpacing:"0.16em", marginTop:"5px" }}>{hovered.sub}</div>
          {hovered.primer && <div style={{ color:ACCENT, fontSize:"7px", letterSpacing:"0.22em", marginTop:"12px" }}>▸ RECOMMENDED ENTRY POINT</div>}
        </div>
      )}

      {/* Click outside closes menu */}
      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position:"absolute", inset:0, zIndex:14 }} />}

      {/* Page transition overlay */}
      {transitioning && (
        <div
          style={{
            position:"fixed", inset:0, zIndex:9999,
            background:"#000",
            opacity: 0,
            animation:"fadeOverlay 0.45s ease-in forwards",
            pointerEvents:"none",
          }}
          onAnimationEnd={() => router.push(transitioning)}
        />
      )}
      <style>{`
        @keyframes fadeOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (max-width: 768px) {
          /* ensure nav takes full width on mobile */
        }
      `}</style>
    </div>
  );
}
