"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';
import { useLanguage } from '../../context/LanguageContext';

const GalleryCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-800 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.galleryPage.cta.title}</h2>
          <p className="text-xl text-teal-100 mb-8">{t.galleryPage.cta.subtitle}</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white dark:bg-teal-500 text-teal-600 dark:text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all">
            {t.galleryPage.cta.button}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryCTA;

