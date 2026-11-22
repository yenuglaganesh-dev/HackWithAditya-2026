import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, ExternalLink, Bot, User, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';

export default function ChatMessage({ message, onSpeak, onStop, isSpeaking }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-5`}>
      <div className={`flex max-w-[90%] md:max-w-[78%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
          isUser 
            ? 'bg-gradient-to-tr from-bharat-orange to-amber-500 text-navy-900 font-extrabold' 
            : 'bg-gradient-to-tr from-bharat-violet to-indigo-600 text-white shadow-indigo-500/20'
        }`}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>

        {/* Message bubble */}
        <div className={`rounded-3xl p-5 shadow-xl transition-all duration-300 ${
          isUser
            ? 'bg-gradient-to-r from-amber-600/95 to-bharat-orange text-white rounded-tr-none'
            : 'bg-navy-900/95 border border-slate-800 text-slate-100 rounded-tl-none backdrop-blur-md'
        }`}>
          
          {/* Header metadata for AI responses */}
          {!isUser && (
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">BhashaBridge AI</span>
                {message.modelUsed && (
                  <span className="bg-navy-950 px-2 py-0.5 rounded-full text-[10px] text-amber-400 border border-amber-500/30 font-medium">
                    {message.modelUsed.split('/').pop()}
                  </span>
                )}
              </div>

              {/* Verified badge only when backed by real RAG citations */}
              {message.verified && message.sources && message.sources.length > 0 && (
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Scheme
                </span>
              )}
            </div>
          )}

          {/* Main message text */}
          <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-normal">
            {message.content}
          </div>

          {/* Citations & Source Badges (Shown ONLY when actual sources are retrieved) */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-slate-800">
              <div className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Official Verified Reference Guidelines:</span>
              </div>
              <div className="space-y-2">
                {message.sources.map((src, idx) => (
                  <div key={idx} className="bg-navy-950/90 p-3 rounded-xl border border-slate-800/90 text-xs">
                    <div className="font-bold text-slate-200 flex items-center justify-between">
                      <span className="text-amber-300">{src.title}</span>
                      {src.url && (
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-300">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{src.source}</div>
                    <div className="text-slate-300 mt-1.5 text-[11px] bg-navy-900/60 p-2 rounded-lg border border-slate-800/60 italic leading-relaxed">
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
              <span className="font-semibold text-slate-400">Agents:</span>
              {message.agentTrace.map((trace, idx) => (
                <span key={idx} className="bg-navy-950 px-2 py-0.5 rounded-md border border-slate-800/80 text-slate-400">
                  {trace.split(':')[0]}
                </span>
              ))}
            </div>
          )}

          {/* Controls: Audio Playback & Copy Answer */}
          {!isUser && (
            <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-800/60">
              <button
                onClick={() => isSpeaking ? onStop() : onSpeak(message.content, message.language, message.audioBase64)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors bg-navy-950 hover:bg-navy-800 px-3 py-1.5 rounded-xl border border-amber-500/20 font-medium shadow-sm"
                title={isSpeaking ? "Stop Voice" : "Listen Aloud"}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                    <span className="text-rose-400 font-semibold">Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen Aloud</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition bg-navy-950 px-2.5 py-1.5 rounded-xl border border-slate-800"
                title="Copy Answer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
