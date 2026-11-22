import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Network, Bot, ShieldCheck, Database, Headphones,
  Languages, Search, ArrowRight, CheckCircle2
} from 'lucide-react';

export default function AgentsPage() {
  const { t } = useTranslation();

  const agents = [
    {
      name: t('agentsSection.orchestratorTitle', 'Orchestrator Agent'),
      desc: t('agentsSection.orchestratorDesc', 'OpenRouter Free LLM Coordinator & Intent Routing'),
      role: "CORE",
      icon: Network,
      color: "text-emerald-700",
      duties: [
        "Session lifecycle management and multi-turn state retention",
        "Deterministic classification of greetings, fast-path queries, and RAG paths",
        "Orchestration of concurrent sub-agent calls and pipeline consolidation"
      ]
    },
    {
      name: t('agentsSection.languageAgent', 'Language Agent'),
      desc: t('agentsSection.languageDesc', 'Telugu, Hindi & Code-Mixing (Tenglish/Hinglish)'),
      role: "LANG",
      icon: Languages,
      color: "text-teal-700",
      duties: [
        "Unicode block inspection for Telugu (\\u0C00-\\u0C7F) and Devanagari (\\u0900-\\u097F)",
        "Transliterated Latin-script dialect decoding (Tenglish & Hinglish phonetic rules)",
        "Automatic language tag injection (te-IN, hi-IN, en-IN) for the Voice Agent"
      ]
    },
    {
      name: t('agentsSection.knowledgeAgent', 'Knowledge Agent'),
      desc: t('agentsSection.knowledgeDesc', 'Semantic ChromaDB RAG Retrieval'),
      role: "RAG",
      icon: Database,
      color: "text-emerald-800",
      duties: [
        "Local vector database query execution across seeded welfare scheme collections",
        "Deterministic offline hashing embeddings for 100% free semantic retrieval",
        "Chunk ranking and extraction of official scheme eligibility criteria"
      ]
    },
    {
      name: t('agentsSection.researchAgent', 'Research Agent'),
      desc: t('agentsSection.researchDesc', 'Verified Public *.gov.in Sources'),
      role: "GOV",
      icon: Search,
      color: "text-teal-800",
      duties: [
        "Validation against verified official government portals (pmkisan.gov.in, nha.gov.in)",
        "Verification of application procedures, helpline numbers, and renewal dates",
        "Suppression of ungrounded external claims"
      ]
    },
    {
      name: t('agentsSection.responseAgent', 'Response Agent'),
      desc: t('agentsSection.responseDesc', 'Citizen-Centric Multilingual Generation'),
      role: "LLM",
      icon: Bot,
      color: "text-emerald-600",
      duties: [
        "Synthesis of empathetic, citizen-friendly explanations in mother tongue",
        "Strict adherence to retrieved facts with zero robotic hallucinations",
        "Formatting for optimal spoken playback by the client speech synthesizer"
      ]
    },
    {
      name: t('agentsSection.verificationAgent', 'Verification Agent'),
      desc: t('agentsSection.verificationDesc', 'Anti-Hallucination & Fact Audit'),
      role: "AUDIT",
      icon: ShieldCheck,
      color: "text-teal-600",
      duties: [
        "Post-generation audit verifying that every claimed financial benefit matches sources",
        "Attribution of verified checkmark badges and reference source links",
        "Safety guardrails preventing misinformation on critical subsidies"
      ]
    },
    {
      name: t('agentsSection.voiceAgent', 'Voice Agent'),
      desc: t('agentsSection.voiceDesc', 'Speech-to-Text & Speech-Synthesis'),
      role: "VOICE",
      icon: Headphones,
      color: "text-emerald-700",
      duties: [
        "Browser-native Web Speech API speech-to-text integration with regional dialect tags",
        "Client-side SpeechSynthesis TTS audio orchestration with Listen Aloud controls",
        "Graceful fallback to keyboard typing on legacy devices without mic permissions"
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          {t('agentsSection.badge', 'Active Architecture')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {t('agentsSection.title', '7-Agent Autonomous Multi-Agent AI System')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A modular, single-responsibility multi-agent architecture where specialized agents collaborate to provide verified, natural-language assistance to Indian citizens.
        </p>
      </div>

      {/* Agents Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent, i) => (
          <div key={i} className="p-7 rounded-3xl bg-white border border-emerald-100 shadow-soft hover:shadow-elevated transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <agent.icon className={`w-5 h-5 ${agent.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{agent.desc}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {agent.role}
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-emerald-50">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">Key Responsibilities:</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {agent.duties.map((duty, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Try in Playground Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-slate-900">See the 7 Agents in Action</h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Ask any question in Telugu, Hindi or English and watch the agent traces live.
          </p>
        </div>
        <Link
          to="/assistant"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition shrink-0"
        >
          <Bot className="w-4 h-4" />
          <span>Launch AI Assistant</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
