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
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('bhashabridge_selected_code') || 'auto');
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

  // Voice playback hook
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
        content: 'Kshaminchandi / Sorry, could not connect to the AI engine. Please ensure the backend is running.',
        language: 'en',
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
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto px-4 py-4 pt-20">
      
      {/* Sub-Header bar */}
      <div className="mosaic-glass rounded-3xl p-4 sm:p-5 mb-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition"
              title="Return to Studio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline font-bold text-base sm:text-lg text-white">
                  BhashaBridge Voice Console
                </h1>
                {backendStatus.connected ? (
                  <span className="flex items-center gap-1 text-[10px] bg-sky-500/10 text-sky-300 border border-sky-400/20 px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                    Live AI Engine
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded-full font-bold">
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    AI Local Standby
                  </span>
                )}
                <span className="hidden sm:inline bg-white/5 text-zinc-300 border border-white/10 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Model: {backendStatus.model.split('/').pop()}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Model: <span className="font-mono text-sky-300 font-semibold">{backendStatus.model}</span> • Speech: <span className="font-semibold text-sky-300">Native Web Speech STT/TTS</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white font-semibold">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="auto" className="bg-[#121218] text-white">Auto Detect (ఆటో / ऑटो)</option>
                <option value="te" className="bg-[#121218] text-white">Telugu (తెలుగు)</option>
                <option value="hi" className="bg-[#121218] text-white">Hindi (हिन्दी)</option>
                <option value="en" className="bg-[#121218] text-white">English (Indian)</option>
              </select>
            </div>

            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 rounded-full border border-white/10 transition shadow-sm cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">New Session</span>
            </button>
          </div>

        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-2">
        <div className="max-w-4xl mx-auto space-y-4">
          
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
            <div className="flex items-center gap-3 p-4 mosaic-glass rounded-2xl w-fit animate-pulse shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-400 animate-spin" />
              <span className="text-xs text-sky-300 font-semibold">
                Searching & synthesizing response...
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
