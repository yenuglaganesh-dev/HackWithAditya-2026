import React from 'react';
import { RefreshCw, Sparkles, Activity } from 'lucide-react';

export default function Header({ selectedLanguage, onLanguageChange, onNewChat, isScrolling, blurAmount }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="h-16 px-4 sm:px-6 max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Minimal Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-slate-900 text-lg tracking-tight">AI for Bharat</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                Live
              </span>
            </div>
            <p className="text-[11px] text-emerald-700/80 font-medium hidden sm:block">
              Indic Voice & Multi-Agent Stack
            </p>
          </div>
        </div>

        {/* Minimal Actions & Language Switcher */}
        <div className="flex items-center gap-2.5">
          
          {/* Scroll Motion Blur Indicator */}
          {isScrolling && (
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-mono border border-emerald-200 animate-pulse">
              <Activity className="w-3 h-3 text-emerald-600" />
              <span>Motion Blur: {blurAmount}px</span>
            </span>
          )}

          {/* Clean Language Switcher */}
          <div className="flex items-center bg-emerald-50/80 rounded-full p-1 border border-emerald-200 text-xs">
            <button
              onClick={() => onLanguageChange('te-IN')}
              className={`px-3 py-1 rounded-full transition-all ${
                selectedLanguage === 'te-IN' || selectedLanguage === 'auto'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-emerald-900/80 hover:text-emerald-950 font-medium'
              }`}
              type="button"
            >
              తెలుగు
            </button>
            <button
              onClick={() => onLanguageChange('hi-IN')}
              className={`px-3 py-1 rounded-full transition-all ${
                selectedLanguage === 'hi-IN'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-emerald-900/80 hover:text-emerald-950 font-medium'
              }`}
              type="button"
            >
              हिन्दी
            </button>
            <button
              onClick={() => onLanguageChange('en-IN')}
              className={`px-3 py-1 rounded-full transition-all ${
                selectedLanguage === 'en-IN'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-emerald-900/80 hover:text-emerald-950 font-medium'
              }`}
              type="button"
            >
              EN
            </button>
          </div>

          {/* Reset Conversation */}
          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium text-xs shadow-xs transition-all"
            title="Start new session"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Reset</span>
          </button>

        </div>

      </div>
    </header>
  );
}
