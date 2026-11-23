import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Mic, Languages, Database, Headphones,
  ArrowRight, Bot, CheckCircle2, Cpu, ShieldCheck
} from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      step: "01",
      title: "1. Speak or Type",
      desc: "Citizens ask questions naturally in Telugu, Hindi, or English using browser-native microphone or text input with zero audio latency.",
      icon: Mic,
    },
    {
      step: "02",
      title: "2. Script & Code-Mix Analysis",
      desc: "Language Agent inspects Unicode codepoints and phonetics to handle pure script or Latin-script transliterations (Tenglish/Hinglish).",
      icon: Languages,
    },
    {
      step: "03",
      title: "3. ChromaDB Semantic RAG",
      desc: "Knowledge and Research agents retrieve verified policy guidelines from local vector collections.",
      icon: Database,
    },
    {
      step: "04",
      title: "4. Grounded Voice Response",
      desc: "Response Agent drafts clear answers, verified by the Verification Agent and read aloud via browser SpeechSynthesis.",
      icon: Headphones,
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF3E8] border border-[#FBD3B6] text-[#E96B16] text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse" />
          <span>Operational Flow & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
          How BhashaBridge Works
        </h1>
        <p className="text-base text-[#707070] max-w-2xl mx-auto leading-relaxed">
          A transparent, 4-step autonomous pipeline converting spoken regional queries into verified government intelligence.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white border border-[#E8EAED] p-6 rounded-3xl shadow-card hover:border-[#FBD3B6] hover:shadow-elevated transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="text-3xl font-black text-[#FBD3B6] mb-2">{s.step}</div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] border border-[#FBD3B6] flex items-center justify-center mb-4 text-[#F58220]">
                <s.icon className="w-5 h-5 text-[#F58220]" />
              </div>
              <h3 className="text-lg font-bold text-[#202124] mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-[#707070] leading-relaxed font-normal">{s.desc}</p>
            </div>
            <div className="pt-3 border-t border-[#F8F9FA] text-[11px] font-mono text-[#E96B16] font-semibold">
              Autonomous Turn {s.step}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Technical Flow */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8EAED] shadow-card space-y-6">
        <h2 className="text-2xl font-bold text-[#202124]">
          Under the Hood: Intent Routing & Anti-Hallucination
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#707070]">
          <div className="p-5 rounded-2xl bg-[#FFF8F2] border border-[#FBD3B6] space-y-2">
            <h4 className="font-bold text-[#202124] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F58220]" />
              1. Instant Greeting Detection
            </h4>
            <p className="text-[#707070] leading-relaxed font-normal">
              Standard pleasantries ("hi", "నమస్కారం", "namaste") bypass heavy LLM queries and return instant warm greetings in the citizen's native language.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#FFF8F2] border border-[#FBD3B6] space-y-2">
            <h4 className="font-bold text-[#202124] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F58220]" />
              2. Scheme Keyword Mapping
            </h4>
            <p className="text-[#707070] leading-relaxed font-normal">
              Detects core citizen concerns (PM Kisan, Rythu Bharosa, Ayushman Bharat, PMAY) and injects authoritative facts from ChromaDB into the prompt.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#FFF8F2] border border-[#FBD3B6] space-y-2">
            <h4 className="font-bold text-[#202124] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F58220]" />
              3. Citation Grounding
            </h4>
            <p className="text-[#707070] leading-relaxed font-normal">
              Every numeric claim is cross-checked against source documents before generating final speech audio to avoid hallucinations.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            to="/assistant"
            className="flex items-center gap-2 bg-gradient-to-r from-[#F58220] to-[#E96B16] text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-orange-500/25 hover:scale-105 transition"
          >
            <Bot className="w-4 h-4" />
            <span>Open Interactive Voice Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
