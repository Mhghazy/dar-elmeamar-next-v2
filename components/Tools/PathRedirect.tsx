'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PathRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Handle old repository names in development for easier testing
    // We use exact path segments to avoid partial matches (like -v2)
    const prefixes = [
      '/dar-el-meamar-next-v2', // Try longest first
      '/dar-el-meamar-next',
      '/dar-elmeamar-next-v2'
    ];
    
    for (const prefix of prefixes) {
      if (pathname === prefix || pathname.startsWith(prefix + '/')) {
        const newPath = pathname.replace(prefix, '') || '/';
        router.replace(newPath);
        break;
      }
    }
  }, [pathname, router]);

  return null;
}
