import React from 'react';

export default function HeroSection({ onLaunchPlayground, onExploreMesh }) {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 pt-8 pb-10 flex flex-col items-center text-center relative mx-auto">
      {/* Ambient Multi-spectrum Sovereign Glow Backdrop */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 pointer-events-none opacity-60 overflow-hidden -z-10">
        <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-4 right-1/4 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/3 w-96 h-80 rounded-full bg-emerald-400/15 blur-3xl"></div>
      </div>

      {/* Pill Badge with Subtle Saffron/Tricolor Ring */}
      <div className="animate-float inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-soft hover:shadow-md transition-all text-xs mb-5 group cursor-default">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(5,150,105,0.8)]"></span>
        </span>
        <span className="font-mono font-bold text-slate-800 uppercase tracking-wider text-[11px]">Bharat Sovereign Stack</span>
        <span className="text-slate-300">•</span>
        <span className="font-mono text-blue-700 font-semibold text-[11px] flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px] text-blue-600">verified</span> Tier-IV In-Country
        </span>
      </div>

      {/* Hero Headline with Tricolor Sovereign Gradient */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-headline font-extrabold text-slate-900 tracking-tight leading-[1.18] max-w-4xl">
        Sovereign Agentic AI for <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 bg-clip-text text-transparent drop-shadow-xs">India</span>
      </h1>

      {/* 1-line Subtitle */}
      <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mt-4 leading-relaxed font-normal">
        Autonomous multilingual agent swarms, ultra-low latency Indic voice, and edge intelligence engineered for national scale.
      </p>

      {/* 3 Primary Stat Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-7 max-w-3xl">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-sm border border-blue-200/80 shadow-soft hover:border-blue-400 hover:shadow-md transition-all group">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(29,78,216,0.7)] group-hover:scale-125 transition-transform"></div>
          <span className="text-xs sm:text-sm font-bold text-slate-900">22 Scheduled Languages</span>
          <span className="text-[10px] sm:text-[11px] font-mono text-blue-700 bg-blue-50/90 px-2 py-0.5 rounded-full font-bold border border-blue-100">Indic-First</span>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-200/80 shadow-soft hover:border-emerald-400 hover:shadow-md transition-all group">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(5,150,105,0.7)] group-hover:scale-125 transition-transform"></div>
          <span className="text-xs sm:text-sm font-bold text-slate-900">&lt;140ms Latency</span>
          <span className="text-[10px] sm:text-[11px] font-mono text-emerald-800 bg-emerald-50/90 px-2 py-0.5 rounded-full font-bold border border-emerald-100">Full Duplex</span>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-sm border border-amber-200/80 shadow-soft hover:border-amber-400 hover:shadow-md transition-all group">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(234,88,12,0.7)] group-hover:scale-125 transition-transform"></div>
          <span className="text-xs sm:text-sm font-bold text-slate-900">100% In-Country Data</span>
          <span className="text-[10px] sm:text-[11px] font-mono text-amber-800 bg-amber-50/90 px-2 py-0.5 rounded-full font-bold border border-amber-100">Air-Gapped</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3.5 mt-8">
        <button
          onClick={onLaunchPlayground}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/30 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="material-symbols-outlined text-[19px]">mic</span>
          <span>Open Voice AI Console</span>
        </button>
        <button
          onClick={onExploreMesh}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/90 hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-semibold text-xs sm:text-sm shadow-soft hover:border-amber-300 hover:shadow-md transition-all group"
        >
          <span className="material-symbols-outlined text-[19px] text-amber-600 group-hover:scale-110 transition-transform">hub</span>
          <span>Explore Swarm Mesh</span>
        </button>
      </div>
    </section>
  );
}
