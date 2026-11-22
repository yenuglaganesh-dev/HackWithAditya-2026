import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic, Bot, Sparkles, ArrowRight, ShieldCheck, Database,
  Cpu, Languages, Headphones, CheckCircle2, ChevronRight, Activity
} from 'lucide-react';

export default function Home() {
  const [activeVoiceDemo, setActiveVoiceDemo] = useState('te');

  const voiceDemos = {
    te: {
      lang: 'Telugu (తెలుగు)',
      script: 'రైతు భరోసా మరియు పీఎం కిసాన్ పథకంలో రైతులకు ఎకరాకు ఎంత సాయం అందుతుంది?',
      englishTranslation: 'How much financial assistance is provided per acre under Rythu Bharosa & PM Kisan?',
      answer: 'పీఎం కిసాన్ ద్వారా సంవత్సరానికి ₹6,000 మరియు రైతు భరోసా ద్వారా పంట పెట్టుబడి సాయంగా అర్హులైన రైతులకు ₹13,500 వరకు నేరుగా బ్యాంక్ ఖాతాలో జమ చేయబడుతుంది.'
    },
    hi: {
      lang: 'Hindi (हिन्दी)',
      script: 'आयुष्मान भारत योजना के तहत प्रति परिवार कितना स्वास्थ्य बीमा कवर मिलता है?',
      englishTranslation: 'How much health coverage is provided per family under Ayushman Bharat?',
      answer: 'आयुष्मान भारत (PM-JAY) योजना के तहत प्रत्येक पात्र परिवार को प्रति वर्ष ₹5 लाख तक का कैशलेस और मुफ्त इलाज सरकारी व संबद्ध निजी अस्पतालों में मिलता है।'
    },
    en: {
      lang: 'English (Indian)',
      script: 'What official identity documents are supported for DigiLocker wallet storage?',
      englishTranslation: 'Supported identity documents in DigiLocker',
      answer: 'DigiLocker legally supports Aadhaar card, Driving Licence, Vehicle RC, PAN card, and academic marksheets verified directly from government issuing authorities.'
    }
  };

  return (
    <div className="pt-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        
        {/* Soft Ambient Emerald Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-400/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-900">
                National Hackathon 2026 – AI for Bharat
              </span>
              <span className="text-emerald-300">•</span>
              <span className="text-xs text-emerald-800 font-medium">Free-First Voice AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Your Language.{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Your Voice.
              </span>{' '}
              <br className="hidden sm:inline" />
              Your AI.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Experience the next generation of voice-first artificial intelligence built for every Indian citizen. Speak naturally in{' '}
              <span className="text-emerald-700 font-bold">Telugu</span>,{' '}
              <span className="text-teal-700 font-bold">Hindi</span>, and{' '}
              <span className="text-slate-900 font-bold">English</span> with zero language barriers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/assistant"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-md shadow-emerald-600/20 hover:scale-105 transition cursor-pointer"
              >
                <Mic className="w-5 h-5" />
                <span>Launch Voice Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/portfolio"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-800 font-semibold text-sm px-6 py-4 rounded-xl border border-emerald-200 transition shadow-xs"
              >
                <span>Explore Technical Portfolio</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE VOICE ACCENT DEMO */}
      <section className="py-16 border-y border-emerald-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
              Multilingual Vernacular Audio
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Interactive Regional Language Showcase
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Click a language tab to see how BhashaBridge understands complex citizen inquiries.
            </p>
          </div>

          {/* Language Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {Object.keys(voiceDemos).map((langKey) => (
              <button
                key={langKey}
                onClick={() => setActiveVoiceDemo(langKey)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeVoiceDemo === langKey
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                {voiceDemos[langKey].lang}
              </button>
            ))}
          </div>

          {/* Demo Card */}
          <div className="bg-[#f5faf7] border border-emerald-200/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
              <span className="text-xs font-bold text-emerald-800">
                Spoken Query in {voiceDemos[activeVoiceDemo].lang}
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Native STT Ingest
              </span>
            </div>

            <div className="text-base sm:text-lg font-semibold text-slate-900">
              "{voiceDemos[activeVoiceDemo].script}"
            </div>

            <div className="text-xs text-slate-500 italic">
              Meaning: {voiceDemos[activeVoiceDemo].englishTranslation}
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified RAG Answer (OpenRouter Free Tier + ChromaDB):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {voiceDemos[activeVoiceDemo].answer}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="py-20 bg-emerald-50/50 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-emerald-800 tracking-widest uppercase">
              The Digital Divide in India
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Breaking Language Barriers with Multi-Agent AI
            </h3>
            <p className="text-slate-600 text-base">
              Over 800 million citizens in Bharat face digital friction because public portals and modern AI models are heavily English-centric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Problem */}
            <div className="bg-white border border-rose-200/80 p-8 rounded-3xl relative overflow-hidden group hover:border-rose-400 transition shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">The Problem for Everyday Citizens</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Complex English Portals:</strong> Critical welfare schemes (PMAY, Ayushman, PM-Kisan) are buried in bureaucratic documents.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Regional Dialect Exclusion:</strong> Millions speak mixed Telugu (Tenglish) or Hindi (Hinglish) that standard voice systems fail to transcribe.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>AI Hallucination Risk:</strong> Off-the-shelf chatbots frequently invent welfare eligibility criteria and subsidies.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-white border border-emerald-200/80 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-400 transition shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">The BhashaBridge AI Solution</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Native Voice In & Out:</strong> Speak directly via browser Web Speech API in Telugu, Hindi, or English without expensive speech APIs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>7-Agent RAG Orchestration:</strong> Verified against institutional government documents stored inside ChromaDB.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Free-First Architecture:</strong> Zero paid GPU or credits needed. Runs on verified OpenRouter Free models.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* FOUR-STEP WORKFLOW TIMELINE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
              How BhashaBridge Works
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              A Transparent, 4-Step Autonomous Flow
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Speak or Type', desc: 'Citizen asks a question naturally in Telugu, Hindi, or English using voice or text.', icon: Mic, color: 'text-emerald-600' },
              { step: '02', title: 'Understand', desc: 'Language Agent detects native scripts & code-mixed dialects with zero translation delay.', icon: Languages, color: 'text-teal-600' },
              { step: '03', title: 'Retrieve & Verify', desc: 'Knowledge & Research agents query ChromaDB vector store and official *.gov.in portals.', icon: Database, color: 'text-emerald-700' },
              { step: '04', title: 'Speak Aloud', desc: 'Response Agent answers with step-by-step clarity, read aloud natively in the citizen’s tongue.', icon: Headphones, color: 'text-teal-700' }
            ].map((s, idx) => (
              <div key={idx} className="bg-white border border-emerald-100 p-6 rounded-3xl shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <div className="text-3xl font-black text-emerald-200 mb-3">{s.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 border border-emerald-200">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Banner */}
          <div className="mt-16 bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-emerald-500/10 border border-emerald-300 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">Ready to experience conversational AI for Bharat?</h4>
              <p className="text-sm text-slate-600">Try our live assistant right in your browser with zero configuration.</p>
            </div>
            <Link
              to="/assistant"
              className="bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md hover:bg-emerald-700 hover:scale-105 transition"
            >
              Launch AI Assistant
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
