import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import VoiceInputBar from './components/VoiceInputBar';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { sendChatMessage } from './services/api';
import { Sparkles, MessageSquare, ShieldCheck, Languages, Cpu, Info } from 'lucide-react';

export default function App() {
  const [sessionId, setSessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [enableRag, setEnableRag] = useState(true);
  const [enableResearch, setEnableResearch] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'నమస్కారం! నేను భాషాబ్రిడ్జ్ (BhashaBridge AI). నేను తెలుగు, హిందీ మరియు ఇంగ్లీష్ లో మీ ప్రశ్నలకు సహాయం చేయగలను. మీరు మాట్లాడవచ్చు లేదా టైప్ చేయవచ్చు.\n\nNamaste! I am BhashaBridge AI. You can speak or type your question in Telugu, Hindi or English.',
      language: 'te-IN',
      verified: true,
      modelUsed: 'openrouter/free',
      agentTrace: ['System: Initialized Welcome'],
      sources: []
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Free Client-Native Speech Synthesis (TTS)
  const { speak, stop, isPlaying } = useSpeechSynthesis();

  // Auto-scroll chat to bottom
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
    stop(); // Stop any previous TTS

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

      // Automatically speak response if desired
      speak(data.response, data.language || 'te-IN');

    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        role: 'assistant',
        content: 'Kshaminchandi / Sorry, could not connect to the AI engine. Please ensure Python FastAPI (port 8000) or Java Gateway (port 8080) is running.',
        language: 'en-IN',
        verified: false,
        modelUsed: 'error',
        agentTrace: ['ErrorHandler: Connection Failed'],
        sources: []
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-navy-900 text-slate-100 overflow-hidden">
      
      {/* Top Navigation */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onNewChat={handleNewChat}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Information Cards for First-time users */}
          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-navy-800/60 border border-slate-700/60 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                  <Languages className="w-4 h-4" />
                  <span>Multilingual Voice</span>
                </div>
                <p className="text-xs text-slate-300">
                  Speak in Telugu (తెలుగు), Hindi (हिन्दी) or English. Automatic dialect & code-mix understanding.
                </p>
              </div>

              <div className="bg-navy-800/60 border border-slate-700/60 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>RAG & Verified Sources</span>
                </div>
                <p className="text-xs text-slate-300">
                  Answers backed by official documents (PM-Kisan, Ayushman Bharat, PMAY) to avoid hallucinations.
                </p>
              </div>

              <div className="bg-navy-800/60 border border-slate-700/60 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Strictly Free-First</span>
                </div>
                <p className="text-xs text-slate-300">
                  Runs on verified OpenRouter Free models and client-native Web Speech API. Zero required paid credits.
                </p>
              </div>
            </div>
          )}

          {/* Conversation history messages */}
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              onSpeak={speak}
              onStop={stop}
              isSpeaking={isPlaying}
            />
          ))}

          {/* Thinking / Agent Processing state */}
          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-navy-800/50 rounded-2xl border border-slate-700/40 w-fit animate-pulse">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              <span className="text-xs text-slate-300 font-medium">
                Orchestrating agents (Language, ChromaDB RAG, Verification)...
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>
      </main>

      {/* Voice & Text Input Bottom Bar */}
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
