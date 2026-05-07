"use client";
import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SeeMoreButton from './Tools/Buttons/SeeMoreButton';
import HERO_IMAGES from '../config/heroImages';
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  textVariant,
} from '../utils/animations';
import { useLanguage } from '../context/LanguageContext';
import VantaBackground from './Tools/VantaBackground';
import DraggableCardDeck from './Tools/DraggableCardDeck';

const Services = () => {
  const { t } = useLanguage();

  // Build card list from HERO_IMAGES matching the legacy HTML order
  const cards = HERO_IMAGES.map((url) => ({
    image: url,
    backgroundSize: (url.includes('V%20395') ? 'contain' : 'cover') as 'cover' | 'contain',
  }));

  return (
    <motion.section
      id="services"
      className="relative h-full min-h-screen flex flex-col justify-between py-20  items-center
                 bg-gradient-to-br from-slate-50 to-white
                 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Vanta Background */}
      <VantaBackground enabled={true} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h2
            variants={textVariant}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t.services.title}
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto ">
            {t.services.subtitle}
          </p>
          <SeeMoreButton to="/services" label={t.common.seeMore} />
        </motion.div>

        {/* Services Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={staggerContainer}
        >
          {t.services.list.map((service: { title: string; desc: string }, idx: number) => (
            <motion.div
              key={idx}
              variants={
                idx % 3 === 0
                  ? fadeInLeft
                  : idx % 3 === 1
                    ? scaleIn
                    : fadeInRight
              }
              className="  bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg
                         hover:shadow-2xl dark:hover:shadow-teal-900 transition-all hover:-translate-y-1
                         border border-gray-100 dark:border-gray-700 "
            >
              <motion.div
                variants={scaleIn}
                className="bg-teal-100 dark:bg-teal-900 w-14 h-14 rounded-lg flex items-center justify-center mb-4"
              >
                <Building2 size={28} className="text-teal-600 dark:text-teal-400" />
              </motion.div>
              <motion.h3
                variants={fadeInUp}
                className="text-xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {service.title}
              </motion.h3>
              <motion.p
                variants={fadeIn}
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {service.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Draggable Card Deck — replaces canvas CircularGallery */}
        <motion.div variants={fadeInUp}>
          <DraggableCardDeck cards={cards} cardWidth={629} cardHeight={354} />
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Services;
