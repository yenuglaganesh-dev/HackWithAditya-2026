import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Mic,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  Cpu,
  FileText,
  Activity,
  Headphones,
  Database,
  Languages,
  Sparkles
} from 'lucide-react';
import VoiceConsole from '../components/VoiceConsole';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { sendChatMessage } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useTranslation();
  const { selectedLanguage, changeLanguage } = useLanguage();

  const [activeVoiceDemo, setActiveVoiceDemo] = useState('te');
  const [enableRag, setEnableRag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'నమస్కారం! నేను భాషాబ్రిడ్జ్ (BhashaBridge AI). నేను తెలుగు, हिन्दी మరియు English లో పీఎం కిసాన్, రైతు భరోసా, ఆయుష్మాన్ భారత్ వంటి పథకాల సమాచారాన్ని అందించగలను.\n\nNamaste! I am BhashaBridge AI. Speak or type your question in Telugu, Hindi, or English.',
      language: 'te-IN',
      verified: true,
      modelUsed: 'gemini-4-hydrogen',
      agentTrace: ['OrchestratorAgent: Ready', 'LanguageAgent: te/hi/en', 'KnowledgeAgent: Synced'],
      sources: [
        {
          title: "PM Kisan Samman Nidhi",
          source: "pmkisan.gov.in",
          snippet: "Annual income support of Rs 6,000 in three equal installments of Rs 2,000 directly to bank accounts."
        }
      ]
    }
  ]);

  const { speak, stop, pause, resume, replay, isPlaying, isPaused } = useSpeechSynthesis();

  const handleSendMessage = async (text, options = {}) => {
    stop();
    const userMsg = {
      role: 'user',
      content: text,
      language: options.detectedLanguage || selectedLanguage,
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const effectiveLanguage =
        selectedLanguage === 'auto' && options.detectedLanguage
          ? options.detectedLanguage
          : selectedLanguage;

      const data = await sendChatMessage({
        sessionId: 'home_session',
        message: text,
        language: effectiveLanguage,
        enableRag,
        enableResearch: false
      });

      const aiMsg = {
        role: 'assistant',
        content: data.response,
        language: data.language || effectiveLanguage || 'en',
        detectedLanguage: data.detected_language,
        modelUsed: data.model_used || 'gemini-4-hydrogen',
        verified: data.verified,
        agentTrace: data.agent_trace || [],
        sources: data.sources || []
      };
      setMessages((prev) => [...prev, aiMsg]);
      speak(data.response, data.language || effectiveLanguage);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'క్షమించండి, AI ఇంజిన్ తో కనెక్ట్ కాలేకపోయాము. దయచేసి Python AI సర్వీస్ రన్ అవుతుందో లేదో తనిఖీ చేయండి.',
          language: 'te-IN'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="pt-24 pb-20 relative z-10">

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FBD3B6]">
              <span className="flex h-2 w-2 rounded-full bg-[#F58220] animate-pulse" />
              <span className="text-xs font-bold text-[#E96B16] tracking-wide">
                National Hackathon 2026 – AI for Bharat
              </span>
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-6xl font-headline font-bold text-[#202124] tracking-tight leading-[1.15]">
              Your Voice.{' '}
              <span className="text-[#F58220]">
                Your Language.
              </span>{' '}
              Your AI.
            </h1>

            {/* Subheading */}
            <h2 className="text-xl sm:text-2xl font-semibold text-[#202124]">
              Speak Naturally. Get Answers Instantly.
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#707070] leading-relaxed max-w-2xl mx-auto">
              Communicate naturally in Telugu, Hindi and English. Speak your questions, get automatic transcription and receive intelligent voice responses in your preferred language.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/assistant"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl btn-orange text-base font-bold shadow-md shadow-orange-500/20 active:scale-95 transition"
              >
                <Mic className="w-5 h-5 text-white" />
                <span>Try Voice Assistant</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <a
                href="#live-console"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-[#F8F9FA] text-[#202124] font-semibold text-base border border-[#E8EAED] shadow-soft transition"
              >
                <span>Interactive Voice Demo</span>
              </a>
            </div>

            {/* 4 Feature Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8">
              {[
                { label: "Multilingual AI", icon: Languages, sub: "Telugu, Hindi, English" },
                { label: "Voice Recording", icon: Mic, sub: "Native Browser Mic" },
                { label: "Speech-to-Text", icon: FileText, sub: "Automatic & Instant" },
                { label: "Voice Response", icon: Volume2, sub: "Natural Regional TTS" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-[#E8EAED] shadow-soft text-left hover:border-[#FBD3B6] transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FFF3E8] text-[#F58220] flex items-center justify-center mb-2.5">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-[#202124]">{item.label}</div>
                  <div className="text-[11px] text-[#707070] truncate">{item.sub}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE VOICE CONSOLE */}
      <section id="live-console" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Experience Live Conversational Voice AI
            </h3>
            <p className="text-sm text-[#707070]">
              Speak directly in your native language or code-mixed dialects to receive verified government scheme guidance.
            </p>
          </div>

          <VoiceConsole
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            selectedLanguage={selectedLanguage}
            onLanguageChange={changeLanguage}
            speak={speak}
            stop={stop}
            pause={pause}
            resume={resume}
            replay={replay}
            isPlaying={isPlaying}
            isPaused={isPaused}
            enableRag={enableRag}
            setEnableRag={setEnableRag}
          />
        </div>
      </section>

      {/* 3. VERIFIED DIALECT DEMOS */}
      <section className="py-12 bg-[#F8F9FA] border-y border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold text-[#F58220] uppercase tracking-wider">
              Natural Speech Demonstration
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Accurate Regional Transcription & Answers
            </h3>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAED] shadow-card">
            
            {/* Language Selector Pills */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {Object.keys(voiceDemos).map((code) => (
                <button
                  key={code}
                  onClick={() => setActiveVoiceDemo(code)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeVoiceDemo === code
                      ? 'bg-[#F58220] text-white shadow-md shadow-orange-500/20'
                      : 'bg-[#F8F9FA] text-[#707070] hover:text-[#202124] border border-[#E8EAED]'
                  }`}
                >
                  {voiceDemos[code].lang}
                </button>
              ))}
            </div>

            {/* Selected Demo Card */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFF3E8] border border-[#FBD3B6]">
                <div className="flex items-center justify-between text-xs font-bold text-[#E96B16] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-[#F58220]" />
                    Recognized Citizen Speech
                  </span>
                  <span className="text-[10px] text-[#707070]">100% Free STT</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-[#202124]">
                  "{voiceDemos[activeVoiceDemo].script}"
                </p>
                <p className="text-xs text-[#707070] italic mt-1">
                  En: {voiceDemos[activeVoiceDemo].englishTranslation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E8EAED]">
                <div className="flex items-center justify-between text-xs font-bold text-[#F58220] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F58220]" />
                    Verified RAG Answer (ChromaDB + OpenRouter Free):
                  </span>
                  <span className="bg-[#FFF3E8] text-[#E96B16] px-2 py-0.5 rounded text-[10px] font-bold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-sm text-[#202124] leading-relaxed">
                  {voiceDemos[activeVoiceDemo].answer}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. THE CHALLENGE VS SOLUTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#F58220] uppercase tracking-wider">
              The Digital Divide in India
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Breaking Language Barriers with Multi-Agent AI
            </h3>
            <p className="text-[#707070] text-sm sm:text-base">
              Over 800 million citizens in Bharat face digital friction due to English-only portals and dialect exclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Problem Card */}
            <div className="bg-white border border-[#E8EAED] p-8 rounded-3xl shadow-card hover:border-rose-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#202124] mb-3">The Problem for Everyday Citizens</h4>
              <ul className="space-y-3 text-sm text-[#707070]">
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

            {/* Solution Card */}
            <div className="bg-white border border-[#E8EAED] p-8 rounded-3xl shadow-card hover:border-[#FBD3B6] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] text-[#F58220] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#202124] mb-3">The BhashaBridge AI Solution</h4>
              <ul className="space-y-3 text-sm text-[#707070]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Native Voice In & Out:</strong> Speak directly via browser Web Speech API in Telugu, Hindi, or English without expensive speech APIs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>7-Agent RAG Orchestration:</strong> Verified against institutional government documents stored inside ChromaDB.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Free-First Architecture:</strong> Zero paid GPU or credits needed. Runs on verified OpenRouter Free models.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Quick Action Banner */}
          <div className="mt-12 bg-gradient-to-r from-[#FFF3E8] via-[#FFF8F2] to-[#FFF3E8] border border-[#FBD3B6] p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
            <div className="space-y-1.5 text-center md:text-left">
              <h4 className="text-xl font-bold text-[#202124]">Ready to experience conversational AI for Bharat?</h4>
              <p className="text-sm text-[#707070]">Try our live assistant right in your browser with zero configuration.</p>
            </div>
            <Link
              to="/assistant"
              className="btn-orange px-6 py-3.5 rounded-xl font-bold shadow-md hover:scale-105 transition"
            >
              Launch Voice Assistant
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
