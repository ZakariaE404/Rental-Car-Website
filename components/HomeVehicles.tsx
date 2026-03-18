
import React from 'react';
import { vehicles, Vehicle } from '../data/vehicles';
import VehicleCard from './VehicleCard';
import { useLanguage } from '../context/LanguageContext';

interface HomeVehiclesProps {
    onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact') => void;
    onSelectVehicle?: (vehicle: Vehicle) => void;
}

const HomeVehicles: React.FC<HomeVehiclesProps> = ({ onNavigate, onSelectVehicle }) => {
    const { t } = useLanguage();
    const featuredVehicles = vehicles.slice(0, 4);

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h4 className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6">COLLECTION EXCLUSIVE</h4>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[0.95]">
                        {t('vehicles.title')} <span className="text-amber-500">{t('vehicles.featuredTitle')}</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mb-8"></div>
                    <p className="text-slate-500 font-medium">
                        {t('vehicles.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="h-full">
                            <VehicleCard vehicle={vehicle} onSelectVehicle={onSelectVehicle} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <button
                        onClick={() => onNavigate('vehicles')}
                        className="group relative px-12 py-6 bg-slate-900 overflow-hidden text-white font-black text-[11px] rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-[0.3em]"
                    >
                        <span className="relative z-10 flex items-center gap-4">
                            {t('vehicles.viewAll')}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeVehicles;
