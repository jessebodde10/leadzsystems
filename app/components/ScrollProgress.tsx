"use client";

import { useEffect, useRef } from "react";

// Dunne voortgangsbalk bovenaan die meevult op basis van de scrollpositie.
// Globaal geplaatst via de layout, boven alle content (ook de nav).
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const y = window.scrollY || doc.scrollTop || 0;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100, pointerEvents: "none" }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          transformOrigin: "0 50%",
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #F5A524 0%, #FFC061 100%)",
          boxShadow: "0 0 10px rgba(245,165,36,.5)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
