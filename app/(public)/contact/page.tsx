import type { Metadata } from 'next';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'اتصل بنا | دار المعمار',
  description: 'تواصل مع فريق دار المعمار للحصول على استشارة مجانية',
};


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pt-32">
      <Contact />
    </div>
  );
}
