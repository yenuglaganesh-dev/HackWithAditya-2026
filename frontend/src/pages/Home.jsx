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
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950">
        
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-bharat-orange/10 to-bharat-violet/15 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-bharat-violet/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-800/80 border border-slate-700/80 shadow-lg backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-semibold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                National Hackathon 2026 – AI for Bharat
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300 font-medium">Free-First Voice AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Your Language.{' '}
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-bharat-orange bg-clip-text text-transparent">
                Your Voice.
              </span>{' '}
              <br className="hidden sm:inline" />
              Your AI.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Experience the next generation of voice-first artificial intelligence built for every Indian citizen. Speak naturally in{' '}
              <span className="text-amber-300 font-semibold">Telugu</span>,{' '}
              <span className="text-orange-400 font-semibold">Hindi</span>, and{' '}
              <span className="text-slate-100 font-semibold">English</span> with zero language barriers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/assistant"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-bharat-orange via-amber-500 to-amber-600 hover:from-amber-500 hover:to-bharat-orange text-navy-900 font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Mic className="w-5 h-5 text-navy-900" />
                <span>Try Voice AI Assistant</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/features"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-navy-800/80 hover:bg-navy-700/80 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold text-base px-7 py-4 rounded-2xl backdrop-blur-md transition shadow-md"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Multilingual Voice Interactive Showcase */}
            <div className="pt-10 max-w-3xl mx-auto">
              <div className="bg-navy-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative text-left">
                
                {/* Language tab switcher */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-5">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">
                      Live Voice Demonstration
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-navy-900 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setActiveVoiceDemo('te')}
                      className={`text-xs px-3 py-1 rounded-lg font-semibold transition ${
                        activeVoiceDemo === 'te' ? 'bg-amber-500 text-navy-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      తెలుగు
                    </button>
                    <button
                      onClick={() => setActiveVoiceDemo('hi')}
                      className={`text-xs px-3 py-1 rounded-lg font-semibold transition ${
                        activeVoiceDemo === 'hi' ? 'bg-amber-500 text-navy-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      हिन्दी
                    </button>
                    <button
                      onClick={() => setActiveVoiceDemo('en')}
                      className={`text-xs px-3 py-1 rounded-lg font-semibold transition ${
                        activeVoiceDemo === 'en' ? 'bg-amber-500 text-navy-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Animated Speech Waveform simulation */}
                <div className="flex items-center gap-4 bg-navy-900/90 border border-slate-700/70 p-4 rounded-2xl mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Mic className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-amber-400 font-semibold tracking-wide">
                      Citizen Voice Query ({voiceDemos[activeVoiceDemo].lang}):
                    </div>
                    <div className="text-sm sm:text-base font-medium text-white truncate sm:whitespace-normal">
                      "{voiceDemos[activeVoiceDemo].script}"
                    </div>
                    <div className="text-xs text-slate-400 italic mt-0.5">
                      Meaning: {voiceDemos[activeVoiceDemo].englishTranslation}
                    </div>
                  </div>
                </div>

                {/* AI Assistant Simulated Response */}
                <div className="bg-navy-950/80 border border-emerald-500/30 p-4 rounded-2xl relative">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Verified Response with RAG Attribution
                    </span>
                    <span className="text-[11px] bg-navy-900 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
                      Zero Hallucination
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {voiceDemos[activeVoiceDemo].answer}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="py-20 bg-navy-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              The Digital Divide in India
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Breaking Language Barriers with Multi-Agent AI
            </h3>
            <p className="text-slate-400 text-base">
              Over 800 million citizens in Bharat face digital friction because public portals and modern AI models are heavily English-centric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* The Problem */}
            <div className="bg-navy-900/60 border border-rose-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-rose-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">The Problem for Everyday Citizens</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Complex English Portals:</strong> Critical welfare schemes (PMAY, Ayushman, PM-Kisan) are buried in bureaucratic documents.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Regional Dialect Exclusion:</strong> Millions speak mixed Telugu (Tenglish) or Hindi (Hinglish) that standard voice systems fail to transcribe.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>AI Hallucination Risk:</strong> Off-the-shelf chatbots frequently invent welfare eligibility criteria and subsidies.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-navy-900/60 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">The BhashaBridge AI Solution</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Native Voice In & Out:</strong> Speak directly via browser Web Speech API in Telugu, Hindi, or English without expensive speech APIs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>7-Agent RAG Orchestration:</strong> Verified against institutional government documents stored inside ChromaDB.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Free-First Architecture:</strong> Zero paid GPU or credits needed. Runs on verified OpenRouter Free models.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* FOUR-STEP WORKFLOW TIMELINE */}
      <section className="py-20 bg-navy-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              How BhashaBridge Works
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              A Transparent, 4-Step Autonomous Flow
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {[
              {
                step: '01',
                title: 'Speak or Type',
                desc: 'Citizen asks a question naturally in Telugu, Hindi, or English using voice or text.',
                icon: Mic,
                color: 'text-amber-400'
              },
              {
                step: '02',
                title: 'Understand',
                desc: 'Language Agent detects native scripts & code-mixed dialects with zero translation delay.',
                icon: Languages,
                color: 'text-orange-400'
              },
              {
                step: '03',
                title: 'Retrieve & Verify',
                desc: 'Knowledge & Research agents query ChromaDB vector store and official *.gov.in portals.',
                icon: Database,
                color: 'text-bharat-violet'
              },
              {
                step: '04',
                title: 'Speak Aloud',
                desc: 'Response Agent answers with step-by-step clarity, read aloud natively in the citizen’s tongue.',
                icon: Headphones,
                color: 'text-emerald-400'
              }
            ].map((s, idx) => (
              <div key={idx} className="bg-navy-800/60 border border-slate-700/60 p-6 rounded-2xl relative hover:border-slate-500 transition">
                <div className="text-3xl font-black text-slate-700 mb-3">{s.step}</div>
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center mb-4 border border-slate-700">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}

          </div>

          {/* Quick Action Banner */}
          <div className="mt-16 bg-gradient-to-r from-amber-500/10 via-bharat-orange/15 to-bharat-violet/10 border border-amber-500/30 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold text-white">Ready to experience conversational AI for Bharat?</h4>
              <p className="text-sm text-slate-300">Try our live assistant right in your browser with zero configuration.</p>
            </div>
            <Link
              to="/assistant"
              className="bg-gradient-to-r from-bharat-orange to-amber-500 text-navy-900 font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 transition"
            >
              Launch AI Assistant
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
