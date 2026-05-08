"use client";
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
} from '../utils/animations';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  return (
    <motion.section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            {t.contact.subtitle}
          </p>
          <Link href="/contact">
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 dark:bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold
                         hover:bg-teal-700 dark:hover:bg-teal-600 transition-all shadow-lg"
            >
              {t.common.seeMore}
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            variants={fadeInLeft}
          >
            {/* Phone */}
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-lg">
                <Phone className="text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{t.contact.info.phone}</h3>
                <p className="text-gray-600 dark:text-gray-400">+01507412000</p>
                <p className="text-gray-600 dark:text-gray-400">+23131088</p>
              </div>
            </div>

            {/* Email */}
            <motion.div className="flex items-start space-x-4 rtl:space-x-reverse" variants={fadeInUp}>
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-lg">
                <Mail className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{t.contact.info.email}</h3>
                <p className="text-gray-600 dark:text-gray-400">info@darelmeamar.com</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div className="flex items-start space-x-4 rtl:space-x-reverse" variants={fadeInUp}>
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-lg">
                <MapPin className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{t.contact.info.address}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.contact.info.locationValue}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form variants={fadeInRight} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{t.contact.form.name}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{t.contact.form.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{t.contact.form.message}</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              variants={scaleIn}
              className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-all hover:shadow-lg font-medium text-lg
                         dark:bg-teal-500 dark:text-gray-900 dark:hover:bg-teal-400"
            >
              {t.contact.form.send}
            </motion.button>
          </motion.form>
        </div>

        {/* Google Maps Section */}
        <motion.div
          className="mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t.contact.map.findUs}
          </h3>
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-teal-100 dark:border-teal-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55298.17627444327!2d31.515006636859304!3d29.975520789032934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458236153814db5%3A0x834a43183068e9b6!2z2KfZhNmF2YbYt9mC2Kkg2KfZhNi12YbYp9i52YrYqdiMINmC2LPZhSDYq9in2YTYqyDYp9mE2YLYp9mH2LHZhyDYp9mE2KzYr9mK2K_Zh9iMINmF2K3Yp9mB2LjYqSDYp9mE2YLYp9mH2LHYqeKArA!5e0!3m2!1sar!2seg!4v1762774651870!5m2!1sar!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dar Al-Maamar Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            {t.contact.map.visitOffice}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
