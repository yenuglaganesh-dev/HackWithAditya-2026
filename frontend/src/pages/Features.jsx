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
      color: 'text-emerald-600',
      title: 'Multilingual & Dialect AI',
      desc: 'Seamlessly understands Telugu, Hindi, and English with automatic language detection. Handles everyday code-mixed phrases (Tenglish and Hinglish) with zero translation latency.'
    },
    {
      icon: Mic,
      color: 'text-teal-600',
      title: 'Browser-Native Voice Intelligence',
      desc: 'Voice-in via Web Speech API and voice-out via SpeechSynthesis. Fully runs in the client browser at zero cost without relying on paid speech recognition APIs.'
    },
    {
      icon: Cpu,
      color: 'text-emerald-700',
      title: '7-Agent Autonomous Pipeline',
      desc: 'A modular multi-agent system: Orchestrator, Language Agent, Knowledge Agent, Research Agent, Response Generator, Verification Agent, and Voice Agent collaborate on each turn.'
    },
    {
      icon: Database,
      color: 'text-emerald-600',
      title: 'RAG Knowledge & Citation Engine',
      desc: 'Retrieves relevant document sections from a persistent ChromaDB vector store. Every answer attributes official government guidelines and scheme documents.'
    },
    {
      icon: ShieldCheck,
      color: 'text-teal-600',
      title: 'Strictly Free-First & Anti-Hallucination',
      desc: 'Strictly configured for verified OpenRouter Free models. Claims are cross-checked by the Verification Agent to eliminate fabricated subsidy numbers.'
    },
    {
      icon: RotateCcw,
      color: 'text-emerald-800',
      title: 'Multi-turn Conversation Memory',
      desc: 'Maintains recent conversational history per session ID. Seamlessly understands contextual follow-ups such as "Who is eligible for this?"'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          Platform Capabilities
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Engineered for Bharat’s Voice & Language Realities
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover the complete suite of features powering BhashaBridge AI across multilingual speech, verified RAG knowledge, and autonomous agents.
        </p>
      </div>

      {/* Grid of Features - Clean white cards with emerald borders and sharp contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {featuresList.map((f, i) => (
          <div key={i} className="bg-white border border-emerald-100 rounded-3xl p-7 shadow-soft hover:shadow-elevated hover:border-emerald-300 transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700 shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {f.desc}
              </p>
            </div>
            <div className="pt-3 border-t border-emerald-50 text-[11px] font-mono text-emerald-800 font-semibold">
              Feature Active • Verified
            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-xl font-bold text-slate-900">Experience Live Voice Processing</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Test real-time speech recognition, RAG retrieval and regional speech synthesis now.
          </p>
        </div>
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition-all text-xs sm:text-sm shrink-0"
        >
          <span>Test in Voice Assistant</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
