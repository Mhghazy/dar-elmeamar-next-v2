"use client";
import { motion } from 'framer-motion';
import PrimaryButton from './Tools/Buttons/PrimaryButton';
import OutlineButton from './Tools/Buttons/OutlineButton';
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  textVariant,
  fadeIn,
} from '../utils/animations';
import { useLanguage } from '../context/LanguageContext';
import ImageSlider from './Tools/ImageSlider';
import HERO_IMAGES from '../config/heroImages';

type HeroProps = {
  images?: string[];
};

const Hero: React.FC<HeroProps> = ({ images }) => {
  const { t } = useLanguage();

  // Prefer prop images, then config, then fallback empty
  const defaultImages = images ?? HERO_IMAGES;

  return (
    <motion.section
      id="home"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center
                  bg-gradient-to-br from-teal-500 via-white to-teal-200
                  dark:from-gray-950 dark:via-gray-800 dark:to-gray-800
                  relative overflow-hidden"
    >
      {/* Background Image Slider */}
      <ImageSlider images={defaultImages} interval={4000} transitionDuration={1} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center"
        >
          {/*  Text Content */}
          <motion.div
            variants={fadeInUp}
            className="space-y-8 flex flex-col items-center "
          >
            <div className="space-y-4 ">
              <motion.h1
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                className="text-5xl md:text-6xl text-center font-bold text-white leading-tight"
              >
                {t.hero.titleStart}{' '}
                <div>
                  <motion.span
                    className="text-teal-400"
                    animate={{ scale: [1, 2, 1], opacity: [1.5, 0.3, 1.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {t.hero.titleHighlight}
                  </motion.span>{' '}
                  {t.hero.titleEnd}
                </div>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-xl flex flex-col items-center text-gray-300 leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div variants={scaleIn} className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton to="/contact" label={t.hero.cta} className="px-8 py-4 text-lg" />
              <OutlineButton to="/works" label={t.hero.learnMore} />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
