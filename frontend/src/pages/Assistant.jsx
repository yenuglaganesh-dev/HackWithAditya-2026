import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sendChatMessage, clearServerSession } from '../services/api';
import VoiceConsole from '../components/VoiceConsole';
import SwarmMeshSection from '../components/SwarmMeshSection';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { ArrowLeft, RefreshCw, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const ASSISTANT_HISTORY_KEY = 'bhashabridge_assistant_history';
const ASSISTANT_SESSION_KEY = 'bhashabridge_assistant_session';

const INITIAL_ASSISTANT_MESSAGES = [
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
];

export default function Assistant() {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const [sessionId, setSessionId] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSISTANT_SESSION_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return 'sess_' + Math.random().toString(36).substring(2, 9);
  });

  const [enableRag, setEnableRag] = useState(true);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSISTANT_HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_ASSISTANT_MESSAGES;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Voice playback & recording TTS hook
  const { speak, stop, pause, resume, replay, isPlaying, isPaused } = useSpeechSynthesis();

  useEffect(() => {
    try {
      localStorage.setItem(ASSISTANT_SESSION_KEY, sessionId);
      const compact = messages.map(({ audioBase64: _audio, ...rest }) => rest);
      localStorage.setItem(ASSISTANT_HISTORY_KEY, JSON.stringify(compact));
    } catch {
      // ignore
    }
  }, [messages, sessionId]);

  const handleNewChat = () => {
    stop();
    clearServerSession(sessionId);
    const nextSession = 'sess_' + Math.random().toString(36).substring(2, 9);
    setSessionId(nextSession);
    setMessages(INITIAL_ASSISTANT_MESSAGES);
  };

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

      // Automatically speak the response aloud in the citizen's tongue
      speak(data.response, data.language || effectiveLanguage);

    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        role: 'assistant',
        content: 'క్షమించండి, AI ఇంజిన్ తో కనెక్ట్ కాలేకపోయాము. దయచేసి Python AI సర్వీస్ రన్ అవుతుందో లేదో తనిఖీ చేయండి.\n(Error connecting to AI backend engine. Please check that Python service is running on port 8000).',
        language: 'te-IN',
        verified: false,
        modelUsed: 'error',
        agentTrace: ['System: Connection Failed'],
        sources: []
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner & Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl mosaic-glass">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white transition flex items-center justify-center cursor-pointer shadow-sm"
            title="Return to Home Studio"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline font-extrabold text-lg sm:text-xl text-white tracking-tight">
                BhashaBridge Voice Console
              </h1>
              <span className="flex items-center gap-1.5 text-[10px] bg-sky-500/10 text-sky-300 border border-sky-400/20 px-2.5 py-0.5 rounded-full font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Live AI Mesh
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Interactive Multilingual Speech Assistant • Free-First Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-xl border border-white/10 transition shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* 1. Interactive Voice Console (Matching Exact UI from Photo 1) */}
      <div id="voice-console-section">
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

      {/* 2. 7-Agent Autonomous Multi-Agent AI System Section */}
      <div className="pt-4">
        <SwarmMeshSection />
      </div>

    </div>
  );
}
