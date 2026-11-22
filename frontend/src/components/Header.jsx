import React from 'react';
import { Sparkles, Globe, Shield, RefreshCw } from 'lucide-react';

export default function Header({ selectedLanguage, onLanguageChange, onNewChat }) {
  const languages = [
    { code: 'auto', label: 'Auto Detect (ఆటో / ऑटो)' },
    { code: 'te-IN', label: 'Telugu (తెలుగు)' },
    { code: 'hi-IN', label: 'Hindi (हिन्दी)' },
    { code: 'en-IN', label: 'English (Indian)' },
  ];

  return (
    <header className="w-full bg-navy-800/80 backdrop-blur-md border-b border-slate-700/60 sticky top-0 z-30 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-bharat-orange via-amber-500 to-bharat-violet flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Sparkles className="w-5 h-5 text-navy-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-bharat-orange bg-clip-text text-transparent">
                BhashaBridge AI
              </span>
              <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                Free-First
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Voice & Language AI for Bharat (తెలుగు • हिन्दी • English)
            </p>
          </div>
        </div>

        {/* Controls: Language Selector and New Chat */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-amber-400 absolute left-2.5 pointer-events-none" />
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-navy-900 border border-slate-700 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer hover:border-slate-600 transition"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 text-xs font-medium bg-navy-700 hover:bg-navy-600 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-600/60 transition shadow-sm"
            title="Start new conversation session"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>

      </div>
    </header>
  );
}
