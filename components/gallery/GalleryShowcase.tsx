'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { type GalleryFolder } from '@/config/galleryData';
import { publicGalleryCatalog } from '@/lib/gallery/publicCatalog';
import { nextFolderCircular, prevFolderCircular } from '@/lib/gallery/galleryNavigation';
import { assets } from '@/lib/assets/assetFacade';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import type { TranslationKey } from '@/locales/translations';

import { supabase } from '@/lib/supabase/client';
import { getProjects } from '@/lib/gallery/projectRepository';


const GalleryShowcase = () => {
  const { t, language } = useLanguage();
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const projects = await getProjects();
      setDbProjects(projects);
      setLoading(false);
    }
    loadData();
  }, []);

  const ui = t.galleryUi;

  return (
    <section className="relative py-32 px-6 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-700 overflow-hidden">
      {/* Background Texture & Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <LayoutGroup>
          {!selectedFolder ? (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide"
            >
              {(() => {
                const dbFolders: any[] = dbProjects.map(proj => ({
                  id: proj.id,
                  title: proj.title,
                  title_ar: proj.title_ar,
                  category: proj.category,
                  description: proj.description,
                  description_ar: proj.description_ar,
                  heroImage: proj.hero_image || proj.image_url,
                  sections: proj.sections || []
                }));
                
                return dbFolders.map((folder, index) => (
                  <div key={folder.id} className="min-w-[85vw] md:min-w-0 snap-center">
                    <FolderCard 
                      folder={folder} 
                      onClick={() => setSelectedFolder(folder)}
                      priority={index < 3}
                      viewCollectionLabel={ui.viewCollection}
                    />
                  </div>
                ));
              })()}
            </motion.div>
          ) : (
            <FolderShowcase 
              folder={selectedFolder} 
              onBack={() => setSelectedFolder(null)}
              onImageClick={(src) => setActiveImage(src)}
              ui={ui}
            />
          )}
        </LayoutGroup>
      </div>

      {/* Full Screen Image Lightbox */}
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
                alt={ui.fullSizeAlt}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const FolderCard = ({
  folder,
  priority,
  viewCollectionLabel,
  onClick,
}: {
  folder: any;
  priority?: boolean;
  viewCollectionLabel: string;
  onClick: () => void;
}) => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const ui = t.galleryUi;
  
  return (
    <motion.div
      layoutId={`folder-${folder.id}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <motion.div 
        layoutId={`tab-${folder.id}`}
        className="absolute -top-3 left-6 w-28 h-8 bg-gray-100 dark:bg-[#1a1a1a] rounded-t-xl transition-colors duration-500 border-t border-x border-gray-200 dark:border-white/5" 
      />
      
      <div className="relative z-10 bg-white dark:bg-[#121212] rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 transition-all duration-700 group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] group-hover:-translate-y-3">
        <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <motion.div
            layoutId={`image-${folder.id}`}
            className="relative w-full h-full"
          >
            {folder.heroImage ? (
              <Image 
                src={assets.resolveUrl(folder.heroImage)} 
                alt={isAr ? (folder.title_ar || folder.title) : folder.title}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
          
          <div className="absolute top-6 left-6">
            <motion.div 
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
            >
              <span className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
                {(ui as any)[folder.category.toLowerCase()] || folder.category}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="p-10">
          <motion.h3 
            layoutId={`title-${folder.id}`}
            className="text-2xl font-light text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
          >
            {isAr ? (folder.title_ar || folder.title) : folder.title}
          </motion.h3>
          <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400 text-sm font-semibold tracking-wide">
            <span className="uppercase text-[11px] tracking-widest">{viewCollectionLabel}</span>
            <div className="h-[1px] w-8 bg-teal-600/30 group-hover:w-12 transition-all duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FolderShowcase = ({
  folder,
  onBack,
  onImageClick,
  ui,
}: {
  folder: any;
  onBack: () => void;
  onImageClick: (src: string) => void;
  ui: any;
}) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto pt-20 mb-32">
        <div className="px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-3 text-gray-400 hover:text-teal-600 transition-all mb-12 group"
          >
            <div className="p-2 rounded-full border border-gray-200 dark:border-white/10 group-hover:border-teal-600/30 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/10 transition-all">
              <ArrowLeft size={18} className={`${isAr ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"} transition-transform`} />
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold">{ui.returnCollections}</span>
          </motion.button>
          
          <div className="overflow-hidden mb-6">
            <motion.h1 
              layoutId={`title-${folder.id}`}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 dark:text-white leading-[0.9]"
            >
              {isAr ? (folder.title_ar || folder.title) : folder.title}
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="h-[1px] w-12 bg-teal-600" />
            <span className="text-teal-700 dark:text-teal-400 text-xs uppercase tracking-[0.3em] font-black">
              {(ui as any)[folder.category.toLowerCase()] || folder.category}
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl"
          >
            {isAr ? (folder.description_ar || folder.description) : folder.description}
          </motion.p>
        </div>
      </div>

      <motion.div 
        layoutId={`folder-${folder.id}`}
        className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-40 group cursor-zoom-in bg-gray-100 dark:bg-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/10"
        onClick={() => onImageClick(folder.heroImage)}
      >
        <motion.div 
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5 }}
        >
          {folder.heroImage && (
            <Image 
              src={assets.resolveUrl(folder.heroImage)}
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center gap-3">
              <ZoomIn size={20} className="text-white" />
              <span className="text-white text-sm font-medium tracking-wide">View Full Hero</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 space-y-40 mb-40">
        {folder.sections?.map((section: any, sIdx: number) => (
          <div key={sIdx} className="space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 dark:border-white/5 pb-12">
              <div className="max-w-xl">
                <span className="text-teal-600 font-bold text-[10px] uppercase tracking-[0.4em] block mb-4">
                  {ui.section} {sIdx + 1}
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
                  {(() => {
                    const key = section.title.toLowerCase().replace(/\s+/g, '');
                    const camelKey = key === 'projectvisuals' ? 'projectVisuals' : 
                                   key === 'salesplan' ? 'salesPlan' : 
                                   key;
                    return (ui as any)[camelKey] || section.title;
                  })()}
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {section.images?.map((img: any, iIdx: number) => (
                <motion.div 
                  key={iIdx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: iIdx * 0.1 }}
                  className="group relative aspect-video bg-gray-100 dark:bg-[#0a0a0a] rounded-[32px] overflow-hidden cursor-zoom-in border border-white/5 shadow-xl"
                  onClick={() => onImageClick(img.src)}
                >
                  <Image 
                    src={assets.resolveUrl(img.src)}
                    alt={img.alt || 'Gallery image'}
                    fill
                    className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
                      <ZoomIn size={24} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Final CTA inside showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="py-20 flex flex-col items-center text-center space-y-10 bg-gray-50 dark:bg-white/5 rounded-[48px] border border-gray-100 dark:border-white/5"
        >
          <div className="space-y-4 px-6">
            <h3 className="text-3xl md:text-4xl font-light dark:text-white">{ui.inspiredBy}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{ui.startYourProject}</p>
          </div>
          <Link 
            href="/contact"
            className="group flex items-center gap-6 px-10 py-5 bg-teal-600 text-white rounded-full font-bold shadow-2xl shadow-teal-600/30 hover:bg-teal-700 transition-all"
          >
            <span className="text-lg uppercase tracking-widest">{ui.contactUsCta}</span>
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryShowcase;
