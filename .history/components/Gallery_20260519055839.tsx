"use client";
// Force refresh to clear Turbopack stale cache for LayoutGroup
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X, ArrowLeft, ZoomIn } from 'lucide-react';
import PrimaryButton from '@/components/Tools/Buttons/PrimaryButton';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useLanguage } from '../context/LanguageContext';
import { type GalleryFolder } from '../config/galleryData';
import { publicGalleryCatalog } from '@/lib/gallery/publicCatalog';
import { assets } from '@/lib/assets/assetFacade';
import { supabase } from '@/lib/supabase/client';
import { getProjects } from '@/lib/gallery/projectRepository';

interface GalleryProps {
  initialProjects?: any[];
}

const Gallery = ({ initialProjects }: GalleryProps) => {
  const { t, language } = useLanguage();
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null);
  const [dbProjects, setDbProjects] = useState<any[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const isAr = language === 'ar';

  useEffect(() => {
    async function loadData() {
      // In Demo Mode (localStorage), we always need to check for client-side changes
      // even if the server provided initial projects.
      const projects = await getProjects();
      setDbProjects(projects);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <motion.section
      id="gallery"
      className="relative py-32 bg-white dark:bg-gray-950 transition-colors duration-700 overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{ backgroundImage: `url('${assets.resolveFullUrl('noise.svg')}')` }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
              {t.gallery.title}
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
              {t.gallery.subtitle}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Link
              href="/gallery"
              className="group flex items-center gap-4 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-medium transition-all shadow-xl shadow-teal-600/20"
            >
              <span>{t.galleryUi.visitFullGallery}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Folder Grid */}
        <motion.div
          variants={staggerContainer}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide"
        >
          {dbProjects.map((folder: any) => (
            <div key={folder.id} className="min-w-[85vw] md:min-w-0 snap-center">
              <motion.div
                variants={fadeInUp}
                onClick={() => setSelectedFolder(folder)}
                className="group relative cursor-pointer"
              >
                {/* Folder Tab */}
                <div className="absolute -top-3 left-6 w-28 h-8 bg-gray-100 dark:bg-[#1a1a1a] rounded-t-xl transition-colors duration-500 border-t border-x border-gray-200 dark:border-white/5" />

                <div className="relative z-10 bg-white dark:bg-[#121212] rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 transition-all duration-700 group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] group-hover:-translate-y-3">
                  <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <div className="relative w-full h-full">
                      {folder.hero_image ? (
                        <Image
                          src={assets.resolveUrl(folder.hero_image)}
                          alt={folder.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">No Hero Image</div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="absolute top-6 left-6">
                      <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full scale-90">
                        <span className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
                          {(t.galleryUi as any)[folder.category.toLowerCase()] || folder.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-10">
                    <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {isAr ? (folder.title_ar || folder.title) : folder.title}
                    </h3>
                    <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400 text-sm font-semibold tracking-wide">
                      <span className="uppercase text-[11px] tracking-widest">{t.galleryUi.openWindow}</span>
                      <div className="h-[1px] w-8 bg-teal-600/30 group-hover:w-12 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Small Window (Modal) */}
        <AnimatePresence>
          {selectedFolder && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-12 overflow-y-auto pt-32 md:pt-48 scrollbar-hide">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFolder(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl min-h-[50vh] bg-white dark:bg-[#121212] rounded-[32px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 flex flex-col"
              >
                {/* Window Header Bar */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 dark:bg-red-500/40" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 dark:bg-yellow-500/40" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20 dark:bg-green-500/40" />
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] font-bold">
                      {t.galleryUi.projectDetails} — {selectedFolder.id}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all group"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-12">
                  <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 bg-teal-600/10 text-teal-600 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
                      {selectedFolder.category}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-light text-gray-900 dark:text-white mb-8 leading-tight">
                      {isAr ? (selectedFolder.title_ar || selectedFolder.title) : selectedFolder.title}
                    </h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-12">
                      {isAr ? (selectedFolder.description_ar || selectedFolder.description) : selectedFolder.description}
                    </p>

                    <div className="space-y-24">
                      {selectedFolder.sections?.map((section: any, sIdx: number) => (
                        <div key={sIdx}>
                          <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-8 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-teal-600" />
                            {section.title}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {section.images?.map((img: any, iIdx: number) => (
                              <motion.div
                                key={iIdx}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setActiveImage(img.src)}
                                className="group relative aspect-video bg-gray-100 dark:bg-[#0a0a0a] rounded-2xl overflow-hidden cursor-zoom-in border border-white/5"
                              >
                                {img.src ? (
                                  <Image
                                    src={assets.resolveUrl(img.src)}
                                    alt={img.alt || 'Gallery Image'}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Full Screen Lightbox */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
              onClick={() => setActiveImage(null)}
            >
              <button className="absolute top-8 right-8 text-white/50 hover:text-white p-2">
                <X size={40} strokeWidth={1} />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={assets.resolveUrl(activeImage)}
                  alt={t.galleryUi.fullSizeAlt}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <PrimaryButton to="/contact" label={t.galleryUi.contactUsCta} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Gallery;
