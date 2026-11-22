import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, GraduationCap, Building2, HeartPulse, Shield, ArrowRight } from 'lucide-react';

export default function UseCases() {
  const cases = [
    {
      icon: Sprout,
      color: 'text-emerald-400',
      title: 'Agriculture & Farmer Welfare',
      desc: 'Farmers can speak in Telugu or Hindi to enquire about PM-Kisan installment dates, Rythu Bharosa subsidies, minimum support price guidelines, and drought assistance.',
      example: '"నాకు రైతు భరోసా ఎలా వస్తుంది? (How do I receive Rythu Bharosa?)"'
    },
    {
      icon: HeartPulse,
      color: 'text-rose-400',
      title: 'Public Healthcare & Insurance',
      desc: 'Underprivileged families can enquire about eligible hospitals, ₹5 Lakh coverage under Ayushman Bharat PM-JAY, and how to verify their family ration card.',
      example: '"आयुष्मान भारत में 5 लाख का इलाज किन अस्पतालों में मिलता है?"'
    },
    {
      icon: Building2,
      color: 'text-amber-400',
      title: 'Government Citizen Services',
      desc: 'Access verified guidelines for Pradhan Mantri Awas Yojana (PMAY housing loans), Aadhaar address updating, and DigiLocker electronic certificates without visiting brokers.',
      example: '"How can I link my Aadhaar to DigiLocker for driving licence storage?"'
    },
    {
      icon: GraduationCap,
      color: 'text-cyan-400',
      title: 'Education & Student Support',
      desc: 'First-generation rural students can enquire about state scholarship deadlines, national entrance examination guidelines, and fee reimbursement schemes in their mother tongue.',
      example: '"పోస్ట్ మెట్రిక్ స్కాలర్షిప్ దరఖాస్తుకు ఏ సర్టిఫికెట్లు కావాలి?"'
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          Bharat In Action
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Transforming Daily Lives Across India
        </h1>
        <p className="text-base sm:text-lg text-slate-300">
          Real-world applications where voice and language AI bridge the digital divide.
        </p>
      </div>

      {/* Grid of Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {cases.map((c, i) => (
          <div key={i} className="bg-navy-800/60 border border-slate-700/60 p-8 rounded-3xl space-y-4 hover:border-slate-500 transition">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-slate-700 flex items-center justify-center">
              <c.icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <h3 className="text-xl font-bold text-white">{c.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{c.desc}</p>
            <div className="bg-navy-900/90 border border-slate-800 p-3 rounded-xl text-xs text-amber-300 italic">
              Citizen query: {c.example}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-bharat-orange to-amber-500 text-navy-900 font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition"
        >
          <span>Ask a Question in Live Assistant</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
