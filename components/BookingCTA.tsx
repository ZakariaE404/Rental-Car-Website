
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const BookingCTA: React.FC = () => {
  const { t } = useLanguage();
  const cities = ["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès", "Kénitra"];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with deep blue to terracotta-like gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 z-0"></div>

      {/* Moroccan pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-10 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 fill-current">
          <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </pattern>
          <rect width="100" height="100" fill="url(#cta-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Center Content: Content & Stats */}
          <div className="lg:w-3/4 text-white text-center mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-500 font-bold text-xs uppercase tracking-tighter mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
              {t('cta.badge')}
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {t('cta.title')} <br />
              <span className="text-amber-500">{t('cta.titleHighlight')}</span>
            </h2>

            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t('cta.description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-amber-500">50+</span>
                <span className="text-sm text-blue-200 uppercase tracking-widest font-bold">{t('cta.stats.vehicles')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-amber-500">7</span>
                <span className="text-sm text-blue-200 uppercase tracking-widest font-bold">{t('cta.stats.cities')}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-amber-500">24/7</span>
                <span className="text-sm text-blue-200 uppercase tracking-widest font-bold">{t('cta.stats.support')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-8 border-t border-white/10 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 group cursor-pointer justify-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.52c1.54.914 3.51 1.403 5.61 1.404 5.377 0 9.752-4.374 9.754-9.752.001-2.605-1.013-5.055-2.855-6.898-1.843-1.842-4.29-2.858-6.897-2.859-5.379 0-9.752 4.373-9.754 9.751 0 2.15.56 4.247 1.626 6.059l-1.066 3.893 3.982-1.045zm11.332-6.72c-.274-.137-1.62-.8-1.87-.891-.25-.091-.433-.137-.616.137-.183.274-.708.891-.867 1.073-.159.183-.317.206-.59.07-.274-.137-1.155-.426-2.199-1.357-.813-.725-1.362-1.62-1.522-1.893-.16-.274-.017-.422.12-.558.123-.122.274-.32.411-.48.137-.16.183-.274.274-.457.091-.183.046-.343-.023-.48-.069-.137-.616-1.486-.844-2.035-.223-.532-.447-.46-.616-.468-.158-.007-.341-.009-.524-.009-.183 0-.479.069-.73.343-.25.274-.959.937-.959 2.285 0 1.348.981 2.651 1.118 2.834.137.183 1.93 2.947 4.676 4.135.653.282 1.164.45 1.562.577.656.209 1.252.179 1.724.109.525-.077 1.62-.662 1.848-1.302.228-.64.228-1.188.16-1.302-.069-.114-.251-.183-.524-.32z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">{t('cta.whatsapp.label')}</p>
                  <p className="font-bold text-lg">+212 6 XX XX XX XX</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">{t('cta.whatsapp.hoursLabel')}</p>
                <p className="font-bold text-lg">{t('cta.whatsapp.hours')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
