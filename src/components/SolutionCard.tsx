'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Solution } from '@/types/api';

interface SolutionCardProps {
  solution: Solution;
  index?: number;
}

export function SolutionCard({ solution, index = 0 }: SolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      {/* Icon/Image */}
      <div className="h-48 bg-gradient-to-br from-navy to-navy/80 relative flex items-center justify-center">
        {solution.icon ? (
          <div className="text-6xl">
            {solution.icon}
          </div>
        ) : (
          <div className="text-white text-4xl font-bold">
            {solution.title.charAt(0)}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy mb-2">{solution.title}</h3>
        <p className="text-gray-600 mb-4">{solution.description}</p>
        
        {/* Features List */}
        {solution.features && solution.features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {solution.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <svg className="w-5 h-5 text-yellow mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        {/* CTA */}
        <Link 
          href="/contact" 
          className="text-navy font-medium inline-flex items-center hover:text-yellow transition-colors"
        >
          En savoir plus
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
