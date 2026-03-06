'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useBlogPost } from '@/hooks/use-api';

export default function BlogPostClient({ slug }: { slug: string }) {
  const { data: post, loading, error } = useBlogPost(slug, 'fr');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">{error || 'Cet article n\'existe pas ou n\'est plus disponible.'}</p>
          <Link href="/blog" className="bg-navy text-white px-6 py-3 rounded-md font-semibold hover:bg-navy-dark transition-colors">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Article Content */}
      <section className="pt-28 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-yellow text-navy px-4 py-1 rounded-lg text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-navy mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center text-navy font-bold mr-3">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="font-medium text-navy">{post.author.name}</p>
                  {post.readTime && <p className="text-sm text-gray-500">{post.readTime} min de lecture</p>}
                </div>
              </div>
            </div>
          </motion.div>

          <article className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {post.featuredImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 rounded-lg overflow-hidden"
              >
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            {/* Article Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg prose-navy max-w-none mb-12"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-12"
              >
                <h3 className="text-lg font-semibold text-navy mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-navy hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Back to Blog */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="border-t pt-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-navy font-medium hover:text-yellow transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Retour au blog
              </Link>
            </motion.div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-navy text-white"
        style={{ backgroundColor: '#000B58' }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Besoin de conseils pour votre projet ?
            </h2>
            <p className="text-xl mb-10" style={{ color: '#FFFFFF' }}>
              Contactez notre équipe d'experts pour discuter de vos besoins en PLV et packaging.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#000B58] px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/80 transition-colors"
              >
                Nous contacter
              </Link>
              <Link
                href="/devis"
                className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/10 transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
