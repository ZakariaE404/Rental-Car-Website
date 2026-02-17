import { useLanguage } from '../context/LanguageContext';
import React from 'react';

const TrustSection: React.FC = () => {
  const { t } = useLanguage();
  const trustPoints = t<string[]>('trust.points');
  const testimonials = t<Array<{ name: string; location: string; text: string; stars?: number; initials?: string }>>('trust.testimonials');

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-60"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left Side: Trust Content */}
          <div className="lg:w-[40%] sticky top-24">
            <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">{t('trust.title')}</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 leading-tight">
              {t('trust.mainTitle')} <span className="text-amber-500">{t('trust.mainTitleHighlight')}</span> {t('trust.mainTitleSuffix')}
            </h2>
            <p className="text-slate-600 text-lg mb-8 font-medium italic">
              "{t('trust.quote')}"
            </p>

            <div className="space-y-4 mb-10">
              {trustPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-900 flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-slate-700 font-light leading-snug">{point}</p>
                </div>
              ))}
            </div>

            {/* Trust Seal */}
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 flex items-center justify-center text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-900 font-bold text-lg">{t('trust.sealTitle')}</p>
                <p className="text-slate-500 text-sm">{t('trust.sealDesc')}</p>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/5 rounded-full"></div>
            </div>
          </div>

          {/* Right Side: Testimonials */}
          <div className="lg:w-[60%] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className={`bg-slate-50 p-8 rounded-[2rem] border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative ${i === 2 ? 'xl:col-span-2' : ''}`}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-8 text-blue-900/10">
                    <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, starIdx) => (
                      <svg
                        key={starIdx}
                        className={`w-5 h-5 ${starIdx < 5 ? 'text-amber-500' : 'text-slate-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-slate-600 mb-8 italic leading-relaxed relative z-10">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-blue-900">{testimonial.name}</p>
                      <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center lg:justify-start">
              <button className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-900 hover:text-white transition-all group">
                {t('trust.viewReviews')}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
