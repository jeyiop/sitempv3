'use client';

import { motion } from 'framer-motion';
import { useTeamMembers } from '@/hooks/use-api';
import { TeamMemberCard } from '@/components/TeamMemberCard';

export default function EquipePage() {
  const { data: teamMembers, loading, error } = useTeamMembers('fr');

  return (
    <div className="min-h-screen">
      {/* Team Section */}
      <section className="pt-28 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-navy mb-4"
            >
              Notre Équipe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xl text-gray-600"
            >
              Découvrez les experts qui donnent vie à vos projets PLV
            </motion.p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-2xl mx-auto mb-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {!loading && teamMembers && teamMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 xl:gap-8">
              {teamMembers
                .filter(member => member.active)
                .sort((a, b) => a.order - b.order)
                .map((member, index) => (
                  <TeamMemberCard key={member.id} member={member} index={index} />
                ))}
            </div>
          )}
          
          {!loading && (!teamMembers || teamMembers.length === 0) && !error && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucun membre d'équipe à afficher pour le moment.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Rejoignez notre équipe !
            </h2>
            <p className="text-xl mb-10" style={{ color: '#FFFFFF' }}>
              Nous sommes toujours à la recherche de talents passionnés pour renforcer notre équipe.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="bg-white text-[#000B58] px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/80 transition-colors"
              >
                Postuler
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
