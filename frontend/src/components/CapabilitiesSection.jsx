import React from 'react';

export default function CapabilitiesSection() {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-6 py-12 mx-auto" id="capabilities-section">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-700 font-bold uppercase tracking-wider mb-1">
          <span className="material-symbols-outlined text-[15px]">memory</span>
          <span>Sovereign Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-headline font-bold text-slate-900 tracking-tight">Core Capabilities</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
          Modular sovereign primitives engineered for zero foreign API dependencies, offline execution, and high concurrency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Cap 1: Multi-Agent Swarms */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-elevated hover:border-blue-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group cursor-default">
          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/30 transition-all mb-4">
              <span className="material-symbols-outlined text-[24px]">schema</span>
            </div>
            <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">Multi-Agent Swarms</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Autonomous planning loops with multi-agent debate, language routing, and sovereign tool execution.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-5">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">ReAct Engine</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200">Auto-Router</span>
          </div>
        </div>

        {/* Cap 2: Indic Voice Engine */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-elevated hover:border-emerald-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group cursor-default">
          <div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-500/30 transition-all mb-4">
              <span className="material-symbols-outlined text-[24px]">graphic_eq</span>
            </div>
            <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">Indic Voice Engine</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Full-duplex real-time Indic speech with regional dialect inflection, natural prosody, and acoustic models.
            </p>
          </div>
          <div className="flex items-center justify-between mt-5 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1 h-5">
              <span className="w-1 bg-emerald-500 rounded-full wave-bar-1"></span>
              <span className="w-1 bg-emerald-600 rounded-full wave-bar-2"></span>
              <span className="w-1 bg-blue-600 rounded-full wave-bar-3"></span>
              <span className="w-1 bg-amber-500 rounded-full wave-bar-4"></span>
              <span className="w-1 bg-emerald-500 rounded-full wave-bar-5"></span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">&lt;140ms DUPLEX</span>
          </div>
        </div>

        {/* Cap 3: Sovereign RAG */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-elevated hover:border-amber-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group cursor-default">
          <div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-amber-500/30 transition-all mb-4">
              <span className="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">Sovereign RAG</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Hybrid dense & keyword semantic retrieval over vernacular government scheme corpus with ChromaDB.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-5">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">ChromaDB Local</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold border border-amber-200">Zero Hallucination</span>
          </div>
        </div>

        {/* Cap 4: Computer Vision & Edge */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-elevated hover:border-indigo-400 hover:-translate-y-1.5 transition-all flex flex-col justify-between group cursor-default">
          <div>
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-indigo-500/30 transition-all mb-4">
              <span className="material-symbols-outlined text-[24px]">document_scanner</span>
            </div>
            <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">Computer Vision & Edge</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Auto Aadhaar masking, crop disease detection via ViT, and handwritten Indic script OCR.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-5">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">UIDAI Masked</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">INT4 Edge</span>
          </div>
        </div>

      </div>
    </section>
  );
}
