'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Project, projects } from '@/config/projectsData';
import { assets } from '@/lib/assets/assetFacade';
import ProjectDetailModal from '@/components/works/ProjectDetailModal';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <>
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className="group relative w-full mb-32 last:mb-0 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm">
          <motion.div 
            style={{ y }}
            className="absolute inset-0 scale-110"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ 
                backgroundImage: `url('${assets.resolveFullUrl(project.image)}')`,
                backgroundColor: '#1a1a1a'
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          
          {/* Project Minimal Info */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black/60 to-transparent">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-teal-400 text-xs tracking-widest uppercase font-medium mb-3 block"
            >
              {project.category}
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-2">{project.title}</h2>
            <p className="text-gray-300 text-sm md:text-lg font-light max-w-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              {project.subtitle}
            </p>
          </div>
        </div>
      </motion.div>

      <ProjectDetailModal 
        project={project} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

const ProjectShowcase = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </section>
  );
};

export default ProjectShowcase;
