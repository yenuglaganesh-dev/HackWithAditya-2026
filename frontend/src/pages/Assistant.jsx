import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { sendChatMessage } from '../services/api';
import ChatMessage from '../components/ChatMessage';
import VoiceInputBar from '../components/VoiceInputBar';
import {
  Sparkles, RefreshCw, Globe, ShieldCheck, Database,
  Cpu, ArrowLeft, Volume2, Info, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Assistant() {
  const [sessionId, setSessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [enableRag, setEnableRag] = useState(true);
  const [enableResearch, setEnableResearch] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'నమస్కారం! నేను భాషాబ్రిడ్జ్ (BhashaBridge AI). నేను తెలుగు, హిందీ మరియు ఇంగ్లీష్ లో మీ ప్రశ్నలకు సహాయం చేయగలను. మైక్రోఫోన్ నొక్కి మాట్లాడండి లేదా కింద టైప్ చేయండి.\n\nNamaste! I am BhashaBridge AI. You can speak or type your question in Telugu, Hindi or English. How can I assist you with government schemes, healthcare, or agriculture today?',
      language: 'te-IN',
      verified: true,
      modelUsed: 'openrouter/free',
      agentTrace: ['System: Initialized Assistant'],
      sources: []
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Client-Native Voice Playback (Free SpeechSynthesis)
  const { speak, stop, isPlaying } = useSpeechSynthesis();

  // Scroll to latest message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    stop();
    setSessionId('sess_' + Math.random().toString(36).substring(2, 9));
    setMessages([
      {
        role: 'assistant',
        content: 'నమస్కారం! కొత్త సంభాషణ ప్రారంభమైంది. మీ ప్రశ్న అడగండి.\nNew session started. How can I assist you today?',
        language: 'te-IN',
        verified: true,
        modelUsed: 'openrouter/free',
        agentTrace: ['System: Reset Session'],
        sources: []
      }
    ]);
  };

  const handleSendMessage = async (text) => {
    stop();

    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const data = await sendChatMessage({
        sessionId,
        message: text,
        language: selectedLanguage,
        enableRag,
        enableResearch
      });

      const aiMsg = {
        role: 'assistant',
        content: data.response,
        language: data.language || 'en-IN',
        detectedLanguage: data.detected_language,
        modelUsed: data.model_used,
        verified: data.verified,
        agentTrace: data.agent_trace || [],
        sources: data.sources || []
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Automatically speak the answer in native regional accent
      speak(data.response, data.language || 'te-IN');

    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        role: 'assistant',
        content: 'Kshaminchandi / Sorry, could not connect to the AI engine. Please ensure Python FastAPI (port 8000) is running.',
        language: 'en-IN',
        verified: false,
        modelUsed: 'error',
        agentTrace: ['ErrorHandler: Backend Connection Failed'],
        sources: []
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 flex flex-col h-screen bg-navy-950 text-slate-100 overflow-hidden">
      
      {/* Sub-Header Toolbar */}
      <div className="bg-navy-900/90 border-b border-slate-800/80 px-4 py-3 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
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
                <span className="font-bold text-white text-sm">Interactive AI Assistant</span>
                <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  OpenRouter Free
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Session: {sessionId} • ChromaDB RAG Active
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
                <option value="te-IN" className="bg-navy-900">Telugu (తెలుగు)</option>
                <option value="hi-IN" className="bg-navy-900">Hindi (हिन्दी)</option>
                <option value="en-IN" className="bg-navy-900">English (Indian)</option>
              </select>
            </div>

            {/* Clear session */}
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
            <div className="mb-6 p-4 rounded-2xl bg-navy-900/60 border border-slate-800/80">
              <div className="text-xs font-semibold text-amber-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Try speaking or clicking these sample citizen questions:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSendMessage('పీఎం కిసాన్ పథకంలో ఎంత డబ్బు వస్తుంది?')}
                  className="p-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  🌾 <strong>Telugu:</strong> పీఎం కిసాన్ పథకంలో ఎంత డబ్బు వస్తుంది?
                </button>
                <button
                  onClick={() => handleSendMessage('आयुष्मान भारत योजना के तहत कितना मुफ्त इलाज मिलता है?')}
                  className="p-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  🏥 <strong>Hindi:</strong> आयुष्मान भारत योजना के तहत कितना मुफ्त इलाज मिलता है?
                </button>
                <button
                  onClick={() => handleSendMessage('ee yojana ela apply cheyali cheppandi')}
                  className="p-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  🗣️ <strong>Tenglish:</strong> ee yojana ela apply cheyali cheppandi
                </button>
                <button
                  onClick={() => handleSendMessage('What are the required documents for DigiLocker registration?')}
                  className="p-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 border border-slate-700 text-left text-slate-200 hover:text-amber-300 transition"
                >
                  🇮🇳 <strong>English:</strong> What documents are needed for DigiLocker?
                </button>
              </div>
            </div>
          )}

          {/* Render turn bubbles */}
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              onSpeak={speak}
              onStop={stop}
              isSpeaking={isPlaying}
            />
          ))}

          {/* Processing / Agent animation */}
          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-navy-800/60 rounded-2xl border border-slate-700/60 w-fit animate-pulse">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              <span className="text-xs text-slate-300 font-medium">
                Orchestrating agents (Language, ChromaDB RAG, Verification)...
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
