import WorksHero from '@/components/works/WorksHero';
import WorksPhilosophy from '@/components/works/WorksPhilosophy';
import Gallery from '@/components/Gallery';
import RefinedFAQ from '@/components/works/RefinedFAQ';
import WorksCTA from '@/components/works/WorksCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Works | Dar El Meamar',
  description: 'Completed residential and commercial construction projects and architectural designs by Dar El Meamar',
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
