"use client";
import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { textVariant, fadeInUp } from '../../utils/animations';
import { useLanguage } from '../../context/LanguageContext';

const VantaBackground = dynamic(() => import('../Tools/VantaBackground'), {
  ssr: false,
});

const ServicesHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.section
      className="relative h-[60vh] bg-gradient-to-br from-teal-600 to-teal-800 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <VantaBackground enabled={true} />
      <div className="absolute inset-0 bg-black opacity-20 dark:opacity-5" />
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 variants={textVariant} initial="hidden" animate="visible" className="text-5xl md:text-7xl font-bold mb-6">
          {t.services.title}
        </motion.h1>
        <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-xl md:text-2xl max-w-3xl mx-auto">
          {t.servicesPage.hero.subtitle}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default ServicesHero;

