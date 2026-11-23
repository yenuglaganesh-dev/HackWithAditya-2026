import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic, Sparkles, ArrowRight, ShieldCheck, Database,
  Cpu, Languages, Headphones, CheckCircle2, ChevronRight, Activity
} from 'lucide-react';
import { PixelText } from '../components/ui/mosaic-prompt-template';

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
    <div className="pt-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
        
        {/* Soft Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-bold text-white">
                National Hackathon 2026 – AI for Bharat
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs text-sky-300 font-medium">Free-First Voice AI</span>
            </div>

            {/* Pixel Title */}
            <div className="py-2">
              <PixelText text="BHASHABRIDGE AI" className="w-full max-w-xl mx-auto text-white" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Your Language.{' '}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Your Voice.
              </span>{' '}
              Your AI.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Experience the next generation of voice-first artificial intelligence built for every Indian citizen. Speak naturally in{' '}
              <span className="text-sky-300 font-bold">Telugu</span>,{' '}
              <span className="text-cyan-300 font-bold">Hindi</span>, and{' '}
              <span className="text-white font-bold">English</span> with zero language barriers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/assistant"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-400 to-cyan-300 hover:brightness-110 text-[#06233a] font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-sky-400/20 hover:scale-105 transition cursor-pointer"
              >
                <Mic className="w-5 h-5 text-[#06233a]" />
                <span>Launch Voice Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/portfolio"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 py-4 rounded-xl border border-white/10 transition shadow-sm"
              >
                <span>Explore Technical Portfolio</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE VOICE ACCENT DEMO IN MOSAIC GLASS */}
      <section className="py-16 border-y border-white/10 bg-[#050506]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xs font-bold text-sky-400 tracking-widest uppercase">
              Real Multi-Dialect Demonstration
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Instant Knowledge in Your Mother Tongue
            </h3>
            <p className="text-sm text-zinc-400">
              Select an Indic dialect below to preview speech recognition and verified knowledge responses.
            </p>
          </div>

          <div className="mosaic-glass rounded-3xl p-6 sm:p-8">
            {/* Language Selector Pills */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {Object.keys(voiceDemos).map((code) => (
                <button
                  key={code}
                  onClick={() => setActiveVoiceDemo(code)}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeVoiceDemo === code
                      ? 'bg-gradient-to-r from-sky-400 to-cyan-300 text-[#06233a] shadow-md shadow-sky-400/20 scale-105'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {voiceDemos[code].lang}
                </button>
              ))}
            </div>

            {/* Current Selected Demo */}
            <div className="space-y-6">
              
              {/* Citizen Question */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-2">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <Mic className="w-3.5 h-3.5 text-sky-400" />
                    Recognized Citizen Speech
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">100% Free Web Speech STT</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  "{voiceDemos[activeVoiceDemo].script}"
                </p>
                <p className="text-xs text-zinc-400 italic mt-1">
                  En: {voiceDemos[activeVoiceDemo].englishTranslation}
                </p>
              </div>

              {/* AI Verified Answer */}
              <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/20">
                <div className="flex items-center justify-between text-xs font-bold text-sky-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    Verified Sources (Verified Knowledge Grounding):
                  </span>
                  <span className="bg-sky-400 text-[#06233a] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                  {voiceDemos[activeVoiceDemo].answer}
                </p>
              </div>

            </div>

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
