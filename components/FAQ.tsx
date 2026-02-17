import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const rawFaqs = t<any>('faq.items');
  const faqs = Array.isArray(rawFaqs) ? rawFaqs : [];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">{t('faq.title')}</h4>
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-6">
            {t('faq.mainTitle')} <span className="text-amber-500">{t('faq.mainTitleHighlight')}</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-900 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 text-lg font-light">
            {t('faq.description')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index
                ? 'border-amber-500 bg-slate-50 shadow-lg'
                : 'border-slate-100 hover:border-slate-200'
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-blue-900' : 'text-slate-700'
                  }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-amber-500 text-white rotate-45' : 'bg-slate-100 text-slate-400'
                  }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="p-6 pt-0 text-slate-600 leading-relaxed font-light border-t border-slate-200/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
