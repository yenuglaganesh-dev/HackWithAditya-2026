import React from 'react';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      icon: "translate",
      title: "Multilingual & Code-Mixed AI",
      desc: "Native Telugu, Hindi and English conversation with robust support for Tenglish and Hinglish phrases.",
      tag: "te / hi / en"
    },
    {
      icon: "record_voice_over",
      title: "Voice Input & Speech Output",
      desc: "Browser-native Web Speech recognition and SpeechSynthesis TTS with Listen Aloud functionality.",
      tag: "Free Voice"
    },
    {
      icon: "library_books",
      title: "ChromaDB RAG Citations",
      desc: "Zero-cost local vector knowledge base retrieving verified guidelines for PM-Kisan, PMAY, and Ayushman Bharat.",
      tag: "Verified Sources"
    },
    {
      icon: "diversity_3",
      title: "Bharat Citizen Use Cases",
      desc: "Tailored for Agriculture (Rythu Bharosa), Healthcare (PM-JAY), Education scholarships, and Digital Services.",
      tag: "Citizen Impact"
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
