import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LocationSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
                    <span className="inline-block text-amber-500 font-bold text-xs tracking-[0.3em] uppercase mb-4">
                        {t('location.title')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        {t('location.heading')}
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
                        {t('location.description')}
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 group">
                    {/* Main Map */}
                    <div className="h-[500px] w-full bg-slate-100 relative">
                        <iframe
                            title="Our Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106371.74039328212!2d-7.669394635671512!3d33.57239780839818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sen!2sma!4v1709840000000!5m2!1sen!2sma"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        {/* Floating Info Card (Matching the design in the image) */}
                        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 w-full max-w-[280px] animate-in fade-in zoom-in duration-700 delay-300">
                            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white p-6 shadow-slate-900/10">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="text-slate-900 font-bold text-lg leading-tight">
                                            {t('location.officeName')}
                                        </h4>
                                        <p className="text-slate-500 text-sm mt-0.5">
                                            {t('location.address')}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-amber-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex text-slate-300">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-slate-400 text-[11px] font-bold">
                                        {t('location.noReviews')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* View Larger Map Floating Link - Bottom Left */}
                        <div className="absolute bottom-6 left-6 z-10 hidden md:block">
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg text-[10px] font-black uppercase tracking-widest text-slate-800 hover:bg-slate-50 transition-colors"
                            >
                                Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .animate-in {
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .slide-in-from-bottom {
          animation-name: slide-in-from-bottom;
        }
        .zoom-in {
          animation-name: zoom-in;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .duration-1000 { animation-duration: 1000ms; }
        .duration-700 { animation-duration: 700ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
        </section>
    );
};

export default LocationSection;
