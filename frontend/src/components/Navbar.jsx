import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, Mic, Menu, X } from 'lucide-react';
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
    if (path === '/') return location.pathname === '/' || location.pathname === '/home';
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8EAED] transition-all duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F58220] to-[#E96B16] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-headline font-bold text-lg sm:text-xl tracking-tight text-[#202124]">
              BhashaBridge <span className="text-[#F58220]">AI</span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-[#F58220] font-bold bg-[#FFF3E8]'
                    : 'text-[#202124] hover:text-[#F58220] hover:bg-[#F8F9FA]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action Tools: Language Selector & Voice Assistant Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector */}
          <div className="flex items-center bg-[#F8F9FA] border border-[#E8EAED] rounded-xl p-0.5 text-xs">
            {[
              { code: 'auto', label: 'AUTO' },
              { code: 'te', label: 'తెలుగు' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'en', label: 'EN' },
            ].map(({ code, label }) => {
              const selected =
                code === 'auto'
                  ? selectedLanguage === 'auto'
                  : selectedLanguage.startsWith(code);
              return (
                <button
                  key={code}
                  onClick={() => handleLangSelect(code)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition cursor-pointer ${
                    selected
                      ? 'bg-[#F58220] text-white font-bold shadow-xs'
                      : 'text-[#707070] hover:text-[#202124] font-medium'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Voice Assistant CTA Button */}
          <Link
            to="/assistant"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#F58220] to-[#E96B16] hover:brightness-105 shadow-md shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-white" />
            <span>Voice Assistant</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] flex items-center justify-center text-[#202124]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8EAED] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                isActive(link.path)
                  ? 'bg-[#FFF3E8] text-[#F58220]'
                  : 'text-[#202124] hover:bg-[#F8F9FA]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#F58220] to-[#E96B16] shadow-md shadow-orange-500/25"
            >
              <Mic className="w-4 h-4 text-white" />
              <span>Launch Voice Assistant</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
