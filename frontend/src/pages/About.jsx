import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Target, Users, Sparkles, Shield, Award, ArrowRight } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF3E8] border border-[#FBD3B6] text-[#E96B16] text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse" />
          <span>{t('aboutPage.badge', 'About the Project')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202124] tracking-tight leading-tight">
          {t('aboutPage.title', 'Breaking Language Barriers for Every Citizen in Bharat')}
        </h1>
        <p className="text-sm sm:text-base text-[#707070] max-w-2xl mx-auto leading-relaxed">
          {t('aboutPage.subtitle', 'BhashaBridge AI was conceptualized under the AI for Bharat track, solving accessibility challenges through multilingual voice intelligence.')}
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <div className="bg-white border border-[#E8EAED] p-8 rounded-3xl space-y-4 shadow-card hover:border-[#FBD3B6] transition">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] text-[#F58220] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#202124]">{t('aboutPage.missionTitle', 'Our Mission')}</h2>
          <p className="text-xs sm:text-sm text-[#707070] leading-relaxed font-normal">
            {t('aboutPage.missionDesc', 'To ensure that no Indian citizen is left behind in the digital AI revolution due to linguistic barriers, illiteracy, or complex web user interfaces.')}
          </p>
        </div>

        <div className="bg-white border border-[#E8EAED] p-8 rounded-3xl space-y-4 shadow-card hover:border-[#FBD3B6] transition">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] text-[#F58220] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#202124]">{t('aboutPage.serveTitle', 'Who We Serve')}</h2>
          <p className="text-xs sm:text-sm text-[#707070] leading-relaxed font-normal">
            {t('aboutPage.serveDesc', 'Farmers seeking subsidies, students researching higher education entrance guidelines, elderly individuals applying for healthcare pensions, and rural families.')}
          </p>
        </div>

      </div>

      {/* Core Architectural Principles */}
      <div className="bg-white border border-[#E8EAED] p-8 sm:p-12 rounded-3xl mb-16 shadow-card">
        <h3 className="text-2xl font-bold text-[#202124] mb-8 text-center">{t('aboutPage.principlesTitle', 'Core Architectural Principles')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-[#F58220] font-bold text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F58220]" />
              <span>{t('aboutPage.p1Title', 'Strictly Free-First')}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#707070] leading-relaxed font-normal">
              {t('aboutPage.p1Desc', 'We never require citizens or organizations to pay for commercial AI API tokens.')}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[#F58220] font-bold text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#F58220]" />
              <span>{t('aboutPage.p2Title', 'Zero Hallucination RAG')}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#707070] leading-relaxed font-normal">
              {t('aboutPage.p2Desc', 'Government scheme information directly cites official departments and verified guidelines.')}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[#F58220] font-bold text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-[#F58220]" />
              <span>{t('aboutPage.p3Title', 'Dialect & Script Inclusivity')}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#707070] leading-relaxed font-normal">
              {t('aboutPage.p3Desc', 'Understands everyday code-mixed phrasing alongside native scripts.')}
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 btn-orange font-bold px-8 py-4 rounded-xl shadow-md shadow-orange-500/20 hover:scale-105 transition"
        >
          <span>{t('aboutPage.cta', 'Try BhashaBridge Assistant')}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
