import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, RefreshCw, Activity, Menu, X, Bot, Globe } from 'lucide-react';

export default function Header({ selectedLanguage, onLanguageChange, onNewChat, isScrolling, blurAmount }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active navigation items requested:
  // 1. Home, 2. About, 3. Features, 4. AI Agents, 5. Technology, 6. How It Works, 7. Use Cases, 8. Portfolio, 9. Voice Assistant
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      <div className="h-16 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                BhashaBridge AI
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                {t('nav.live', 'Live')}
              </span>
            </div>
            <p className="text-[11px] text-emerald-700/80 font-medium hidden md:block">
              {t('nav.tagline', 'Voice & Language AI for Bharat')}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links (All 9 items) */}
        <nav className="hidden xl:flex items-center gap-1 bg-emerald-50/50 p-1 rounded-full border border-emerald-100 text-xs">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1 rounded-full transition-all duration-150 ${
                isActive(item.path)
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-100/50 font-medium'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Scroll Motion Blur Indicator */}
          {isScrolling && (
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-mono border border-emerald-200 animate-pulse">
              <Activity className="w-3 h-3 text-emerald-600" />
              <span>{t('nav.motionBlur', 'Motion Blur')}: {blurAmount}px</span>
            </span>
          )}

          {/* Language Selector: AUTO, తెలుగు, हिन्दी, ENGLISH with bold & active background */}
          <div className="flex items-center bg-emerald-50/80 rounded-full p-1 border border-emerald-200 text-xs shadow-xs" role="radiogroup" aria-label="Language Selector">
            <button
              onClick={() => handleLangSelect('auto')}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                selectedLanguage === 'auto'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
              type="button"
              role="radio"
              aria-checked={selectedLanguage === 'auto'}
              title="Auto Detect Language"
            >
              AUTO
            </button>

            <button
              onClick={() => handleLangSelect('te-IN')}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                selectedLanguage === 'te-IN' || selectedLanguage === 'te'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
              type="button"
              role="radio"
              aria-checked={selectedLanguage === 'te-IN' || selectedLanguage === 'te'}
              title="Telugu (తెలుగు)"
            >
              తెలుగు
            </button>

            <button
              onClick={() => handleLangSelect('hi-IN')}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                selectedLanguage === 'hi-IN' || selectedLanguage === 'hi'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
              type="button"
              role="radio"
              aria-checked={selectedLanguage === 'hi-IN' || selectedLanguage === 'hi'}
              title="Hindi (हिन्दी)"
            >
              हिन्दी
            </button>

            <button
              onClick={() => handleLangSelect('en-IN')}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                selectedLanguage === 'en-IN' || selectedLanguage === 'en'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-emerald-950 font-normal hover:bg-emerald-100/60'
              }`}
              type="button"
              role="radio"
              aria-checked={selectedLanguage === 'en-IN' || selectedLanguage === 'en'}
              title="English"
            >
              ENGLISH
            </button>
          </div>

          {/* New Chat Button */}
          {onNewChat && (
            <button
              onClick={onNewChat}
              className="flex items-center gap-1 text-xs font-semibold bg-white hover:bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 transition shadow-xs cursor-pointer"
              title="Start New Chat Session"
              type="button"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">{t('nav.newChat', 'New Chat')}</span>
            </button>
          )}

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-emerald-100 transition cursor-pointer"
            aria-label="Toggle navigation menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-emerald-100 px-5 py-4 space-y-2 shadow-xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-emerald-100">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive(item.path)
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{t('nav.tagline', 'Voice & Language AI for Bharat')}</span>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{t('nav.voiceAssistant', 'Voice Assistant')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
