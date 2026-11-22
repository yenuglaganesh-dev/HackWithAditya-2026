import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Sparkles, ShieldCheck, Database, Cpu, Languages,
  Headphones, Bot, CheckCircle2, ArrowRight, Layers,
  Terminal, Server, FileText, Check, Award
} from 'lucide-react';

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Header Hero */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('portfolio.badge', 'Technical Showcase')} • HackWithAditya 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {t('portfolio.title', 'BhashaBridge AI Engineering Portfolio')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          {t('portfolio.subtitle', 'Comprehensive architecture, research methodology, and production implementation for HackWithAditya 2026.')}
        </p>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
          <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">7 Agents</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Autonomous Pipeline</div>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-700">3 Languages</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Telugu, Hindi, English</div>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800">ChromaDB RAG</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Offline Vector Store</div>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-soft">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">₹0 / Zero Cost</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Free-First Architecture</div>
          </div>
        </div>
      </div>

      {/* 2 & 3. Problem Statement & Real-World Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-emerald-100 p-8 rounded-3xl space-y-4 shadow-soft">
          <h2 className="text-xl font-bold text-slate-900">
            {t('portfolio.sections.problem', '2. Problem Statement')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.problemContent', 'Over 800 million citizens in India rely predominantly on regional languages. Most digital government portals and critical public information repositories are written in dense bureaucratic English or formal text, creating severe hurdles for rural populations, elderly citizens, and individuals who are not text-literate.')}
          </p>
        </div>

        <div className="bg-white border border-emerald-100 p-8 rounded-3xl space-y-4 shadow-soft">
          <h2 className="text-xl font-bold text-slate-900">
            {t('portfolio.sections.realWorld', '3. Real-World Challenges')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.realWorldContent', 'Citizens often lose vital welfare assistance due to complex application jargon, lack of awareness, or predatory intermediaries. Existing proprietary voice AI solutions require costly cloud API tokens, high bandwidth, and suffer from high hallucination rates when reciting welfare eligibility rules.')}
          </p>
        </div>
      </div>

      {/* 4 & 5. Proposed Solution & Objectives */}
      <div className="bg-white border border-emerald-100 p-8 sm:p-10 rounded-3xl space-y-6 shadow-soft">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {t('portfolio.sections.solution', '4. Proposed Solution & Architecture')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.solutionContent', 'A full-stack, voice-native web ecosystem powered by a 7-agent architecture, local ChromaDB vector retrieval, client-native Web Speech API, and verified OpenRouter Free-tier LLMs with zero paid dependencies.')}
          </p>
        </div>

        <div className="border-t border-emerald-100 pt-6">
          <h3 className="text-lg font-bold text-emerald-950 mb-4">
            {t('portfolio.sections.objectives', '5. Core Project Objectives')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('portfolio.sections.obj1', 'Zero-Cost Access: Deliver end-to-end voice and text intelligence using client-native Web Speech API and open-source RAG.')}</span>
            </div>
            <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('portfolio.sections.obj2', 'Dialect Understanding: Accurately process code-mixed queries (Tenglish and Hinglish).')}</span>
            </div>
            <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('portfolio.sections.obj3', 'Anti-Hallucination: Ground responses in verified institutional government documents (*.gov.in).')}</span>
            </div>
            <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('portfolio.sections.obj4', 'Bi-Directional Voice: Deliver voice question input and native speech read-aloud output on any modern browser.')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Key Features Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          {t('portfolio.sections.features', '6. Key Implemented Features')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: t('portfolio.sections.f1', 'Browser-Native Voice In & Out: Zero-latency Web Speech recognition and SpeechSynthesis TTS.'), icon: Headphones, color: 'text-emerald-700' },
            { title: t('portfolio.sections.f2', 'Strictly Free-First Architecture: Validated OpenRouter Free LLM router with zero credit requirement.'), icon: Cpu, color: 'text-teal-700' },
            { title: t('portfolio.sections.f3', 'RAG with Scheme Citations: Real-time vector search across PM-Kisan, Ayushman Bharat, PMAY, and Rythu Bharosa.'), icon: Database, color: 'text-emerald-800' },
            { title: t('portfolio.sections.f4', 'Multi-Turn Session Memory: Preserves conversational context across follow-up queries.'), icon: Bot, color: 'text-emerald-600' },
            { title: t('portfolio.sections.f5', 'High-Contrast Emerald UI: Clean readable responsive interface with zero visual blur.'), icon: Layers, color: 'text-teal-600' },
            { title: 'Code-Mixed NLU: Automatic Latin-script dialect decoding for seamless Tenglish & Hinglish recognition.', icon: Languages, color: 'text-emerald-700' }
          ].map((feat, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-soft hover:shadow-elevated transition-all space-y-3">
              <feat.icon className={`w-7 h-7 ${feat.color}`} />
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {feat.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 7 & 8. AI Agent Architecture & Workflow */}
      <div className="bg-white border border-emerald-100 p-8 sm:p-12 rounded-3xl space-y-8 shadow-soft">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {t('portfolio.sections.architecture', '7. AI Agent Architecture & Pipeline')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.agentArchDesc', 'Each user turn is coordinated through an asynchronous pipeline of 7 specialized single-responsibility agents:')}
          </p>
        </div>

        {/* 7 Agents Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Orchestrator Agent", desc: "Coordinates session lifecycle, parses user intent, routes pipeline branches.", role: "CORE" },
            { name: "Language Agent", desc: "Analyzes Unicode codepoints (Telugu, Devanagari) and transliterated code-mixing.", role: "LANG" },
            { name: "Knowledge Agent", desc: "Executes offline vector similarity matching in persistent ChromaDB collections.", role: "RAG" },
            { name: "Research Agent", desc: "Grounds facts against official government welfare sources and portals.", role: "GOV" },
            { name: "Response Agent", desc: "Generates clear, citizen-focused explanations with zero robotic jargon.", role: "LLM" },
            { name: "Verification Agent", desc: "Prevents hallucinations by validating numbers against retrieved citations.", role: "AUDIT" },
            { name: "Voice Agent", desc: "Bridges Web Speech STT and SpeechSynthesis TTS with text fallbacks.", role: "VOICE" },
          ].map((agent, i) => (
            <div key={i} className="p-4.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{agent.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">{agent.role}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{agent.desc}</p>
            </div>
          ))}
        </div>

        {/* Multi-Agent Sequence */}
        <div className="border-t border-emerald-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {t('portfolio.sections.multiAgentWorkflow', '8. Multi-Agent Workflow Sequence')}
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">{t('portfolio.sections.step1', '1. Voice/Text Ingest: Citizen query is captured via Web Speech API or chat input.')}</div>
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">{t('portfolio.sections.step2', '2. Language & Dialect Analysis: Language Agent parses Unicode codepoints and phonetic patterns to identify script and code-mixing.')}</div>
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">{t('portfolio.sections.step3', '3. Semantic Vector Search: Knowledge Agent hashes query and retrieves top scheme chunks from ChromaDB.')}</div>
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">{t('portfolio.sections.step4', '4. Domain Research: Research Agent validates retrieved context against trusted government knowledge bases.')}</div>
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">{t('portfolio.sections.step5', '5. Grounded Generation: Response Agent synthesizes concise, culturally resonant explanation.')}</div>
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">{t('portfolio.sections.step6', '6. Verification Audit: Verification Agent cross-checks numeric benefits against citations.')}</div>
            <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">{t('portfolio.sections.step7', '7. Speech Synthesis: Voice Agent streams synthesized speech back to the citizen.')}</div>
          </div>
        </div>
      </div>

      {/* 9 & 10. RAG Knowledge & Voice Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-emerald-100 space-y-3 shadow-soft">
          <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <span>{t('portfolio.sections.ragRetrieval', '9. RAG Knowledge Retrieval System')}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.ragDesc', 'The knowledge base is powered by ChromaDB with deterministic offline hashing embeddings. Schemas covered include PM-Kisan Samman Nidhi, Ayushman Bharat PM-JAY, Pradhan Mantri Awas Yojana, Rythu Bharosa, and DigiLocker guidelines.')}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-emerald-100 space-y-3 shadow-soft">
          <h3 className="text-xl font-bold text-teal-800 flex items-center gap-2">
            <Headphones className="w-5 h-5 text-teal-600" />
            <span>{t('portfolio.sections.voiceAiArch', '10. Voice AI Architecture')}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.voiceDesc', 'Voice interactions leverage client-side Web Speech API (webkitSpeechRecognition) and window.speechSynthesis. Speech recognition dynamically adjusts its language tag based on the active selection (te-IN, hi-IN, en-IN) with automatic fallback.')}
          </p>
        </div>
      </div>

      {/* 11 & 12. Tech Stack & APIs */}
      <div className="bg-white border border-emerald-100 p-8 sm:p-10 rounded-3xl space-y-6 shadow-soft">
        <h3 className="text-2xl font-bold text-slate-900">
          {t('portfolio.sections.techStack', '11. Implemented Technology Stack')}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="font-bold text-emerald-800 mb-1">Frontend</div>
            <div className="text-slate-700">{t('portfolio.sections.stackFrontend', 'React 18, Vite, Tailwind CSS, Lucide React, react-i18next')}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="font-bold text-teal-800 mb-1">Backend Gateway</div>
            <div className="text-slate-700">{t('portfolio.sections.stackGateway', 'Java 17, Spring Boot 3.2, Reactive WebClient')}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="font-bold text-emerald-900 mb-1">AI Engine</div>
            <div className="text-slate-700">{t('portfolio.sections.stackAiEngine', 'Python 3.11, FastAPI, Uvicorn, Asyncio')}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="font-bold text-teal-900 mb-1">Vector Database</div>
            <div className="text-slate-700">{t('portfolio.sections.stackVector', 'ChromaDB with offline hashing embeddings')}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="font-bold text-emerald-800 mb-1">LLM Router</div>
            <div className="text-slate-700">{t('portfolio.sections.stackLlm', 'OpenRouter Free Models (meta-llama/llama-3.3-70b-instruct:free)')}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="font-bold text-teal-800 mb-1">Voice Layer</div>
            <div className="text-slate-700">Native Web Speech API (Free STT & TTS)</div>
          </div>
        </div>

        <div className="border-t border-emerald-100 pt-6">
          <h4 className="text-lg font-bold text-slate-900 mb-2">
            {t('portfolio.sections.apiIntegrations', '12. API Integrations & Contracts')}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.apiDesc', 'The frontend communicates directly with FastAPI on port 8000 (or via Spring Boot Gateway on port 8080) through standardized endpoints: POST /api/chat, GET /health, and POST /api/voice/synthesize.')}
          </p>
        </div>
      </div>

      {/* 13, 14, 15. Multilingual, Security, Testing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-emerald-100 space-y-2 shadow-soft">
          <h4 className="font-bold text-base text-slate-900">
            {t('portfolio.sections.languageSupport', '13. Multilingual Support')}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.langDesc', 'Complete system-wide localization across English, Telugu (తెలుగు), and Hindi (हिन्दी) covering navigation, hero content, console, assistant dialogs, agent specs, and technical documentation.')}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-emerald-100 space-y-2 shadow-soft">
          <h4 className="font-bold text-base text-slate-900">
            {t('portfolio.sections.security', '14. Security and Privacy')}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.secDesc', 'Zero client-side API key leakage. All LLM calls and vector queries occur inside the isolated backend environment. Strict CORS whitelisting and session tokenization.')}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-emerald-100 space-y-2 shadow-soft">
          <h4 className="font-bold text-base text-slate-900">
            {t('portfolio.sections.testing', '15. Testing and Validation')}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {t('portfolio.sections.testDesc', 'Automated pytest suite for language detection, code-mixing parsing, and agent orchestration. Automated Vite production build verification and continuous regression testing.')}
          </p>
        </div>
      </div>

      {/* 16 & 17. Future Scope & Hackathon Info */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <h4 className="text-xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>{t('portfolio.sections.hackathonInfo', '17. Hackathon Information')}</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
            {t('portfolio.sections.hackathonDesc', 'Developed for HackWithAditya 2026 under the "AI for Bharat" track, demonstrating an accessible, production-ready, free-first sovereign AI platform.')}
          </p>
        </div>

        <Link
          to="/assistant"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition-all text-xs sm:text-sm shrink-0"
        >
          {t('nav.tryAssistant', 'Try AI Assistant')}
        </Link>
      </div>

    </div>
  );
}
