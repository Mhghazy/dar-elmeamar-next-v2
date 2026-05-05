import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryShowcase from '@/components/gallery/GalleryShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery | Global Architectural Excellence',
  description: 'Explore the Dar El Meamar project gallery. A world-class showcase of luxury villas, residential compounds, and high-end finishing projects.',
  keywords: [
    'Architectural Gallery', 'Luxury Villa Portfolio', 'Real Estate', 'Residential', 'Finishing', 'Compounds',
    'معرض المعمار', 'محفظة الفلل الفاخرة', 'عقارات', 'سكني', 'تشطيبات', 'كمبوندات'
  ],
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <GalleryHero />
      <GalleryShowcase />
    </main>
  );
}
