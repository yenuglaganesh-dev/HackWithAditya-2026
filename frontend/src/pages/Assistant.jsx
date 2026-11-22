import React, { useState, useEffect, useRef } from 'react';
import { useVoiceAudio } from '../hooks/useVoiceAudio';
import { sendChatMessage, fetchSystemStatus, clearServerSession } from '../services/api';
import ChatMessage from '../components/ChatMessage';
import VoiceInputBar from '../components/VoiceInputBar';
import {
  Sparkles, RefreshCw, Globe, ShieldCheck, Database,
  Cpu, ArrowLeft, Volume2, CheckCircle2, AlertCircle, Wifi, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ASSISTANT_HISTORY_KEY = 'bhashabridge_assistant_history';
const ASSISTANT_SESSION_KEY = 'bhashabridge_assistant_session';

const INITIAL_ASSISTANT_MESSAGES = [
  {
    role: 'assistant',
    content: 'నమస్కారం! నేను భాషాబ్రిడ్జ్ (BhashaBridge AI). నేను తెలుగు, హిందీ మరియు ఇంగ్లీష్ లో మీ ప్రశ్నలకు సహాయం చేయగలను. మైక్రోఫోన్ నొక్కి మాట్లాడండి లేదా కింద టైప్ చేయండి.\n\nNamaste! I am BhashaBridge AI. How can I help you today with government schemes, healthcare, or agriculture?',
    language: 'te',
    verified: false,
    modelUsed: 'gemini-4-hydrogen',
    agentTrace: ['System: Initialized Welcome'],
    sources: []
  }
];

export default function Assistant() {
  const [sessionId, setSessionId] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSISTANT_SESSION_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return 'sess_' + Math.random().toString(36).substring(2, 9);
  });
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [enableRag, setEnableRag] = useState(true);
  const [enableResearch, setEnableResearch] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ connected: false, model: 'gemini-4-hydrogen' });

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
  const chatBottomRef = useRef(null);

  // High-fidelity voice audio service
  const { playAudio, stop, isPlaying } = useVoiceAudio();

  useEffect(() => {
    try {
      localStorage.setItem(ASSISTANT_SESSION_KEY, sessionId);
      const compact = messages.map(({ audioBase64: _audio, ...rest }) => rest);
      localStorage.setItem(ASSISTANT_HISTORY_KEY, JSON.stringify(compact));
    } catch {
      // ignore
    }
  }, [messages, sessionId]);

  // Check live backend status on load
  useEffect(() => {
    async function checkHealth() {
      const status = await fetchSystemStatus();
      setBackendStatus({
        connected: status.status === 'operational' || status.status === 'healthy',
        model: status.default_model || 'gemini-4-hydrogen',
        voiceEngine: status.voice_integration || 'Web Speech Native'
      });
    }
    checkHealth();
  }, []);

  // Auto-scroll chat to latest message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    stop();
    clearServerSession(sessionId);
    setSessionId('sess_' + Math.random().toString(36).substring(2, 9));
    setMessages([
      {
        role: 'assistant',
        content: 'నమస్కారం! కొత్త సంభాషణ ప్రారంభమైంది. మీ ప్రశ్న అడగండి.\nNew session started. How can I assist you today?',
        language: 'te',
        verified: false,
        modelUsed: backendStatus.model,
        agentTrace: ['System: Reset Session'],
        sources: []
      }
    ]);
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
        enableResearch,
        includeAudio: Boolean(options.fromVoice)
      });

      const aiMsg = {
        role: 'assistant',
        content: data.response,
        language: data.language || effectiveLanguage || 'en',
        detectedLanguage: data.detected_language,
        modelUsed: data.model_used,
        verified: data.verified,
        agentTrace: data.agent_trace || [],
        sources: data.sources || [],
        audioBase64: data.audio_base64
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Automatically play voice response
      playAudio(data.response, data.language || effectiveLanguage || 'te', data.audio_base64);

    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        role: 'assistant',
        content: 'Connection Error: Unable to reach the AI Engine. Please check that the server is running.',
        language: 'en',
        verified: false,
        modelUsed: 'error',
        agentTrace: ['ErrorHandler: Backend unreachable'],
        sources: []
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 flex flex-col h-screen bg-navy-950 text-slate-100 overflow-hidden">
      
      {/* Sub-Header Toolbar with Real Status Indicators */}
      <div className="bg-navy-900/95 border-b border-slate-800 px-4 py-3 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 transition"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm">BhashaBridge AI Assistant</span>
                
                {/* Live Real Connection Pill */}
                {backendStatus.connected ? (
                  <span className="flex items-center gap-1 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    AI Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-rose-950/80 text-rose-400 border border-rose-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    <AlertCircle className="w-3 h-3" />
                    AI Disconnected
                  </span>
                )}

                <span className="hidden sm:inline bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Free Model Active ({backendStatus.model.split('/').pop()})
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Session: {sessionId} • Telugu, Hindi & English Native Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-navy-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="auto" className="bg-navy-900">Auto Detect (ఆటో / ऑटो)</option>
                <option value="te" className="bg-navy-900">Telugu (తెలుగు)</option>
                <option value="hi" className="bg-navy-900">Hindi (हिन्दी)</option>
                <option value="en" className="bg-navy-900">English (Indian)</option>
              </select>
            </div>

            {/* Reset Session */}
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 transition"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Session</span>
            </button>
          </div>

        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Quick Prompts Suggestions */}
          {messages.length === 1 && (
            <div className="mb-6 p-4 rounded-3xl bg-navy-900/60 border border-slate-800">
              <div className="text-xs font-bold text-amber-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Try speaking or clicking these verified queries:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSendMessage('నమస్కారం, ఎలా ఉన్నావు?')}
                  className="p-3 rounded-2xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  👋 <strong>Telugu Greeting:</strong> నమస్కారం, ఎలా ఉన్నావు?
                </button>
                <button
                  onClick={() => handleSendMessage('नमस्ते, आप कैसे हैं?')}
                  className="p-3 rounded-2xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  🙏 <strong>Hindi Greeting:</strong> नमस्ते, आप कैसे हैं?
                </button>
                <button
                  onClick={() => handleSendMessage('PM Kisan eligibility enti?')}
                  className="p-3 rounded-2xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  🌾 <strong>Tenglish Scheme Query:</strong> PM Kisan eligibility enti?
                </button>
                <button
                  onClick={() => handleSendMessage('Explain artificial intelligence in simple English.')}
                  className="p-3 rounded-2xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  🤖 <strong>AI Explanation:</strong> Explain artificial intelligence in simple English.
                </button>
              </div>
            </div>
          )}

          {/* Messages list */}
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              onSpeak={playAudio}
              onStop={stop}
              isSpeaking={isPlaying}
            />
          ))}

          {/* Loading / Processing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-navy-900/80 rounded-2xl border border-slate-800 w-fit animate-pulse shadow-lg">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              <span className="text-xs text-slate-300 font-medium">
                Generating live response via OpenRouter Free LLM...
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>
      </div>

      {/* Voice & Input Bar */}
      <VoiceInputBar
        onSendMessage={handleSendMessage}
        selectedLanguage={selectedLanguage}
        isLoading={isLoading}
        enableRag={enableRag}
        setEnableRag={setEnableRag}
        enableResearch={enableResearch}
        setEnableResearch={setEnableResearch}
      />

    </div>
  );
}
