import type { Metadata } from 'next';

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Multi-Pôles | PLV et Packaging pour Cosmétiques & Pharmacie',
    template: '%s | Multi-Pôles',
  },
  description: 'Multi-Pôles, expert en PLV et packaging sur-mesure pour les secteurs cosmétique et pharmaceutique. Solutions innovantes et éco-responsables depuis 2005.',
  keywords: ['PLV', 'packaging', 'cosmétique', 'pharmacie', 'affichage', 'présentoir', 'totem', 'vitrine', 'signalétique'],
  authors: [{ name: 'Multi-Pôles' }],
  creator: 'Multi-Pôles',
  publisher: 'Multi-Pôles',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName: 'Multi-Pôles',
    title: 'Multi-Pôles | PLV et Packaging pour Cosmétiques & Pharmacie',
    description: 'Expert en PLV et packaging sur-mesure pour les secteurs cosmétique et pharmaceutique.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Multi-Pôles - PLV et Packaging',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Pôles | PLV et Packaging',
    description: 'Expert en PLV et packaging sur-mesure pour cosmétiques et pharmacie',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image || '/og-image.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    alternates: {
      canonical: url,
    },
  };
}

// Structured Data (JSON-LD) helpers
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Multi-Pôles',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description: 'Expert en PLV et packaging sur-mesure pour les secteurs cosmétique et pharmaceutique.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
    addressLocality: 'France',
  },
  sameAs: [
    // Add your social media links here
    // 'https://www.facebook.com/multipoles',
    // 'https://www.linkedin.com/company/multipoles',
    // 'https://www.instagram.com/multipoles',
  ],
};

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  image?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || `${baseUrl}/og-image.jpg`,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Multi-Pôles',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || `${baseUrl}/og-image.jpg`,
    brand: {
      '@type': 'Brand',
      name: 'Multi-Pôles',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
