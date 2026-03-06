import BlogPostClient from './BlogPostClient';
import { publicApi } from '@/lib/public-api';

// Required for static export with dynamic routes
export async function generateStaticParams() {
  const slugs: string[] = [];
  const limit = 50;
  let page = 1;

  try {
    while (true) {
      const response = await publicApi.getBlogPosts({ page, limit, locale: 'fr' });

      if (!response.success || !response.data) {
        break;
      }

      const { data, meta } = response.data;
      slugs.push(...data.map((post) => post.slug).filter(Boolean));

      if (!meta || page >= meta.totalPages) {
        break;
      }

      page += 1;
    }
  } catch (error) {
    console.error('Failed to generate static params for blog posts:', error);
  }

  return Array.from(new Set(slugs)).map((slug) => ({ slug }));
}

export const dynamic = 'force-static';
export const dynamicParams = false; // Disable dynamic params to prevent build errors

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
