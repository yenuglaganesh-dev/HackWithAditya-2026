import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, Database, Search, Loader2 } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VoiceInputBar({
  onSendMessage,
  selectedLanguage,
  isLoading,
  enableRag,
  setEnableRag,
  enableResearch,
  setEnableResearch
}) {
  const [text, setText] = useState('');

  // Native Browser Web Speech API hook
  const {
    isListening,
    isProcessing,
    transcript,
    setTranscript,
    isSupported,
    startListening,
    stopListening
  } = useSpeechRecognition({
    language: selectedLanguage === 'auto' ? 'auto' : selectedLanguage,
    onResult: (current) => setText(current),
    onFinalTranscript: (recognizedText, detectedLang) => {
      if (recognizedText && recognizedText.trim() && !isLoading) {
        onSendMessage(recognizedText.trim(), {
          fromVoice: true,
          detectedLanguage: detectedLang,
        });
        setText('');
        setTranscript('');
      }
    }
  });

  // Keep text synced when voice recognition updates
  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text);
    setText('');
    setTranscript('');
    if (isListening) {
      stopListening();
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="w-full bg-navy-800/90 backdrop-blur-md border-t border-slate-700/60 p-4">
      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Toggleable Settings Pills (RAG Knowledge & Public Research) */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEnableRag(!enableRag)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                enableRag
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                  : 'bg-navy-900 border-slate-700 text-slate-500'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>ChromaDB RAG {enableRag ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setEnableResearch(!enableResearch)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                enableResearch
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                  : 'bg-navy-900 border-slate-700 text-slate-500'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Gov Sources {enableResearch ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {(isListening || isProcessing) && (
            <span className="flex items-center gap-1.5 text-rose-400 font-medium animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              {isProcessing
                ? 'Recognizing spoken language...'
                : `Listening (${selectedLanguage === 'auto' ? 'Auto Detect' : selectedLanguage})...`}
            </span>
          )}
        </div>

        {/* Input Bar with Mic and Send Button */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          
          {/* Microphone Button (Large & Accessible) */}
          <button
            type="button"
            onClick={toggleMic}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-md ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30'
                : 'bg-navy-700 hover:bg-navy-600 text-amber-400 border border-slate-600'
            }`}
            title={isListening ? "Stop Listening" : "Speak your question (Web Speech API)"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input Area */}
          <div className="relative flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask anything in Telugu, Hindi or English (e.g. పీఎం కిసాన్ అర్హత ఏమిటి? / PM Kisan status)..."
              disabled={isLoading}
              className="w-full bg-navy-900/90 border border-slate-700 rounded-2xl px-4 py-3 text-sm md:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-inner"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition shadow-md ${
              !text.trim() || isLoading
                ? 'bg-navy-700/50 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-gradient-to-tr from-bharat-orange to-amber-500 text-navy-900 hover:brightness-110 active:scale-95'
            }`}
            title="Send message"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>

        </form>

      </div>
    </div>
  );
}
