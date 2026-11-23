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
      <div className="rounded-3xl bg-white border border-[#E8EAED] p-6 sm:p-8 relative shadow-card">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E8EAED]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px] text-[#F58220]">hub</span>
            <div>
              <h2 className="text-base sm:text-lg font-headline font-bold text-[#202124]">
                {t('agentsSection.title', '7-Agent Autonomous Multi-Agent AI System')}
              </h2>
              <span className="text-xs text-[#E96B16] font-mono font-bold">
                {t('agentsSection.subtitle', 'BhashaBridge Modular Engine')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FFF3E8] text-[#E96B16] border border-[#FBD3B6]">
              🟢 {t('agentsSection.badge', 'Active Architecture')}
            </span>
            <Link
              to="/how-it-works"
              className="text-xs font-bold text-[#F58220] hover:text-[#E96B16] flex items-center gap-1 hover:underline ml-2"
            >
              <span>{t('agentsSection.viewDetails', 'Explore Architecture')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Mesh Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {agents.map((a, i) => (
            <div
              key={i}
              className="bg-[#F8F9FA] border border-[#E8EAED] hover:border-[#FBD3B6] hover:bg-white p-5 rounded-2xl transition shadow-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E8EAED] group-hover:bg-[#FFF3E8] group-hover:border-[#FBD3B6] flex items-center justify-center text-[#F58220] transition">
                    <span className="material-symbols-outlined text-[20px]">{a.icon}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#707070] border border-[#E8EAED]">
                    {a.role}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#202124] mb-1 group-hover:text-[#F58220] transition">
                  {a.name}
                </h3>
                <p className="text-xs text-[#707070] leading-relaxed">
                  {a.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#E8EAED] flex items-center justify-between text-[11px] text-[#707070]">
                <span>Autonomous Node</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
