'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/types/api';

interface FeaturedBlogPostProps {
  post: BlogPost;
}

export function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const parts = formatter.formatToParts(date);
    const day = parts.find((part) => part.type === 'day')?.value ?? '';
    const month = parts.find((part) => part.type === 'month')?.value ?? '';
    const year = parts.find((part) => part.type === 'year')?.value ?? '';

    return `${day} ${month} ${year}`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex flex-col lg:flex-row gap-8 items-start border-b border-[#000B58]/10 pb-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#000B58]/5">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#000B58] via-[#001973] to-[#0034A3] text-5xl font-semibold uppercase tracking-[0.2em] text-white">
                  {post.title.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-center gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0A1240] transition-colors duration-300 group-hover:text-[#1D2F7A]">
                {post.title}
              </h2>
              
              {post.excerpt && (
                <p className="text-base md:text-lg leading-relaxed text-[#0A1240]/70 line-clamp-4">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#000B58]/10 bg-[#000B58]/5 text-sm font-semibold text-[#000B58]">
                  {post.author?.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{post.author?.name?.charAt(0) ?? '?'}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#000B58]">{post.author?.name ?? 'Équipe Multi-Pôles'}</span>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#000B58]/60">
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Icon */}
          <ArrowUpRight className="hidden lg:block h-6 w-6 flex-shrink-0 text-[#0A1240]/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#0A1240]" />
        </div>
      </Link>
    </motion.article>
  );
}
