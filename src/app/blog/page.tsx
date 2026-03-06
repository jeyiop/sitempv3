'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useBlogPosts } from '@/hooks/use-api';
import { BlogPostCard } from '@/components/BlogPostCard';
import { FeaturedBlogPost } from '@/components/FeaturedBlogPost';
import type { BlogPost } from '@/types/api';

// Categories for filtering
const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'Tendances', label: 'Tendances' },
  { id: 'Innovation', label: 'Innovation' },
  { id: 'Éco-responsabilité', label: 'Éco-responsabilité' },
  { id: '3D Studio', label: '3D Studio' },
  { id: 'Stratégie', label: 'Stratégie' },
];

// Removed hardcoded fallback data - now fully dynamic
const blogPosts_OLD = [
  {
    id: '1',
    slug: 'tendances-plv-cosmetiques-2025',
    title: 'Les tendances PLV cosmétiques en 2025',
    excerpt: 'Découvrez les dernières innovations en matière de PLV pour le secteur cosmétique et comment elles peuvent transformer l\'expérience client en point de vente.',
    content: '',
    category: 'Tendances',
    tags: ['PLV', 'Cosmétiques', 'Tendances'],
    author: { name: 'Sophie Martin' },
    publishedAt: '2025-04-15',
    readTime: 5,
    locale: 'fr',
    isPublished: true,
  },
  {
    id: '2',
    slug: 'optimiser-impact-ecologique-plv',
    title: 'Comment optimiser l\'impact écologique de vos PLV',
    excerpt: 'Les solutions durables et éco-responsables pour réduire l\'empreinte environnementale de vos présentoirs tout en conservant leur efficacité commerciale.',
    content: '',
    category: 'Éco-responsabilité',
    tags: ['Éco-responsabilité', 'PLV'],
    author: { name: 'Antoine Bernard' },
    publishedAt: '2025-04-02',
    readTime: 7,
    locale: 'fr',
    isPublished: true,
  },
  {
    id: '3',
    slug: 'integration-digital-plv-pharmaceutiques',
    title: 'L\'intégration du digital dans les PLV pharmaceutiques',
    excerpt: 'Comment les nouvelles technologies transforment l\'expérience client en pharmacie et permettent une meilleure information produit.',
    content: '',
    category: 'Digital',
    tags: ['Digital', 'Pharmacie'],
    author: { name: 'Julie Lefèvre' },
    publishedAt: '2025-03-20',
    readTime: 6,
    locale: 'fr',
    isPublished: true,
  },
  {
    id: '4',
    slug: 'materiaux-innovants-packagings',
    title: 'Les matériaux innovants pour vos packagings',
    excerpt: 'Exploration des nouveaux matériaux durables qui révolutionnent le secteur du packaging cosmétique et pharmaceutique.',
    content: '',
    category: 'Innovation',
    tags: ['Innovation', 'Packaging'],
    author: { name: 'Thomas Dubois' },
    publishedAt: '2025-03-05',
    readTime: 8,
    locale: 'fr',
    isPublished: true,
  },
  {
    id: '5',
    slug: 'personnalisation-masse-plv',
    title: 'Personnalisation de masse : la nouvelle norme en PLV',
    excerpt: 'Comment proposer des solutions personnalisées à grande échelle pour répondre aux attentes spécifiques de chaque point de vente.',
    content: '',
    category: 'Tendances',
    tags: ['Tendances', 'Personnalisation'],
    author: { name: 'Sophie Martin' },
    publishedAt: '2025-02-18',
    readTime: 5,
    locale: 'fr',
    isPublished: true,
  },
  {
    id: '6',
    slug: 'importance-plv-strategie-omnicanale',
    title: 'L\'importance de la PLV dans la stratégie omnicanale',
    excerpt: 'Analyse de l\'impact des présentoirs en point de vente dans une stratégie marketing globale entre physique et digital.',
    content: '',
    category: 'Stratégie',
    tags: ['Stratégie', 'Omnicanal'],
    author: { name: 'Julie Lefèvre' },
    publishedAt: '2025-02-03',
    readTime: 6,
    locale: 'fr',
    isPublished: true,
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch blog posts from API
  const { data, loading, error } = useBlogPosts({
    page: currentPage,
    limit: 9,
    category: activeCategory !== 'all' ? activeCategory : undefined,
    locale: 'fr',
  });
  
  // Use API data (no fallback - fully dynamic)
  const posts = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;
  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  const remainingPosts = filteredPosts.slice(1);
  const postRows: BlogPost[][] = [];
  for (let i = 0; i < remainingPosts.length; i += 2) {
    postRows.push(remainingPosts.slice(i, i + 2));
  }
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-1 pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-5"
          >
            <div className="space-y-3">
              <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.26em] text-[#000B58]">
                Blog
              </h1>
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-[#000B58]/70">
                Actualités, tendances et conseils pour optimiser vos solutions PLV et packaging.
              </p>
            </div>
            <div className="h-px w-full bg-[#000B58]/12" aria-hidden="true" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-8 overflow-x-auto"
          >
            <div className="inline-flex min-w-max rounded-lg border border-[#000B58]/12 bg-white/70 shadow-sm">
              {categories.map((category, index) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setCurrentPage(1);
                    }}
                    className={`px-5 md:px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#000B58]/60 ${
                      isActive
                        ? 'bg-[#000B58] text-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.15)]'
                        : 'text-[#000B58]/70 hover:bg-[#000B58]/10'
                    } ${index > 0 ? 'md:border-l md:border-[#000B58]/12' : ''}`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="mt-12">
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
              </div>
            )}

            {!loading && filteredPosts.length > 0 && (
              <div className="space-y-12">
                <FeaturedBlogPost post={filteredPosts[0]} />

                {postRows.length > 0 && (
                  <div className="border-t border-[#000B58]/10">
                    {postRows.map((row, rowIndex) => {
                      const rowKey = `row-${rowIndex}`;
                      return (
                        <div
                          key={rowKey}
                          className={`relative border-b border-[#000B58]/10 md:grid md:grid-cols-2`}
                        >
                          {row.map((post, colIndex) => (
                            <div
                              key={post.id}
                              className={`py-10 md:py-12 ${
                                colIndex === 0 ? 'md:pr-10' : 'md:pl-10'
                              }`}
                            >
                              <BlogPostCard post={post} index={rowIndex * 2 + colIndex} />
                            </div>
                          ))}
                          {row.length === 1 && (
                            <div className="hidden md:block md:pl-10 py-10 md:py-12" aria-hidden="true" />
                          )}
                          {row.length > 1 && (
                            <span
                              className="pointer-events-none absolute top-10 bottom-10 left-1/2 hidden w-px -translate-x-1/2 bg-[#000B58]/10 md:block"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {!loading && filteredPosts.length === 0 && !error && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">Aucun article à afficher pour le moment.</p>
              </div>
            )}

            {!loading && filteredPosts.length > 0 && totalPages > 1 && (
              <div className="mt-16 border-t border-[#000B58]/10 pt-8">
                <nav className="flex items-center justify-between text-sm font-semibold text-[#000B58]">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-2 transition-colors duration-200 disabled:text-[#000B58]/30 disabled:cursor-not-allowed hover:text-[#000B58]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000B58]/40 focus-visible:ring-offset-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Précédent</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-2 transition-colors duration-200 disabled:text-[#000B58]/30 disabled:cursor-not-allowed hover:text-[#000B58]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000B58]/40 focus-visible:ring-offset-2"
                  >
                    <span>Suivant</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">Restez informé</h2>
            <p className="text-gray-600 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et actualités
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-navy text-white font-semibold rounded-md hover:bg-navy/90 transition"
              >
                S'inscrire
              </motion.button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              En vous inscrivant, vous acceptez notre <a href="/politique-confidentialite" className="text-navy hover:underline">politique de confidentialité</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
