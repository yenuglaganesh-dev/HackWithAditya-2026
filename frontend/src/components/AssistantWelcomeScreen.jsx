import React from 'react';
import { 
  Sparkles, HelpCircle, GraduationCap, Landmark, 
  Sprout, HeartPulse, Compass, Mic, ArrowUpRight 
} from 'lucide-react';

export default function AssistantWelcomeScreen({ onSelectPrompt }) {
  const suggestions = [
    {
      category: 'Government Schemes',
      icon: Landmark,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
      title: 'PM-Kisan & Rythu Bharosa',
      prompt: 'రైతు భరోసా మరియు PM-Kisan పథకాలకు ఎవరు అర్హులు? నాకు వివరాలు చెప్పండి.'
    },
    {
      category: 'Education Assistance',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30',
      title: 'Scholarships & Higher Education',
      prompt: 'What are the top government scholarship schemes for undergraduate students in 2026?'
    },
    {
      category: 'Healthcare Information',
      icon: HeartPulse,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/30',
      title: 'Ayushman Bharat Eligibility',
      prompt: 'आयुष्मान भारत योजना के तहत मुफ्त इलाज के लिए पात्रता और आवेदन की प्रक्रिया क्या है?'
    },
    {
      category: 'Agriculture & Crop Advisory',
      icon: Sprout,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
      title: 'Crop Insurance & MSP Guidelines',
      prompt: 'వర్షాభావ పరిస్థితుల్లో ప్రత్యామ్నాయ పంటలు మరియు ప్రధానమంత్రి ఫసల్ బీమా యోజన వివరాలు ఏమిటి?'
    },
    {
      category: 'Explain Something',
      icon: Compass,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30',
      title: 'Multilingual AI Architecture',
      prompt: 'How does BhashaBridge AI recognize Telugu, Hindi, and English without losing the dialect nuance?'
    },
    {
      category: 'General Knowledge',
      icon: HelpCircle,
      color: 'from-sky-500/20 to-cyan-500/20 text-sky-300 border-sky-500/30',
      title: 'Local Welfare Office Assistance',
      prompt: 'మీ సేవ లేదా గ్రామ సచివాలయంలో అందుబాటులో ఉండే ముఖ్యమైన సర్టిఫికెట్ల వివరాలు చెప్పండి.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-16 flex flex-col items-center text-center space-y-8 select-none">
      
      {/* Brand Icon & Welcome Text */}
      <div className="space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-indigo-500 p-0.5 shadow-lg shadow-cyan-500/20 mx-auto flex items-center justify-center">
          <div className="w-full h-full bg-[#070e1b] rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hello! I'm <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">BhashaBridge AI</span>.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
            Ask me anything. You can type or speak in your preferred language — Telugu, Hindi, or English.
          </p>
        </div>

        {/* Multilingual Voice Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 font-medium">
          <Mic className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real Voice In & Out</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-300">Web Speech API</span>
        </div>
      </div>

      {/* Suggestion Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
        {suggestions.map((card, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPrompt(card.prompt)}
            className="group relative p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-sky-500/40 transition-all duration-200 flex flex-col justify-between cursor-pointer hover:shadow-lg hover:shadow-cyan-500/5 text-left"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                {card.category}
              </span>
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${card.color} border flex items-center justify-center`}>
                <card.icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-cyan-200 transition">
                {card.title}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                "{card.prompt}"
              </p>
            </div>

            <div className="mt-3 flex items-center gap-1 text-[11px] text-sky-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Ask BhashaBridge</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
