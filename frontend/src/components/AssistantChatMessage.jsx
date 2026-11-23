import React, { useState } from 'react';
import { 
  Volume2, VolumeX, Pause, Play, RotateCcw, Copy, Check, 
  Bot, User, Sparkles, ShieldCheck, CheckCircle2, ExternalLink 
} from 'lucide-react';

export default function AssistantChatMessage({
  message,
  onPlay,
  onPause,
  onResume,
  onStop,
  onReplay,
  isCurrentlyPlaying,
  isCurrentlyPaused
}) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full py-4 px-3 sm:px-6 transition-colors duration-200 ${
      isUser ? 'bg-transparent' : 'bg-[#0f172a]/40 border-y border-white/[0.04]'
    }`}>
      <div className="max-w-3xl mx-auto flex gap-4">
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-semibold shadow-md ${
          isUser 
            ? 'bg-gradient-to-tr from-sky-500 to-cyan-400 text-[#050b14]' 
            : 'bg-gradient-to-tr from-indigo-500 via-sky-600 to-cyan-400 text-white shadow-cyan-500/10'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Content Container */}
        <div className="flex-1 min-w-0 space-y-2">
          
          {/* Header row (name, status, timestamp) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200">
                {isUser ? 'You' : 'BhashaBridge AI'}
              </span>
              {!isUser && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20 font-medium">
                  Assistant
                </span>
              )}
              {message.detectedLanguage && (
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400">
                  {message.detectedLanguage}
                </span>
              )}
            </div>

            {message.timestamp && (
              <span className="text-[11px] text-slate-500 font-mono">
                {message.timestamp}
              </span>
            )}
          </div>

          {/* Formatted body text */}
          <div className="text-sm sm:text-base leading-relaxed text-slate-100 whitespace-pre-wrap font-sans selection:bg-cyan-500/30 selection:text-white">
            {message.content}
          </div>

          {/* Verified Schemes / Sources Citations if RAG returned real docs */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Welfare Schemes & Sources</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {message.sources.map((src, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/30 transition text-xs">
                    <div className="flex items-center justify-between font-medium text-slate-200">
                      <span className="truncate">{src.title || src.source}</span>
                      {src.url && (
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 ml-1">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    {src.snippet && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 italic">
                        "{src.snippet}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action toolbar (Listen / Pause / Resume / Stop / Replay / Copy) */}
          {!isUser && (
            <div className="flex items-center flex-wrap gap-1.5 pt-2 text-xs">
              
              {/* Play / Pause / Resume / Stop controls */}
              {!isCurrentlyPlaying ? (
                <button
                  type="button"
                  onClick={() => onPlay(message)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-400/20 hover:border-sky-400/40 transition cursor-pointer font-medium"
                  title="Listen to response"
                >
                  <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                  <span>Listen</span>
                </button>
              ) : (
                <div className="flex items-center gap-1 bg-sky-950/60 border border-sky-500/30 rounded-lg p-0.5">
                  {isCurrentlyPaused ? (
                    <button
                      type="button"
                      onClick={onResume}
                      className="flex items-center gap-1 px-2.5 py-1 rounded text-sky-300 hover:bg-sky-500/20 transition cursor-pointer font-medium"
                      title="Resume audio"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Resume</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onPause}
                      className="flex items-center gap-1 px-2.5 py-1 rounded text-amber-300 hover:bg-amber-500/20 transition cursor-pointer font-medium"
                      title="Pause audio"
                    >
                      <Pause className="w-3 h-3 fill-current" />
                      <span>Pause</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onStop}
                    className="flex items-center gap-1 px-2.5 py-1 rounded text-rose-300 hover:bg-rose-500/20 transition cursor-pointer font-medium"
                    title="Stop audio"
                  >
                    <VolumeX className="w-3 h-3" />
                    <span>Stop</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onReplay(message)}
                    className="flex items-center gap-1 px-2 py-1 rounded text-slate-300 hover:bg-white/10 transition cursor-pointer"
                    title="Replay from beginning"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Copy message button */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 border border-white/[0.06] transition cursor-pointer"
                title="Copy text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Verified Sources Tag */}
              {message.sources && message.sources.length > 0 && (
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 ml-auto font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified Sources</span>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
