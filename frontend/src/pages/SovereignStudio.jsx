import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import VoiceConsole from '../components/VoiceConsole';
import SwarmMeshSection from '../components/SwarmMeshSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import SwarmRunnerSection from '../components/SwarmRunnerSection';
import TelephonyFlowSection from '../components/TelephonyFlowSection';
import SovereignFooter from '../components/SovereignFooter';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { sendChatMessage } from '../services/api';

export default function SovereignStudio() {
  const [sessionId, setSessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const [selectedLanguage, setSelectedLanguage] = useState('te-IN');
  const [enableRag, setEnableRag] = useState(true);
  const [enableResearch, setEnableResearch] = useState(false);
  const [activeTab, setActiveTab] = useState('console');
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'నమస్కారం! నేను AI for Bharat (భాషాబ్రిడ్జ్ వాయిస్ అసిస్టెంట్). నేను తెలుగు, हिन्दी మరియు English లో పీఎం కిసాన్, రైతు భరోసా, ఆయుష్మాన్ భారత్ వంటి ప్రభుత్వ సంక్షేమ పథకాల సమాచారాన్ని అందించగలను.\n\nNamaste! I am the AI for Bharat assistant. Speak or type your question in Telugu, Hindi, or English.',
      language: 'te-IN',
      verified: true,
      modelUsed: 'openrouter/free',
      agentTrace: ['NagrikOrchestrator: Ready', 'LanguageAgent: Telugu/Hindi/English Initialized', 'KnowledgeAgent: ChromaDB Synced'],
      sources: [
        {
          title: "PM Kisan Samman Nidhi Guidelines",
          source: "Department of Agriculture and Farmers Welfare (pmkisan.gov.in)",
          snippet: "Income support of Rs 6,000 per year in three equal installments of Rs 2,000 directly to bank accounts."
        }
      ]
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // Free Client-Native Speech Synthesis (TTS)
  const { speak, stop, isPlaying } = useSpeechSynthesis();

  const handleNewChat = () => {
    stop();
    setSessionId('sess_' + Math.random().toString(36).substring(2, 9));
    setMessages([
      {
        role: 'assistant',
        content: 'నమస్కారం! కొత్త సంభాషణ ప్రారంభమైంది. మీ ప్రశ్న అడగండి.\nNew session started. How can I assist you today?',
        language: selectedLanguage,
        verified: true,
        modelUsed: 'openrouter/free',
        agentTrace: ['NagrikOrchestrator: Reset Session'],
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

  const handleSelectScenario = (promptText) => {
    handleSendMessage(promptText);
    const consoleEl = document.getElementById('voice-console-section');
    consoleEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLaunchPlayground = () => {
    setActiveTab('console');
    const consoleEl = document.getElementById('voice-console-section');
    consoleEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreMesh = () => {
    setActiveTab('mesh');
    const meshEl = document.getElementById('agents-mesh-section');
    meshEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-800 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Sovereign Header */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onNewChat={handleNewChat}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-16 flex-1 flex flex-col">
        
        {/* 2. Decluttered Hero Section */}
        <HeroSection
          onLaunchPlayground={handleLaunchPlayground}
          onExploreMesh={handleExploreMesh}
        />

        {/* 3. Indic Voice AI & Live Multi-Agent Console */}
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
          enableResearch={enableResearch}
          setEnableResearch={setEnableResearch}
        />

        {/* 4. Autonomous Swarm Mesh (4-Node Topology Canvas) */}
        <SwarmMeshSection />

        {/* 5. 4 Core Capabilities */}
        <CapabilitiesSection />

        {/* 6. Interactive Swarm Runner (1-Click Simulations) */}
        <SwarmRunnerSection onSelectScenario={handleSelectScenario} />

        {/* 7. Telephony Contact Center Flow */}
        <TelephonyFlowSection onOpenConsole={handleLaunchPlayground} />

      </main>

      {/* 8. Minimal Civic Footer */}
      <SovereignFooter />

    </div>
  );
}
