import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | Dar El Meamar',
  description: 'Residential and commercial construction, interior design, and project management services',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
