'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useGalleryData } from './Custom Hook/useGalleryData';

// Components

import ProjectDetail from './ProjectDetail';
import FolderGrid from './FolderGrid';
import Lightbox from './Lightbox';

// Types
interface GalleryShowcaseProps {
  initialProjects?: any[];
  initialFolders?: FolderType[];
}

const GalleryShowcase = ({ initialProjects }: { initialProjects?: any[] }) => {
  const { t } = useLanguage();
  const { folders, loading } = useGalleryData(initialProjects);
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (loading && !folders.length) return <div className="loading-spinner" />;

  return (
    <section className="relative py-32 px-6 min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            {!selectedFolder ? (
              <FolderGrid
                folders={folders}
                onSelect={setSelectedFolder}
                ui={t.galleryUi}
              />
            ) : (
              <ProjectDetail
                project={selectedFolder}
                onBack={() => setSelectedFolder(null)}
                onImageClick={setActiveImage}
                ui={t.galleryUi}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      <Lightbox
        image={activeImage}
        onClose={() => setActiveImage(null)}
        altText={t.galleryUi.fullSizeAlt}
      />
    </section>
  );
};

export default GalleryShowcase;