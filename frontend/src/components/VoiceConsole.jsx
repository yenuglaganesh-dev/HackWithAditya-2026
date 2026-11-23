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
  AlertCircle,
  Mic,
  StopCircle
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
    isPaused: isMicPaused,
    transcript,
    interimTranscript,
    elapsedSeconds,
    permissionError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    setTranscript,
    isSupported
  } = useSpeechRecognition({
    language: currentLangCode,
    continuous: true,
    interimResults: true
  });

  // When speech transcript updates, populate input box
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Handle auto-submit if enabled
  const handleStopRecording = () => {
    const finalTxt = stopRecording();
    const candidate = finalTxt || inputText;
    if (autoSubmit && candidate && candidate.trim()) {
      onSendMessage(candidate.trim(), { fromVoice: true });
      setInputText('');
      setTranscript('');
    }
  };

  const handleCancelRecording = () => {
    cancelRecording();
    setInputText('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim(), { fromVoice: false });
    setInputText('');
    setTranscript('');
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* LEFT: Microphone Console & Audio Controls Card */}
      <div className="lg:col-span-5 bg-white border border-[#E8EAED] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[520px] shadow-card">
        
        {/* Top Header of Console */}
        <div className="w-full flex items-center justify-between pb-5 border-b border-[#E8EAED]">
          <div className="flex items-center gap-2.5">
            <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-[#F58220]'}`} />
            <h2 className="font-headline font-bold text-base sm:text-lg text-[#202124]">
              BhashaBridge Voice Assistant
            </h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#FFF3E8] text-[#E96B16] border border-[#FBD3B6]">
            {isRecording ? (isMicPaused ? 'Paused' : 'Recording...') : 'Ready'}
          </span>
        </div>

        {/* Center: Microphone Interactive Ring */}
        <div className="my-auto py-8 flex flex-col items-center justify-center relative w-full">
          
          {/* Animated Background Ring during recording */}
          {isRecording && (
            <div className="absolute w-44 h-44 rounded-full bg-[#FFF3E8] mic-pulsing-orange pointer-events-none" />
          )}

          {/* Big Mic Button */}
          <button
            type="button"
            onClick={isRecording ? handleStopRecording : startRecording}
            className={`relative z-10 w-28 h-28 rounded-3xl flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30 scale-105'
                : 'bg-gradient-to-tr from-[#F58220] to-[#E96B16] hover:brightness-105 text-white shadow-orange-500/25 hover:scale-105 active:scale-95'
            }`}
            title={isRecording ? "Click to stop recording" : "Click to speak"}
          >
            {isRecording ? (
              <StopCircle className="w-12 h-12 text-white animate-pulse" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>

          {/* Instruction Label & Timer */}
          <div className="mt-5 text-center space-y-1">
            <p className="text-sm font-semibold text-[#202124]">
              {isRecording
                ? (isMicPaused ? 'Recording Paused' : `Listening... (${formatTimer(elapsedSeconds)})`)
                : 'Click microphone to record your voice'}
            </p>
            <p className="text-xs text-[#707070]">
              Speak in Telugu, Hindi or English
            </p>
          </div>

          {/* Audio Visualizer Equalizer Simulation */}
          <div className="flex items-center gap-1.5 h-6 mt-4">
            <div className={`w-1.5 rounded-full bg-[#F58220] ${isRecording && !isMicPaused ? 'anim-bar-1' : 'h-1.5 opacity-30'}`} />
            <div className={`w-1.5 rounded-full bg-[#E96B16] ${isRecording && !isMicPaused ? 'anim-bar-2' : 'h-2 opacity-30'}`} />
            <div className={`w-1.5 rounded-full bg-[#F58220] ${isRecording && !isMicPaused ? 'anim-bar-3' : 'h-3 opacity-30'}`} />
            <div className={`w-1.5 rounded-full bg-[#E96B16] ${isRecording && !isMicPaused ? 'anim-bar-4' : 'h-1.5 opacity-30'}`} />
            <div className={`w-1.5 rounded-full bg-[#F58220] ${isRecording && !isMicPaused ? 'anim-bar-2' : 'h-2.5 opacity-30'}`} />
          </div>

          {/* Pause / Resume & Cancel Controls during active recording */}
          {isRecording && (
            <div className="flex items-center gap-3 mt-4">
              <button
                type="button"
                onClick={isMicPaused ? resumeRecording : pauseRecording}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9FA] hover:bg-[#E8EAED] border border-[#E8EAED] text-xs font-semibold text-[#202124] transition cursor-pointer"
              >
                {isMicPaused ? <Play className="w-3.5 h-3.5 text-[#F58220]" /> : <Pause className="w-3.5 h-3.5 text-[#F58220]" />}
                <span>{isMicPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                type="button"
                onClick={handleCancelRecording}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 transition cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Cancel</span>
              </button>
            </div>
          )}

          {/* Microphone Permission Warning */}
          {permissionError && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{permissionError}</span>
            </div>
          )}

          {!isSupported && (
            <div className="mt-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 text-center">
              Browser Web Speech API not supported. Please type in the chat box.
            </div>
          )}
        </div>

        {/* Bottom Options: Language & Auto-submit */}
        <div className="w-full pt-4 border-t border-[#E8EAED] flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#707070] font-medium">Target Language:</span>
            <span className="font-bold text-[#E96B16]">
              {selectedLanguage === 'auto'
                ? 'AUTO DETECT (TE / HI / EN)'
                : selectedLanguage.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#707070]">Auto-submit when recording stops:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoSubmit}
                onChange={(e) => setAutoSubmit(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#DADCE0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F58220]"></div>
            </label>
          </div>
        </div>

      </div>

      {/* RIGHT: Chat Stream & Message Input Card */}
      <div className="lg:col-span-7 bg-white border border-[#E8EAED] rounded-3xl flex flex-col h-[580px] shadow-card overflow-hidden">
        
        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAFAFA]">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={index}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F58220] to-[#E96B16] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Message Bubble Card */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-soft ${
                    isUser
                      ? 'bg-[#202124] text-white rounded-tr-xs'
                      : 'bg-white border border-[#E8EAED] text-[#202124] rounded-tl-xs'
                  }`}
                >
                  {/* Top Bar for Assistant message */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#F1F3F4] text-xs">
                      <span className="font-bold text-[#F58220]">
                        BhashaBridge AI
                      </span>
                      {msg.verified && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Scheme
                        </span>
                      )}
                    </div>
                  )}

                  {/* Main Message Text */}
                  <div className={`text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium ${isUser ? 'text-white' : 'text-[#202124]'}`}>
                    {msg.content}
                  </div>

                  {/* Verified Sources / References */}
                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-[#F1F3F4] space-y-2">
                      <div className="text-[11px] font-bold text-[#707070] uppercase tracking-wider">
                        Verified References:
                      </div>
                      <div className="space-y-1.5">
                        {msg.sources.map((s, i) => (
                          <div key={i} className="text-xs bg-[#F8F9FA] p-2.5 rounded-xl border border-[#E8EAED]">
                            <div className="font-bold text-[#E96B16] flex items-center justify-between">
                              <span>{s.title || s.source}</span>
                              {s.url && (
                                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#F58220] hover:underline flex items-center gap-1">
                                  <span>link</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                            {s.snippet && (
                              <p className="text-[11px] text-[#707070] mt-1 line-clamp-2">
                                "{s.snippet}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Audio TTS Action Controls */}
                  {!isUser && (
                    <div className="flex items-center gap-2 mt-3 pt-2">
                      <button
                        type="button"
                        onClick={() => speak(msg.content, msg.language)}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#FFF3E8] hover:bg-[#FFE6D0] text-[#E96B16] border border-[#FBD3B6] transition cursor-pointer"
                        title="Listen aloud in native pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#F58220]" />
                        <span>Listen Aloud</span>
                      </button>

                      {isPlaying && (
                        <button
                          type="button"
                          onClick={stop}
                          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition cursor-pointer"
                        >
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Stop</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => replay(msg.content, msg.language)}
                        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F8F9FA] text-[#707070] border border-[#E8EAED] transition cursor-pointer"
                        title="Replay audio"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Replay</span>
                      </button>
                    </div>
                  )}

                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#202124] text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white border border-[#E8EAED] w-fit shadow-xs animate-pulse">
              <Loader2 className="w-4 h-4 text-[#F58220] animate-spin" />
              <span className="text-xs text-[#707070] font-medium">
                Searching verified sources & synthesizing response...
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Bottom Input Composer Form */}
        <form
          onSubmit={handleFormSubmit}
          className="p-3.5 bg-white border-t border-[#E8EAED] flex items-center gap-2"
        >
          {/* Mic quick record icon */}
          <button
            type="button"
            onClick={isRecording ? handleStopRecording : startRecording}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              isRecording
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-[#F8F9FA] text-[#707070] hover:text-[#F58220] border-[#E8EAED]'
            }`}
            title="Record voice"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Editable Text Area */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask in Telugu, Hindi or English (e.g. రైతు భరోసా ఎలా వస్తుంది?)..."
            className="flex-1 bg-[#F8F9FA] border border-[#E8EAED] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#202124] placeholder-[#707070] focus:outline-none focus:border-[#F58220] transition"
          />

          {/* RAG Toggle Button */}
          <button
            type="button"
            onClick={() => setEnableRag(!enableRag)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              enableRag
                ? 'bg-[#FFF3E8] border-[#FBD3B6] text-[#E96B16]'
                : 'bg-[#F8F9FA] border-[#E8EAED] text-[#707070]'
            }`}
            title="Toggle ChromaDB RAG Vector Grounding"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RAG {enableRag ? 'ON' : 'OFF'}</span>
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 rounded-xl font-bold transition cursor-pointer ${
              inputText.trim() && !isLoading
                ? 'btn-orange text-white'
                : 'bg-[#F1F3F4] text-[#BDC1C6] border border-[#E8EAED] cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
