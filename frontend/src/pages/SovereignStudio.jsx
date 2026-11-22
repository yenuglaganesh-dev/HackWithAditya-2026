import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import VoiceConsole from '../components/VoiceConsole';
import SwarmMeshSection from '../components/SwarmMeshSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import SovereignFooter from '../components/SovereignFooter';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useScrollMotionBlur } from '../hooks/useScrollMotionBlur';
import { sendChatMessage } from '../services/api';

export default function SovereignStudio() {
  const [sessionId, setSessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [selectedLanguage, setSelectedLanguage] = useState('te-IN');
  const [enableRag, setEnableRag] = useState(true);
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'నమస్కారం! నేను AI for Bharat వాయిస్ అసిస్టెంట్. నేను తెలుగు, हिन्दी మరియు English లో పీఎం కిసాన్, రైతు భరోసా, ఆయుష్మాన్ భారత్ వంటి పథకాల సమాచారాన్ని అందించగలను.\n\nNamaste! Speak or type your question in Telugu, Hindi, or English.',
      language: 'te-IN',
      verified: true,
      modelUsed: 'openrouter/free',
      agentTrace: ['NagrikOrchestrator: Ready', 'LanguageAgent: te/hi/en', 'KnowledgeAgent: ChromaDB Synced'],
      sources: [
        {
          title: "PM Kisan Samman Nidhi",
          source: "pmkisan.gov.in",
          snippet: "Annual income support of Rs 6,000 in three equal installments of Rs 2,000 directly to bank accounts."
        }
      ]
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // Motion blur when scrolling up or down
  const { blurAmount, isScrolling, motionBlurStyle } = useScrollMotionBlur();

  // Free Client-Native Speech Synthesis (TTS)
  const { speak, stop, isPlaying } = useSpeechSynthesis();

  const handleNewChat = () => {
    stop();
    setSessionId('sess_' + Math.random().toString(36).substring(2, 9));
    setMessages([
      {
        role: 'assistant',
        content: 'నమస్కారం! కొత్త సంభాషణ ప్రారంభమైంది. మీ ప్రశ్న అడగండి.\nNew session started. How can I help you today?',
        language: selectedLanguage,
        verified: true,
        modelUsed: 'openrouter/free',
        agentTrace: ['NagrikOrchestrator: Reset'],
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
        enableResearch: false
      });

      const aiMsg = {
        role: 'assistant',
        content: data.response,
        language: data.language || selectedLanguage,
        detectedLanguage: data.detected_language,
        modelUsed: data.model_used,
        verified: data.verified,
        agentTrace: data.agent_trace || [],
        sources: data.sources || []
      };

      setMessages((prev) => [...prev, aiMsg]);
      speak(data.response, data.language || selectedLanguage);

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

  const handleLaunchPlayground = () => {
    const consoleEl = document.getElementById('voice-console-section');
    consoleEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5faf7] text-slate-800 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Minimal Header */}
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
        
        {/* 2. Minimal Hero */}
        <HeroSection onLaunchPlayground={handleLaunchPlayground} />

        {/* 3. Minimal Emerald Voice Console */}
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

        {/* 4. Minimal Swarm Mesh */}
        <SwarmMeshSection />

        {/* 5. Minimal 4 Capabilities */}
        <CapabilitiesSection />

      </main>

      {/* 6. Clean Minimal Footer */}
      <SovereignFooter />

    </div>
  );
}
