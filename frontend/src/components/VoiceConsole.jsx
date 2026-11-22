import React, { useState, useEffect, useRef } from 'react';
import { Send, Database, Volume2, VolumeX, ShieldCheck, ExternalLink, Bot, User, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
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
  setEnableRag
}) {
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef(null);

  const currentLangCode = selectedLanguage === 'auto' ? 'te-IN' : selectedLanguage;

  const {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening
  } = useSpeechRecognition({
    language: currentLangCode,
    onResult: (text) => setInputText(text)
  });

  // Sync speech transcript
  useEffect(() => {
    if (transcript) setInputText(transcript);
  }, [transcript]);

  // Auto-scroll
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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

  const lastAssistantMsg = [...messages].reverse().find(m => m.role === 'assistant');

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 py-6 mx-auto" id="voice-console-section">
      
      {/* Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Column (5 cols): Minimal Emerald Voice Ingest */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-emerald-100 shadow-soft flex flex-col justify-between gap-5 relative overflow-hidden">
          
          {/* Status Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-headline text-sm font-bold text-emerald-950">
                Voice Assistant
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isListening ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {isListening ? 'Listening...' : 'Ready'}
            </span>
          </div>

          {/* Interactive Emerald Mic & Waveform Area */}
          <div className="relative w-full h-52 rounded-2xl bg-gradient-to-b from-emerald-50/60 to-white border border-emerald-100 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Concentric Pulse Rings */}
            <div className={`absolute w-44 h-44 rounded-full border border-emerald-300/30 pointer-events-none transition-all ${isListening ? 'animate-ping' : ''}`} />
            <div className={`absolute w-32 h-32 rounded-full border border-emerald-400/30 pointer-events-none transition-all ${isListening ? 'animate-pulse' : ''}`} />

            {/* Main Emerald Mic Button */}
            <button
              onClick={toggleMic}
              className={`relative z-10 w-16 h-16 rounded-full text-white flex items-center justify-center shadow-lg transition-all active:scale-95 ${
                isListening
                  ? 'bg-rose-600 mic-pulsing shadow-rose-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 shadow-emerald-600/30 ring-4 ring-emerald-100'
              }`}
              title={isListening ? "Click to stop" : "Click to speak in Telugu or Hindi"}
              type="button"
            >
              <span className="material-symbols-outlined text-[28px]">
                {isListening ? 'mic_off' : 'mic'}
              </span>
            </button>

            {/* Minimal Audio Equalizer Waveform */}
            <div className="absolute bottom-3 inset-x-8 flex items-end justify-center gap-1.5 h-10 pointer-events-none">
              <div className={`w-1.5 bg-emerald-600 rounded-t ${isListening ? 'anim-bar-1' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-500 rounded-t ${isListening ? 'anim-bar-2' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-500 rounded-t ${isListening ? 'anim-bar-3' : 'h-4 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-400 rounded-t ${isListening ? 'anim-bar-4' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-600 rounded-t ${isListening ? 'anim-bar-5' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-600 rounded-t ${isListening ? 'anim-bar-6' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-500 rounded-t ${isListening ? 'anim-bar-7' : 'h-4 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-400 rounded-t ${isListening ? 'anim-bar-8' : 'h-2 opacity-30'}`} />
            </div>
          </div>

          {/* Quick Citizen Prompt Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-emerald-900/60 uppercase tracking-wider block">
              Suggested Questions:
            </span>
            <button
              onClick={() => { setInputText('రైతు భరోసా పథకం ఎలిజిబిలిటీ వివరాలు?'); onSendMessage('రైతు భరోసా పథకం ఎలిజిబిలిటీ వివరాలు?'); }}
              className="w-full text-left text-xs text-slate-700 hover:text-emerald-800 bg-emerald-50/50 hover:bg-emerald-50 p-2 rounded-xl border border-emerald-100 transition-colors flex items-center justify-between"
            >
              <span>🌾 రైతు భరోసా పథకం వివరాలు? (Telugu)</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </button>
            <button
              onClick={() => { setInputText('पीएम किसान सम्मान निधि 6000 रुपये कैसे मिलते हैं?'); onSendMessage('पीएम किसान सम्मान निधि 6000 रुपये कैसे मिलते हैं?'); }}
              className="w-full text-left text-xs text-slate-700 hover:text-emerald-800 bg-emerald-50/50 hover:bg-emerald-50 p-2 rounded-xl border border-emerald-100 transition-colors flex items-center justify-between"
            >
              <span>🇮🇳 पीएम किसान योजना की शर्तें? (Hindi)</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </button>
          </div>

        </div>

        {/* Right Column (7 cols): Clean, Minimal Chat & Conversation */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          
          {/* Live ASR Ingest Bubble (Compact) */}
          {inputText && (
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">subtitles</span>
              <span className="font-medium text-emerald-950 truncate">{inputText}</span>
            </div>
          )}

          {/* Conversation Stream */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-soft flex flex-col max-h-[380px] overflow-y-auto space-y-3.5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white text-xs ${
                    msg.role === 'user' ? 'bg-emerald-700' : 'bg-emerald-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble */}
                  <div className={`rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-emerald-50/50 border border-emerald-100 text-slate-800 rounded-tl-none'
                  }`}>
                    
                    {/* Assistant Metadata */}
                    {msg.role !== 'user' && (
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-emerald-100 text-[11px] text-emerald-800">
                        <span className="font-semibold">AI Assistant</span>
                        {msg.verified && (
                          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Scheme
                          </span>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Citations (Compact) */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-emerald-100 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          Verified References:
                        </span>
                        {msg.sources.map((s, sIdx) => (
                          <div key={sIdx} className="bg-white p-2 rounded-lg border border-emerald-100 text-[11px] text-emerald-950">
                            <div className="font-semibold flex items-center justify-between">
                              <span>{s.title}</span>
                              {s.url && (
                                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800">
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            <div className="text-slate-500 mt-0.5 italic line-clamp-1">"{s.snippet}"</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Voice Read-Aloud */}
                    {msg.role !== 'user' && (
                      <div className="mt-2 pt-1.5 flex items-center gap-2">
                        <button
                          onClick={() => isPlaying ? stop() : speak(msg.content, msg.language || currentLangCode)}
                          className="flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-medium bg-white hover:bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 transition-colors"
                        >
                          {isPlaying ? <VolumeX className="w-3 h-3 text-rose-600" /> : <Volume2 className="w-3 h-3" />}
                          <span>{isPlaying ? 'Stop' : 'Listen'}</span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-2xl border border-emerald-200 w-fit text-xs text-emerald-800 font-medium">
                <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Generating regional response with verified citations...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Minimal Input Bar */}
          <div className="bg-white rounded-2xl p-2.5 border border-emerald-100 shadow-soft">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              
              <button
                type="button"
                onClick={toggleMic}
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                  isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                }`}
                title={isListening ? "Stop listening" : "Click to speak"}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isListening ? 'mic_off' : 'mic'}
                </span>
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="మీ ప్రశ్న అడగండి (Ask in Telugu, Hindi or English)..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 px-2 py-1 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
              />

              <button
                type="button"
                onClick={() => setEnableRag(!enableRag)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                  enableRag ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'text-slate-400 border-slate-200'
                }`}
                title="Toggle ChromaDB RAG Knowledge"
              >
                RAG {enableRag ? 'ON' : 'OFF'}
              </button>

              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white transition ${
                  !inputText.trim() || isLoading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>

            </form>
          </div>

        </div>

      </div>

    </section>
  );
}
