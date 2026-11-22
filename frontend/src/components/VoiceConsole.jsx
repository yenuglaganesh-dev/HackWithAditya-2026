import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Send,
  Database,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  XCircle,
  ExternalLink,
  Bot,
  User,
  CheckCircle2,
  Loader2,
  Mic,
  AlertCircle
} from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VoiceConsole({
  messages,
  onSendMessage,
  isLoading,
  selectedLanguage,
  onLanguageChange,
  speak,
  stop,
  pause,
  resume,
  replay,
  isPlaying,
  isPaused,
  enableRag,
  setEnableRag,
}) {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [autoSubmit, setAutoSubmit] = useState(false);
  const chatBottomRef = useRef(null);

  const currentLangCode =
    selectedLanguage === 'auto'
      ? 'auto'
      : selectedLanguage.includes('-')
      ? selectedLanguage
      : `${selectedLanguage}-IN`;

  const {
    isRecording,
    isPaused: isRecordingPaused,
    recordingSeconds,
    transcript,
    setTranscript,
    error: speechError,
    startListening,
    stopListening,
    pauseListening,
    resumeListening,
    cancelRecording,
  } = useSpeechRecognition({
    language: currentLangCode,
    autoSubmit,
    onResult: (text) => {
      // Automatically display the recognized text in the chat input for user inspection/editing
      setInputText(text);
    },
    onFinalTranscript: (recognizedText, detectedLang) => {
      if (recognizedText && recognizedText.trim()) {
        setInputText(recognizedText.trim());
        if (autoSubmit && !isLoading) {
          onSendMessage(recognizedText.trim(), {
            fromVoice: true,
            detectedLanguage: detectedLang,
          });
          setInputText('');
          setTranscript('');
        }
      }
    },
  });

  // Sync speech transcript into input field so the user can edit or inspect
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
    onSendMessage(inputText.trim(), {
      fromVoice: Boolean(isRecording),
      detectedLanguage: selectedLanguage === 'auto' ? null : selectedLanguage,
    });
    setInputText('');
    setTranscript('');
    if (isRecording) stopListening();
  };

  const toggleMic = () => {
    if (isRecording) {
      stopListening();
    } else {
      startListening();
    }
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mx-auto" id="voice-console-section">
      {/* Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (5 cols on desktop, full on mobile): Advanced Multilingual Voice Ingest */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-soft flex flex-col justify-between gap-6 relative overflow-hidden">
          
          {/* Status Header */}
          <div className="flex items-center justify-between pb-2 border-b border-emerald-50">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'} ring-4 ring-emerald-100`} />
              <span className="font-headline text-base sm:text-lg font-bold text-emerald-950">
                {t('console.title', 'BhashaBridge Voice Assistant')}
              </span>
            </div>

            {/* Recording badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                isRecording
                  ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isRecording ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  <span>Recording ({formatTimer(recordingSeconds)})</span>
                </>
              ) : (
                t('console.ready', 'Ready')
              )}
            </span>
          </div>

          {/* Interactive Emerald Mic & Waveform Area */}
          <div className="relative w-full h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-emerald-50/70 via-emerald-50/30 to-white border border-emerald-100 flex flex-col items-center justify-center overflow-hidden">
            {/* Concentric Pulse Rings during active recording */}
            <div className={`absolute w-56 h-56 rounded-full border border-emerald-300/30 pointer-events-none transition-all ${isRecording ? 'animate-ping' : ''}`} />
            <div className={`absolute w-40 h-40 rounded-full border border-emerald-400/30 pointer-events-none transition-all ${isRecording ? 'animate-pulse' : ''}`} />
            <div className={`absolute w-28 h-28 rounded-full border border-emerald-500/20 pointer-events-none transition-all ${isRecording ? 'animate-pulse' : ''}`} />

            {/* Main Microphone Button */}
            <button
              onClick={toggleMic}
              className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-3xl text-white flex items-center justify-center shadow-xl transition-all active:scale-95 cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 shadow-rose-600/40 ring-8 ring-rose-100 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 shadow-emerald-600/30 ring-8 ring-emerald-100'
              }`}
              title={isRecording ? 'Stop Recording' : 'Start Recording in Telugu, Hindi or English'}
              type="button"
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              <span className="material-symbols-outlined text-[36px]">
                {isRecording ? 'stop' : 'mic'}
              </span>
            </button>

            {/* Equalizer Waveform Bars */}
            <div className="absolute bottom-4 inset-x-8 flex items-end justify-center gap-1.5 h-12 pointer-events-none">
              <div className={`w-1.5 bg-emerald-600 rounded-t ${isRecording ? 'anim-bar-1' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-500 rounded-t ${isRecording ? 'anim-bar-2' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-500 rounded-t ${isRecording ? 'anim-bar-3' : 'h-5 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-400 rounded-t ${isRecording ? 'anim-bar-4' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-600 rounded-t ${isRecording ? 'anim-bar-1' : 'h-6 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-600 rounded-t ${isRecording ? 'anim-bar-2' : 'h-4 opacity-30'}`} />
              <div className={`w-1.5 bg-emerald-500 rounded-t ${isRecording ? 'anim-bar-3' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-teal-400 rounded-t ${isRecording ? 'anim-bar-4' : 'h-3 opacity-30'}`} />
            </div>

            {/* Sub-label */}
            <p className="mt-3 text-xs font-semibold text-emerald-800/80 z-10">
              {isRecording ? `Recording audio (${formatTimer(recordingSeconds)}) - Click to stop` : 'Click microphone to record your voice'}
            </p>
          </div>

          {/* Real-time Voice Controls during recording: Pause, Resume, Cancel */}
          {isRecording && (
            <div className="flex items-center justify-center gap-3 bg-rose-50/70 border border-rose-200/80 rounded-2xl p-3 animate-in fade-in">
              <button
                type="button"
                onClick={isRecordingPaused ? resumeListening : pauseListening}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-white hover:bg-rose-100/50 px-3 py-1.5 rounded-xl border border-rose-200 transition cursor-pointer"
              >
                {isRecordingPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isRecordingPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                type="button"
                onClick={cancelRecording}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Cancel</span>
              </button>
            </div>
          )}

          {/* Permission / Speech Error Notification */}
          {speechError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-3.5 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{speechError}</span>
            </div>
          )}

          {/* Voice Settings: Auto-submit toggle & Language info */}
          <div className="border border-emerald-100 rounded-2xl p-3.5 bg-emerald-50/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-950">Target Language:</span>
              <span className="font-bold text-emerald-800 uppercase">
                {selectedLanguage === 'auto' ? 'Auto Detect (te / hi / en)' : selectedLanguage}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-100/60">
              <span className="text-slate-600">Auto-submit when recording stops:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSubmit}
                  onChange={(e) => setAutoSubmit(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column (7 cols): Conversation Stream & Editable Transcription Input */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Live Recognized Speech Pill */}
          {inputText && isRecording && (
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3.5 text-xs sm:text-sm flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <span className="material-symbols-outlined text-[18px] text-emerald-700 animate-pulse">subtitles</span>
              <span className="font-semibold text-emerald-950 truncate">Transcribing: {inputText}</span>
            </div>
          )}

          {/* Conversation Stream */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-soft flex flex-col h-[420px] sm:h-[480px] overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[92%] sm:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs shadow-xs ${
                      msg.role === 'user' ? 'bg-emerald-700' : 'bg-emerald-600'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 sm:p-4.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-[#f7fbf9] border border-emerald-100/80 text-slate-800 rounded-tl-none'
                    }`}
                  >
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

                    {/* Citations */}
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

                    {/* Audio Controls for AI Response: Listen, Pause, Resume, Replay, Stop */}
                    {msg.role !== 'user' && (
                      <div className="mt-3 pt-2 flex items-center flex-wrap gap-2 border-t border-emerald-100/60">
                        <button
                          onClick={() => isPlaying ? stop() : speak(msg.content, msg.language || currentLangCode, msg.audioBase64 || null)}
                          className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-bold bg-white hover:bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
                          title={isPlaying ? 'Stop audio' : 'Listen aloud'}
                        >
                          {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
                          <span>{isPlaying ? 'Stop Audio' : 'Listen Aloud'}</span>
                        </button>

                        {isPlaying && pause && (
                          <button
                            onClick={isPaused ? resume : pause}
                            className="flex items-center gap-1 text-xs text-slate-700 font-semibold bg-white hover:bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer"
                            title={isPaused ? 'Resume' : 'Pause'}
                          >
                            {isPaused ? <Play className="w-3 h-3 text-emerald-700" /> : <Pause className="w-3 h-3 text-slate-600" />}
                            <span>{isPaused ? 'Resume' : 'Pause'}</span>
                          </button>
                        )}

                        {replay && (
                          <button
                            onClick={() => speak(msg.content, msg.language || currentLangCode, msg.audioBase64 || null)}
                            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold bg-white hover:bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer"
                            title="Replay Response"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Replay</span>
                          </button>
                        )}
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

          {/* Editable Transcription Input Bar */}
          <div className="bg-white rounded-3xl p-3 sm:p-3.5 border border-emerald-100 shadow-soft">
            <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
              
              {/* Record / Stop Button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-100'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                }`}
                title={isRecording ? 'Stop Recording' : 'Speak or record your question'}
                aria-label="Toggle voice input"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>

              {/* Editable Input Field */}
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
