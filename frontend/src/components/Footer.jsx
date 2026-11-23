import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { PixelText } from './ui/mosaic-prompt-template';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#050506] border-t border-white/10 text-zinc-400 text-sm mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Large Pixel Wordmark */}
        <div className="flex justify-center text-white/90 overflow-hidden pb-10">
          <div className="w-full max-w-4xl">
            <PixelText text="BHASHABRIDGE" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-6 border-t border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-cyan-300 to-blue-500 flex items-center justify-center text-[#06233a] font-bold shadow-md">
                <Sparkles className="w-5 h-5 text-[#06233a]" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                BhashaBridge <span className="text-sky-300">AI</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your Language. Your Voice. Your AI. Built to empower 1.4 billion Indian citizens with natural regional voice conversations and verified government services.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="bg-sky-500/10 text-sky-300 border border-sky-400/20 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase">
                Free-First Architecture
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="text-zinc-400 hover:text-white font-medium transition">Home</Link></li>
              <li><Link to="/assistant" className="text-sky-400 font-bold hover:underline transition">Launch AI Voice Assistant</Link></li>
            </ul>
          </div>

          {/* Technology Highlights */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-4">
              System Architecture
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="text-white font-bold">7 Autonomous AI Agents</div>
              <p className="text-zinc-400 leading-relaxed">
                Orchestrator, Language Intelligence, ChromaDB RAG, Gov Research, Response Generator, Fact Verification, and Web Voice.
              </p>
              <div className="pt-2 text-[11px] text-sky-300 font-mono">
                te-IN • hi-IN • en-IN
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 mt-10 border-t border-white/10 text-center text-xs text-zinc-500">
          <p>© 2026 BhashaBridge AI. Built for National Hackathon 2026. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
