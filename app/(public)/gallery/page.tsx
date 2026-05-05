import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryShowcase from '@/components/gallery/GalleryShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'معرض الأعمال | دار المعمار',
  description: 'استعرض أبرز مشاريعنا في البناء والتشطيبات الفاخرة',
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
