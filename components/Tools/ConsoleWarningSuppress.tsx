'use client';

import { useEffect } from 'react';

export default function ConsoleWarningSuppress() {
  useEffect(() => {
    // Suppress THREE.js Material warnings about vertexColors and console spam
    const originalWarn = console.warn;
    console.warn = function(...args: any[]) {
      const message = (args[0] && args[0].toString && args[0].toString()) || '';
      if (
        message.includes('THREE.Material') ||
        message.includes('vertexColors') ||
        message.includes('non-static position') ||
        message.includes('Largest Contentful Paint')
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
