'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/config/projectsData';
import { assets } from '@/lib/assets/assetFacade';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const { t } = useLanguage();
  const m = t.worksMarketing.projectModal;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-6xl bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col">
              {/* Header Image */}
              <div 
                className="w-full h-[50vh] bg-cover bg-center"
                style={{ backgroundImage: `url('${assets.resolveFullUrl(project.image)}')` }}
              />

              {/* Content */}
              <div className="p-8 md:p-16">
                <div className="grid md:grid-cols-3 gap-12">
                  {/* Info Column */}
                  <div className="md:col-span-2">
                    <span className="text-teal-600 dark:text-teal-400 text-xs tracking-widest uppercase font-medium mb-4 block">
                      {project.category}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-8">
                      {project.title}
                    </h2>
                    
                    <div className="space-y-12">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">{m.concept}</h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                          {project.details.concept}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">{m.philosophy}</h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                          {project.details.philosophy}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">{m.finishing}</h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                          {project.details.finishing}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Column */}
                  <div className="md:border-l md:border-gray-100 dark:md:border-gray-800 md:pl-12">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">{m.specs}</h3>
                    <div className="space-y-8">
                      {project.stats.map((stat, idx) => (
                        <div key={idx}>
                          <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</span>
                          <span className="block text-xl text-gray-900 dark:text-white font-light italic">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-16">
                      <Link
                        href="/contact?start=project"
                        className="block w-full py-4 text-center bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
                      >
                        {m.enquire}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
