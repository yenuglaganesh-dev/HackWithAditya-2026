import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Globe, Menu, X, ArrowRight, Bot } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Technology', path: '/technology' },
    { name: 'Use Cases', path: '/use-cases' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/85 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-bharat-orange via-amber-500 to-bharat-violet flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/20">
            <Sparkles className="w-6 h-6 text-navy-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-200 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                BhashaBridge
              </span>
              <span className="text-xs font-bold text-slate-100 bg-bharat-violet/30 border border-bharat-violet/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                AI
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              Voice & Language for Bharat
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-navy-800/50 border border-slate-700/50 p-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-800/70 border border-slate-700/60 text-xs text-slate-300 font-medium">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>తెలుగు • हिन्दी • English</span>
          </div>

          <Link
            to="/assistant"
            className="flex items-center gap-2 bg-gradient-to-r from-bharat-orange via-amber-500 to-amber-600 hover:from-amber-500 hover:to-bharat-orange text-navy-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Bot className="w-4 h-4 text-navy-900" />
            <span>Try AI Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/assistant"
            className="flex items-center gap-1 bg-amber-500 text-navy-900 font-bold text-xs px-3 py-2 rounded-lg"
          >
            <span>Launch</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900/98 border-b border-slate-800 px-6 py-5 space-y-4 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition ${
                  isActive(link.path)
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-navy-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Native Telugu, Hindi & English Voice Processing</span>
            </div>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-bharat-orange to-amber-500 text-navy-900 font-bold py-3.5 rounded-xl text-center shadow-lg shadow-amber-500/20"
            >
              <Bot className="w-5 h-5" />
              <span>Launch Live AI Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
