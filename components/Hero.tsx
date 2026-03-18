import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { vehicles } from '../data/vehicles';
import heroMobile from '../assets/hero-mobile.png';
import heroDesktop from '../assets/hero-desktop.png';

interface HeroProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col overflow-hidden bg-slate-950">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {/* Mobile background (hidden on md+) */}
        <div
          className="hero-bg-mobile absolute inset-0 bg-cover bg-center scale-105 animate-[slow-zoom_20s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${heroMobile})` }}
        />
        {/* Desktop background (hidden below md) */}
        <div
          className="hero-bg-desktop absolute inset-0 bg-cover bg-center scale-105 animate-[slow-zoom_20s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${heroDesktop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/90" />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow container mx-auto px-6 md:px-12 flex flex-col justify-center items-center text-center pt-40 lg:pt-48 pb-20">
        <div className="max-w-5xl animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white font-bold text-[10px] md:text-xs tracking-[0.4em] mb-8 shadow-sm uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(var(--brand-rgb),0.8)]"></span>
            {t('nav.rentCar').toUpperCase()} AU MAROC
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter drop-shadow-2xl">
            PREMIUM <span className="text-amber-500">DRIVE</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 font-medium mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-12 w-full">
            <button
              onClick={() => onNavigate('vehicles')}
              className="w-full sm:w-auto px-12 py-5 bg-amber-500 hover:bg-white text-slate-950 font-black text-sm rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest border border-amber-400/50"
            >
              EXPLORER LA FLOTTE
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-xl font-bold rounded-lg transition-all hover:border-amber-500/50 uppercase tracking-widest text-sm"
            >
              {t('hero.agency')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        /* Responsive hero backgrounds */
        .hero-bg-mobile  { display: block; }
        .hero-bg-desktop { display: none;  }

        @media (min-width: 768px) {
          .hero-bg-mobile  { display: none;  }
          .hero-bg-desktop { display: block; }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fade-in;
        }
        
        .zoom-in {
          animation-name: zoom-in;
        }

        .slide-in-from-bottom {
          animation-name: slide-in-from-bottom;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slide-in-from-bottom {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .duration-1000 {
          animation-duration: 1000ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
};

export default Hero;

