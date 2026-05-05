import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'خدماتنا | دار المعمار',
  description: 'خدمات البناء السكني والتجاري والتصميم الداخلي وإدارة المشاريع',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
