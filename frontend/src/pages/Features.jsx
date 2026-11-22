import React from 'react';
import { Link } from 'react-router-dom';
import {
  Languages, Mic, ShieldCheck, Database,
  Cpu, RotateCcw, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: Languages,
      color: 'text-amber-400',
      title: 'Multilingual & Dialect AI',
      desc: 'Seamlessly understands Telugu, Hindi, and English with automatic language detection. Handles everyday code-mixed phrases (Tenglish and Hinglish) with zero translation latency.'
    },
    {
      icon: Mic,
      color: 'text-rose-400',
      title: 'Browser-Native Voice Intelligence',
      desc: 'Voice-in via Web Speech API and voice-out via SpeechSynthesis. Fully runs in the client browser at zero cost without relying on paid speech recognition APIs.'
    },
    {
      icon: Cpu,
      color: 'text-bharat-violet',
      title: '7-Agent Autonomous Pipeline',
      desc: 'A modular multi-agent system: Orchestrator, Language Agent, Knowledge Agent, Research Agent, Response Generator, Verification Agent, and Voice Agent collaborate on each turn.'
    },
    {
      icon: Database,
      color: 'text-emerald-400',
      title: 'RAG Knowledge & Citation Engine',
      desc: 'Retrieves relevant document sections from a persistent ChromaDB vector store. Every answer attributes official government guidelines and scheme documents.'
    },
    {
      icon: ShieldCheck,
      color: 'text-cyan-400',
      title: 'Strictly Free-First & Anti-Hallucination',
      desc: 'Strictly configured for verified OpenRouter Free models. Claims are cross-checked by the Verification Agent to eliminate fabricated subsidy numbers.'
    },
    {
      icon: RotateCcw,
      color: 'text-amber-300',
      title: 'Multi-turn Conversation Memory',
      desc: 'Maintains recent conversational history per session ID. Seamlessly understands contextual follow-ups such as "Who is eligible for this?"'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          Platform Capabilities
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Bharat’s Voice & Language Realities
        </h1>
        <p className="text-base sm:text-lg text-slate-300">
          Discover the complete suite of features powering BhashaBridge AI.
        </p>
      </div>

      {/* Grid of Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {featuresList.map((f, i) => (
          <div key={i} className="bg-navy-800/60 border border-slate-700/60 p-7 rounded-3xl hover:border-slate-500 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-slate-700 flex items-center justify-center">
              <f.icon className={`w-6 h-6 ${f.color}`} />
            </div>
            <h3 className="text-xl font-bold text-white">{f.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-bharat-orange to-amber-500 text-navy-900 font-extrabold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition"
        >
          <span>Test Features in Live Assistant</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
