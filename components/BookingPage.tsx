import React from 'react';
import { Vehicle } from '../data/vehicles';
import ReservationWidget from './ReservationWidget';
import { useLanguage } from '../context/LanguageContext';

interface BookingPageProps {
    selectedVehicle: Vehicle | null;
}

const BookingPage: React.FC<BookingPageProps> = ({ selectedVehicle }) => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-600 rounded-full text-xs font-black tracking-widest uppercase mb-4">
                            {t('booking.title')}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                            {selectedVehicle ? `${selectedVehicle.name}` : t('booking.carSelect')}
                        </h1>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden transform transition-all duration-500">
                        <div className="bg-slate-900 px-6 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between border-b border-white/5">
                            <div className="text-center md:text-left">
                                <h3 className="text-white font-black text-lg md:text-xl uppercase tracking-tighter">{t('booking.title')}</h3>
                                <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">
                                    {selectedVehicle ? `${selectedVehicle.name}` : t('booking.subtitle')}
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 text-amber-500">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest">{t('booking.status')}</span>
                            </div>
                        </div>
                        <div className="p-4 md:p-8 bg-white">
                            <ReservationWidget
                                initialVehicle={selectedVehicle}
                                showCarSelection={!selectedVehicle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
