'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useGalleryData, FolderType } from './Custom Hook/useGalleryData';

// Components

import ProjectDetail from './ProjectDetail';
import FolderGrid from './FolderGrid';
import Lightbox from './Lightbox';

// Types and Interfaces
interface GalleryShowcaseProps {
  initialProjects?: any[];
  initialFolders?: FolderType[];
}

const GalleryShowcase = ({ initialProjects, initialFolders }: { initialProjects?: any[]; initialFolders?: FolderType[] }) => {
  const { t } = useLanguage();
  // this hook abstracts away the logic of fetching and managing gallery data, making the component cleaner and more focused on presentation
  const { folders, loading } = useGalleryData(initialProjects, initialFolders);

  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // if we're still loading data and we don't have any folders to show, we display a loading spinner
  if (loading && !folders.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
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