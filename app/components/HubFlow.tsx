"use client";

import { useEffect, useRef } from "react";

// Ambient AI-automatiseringsflow: inputs → AI-engine → outputs.
// Donker blok in de Leadz-huisstijl (amber in, mint uit), self-contained.
export default function HubFlow() {
  const boxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<SVGSVGElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const net = netRef.current;
    const chips = chipsRef.current;
    const hub = hubRef.current;
    const box = boxRef.current;
    const stage = stageRef.current;
    if (!net || !chips || !hub || !box || !stage) return;

    // Leeg bij (dev) her-mount, zodat we niet dubbel opbouwen.
    net.innerHTML = "";
    chips.innerHTML = "";

    const ACCENT = "#F5A524", OUT = "#4ADE9E";
    const HIN = { x: 865, y: 540 }, HOUT = { x: 1055, y: 540 }, INR = 660, OUTL = 1240;
    const PERIOD = 1.5;

    const INPUTS = [
      { label: "Nieuwe lead", y: 300 },
      { label: "Inkomende e-mail", y: 460 },
      { label: "Websiteformulier", y: 620 },
      { label: "WhatsApp-bericht", y: 780 },
    ];
    const OUTPUTS = [
      { label: "CRM bijgewerkt", y: 340 },
      { label: "Offerte verstuurd", y: 540 },
      { label: "Opvolging ingepland", y: 740 },
    ];

    const rgba = (h: string, a: number) => {
      const n = parseInt(h.slice(1), 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };

    const SVGNS = "http://www.w3.org/2000/svg";
    const mkLine = (x1: number, y1: number, x2: number, y2: number, stroke: string, dash: boolean) => {
      const l = document.createElementNS(SVGNS, "line");
      l.setAttribute("x1", `${x1}`); l.setAttribute("y1", `${y1}`);
      l.setAttribute("x2", `${x2}`); l.setAttribute("y2", `${y2}`);
      l.setAttribute("stroke", stroke); l.setAttribute("stroke-width", "2");
      l.setAttribute("stroke-linecap", "round");
      if (dash) l.setAttribute("stroke-dasharray", "5 15");
      net.appendChild(l);
      return l;
    };

    const dashLines: SVGLineElement[] = [];
    INPUTS.forEach((n) => {
      mkLine(INR, n.y, HIN.x, HIN.y, rgba(ACCENT, 0.28), false);
      dashLines.push(mkLine(INR, n.y, HIN.x, HIN.y, rgba(ACCENT, 0.85), true));
    });
    OUTPUTS.forEach((n) => {
      mkLine(HOUT.x, HOUT.y, OUTL, n.y, rgba(OUT, 0.28), false);
      dashLines.push(mkLine(HOUT.x, HOUT.y, OUTL, n.y, rgba(OUT, 0.85), true));
    });

    type Pulse = { g: SVGGElement; halo: SVGCircleElement; core: SVGCircleElement; off: number; idx: number; from: { x: number; y: number }; to: { x: number; y: number } };
    const pulses: Pulse[] = [];
    const addPulse = (color: string, off: number, idx: number, from: { x: number; y: number }, to: { x: number; y: number }) => {
      const g = document.createElementNS(SVGNS, "g");
      const halo = document.createElementNS(SVGNS, "circle");
      halo.setAttribute("r", "13"); halo.setAttribute("fill", rgba(color, 0.32));
      const core = document.createElementNS(SVGNS, "circle");
      core.setAttribute("r", "5"); core.setAttribute("fill", "#ffffff");
      g.appendChild(halo); g.appendChild(core); net.appendChild(g);
      pulses.push({ g, halo, core, off, idx, from, to });
    };
    INPUTS.forEach((n, i) => [0, 0.5].forEach((off) => addPulse(ACCENT, off, i, { x: INR, y: n.y }, HIN)));
    OUTPUTS.forEach((n, j) => [0.25, 0.75].forEach((off) => addPulse(OUT, off, j, HOUT, { x: OUTL, y: n.y })));

    const mkChip = (n: { label: string; y: number }, left: number, width: number, dot: string) => {
      const el = document.createElement("div");
      el.className = "hf-chip";
      el.style.left = `${left}px`; el.style.top = `${n.y - 31}px`; el.style.width = `${width}px`;
      const d = document.createElement("span");
      d.className = "hf-dot"; d.style.background = dot; d.style.boxShadow = `0 0 10px ${dot}`;
      const s = document.createElement("span");
      s.textContent = n.label;
      el.appendChild(d); el.appendChild(s); chips.appendChild(el);
    };
    INPUTS.forEach((n) => mkChip(n, 360, 300, ACCENT));
    OUTPUTS.forEach((n) => mkChip(n, OUTL, 320, OUT));

    // Schaal het 1920×1080-vlak naar de blokbreedte.
    const fit = () => {
      const s = box.clientWidth / 1920;
      stage.style.transform = `scale(${s})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);

    const render = (t: number) => {
      const off = -(t * 10);
      for (const l of dashLines) l.setAttribute("stroke-dashoffset", `${off}`);
      const glow = 0.6 + 0.28 * Math.sin((2 * Math.PI * t) / 3);
      hub.style.boxShadow = `0 0 ${70 * glow}px ${rgba(ACCENT, 0.55)}, inset 0 1px 0 rgba(255,255,255,0.06)`;
      for (const pu of pulses) {
        const s = ((t / PERIOD) + pu.off + pu.idx * 0.11) % 1;
        const x = pu.from.x + (pu.to.x - pu.from.x) * s;
        const y = pu.from.y + (pu.to.y - pu.from.y) * s;
        pu.halo.setAttribute("cx", `${x}`); pu.halo.setAttribute("cy", `${y}`);
        pu.core.setAttribute("cx", `${x}`); pu.core.setAttribute("cy", `${y}`);
        pu.g.setAttribute("opacity", `${Math.sin(s * Math.PI)}`);
      }
    };

    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      render(0.0001);
    } else {
      let start: number | null = null;
      const frame = (now: number) => {
        if (start === null) start = now;
        render((now - start) / 1000);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="hf-box" ref={boxRef} role="img" aria-label="Automatiseringsflow: binnenkomend werk zoals leads, e-mails en formulieren gaat via de AI-engine naar je systemen zoals CRM en opvolging.">
      <div className="hf-stage" ref={stageRef}>
        <div className="hf-grid" aria-hidden />
        <div className="hf-glow" aria-hidden />
        <div className="hf-vig" aria-hidden />
        <svg className="hf-net" viewBox="0 0 1920 1080" ref={netRef} aria-hidden />
        <div className="hf-hub" ref={hubRef}>
          <div className="hf-ai">AI</div>
          <div className="hf-eng">engine</div>
        </div>
        <div className="hf-chips" ref={chipsRef} />
      </div>

      <style>{`
        .hf-box{ position:relative; width:100%; aspect-ratio:16/9; overflow:hidden; border-radius:22px;
          border:1px solid rgba(255,255,255,.12); background:#0A0B10;
          box-shadow:0 1px 0 rgba(255,255,255,.05) inset, 0 40px 80px -46px rgba(20,24,40,.5); }
        .hf-stage{ position:absolute; top:0; left:0; width:1920px; height:1080px; transform-origin:top left; }
        .hf-grid,.hf-glow,.hf-vig{ position:absolute; inset:0; pointer-events:none; }
        .hf-grid{ background-image:radial-gradient(rgba(255,255,255,.05) 1.4px, transparent 1.4px); background-size:46px 46px; background-position:center; }
        .hf-glow{ left:50%; top:46%; width:1500px; height:1500px; transform:translate(-50%,-50%);
          background:radial-gradient(circle, rgba(245,165,36,.16) 0%, transparent 62%); }
        .hf-vig{ box-shadow:inset 0 0 340px rgba(0,0,0,.72); }
        .hf-net{ position:absolute; inset:0; width:100%; height:100%; }
        .hf-chip{ position:absolute; height:62px; display:flex; align-items:center; gap:14px; padding:0 20px;
          background:#14171F; border:1px solid rgba(255,255,255,.10); border-radius:14px;
          font-family:var(--font-geist-sans),system-ui,sans-serif; font-size:22px; color:#ECEDF4;
          box-shadow:0 10px 26px rgba(0,0,0,.38); white-space:nowrap; }
        .hf-dot{ width:9px; height:9px; border-radius:9px; flex-shrink:0; }
        .hf-hub{ position:absolute; left:865px; top:445px; width:190px; height:190px; border-radius:32px;
          border:1px solid rgba(245,165,36,.7); background:linear-gradient(160deg,#161c2b,#0d111b);
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px;
          box-shadow:0 0 42px rgba(245,165,36,.55), inset 0 1px 0 rgba(255,255,255,.06); }
        .hf-ai{ font-family:var(--font-bricolage),sans-serif; font-weight:800; font-size:62px; line-height:1;
          background:linear-gradient(120deg,#F5A524,#FFC061); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .hf-eng{ font-family:var(--font-geist-mono),monospace; font-size:14px; letter-spacing:.24em; color:#9AA0B2; text-transform:uppercase; }
      `}</style>
    </div>
  );
}
