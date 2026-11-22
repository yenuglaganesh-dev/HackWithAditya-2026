import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef(null);

  const currentLangCode = selectedLanguage === 'auto' ? 'auto' : (selectedLanguage.includes('-') ? selectedLanguage : `${selectedLanguage}-IN`);

  const {
    isListening,
    isProcessing,
    transcript,
    setTranscript,
    error: speechError,
    startListening,
    stopListening
  } = useSpeechRecognition({
    language: currentLangCode,
    onResult: (text) => setInputText(text),
    onFinalTranscript: (recognizedText, detectedLang) => {
      if (recognizedText && recognizedText.trim() && !isLoading) {
        onSendMessage(recognizedText.trim(), {
          fromVoice: true,
          detectedLanguage: detectedLang,
        });
        setInputText('');
        setTranscript('');
      }
    }
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

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mx-auto" id="voice-console-section">
      
      {/* Console Grid - Expanded to 12 cols with 5/7 split and larger touch/readability area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (5 cols on desktop, full on mobile): Enhanced Emerald Voice Ingest */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-soft flex flex-col justify-between gap-6 relative overflow-hidden">
          
          {/* Status Header */}
          <div className="flex items-center justify-between pb-2 border-b border-emerald-50">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-100" />
              <span className="font-headline text-base sm:text-lg font-bold text-emerald-950">
                {t('console.title', 'BhashaBridge Voice Assistant')}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isListening ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' : isProcessing ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {isListening ? t('console.listening', 'Listening...') : isProcessing ? 'Recognizing...' : t('console.ready', 'Ready')}
            </span>
          </div>

          {/* Interactive Emerald Mic & Waveform Area (Expanded Height: h-64 sm:h-72) */}
          <div className="relative w-full h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-emerald-50/70 via-emerald-50/30 to-white border border-emerald-100 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Concentric Pulse Rings */}
            <div className={`absolute w-56 h-56 rounded-full border border-emerald-300/30 pointer-events-none transition-all ${isListening ? 'animate-ping' : ''}`} />
            <div className={`absolute w-40 h-40 rounded-full border border-emerald-400/30 pointer-events-none transition-all ${isListening ? 'animate-pulse' : ''}`} />
            <div className={`absolute w-28 h-28 rounded-full border border-emerald-500/20 pointer-events-none transition-all ${isListening ? 'animate-pulse' : ''}`} />

            {/* Main Emerald Mic Button - Increased Size: w-20 h-20 with prominent elevation */}
            <button
              onClick={toggleMic}
              className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-3xl text-white flex items-center justify-center shadow-xl transition-all active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-rose-600 mic-pulsing shadow-rose-600/40 ring-8 ring-rose-100'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 shadow-emerald-600/30 ring-8 ring-emerald-100'
              }`}
              title={isListening ? t('console.clickToStop', 'Click to stop listening') : t('console.clickToSpeak', 'Click to speak in Telugu, Hindi or English')}
              type="button"
              aria-label={isListening ? 'Stop listening' : 'Start microphone'}
            >
              <span className="material-symbols-outlined text-[36px]">
                {isListening ? 'mic_off' : 'mic'}
              </span>
            </button>

            {/* Equalizer Waveform Bars */}
            <div className="absolute bottom-4 inset-x-8 flex items-end justify-center gap-1.5 h-12 pointer-events-none">
              <div className={`w-1.5 bg-emerald-600 rounded-t ${isListening ? 'anim-bar-1' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-500 rounded-t ${isListening ? 'anim-bar-2' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-500 rounded-t ${isListening ? 'anim-bar-3' : 'h-5 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-400 rounded-t ${isListening ? 'anim-bar-4' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-600 rounded-t ${isListening ? 'anim-bar-1' : 'h-6 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-600 rounded-t ${isListening ? 'anim-bar-2' : 'h-4 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-500 rounded-t ${isListening ? 'anim-bar-3' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-400 rounded-t ${isListening ? 'anim-bar-4' : 'h-3 opacity-30'}`} />
            </div>

            {/* Sub-label */}
            <p className="mt-3 text-xs font-semibold text-emerald-800/80 z-10">
              {isListening ? t('console.listening', 'Listening...') : t('console.clickToSpeak', 'Click to speak')}
            </p>
          </div>

          {/* Quick Citizen Prompt Chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-900/70 uppercase tracking-wider block">
              {t('console.suggestedQuestions', 'Suggested Questions (Agriculture, Healthcare, Citizen Schemes):')}
            </span>
            <button
              onClick={() => { setInputText('రైతు భరోసా పథకం ఎలిజిబిలిటీ వివరాలు?'); onSendMessage('రైతు భరోసా పథకం ఎలిజిబిలిటీ వివరాలు?'); }}
              className="w-full text-left text-xs sm:text-sm text-slate-700 hover:text-emerald-900 bg-emerald-50/60 hover:bg-emerald-100/60 p-2.5 rounded-2xl border border-emerald-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>{t('console.q1', '🌾 రైతు భరోసా అర్హత మరియు వివరాలు? (Telugu)')}</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
            </button>
            <button
              onClick={() => { setInputText('पीएम किसान सम्मान निधि 6000 रुपये कैसे मिलते हैं?'); onSendMessage('पीएम किसान सम्मान निधि 6000 रुपये कैसे मिलते हैं?'); }}
              className="w-full text-left text-xs sm:text-sm text-slate-700 hover:text-emerald-900 bg-emerald-50/60 hover:bg-emerald-100/60 p-2.5 rounded-2xl border border-emerald-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>{t('console.q2', '🇮🇳 पीएम किसान योजना की शर्तें? (Hindi)')}</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
            </button>
            <button
              onClick={() => { setInputText('PM Kisan eligibility enti?'); onSendMessage('PM Kisan eligibility enti?'); }}
              className="w-full text-left text-xs sm:text-sm text-slate-700 hover:text-emerald-900 bg-emerald-50/60 hover:bg-emerald-100/60 p-2.5 rounded-2xl border border-emerald-100 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>{t('console.q3', '🗣️ PM Kisan eligibility enti? (Tenglish Code-Mixed)')}</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
            </button>
          </div>

        </div>

        {/* Right Column (7 cols): Expanded Chat & Conversation Panel with comfortable height & spacing */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Live ASR Ingest Bubble */}
          {(inputText || isProcessing || speechError) && (
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3.5 text-xs sm:text-sm flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <span className="material-symbols-outlined text-[18px] text-emerald-700">subtitles</span>
              <span className="font-semibold text-emerald-950 truncate">
                {isProcessing ? 'Recognizing spoken language...' : (inputText || speechError)}
              </span>
            </div>
          )}

          {/* Conversation Stream - Expanded Height from 380px to 480px for spacious reading */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-soft flex flex-col h-[420px] sm:h-[480px] overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[92%] sm:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs shadow-xs ${
                    msg.role === 'user' ? 'bg-emerald-700' : 'bg-emerald-600'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl p-4 sm:p-4.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-[#f7fbf9] border border-emerald-100/80 text-slate-800 rounded-tl-none'
                  }`}>
                    
                    {/* Assistant Metadata Header */}
                    {msg.role !== 'user' && (
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100 text-[11px] text-emerald-800">
                        <span className="font-bold">BhashaBridge AI</span>
                        {msg.verified && msg.sources && msg.sources.length > 0 && (
                          <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100/60 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {t('console.verifiedScheme', 'Verified Scheme')}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-normal text-slate-800">{msg.content}</div>

                    {/* Citations (Shown ONLY when actual sources are retrieved) */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-emerald-100 space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                          {t('console.verifiedReferences', 'Verified References:')}
                        </span>
                        {msg.sources.map((s, sIdx) => (
                          <div key={sIdx} className="bg-white p-2.5 rounded-xl border border-emerald-100 text-xs text-emerald-950 shadow-2xs">
                            <div className="font-bold flex items-center justify-between text-emerald-800">
                              <span>{s.title}</span>
                              {s.url && (
                                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 p-0.5">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <div className="text-slate-500 mt-1 italic line-clamp-2">"{s.snippet}"</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Listen Aloud Button */}
                    {msg.role !== 'user' && (
                      <div className="mt-3 pt-2 flex items-center gap-2 border-t border-emerald-100/60">
                        <button
                          onClick={() => isPlaying ? stop() : speak(msg.content, msg.language || currentLangCode, msg.audioBase64 || null)}
                          className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-bold bg-white hover:bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
                          title={isPlaying ? "Stop audio" : "Listen aloud"}
                        >
                          {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
                          <span>{isPlaying ? t('console.stopVoice', 'Stop') : t('console.listenAloud', 'Listen Aloud')}</span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 w-fit text-xs sm:text-sm text-emerald-800 font-semibold animate-pulse">
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>{t('console.generating', 'Searching & synthesizing response...')}</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Expanded Input Bar - Touch Friendly & Higher Input Height */}
          <div className="bg-white rounded-3xl p-3 sm:p-3.5 border border-emerald-100 shadow-soft">
            <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
              
              <button
                type="button"
                onClick={toggleMic}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition cursor-pointer ${
                  isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                }`}
                title={isListening ? t('console.stopListening', 'Stop listening') : t('console.speakQuestion', 'Speak your question')}
                aria-label="Toggle voice input"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isListening ? 'mic_off' : 'mic'}
                </span>
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('console.inputPlaceholder', 'Ask in Telugu, Hindi or English (e.g. రైతు భరోసా ఎలా వస్తుంది?)...')}
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />

              {/* RAG Toggle */}
              <button
                type="button"
                onClick={() => setEnableRag(!enableRag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  enableRag ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
                title={t('console.ragTooltip', 'Toggle ChromaDB RAG Knowledge Retrieval')}
              >
                <Database className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RAG {enableRag ? t('console.ragOn', 'ON') : t('console.ragOff', 'OFF')}</span>
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition shadow-xs cursor-pointer ${
                  !inputText.trim() || isLoading
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                }`}
                title={t('console.send', 'Send')}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>

            </form>
          </div>

        </div>

      </div>

    </section>
  );
}
