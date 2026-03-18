
import React from 'react';
import { Vehicle } from '../data/vehicles';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

interface VehicleCardProps {
    vehicle: Vehicle;
    onSelectVehicle?: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelectVehicle }) => {
    const { t } = useLanguage();
    const { settings } = useSettings();

    return (
        <div
            className="bg-white rounded-lg overflow-hidden border border-slate-100 shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:border-slate-200 group h-full"
        >
            {/* Image Container 16:9 Aspect Ratio */}
            <div className="relative aspect-video overflow-hidden bg-slate-50 border-b border-slate-100">
                <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Content Container */}
            <div className="p-8 pt-2 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-amber-500 uppercase tracking-tight">
                        {vehicle.name}
                    </h3>
                    <div className="text-right">
                        <span className="block text-xl font-black text-slate-900">{vehicle.price} DH/{t('vehicles.day')}</span>
                    </div>
                </div>

                <p className="text-slate-500 text-[12px] font-medium leading-relaxed mb-8 min-h-[4.5em] line-clamp-3">
                    {t(`vehicles.list.${vehicle.id}`)}
                </p>

                {/* Specs inline horizontal row of chips */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                        <div className="text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                            </svg>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{vehicle.places.replace("Places", "")} {t('vehicles.specs.seats')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                        <div className="text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.964 2.815a.75.75 0 0 1 .536.714v.252a.75.75 0 0 1-1.5 0V3.529a.75.75 0 0 1 .536-.714ZM16.313 4.204a.75.75 0 0 1 1.06 0l.178.178a.75.75 0 0 1-1.06 1.061l-.178-.178a.75.75 0 0 1 0-1.06ZM19.5 7.5c.344 0 .662.115.918.31l.252-.252a.75.75 0 0 1 1.06 1.06l-.252.253a4.5 4.5 0 1 1-1.978-1.37ZM18 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM4.204 16.313a.75.75 0 0 1 1.061-1.06l.178.178a.75.75 0 0 1-1.06 1.06l-.179-.178a.75.75 0 0 1 0-1.06ZM3.529 11.464a.75.75 0 0 1 .714.536h.252a.75.75 0 0 1 0 1.5h-.252a.75.75 0 0 1-.714-.536.75.75 0 0 1 0-1.5ZM4.204 7.687a.75.75 0 0 1 0-1.06l.178-.178a.75.75 0 0 1 1.06 1.06l-.178.178a.75.75 0 0 1-1.06 0ZM11.464 3.529a.75.75 0 0 1 .536.714v.252a.75.75 0 0 1-1.5 0V3.529a.75.75 0 0 1 .536-.714Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{t(`vehicles.specs.${vehicle.fuel.toLowerCase()}`)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                        <div className="text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L8.05 11.25h.45a.75.75 0 0 1 0 1.5h-.45l1.178 7.433c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567L15.95 12.75h-.45a.75.75 0 0 1 0-1.5h.45l-1.178-7.433c-.151-.904-.933-1.567-1.85-1.567h-1.844ZM9.75 12.75h4.5v-1.5h-4.5v1.5Z" />
                            </svg>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{vehicle.isAuto ? t('vehicles.specs.automatic') : t('vehicles.specs.manual')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                        <div className="text-slate-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75a2.25 2.25 0 0 1 2.25 2.25v13.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25h.75V3a.75.75 0 0 1 .75-.75ZM19.5 9h-15v10.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V9Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{t('vehicles.specs.year')} {vehicle.year}</span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (onSelectVehicle) {
                            onSelectVehicle(vehicle);
                        } else {
                            const message = `Bonjour, je suis intéressé par la location de votre ${vehicle.name} proposée à ${vehicle.price} DH/jour. Est-elle disponible ?`;
                            const url = `https://wa.me/${settings.phone}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                        }
                    }}
                    className="w-full bg-amber-500 hover:bg-slate-900 text-slate-900 hover:text-white font-black py-4 rounded-lg transition-all duration-300 uppercase tracking-[0.2em] text-[11px] shadow-sm active:scale-[0.98] mt-auto border border-amber-400"
                >
                    {t('vehicles.rentButton')}
                </button>
            </div>
        </div>
    );
};

export default VehicleCard;
