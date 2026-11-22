import React from 'react';

export default function SovereignFooter() {
  return (
    <footer className="w-full bg-white border-t border-emerald-100 py-6 mt-10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
            IN
          </div>
          <span>© 2026 AI for Bharat • Voice & Language AI</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-emerald-800">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
            <span>DPDP Compliant (India)</span>
          </span>
          <span>•</span>
          <span>Tier-IV In-Country</span>
        </div>

      </div>
    </footer>
  );
}
