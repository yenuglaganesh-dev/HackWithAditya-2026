import React from 'react';

export default function SwarmMeshSection() {
  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 py-8 mx-auto" id="agents-mesh-section">
      <div className="rounded-3xl bg-white border border-emerald-100 shadow-soft p-6 sm:p-7 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-emerald-100">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-emerald-600">hub</span>
            <div>
              <h2 className="text-sm sm:text-base font-headline font-bold text-slate-900">
                Autonomous Swarm Mesh
              </h2>
              <span className="text-[11px] text-emerald-700 font-mono">7-Agent Orchestration Architecture</span>
            </div>
          </div>

          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            🟢 Synced (142k tps)
          </span>
        </div>

        {/* 4-Node Minimal Topology Canvas */}
        <div className="relative py-10 px-2 sm:px-6 min-h-[300px] flex flex-col justify-center">
          
          {/* Animated SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-emerald-grad" x1="50%" y1="28%" x2="50%" y2="74%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path className="flow-line" d="M 50% 28% C 50% 50%, 20% 45%, 20% 74%" fill="none" stroke="url(#line-emerald-grad)" strokeLinecap="round" strokeWidth="2" />
            <path className="flow-line" d="M 50% 28% L 50% 74%" fill="none" stroke="url(#line-emerald-grad)" strokeLinecap="round" strokeWidth="2" />
            <path className="flow-line" d="M 50% 28% C 50% 50%, 80% 45%, 80% 74%" fill="none" stroke="url(#line-emerald-grad)" strokeLinecap="round" strokeWidth="2" />
          </svg>

          {/* Master Node */}
          <div className="relative z-10 flex justify-center mb-12">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border-2 border-emerald-500 shadow-glow-emerald max-w-xs w-full">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-xs text-slate-900 truncate">Nagrik Orchestrator</span>
                  <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">CORE</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono block">Multi-Agent Dispatch</span>
              </div>
            </div>
          </div>

          {/* 3 Sub-Nodes */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 shadow-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">Swaraj Gov</span>
                <span className="text-[10px] text-emerald-700 font-mono truncate">Telugu Subsidies</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 shadow-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">nest_cam_floodlight</span>
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">Kisan Vision</span>
                <span className="text-[10px] text-emerald-700 font-mono truncate">Crop Disease ViT</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 shadow-xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">library_books</span>
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">Dhan RAG</span>
                <span className="text-[10px] text-emerald-700 font-mono truncate">ChromaDB Store</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
