
import React from 'react';
import Marquee from './Marquee';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background with subtle animation */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/70 to-blue-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent"></div>
      </div>

      {/* Main Content Container with significantly more bottom padding to clear the marquee */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-32 pb-40 lg:pt-40 lg:pb-52">
        <div className="max-w-4xl">
          {/* Elite Branding Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-semibold text-xs tracking-[0.2em] mb-8 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]"></span>
            L'EXCELLENCE AUTOMOBILE AU MAROC
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
            {t('hero.title')}
          </h2>

          <h3 className="text-xl md:text-2xl text-slate-200 font-light mb-8 max-w-2xl border-l-2 border-amber-500 pl-6 py-1">
            {t('hero.subtitle')}
          </h3>

          <p className="text-lg text-slate-300 leading-relaxed mb-12 max-w-2xl font-light opacity-90">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-5">
            <button onClick={() => onNavigate('vehicles')} className="group relative px-10 py-5 bg-amber-500 overflow-hidden text-blue-950 font-black text-lg rounded-2xl shadow-[0_20px_40px_rgba(245,158,11,0.2)] transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10">{t('hero.search')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            <button onClick={() => onNavigate('about')} className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-xl font-bold text-lg rounded-2xl transition-all hover:border-amber-500/50">
              {t('hero.agency')}
            </button>
          </div>
        </div>
      </div>

      {/* Background Ornamental Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-5 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 fill-current">
          <circle cx="100" cy="0" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="0" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="0" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Marquee component - Anchor with absolute bottom positioning */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <Marquee />
      </div>
    </section>
  );
};

export default Hero;

