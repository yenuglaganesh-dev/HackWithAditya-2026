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
  XCircle,
  ExternalLink,
  Bot,
  User,
  CheckCircle2,
  Loader2,
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Mosaic Glass Voice Ingest Panel */}
        <div className="lg:col-span-5 mosaic-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 relative overflow-hidden">
          
          {/* Status Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-sky-400'} ring-4 ring-sky-400/20`} />
              <span className="font-headline text-base sm:text-lg font-bold text-white">
                {t('console.title', 'BhashaBridge Voice Assistant')}
              </span>
            </div>

            {/* Recording badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                isRecording
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
                  : 'bg-white/5 text-zinc-300 border-white/10'
              }`}
            >
              {isRecording ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Recording ({formatTimer(recordingSeconds)})</span>
                </>
              ) : (
                t('console.ready', 'Ready')
              )}
            </span>
          </div>

          {/* Interactive Mic Waveform Box */}
          <div className="relative w-full h-64 sm:h-72 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 flex flex-col items-center justify-center overflow-hidden">
            {/* Concentric Pulse Rings */}
            <div className={`absolute w-56 h-56 rounded-full border border-sky-400/20 pointer-events-none transition-all ${isRecording ? 'animate-ping' : ''}`} />
            <div className={`absolute w-40 h-40 rounded-full border border-cyan-400/20 pointer-events-none transition-all ${isRecording ? 'animate-pulse' : ''}`} />
            <div className={`absolute w-28 h-28 rounded-full border border-sky-300/25 pointer-events-none transition-all ${isRecording ? 'animate-pulse' : ''}`} />

            {/* Glowing Accent Microphone Button */}
            <button
              onClick={toggleMic}
              className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-3xl text-white flex items-center justify-center shadow-2xl transition-all active:scale-95 cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 shadow-rose-600/50 ring-8 ring-rose-500/20 animate-pulse'
                  : 'bg-gradient-to-tr from-sky-400 to-cyan-300 hover:scale-105 shadow-sky-400/30 text-[#06233a] ring-8 ring-sky-400/20'
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
              <div className={`w-1.5 bg-sky-400 rounded-t ${isRecording ? 'anim-bar-1' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-cyan-300 rounded-t ${isRecording ? 'anim-bar-2' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-blue-400 rounded-t ${isRecording ? 'anim-bar-3' : 'h-5 opacity-30'}`} />
              <div className={`w-1.5 bg-sky-300 rounded-t ${isRecording ? 'anim-bar-4' : 'h-3 opacity-30'}`} />
              <div className={`w-1.5 bg-cyan-400 rounded-t ${isRecording ? 'anim-bar-1' : 'h-6 opacity-30'}`} />
              <div className={`w-1.5 bg-sky-500 rounded-t ${isRecording ? 'anim-bar-2' : 'h-4 opacity-30'}`} />
              <div className={`w-1.5 bg-blue-300 rounded-t ${isRecording ? 'anim-bar-3' : 'h-2 opacity-30'}`} />
              <div className={`w-1.5 bg-sky-400 rounded-t ${isRecording ? 'anim-bar-4' : 'h-3 opacity-30'}`} />
            </div>

            {/* Sub-label */}
            <p className="mt-3 text-xs font-semibold text-zinc-300 z-10">
              {isRecording ? `Recording audio (${formatTimer(recordingSeconds)}) - Click to stop` : 'Click microphone to record your voice'}
            </p>
          </div>

          {/* Real-time Voice Controls during recording: Pause, Resume, Cancel */}
          {isRecording && (
            <div className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 animate-in fade-in">
              <button
                type="button"
                onClick={isRecordingPaused ? resumeListening : pauseListening}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/15 transition cursor-pointer"
              >
                {isRecordingPaused ? <Play className="w-3.5 h-3.5 text-sky-400" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isRecordingPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                type="button"
                onClick={cancelRecording}
                className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 transition cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Cancel</span>
              </button>
            </div>
          )}

          {/* Permission / Speech Error Notification */}
          {speechError && (
            <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 rounded-2xl p-3.5 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{speechError}</span>
            </div>
          )}

          {/* Target Language & Auto-submit Preferences */}
          <div className="border border-white/10 rounded-2xl p-3.5 bg-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300">Target Language:</span>
              <span className="font-bold text-sky-300 uppercase">
                {selectedLanguage === 'auto' ? 'Auto Detect (te / hi / en)' : selectedLanguage}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
              <span className="text-zinc-400">Auto-submit when recording stops:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSubmit}
                  onChange={(e) => setAutoSubmit(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-sky-400"></div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Mosaic Glass Conversation Panel & Composer */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Live Recognized Speech Pill */}
          {inputText && isRecording && (
            <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 text-xs sm:text-sm flex items-center gap-2.5 shadow-xs animate-in fade-in">
              <span className="material-symbols-outlined text-[18px] text-sky-400 animate-pulse">subtitles</span>
              <span className="font-semibold text-white truncate">Transcribing: {inputText}</span>
            </div>
          )}

          {/* Conversation Stream */}
          <div className="mosaic-glass rounded-3xl p-5 sm:p-6 flex flex-col h-[420px] sm:h-[480px] overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[92%] sm:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs shadow-md ${
                      msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-gradient-to-tr from-sky-400 to-cyan-300 text-[#06233a]'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 sm:p-4.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-zinc-100 rounded-tl-none backdrop-blur-md'
                    }`}
                  >
                    {/* Assistant Metadata Header */}
                    {msg.role !== 'user' && (
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-sky-300">
                        <span className="font-bold">BhashaBridge AI</span>
                        {msg.verified && msg.sources && msg.sources.length > 0 && (
                          <span className="flex items-center gap-1 text-cyan-300 font-bold bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                            {t('console.verifiedScheme', 'Verified Scheme')}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-normal text-zinc-200">{msg.content}</div>

                    {/* Citations */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
                        <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                          {t('console.verifiedReferences', 'Verified References:')}
                        </span>
                        {msg.sources.map((s, sIdx) => (
                          <div key={sIdx} className="bg-black/30 p-2.5 rounded-xl border border-white/10 text-xs text-zinc-300">
                            <div className="font-bold flex items-center justify-between text-sky-300">
                              <span>{s.title}</span>
                              {s.url && (
                                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-200 p-0.5">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <div className="text-zinc-400 mt-1 italic line-clamp-2">"{s.snippet}"</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Audio Controls for AI Response: Listen, Pause, Resume, Replay, Stop */}
                    {msg.role !== 'user' && (
                      <div className="mt-3 pt-2 flex items-center flex-wrap gap-2 border-t border-white/10">
                        <button
                          onClick={() => isPlaying ? stop() : speak(msg.content, msg.language || currentLangCode, msg.audioBase64 || null)}
                          className="flex items-center gap-1.5 text-xs text-sky-200 hover:text-white font-bold bg-white/10 hover:bg-white/15 px-3 py-1 rounded-lg border border-white/15 transition-colors cursor-pointer shadow-sm"
                          title={isPlaying ? 'Stop audio' : 'Listen aloud'}
                        >
                          {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                          <span>{isPlaying ? 'Stop Audio' : 'Listen Aloud'}</span>
                        </button>

                        {isPlaying && pause && (
                          <button
                            onClick={isPaused ? resume : pause}
                            className="flex items-center gap-1 text-xs text-zinc-300 font-semibold bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 cursor-pointer"
                            title={isPaused ? 'Resume' : 'Pause'}
                          >
                            {isPaused ? <Play className="w-3 h-3 text-sky-400" /> : <Pause className="w-3 h-3 text-zinc-400" />}
                            <span>{isPaused ? 'Resume' : 'Pause'}</span>
                          </button>
                        )}

                        {replay && (
                          <button
                            onClick={() => speak(msg.content, msg.language || currentLangCode, msg.audioBase64 || null)}
                            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white font-semibold bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 cursor-pointer"
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
              <div className="flex items-center gap-2.5 p-3 bg-white/5 rounded-2xl border border-white/10 w-fit text-xs sm:text-sm text-sky-300 font-semibold animate-pulse">
                <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                <span>{t('console.generating', 'Searching & synthesizing response...')}</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Editable Transcription Input Bar with Mosaic glow send button */}
          <div className="mosaic-glass rounded-3xl p-3 sm:p-3.5">
            <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
              
              {/* Record / Stop Button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/20'
                    : 'bg-white/10 hover:bg-white/15 text-sky-300 border border-white/10'
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
                className="flex-1 bg-transparent border-0 px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
              />

              {/* RAG Toggle */}
              <button
                type="button"
                onClick={() => setEnableRag(!enableRag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  enableRag ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' : 'bg-white/5 text-zinc-500 border-white/10'
                }`}
                title={t('console.ragTooltip', 'Toggle ChromaDB RAG Knowledge Retrieval')}
              >
                <Database className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RAG {enableRag ? t('console.ragOn', 'ON') : t('console.ragOff', 'OFF')}</span>
              </button>

              {/* Glowing Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition shadow-lg cursor-pointer ${
                  !inputText.trim() || isLoading
                    ? 'bg-white/5 text-zinc-600 border border-white/5 cursor-not-allowed'
                    : 'bg-gradient-to-r from-sky-400 to-cyan-300 hover:brightness-110 text-[#06233a] active:scale-95 shadow-sky-400/30'
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
