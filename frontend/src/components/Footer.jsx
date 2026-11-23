import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-[#E8EAED] text-[#707070] text-sm mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F58220] to-[#E96B16] flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg text-[#202124] tracking-tight">
                BhashaBridge <span className="text-[#F58220]">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#707070] leading-relaxed max-w-sm">
              Your Voice. Your Language. Your AI. Built to empower 1.4 billion Indian citizens with natural regional voice conversations and verified government knowledge.
            </p>
            <div className="pt-1">
              <span className="bg-[#FFF3E8] text-[#E96B16] border border-[#FBD3B6] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                100% Free-First Architecture
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#202124] uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="text-[#707070] hover:text-[#F58220] transition">Home</Link></li>
              <li><Link to="/about" className="text-[#707070] hover:text-[#F58220] transition">About Mission</Link></li>
              <li><Link to="/features" className="text-[#707070] hover:text-[#F58220] transition">Features</Link></li>
              <li><Link to="/agents" className="text-[#707070] hover:text-[#F58220] transition">AI Agents Mesh</Link></li>
              <li><Link to="/assistant" className="text-[#F58220] font-bold hover:underline transition">Voice Assistant</Link></li>
            </ul>
          </div>

          {/* Technology Links */}
          <div>
            <h4 className="text-xs font-bold text-[#202124] uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/technology" className="text-[#707070] hover:text-[#F58220] transition">Architecture</Link></li>
              <li><Link to="/how-it-works" className="text-[#707070] hover:text-[#F58220] transition">How It Works</Link></li>
              <li><Link to="/use-cases" className="text-[#707070] hover:text-[#F58220] transition">Citizen Use Cases</Link></li>
              <li><Link to="/portfolio" className="text-[#707070] hover:text-[#F58220] transition">Engineering Portfolio</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-[#E8EAED] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707070]">
          <div>
            © 2026 BhashaBridge AI
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px]">ChromaDB RAG + OpenRouter Free LLM Active</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
