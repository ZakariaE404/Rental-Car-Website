import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { vehicles, Vehicle } from '../data/vehicles';

interface ReservationWidgetProps {
    initialVehicle?: Vehicle | null;
    showCarSelection?: boolean;
    onBookingSuccess?: (whatsappUrl: string) => void;
}

const ReservationWidget: React.FC<ReservationWidgetProps> = ({ initialVehicle, showCarSelection = true, onBookingSuccess }) => {
    const { t } = useLanguage();
    const [selectedCar, setSelectedCar] = useState<Vehicle | null>(initialVehicle || null);
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        days: '',
        total_price: 0,
        payment_method: 'cash',
        user_name: '',
        phone: '',
        email: '',
        whatsapp: ''
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialVehicle) {
            setSelectedCar(initialVehicle);
        }
    }, [initialVehicle]);

    useEffect(() => {
        if (formData.start_date && formData.end_date && selectedCar) {
            const start = new Date(formData.start_date + 'T00:00:00');
            const end = new Date(formData.end_date + 'T00:00:00');
            const diffTime = end.getTime() - start.getTime();
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffTime === 0) diffDays = 1;

            if (diffDays > 0) {
                const total = diffDays * selectedCar.price;
                setFormData(prev => ({
                    ...prev,
                    days: diffDays.toString(),
                    total_price: total
                }));
            } else {
                setFormData(prev => ({ ...prev, days: '', total_price: 0 }));
            }
        }
    }, [formData.start_date, formData.end_date, selectedCar]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCar) {
            setStatus({ type: 'error', message: t('booking.carPlaceholder') });
            return;
        }

        setLoading(true);
        setStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/save_reservation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    car_id: selectedCar.id,
                    car_name: selectedCar.name
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', message: t('booking.success') });

                // --- Redirect to WhatsApp page ---
                if (result.whatsapp_url && onBookingSuccess) {
                    onBookingSuccess(result.whatsapp_url);
                } else if (result.whatsapp_url) {
                    // Fallback for homepage widget
                    setTimeout(() => {
                        window.location.href = result.whatsapp_url;
                    }, 1500);
                }

                setFormData({
                    start_date: '',
                    end_date: '',
                    days: '',
                    total_price: 0,
                    payment_method: 'cash',
                    user_name: '',
                    phone: '',
                    email: '',
                    whatsapp: ''
                });
            } else {
                setStatus({ type: 'error', message: result.message || t('booking.error') });
            }
        } catch (error) {
            setStatus({ type: 'error', message: t('booking.error') });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {status.type && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {showCarSelection && (
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.carSelect')}</label>
                        <select
                            className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                            value={selectedCar?.id || ''}
                            onChange={(e) => setSelectedCar(vehicles.find(v => v.id === parseInt(e.target.value)) || null)}
                            required
                        >
                            <option value="">{t('booking.carPlaceholder')}</option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedCar && !showCarSelection && (
                    <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100 mb-6">
                        <img src={selectedCar.image} alt={selectedCar.name} className="w-16 h-10 object-contain" />
                        <div>
                            <p className="text-xs font-black text-amber-600 uppercase tracking-widest">Véhicule Sélectionné</p>
                            <p className="font-bold text-slate-900">{selectedCar.name}</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.startDate')}</label>
                        <input
                            type="date"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                            required
                        />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.endDate')}</label>
                        <input
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                            required
                        />
                    </div>
                </div>

                {/* Dynamic Price Summary Card */}
                {selectedCar && formData.days && (
                    <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative group animate-in zoom-in duration-500">
                        {/* Decorative Background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 blur-[60px] rounded-full group-hover:bg-amber-500/30 transition-all duration-700" />

                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                            <div className="space-y-3 text-center md:text-left">
                                <p className="text-amber-500 font-black text-xs uppercase tracking-[0.2em]">{t('booking.total').toUpperCase()}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">{formData.total_price}</span>
                                    <span className="text-amber-500 font-black text-xl">{t('booking.dh')}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 w-full md:w-auto">
                                <div className="flex justify-between items-center gap-10 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('booking.perDay')}</span>
                                    <span className="text-white font-black text-sm">{selectedCar.price} {t('booking.dh')}</span>
                                </div>
                                <div className="flex justify-between items-center gap-10 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('booking.days')}</span>
                                    <span className="text-white font-black text-sm">{formData.days}</span>
                                </div>
                            </div>
                        </div>

                        {/* Subtle line divider */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('booking.priceNote')}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-1.5 md:space-y-2 mt-3 md:mt-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.paymentMethod')}</label>
                    <select
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                        className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                    >
                        <option value="cash">{t('booking.cash')}</option>
                        <option value="virement">{t('booking.virement')}</option>
                    </select>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.name')}</label>
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        placeholder={t('contact.form.namePlaceholder')}
                        className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.phone')}</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                            required
                        />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.whatsapp')}</label>
                        <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                        />
                    </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">{t('booking.email')}</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3.5 md:p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-amber-500 md:focus:ring-2 outline-none transition-all font-bold text-slate-700"
                    />
                </div>

                <div className="pt-2 flex justify-center w-full">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 md:hover:bg-slate-900 text-slate-900 md:hover:text-white font-black py-4 md:py-5 px-6 rounded-xl transition-all duration-300 uppercase tracking-[0.15em] text-[11px] md:text-sm active:bg-amber-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-5 md:mt-6 shadow-sm border border-amber-400"
                    >
                        {loading ? '...' : t('booking.submit')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationWidget;
