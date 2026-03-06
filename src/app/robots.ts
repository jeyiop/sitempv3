import { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400; // Regenerate once per day

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
