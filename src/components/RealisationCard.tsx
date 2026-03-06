'use client';

import { motion } from 'framer-motion';
import { Realisation } from '@/types/api';
import { EditableImage } from '@/components/EditableImage';

interface RealisationCardProps {
  realisation: Realisation;
  index?: number;
  editorKey?: string;
  onClick?: () => void;
}

export function RealisationCard({ realisation, index = 0, editorKey, onClick }: RealisationCardProps) {
  const displayImage = realisation.featuredImage || realisation.images?.[0];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group flex cursor-pointer flex-col gap-3 transition-transform duration-300"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-lg border-2 border-transparent transition-colors duration-300 group-hover:border-[#000B58]">
        <div className="relative h-60 w-full overflow-hidden rounded-lg bg-gray-100">
          {displayImage ? (
            <EditableImage
              editorKey={editorKey || `real-${realisation.id}`}
              src={displayImage}
              alt={realisation.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="text-3xl font-semibold text-[#000B58]/30">
                {realisation.title.charAt(0)}
              </div>
            </div>
          )}
        </div>

        {realisation.category && (
          <span className="absolute top-4 left-4 inline-flex items-center rounded-lg border border-[#000B58]/15 bg-[#000B58]/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#000B58] shadow-sm">
            {realisation.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-2 text-left">
        <h3 className="text-base font-semibold text-[#000B58]">
          {realisation.title}
        </h3>

        {realisation.client && (
          <p className="text-xs font-medium text-[#000B58]/60">
            {realisation.client}
          </p>
        )}

        {realisation.description && (
          <p className="text-sm leading-relaxed text-[#000B58]/60 line-clamp-2">
            {realisation.description}
          </p>
        )}

        {realisation.tags && realisation.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {realisation.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-[#000B58]/15 bg-[#000B58]/5 px-2.5 py-1 text-xs font-medium text-[#000B58]/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}
