import React from 'react';
import { RefreshCw, Radio } from 'lucide-react';

export default function Header({ selectedLanguage, onLanguageChange, onNewChat, activeTab, setActiveTab }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="h-16 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo + Tag */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('console')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-700 p-0.5 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-700 text-[20px] font-bold">all_inclusive</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">AI for Bharat</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">v3.4</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-medium tracking-tight hidden sm:block">Sovereign Agentic Cloud</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm text-slate-600">
          <button
            onClick={() => setActiveTab('console')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${activeTab === 'console' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[17px]">record_voice_over</span>
            Voice AI & Console
          </button>
          <button
            onClick={() => setActiveTab('mesh')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${activeTab === 'mesh' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[17px]">hub</span>
            Agentic Mesh
          </button>
          <button
            onClick={() => setActiveTab('capabilities')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${activeTab === 'capabilities' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[17px]">memory</span>
            Core Primitives
          </button>
          <button
            onClick={() => setActiveTab('telephony')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${activeTab === 'telephony' ? 'text-blue-700 font-bold border-b-2 border-blue-700' : 'hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[17px]">call_split</span>
            Telephony Flow
          </button>
        </nav>

        {/* Language Pill & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 text-xs shadow-xs">
            <button
              onClick={() => onLanguageChange('en-IN')}
              className={`px-2.5 py-1 rounded-full transition-all ${selectedLanguage === 'en-IN' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'font-medium text-slate-600 hover:text-slate-900'}`}
              type="button"
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('te-IN')}
              className={`px-2.5 py-1 rounded-full transition-all ${selectedLanguage === 'te-IN' || selectedLanguage === 'auto' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'font-medium text-slate-600 hover:text-slate-900'}`}
              type="button"
            >
              తెలుగు
            </button>
            <button
              onClick={() => onLanguageChange('hi-IN')}
              className={`px-2.5 py-1 rounded-full transition-all ${selectedLanguage === 'hi-IN' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'font-medium text-slate-600 hover:text-slate-900'}`}
              type="button"
            >
              हिन्दी
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs shadow-xs transition-all hover:border-slate-300"
            title="Start new conversation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Launch Console Action */}
          <button
            onClick={() => {
              setActiveTab('console');
              const el = document.getElementById('voice-console-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-semibold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>Console</span>
          </button>
        </div>

      </div>
    </header>
  );
}
