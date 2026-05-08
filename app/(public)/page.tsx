import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import { Suspense } from 'react';

// Dynamic imports for sections below the fold
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="relative h-96 bg-white dark:bg-gray-950" />
});
const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <div className="relative h-[600px] bg-white dark:bg-gray-950" />
});
const Works = dynamic(() => import('@/components/Works'), {
  loading: () => <div className="relative h-96 bg-white dark:bg-gray-950" />
});
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="relative h-96 bg-white dark:bg-gray-950" />
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<div className="h-96" />}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-[600px]" />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <Works />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <Contact />
      </Suspense>
    </>
  );
}
