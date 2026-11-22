import React from 'react';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      icon: "schema",
      title: "Multi-Agent Swarms",
      desc: "Autonomous planning with multi-agent debate and sovereign tool execution.",
      tag: "ReAct Engine"
    },
    {
      icon: "graphic_eq",
      title: "Indic Voice Engine",
      desc: "Full-duplex regional speech synthesis with natural emotion & prosody.",
      tag: "<140ms Duplex"
    },
    {
      icon: "menu_book",
      title: "Sovereign RAG",
      desc: "ChromaDB vector retrieval over verified Indian government welfare schemes.",
      tag: "Zero Hallucination"
    },
    {
      icon: "document_scanner",
      title: "Vision & Edge",
      desc: "Aadhaar masking, crop pest diagnosis, and vernacular OCR on device.",
      tag: "Edge ViT"
    }
  ];

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 py-6 mx-auto" id="capabilities-section">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map((c, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-soft hover:shadow-elevated hover:border-emerald-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all mb-3 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
              </div>
              <h3 className="font-headline font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                {c.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                {c.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-50">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                {c.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
