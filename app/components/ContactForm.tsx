"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ naam: "", email: "", bericht: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-2xl font-bold mb-2">Bericht ontvangen!</h3>
          <p className="text-white/50">We nemen zo snel mogelijk contact met je op.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-white/50 mb-2">Naam</label>
        <input
          type="text"
          required
          value={formData.naam}
          onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-colors"
          placeholder="Jouw naam"
        />
      </div>
      <div>
        <label className="block text-sm text-white/50 mb-2">E-mailadres</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-colors"
          placeholder="jouw@email.nl"
        />
      </div>
      <div>
        <label className="block text-sm text-white/50 mb-2">Bericht</label>
        <textarea
          required
          rows={5}
          value={formData.bericht}
          onChange={(e) => setFormData({ ...formData, bericht: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
          placeholder="Vertel ons over jouw project of vraag..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all font-semibold text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
      >
        Bericht versturen →
      </button>
    </form>
  );
}
