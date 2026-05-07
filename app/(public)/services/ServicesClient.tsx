'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import RefinedFAQ from '@/components/FAQ/RefinedFAQ';
import { assets } from '@/lib/assets/assetFacade';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { useLanguage } from '@/context/LanguageContext';

const easing = [0.22, 1, 0.36, 1] as const;

export default function ServicesClient() {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const s = t.servicesRoute;

  useEffect(() => {
    // Only preload above-the-fold images for performance
    assets.preloadMany([
      'services-hero-collage.png',
      'services-dev-visual.png',
      'c44b99ec-9fc8-44e1-a38e-7b72eb6ddb3a.png',
    ]);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Hero */}
      <section
        key="services-hero-collage"
        suppressHydrationWarning
        className="relative min-h-[72vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${assets.resolveFullUrl('services-hero-collage.png')}')`,
            backgroundColor: '#1a5f5a',
          }}
          initial={{ scale: reduceMotion ? 1 : 1.05 }}
          animate={{ scale: reduceMotion ? 1 : 1.08 }}
          transition={{
            duration: reduceMotion ? 0 : 18,
            repeat: reduceMotion ? 0 : Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-16 pb-24"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md text-teal-100 text-[11px] uppercase tracking-[0.35em] font-semibold mb-8"
          >
            {s.hero.badge}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.08] mb-6 text-white drop-shadow-sm"
          >
            {s.hero.headlineBefore}{' '}
            <span className="italic font-serif text-teal-100">{s.hero.headlineAccent}</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-100/95 font-light leading-relaxed mb-10"
          >
            {s.hero.sub}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-teal-900 font-medium shadow-xl shadow-black/20 hover:bg-teal-50 transition-colors duration-300"
            >
              {s.hero.ctaPrimary}
            </Link>
            <a
              href="#services-development"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/35 text-white font-medium backdrop-blur-md hover:bg-white/10 transition-all duration-300"
            >
              {s.hero.ctaSecondary}
              <ArrowRight size={18} className="opacity-90 rtl:rotate-180" />
            </a>
          </motion.div>
        </motion.div>

        <motion.a
          href="#services-development"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: easing }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          aria-label={s.hero.ctaSecondary}
        >
          <span className="text-[10px] uppercase tracking-[0.35em] font-medium">{s.hero.scroll}</span>
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} strokeWidth={1.25} />
          </motion.span>
        </motion.a>
      </section>

      {/* Section 1 — Real Estate Development */}
      <section
        id="services-development"
        className="relative scroll-mt-24 py-28 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `url('${assets.resolveFullUrl('services-dev-visual.png')}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0b3b33',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-teal-300 text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            >
              {s.dev.kicker}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-light text-white mb-8 leading-tight"
            >
              {s.dev.titleBefore}{' '}
              <span className="italic font-serif text-teal-100">{s.dev.titleAccent}</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl leading-relaxed text-gray-100/95 font-light">
              {s.dev.p1}
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-6 text-lg leading-relaxed text-gray-200/90 font-light">
              {s.dev.p2}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: easing }}
            className="hidden md:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-3 group">
              <motion.div
                className="h-[420px] rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url('${assets.resolveFullUrl('services-dev-visual.png')}')`,
                  backgroundColor: '#0b3b33',
                }}
                whileHover={reduceMotion ? {} : { scale: 1.03 }}
                transition={{ duration: 0.6, ease: easing }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Architectural Design */}
      <section
        id="services-architecture"
        className="scroll-mt-24 py-24 md:py-28 bg-gray-50 dark:bg-gray-950 relative overflow-hidden"
      >
        <div className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-teal-500/5 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-20 items-center relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-teal-600 dark:text-teal-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            >
              {s.arch.kicker}
            </motion.span>
            <motion.h3
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-light mb-6 text-gray-900 dark:text-white leading-tight"
            >
              {s.arch.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light">
              {s.arch.p}
            </motion.p>
            <motion.ul variants={fadeInUp} className="space-y-4">
              {s.arch.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-200 font-light">
                  <CheckCircle2 size={20} className="text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: easing }}
            className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-white/10 bg-white dark:bg-gray-900"
          >
            <motion.div
              className="h-80 md:h-[420px] bg-cover bg-center"
              style={{
                backgroundImage: `url('${assets.resolveFullUrl('c44b99ec-9fc8-44e1-a38e-7b72eb6ddb3a.png')}')`,
                backgroundColor: '#1a5f5a',
              }}
              whileHover={reduceMotion ? {} : { scale: 1.04 }}
              transition={{ duration: 0.55, ease: easing }}
            />
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Premium Finishing */}
      <section
        id="services-finishing"
        className="scroll-mt-24 py-24 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: '#0b3b33' }}
      >
        <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 lg:gap-16 items-center text-white relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.span variants={fadeInUp} className="inline-block text-teal-200/90 text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              {s.finishing.kicker}
            </motion.span>
            <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-light mb-6 leading-tight">
              {s.finishing.title}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-lg leading-relaxed mb-6 font-light text-gray-100/95">
              {s.finishing.p1}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg leading-relaxed font-light text-gray-200/90">
              {s.finishing.p2}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {(
              [
                ['finishing1.png', '#d4a574'],
                ['finishing2.png', '#8b5a3c'],
                ['finishing3.png', '#2a2a2a'],
                ['finishing4.png', '#a8a8a8'],
              ] as const
            ).map(([img, bg], i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: easing }}
                whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
                className="group relative h-44 rounded-xl overflow-hidden shadow-lg shadow-black/25 ring-1 ring-white/10 cursor-default"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${assets.resolveFullUrl(img)}')`,
                    backgroundColor: bg,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Integrated Approach */}
      <section className="py-24 md:py-28 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-white/5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <motion.span variants={fadeInUp} className="text-teal-600 dark:text-teal-400 text-xs tracking-[0.3em] uppercase font-semibold mb-4 block">
            {s.integrated.kicker}
          </motion.span>
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-light mb-6">
            {s.integrated.title}
          </motion.h3>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            {s.integrated.body}
          </motion.p>
        </motion.div>
      </section>

      {/* Section 5 — Design Philosophy */}
      <section className="py-28 md:py-36 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-6xl mx-auto px-6 text-center relative"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1]">
            {s.philosophy.titleBefore}{' '}
            <span className="italic font-serif text-teal-700 dark:text-teal-400">{s.philosophy.titleAccent}</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            {s.philosophy.body}
          </motion.p>
        </motion.div>
      </section>

      <RefinedFAQ />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: t.faqItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />

      {/* CTA */}
      <section className="relative py-24 md:py-28 overflow-hidden bg-gradient-to-br from-[#0b3b33] via-[#083028] to-[#062018]">
        <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="relative max-w-6xl mx-auto px-6 text-center"
        >
          <motion.h3 variants={fadeInUp} className="text-3xl md:text-5xl font-light text-white mb-5 leading-tight">
            {s.cta.title}
          </motion.h3>
          <motion.p variants={fadeInUp} className="text-lg text-teal-100/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {s.cta.body}
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-teal-900 font-semibold shadow-xl hover:bg-teal-50 transition-colors duration-300 min-w-[200px]"
            >
              {s.cta.contact}
            </Link>
            <Link
              href="/contact?start=project"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-300 min-w-[200px]"
            >
              {s.cta.startProject}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
