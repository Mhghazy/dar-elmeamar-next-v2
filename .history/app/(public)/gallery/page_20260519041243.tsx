import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryShowcase from '@/components/gallery/GalleryShowcase';
import { Metadata } from 'next';
import { getProjects } from '@/lib/gallery/projectRepository';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Gallery | Dar El Meamar',
  description: 'Explore our finest construction and luxury finishing projects',
  keywords: [
    'Architectural Gallery', 'Luxury Villa Portfolio', 'Real Estate', 'Residential', 'Finishing', 'Compounds',
    'معرض المعمار', 'محفظة الفلل الفاخرة', 'عقارات', 'سكني', 'تشطيبات', 'كمبوندات'
  ],
};

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <GalleryHero />
      <Suspense fallback={
        <div className="relative min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <GalleryContent />
      </Suspense>
    </main>
  );
}

async function GalleryContent() {
  const projects = await getProjects();

  const initialFolders = projects.map(proj => ({
    id: proj.id,
    title: proj.title,
    title_ar: proj.title_ar,
    category: proj.category,
    description: proj.description,
    description_ar: proj.description_ar,
    heroImage: proj.hero_image || proj.image_url,
    sections: proj.sections || []
  }));

  return <GalleryShowcase initialProjects={projects} />;
}
