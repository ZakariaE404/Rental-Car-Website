import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { vehicles } from '../data/vehicles';

const heroMobile = '/assets/hero-mobile.png';
const heroDesktop = '/assets/hero-desktop.png';

interface HeroProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="hero-container relative h-screen flex flex-col overflow-hidden bg-slate-950">
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
        <div className="absolute inset-0 hero-gradient-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow container mx-auto px-6 md:px-12 flex flex-col justify-center items-center text-center pt-40 lg:pt-48 pb-20">
        <div className="max-w-5xl animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white font-bold text-[10px] md:text-xs tracking-[0.4em] mb-10 shadow-sm uppercase">
            <span className="w-2 h-2 rounded-full hero-dynamic-bg shadow-[0_0_8px_rgba(var(--brand-rgb),0.8)]"></span>
            {t('nav.rentCar').toUpperCase()} AU MAROC
          </div>

          <h1 className="hero-premium-title text-6xl md:text-7xl lg:text-8xl text-white mb-10 drop-shadow-2xl">
            PREMIUM <span className="hero-dynamic-text">DRIVE</span>
          </h1>

          <p className="hero-subtitle text-lg md:text-2xl text-slate-200 font-medium mb-16 max-w-2xl mx-auto leading-relaxed opacity-90">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-16 w-full">
            <button
              onClick={() => onNavigate('vehicles')}
              className="hero-btn-primary w-full sm:w-auto px-12 py-5 text-slate-950 font-black text-sm uppercase tracking-widest"
            >
              EXPLORER LA FLOTTE
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hero-btn-secondary w-full sm:w-auto px-10 py-5 bg-white/5 text-white border border-white/10 backdrop-blur-xl font-bold uppercase tracking-widest text-sm"
            >
              {t('hero.agency')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

        .hero-gradient-overlay {
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
          z-index: 1;
        }

        .hero-premium-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -1px;
          line-height: 0.95;
        }

        .hero-dynamic-bg {
          background-color: var(--brand-color, #f59e0b);
        }

        .hero-dynamic-text {
          color: var(--brand-color, #f59e0b);
        }

        .hero-subtitle {
          font-family: 'Inter', sans-serif;
        }

        .hero-btn-primary {
          background-color: var(--brand-color, #f59e0b);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
          background-color: #ffffff;
        }

        .hero-btn-secondary {
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        
        .hero-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(var(--brand-rgb, 245, 158, 11), 0.5);
        }

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

