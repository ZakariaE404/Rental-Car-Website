import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32 -z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">{t('contact.title')}</h4>
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-6">
            {t('contact.mainTitle')} <span className="text-amber-500">{t('contact.mainTitleHighlight')}</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-900 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
            {t('contact.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            {/* Info Cards */}
            <div className="bg-blue-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('contact.phoneTitle')}</h3>
                <p className="text-blue-100 text-sm mb-6">{t('contact.phoneDesc')}</p>
                <a href="tel:+212600000000" className="text-2xl font-mono font-bold hover:text-amber-500 transition-colors">
                  +212 6 XX XX XX XX
                </a>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-900 mb-6 shadow-md group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{t('contact.emailTitle')}</h3>
              <a href="mailto:contact@vinci.ma" className="text-slate-600 font-medium hover:text-amber-500 transition-colors">contact@vinci.ma</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">{t('contact.form.name')}</label>
                  <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-all font-medium text-blue-900" placeholder={t('contact.form.namePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">{t('contact.form.phone')}</label>
                  <input type="tel" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-all font-medium text-blue-900" placeholder="+212 6..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">{t('contact.form.message')}</label>
                <textarea rows={4} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 transition-all font-medium text-blue-900 resize-none" placeholder={t('contact.form.messagePlaceholder')}></textarea>
              </div>
              <button className="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl text-lg hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/30 transition-all active:scale-[0.99] uppercase tracking-widest">
                {t('contact.form.sendButton')}
              </button>
              {formSubmitted && (
                <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center font-bold">
                  Message envoyé avec succès !
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
