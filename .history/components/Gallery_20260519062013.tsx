"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import PrimaryButton from '@/components/Tools/Buttons/PrimaryButton';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useLanguage } from '../context/LanguageContext';
import { assets } from '@/lib/assets/assetFacade';
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
  // UI text mapping for project categories, e.g. "Residential" => "سكني", "Commercial" => "تجاري", etc.


  //  when a folder is selected or an image is active, we set the body's overflow to 'hidden' to prevent background scrolling. This ensures that the user can focus on the content of the selected folder or the lightbox without any distractions from the background content. When the user goes back to the main grid (i.e., deselects the folder) or closes the lightbox, we reset the overflow to 'unset', allowing normal scrolling behavior again.
  const galleryUi = t.galleryUi as Record<string, string>;
  //  This useEffect hook listens for changes to the selectedFolder and activeImage state variables. Whenever either of these variables changes, it checks if there is a selected folder or an active image. If there is, it sets the document body's overflow style to 'hidden', which prevents the background content from scrolling. If there isn't a selected folder or active image (i.e., the user has closed the modal or lightbox), it resets the overflow style to 'unset', allowing normal scrolling behavior again. The cleanup function ensures that if the component unmounts while a folder is selected or an image is active, the overflow style will be reset to 'unset' to prevent any potential issues with lingering styles.
  useEffect(() => {
    if (selectedFolder || activeImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedFolder, activeImage]);

  useEffect(() => {
    async function loadData() {
      try {
        const projects = await getProjects();
        if (projects) setDbProjects(projects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
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
              <ArrowRight size={20} className={`${isAr ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
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
                <div className="absolute -top-3 left-6 w-28 h-8 bg-gray-100 dark:bg-[#1a1a1a] rounded-t-xl border-t border-x border-gray-200 dark:border-white/5" />
                <div className="relative z-10 bg-white dark:bg-[#121212] rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 transition-all duration-700 group-hover:-translate-y-3">
                  <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Image
                      src={assets.resolveUrl(folder.hero_image)}
                      alt={folder.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    <div className="absolute top-6 left-6">
                      <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                        <span className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
                          {/* */}
                          {galleryUi[folder.category.toLowerCase()] || folder.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6 group-hover:text-teal-600 transition-colors">
                      {isAr ? (folder.title_ar || folder.title) : folder.title}
                    </h3>
                    <div className="flex items-center gap-3 text-teal-600 text-sm font-semibold">
                      <span className="uppercase text-[11px] tracking-widest">{t.galleryUi.openWindow}</span>
                      <div className="h-[1px] w-8 bg-teal-600/30 group-hover:w-12 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Modal Logic */}
        <AnimatePresence>
          {selectedFolder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFolder(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#121212] rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/40" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <span className="ml-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                      {t.galleryUi.projectDetails} — {selectedFolder.id}
                    </span>
                  </div>
                  <button onClick={() => setSelectedFolder(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-16 scrollbar-hide">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-4xl md:text-5xl font-light mb-8">
                      {isAr ? (selectedFolder.title_ar || selectedFolder.title) : selectedFolder.title}
                    </h3>
                    <div className="space-y-20">
                      {selectedFolder.sections?.map((section: any, sIdx: number) => (
                        <div key={sIdx}>
                          <h4 className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-teal-600/30" /> {section.title}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.images?.map((img: any, iIdx: number) => (
                              <div
                                key={iIdx}
                                className="group relative aspect-video cursor-zoom-in rounded-2xl overflow-hidden bg-gray-100 dark:bg-black"
                                onClick={() => setActiveImage(img.src)}
                              >
                                <Image
                                  src={assets.resolveUrl(img.src)}
                                  alt="Gallery"
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <ZoomIn className="text-white" />
                                </div>
                              </div>
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

        {/* Lightbox */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
              onClick={() => setActiveImage(null)}
            >
              <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
                <X size={40} />
              </button>
              <div className="relative w-full h-[80vh]">
                <Image
                  src={assets.resolveUrl(activeImage)}
                  alt="Full size"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
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