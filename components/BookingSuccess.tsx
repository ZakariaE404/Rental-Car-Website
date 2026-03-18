import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BookingSuccessProps {
    whatsappUrl: string;
    onNavigate: (page: 'home' | 'vehicles' | 'about' | 'blog' | 'contact' | 'booking' | 'admin') => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ whatsappUrl, onNavigate }) => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative">
            {/* Background design elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-green-900/5 max-w-lg w-full text-center relative z-10 border border-slate-100 animate-in slide-in-from-bottom-8 duration-700">
                {/* Success Icon Animation */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                    <svg className="w-12 h-12 text-green-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-4">
                    Reservation Saved Successfully!
                </h1>
                
                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                    Your booking request has been securely recorded. To confirm and finalize your reservation instantly, please click the button below to complete the process on WhatsApp.
                </p>

                <div className="space-y-4">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20BE5A] text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current">
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157.1zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-1.5-9.7-2.8-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                        </svg>
                        Confirm via WhatsApp
                    </a>
                    
                    <button 
                        onClick={() => onNavigate('home')}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-colors text-sm uppercase tracking-widest"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
