import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, MicOff, Send, Square, Play, Pause, XCircle, 
  Sparkles, Loader2, Database, Search, Volume2
} from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function AssistantChatComposer({
  onSendMessage,
  isLoading,
  selectedLanguage,
  enableRag,
  setEnableRag,
  enableResearch,
  setEnableResearch,
  autoSpeak,
  setAutoSpeak,
  autoSubmitVoice,
  setAutoSubmitVoice
}) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Advanced Web Speech STT Hook
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
    language: selectedLanguage,
    autoSubmit: autoSubmitVoice,
    onResult: (text) => setInput(text),
    onFinalTranscript: (finalText, detectedLang) => {
      if (finalText && finalText.trim()) {
        setInput(finalText.trim());
        if (autoSubmitVoice && !isLoading) {
          onSendMessage(finalText.trim(), {
            fromVoice: true,
            detectedLanguage: detectedLang
          });
          setInput('');
          setTranscript('');
        }
      }
    }
  });

  // Keep input synced if speech recognition produces transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (isRecording) {
      stopListening();
    }

    onSendMessage(input.trim(), {
      fromVoice: Boolean(isRecording),
      detectedLanguage: selectedLanguage === 'auto' ? null : selectedLanguage
    });

    setInput('');
    setTranscript('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopListening();
    } else {
      startListening();
    }
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full bg-[#070b14]/90 backdrop-blur-md border-t border-white/[0.08] p-3 sm:p-4">
      <div className="max-w-3xl mx-auto space-y-2.5">
        
        {/* Recording Animation Bar (When active) */}
        {isRecording && (
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-red-500/15 via-rose-500/20 to-sky-500/15 border border-rose-500/30 text-xs text-white shadow-lg animate-pulse">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="font-semibold text-rose-200">
                Listening... {formatTimer(recordingSeconds)}
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-300">
                ({selectedLanguage === 'auto' ? 'Auto Lang' : selectedLanguage.toUpperCase()})
              </span>
            </div>

            {/* Recording Controls (Pause / Resume / Cancel / Stop) */}
            <div className="flex items-center gap-2">
              {isRecordingPaused ? (
                <button
                  type="button"
                  onClick={resumeListening}
                  className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-sky-300 font-medium flex items-center gap-1 cursor-pointer"
                  title="Resume Recording"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={pauseListening}
                  className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                  title="Pause Recording"
                >
                  <Pause className="w-3 h-3 fill-current" />
                  <span>Pause</span>
                </button>
              )}

              <button
                type="button"
                onClick={cancelRecording}
                className="px-2 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-medium flex items-center gap-1 cursor-pointer"
                title="Cancel Recording"
              >
                <XCircle className="w-3 h-3" />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                onClick={stopListening}
                className="px-2.5 py-1 rounded-md bg-white text-slate-900 font-bold flex items-center gap-1 hover:bg-slate-200 cursor-pointer"
                title="Finish and Send"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Done</span>
              </button>
            </div>
          </div>
        )}

        {/* Speech Error Banner if permission or unsupported */}
        {speechError && (
          <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-1.5 flex items-center justify-between">
            <span>{speechError}</span>
          </div>
        )}

        {/* ChatGPT Style Glass Input Composer Box */}
        <div className="relative flex items-end gap-2 p-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.1] focus-within:border-cyan-400/50 focus-within:ring-1 focus-within:ring-cyan-400/30 transition-all shadow-inner">
          
          {/* Microphone Action Button */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
              isRecording
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 animate-pulse'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-white/[0.08]'
            }`}
            title={isRecording ? 'Stop Recording' : 'Speak to BhashaBridge AI'}
          >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything or speak to BhashaBridge AI..."
            disabled={isLoading}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base resize-none focus:outline-hidden py-2 px-1 max-h-44 leading-relaxed scrollbar-none"
          />

          {/* Clear input button (when text entered) */}
          {input.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={() => {
                setInput('');
                setTranscript('');
                if (textareaRef.current) textareaRef.current.style.height = 'auto';
              }}
              className="p-1.5 text-slate-500 hover:text-slate-300 cursor-pointer shrink-0"
              title="Clear input"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
              input.trim() && !isLoading
                ? 'bg-gradient-to-r from-sky-400 to-cyan-300 text-[#07131e] font-bold shadow-md shadow-cyan-400/20 hover:scale-105'
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
            title="Send message (Enter)"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>

        </div>

        {/* Feature Toggles & Capabilities bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-400 px-1">
          <div className="flex items-center gap-2">
            
            {/* RAG Verification Pill */}
            <button
              type="button"
              onClick={() => setEnableRag(!enableRag)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition cursor-pointer font-medium ${
                enableRag 
                  ? 'bg-sky-500/10 text-cyan-300 border-sky-400/30' 
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.06]'
              }`}
              title="Toggle Verified Knowledge Base"
            >
              <Database className="w-3 h-3 text-cyan-400" />
              <span>Verified Knowledge</span>
            </button>

            {/* Deep Research Pill */}
            <button
              type="button"
              onClick={() => setEnableResearch(!enableResearch)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition cursor-pointer font-medium ${
                enableResearch 
                  ? 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30' 
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.06]'
              }`}
              title="Enable Deep Web Research on Government Portals"
            >
              <Search className="w-3 h-3 text-indigo-400" />
              <span>Research</span>
            </button>

            {/* Auto-Read Audio Pill */}
            <button
              type="button"
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition cursor-pointer font-medium ${
                autoSpeak 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30' 
                  : 'bg-white/[0.02] text-slate-400 border-white/[0.06]'
              }`}
              title="Automatically read aloud new AI answers"
            >
              <Volume2 className="w-3 h-3 text-emerald-400" />
              <span>Auto-Read: {autoSpeak ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-400 hidden sm:block">
            Shift + Enter for new line • Enter to send
          </div>
        </div>

      </div>
    </div>
  );
}
