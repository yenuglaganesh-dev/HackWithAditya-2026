import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, CheckCircle2, ArrowRight, Mic, Sparkles, MessageSquare } from 'lucide-react';

export default function ProblemSolutionSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mx-auto">
      <div className="space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider">
            <span>🇮🇳</span>
            <span>{t('problemSolution.badge', 'AI For 1.4 Billion Bharat Citizens')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-headline font-extrabold text-white tracking-tight">
            Bridging The Linguistic Digital Divide
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Over 800 million citizens struggle to access government welfare schemes due to complex English web portals, regional dialect barriers, and AI hallucinations.
          </p>
        </div>

        {/* 2 Feature Cards: The Challenge vs The BhashaBridge Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: The Citizen Challenge */}
          <div className="p-8 rounded-3xl mosaic-glass-card border border-rose-500/20 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6 border border-rose-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-headline font-bold text-white mb-3">
              The Problem For Everyday Citizens
            </h3>
            <ul className="space-y-3.5 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">•</span>
                <span><strong>Complex Bureaucratic Portals:</strong> Critical welfare schemes (PM-Kisan, PMAY, Ayushman Bharat) are buried in hundreds of pages of English PDFs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">•</span>
                <span><strong>Dialect & Script Exclusion:</strong> Standard AI models fail when citizens speak everyday mixed dialects like Tenglish (Telugu+English) or Hinglish.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">•</span>
                <span><strong>AI Hallucination Risk:</strong> Generic public chatbots frequently fabricate eligibility criteria, income thresholds, and application deadlines.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: The BhashaBridge AI Solution */}
          <div className="p-8 rounded-3xl mosaic-glass-card border border-sky-400/20 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/10 text-sky-400 flex items-center justify-center mb-6 border border-sky-400/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-headline font-bold text-white mb-3">
              The BhashaBridge Multi-Agent Solution
            </h3>
            <ul className="space-y-3.5 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base">•</span>
                <span><strong>Zero-Cost Native Speech In & Out:</strong> Record your speech and listen to answers read aloud natively in Telugu, Hindi, or English using Web Speech.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base">•</span>
                <span><strong>7-Agent RAG Orchestration:</strong> Grounded strictly in official government scheme documents indexed in local ChromaDB vector databases.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sky-400 font-bold text-base">•</span>
                <span><strong>Sovereign Free-First Stack:</strong> 100% free and open architecture running on OpenRouter Free LLMs with zero credit-card dependencies.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Quick Shortcut Banner to Dedicated Voice Assistant & Agents Page */}
        <div className="p-6 sm:p-8 rounded-3xl mosaic-glass border border-sky-400/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sky-400 text-xs font-bold font-mono">
              <Sparkles className="w-4 h-4" />
              <span>DEDICATED FULL-SCREEN CHAT & AGENT MESH</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-headline font-extrabold text-white">
              Ready to explore the 7-Agent AI Console?
            </h4>
            <p className="text-sm text-zinc-400 max-w-xl">
              Open the dedicated assistant workspace with full voice recording controls, instant audio replay, and complete multi-agent execution traces.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/assistant"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-300 text-[#06233a] font-extrabold text-sm shadow-lg shadow-sky-400/25 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#06233a]" />
              <span>Launch Voice Console</span>
              <ArrowRight className="w-4 h-4 text-[#06233a]" />
            </Link>

            <Link
              to="/agents"
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-bold transition cursor-pointer"
            >
              <span>View 7-Agent Mesh</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
