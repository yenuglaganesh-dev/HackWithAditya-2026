import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Server, Cpu, Database, Network, ShieldCheck, ArrowRight, Code } from 'lucide-react';

export default function Technology() {
  const stack = [
    {
      category: 'Frontend Client',
      tech: 'React 18 + Vite + Tailwind CSS',
      desc: 'High-performance reactive user interface with Lucide icons and responsive mobile-first views.'
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bharat-violet/20 border border-bharat-violet/40 text-bharat-violet text-xs font-semibold">
          System Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Modern Multi-Agent AI Architecture
        </h1>
        <p className="text-base sm:text-lg text-slate-300">
          A robust, secure 3-tier architecture separating the Presentation Layer, Gateway Layer, and Python AI Engine.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-navy-900 border border-slate-800 p-8 sm:p-12 rounded-3xl mb-16">
        <h3 className="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
          <Network className="w-5 h-5 text-amber-400" />
          <span>End-to-End Execution Flow</span>
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          
          <div className="bg-navy-800 border border-slate-700 p-4 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-amber-400 font-bold mb-1">Tier 1</div>
            <div className="font-bold text-white text-sm">React Frontend</div>
            <div className="text-[11px] text-slate-400 mt-1">Web Speech Voice In/Out</div>
          </div>

          <div className="text-slate-500 font-bold text-xl rotate-90 md:rotate-0">→</div>

          <div className="bg-navy-800 border border-slate-700 p-4 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-orange-400 font-bold mb-1">Tier 2</div>
            <div className="font-bold text-white text-sm">Spring Boot Gateway</div>
            <div className="text-[11px] text-slate-400 mt-1">Validation & Security</div>
          </div>

          <div className="text-slate-500 font-bold text-xl rotate-90 md:rotate-0">→</div>

          <div className="bg-navy-800 border border-slate-700 p-4 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-bharat-violet font-bold mb-1">Tier 3</div>
            <div className="font-bold text-white text-sm">FastAPI Multi-Agent</div>
            <div className="text-[11px] text-slate-400 mt-1">7 Autonomous Agents</div>
          </div>

          <div className="text-slate-500 font-bold text-xl rotate-90 md:rotate-0">→</div>

          <div className="bg-navy-800 border border-emerald-500/40 p-4 rounded-2xl w-full md:w-1/4">
            <div className="text-xs text-emerald-400 font-bold mb-1">Tier 4</div>
            <div className="font-bold text-white text-sm">OpenRouter Free LLM</div>
            <div className="text-[11px] text-slate-400 mt-1">+ ChromaDB RAG Citations</div>
          </div>

        </div>
      </div>

      {/* Tech Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {stack.map((item, idx) => (
          <div key={idx} className="bg-navy-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-2">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{item.category}</div>
            <div className="font-bold text-white text-base">{item.tech}</div>
            <div className="text-xs text-slate-300 leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-bharat-orange to-amber-500 text-navy-900 font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition"
        >
          <span>See Technology in Action</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
