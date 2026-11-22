import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Mic, Languages, Database, Headphones,
  ArrowRight, Bot, CheckCircle2
} from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      step: "01",
      title: t('howItWorks.step1Title', '1. Speak or Type'),
      desc: t('howItWorks.step1Desc', 'Citizens ask questions naturally in Telugu, Hindi, or English using browser-native microphone or text input.'),
      icon: Mic,
      color: "text-emerald-700"
    },
    {
      step: "02",
      title: t('howItWorks.step2Title', '2. Script & Code-Mix Analysis'),
      desc: t('howItWorks.step2Desc', 'Language Agent inspects Unicode codepoints and phonetics to handle pure script or Latin-script transliterations (Tenglish/Hinglish).'),
      icon: Languages,
      color: "text-teal-700"
    },
    {
      step: "03",
      title: t('howItWorks.step3Title', '3. ChromaDB Semantic RAG'),
      desc: t('howItWorks.step3Desc', 'Knowledge and Research agents retrieve verified policy guidelines from local vector collections.'),
      icon: Database,
      color: "text-emerald-800"
    },
    {
      step: "04",
      title: t('howItWorks.step4Title', '4. Grounded Voice Response'),
      desc: t('howItWorks.step4Desc', 'Response Agent drafts clear answers, verified by the Verification Agent and read aloud via SpeechSynthesis.'),
      icon: Headphones,
      color: "text-teal-800"
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          {t('howItWorks.badge', 'Operational Flow')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {t('howItWorks.title', 'How BhashaBridge Works')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('howItWorks.subtitle', 'A transparent, 4-step autonomous pipeline converting spoken regional queries into verified government intelligence.')}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white border border-emerald-100 p-6 rounded-3xl shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="text-3xl font-black text-emerald-200 mb-2">{s.step}</div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{s.desc}</p>
            </div>
            <div className="pt-3 border-t border-emerald-50 text-[11px] font-mono text-emerald-800 font-semibold">
              Autonomous Turn {s.step}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Technical Flow */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-100 shadow-soft space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Under the Hood: Intent Routing & Anti-Hallucination
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700">
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-800 text-sm">1. Instant Greeting Detection</h4>
            <p className="text-slate-600 leading-relaxed font-normal">
              Standard pleasantries ("hi", "నమస్కారం", "namaste") bypass expensive LLM prompts and return instant warm greetings in the citizen's native language.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            <h4 className="font-bold text-teal-800 text-sm">2. Scheme Keyword Mapping</h4>
            <p className="text-slate-600 leading-relaxed font-normal">
              Detects core citizen concerns (PM Kisan, Rythu Bharosa, Ayushman Bharat, PMAY) and injects authoritative facts from ChromaDB into the prompt.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-900 text-sm">3. Citation Grounding</h4>
            <p className="text-slate-600 leading-relaxed font-normal">
              Every numeric claim is cross-checked against source documents before generating final speech audio.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            to="/assistant"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition"
          >
            <Bot className="w-4 h-4" />
            <span>Experience Live Flow in Voice Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
