import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutCompany from '@/components/about/AboutCompany';
import AboutFAQ from '@/components/about/AboutFAQ';
import AboutCards from '@/components/about/AboutCards';
import AboutValues from '@/components/about/AboutValues';

export const metadata: Metadata = {
  title: 'About Us | Dar El Meamar',
  description: 'Learn about Dar El Meamar — over 19 years of experience in luxury construction and architectural design in Cairo',
  keywords: [
    'Dar Al-Maamar',
    'luxury real estate development',
    'premium residential development Egypt',
    'architectural design Cairo',
    'luxury finishing',
    'real estate developer Egypt',
  ],
  openGraph: {
    title: 'About Us | Dar El Meamar',
    description:
      'Learn about Dar El Meamar — over 19 years of experience in luxury construction and architectural design in Cairo',
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
