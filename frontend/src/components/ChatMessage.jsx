import React from 'react';
import { Volume2, VolumeX, ShieldCheck, ExternalLink, Bot, User, CheckCircle2 } from 'lucide-react';

export default function ChatMessage({ message, onSpeak, onStop, isSpeaking }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-5`}>
      <div className={`flex max-w-[88%] md:max-w-[75%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
          isUser 
            ? 'bg-gradient-to-tr from-bharat-orange to-amber-500 text-navy-900 font-bold' 
            : 'bg-gradient-to-tr from-bharat-violet to-indigo-600 text-white'
        }`}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>

        {/* Content bubble */}
        <div className={`rounded-2xl p-4 shadow-lg ${
          isUser
            ? 'bg-gradient-to-r from-amber-600/90 to-bharat-orange text-white rounded-tr-none'
            : 'bg-navy-800/90 border border-slate-700/60 text-slate-100 rounded-tl-none backdrop-blur-sm'
        }`}>
          
          {/* Header metadata for AI responses */}
          {!isUser && (
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/40 text-xs text-slate-400">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <span>BhashaBridge AI</span>
                {message.modelUsed && (
                  <span className="bg-navy-900/80 px-2 py-0.5 rounded text-[10px] text-amber-400 border border-amber-500/30">
                    {message.modelUsed.split('/').pop()}
                  </span>
                )}
              </span>

              {message.verified && (
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Source
                </span>
              )}
            </div>
          )}

          {/* Main message text */}
          <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            {message.content}
          </div>

          {/* Citations & Source Badges */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-700/50">
              <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-bharat-orange" />
                Verified References:
              </div>
              <div className="space-y-2">
                {message.sources.map((src, idx) => (
                  <div key={idx} className="bg-navy-900/80 p-2.5 rounded-lg border border-slate-700/60 text-xs">
                    <div className="font-semibold text-amber-300 flex items-center justify-between">
                      <span>{src.title}</span>
                      {src.url && (
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-200">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{src.source}</div>
                    <div className="text-slate-300 mt-1 line-clamp-2 italic bg-navy-950/40 p-1.5 rounded">
                      "{src.snippet}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Multi-Agent Trace Drawer */}
          {!isUser && message.agentTrace && message.agentTrace.length > 0 && (
            <div className="mt-3 pt-2 text-[11px] text-slate-500 flex flex-wrap gap-1">
              <span className="font-medium text-slate-400">Agents:</span>
              {message.agentTrace.map((trace, idx) => (
                <span key={idx} className="bg-navy-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-400">
                  {trace.split(':')[0]}
                </span>
              ))}
            </div>
          )}

          {/* Playback Audio Controls */}
          {!isUser && (
            <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-700/30">
              <button
                onClick={() => isSpeaking ? onStop() : onSpeak(message.content, message.language)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors bg-navy-900/60 hover:bg-navy-900 px-2.5 py-1 rounded-md border border-amber-500/20"
                title={isSpeaking ? "Stop Voice" : "Listen to Response"}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen Aloud</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
