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
    startListening,
    stopListening
  } = useSpeechRecognition({
    language: selectedLanguage === 'auto' ? 'auto' : (selectedLanguage.includes('-') ? selectedLanguage : `${selectedLanguage}-IN`),
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
    <div className="w-full bg-white border border-emerald-100 rounded-3xl p-4 shadow-soft">
      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Toggleable Settings Pills (RAG Knowledge & Public Research) */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setEnableRag(!enableRag)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer font-bold ${
                enableRag
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>ChromaDB RAG {enableRag ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setEnableResearch(!enableResearch)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all cursor-pointer font-bold ${
                enableResearch
                  ? 'bg-teal-50 border-teal-300 text-teal-800'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Gov Grounding {enableResearch ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {(isListening || isProcessing) && (
            <span className="flex items-center gap-1.5 text-rose-600 font-bold animate-pulse text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              {isProcessing
                ? 'Recognizing spoken language...'
                : `Listening (${selectedLanguage === 'auto' ? 'Auto Detect' : selectedLanguage})...`}
            </span>
          )}
        </div>

        {/* Input Bar with Mic and Send Button */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          
          {/* Microphone Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-100'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
            title={isListening ? "Stop Listening" : "Speak your question"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input Area */}
          <div className="relative flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask anything in Telugu, Hindi or English (e.g. పీఎం కిసాన్ పథకంలో 6000 రూపాయలు ఎలా దరఖాస్తు చేసుకోవాలి?)..."
              disabled={isLoading}
              className="w-full bg-slate-50 border border-emerald-100/80 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-xs cursor-pointer ${
              !text.trim() || isLoading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>

        </form>

      </div>
    </div>
  );
}
