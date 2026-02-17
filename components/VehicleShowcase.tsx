
import React, { useState, useMemo, useEffect } from 'react';
import { vehicles } from '../data/vehicles';
import VehicleCard from './VehicleCard';
import { useLanguage } from '../context/LanguageContext';

const VehicleShowcase: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState(t('vehicles.categories.all'));

  useEffect(() => {
    setFilter(t('vehicles.categories.all'));
  }, [language, t]);

  const categories = [
    t('vehicles.categories.all'),
    t('vehicles.categories.city'),
    t('vehicles.categories.sedan'),
    t('vehicles.categories.suv'),
    t('vehicles.categories.auto')
  ];

  const filteredVehicles = useMemo(() => {
    if (filter === t('vehicles.categories.all')) return vehicles;
    if (filter === t('vehicles.categories.auto')) return vehicles.filter(v => v.isAuto);

    // Map translated category back to internal data category
    const categoryMap: Record<string, string> = {
      [t('vehicles.categories.city')]: "Citadines",
      [t('vehicles.categories.sedan')]: "Berlines",
      [t('vehicles.categories.suv')]: "SUV"
    };

    return vehicles.filter(v => v.category === categoryMap[filter]);
  }, [filter, t]);

  return (
    <div className="bg-white min-h-screen">
      {/* Immersive Dashboard Header */}
      <div className="relative h-[350px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2000&auto=format&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center pt-20">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight">
            {t('vehicles.title')}
          </h2>
          <p className="text-slate-300 max-w-5xl mx-auto text-[10px] md:text-sm leading-relaxed font-bold tracking-wide uppercase opacity-90">
            {t('vehicles.description')}
          </p>
        </div>
      </div>

      {/* Categories Filter Bar */}
      <div className="bg-slate-50 border-b border-slate-200 sticky top-16 md:top-[68px] z-30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-300 border ${filter === cat
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-amber-500 hover:text-amber-500'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto px-4 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleShowcase;
