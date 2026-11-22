import React from 'react';

export default function TelephonyFlowSection({ onOpenConsole }) {
  return (
    <section className="w-full bg-white border-t border-slate-200/90 px-4 sm:px-6 py-12 mx-auto" id="telephony-flow-section">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-headline text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Telephony Pipeline & Contact Center Flow
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Ultra low-latency neural pipeline built for public governance helplines (104/108/1905)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-semibold">
              SIP Trunk / WebSocket Duplex
            </span>
          </div>
        </div>

        {/* 4-Stage Visual Pipeline */}
        <div className="relative bg-gradient-to-b from-slate-50 to-blue-50/20 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md overflow-hidden">
          <div className="absolute top-1/2 left-16 right-16 h-1 -translate-y-6 bg-slate-200 hidden md:block rounded-full overflow-hidden">
            <div className="h-full w-32 bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500 rounded-full flow-line-dot"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {/* Stage 1 */}
            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-blue-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-2.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-200/60 text-blue-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">1. Citizen Caller</h3>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">GSM 8kHz Telephony</p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-amber-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-2.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-50 border border-amber-200/60 text-amber-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">call_split</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">2. Voice Gateway</h3>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">Spring Boot / SIP</p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-2.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">3. Indic NLU</h3>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">FastAPI + 7-Agent Swarm</p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-indigo-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-2.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-50 border border-indigo-200/60 text-indigo-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">volume_up</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">4. Neural Voice</h3>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">24kHz Audio Response</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Impact Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-blue-500/5 relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">IVR Disconnect Drop</span>
            <div className="text-4xl font-extrabold text-blue-700 tracking-tight my-2">-64%</div>
            <span className="text-xs text-slate-600 leading-relaxed block">Reduction versus standard robotic IVR queues</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-amber-500/5 relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Citizen CSAT Rating</span>
            <div className="text-4xl font-extrabold text-amber-700 tracking-tight my-2 flex items-center gap-1.5">
              4.9 / 5.0
              <span className="material-symbols-outlined text-amber-500 text-[26px]">star</span>
            </div>
            <span className="text-xs text-slate-600 leading-relaxed block">Across 1.4M beneficiaries in Telugu & Hindi</span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-emerald-500/5 relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Glass-to-Glass Latency</span>
            <div className="text-4xl font-extrabold text-emerald-700 tracking-tight my-2">&lt;140ms</div>
            <span className="text-xs text-slate-600 leading-relaxed block">Edge chunked WebSocket streaming with barge-in</span>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-7 sm:p-9 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl shadow-blue-600/25 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Deploy Indic Voice AI to Your Helplines</h3>
            <p className="text-xs sm:text-sm text-blue-100/90 mt-1 leading-relaxed">
              Compatible with 108/104/1905 Citizen Helplines and enterprise SIP switches with zero-cost client-native speech architecture.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={onOpenConsole}
              className="px-5 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95"
            >
              Test Live Voice Console
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
