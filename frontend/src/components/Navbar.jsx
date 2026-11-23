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

  const navLinks = [];

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#F58220] to-[#E96B16] hover:brightness-105 shadow-md shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-white" />
            <span>Voice Assistant</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
