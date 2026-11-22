import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ onLaunchPlayground }) {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 pt-10 pb-6 flex flex-col items-center text-center mx-auto relative">
      {/* Soft Ambient Emerald Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-64 bg-emerald-400/15 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Minimal Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-4 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{t('hero.pill', 'BhashaBridge AI • AI for Bharat')}</span>
      </div>

      {/* Punchy Headline */}
      <h1 className="text-3xl sm:text-5xl font-headline font-extrabold text-slate-900 tracking-tight leading-tight">
        {t('hero.headline1', 'Voice & Language AI for')}{' '}
        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {t('hero.headlineHighlight', 'Bharat')}
        </span>
      </h1>

      {/* Crisp Description */}
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-3 font-normal leading-relaxed">
        {t('hero.description', 'Intelligent voice assistant enabling natural communication in Telugu, Hindi & English with code-mixed dialect understanding and verified government knowledge.')}
      </p>

      {/* Quick Call to Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onLaunchPlayground}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>{t('hero.explorePlayground', 'Explore Voice Playground')}</span>
          <ArrowDown className="w-4 h-4" />
        </button>

        <Link
          to="/portfolio"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-semibold text-xs sm:text-sm border border-emerald-200 shadow-xs hover:border-emerald-300 transition-all"
        >
          <span>{t('nav.portfolio', 'Portfolio')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
