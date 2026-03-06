'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TeamMember } from '@/types/api';

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] w-full rounded-lg bg-gradient-to-b from-[#F2F4FB] via-[#E7EBF8] to-[#DCE2F4] transition duration-500">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 220px, (min-width: 1024px) 200px, (min-width: 640px) 45vw, 85vw"
            priority={index < 6}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-semibold text-[#4C5AA4]">
            {member.name.charAt(0).toLowerCase()}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 rounded-lg border border-white/35" aria-hidden="true" />

        <div className="absolute inset-x-0 bottom-6 px-6 text-center">
          <h3 className="text-lg font-semibold tracking-[0.08em] text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
            {member.name}
          </h3>
          {member.position && (
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.38em] text-white/80 drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
              {member.position}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
