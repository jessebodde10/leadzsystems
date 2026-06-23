"use client";

import { useState } from "react";

export default function ContactFormLight() {
  const [formData, setFormData] = useState({ naam: "", email: "", bericht: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="h-full flex items-center justify-center rounded-xl border border-[#1a3300] bg-[#d5f5c2] p-10">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-bold mb-2 text-[#1a3300]">Bericht ontvangen!</h3>
          <p className="text-[#1a3300]/70">We nemen zo snel mogelijk contact met je op.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#1a3300] mb-2">Naam</label>
        <input
          type="text"
          required
          value={formData.naam}
          onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
          className="w-full px-4 py-3 rounded-md bg-[#fcfaf5] border border-[#1a3300]/30 text-[#1a3300] placeholder-[#1a3300]/30 focus:outline-none focus:border-[#1a3300] transition-colors"
          placeholder="Jouw naam"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1a3300] mb-2">E-mailadres</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-md bg-[#fcfaf5] border border-[#1a3300]/30 text-[#1a3300] placeholder-[#1a3300]/30 focus:outline-none focus:border-[#1a3300] transition-colors"
          placeholder="jouw@email.nl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1a3300] mb-2">Bericht</label>
        <textarea
          required
          rows={5}
          value={formData.bericht}
          onChange={(e) => setFormData({ ...formData, bericht: e.target.value })}
          className="w-full px-4 py-3 rounded-md bg-[#fcfaf5] border border-[#1a3300]/30 text-[#1a3300] placeholder-[#1a3300]/30 focus:outline-none focus:border-[#1a3300] transition-colors resize-none"
          placeholder="Vertel ons over jouw project of vraag..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-md bg-[#1a3300] text-[#fcfaf5] hover:bg-[#1a3300]/90 transition-colors font-medium text-lg shadow-sm"
      >
        → Bericht versturen
      </button>
    </form>
  );
}
