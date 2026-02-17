
import React from 'react';
import { vehicles } from '../data/vehicles';
import VehicleCard from './VehicleCard';
import { useLanguage } from '../context/LanguageContext';

interface HomeVehiclesProps {
    onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
}

const HomeVehicles: React.FC<HomeVehiclesProps> = ({ onNavigate }) => {
    const { t } = useLanguage();
    // Select first 4 vehicles or any specific 4 you want to feature
    const featuredVehicles = vehicles.slice(0, 4);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-blue-900 mb-4 uppercase tracking-tighter">
                        {t('vehicles.title')} <span className="text-amber-500">{t('vehicles.featuredTitle')}</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        {t('vehicles.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="h-full">
                            <VehicleCard vehicle={vehicle} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button
                        onClick={() => onNavigate('vehicles')}
                        className="group relative px-10 py-5 bg-blue-900 overflow-hidden text-white font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {t('vehicles.viewAll')}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeVehicles;
