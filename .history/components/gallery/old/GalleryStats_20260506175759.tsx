"use client";
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StatsGrid from '../StatsGrid';

const GalleryStats: React.FC = () => {
  const { t } = useLanguage();
  const stats = [...t.galleryPage.stats];

  const gridStats = stats.map((s: any) => ({
    value: String(s.number ?? s.value ?? ''),
    suffix: s.suffix ?? '',
    label: s.label ?? s.name ?? '',
  }));

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use StatsGrid to render the animated counters */}
        <StatsGrid stats={gridStats} />
      </div>
    </section>
  );
};

export default GalleryStats;

