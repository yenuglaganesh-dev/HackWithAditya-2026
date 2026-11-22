import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SwarmMeshSection() {
  const { t } = useTranslation();

  const agents = [
    { name: t('agentsSection.orchestratorTitle', 'Orchestrator Agent'), desc: t('agentsSection.orchestratorDesc', 'OpenRouter Free LLM Coordinator & Intent Routing'), role: "CORE", icon: "account_tree" },
    { name: t('agentsSection.languageAgent', 'Language Agent'), desc: t('agentsSection.languageDesc', 'Telugu, Hindi & Code-Mixing (Tenglish/Hinglish)'), role: "LANG", icon: "translate" },
    { name: t('agentsSection.knowledgeAgent', 'Knowledge Agent'), desc: t('agentsSection.knowledgeDesc', 'Semantic ChromaDB RAG Retrieval'), role: "RAG", icon: "library_books" },
    { name: t('agentsSection.researchAgent', 'Research Agent'), desc: t('agentsSection.researchDesc', 'Verified Public *.gov.in Sources'), role: "GOV", icon: "travel_explore" },
    { name: t('agentsSection.responseAgent', 'Response Agent'), desc: t('agentsSection.responseDesc', 'Citizen-Centric Multilingual Generation'), role: "LLM", icon: "chat" },
    { name: t('agentsSection.verificationAgent', 'Verification Agent'), desc: t('agentsSection.verificationDesc', 'Anti-Hallucination & Fact Audit'), role: "AUDIT", icon: "verified" },
    { name: t('agentsSection.voiceAgent', 'Voice Agent'), desc: t('agentsSection.voiceDesc', 'Speech-to-Text & Speech-Synthesis'), role: "VOICE", icon: "mic" },
  ];

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mx-auto" id="agents-mesh-section">
      <div className="rounded-3xl bg-white border border-emerald-100 shadow-soft p-6 sm:p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-emerald-600">hub</span>
            <div>
              <h2 className="text-base sm:text-lg font-headline font-bold text-slate-900">
                {t('agentsSection.title', '7-Agent Autonomous Multi-Agent AI System')}
              </h2>
              <span className="text-xs text-emerald-700 font-mono">
                {t('agentsSection.subtitle', 'BhashaBridge Modular Engine')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              🟢 {t('agentsSection.badge', 'Active Architecture')}
            </span>
            <Link
              to="/technology"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline ml-2"
            >
              <span>{t('agentsSection.viewDetails', 'Explore Technology & Agents')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Master Orchestrator Node */}
        <div className="relative z-10 flex justify-center my-6">
          <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white border-2 border-emerald-500 shadow-glow-emerald max-w-md w-full">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">account_tree</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-sm sm:text-base text-slate-900 truncate">
                  {agents[0].name}
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">CORE</span>
              </div>
              <span className="text-xs text-slate-500 font-mono block truncate">
                {agents[0].desc}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Sub-Agent Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {agents.slice(1).map((agent, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 shadow-xs flex items-center gap-3.5 hover:bg-emerald-50 hover:border-emerald-200 transition-all">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">{agent.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-xs sm:text-sm text-slate-900 truncate">{agent.name}</span>
                  <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">{agent.role}</span>
                </div>
                <span className="text-[11px] text-slate-500 block truncate font-medium">{agent.desc}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
