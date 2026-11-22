import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CapabilitiesSection() {
  const { t } = useTranslation();

  const capabilities = [
    {
      icon: "translate",
      title: t('capabilities.c1Title', 'Multilingual & Code-Mixed AI'),
      desc: t('capabilities.c1Desc', 'Native Telugu, Hindi and English conversation with robust support for Tenglish and Hinglish phrases.'),
      tag: t('capabilities.c1Tag', 'te / hi / en'),
      link: '/features'
    },
    {
      icon: "record_voice_over",
      title: t('capabilities.c2Title', 'Voice Input & Speech Output'),
      desc: t('capabilities.c2Desc', 'Browser-native Web Speech recognition and SpeechSynthesis TTS with Listen Aloud functionality.'),
      tag: t('capabilities.c2Tag', 'Free Voice'),
      link: '/assistant'
    },
    {
      icon: "library_books",
      title: t('capabilities.c3Title', 'ChromaDB RAG Citations'),
      desc: t('capabilities.c3Desc', 'Zero-cost local vector knowledge base retrieving verified guidelines for PM-Kisan, PMAY, and Ayushman Bharat.'),
      tag: t('capabilities.c3Tag', 'Verified Sources'),
      link: '/technology'
    },
    {
      icon: "diversity_3",
      title: t('capabilities.c4Title', 'Bharat Citizen Use Cases'),
      desc: t('capabilities.c4Desc', 'Tailored for Agriculture (Rythu Bharosa), Healthcare (PM-JAY), Education scholarships, and Digital Services.'),
      tag: t('capabilities.c4Tag', 'Citizen Impact'),
      link: '/use-cases'
    }
  ];

  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mx-auto" id="capabilities-section">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {capabilities.map((c, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-soft hover:shadow-elevated hover:border-emerald-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">{c.icon}</span>
              </div>
              <h3 className="font-headline font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                {c.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-normal">
                {c.desc}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between">
              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                {c.tag}
              </span>
              <Link
                to={c.link}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>{t('capabilities.exploreMore', 'View Details')}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
