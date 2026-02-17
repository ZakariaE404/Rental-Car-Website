import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Blog: React.FC = () => {
  const { t } = useLanguage();
  const rawPosts = t<any>('blog.posts');
  const posts = Array.isArray(rawPosts) ? rawPosts : [];

  return (
    <section id="blog" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h4 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">{t('blog.title')}</h4>
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-6">
            {t('blog.mainTitle')} <span className="text-amber-500">{t('blog.mainTitleHighlight')}</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-900 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.date}
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{post.author}</span>
                </div>

                <h3 className="text-xl font-bold text-blue-900 mb-4 leading-tight group-hover:text-amber-500 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <button className="text-blue-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2 group/btn hover:text-amber-500 transition-colors">
                    {t('blog.readMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
