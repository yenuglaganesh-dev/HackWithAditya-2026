import React, { useState } from 'react';

export default function SwarmRunnerSection({ onSelectScenario }) {
  const [activeScenario, setActiveScenario] = useState('telugu');

  const scenarios = {
    telugu: {
      status: "Active Pipeline: Swaraj-Gov Agent (Telugu Voice)",
      time: "Latency: 1.1ms",
      step1Title: "ASR Telugu Ingestion",
      step1Desc: '"రాయితీ స్థితి వివరాలు" (Audio 16kHz)',
      step2Title: "State Ledger Auth",
      step2Desc: "AP-884 verified: ₹7,500 approved",
      step3Title: "Full Duplex Voice",
      step3Desc: "Dialect TTS audio streamed to caller"
    },
    vision: {
      status: "Active Pipeline: Kisan-Vision Agent (Agro ViT)",
      time: "Latency: 4.2ms",
      step1Title: "Drone Frame Ingestion",
      step1Desc: "Warangal sector frame #108",
      step2Title: "NDVI & Pest ViT",
      step2Desc: "Stem borer isolated (0.02% canopy)",
      step3Title: "Advisory Dispatch",
      step3Desc: "Neem bio-spray recommendation sent"
    },
    rbi: {
      status: "Active Pipeline: Dhan-RAG Agent (Hindi Synthesis)",
      time: "Latency: 2.4ms",
      step1Title: "Circular Query",
      step1Desc: "RBI Priority Lending 2024-25",
      step2Title: "Indic RAG Hybrid Search",
      step2Desc: "99.8% precision vector match",
      step3Title: "Hindi Synthesis",
      step3Desc: '"प्राथमिकता क्षेत्र ऋण स्वीकृत"'
    }
  };

  const handleScenarioClick = (type) => {
    setActiveScenario(type);
    if (onSelectScenario) {
      if (type === 'telugu') {
        onSelectScenario("రైతు భరోసా పథకం ఎలిజిబిలిటీ వివరాలు చెప్పండి");
      } else if (type === 'vision') {
        onSelectScenario("Kisan Vision: crop pest analysis guidelines");
      } else if (type === 'rbi') {
        onSelectScenario("भारतीय रिजर्व बैंक प्रत्यक्ष लाभ अंतरण (DBT) नियम क्या हैं?");
      }
    }
  };

  const current = scenarios[activeScenario];

  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 py-10 mx-auto" id="playground-section">
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-elevated p-6 sm:p-8 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-700 font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              <span>Interactive Swarm Runner</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-headline font-bold text-slate-900 mt-1">One-Click Agent Simulation</h2>
          </div>
          
          <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold self-start sm:self-auto flex items-center gap-2 shadow-xs">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Telemetry Online</span>
          </span>
        </div>

        {/* Preset Interactive Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => handleScenarioClick('telugu')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeScenario === 'telugu'
                ? 'bg-blue-600 text-white shadow-sm border border-blue-600'
                : 'bg-blue-50/80 hover:bg-blue-100 text-blue-900 border border-blue-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
            <span>Query Rythu Bharosa status in Telugu</span>
          </button>

          <button
            onClick={() => handleScenarioClick('vision')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeScenario === 'vision'
                ? 'bg-emerald-600 text-white shadow-sm border border-emerald-600'
                : 'bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">nest_cam_floodlight</span>
            <span>Verify crop health via Kisan-Vision</span>
          </button>

          <button
            onClick={() => handleScenarioClick('rbi')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeScenario === 'rbi'
                ? 'bg-amber-600 text-white shadow-sm border border-amber-600'
                : 'bg-amber-50/80 hover:bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            <span>Synthesize RBI DBT Circular in Hindi</span>
          </button>
        </div>

        {/* Live Pipeline Visualization Box */}
        <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 pb-2 border-b border-slate-200">
            <span className="font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              {current.status}
            </span>
            <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {current.time}
            </span>
          </div>

          {/* Dynamic 3-Step Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-blue-200/90 shadow-xs flex items-center gap-3 transition-all">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold shadow-xs shrink-0">1</span>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">{current.step1Title}</span>
                <span className="block text-[11px] text-slate-500 font-mono truncate mt-0.5">{current.step1Desc}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-emerald-200/90 shadow-xs flex items-center gap-3 transition-all">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono text-xs flex items-center justify-center font-bold shadow-xs shrink-0">2</span>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">{current.step2Title}</span>
                <span className="block text-[11px] text-slate-500 font-mono truncate mt-0.5">{current.step2Desc}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-amber-200/90 shadow-xs flex items-center gap-3 transition-all">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-mono text-xs flex items-center justify-center font-bold shadow-xs shrink-0">3</span>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">{current.step3Title}</span>
                <span className="block text-[11px] text-slate-500 font-mono truncate mt-0.5">{current.step3Desc}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
