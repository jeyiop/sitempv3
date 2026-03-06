'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/types/api';

interface BlogPostCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
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
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="flex h-full flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#000B58]/5">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#000B58] via-[#001973] to-[#0034A3] text-4xl font-semibold uppercase tracking-[0.2em] text-white">
                {post.title.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-4 pt-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold leading-snug text-[#0A1240] transition-colors duration-300 group-hover:text-[#1D2F7A] line-clamp-2">
                {post.title}
              </h2>
              <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#0A1240]/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0A1240]" />
            </div>

            {post.excerpt && (
              <p className="text-sm leading-relaxed text-[#0A1240]/65 line-clamp-3">
                {post.excerpt}
              </p>
            )}

            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#000B58]/12 bg-[#000B58]/5 text-sm font-semibold text-[#000B58]">
                {post.author?.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{post.author?.name?.charAt(0) ?? '?'}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#0A1240]">
                  {post.author?.name ?? 'Équipe Multi-Pôles'}
                </span>
                <span className="text-xs text-[#0A1240]/60">{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
