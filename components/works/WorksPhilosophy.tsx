'use client';
import { motion } from 'framer-motion';
import { assets } from '@/lib/assets/assetFacade';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WorksPhilosophy = () => {
  const { t } = useLanguage();
  const p = t.worksMarketing.philosophy;

  return (
    <section className="bg-white dark:bg-gray-950">
      {/* Intro Section */}
      <div className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-teal-600 dark:text-teal-400 text-xs tracking-widest uppercase font-medium mb-6 block"
            >
              {p.introBadge}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-8 leading-tight"
            >
              {p.introTitleLine} <br />
              <span className="italic font-serif">{p.introTitleAccent}</span>
            </motion.h2>
          </div>
          <div className="pt-2">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-8"
            >
              {p.introP1}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed"
            >
              {p.introP2}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Development & Achievements Detail */}
      <div className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
             <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-square rounded-sm overflow-hidden shadow-2xl dark:shadow-teal-900/10 border border-gray-100 dark:border-white/5"
            >
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('${assets.resolveFullUrl('signature-estate-main.jpg')}')`,
                  backgroundColor: '#0F3D2E' 
                }} 
              />
            </motion.div>
            <div>
              <h3 className="text-3xl font-light text-gray-900 dark:text-white mb-6">{p.achievementsTitle}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8">
                {p.achievementsP}
              </p>
              <ul className="space-y-4 mb-12">
                {p.achievementBullets.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-light">
                    <CheckCircle2 size={18} className="text-teal-600 dark:text-teal-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-8 border border-teal-600/10 bg-white dark:bg-gray-900 rounded-lg">
                <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2">{p.cardTitle}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
                  {p.cardDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Style & Quality */}
      <div className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-light text-gray-900 dark:text-white mb-6">{p.signatureTitle}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8">
              {p.signatureP}
            </p>
            
            <div className="space-y-10">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3">{p.archTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                  {p.archDesc}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3">{p.qaTitle}</h4>
                <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                  {p.qaDesc}
                </p>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-1 md:order-2 aspect-square rounded-sm overflow-hidden shadow-2xl dark:shadow-teal-900/10 border border-gray-100 dark:border-white/5"
          >
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url('${assets.resolveFullUrl('post-modern-villa.jpg')}')`,
                backgroundColor: '#1a1a1a'
              }} 
            />
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Grid */}
      <div className="py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">{p.whyTitle}</h3>
            <div className="w-20 h-[1px] bg-teal-600 mx-auto" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {p.whyCards.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-lg shadow-sm hover:shadow-md hover:border-teal-600/20 dark:hover:border-teal-400/20 transition-all duration-300"
              >
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{item.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Legacy Footer */}
      <div className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-6">{p.experienceTitle}</h3>
        <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-10 italic font-serif">
          &quot;{p.experienceQuote}&quot;
        </p>
      </div>
    </section>
  );
};

export default WorksPhilosophy;
