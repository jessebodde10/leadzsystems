"use client";

import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS } from "../lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 md:px-6">
      <div className="w-full max-w-3xl rounded-3xl md:rounded-full bg-[#1a1d22]/90 backdrop-blur-md border border-white/10 shadow-lg shadow-black/30">
        <div className="flex items-center justify-between gap-8 px-5 py-3">
          <a href="/" className="flex items-center">
            <Image src="/logo.png" alt="Leadz Systems" width={1350} height={157} className="h-[18px] w-auto object-contain brightness-0 invert" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.filter((l) => l.label !== "Contact").map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="/#contact"
            className="hidden md:inline-block text-sm px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold whitespace-nowrap shadow-md shadow-indigo-500/20"
          >
            Neem contact op
          </a>

          {/* Mobiele hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 -mr-1"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>

        {/* Mobiel uitklapmenu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${open ? "max-h-96" : "max-h-0"}`}
        >
          <div className="px-5 pb-4 pt-1 flex flex-col gap-1 border-t border-white/10">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-5 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 font-semibold shadow-md shadow-indigo-500/20"
            >
              Neem contact op
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
