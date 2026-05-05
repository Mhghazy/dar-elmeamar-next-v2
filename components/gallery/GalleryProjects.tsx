"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight, scaleIn, staggerContainer } from '../../utils/animations';
import { Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PROJECTS_EXTRA } from '../../config/projectsExtra';
import ProjectModal from './Modal/ProjectModal';
import { assets } from '@/lib/assets/assetFacade';
import { getMockProjects } from '@/lib/mockDb';

import { supabase } from '@/lib/supabase/client';
import { createLog } from '@/lib/gallery/logRepository';

const GalleryProjects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [dbProjects, setDbProjects] = useState<any[]>([]);

  useEffect(() => {
    const isUiMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your-project-url';

    if (isUiMode) {
      setDbProjects(getMockProjects());
      return;
    }

    async function fetchDbProjects() {
      try {
        const { data } = await supabase.from('projects').select('*');
        if (data) setDbProjects(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchDbProjects();
  }, []);

  const projects = [
    ...t.galleryPage.projects.map((proj: any) => ({
      ...proj,
      image: PROJECTS_EXTRA[proj.id]?.main || '',
      images: PROJECTS_EXTRA[proj.id]?.details || [],
      color: PROJECTS_EXTRA[proj.id]?.color || 'from-gray-400 to-gray-600',
    })),
    ...dbProjects.map(proj => ({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      category: proj.category,
      location: proj.location,
      year: proj.year,
      image: proj.hero_image || proj.image_url,
      images: proj.sections ? proj.sections.flatMap((s: any) => s.images.map((img: any) => img.src)) : [proj.image_url],
      color: 'from-teal-400 to-teal-600'
    }))
  ];

  const handleOpenProject = (project: any) => {
    setSelectedProject(project);
    createLog({
      user_email: 'Visitor',
      action: 'Viewed Project',
      target: project.title,
      type: 'view'
    });
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              variants={index % 3 === 0 ? fadeInLeft : index % 3 === 1 ? scaleIn : fadeInRight}
              whileHover={{ y: -4, rotate: 0.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 dark:border-gray-700"
            >

              {/* Image */}
              <div className={`relative h-64 bg-gradient-to-br ${project.color} overflow-hidden`}>
                {project.image ? (
                  <motion.img
                    src={assets.resolveFullUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  />
                ) : null}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-sm mb-3">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <Building2 size={16} className="mr-2" />
                  {project.location}
                </div>

                {/* Details Button */}
                <button
                  onClick={() => handleOpenProject(project)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  {t.galleryPage.detailsButton}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} t={t} />
    </section>
  );
};

export default GalleryProjects;
