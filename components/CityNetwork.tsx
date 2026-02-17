
import React from 'react';

import { useLanguage } from '../context/LanguageContext';

interface CityNetworkProps {
  onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
}

const CityNetwork: React.FC<CityNetworkProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const featuredCities = t<Array<{ name: string; image: string; description: string }>>('cities.featured');
  // Add images to the featuredCities from translations since translations don't have images
  // We need to merge them or just use the images from a local constant if translations only have text.
  // The translations I added do NOT have images. I must preserve the images.
  // I will make a local array of images and map them.

  const cityImages = [
    "../assets/cities/casa.jpeg", // Casablanca
    "../assets/cities/marrakech.jpeg", // Marrakech
    "../assets/cities/fes.jpeg", // Fes
    "../assets/cities/agadir.jpeg", // Agadir
    "../assets/cities/rabat.jpg", // Rabat
    "../assets/cities/tangier.webp"  // Tangier
  ];

  // Merge translation with images
  const featuredCitiesWithImages = featuredCities.map((city, index) => ({
    ...city,
    image: cityImages[index] || cityImages[0]
  }));

  const secondaryCities = t<string[]>('cities.secondary');

  return (
    <section id="villes" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900 fill-current">
          <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4">{t('cities.networkTitle')}</h4>
          <h2 className="text-2xl md:text-5xl font-extrabold text-blue-900 mb-6">
            {t('cities.mainTitle')} <br />
            <span className="text-amber-500">{t('cities.mainTitleHighlight')}</span>
          </h2>
          <div className="w-16 md:w-24 h-1 md:h-1.5 bg-blue-900 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {t('cities.description')}
          </p>
        </div>

        {/* Responsive Grid: 2 columns mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 mb-16">
          {featuredCitiesWithImages.map((city, index) => (
            <div
              key={index}
              className="group relative h-48 md:h-72 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center gap-1.5 md:gap-3 mb-1 md:mb-2">
                  <div className="w-1 h-3 md:w-1.5 md:h-6 bg-amber-500 rounded-full"></div>
                  <h3 className="text-sm md:text-2xl font-bold text-white tracking-tight">{city.name}</h3>
                </div>
                <p className="text-white/70 text-[8px] md:text-sm font-light italic line-clamp-1">{city.description}</p>

                <div className="mt-2 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0 hidden md:block">
                  <button className="text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    Choisir
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 border border-white/40 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">{t('cities.otherCitiesTitle')}</h3>
              <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed mb-6">
                {t('cities.otherCitiesDesc')}
              </p>
              <button onClick={() => onNavigate('vehicles')} className="px-6 py-2.5 md:px-8 md:py-3 bg-blue-900 text-white text-xs md:text-base font-bold rounded-xl md:rounded-2xl hover:bg-amber-500 transition-all shadow-lg">
                {t('cities.bookButton')}
              </button>
            </div>

            <div className="md:w-2/3 flex flex-wrap gap-1.5 md:gap-3 justify-center md:justify-start">
              {secondaryCities.map((city, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 md:px-5 md:py-2.5 bg-white text-slate-700 rounded-full border border-slate-200 text-[10px] md:text-sm font-semibold hover:border-amber-500 hover:text-amber-500 transition-all cursor-default"
                >
                  {city}
                </div>
              ))}
              <div className="px-3 py-1.5 md:px-5 md:py-2.5 bg-amber-100 text-amber-700 rounded-full border border-amber-200 text-[10px] md:text-sm font-bold animate-pulse">
                {t('cities.expansion')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityNetwork;
