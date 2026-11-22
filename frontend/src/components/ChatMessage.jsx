import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, ExternalLink, Bot, User, CheckCircle2, Copy, Check } from 'lucide-react';

export default function ChatMessage({ message, onSpeak, onStop, isSpeaking }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[92%] sm:max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-white ${
          isUser 
            ? 'bg-emerald-700 font-bold' 
            : 'bg-emerald-600'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message bubble */}
        <div className={`rounded-3xl p-5 shadow-soft transition-all duration-200 ${
          isUser
            ? 'bg-emerald-600 text-white rounded-tr-none'
            : 'bg-white border border-emerald-100 text-slate-800 rounded-tl-none'
        }`}>
          
          {/* Header metadata for AI responses */}
          {!isUser && (
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-emerald-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">BhashaBridge AI</span>
                {message.modelUsed && (
                  <span className="bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px] text-emerald-800 border border-emerald-200 font-mono font-bold">
                    {message.modelUsed.split('/').pop()}
                  </span>
                )}
              </div>

              {/* Verified badge only when backed by real RAG citations */}
              {message.verified && message.sources && message.sources.length > 0 && (
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Scheme
                </span>
              )}
            </div>
          )}

          {/* Main message text with sharp high-contrast typography */}
          <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-normal">
            {message.content}
          </div>

          {/* Citations & Source Badges (Shown ONLY when actual sources are retrieved) */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-emerald-100">
              <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Citations & Schemes:
              </div>
              <div className="space-y-2">
                {message.sources.map((src, idx) => (
                  <div key={idx} className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100 text-xs">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span className="text-emerald-800 font-bold">{src.title}</span>
                      {src.url && (
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">{src.source}</div>
                    <div className="text-slate-700 mt-1.5 text-[11px] bg-white p-2 rounded-xl border border-emerald-100/80 italic leading-relaxed">
                      "{src.snippet}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Multi-Agent Trace Drawer */}
          {!isUser && message.agentTrace && message.agentTrace.length > 0 && (
            <div className="mt-3 pt-2 text-[10px] text-slate-500 flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-600">Agents:</span>
              {message.agentTrace.map((trace, idx) => (
                <span key={idx} className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 text-emerald-800 font-medium">
                  {trace.split(':')[0]}
                </span>
              ))}
            </div>
          )}

          {/* Controls: Audio Playback & Copy Answer */}
          {!isUser && (
            <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-emerald-100">
              <button
                onClick={() => isSpeaking ? onStop() : onSpeak(message.content, message.language, message.audioBase64)}
                className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 transition-colors bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold shadow-2xs cursor-pointer"
                title={isSpeaking ? "Stop Voice" : "Listen Aloud"}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                    <span className="text-rose-600 font-semibold">Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Listen Aloud</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition bg-white px-2.5 py-1.5 rounded-xl border border-emerald-100 cursor-pointer"
                title="Copy Answer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
