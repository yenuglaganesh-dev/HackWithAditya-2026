import React from 'react';

export default function SovereignFooter() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/90 py-8 mt-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        
        {/* Brand & Data Center Tag */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-[11px] shadow-xs">
            IN
          </div>
          <span className="font-medium">© 2026 AI for Bharat • Secured in Indian Tier-IV Data Centers</span>
        </div>

        {/* Compliance Badges */}
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            <span>DPDP Compliant (India)</span>
          </span>
          <span className="flex items-center gap-1 text-blue-700 font-semibold">
            <span className="material-symbols-outlined text-[15px]">shield</span>
            <span>MeitY Empanelled</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
