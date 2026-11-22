import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-emerald-100 text-slate-600 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                BhashaBridge <span className="text-emerald-600">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your Language. Your Voice. Your AI. Built to empower 1.4 billion Indian citizens with natural regional voice conversations and verified government services.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase">
                Free-First Architecture
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="text-slate-600 hover:text-emerald-700 font-medium transition">Home</Link></li>
              <li><Link to="/about" className="text-slate-600 hover:text-emerald-700 font-medium transition">About the Mission</Link></li>
              <li><Link to="/features" className="text-slate-600 hover:text-emerald-700 font-medium transition">Key Capabilities</Link></li>
              <li><Link to="/agents" className="text-slate-600 hover:text-emerald-700 font-medium transition">AI Agents Mesh</Link></li>
              <li><Link to="/technology" className="text-slate-600 hover:text-emerald-700 font-medium transition">Multi-Agent Tech</Link></li>
              <li><Link to="/how-it-works" className="text-slate-600 hover:text-emerald-700 font-medium transition">How It Works</Link></li>
              <li><Link to="/use-cases" className="text-slate-600 hover:text-emerald-700 font-medium transition">Use Cases in Bharat</Link></li>
              <li><Link to="/portfolio" className="text-slate-600 hover:text-emerald-700 font-medium transition">Engineering Portfolio</Link></li>
              <li><Link to="/assistant" className="text-emerald-700 font-bold hover:underline transition">Launch AI Assistant</Link></li>
            </ul>
          </div>

          {/* Supported Languages & Dialects */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase mb-4">
              Languages & Dialects
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Telugu (తెలుగు) & Tenglish</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Hindi (हिन्दी) & Hinglish</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Indian English & Code-Mix</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Auto Script Detection</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 BhashaBridge AI. Built for Bharat 🇮🇳. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/portfolio" className="hover:text-emerald-700 transition">Portfolio</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-emerald-700 transition">Mission</Link>
            <span>•</span>
            <Link to="/technology" className="hover:text-emerald-700 transition">Stack</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
