import WorksHero from '@/components/works/WorksHero';
import WorksPhilosophy from '@/components/works/WorksPhilosophy';
import Gallery from '@/components/Gallery';
import RefinedFAQ from '@/components/works/RefinedFAQ';
import WorksCTA from '@/components/works/WorksCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'أعمالنا | دار المعمار',
  description: 'مشاريع دار المعمار المنجزة في البناء السكني والتجاري والتصميم المعماري',
};


export default function WorksPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <WorksHero />
      <WorksPhilosophy />
      <Gallery />
      <RefinedFAQ />
      <WorksCTA />
    </main>
  );
}
