import React from 'react';
import { Mic, ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection({ onLaunchPlayground }) {
  return (
    <section className="w-full max-w-4xl px-4 sm:px-6 pt-12 pb-8 flex flex-col items-center text-center mx-auto relative">
      {/* Soft Ambient Emerald Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-64 bg-emerald-400/15 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Minimal Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-4 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>BhashaBridge AI • AI for Bharat</span>
      </div>

      {/* Punchy Headline */}
      <h1 className="text-3xl sm:text-5xl font-headline font-extrabold text-slate-900 tracking-tight leading-tight">
        Voice & Language AI for <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Bharat</span>
      </h1>

      {/* Crisp Description */}
      <p className="text-sm sm:text-base text-slate-600 max-w-xl mt-3 font-normal leading-relaxed">
        Intelligent voice assistant enabling natural communication in Telugu, Hindi & English with code-mixed dialect understanding and verified government knowledge.
      </p>

      {/* 3 Minimal Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
        <span className="text-xs font-medium text-emerald-900 bg-emerald-50/90 px-3 py-1 rounded-full border border-emerald-200/80">
          🗣️ Telugu, Hindi & English
        </span>
        <span className="text-xs font-medium text-emerald-900 bg-emerald-50/90 px-3 py-1 rounded-full border border-emerald-200/80">
          ⚡ Free-First OpenRouter AI
        </span>
        <span className="text-xs font-medium text-emerald-900 bg-emerald-50/90 px-3 py-1 rounded-full border border-emerald-200/80">
          🛡️ ChromaDB Verified RAG
        </span>
      </div>

      {/* Quick Call to Action */}
      <div className="mt-6">
        <button
          onClick={onLaunchPlayground}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Mic className="w-4 h-4" />
          <span>Try Voice Assistant</span>
          <ArrowDown className="w-3.5 h-3.5 opacity-80" />
        </button>
      </div>
    </section>
  );
}
