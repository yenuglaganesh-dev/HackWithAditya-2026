import React from 'react';

export default function SwarmMeshSection() {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 py-10 mx-auto" id="agents-mesh-section">
      <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-elevated p-6 sm:p-8 relative overflow-hidden">
        
        {/* Header bar of the canvas with glass styling and crisp stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <div>
              <h2 className="text-base font-headline font-bold text-slate-900 flex items-center gap-2">
                Autonomous Swarm Mesh
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">Synced</span>
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Real-time Indic multi-agent decentralization</p>
            </div>
          </div>

          {/* Minimal Throughput & Status Indicators */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-700 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(5,150,105,0.7)]"></span>
              <span className="font-medium">Throughput: <strong className="text-slate-900 font-bold">142k tps</strong></span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-700 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-blue-600">sync</span>
              <span className="font-medium">Protocol: <strong className="text-slate-900 font-bold">MCP Indic-V2</strong></span>
            </div>
          </div>
        </div>

        {/* The 4-Node Visual Topology Canvas with rich glowing vectors */}
        <div className="relative py-12 px-4 sm:px-8 min-h-[380px] flex flex-col justify-center">
          
          {/* Animated Connection Vector Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-blue" x1="50%" y1="28%" x2="20%" y2="74%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"></stop>
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4"></stop>
              </linearGradient>
              <linearGradient id="line-emerald" x1="50%" y1="28%" x2="50%" y2="74%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"></stop>
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.4"></stop>
              </linearGradient>
              <linearGradient id="line-amber" x1="50%" y1="28%" x2="80%" y2="74%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"></stop>
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4"></stop>
              </linearGradient>
            </defs>
            {/* Master to Node 1 (Left) */}
            <path className="flow-line" d="M 50% 28% C 50% 50%, 20% 45%, 20% 74%" fill="none" stroke="url(#line-blue)" strokeLinecap="round" strokeWidth="2.5"></path>
            {/* Master to Node 2 (Center) */}
            <path className="flow-line" d="M 50% 28% L 50% 74%" fill="none" stroke="url(#line-emerald)" strokeLinecap="round" strokeWidth="2.5"></path>
            {/* Master to Node 3 (Right) */}
            <path className="flow-line" d="M 50% 28% C 50% 50%, 80% 45%, 80% 74%" fill="none" stroke="url(#line-amber)" strokeLinecap="round" strokeWidth="2.5"></path>
          </svg>

          {/* Top: Nagrik Orchestrator (Master Node) */}
          <div className="relative z-10 flex justify-center mb-16">
            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border-2 border-blue-500 shadow-glow-blue max-w-sm w-full transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-600">
              <div className="relative flex items-center justify-center shrink-0">
                <span className="absolute w-11 h-11 rounded-xl bg-blue-400/40 animate-halo"></span>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-600/30">
                  <span className="material-symbols-outlined text-[22px]">account_tree</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-sm text-slate-900 truncate">Nagrik Orchestrator</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">CORE</span>
                </div>
                <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-slate-500">
                  <span>Routing Intent</span>
                  <span>•</span>
                  <span className="text-blue-600 font-semibold">0.8ms Dispatch</span>
                </div>
              </div>
              <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
            </div>
          </div>

          {/* Bottom: 3 Sub-Swarm Agent Nodes */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Agent 1: Swaraj Gov */}
            <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-blue-200/90 shadow-soft hover:shadow-elevated hover:border-blue-400 transition-all flex items-center gap-3.5 group cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-xs text-slate-900 truncate">Swaraj Gov</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono block mt-1 font-medium">తెలుగు Subsidies & DB</span>
              </div>
            </div>

            {/* Agent 2: Kisan Vision */}
            <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-emerald-200/90 shadow-soft hover:shadow-elevated hover:border-emerald-400 transition-all flex items-center gap-3.5 group cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                <span className="material-symbols-outlined text-[22px]">nest_cam_floodlight</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-xs text-slate-900 truncate">Kisan Vision</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Resolved
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono block mt-1 font-medium">Crop Drone ViT Edge</span>
              </div>
            </div>

            {/* Agent 3: Dhan RAG */}
            <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-amber-200/90 shadow-soft hover:shadow-elevated hover:border-amber-400 transition-all flex items-center gap-3.5 group cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs">
                <span className="material-symbols-outlined text-[22px]">library_books</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold text-xs text-slate-900 truncate">Dhan RAG</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Active
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono block mt-1 font-medium">RBI Circulars Hindi</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
