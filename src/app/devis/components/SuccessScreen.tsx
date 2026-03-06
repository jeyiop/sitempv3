'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SuccessScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-lg p-8 text-center"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-navy mb-4">Demande envoyée avec succès !</h2>
      
      <p className="text-gray-600 mb-6">
        Merci pour votre demande de devis. Notre équipe commerciale l'examinera dans les plus brefs délais et vous contactera sous 48 heures ouvrées.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/" className="block">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-navy text-white px-6 py-3 rounded-md font-medium"
          >
            Retour à l'accueil
          </motion.button>
        </Link>
        <Link href="/simulateur" className="block">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border border-navy text-navy px-6 py-3 rounded-md font-medium bg-transparent hover:bg-navy/5 transition-colors"
          >
            Essayer notre simulateur 3D
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
