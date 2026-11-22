import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Menu, X, ArrowRight, Bot } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = localStorage.getItem('bhashabridge_selected_code') || 'auto';
  const [selectedLanguage, setSelectedLanguage] = useState(currentLang);

  const navLinks = [
    { name: t('nav.home', 'Home'), path: '/' },
    { name: t('nav.about', 'About'), path: '/about' },
    { name: t('nav.features', 'Features'), path: '/features' },
    { name: t('nav.agents', 'AI Agents'), path: '/agents' },
    { name: t('nav.technology', 'Technology'), path: '/technology' },
    { name: t('nav.howItWorks', 'How It Works'), path: '/how-it-works' },
    { name: t('nav.useCases', 'Use Cases'), path: '/use-cases' },
    { name: t('nav.portfolio', 'Portfolio'), path: '/portfolio' },
    { name: t('nav.voiceAssistant', 'Voice Assistant'), path: '/assistant' },
  ];

  const handleLangSelect = (code) => {
    setSelectedLanguage(code);
    const targetLang = code === 'auto' ? 'en' : (code.startsWith('te') ? 'te' : code.startsWith('hi') ? 'hi' : 'en');
    i18n.changeLanguage(targetLang);
    localStorage.setItem('bhashabridge_lang', targetLang);
    localStorage.setItem('bhashabridge_selected_code', code);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/studio';
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                BhashaBridge <span className="text-emerald-600">AI</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live
              </span>
            </div>
            <span className="text-[11px] text-emerald-700/80 font-medium tracking-wide hidden sm:block">
              {t('nav.tagline', 'Voice & Language AI for Bharat')}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-1 bg-emerald-50/60 border border-emerald-200/80 p-1.5 rounded-full text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-full font-medium transition-all duration-150 ${
                isActive(link.path)
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-emerald-950 hover:bg-emerald-100/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Action: Language Selector & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Header Language Selector (AUTO, తెలుగు, हिन्दी, ENGLISH) */}
          <div className="flex items-center bg-emerald-50/80 rounded-full p-1 border border-emerald-200 text-xs shadow-xs">
            <button
              onClick={() => handleLangSelect('auto')}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                selectedLanguage === 'auto'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
            >
              AUTO
            </button>
            <button
              onClick={() => handleLangSelect('te-IN')}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                selectedLanguage === 'te-IN' || selectedLanguage === 'te'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => handleLangSelect('hi-IN')}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                selectedLanguage === 'hi-IN' || selectedLanguage === 'hi'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => handleLangSelect('en-IN')}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                selectedLanguage === 'en-IN' || selectedLanguage === 'en'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
            >
              EN
            </button>
          </div>

          <Link
            to="/assistant"
            className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all shrink-0"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{t('nav.voiceAssistant', 'Voice Assistant')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 border border-emerald-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-emerald-100 px-5 py-4 space-y-3 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive(link.path)
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-600">
            <span>{t('nav.tagline', 'Voice & Language AI for Bharat')}</span>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>{t('nav.voiceAssistant', 'Voice Assistant')}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
