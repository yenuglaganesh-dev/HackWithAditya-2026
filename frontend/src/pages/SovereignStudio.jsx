import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import VoiceConsole from '../components/VoiceConsole';
import SwarmMeshSection from '../components/SwarmMeshSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import SovereignFooter from '../components/SovereignFooter';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useScrollMotionBlur } from '../hooks/useScrollMotionBlur';
import { sendChatMessage, clearServerSession } from '../services/api';

const STORAGE_KEY_MESSAGES = 'bhashabridge_studio_history';
const STORAGE_KEY_SESSION = 'bhashabridge_studio_session';

const INITIAL_STUDIO_MESSAGES = [
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

export default function SovereignStudio() {
  const [sessionId, setSessionId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSION);
      if (saved) return saved;
    } catch {
      // ignore storage errors
    }
    return 'sess_' + Math.random().toString(36).substring(2, 9);
  });
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [enableRag, setEnableRag] = useState(true);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_STUDIO_MESSAGES;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Persist history in localStorage whenever messages update
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSION, sessionId);
      const compact = messages.map(({ audioBase64: _audio, ...rest }) => rest);
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(compact));
    } catch {
      // ignore storage quota errors
    }
  }, [messages, sessionId]);

  // Motion blur when scrolling up or down
  const { blurAmount, isScrolling, motionBlurStyle } = useScrollMotionBlur();

  // Voice Output (TTS)
  const { speak, stop, isPlaying } = useSpeechSynthesis();

  const handleNewChat = () => {
    stop();
    clearServerSession(sessionId);
    const nextSession = 'sess_' + Math.random().toString(36).substring(2, 9);
    setSessionId(nextSession);
    const resetMessages = [
      {
        role: 'assistant',
        content: 'నమస్కారం! కొత్త సంభాషణ ప్రారంభమైంది. మీ ప్రశ్న అడగండి.\nNew session started. How can I help you today?',
        language: selectedLanguage === 'auto' ? 'te-IN' : selectedLanguage,
        verified: false,
        modelUsed: 'gemini-4-hydrogen',
        agentTrace: ['OrchestratorAgent: Reset Session'],
        sources: []
      }
    ];
    setMessages(resetMessages);
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
        enableResearch: false,
        includeAudio: Boolean(options.fromVoice)
      });

      const aiMsg = {
        role: 'assistant',
        content: data.response,
        language: data.language || effectiveLanguage,
        detectedLanguage: data.detected_language,
        modelUsed: data.model_used,
        verified: data.verified,
        agentTrace: data.agent_trace || [],
        sources: data.sources || [],
        audioBase64: data.audio_base64 || null
      };

      setMessages((prev) => [...prev, aiMsg]);
      speak(data.response, data.language || effectiveLanguage, data.audio_base64 || null);

    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        role: 'assistant',
        content: 'Kshaminchandi / Sorry, could not connect to the AI engine. Please ensure the server is running.',
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

  const handleLaunchPlayground = () => {
    const consoleEl = document.getElementById('voice-console-section');
    consoleEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5faf7] text-slate-800 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Header with restored BhashaBridge branding & language options */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onNewChat={handleNewChat}
        isScrolling={isScrolling}
        blurAmount={blurAmount}
      />

      {/* Main Content with Dynamic Scroll Motion Blur */}
      <main
        style={motionBlurStyle}
        className="w-full pt-16 flex-1 flex flex-col motion-blur-active"
      >
        
        {/* 2. Hero with restored BhashaBridge tagline */}
        <HeroSection onLaunchPlayground={handleLaunchPlayground} />

        {/* 3. Emerald Voice Console with AI chat, speech, Listen Aloud & RAG */}
        <VoiceConsole
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          speak={speak}
          stop={stop}
          isPlaying={isPlaying}
          enableRag={enableRag}
          setEnableRag={setEnableRag}
        />

        {/* 4. 7-Agent Swarm Mesh Topology */}
        <SwarmMeshSection />

        {/* 5. 4 Capabilities (Multilingual, Voice, RAG, Use Cases) */}
        <CapabilitiesSection />

      </main>

      {/* 6. Sovereign Footer */}
      <SovereignFooter />

    </div>
  );
}
