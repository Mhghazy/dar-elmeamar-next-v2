import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutCompany from '@/components/about/AboutCompany';
import AboutFAQ from '@/components/about/AboutFAQ';
import AboutCards from '@/components/about/AboutCards';
import AboutValues from '@/components/about/AboutValues';

export const metadata: Metadata = {
  title: 'من نحن | دار المعمار',
  description: 'تعرف على شركة دار المعمار — أكثر من 19 عاماً من الخبرة في البناء والتشييد الفاخر بالقاهرة',
  keywords: [
    'Dar Al-Maamar',
    'luxury real estate development',
    'premium residential development Egypt',
    'architectural design Cairo',
    'luxury finishing',
    'real estate developer Egypt',
  ],
  openGraph: {
    title: 'من نحن | دار المعمار',
    description:
      'تعرف على شركة دار المعمار — أكثر من 19 عاماً من الخبرة في البناء والتشييد الفاخر بالقاهرة',
    type: 'website',
  },
};


export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <AboutHero />
      <AboutCompany />
      <AboutCards />
      <AboutValues />
      <AboutFAQ />
    </main>
  );
}
