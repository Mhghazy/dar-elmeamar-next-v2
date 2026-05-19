'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useGalleryData, FolderType } from './CustomHook/useGalleryData';

// Components

import ProjectDetail from './ProjectDetail';
import FolderGrid from './FolderGrid';
import Lightbox from './Lightbox';

// Types and Interfaces
interface GalleryShowcaseProps {
  initialProjects?: any[];
  initialFolders?: FolderType[];
}

const GalleryShowcase = ({ initialProjects, initialFolders }: GalleryShowcaseProps) => {
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
  useEffect(() => {
    if (selectedFolder || activeImage) {
      // when a folder is selected or an image is active, we set the body's overflow to 'hidden' to prevent background scrolling. This ensures that the user can focus on the content of the selected folder or the lightbox without any distractions from the background content. When the user goes back to the main grid (i.e., deselects the folder) or closes the lightbox, we reset the overflow to 'unset', allowing normal scrolling behavior again.
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedFolder, activeImage]);

  return (


    <section className="relative py-32 px-6 min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            {!selectedFolder ? (
              <FolderGrid
                key="grid"
                folders={folders}
                onSelect={setSelectedFolder}
                ui={t.galleryUi}
              />
            ) : (
              <ProjectDetail
                key="detail"
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