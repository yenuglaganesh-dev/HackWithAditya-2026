import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-bharat-orange to-bharat-violet flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-navy-900" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                BhashaBridge <span className="text-amber-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Language. Your Voice. Your AI. Built to empower 1.4 billion Indian citizens with natural regional voice conversations and verified government services.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase">
                Free-First Architecture
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-amber-400 transition">Sovereign Studio</Link></li>
              <li><Link to="/home" className="hover:text-amber-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition">About the Mission</Link></li>
              <li><Link to="/features" className="hover:text-amber-400 transition">Key Capabilities</Link></li>
              <li><Link to="/technology" className="hover:text-amber-400 transition">Multi-Agent Tech</Link></li>
              <li><Link to="/use-cases" className="hover:text-amber-400 transition">Use Cases in Bharat</Link></li>
              <li><Link to="/assistant" className="text-amber-400 font-bold hover:underline transition">Launch AI Assistant</Link></li>
            </ul>
          </div>

          {/* Supported Languages & Technology */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Supported Languages</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bharat-orange"></span>
                <span>Telugu (తెలుగు) & Tenglish</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Hindi (हिन्दी) & Hinglish</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bharat-violet"></span>
                <span>English (Indian Context)</span>
              </li>
              <li className="text-[11px] text-slate-500 pt-2">
                Auto-detection via unicode & phonetic markers.
              </li>
            </ul>
          </div>

          {/* Hackathon Credentials */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Project Recognition</h4>
            <div className="bg-navy-900 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-amber-300">HackWithAditya 2026</div>
              <div className="text-slate-400">Category: AI for Bharat – Voice and Language AI</div>
              <div className="text-[11px] text-slate-500 pt-1">
                OpenRouter Free LLMs • ChromaDB RAG • Web Speech API • Spring Boot 3 Gateway
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 BhashaBridge AI. Built with ❤️ for Bharat.
          </div>
          <div className="flex items-center gap-4">
            <span>Free-First Innovation</span>
            <span>•</span>
            <span>Zero Hallucination RAG</span>
            <span>•</span>
            <span>100% Client-Side Voice Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
