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
import StrokeText from '../components/ui/StrokeText';
import HeroHeading from '../components/ui/HeroHeading';
import SwarmMeshSection from '../components/SwarmMeshSection';
import CapabilitiesSection from '../components/CapabilitiesSection';

export default function Home() {
  const { t } = useTranslation();
  const { selectedLanguage, changeLanguage } = useLanguage();

  const [sessionId, setSessionId] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bhashabridge_home_session');
      if (saved) return saved;
    } catch {
      // ignore
    }
    const fresh = 'sess_home_' + Math.random().toString(36).substring(2, 9);
    try { sessionStorage.setItem('bhashabridge_home_session', fresh); } catch { }
    return fresh;
  });
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
        sessionId,
        message: text,
        language: effectiveLanguage,
        enableRag,
        enableResearch: false
      });

      if (data.error) {
        throw new Error(data.error);
      }

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
      const errText = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Unable to get AI response: ${errText}. Please verify the backend AI service is running or check your API key configuration.`,
          language: 'en',
          isError: true,
          failedQuery: text,
          verified: false
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
                BhashaBridge AI
              </span>
            </div>

            {/* Main Hero Heading Matching Reference */}
            <HeroHeading />

            {/* Subheading */}
            <h2 className="text-xl sm:text-2xl font-semibold text-[#202124]">
              {t('hero.subheading', 'Speak Naturally. Get Answers Instantly.')}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#707070] leading-relaxed max-w-2xl mx-auto">
              {t('hero.description', 'Communicate naturally in Telugu, Hindi and English. Speak your questions, get automatic transcription and receive intelligent voice responses in your preferred language.')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/assistant"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl btn-orange text-base font-bold shadow-md shadow-orange-500/20 active:scale-95 transition"
              >
                <Mic className="w-5 h-5 text-white" />
                <span>{t('hero.tryAssistant', 'Try Voice Assistant')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <a
                href="#live-console"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-[#F8F9FA] text-[#202124] font-semibold text-base border border-[#E8EAED] shadow-soft transition"
              >
                <span>{t('hero.interactiveDemo', 'Interactive Voice Demo')}</span>
              </a>
            </div>

            {/* 4 Feature Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8">
              {[
                { label: t('hero.featureMultilingual', 'Multilingual AI'), icon: Languages, sub: t('hero.featureMultilingualSub', 'Telugu, Hindi, English') },
                { label: t('hero.featureVoiceRec', 'Voice Recording'), icon: Mic, sub: t('hero.featureVoiceRecSub', 'Native Browser Mic') },
                { label: t('hero.featureStt', 'Speech-to-Text'), icon: FileText, sub: t('hero.featureSttSub', 'Automatic & Instant') },
                { label: t('hero.featureTts', 'Voice Response'), icon: Volume2, sub: t('hero.featureTtsSub', 'Natural Regional TTS') },
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
              {t('hero.liveConsoleTitle', 'Experience Live Conversational Voice AI')}
            </h3>
            <p className="text-sm text-[#707070]">
              {t('hero.liveConsoleSubtitle', 'Speak directly in your native language or code-mixed dialects to receive verified government scheme guidance.')}
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
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeVoiceDemo === code
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
              Accessible Voice AI
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Bridging Communication with Voice & Language AI
            </h3>
            <p className="text-[#707070] text-sm sm:text-base">
              Overcoming digital literacy and language barriers with natural, browser-native conversational intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Problem Card */}
            <div className="bg-white border border-[#E8EAED] p-8 rounded-3xl shadow-card hover:border-rose-300 transition">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#202124] mb-3">Digital & Language Challenges</h4>
              <ul className="space-y-3 text-sm text-[#707070]">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Text-Heavy Interfaces:</strong> Traditional web applications require complex typing and navigation that exclude non-fluent and text-constrained users.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Dialect & Code-Mixing Exclusion:</strong> Millions speak everyday mixed regional dialects (Tenglish, Hinglish) that conventional voice tools fail to recognize.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Costly Audio & API Barriers:</strong> Most commercial voice platforms demand expensive cloud speech APIs, paid subscriptions, and proprietary hardware.</span>
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-white border border-[#E8EAED] p-8 rounded-3xl shadow-card hover:border-[#FBD3B6] transition">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] text-[#F58220] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#202124] mb-3">The BhashaBridge AI Platform</h4>
              <ul className="space-y-3 text-sm text-[#707070]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Zero-Cost Native Voice:</strong> Real-time microphone speech recognition and natural speech synthesis running directly in your web browser.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Multilingual & General Knowledge:</strong> Seamlessly switch between Telugu, Hindi, and English to answer science, general curiosity, and citizen questions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#F58220] font-bold">•</span>
                  <span><strong>Multi-Turn Conversational Memory:</strong> Follow-up queries understand previous context so conversations flow naturally without repeating yourself.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Quick Action Banner */}
          <div className="mt-12 bg-gradient-to-r from-[#FFF3E8] via-[#FFF8F2] to-[#FFF3E8] border border-[#FBD3B6] p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
            <div className="space-y-1.5 text-center md:text-left">
              <h4 className="text-xl font-bold text-[#202124]">Ready to experience conversational AI?</h4>
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

      {/* 5. 7-AGENT AUTONOMOUS ARCHITECTURE */}
      <section className="py-8">
        <SwarmMeshSection />
      </section>

      {/* 6. CORE CAPABILITIES */}
      <section className="py-8">
        <CapabilitiesSection />
      </section>

    </div>
  );
}
