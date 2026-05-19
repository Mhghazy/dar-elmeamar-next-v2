'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { assets } from '@/lib/assets/assetFacade';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectDetailProps {
  project: any;
  onBack: () => void;
  onImageClick: (index: number) => void;
  ui: any;
}

const ProjectDetail = ({ project, onBack, onImageClick, ui }: ProjectDetailProps) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  // the fadeUp animation variant is defined to create a smooth entrance effect for the project details. When the component mounts, elements will fade in and slide up from below, enhancing the visual appeal and providing a polished user experience. The transition duration of 0.6 seconds ensures that the animation feels smooth and natural without being too slow or too fast.
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="min-h-screen"
    >
      {/* 1. Header Section */}
      <div className="max-w-5xl mx-auto pt-20 mb-20 md:mb-32 px-6">
        <motion.button
          variants={fadeUp}
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
            layoutId={`title-${project.id}`}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 dark:text-white leading-[0.9]"
          >
            {isAr ? (project.title_ar || project.title) : project.title}
          </motion.h1>
        </div>

        <motion.div
          variants={fadeUp}
          className="flex items-center gap-6 mb-12"
        >
          <div className="h-[1px] w-12 bg-teal-600" />
          <span className="text-teal-700 dark:text-teal-400 text-xs uppercase tracking-[0.3em] font-black">
            {ui[project.category.toLowerCase()] || project.category}
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl">
          {isAr ? (project.description_ar || project.description) : project.description}
        </motion.p>
      </div>

      {/* 2. Hero Image Section */}
      <motion.div
        layoutId={`folder-${project.id}`}
        className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-40 group cursor-zoom-in bg-gray-100 dark:bg-gray-900 shadow-2xl border border-white/10"
        onClick={() => onImageClick(project.heroImage)}
      >
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 1.5 }}>
          {project.heroImage && (
            <Image
              src={assets.resolveUrl(project.heroImage)}
              alt="Hero View"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <div className="px-8 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center gap-3">
              <ZoomIn size={20} className="text-white" />
              <span className="text-white text-sm font-medium">View Full Hero</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Project Content Sections */}
      <div className="max-w-7xl mx-auto px-6 space-y-40 mb-40">
        {project.sections?.map((section: any, index: number) => (
          <SectionItem
            key={index}
            section={section}
            index={index}
            ui={ui}
            onImageClick={onImageClick}
          />
        ))}

        {/* 4. Contact CTA */}
        <div className="py-20 flex flex-col items-center text-center space-y-10 bg-gray-50 dark:bg-white/5 rounded-[48px] border border-gray-100 dark:border-white/5">
          <div className="space-y-4 px-6">
            <h3 className="text-3xl md:text-4xl font-light dark:text-white">{ui.inspiredBy}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{ui.startYourProject}</p>
          </div>
          <Link href="/contact" className="group flex items-center gap-6 px-10 py-5 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-all">
            <span className="text-lg uppercase tracking-widest">{ui.contactUsCta}</span>
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --- Section Item Component ---
const SectionItem = ({ section, index, ui, onImageClick }: any) => {

  // the getSectionTitle function is responsible for mapping specific section titles to their corresponding localized strings from the ui object. It uses a titleMap to define the mapping between known section titles (like "project visuals", "sales plan", and "entrance") and their respective keys in the ui object. If a section title doesn't match any of the predefined keys, it falls back to using the original title, ensuring that all sections have a title displayed even if they don't have a specific localization defined.
  const getSectionTitle = (title: string) => {
    const titleMap: Record<string, string> = {
      'project visuals': 'projectVisuals',
      'sales plan': 'salesPlan',
      'entrance': 'entrance'
    };
    const key = titleMap[title.toLowerCase()] || title;
    return ui[key] || title;
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 dark:border-white/5 pb-12">
        <div className="max-w-xl">
          <span className="text-teal-600 font-bold text-[10px] uppercase tracking-[0.4em] block mb-4">
            {ui.section} {index + 1}
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
            {getSectionTitle(section.title)}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {section.images?.map((img: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-video bg-gray-100 dark:bg-[#0a0a0a] rounded-[32px] overflow-hidden cursor-zoom-in border border-white/5"
            onClick={() => onImageClick(img.src)}
          >
            <Image
              src={assets.resolveUrl(img.src)}
              alt={img.alt || 'Gallery image'}
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
                <ZoomIn size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;