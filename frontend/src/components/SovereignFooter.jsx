import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { PixelText } from './ui/mosaic-prompt-template';

export default function SovereignFooter() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#050506] border-t border-white/10 text-zinc-400 text-xs py-14 px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Large Pixel Wordmark */}
        <div className="flex justify-center text-white/90 overflow-hidden py-4">
          <div className="w-full max-w-4xl">
            <PixelText text="BHASHABRIDGE" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-cyan-300 flex items-center justify-center text-[#06233a] font-bold shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wide text-sm">
                BhashaBridge AI
              </span>
              <p className="text-[11px] text-zinc-500">
                © 2026 Sovereign AI for Bharat • Free-First Multilingual Ecosystem
              </p>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-zinc-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/assistant" className="text-sky-400 hover:text-sky-300 font-semibold transition">Voice Assistant</Link>
          </div>

          {/* Architecture Badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono text-[11px]">
              ChromaDB RAG • OpenRouter Free LLM
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
