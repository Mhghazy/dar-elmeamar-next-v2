'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { assets } from '@/lib/assets/assetFacade';
import { useLanguage } from '@/context/LanguageContext';

const WorksCTA = () => {
  const { t } = useLanguage();
  const c = t.worksMarketing.cta;

  return (
    <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${assets.resolveFullUrl('post-modern-villa-night.jpg')}')`, // Reusing hero BG for consistency
          backgroundColor: '#0F3D2E' 
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8"
        >
          {c.line1} <br />
          <span className="italic font-serif">{c.line2Accent}</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-teal-100/80 font-light max-w-2xl mx-auto mb-12"
        >
          {c.sub}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="/contact"
            className="px-12 py-5 bg-white text-gray-900 rounded-full font-medium hover:bg-teal-50 transition-all duration-300 shadow-xl"
          >
            {c.contact}
          </Link>
          <Link 
            href="/contact?start=project"
            className="px-12 py-5 border border-white/30 text-white rounded-full font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            {c.startProject}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksCTA;
