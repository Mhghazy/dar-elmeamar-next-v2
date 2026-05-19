'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { assets } from '@/lib/assets/assetFacade';
import { useLanguage } from '@/context/LanguageContext';

interface FolderGridProps {
  folders: any[];
  onSelect: (folder: any) => void;
  ui: any;
}

const FolderGrid = ({ folders, onSelect, ui }: FolderGridProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // the grid layout is responsive, switching from a horizontal scroll on mobile to a multi-column grid on larger screens. The snap-x and snap-mandatory classes ensure that each folder card snaps into place when scrolling on mobile, providing a smooth and intuitive navigation experience.
      className="flex md:grid  md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 overflow-x-auto md:overflow-x-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide"
    >
      {folders.map((folder, index) => (
        <div key={folder.id} className="min-w-[85vw] md:min-w-0 snap-center">
          <FolderCard
            folder={folder}
            onClick={() => onSelect(folder)}
            priority={index < 3} //  (LCP optimization)
            ui={ui}
          />
        </div>
      ))}
    </motion.div>
  );
};

// --- Folder Card Component ---
const FolderCard = ({ folder, onClick, priority, ui }: any) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <motion.div
      layoutId={`folder-${folder.id}`} // this allows us to create a smooth transition between the grid and the detail view by linking the layout of the folder card in both views
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Folder Tab */}
      <motion.div
        layoutId={`tab-${folder.id}`}
        className="absolute -top-3 left-6 w-28 h-8 bg-gray-100 dark:bg-[#1a1a1a] rounded-t-xl transition-colors duration-500 border-t border-x border-gray-200 dark:border-white/5"
      />

      <div className="relative z-10 bg-white dark:bg-[#121212] rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-white/5 transition-all duration-700 group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] group-hover:-translate-y-3">

        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <motion.div layoutId={`image-${folder.id}`} className="relative w-full h-full">
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
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

          <div className="absolute top-6 left-6">
            <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
              <span className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
                {ui[folder.category.toLowerCase()] || folder.category}
              </span>
            </div>
          </div>
        </div>

        {/* Folder Details */}
        <div className="p-10">
          <motion.h3
            layoutId={`title-${folder.id}`}
            className="text-2xl font-light text-gray-900 dark:text-white mb-6 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
          >
            {isAr ? (folder.title_ar || folder.title) : folder.title}
          </motion.h3>

          <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400 text-sm font-semibold tracking-wide">
            <span className="uppercase text-[11px] tracking-widest">{ui.viewCollection}</span>
            <div className="h-[1px] w-8 bg-teal-600/30 group-hover:w-12 transition-all duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FolderGrid;