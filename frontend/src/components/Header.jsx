import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

export default function Header({ selectedLanguage, onLanguageChange, onNewChat }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
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
    onLanguageChange(code);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/65 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all">
      <div className="h-16 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-cyan-300 to-blue-500 flex items-center justify-center text-[#06233a] shadow-lg shadow-sky-500/25 group-hover:scale-105 transition">
            <Sparkles className="w-5 h-5 text-[#06233a]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-white text-base sm:text-lg tracking-tight">
                BhashaBridge <span className="text-sky-300">AI</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill Bar */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-white/15 text-white shadow-inner border border-white/15'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Tools: Language Selector, New Chat, Get Started */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* New Chat Button */}
          {onNewChat && (
            <button
              onClick={onNewChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition cursor-pointer"
              title="Reset conversation session"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">{t('header.newChat', 'New Chat')}</span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => handleLangSelect('auto')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedLanguage === 'auto'
                  ? 'bg-sky-400 text-[#06233a] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              AUTO
            </button>
            <button
              onClick={() => handleLangSelect('te')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedLanguage.startsWith('te')
                  ? 'bg-sky-400 text-[#06233a] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => handleLangSelect('hi')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedLanguage.startsWith('hi')
                  ? 'bg-sky-400 text-[#06233a] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => handleLangSelect('en')}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedLanguage.startsWith('en')
                  ? 'bg-sky-400 text-[#06233a] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Launch / Get Started CTA */}
          <Link
            to="/assistant"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#06233a] bg-gradient-to-r from-sky-200 via-sky-300 to-cyan-400 hover:brightness-110 shadow-lg shadow-sky-400/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c0c10]/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-2 animate-in fade-in">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-semibold transition ${
                isActive(item.path)
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-[#06233a] bg-gradient-to-r from-sky-200 to-cyan-400"
            >
              <span>Get Started • Launch Voice Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
