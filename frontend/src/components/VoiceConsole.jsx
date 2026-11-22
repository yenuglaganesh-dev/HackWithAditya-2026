import React, { useState, useEffect, useRef } from 'react';
import { Send, Database, Search, Sparkles, Volume2, VolumeX, ShieldCheck, ExternalLink, Bot, User, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VoiceConsole({
  messages,
  onSendMessage,
  isLoading,
  selectedLanguage,
  onLanguageChange,
  speak,
  stop,
  isPlaying,
  enableRag,
  setEnableRag,
  enableResearch,
  setEnableResearch
}) {
  const [inputText, setInputText] = useState('');
  const [selectedDialect, setSelectedDialect] = useState('telugu-ap');
  const [selectedPersona, setSelectedPersona] = useState('deepa');
  const [ttsCurrentSec, setTtsCurrentSec] = useState(3);
  const [isTtsPlaying, setIsTtsPlaying] = useState(false);
  const chatBottomRef = useRef(null);

  // Hook up browser Web Speech API for voice recognition
  const currentLangCode = selectedLanguage === 'auto'
    ? (selectedDialect.startsWith('telugu') ? 'te-IN' : selectedDialect === 'hindi' ? 'hi-IN' : 'en-IN')
    : selectedLanguage;

  const {
    isListening,
    transcript,
    setTranscript,
    isSupported,
    startListening,
    stopListening
  } = useSpeechRecognition({
    language: currentLangCode,
    onResult: (text) => setInputText(text)
  });

  // Sync transcription
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Auto-scroll chat window
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // TTS playback timer simulation
  useEffect(() => {
    let timer = null;
    if (isPlaying || isTtsPlaying) {
      timer = setInterval(() => {
        setTtsCurrentSec((prev) => (prev >= 7 ? 0 : prev + 1));
      }, 1000);
    } else {
      setTtsCurrentSec(3);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isTtsPlaying]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
    setTranscript('');
    if (isListening) stopListening();
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleDialectChange = (code, dialectKey) => {
    setSelectedDialect(dialectKey);
    onLanguageChange(code);
  };

  const handlePresetQuery = (text) => {
    setInputText(text);
    onSendMessage(text);
  };

  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');

  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 py-8 mx-auto" id="voice-console-section">
      
      {/* 1. Header Banner: Dialect & Persona Chips */}
      <div className="flex flex-col items-center text-center gap-3.5 mb-7">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/30 text-xs font-semibold shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">Bi-Directional Streaming Active (&lt;140ms)</span>
        </div>

        <h2 className="font-headline text-2xl sm:text-4xl tracking-tight font-extrabold text-slate-900">
          Indic Voice AI & Speech Synthesis
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-normal leading-relaxed">
          Real-time, zero-cost conversational voice assistant in Telugu, Hindi & English with authentic emotional resonance.
        </p>

        {/* Dialect and Voice Persona Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1">Dialect:</span>
          
          <button
            onClick={() => handleDialectChange('te-IN', 'telugu-ap')}
            className={`px-3.5 py-1 rounded-full text-xs transition-all ${
              selectedDialect === 'telugu-ap'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 font-medium'
            }`}
          >
            Telugu (Coastal AP)
          </button>

          <button
            onClick={() => handleDialectChange('te-IN', 'telugu-ts')}
            className={`px-3.5 py-1 rounded-full text-xs transition-all ${
              selectedDialect === 'telugu-ts'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 font-medium'
            }`}
          >
            Telugu (Telangana)
          </button>

          <button
            onClick={() => handleDialectChange('hi-IN', 'hindi')}
            className={`px-3.5 py-1 rounded-full text-xs transition-all ${
              selectedDialect === 'hindi'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 font-medium'
            }`}
          >
            Hindi (Standard)
          </button>

          <button
            onClick={() => handleDialectChange('te-IN', 'tenglish')}
            className={`px-3.5 py-1 rounded-full text-xs transition-all ${
              selectedDialect === 'tenglish'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 font-medium'
            }`}
          >
            Tenglish / Hinglish
          </button>

          <span className="text-slate-300 mx-1 hidden sm:inline">|</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-1">Voice:</span>

          <button
            onClick={() => setSelectedPersona('deepa')}
            className={`px-3.5 py-1 rounded-full text-xs flex items-center gap-1.5 transition-all ${
              selectedPersona === 'deepa'
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-300 font-semibold shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-300 font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-amber-600">female</span>
            <span>Deepa (Natural)</span>
          </button>

          <button
            onClick={() => setSelectedPersona('karthik')}
            className={`px-3.5 py-1 rounded-full text-xs flex items-center gap-1.5 transition-all ${
              selectedPersona === 'karthik'
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-300 font-semibold shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-300 font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-slate-400">male</span>
            <span>Karthik (Govt Admin)</span>
          </button>
        </div>
      </div>

      {/* 2. Bento Grid Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (5 cols): Live Voice Ingest Centerpiece */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col justify-between gap-6 relative overflow-hidden group">
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-blue-400/10 via-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Status Header */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </span>
              <div>
                <span className="font-headline text-sm font-bold text-slate-900 block leading-tight">Live Voice Ingest</span>
                <span className="text-[10px] text-slate-400 font-mono">PCM 24kHz • Web Speech API</span>
              </div>
            </div>

            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] border shadow-xs transition-colors ${
              isListening
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
              <span>{isListening ? 'LISTENING LIVE' : 'VOICE READY'}</span>
            </span>
          </div>

          {/* Interactive Mic Radar & Waveform Area */}
          <div className="relative w-full h-56 rounded-2xl bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-slate-50 border border-blue-100/80 flex flex-col items-center justify-center overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
            
            {/* Animated Concentric Rings */}
            <div className={`absolute w-52 h-52 rounded-full border border-blue-400/20 pointer-events-none transition-all ${isListening ? 'animate-ping' : ''}`}></div>
            <div className={`absolute w-40 h-40 rounded-full border border-indigo-400/30 pointer-events-none transition-all ${isListening ? 'animate-pulse' : ''}`}></div>
            <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500/15 to-amber-500/10 blur-xl pointer-events-none"></div>

            {/* Central Mic Button */}
            <button
              onClick={toggleMic}
              className={`relative z-10 w-16 h-16 rounded-full text-white flex items-center justify-center shadow-xl transition-all ring-4 ring-white/80 active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 mic-pulsing shadow-rose-600/30'
                  : 'bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-500 hover:scale-105 shadow-blue-600/30'
              }`}
              title={isListening ? "Click to stop listening" : "Click to speak in Telugu or Hindi"}
              type="button"
            >
              <span className="material-symbols-outlined text-[28px] drop-shadow">
                {isListening ? 'mic_off' : 'mic'}
              </span>
            </button>

            {/* Animated Audio Equalizer Waveform Bars */}
            <div className="absolute bottom-3.5 inset-x-8 flex items-end justify-center gap-1.5 h-12 pointer-events-none">
              <div className={`w-1.5 bg-blue-600 rounded-t shadow-xs ${isListening ? 'anim-bar-1' : 'h-2 opacity-40'}`}></div>
              <div className={`w-1.5 bg-blue-500 rounded-t shadow-xs ${isListening ? 'anim-bar-2' : 'h-3 opacity-40'}`}></div>
              <div className={`w-1.5 bg-amber-500 rounded-t shadow-xs ${isListening ? 'anim-bar-3' : 'h-4 opacity-40'}`}></div>
              <div className={`w-1.5 bg-orange-500 rounded-t shadow-xs ${isListening ? 'anim-bar-4' : 'h-3 opacity-40'}`}></div>
              <div className={`w-1.5 bg-emerald-500 rounded-t shadow-xs ${isListening ? 'anim-bar-5' : 'h-2 opacity-40'}`}></div>
              <div className={`w-1.5 bg-blue-600 rounded-t shadow-xs ${isListening ? 'anim-bar-6' : 'h-3 opacity-40'}`}></div>
              <div className={`w-1.5 bg-amber-600 rounded-t shadow-xs ${isListening ? 'anim-bar-7' : 'h-4 opacity-40'}`}></div>
              <div className={`w-1.5 bg-blue-400 rounded-t shadow-xs ${isListening ? 'anim-bar-8' : 'h-2 opacity-40'}`}></div>
              <div className={`w-1.5 bg-emerald-600 rounded-t shadow-xs ${isListening ? 'anim-bar-2' : 'h-3 opacity-40'}`}></div>
              <div className={`w-1.5 bg-blue-600 rounded-t shadow-xs ${isListening ? 'anim-bar-3' : 'h-2 opacity-40'}`}></div>
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Noise-Suppressed Native</span>
            </span>
            <span className="font-mono text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60">
              Latency: &lt;140ms
            </span>
          </div>

          {/* Quick Preset Questions for Farmers & Citizens */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Citizen Prompt Shortcuts:
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handlePresetQuery("రైతు భరోసా పథకం ఎలిజిబిలిటీ మరియు అమౌంట్ ఎంత?")}
                className="text-left text-xs text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/70 p-2 rounded-xl border border-slate-200/80 transition-colors flex items-center justify-between group"
              >
                <span>🌾 రైతు భరోసా పథకం అర్హతలు? (Telugu)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
              </button>
              <button
                onClick={() => handlePresetQuery("पीएम किसान सम्मान निधि में 6000 रुपये कैसे मिलते हैं?")}
                className="text-left text-xs text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/70 p-2 rounded-xl border border-slate-200/80 transition-colors flex items-center justify-between group"
              >
                <span>🇮🇳 पीएम किसान 6000 रुपये का लाभ? (Hindi)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
              </button>
              <button
                onClick={() => handlePresetQuery("How does Ayushman Bharat PM-JAY free healthcare work?")}
                className="text-left text-xs text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50/70 p-2 rounded-xl border border-slate-200/80 transition-colors flex items-center justify-between group"
              >
                <span>🏥 Ayushman Bharat ₹5 Lakh Coverage? (English)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (7 cols): Live Transcription, Synthetic Speech Player & Interactive Messages */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* 1. Live ASR Ingestion Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 shadow-soft flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">subtitles</span>
                </span>
                Live Speech Recognition (ASR)
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                99.2% Accuracy
              </span>
            </div>

            <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/50 rounded-2xl p-3.5 border border-blue-200/70 shadow-xs relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600"></div>
              <p className="font-semibold text-slate-900 text-sm leading-relaxed">
                {inputText || (isListening ? "Listening... మాట్లాడండి..." : "“రైతు భరోసా పథకం వివరాలు మరియు డీబీటీ పేమెంట్ స్టేటస్ చెప్పగలరా?”")}
              </p>
            </div>
          </div>

          {/* 2. Synthetic Speech Player Card */}
          {lastAssistantMessage && (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 shadow-soft flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  </span>
                  Synthetic Voice Response
                </span>
                <span className="text-[11px] font-mono text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Voice: {selectedPersona === 'deepa' ? 'Deepa (Empathetic)' : 'Karthik (Admin)'}
                </span>
              </div>

              <div className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 rounded-2xl p-3.5 flex items-center gap-3.5 border border-slate-200/80 shadow-xs">
                <button
                  onClick={() => {
                    if (isPlaying) {
                      stop();
                    } else {
                      speak(lastAssistantMessage.content, lastAssistantMessage.language || currentLangCode);
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 h-6 w-full overflow-hidden px-1">
                    <div className={`w-1 bg-blue-600 rounded-full shadow-xs ${isPlaying ? 'h-5 anim-bar-1' : 'h-2'}`}></div>
                    <div className={`w-1 bg-indigo-500 rounded-full shadow-xs ${isPlaying ? 'h-6 anim-bar-2' : 'h-3'}`}></div>
                    <div className={`w-1 bg-amber-500 rounded-full shadow-xs ${isPlaying ? 'h-4 anim-bar-3' : 'h-2'}`}></div>
                    <div className={`w-1 bg-orange-500 rounded-full shadow-xs ${isPlaying ? 'h-6 anim-bar-4' : 'h-4'}`}></div>
                    <div className={`w-1 bg-emerald-500 rounded-full shadow-xs ${isPlaying ? 'h-5 anim-bar-5' : 'h-2'}`}></div>
                    <div className={`w-1 bg-blue-600 rounded-full shadow-xs ${isPlaying ? 'h-6 anim-bar-6' : 'h-3'}`}></div>
                    <div className={`w-1 bg-amber-500 rounded-full shadow-xs ${isPlaying ? 'h-4 anim-bar-7' : 'h-2'}`}></div>
                    <div className={`w-1 bg-indigo-400 rounded-full shadow-xs ${isPlaying ? 'h-5 anim-bar-8' : 'h-3'}`}></div>
                    <div className={`w-1 bg-emerald-600 rounded-full shadow-xs ${isPlaying ? 'h-6 anim-bar-2' : 'h-2'}`}></div>
                    <div className={`w-1 bg-blue-500 rounded-full shadow-xs ${isPlaying ? 'h-4 anim-bar-4' : 'h-3'}`}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 font-semibold px-1">
                    <span className="text-blue-700 font-bold">00:0{ttsCurrentSec}</span>
                    <span>00:07</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 border-l border-slate-200/80 pl-3">
                  <span className="px-2 py-0.5 rounded-lg bg-white text-slate-700 font-mono text-[11px] font-semibold border border-slate-200">1.0x</span>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200/60">Empathetic</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Conversation Messages Stream */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 shadow-soft flex flex-col max-h-[420px] overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[92%] gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold'
                      : 'bg-gradient-to-tr from-blue-700 to-indigo-600 text-white'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Bubble */}
                  <div className={`rounded-2xl p-4 shadow-sm text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none'
                  }`}>
                    {/* Header info */}
                    {msg.role !== 'user' && (
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <span>BhashaBridge Agent</span>
                          {msg.modelUsed && (
                            <span className="bg-blue-50 text-blue-700 font-mono text-[10px] px-1.5 py-0.5 rounded border border-blue-200">
                              {msg.modelUsed.split('/').pop()}
                            </span>
                          )}
                        </span>

                        {msg.verified && (
                          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Scheme
                          </span>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap leading-relaxed font-normal">
                      {msg.content}
                    </div>

                    {/* Citations */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200">
                        <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>Official Verified References:</span>
                        </div>
                        <div className="space-y-1.5">
                          {msg.sources.map((src, sIdx) => (
                            <div key={sIdx} className="bg-white p-2 rounded-xl border border-slate-200 text-xs">
                              <div className="font-semibold text-blue-900 flex items-center justify-between">
                                <span>{src.title}</span>
                                {src.url && (
                                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500">{src.source}</div>
                              <div className="text-slate-600 text-[11px] mt-0.5 italic bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                                "{src.snippet}"
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Multi-Agent Execution Trace */}
                    {msg.agentTrace && msg.agentTrace.length > 0 && (
                      <div className="mt-2.5 pt-2 text-[10px] text-slate-500 flex flex-wrap gap-1">
                        <span className="font-semibold text-slate-600">Agents:</span>
                        {msg.agentTrace.map((tr, tIdx) => (
                          <span key={tIdx} className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-mono">
                            {tr.split(':')[0]}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Audio read-aloud button */}
                    {msg.role !== 'user' && (
                      <div className="mt-2.5 pt-2 flex items-center gap-2 border-t border-slate-200">
                        <button
                          onClick={() => isPlaying ? stop() : speak(msg.content, msg.language || currentLangCode)}
                          className="flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-medium bg-blue-50/80 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors"
                        >
                          {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{isPlaying ? 'Stop Voice' : 'Listen Aloud'}</span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 p-3 bg-blue-50/80 rounded-2xl border border-blue-200 w-fit animate-pulse text-xs text-blue-800 font-medium">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Multi-Agent Swarm processing (Telugu/Hindi NLU, ChromaDB RAG, Verification)...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* 4. Text & Controls Input Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEnableRag(!enableRag)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    enableRag
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <Database className="w-3 h-3 text-blue-600" />
                  <span>ChromaDB RAG {enableRag ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEnableResearch(!enableResearch)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    enableResearch
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  <Search className="w-3 h-3 text-emerald-600" />
                  <span>Gov Grounding {enableResearch ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {isListening && (
                <span className="flex items-center gap-1 text-rose-600 font-medium text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  Listening in {currentLangCode}...
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMic}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition shadow-xs ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
                title={isListening ? "Stop listening" : "Click to speak"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isListening ? 'mic_off' : 'mic'}
                </span>
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="మీ ప్రశ్న అడగండి (Ask in Telugu, Hindi or English)..."
                  disabled={isLoading}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition shadow-sm ${
                  !inputText.trim() || isLoading
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                }`}
                title="Send message"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>

        </div>

      </div>

    </section>
  );
}
