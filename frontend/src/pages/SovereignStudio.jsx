import React, { useState } from 'react';
import Header from '../components/Header';
import VoiceConsole from '../components/VoiceConsole';
import SwarmMeshSection from '../components/SwarmMeshSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import SovereignFooter from '../components/SovereignFooter';
import MosaicPromptTemplate from '../components/ui/mosaic-prompt-template';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { sendChatMessage, clearServerSession } from '../services/api';

const STORAGE_KEY_MESSAGES = 'bhashabridge_studio_history';
const STORAGE_KEY_SESSION = 'bhashabridge_studio_session';

const INITIAL_STUDIO_MESSAGES = [
  {
    role: 'assistant',
    content: 'నమస్కారం! నేను భాషాబ్రిడ్జ్ (BhashaBridge AI). నేను తెలుగు, हिन्दी మరియు English లో పీఎం కిసాన్, రైతు భరోసా, ఆయుష్మాన్ భారత్ వంటి పథకాల సమాచారాన్ని అందించగలను.\n\nNamaste! I am BhashaBridge AI. Speak or type your question in Telugu, Hindi, or English.',
    language: 'te-IN',
    verified: true,
    modelUsed: 'BhashaBridge AI',
    agentTrace: [],
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
  
  // Persist selected language from localStorage or default to 'auto'
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('bhashabridge_selected_code') || 'auto';
  });
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

  // Voice Output (TTS) with play, pause, resume, stop, and replay
  const { speak, stop, pause, resume, replay, isPlaying, isPaused } = useSpeechSynthesis();

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code);
    localStorage.setItem('bhashabridge_selected_code', code);
  };

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
        modelUsed: 'BhashaBridge AI',
        agentTrace: [],
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

  const handleMosaicSubmit = ({ prompt, platform, model, files }) => {
    // Connect template submission directly to existing AI Engine
    const fullPrompt = files && files.length > 0 
      ? `${prompt} (Platform: ${platform}, Model: ${model}, Attached: ${files.join(', ')})`
      : prompt;
    handleSendMessage(fullPrompt);
    
    // Smoothly scroll to the voice console conversation section
    setTimeout(() => {
      const consoleEl = document.getElementById('voice-console-section');
      consoleEl?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#f5f5f6] flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* 1. Header with complete 9-item navigation & dynamic multilingual switch */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onNewChat={handleNewChat}
      />

      {/* 2. Mosaic Prompt Template Hero, 6 Features, and 3 Plans with WebGL Sky */}
      <MosaicPromptTemplate
        brand="BhashaBridge AI"
        accent="ice"
        headline={["Voice AI For Bharat", "Talk In Any Language"]}
        prompts={[
          "రైతు భరోసా పథకం ఎలిజిబిలిటీ వివరాలు మరియు దరఖాస్తు విధానం...",
          "पीएम किसान सम्मान निधि 6000 रुपये बैंक खाते में कैसे मिलते हैं...",
          "How to apply for Ayushman Bharat health card online...",
          "PM Kisan eligibility enti? Code-mixed Telugu-English...",
        ]}
        platforms={[
          { label: "Voice Assistant", icon: "chat" },
          { label: "Citizen Web", icon: "window" },
          { label: "Mobile App", icon: "phone" },
          { label: "Gov Dashboard", icon: "bars" },
        ]}
        models={["Gemini 2.5 Flash", "Llama 3.3 70B", "DeepSeek R1"]}
        featuresTitle="Sovereign AI"
        featuresLede="Full-stack Indic voice intelligence engineered for 1.4 billion citizens across regional dialects with zero paid token fees."
        features={[
          { icon: "chat", title: "Multilingual & Dialects", body: "Fluent native Telugu, Hindi, and Indian English with robust understanding of everyday Tenglish and Hinglish code-mixing." },
          { icon: "phone", title: "Real Voice In & Out", body: "Client-native Web Speech recording and high-fidelity regional speech synthesis with pause, resume, and instant replay." },
          { icon: "code", title: "7-Agent Architecture", body: "Modular autonomous mesh: Orchestrator, Language Intelligence, Vector RAG, Gov Research, Response, Audit, and Voice agents." },
          { icon: "spark", title: "ChromaDB RAG Grounding", body: "Local vector search retrieves verified guidelines for PM-Kisan, PMAY, and Ayushman Bharat directly from official docs." },
          { icon: "eye", title: "Anti-Hallucination Audit", body: "Verification Agent cross-checks generated subsidy percentages and dates against official sources before answering." },
          { icon: "rocket", title: "100% Free-First Model", body: "Strictly configured with verified OpenRouter Free-tier models and browser Web Speech with zero commercial API costs." },
        ]}
        pricingTitle="Open Access"
        pricingLede="Sovereign infrastructure built for citizens, developers, and public welfare. Transparent and accessible everywhere."
        plans={[
          { name: "Citizen Free", price: 0, blurb: "Unlimited public voice inquiries in Telugu, Hindi & English.", features: ["Full voice recording & TTS", "Verified scheme RAG lookup", "Code-mixed speech support", "Mobile browser native"], cta: "Start Inquiring" },
          { name: "Gram Panchayat", price: 0, blurb: "For local community kiosks and village administration centres.", features: ["Offline-capable vector sync", "Multi-user citizen queue", "Kiosk audio playback", "Zero subscription fees"], cta: "Deploy Kiosk", featured: true, badge: "Community" },
          { name: "Developer", price: 0, blurb: "Open API integration for researchers and public service apps.", features: ["FastAPI REST endpoints", "7-Agent orchestration trace", "Custom ChromaDB indexing", "OpenRouter free router"], cta: "View API Docs" },
        ]}
        footerNote="Built for 1.4B Indian Citizens • National Hackathon 2026."
        onSubmit={handleMosaicSubmit}
        onGetStarted={() => {
          const consoleEl = document.getElementById('voice-console-section');
          consoleEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        onPlanSelect={() => {
          const consoleEl = document.getElementById('voice-console-section');
          consoleEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Enlarged Dark Glass Voice Console with AI Chat, Speech Recording, Listen Aloud & RAG */}
      <div className="relative z-10 w-full bg-[#050506] pb-12 pt-4">
        <VoiceConsole
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
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

        {/* 4. 7-Agent Swarm Mesh Topology */}
        <SwarmMeshSection />

        {/* 5. 4 Core Capabilities */}
        <CapabilitiesSection />
      </div>

      {/* 6. Sovereign Footer with Pixel Wordmark */}
      <SovereignFooter />

    </div>
  );
}
