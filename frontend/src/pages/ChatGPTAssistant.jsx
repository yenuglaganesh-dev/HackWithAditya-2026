import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Plus, Sparkles, Globe, Settings, Volume2, 
  Trash2, ShieldCheck, Database, RefreshCw, AlertCircle
} from 'lucide-react';
import AssistantSidebar from '../components/AssistantSidebar';
import AssistantChatMessage from '../components/AssistantChatMessage';
import AssistantChatComposer from '../components/AssistantChatComposer';
import AssistantWelcomeScreen from '../components/AssistantWelcomeScreen';
import AssistantSettingsModal from '../components/AssistantSettingsModal';
import { useVoiceAudio } from '../hooks/useVoiceAudio';
import { sendChatMessage, fetchSystemStatus, clearServerSession } from '../services/api';

const SESSIONS_STORAGE_KEY = 'bhashabridge_conversations_v2';
const ACTIVE_SESSION_STORAGE_KEY = 'bhashabridge_active_session_id';

export default function ChatGPTAssistant() {
  // Sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Settings
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('bhashabridge_selected_code') || 'auto');
  const [enableRag, setEnableRag] = useState(true);
  const [enableResearch, setEnableResearch] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [autoSubmitVoice, setAutoSubmitVoice] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  // Backend status
  const [backendStatus, setBackendStatus] = useState({ connected: false, model: 'BhashaBridge AI' });

  // Conversations history state
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    const initId = 'sess_' + Math.random().toString(36).substring(2, 9);
    return [
      {
        id: initId,
        title: 'New Conversation',
        createdAt: new Date().toLocaleDateString(),
        messages: []
      }
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return conversations[0]?.id || 'sess_' + Math.random().toString(36).substring(2, 9);
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentlyPlayingMsgId, setCurrentlyPlayingMsgId] = useState(null);
  const chatBottomRef = useRef(null);

  // Dedicated speech synthesis and audio hook
  const { 
    playAudio, 
    stop: stopVoice, 
    pause: pauseVoice, 
    resume: resumeVoice, 
    isPlaying: isVoicePlaying, 
    isPaused: isVoicePaused 
  } = useVoiceAudio();

  // Find active conversation
  const activeConversation = conversations.find(c => c.id === activeSessionId) || conversations[0];
  const messages = activeConversation?.messages || [];

  // Persist conversations
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(conversations));
      localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, activeSessionId);
      localStorage.setItem('bhashabridge_selected_code', selectedLanguage);
    } catch {
      // ignore
    }
  }, [conversations, activeSessionId, selectedLanguage]);

  // Check health on mount
  useEffect(() => {
    async function checkHealth() {
      const status = await fetchSystemStatus();
      setBackendStatus({
        connected: status.status === 'operational' || status.status === 'healthy',
        model: status.default_model || 'gemini-4-hydrogen'
      });
    }
    checkHealth();
  }, []);

  // Keyboard shortcut Ctrl+K for new chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Helper to update messages in active session
  const updateActiveMessages = (updater) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === activeSessionId) {
        const nextMsgs = typeof updater === 'function' ? updater(conv.messages) : updater;
        // Auto title from first user message
        let title = conv.title;
        if (title === 'New Conversation' && nextMsgs.length > 0) {
          const firstUser = nextMsgs.find(m => m.role === 'user');
          if (firstUser) {
            title = firstUser.content.slice(0, 32).trim() + (firstUser.content.length > 32 ? '...' : '');
          }
        }
        return { ...conv, title, messages: nextMsgs };
      }
      return conv;
    }));
  };

  // Start a new conversation
  const handleNewChat = () => {
    stopVoice();
    setCurrentlyPlayingMsgId(null);
    const newId = 'sess_' + Math.random().toString(36).substring(2, 9);
    const newSession = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toLocaleDateString(),
      messages: []
    };
    setConversations(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  // Select a session
  const handleSelectSession = (id) => {
    stopVoice();
    setCurrentlyPlayingMsgId(null);
    setActiveSessionId(id);
  };

  // Delete a session
  const handleDeleteSession = (id) => {
    stopVoice();
    clearServerSession(id);
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length === 0) {
        const fallbackId = 'sess_' + Math.random().toString(36).substring(2, 9);
        setActiveSessionId(fallbackId);
        return [{ id: fallbackId, title: 'New Conversation', createdAt: new Date().toLocaleDateString(), messages: [] }];
      }
      if (id === activeSessionId) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Rename a session
  const handleRenameSession = (id, newTitle) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, title: newTitle } : c));
  };

  // Send message
  const handleSendMessage = async (text, options = {}) => {
    if (!text.trim() || isLoading) return;

    const userMsgId = 'msg_' + Date.now();
    const userMessage = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromVoice: options.fromVoice || false
    };

    updateActiveMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        sessionId: activeSessionId,
        message: text,
        language: options.detectedLanguage || selectedLanguage,
        enableRag,
        enableResearch,
        includeAudio: true
      });

      const aiMsgId = 'msg_' + Date.now() + '_ai';
      const aiMessage = {
        id: aiMsgId,
        role: 'assistant',
        content: response.response || 'No response returned from model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: response.model_used || backendStatus.model,
        detectedLanguage: response.detected_language || selectedLanguage,
        sources: response.sources || [],
        agentTrace: response.agent_trace || [],
        verified: response.verified || false,
        audioBase64: response.audio_base64 || null
      };

      updateActiveMessages(prev => [...prev, aiMessage]);

      // If Auto-Speak is enabled, play immediately
      if (autoSpeak) {
        handlePlayMessage(aiMessage);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        id: 'msg_err_' + Date.now(),
        role: 'assistant',
        content: "I'm temporarily unable to respond. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'BhashaBridge AI',
        detectedLanguage: 'en',
        sources: [],
        agentTrace: []
      };
      updateActiveMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio Playback Handlers
  const handlePlayMessage = (msg) => {
    setCurrentlyPlayingMsgId(msg.id);
    playAudio({
      text: msg.content,
      langCode: msg.detectedLanguage || selectedLanguage,
      audioBase64: msg.audioBase64 || null
    });
  };

  const handlePauseAudio = () => {
    pauseVoice();
  };

  const handleResumeAudio = () => {
    resumeVoice();
  };

  const handleStopAudio = () => {
    stopVoice();
    setCurrentlyPlayingMsgId(null);
  };

  const handleReplayAudio = (msg) => {
    stopVoice();
    setTimeout(() => {
      handlePlayMessage(msg);
    }, 100);
  };

  return (
    <div className="flex h-screen w-full bg-[#05070d] text-slate-100 font-sans overflow-hidden">
      
      {/* ChatGPT Style Sidebar */}
      <AssistantSidebar
        conversations={conversations}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        isOpen={sidebarOpen}
        onToggleOpen={() => setSidebarOpen(!sidebarOpen)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Conversation Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 relative bg-gradient-to-b from-[#070b14] via-[#05070d] to-[#04060a]">
        
        {/* Top Floating App Bar */}
        <header className="h-14 border-b border-white/[0.06] bg-[#070b14]/80 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition cursor-pointer"
                title="Open sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white tracking-wide">
                BhashaBridge <span className="text-cyan-400 font-mono text-xs">AI</span>
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[10px] bg-sky-500/10 text-sky-300 border border-sky-400/20 px-2 py-0.5 rounded-full font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Voice Assistant
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            
            {/* Language Quick Dropdown */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="auto" className="bg-[#0c1220] text-white">Auto</option>
                <option value="te" className="bg-[#0c1220] text-white">తెలుగు</option>
                <option value="hi" className="bg-[#0c1220] text-white">हिन्दी</option>
                <option value="en" className="bg-[#0c1220] text-white">English</option>
              </select>
            </div>

            {/* New Chat Icon */}
            <button
              type="button"
              onClick={handleNewChat}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition cursor-pointer"
              title="New Chat (Ctrl+K)"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Settings Button */}
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition cursor-pointer"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

          </div>
        </header>

        {/* Message Stream Scroll Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          {messages.length === 0 ? (
            <AssistantWelcomeScreen onSelectPrompt={(prompt) => handleSendMessage(prompt)} />
          ) : (
            <div className="py-4 space-y-1">
              {messages.map((msg) => (
                <AssistantChatMessage
                  key={msg.id}
                  message={msg}
                  onPlay={handlePlayMessage}
                  onPause={handlePauseAudio}
                  onResume={handleResumeAudio}
                  onStop={handleStopAudio}
                  onReplay={handleReplayAudio}
                  isCurrentlyPlaying={isVoicePlaying && currentlyPlayingMsgId === msg.id}
                  isCurrentlyPaused={isVoicePaused && currentlyPlayingMsgId === msg.id}
                />
              ))}

              {/* AI Thinking Animation */}
              {isLoading && (
                <div className="w-full py-4 px-3 sm:px-6 bg-[#0f172a]/30 border-y border-white/[0.04]">
                  <div className="max-w-3xl mx-auto flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shrink-0 text-white shadow-md">
                      <Sparkles className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400 py-1.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>BhashaBridge AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>
          )}
        </div>

        {/* Bottom Fixed Composer Bar */}
        <AssistantChatComposer
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedLanguage={selectedLanguage}
          enableRag={enableRag}
          setEnableRag={setEnableRag}
          enableResearch={enableResearch}
          setEnableResearch={setEnableResearch}
          autoSpeak={autoSpeak}
          setAutoSpeak={setAutoSpeak}
          autoSubmitVoice={autoSubmitVoice}
          setAutoSubmitVoice={setAutoSubmitVoice}
        />

      </main>

      {/* Voice & Assistant Settings Modal */}
      <AssistantSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        autoSpeak={autoSpeak}
        setAutoSpeak={setAutoSpeak}
        autoSubmitVoice={autoSubmitVoice}
        setAutoSubmitVoice={setAutoSubmitVoice}
        speechRate={speechRate}
        setSpeechRate={setSpeechRate}
        backendStatus={backendStatus}
      />

    </div>
  );
}
