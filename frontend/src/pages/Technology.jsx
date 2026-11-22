import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Server, Cpu, Database, Network, ShieldCheck, ArrowRight, Code } from 'lucide-react';

export default function Technology() {
  const stack = [
    {
      category: 'Frontend Client',
      tech: 'React 18 + Vite + Tailwind CSS',
      desc: 'High-performance reactive user interface with Lucide icons, react-i18next internationalization, and responsive mobile-first views.'
    },
    {
      category: 'Client Speech Layer',
      tech: 'Browser Web Speech API & SpeechSynthesis',
      desc: '100% free, client-side STT & TTS. Zero external subscription quota consumed.'
    },
    {
      category: 'Application Gateway',
      tech: 'Java 17 & Spring Boot 3.2',
      desc: 'Provides DTO validation, session boundaries, and reactive WebClient forwarding to the AI Engine.'
    },
    {
      category: 'AI Engine',
      tech: 'Python 3.11 & FastAPI',
      desc: 'Asynchronous multi-agent execution pipeline orchestrating specialized agents and intent routing.'
    },
    {
      category: 'Vector Store & RAG',
      tech: 'ChromaDB + Offline Hashing Embeddings',
      desc: 'Persistent local vector database operating offline without paid embedding API expenses.'
    },
    {
      category: 'Free LLM Router',
      tech: 'OpenRouter Free Tier (:free)',
      desc: 'Strict free-first LLM orchestration (Llama 3.3 70B Free, Gemini 2.0 Flash Free) with zero paid fallbacks.'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          System Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Modern Multi-Agent AI Architecture
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A robust, secure 3-tier architecture separating the Presentation Layer, Gateway Layer, and Python AI Engine.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-white border border-emerald-100 p-8 sm:p-12 rounded-3xl mb-16 shadow-soft">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
          <Network className="w-5 h-5 text-emerald-600" />
          <span>End-to-End Execution Flow</span>
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          
          <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-emerald-700 font-bold mb-1">Tier 1</div>
            <div className="font-bold text-slate-900 text-sm">React Frontend</div>
            <div className="text-[11px] text-slate-500 mt-1">Web Speech Voice In/Out</div>
          </div>

          <div className="text-emerald-500 font-bold text-xl rotate-90 md:rotate-0">→</div>

          <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-teal-700 font-bold mb-1">Tier 2</div>
            <div className="font-bold text-slate-900 text-sm">Spring Boot Gateway</div>
            <div className="text-[11px] text-slate-500 mt-1">Validation & Security</div>
          </div>

          <div className="text-emerald-500 font-bold text-xl rotate-90 md:rotate-0">→</div>

          <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-emerald-800 font-bold mb-1">Tier 3</div>
            <div className="font-bold text-slate-900 text-sm">FastAPI Multi-Agent</div>
            <div className="text-[11px] text-slate-500 mt-1">7 Autonomous Agents</div>
          </div>

          <div className="text-emerald-500 font-bold text-xl rotate-90 md:rotate-0">→</div>

          <div className="bg-emerald-100/60 border border-emerald-300 p-5 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-emerald-900 font-bold mb-1">Tier 4</div>
            <div className="font-bold text-emerald-950 text-sm">OpenRouter Free LLM</div>
            <div className="text-[11px] text-emerald-800 mt-1">ChromaDB Verified Grounding</div>
          </div>

        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {stack.map((item, idx) => (
          <div key={idx} className="bg-white border border-emerald-100 p-6 rounded-3xl shadow-soft hover:shadow-elevated transition-all space-y-3">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{item.category}</div>
            <h4 className="text-lg font-bold text-slate-900">{item.tech}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition"
        >
          <span>View Detailed Engineering Portfolio</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
