'use client';

import { useEffect } from 'react';

/**
 * Performance monitoring component for Core Web Vitals
 * Only runs in production to avoid development overhead
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and if supported
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof window === 'undefined') return;
    if (!('PerformanceObserver' in window)) return;

    try {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const lastEntry: Record<string, any> = entries[entries.length - 1];
          const lcpTime = lastEntry['renderTime'] || lastEntry['loadTime'];
          if (lcpTime) console.log('[Performance] LCP:', lcpTime);
        }
      });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: Record<string, any>) => {
          if (entry['processingStart'] && entry['startTime']) {
            const fid = entry['processingStart'] - entry['startTime'];
            console.log('[Performance] FID:', fid);
          }
        });
      });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift: Record<string, any> = entry;
          if (!layoutShift['hadRecentInput'] && layoutShift['value']) {
            clsValue += layoutShift['value'];
            console.log('[Performance] CLS:', clsValue);
          }
        }
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      fidObserver.observe({ type: 'first-input', buffered: true });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (error) {
      // Silently fail if observer types are not supported
      console.error('[Performance] Monitoring not supported', error);
    }
  }, []);

  return null;
}
