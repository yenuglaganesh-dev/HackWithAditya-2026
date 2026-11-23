import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedLanguage, changeLanguage } = useLanguage();

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
    changeLanguage(code);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/studio';
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/65 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-cyan-300 to-blue-500 flex items-center justify-center text-[#06233a] shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-all">
            <Sparkles className="w-5 h-5 text-[#06233a]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-extrabold text-lg sm:text-xl tracking-tight text-white">
                BhashaBridge <span className="text-sky-300">AI</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links with Mosaic pill styling */}
        <div className="hidden xl:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-white/15 text-white shadow-inner border border-white/15'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Tools: Multilingual Selector + Get Started CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
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

          {/* Launch / Get Started Button */}
          <Link
            to="/assistant"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#06233a] bg-gradient-to-r from-sky-200 via-sky-300 to-cyan-400 hover:brightness-110 shadow-lg shadow-sky-400/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white"
            aria-label="Toggle navigation menu"
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
          {navLinks.map((item) => (
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
    </nav>
  );
}
