import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

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
      <div className="rounded-3xl mosaic-glass p-6 sm:p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-sky-400">hub</span>
            <div>
              <h2 className="text-base sm:text-lg font-headline font-bold text-white">
                {t('agentsSection.title', '7-Agent Autonomous Multi-Agent AI System')}
              </h2>
              <span className="text-xs text-sky-300 font-mono">
                {t('agentsSection.subtitle', 'BhashaBridge Modular Engine')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20">
              🟢 {t('agentsSection.badge', 'Active Architecture')}
            </span>
            <Link
              to="/technology"
              className="text-xs font-bold text-sky-400 hover:text-sky-200 flex items-center gap-1 hover:underline ml-2"
            >
              <span>{t('agentsSection.viewDetails', 'Explore Technology & Agents')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 7 Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/30 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="material-symbols-outlined text-[24px] text-sky-300 group-hover:scale-110 transition-transform">
                    {agent.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                    {agent.role}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  {agent.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Autonomous Node</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
