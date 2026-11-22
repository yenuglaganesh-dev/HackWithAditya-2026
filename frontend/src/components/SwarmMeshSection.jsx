import React from 'react';
import { Network, Bot, ShieldCheck, Database, Headphones, Languages, Search, Sparkles } from 'lucide-react';

export default function SwarmMeshSection() {
  const agents = [
    { name: "Orchestrator Agent", desc: "Intent Routing & Multi-Agent Flow", role: "CORE", icon: "account_tree" },
    { name: "Language Agent", desc: "Telugu, Hindi & Code-Mixing (Tenglish/Hinglish)", role: "LANG", icon: "translate" },
    { name: "Knowledge Agent", desc: "Semantic ChromaDB RAG Retrieval", role: "RAG", icon: "library_books" },
    { name: "Research Agent", desc: "Verified Public *.gov.in Sources", role: "GOV", icon: "travel_explore" },
    { name: "Response Agent", desc: "Citizen-Centric Multilingual Generation", role: "LLM", icon: "chat" },
    { name: "Verification Agent", desc: "Anti-Hallucination & Fact Audit", role: "AUDIT", icon: "verified" },
    { name: "Voice Agent", desc: "Speech-to-Text & Speech-Synthesis", role: "VOICE", icon: "mic" },
  ];

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 py-8 mx-auto" id="agents-mesh-section">
      <div className="rounded-3xl bg-white border border-emerald-100 shadow-soft p-6 sm:p-7 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-emerald-100">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-emerald-600">hub</span>
            <div>
              <h2 className="text-sm sm:text-base font-headline font-bold text-slate-900">
                7-Agent Autonomous Multi-Agent AI System
              </h2>
              <span className="text-[11px] text-emerald-700 font-mono">BhashaBridge Modular Engine</span>
            </div>
          </div>

          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            🟢 Active Architecture
          </span>
        </div>

        {/* Master Node */}
        <div className="relative z-10 flex justify-center my-6">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border-2 border-emerald-500 shadow-glow-emerald max-w-sm w-full">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-xs sm:text-sm text-slate-900 truncate">Orchestrator Agent</span>
                <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">CORE</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono block truncate">OpenRouter Free LLM Coordinator</span>
            </div>
          </div>
        </div>

        {/* 6 Sub-Agent Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
          {agents.slice(1).map((agent, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 shadow-xs flex items-center gap-3 hover:bg-emerald-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">{agent.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="block text-xs font-bold text-slate-900 truncate">{agent.name}</span>
                  <span className="text-[9px] font-mono text-emerald-700 font-semibold">{agent.role}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono truncate block">{agent.desc}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
