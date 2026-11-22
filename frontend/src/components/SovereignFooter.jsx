import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function SovereignFooter() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-white border-t border-emerald-100 py-6 mt-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
            IN
          </div>
          <span>{t('footer.copyright', '© 2026 BhashaBridge AI • Voice & Language AI for Bharat')}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px] text-emerald-800">
          <Link to="/portfolio" className="hover:underline font-bold text-emerald-700">
            {t('nav.portfolio', 'Portfolio')}
          </Link>
          <span>•</span>
          <Link to="/technology" className="hover:underline">
            {t('nav.technology', 'Technology')}
          </Link>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
            <span>{t('footer.tech', 'ChromaDB RAG • OpenRouter Free LLM')}</span>
          </span>
          <span>•</span>
          <span>{t('footer.hackathon', 'HackWithAditya 2026')}</span>
        </div>

      </div>
    </footer>
  );
}
