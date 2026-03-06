import { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400; // Regenerate once per day

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/solutions',
    '/realisations',
    '/apropos',
    '/equipe',
    '/blog',
    '/contact',
    '/devis',
    '/simulateur',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/blog' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : route === '/contact' ? 0.9 : 0.8,
  }));

  return routes;
}
