"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { assets } from '@/lib/assets/assetFacade';

export default function AboutHero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    assets.preloadMany(['signature-estate-main.jpg']);
  }, []);

  return (
    <section 
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('${assets.resolveFullUrl('signature-estate-main.jpg')}')`,
            backgroundColor: '#0b3b33',
          }}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/40" /> {/* Darken */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#071410]" /> {/* Bottom fade to page bg */}
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span 
            className="inline-block text-teal-400 text-xs font-bold tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            {t.aboutPage.company.title || 'About Us'}
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight mb-8 tracking-tight">
            {t.aboutPage.hero.titleBefore} <span className="italic font-serif text-teal-50">{t.aboutPage.hero.titleAccent}</span>
          </h1>
          
          <div className="w-24 h-px bg-teal-500/50 mx-auto mb-10" />
          
          <p className="text-xl md:text-2xl text-gray-200/80 font-light max-w-2xl mx-auto leading-relaxed italic">
            {t.aboutPage.hero.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Elegant Bottom Line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      
      {/* Scroll Cue */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Explore</span>
        <motion.div 
          className="w-px h-12 bg-gradient-to-b from-teal-500/50 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
