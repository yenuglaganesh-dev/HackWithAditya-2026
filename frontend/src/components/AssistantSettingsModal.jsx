import React from 'react';
import { X, Volume2, Globe, Sliders, Shield, Sparkles } from 'lucide-react';

export default function AssistantSettingsModal({
  isOpen,
  onClose,
  selectedLanguage,
  setSelectedLanguage,
  autoSpeak,
  setAutoSpeak,
  autoSubmitVoice,
  setAutoSubmitVoice,
  speechRate,
  setSpeechRate,
  availableVoices = [],
  activeVoiceName,
  backendStatus
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#0c1220] border border-white/10 shadow-2xl text-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Voice & Assistant Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-5 text-xs">
          
          {/* Primary Language */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preferred Language (Speech & Text)</span>
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-cyan-400"
            >
              <option value="auto" className="bg-[#0c1220] text-white">Auto-Detect (Telugu / Hindi / English)</option>
              <option value="te" className="bg-[#0c1220] text-white">తెలుగు (Telugu - te-IN)</option>
              <option value="hi" className="bg-[#0c1220] text-white">हिन्दी (Hindi - hi-IN)</option>
              <option value="en" className="bg-[#0c1220] text-white">English (en-IN)</option>
            </select>
            <p className="text-[11px] text-slate-400">
              When set to Auto, the agent detects Telugu, Hindi, or English automatically.
            </p>
          </div>

          {/* Auto Read Answers Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div>
              <div className="font-semibold text-slate-200">Auto-Read AI Answers</div>
              <div className="text-[11px] text-slate-400">Automatically speak answers aloud upon generation</div>
            </div>
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={(e) => setAutoSpeak(e.target.checked)}
              className="w-4 h-4 accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Auto Submit Voice Recording */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div>
              <div className="font-semibold text-slate-200">Auto-Send on Voice Stop</div>
              <div className="text-[11px] text-slate-400">Send transcribed speech immediately when you stop speaking</div>
            </div>
            <input
              type="checkbox"
              checked={autoSubmitVoice}
              onChange={(e) => setAutoSubmitVoice(e.target.checked)}
              className="w-4 h-4 accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Speech Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Speech Playback Speed</label>
              <span className="font-mono text-cyan-400">{speechRate}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Assistant Info Badge */}
          <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-400/20 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-sky-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BhashaBridge AI Assistant</span>
            </div>
            <div>Status: <span className="font-mono text-cyan-200 font-semibold">{backendStatus?.connected ? 'Ready' : 'Standby'}</span></div>
            <div>Capabilities: <span className="text-slate-400">Multilingual Speech In & Out • Verified Knowledge Grounding</span></div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.08] bg-black/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 text-[#050e18] font-bold text-xs hover:scale-105 transition cursor-pointer"
          >
            Save & Done
          </button>
        </div>

      </div>
    </div>
  );
}
