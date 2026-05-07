import type { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact Us | Dar El Meamar',
  description: 'Get in touch with the Dar El Meamar team for a free consultation',
};


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pt-32">
      <Contact />
    </div>
  );
}
