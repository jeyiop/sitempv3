'use client';

import { useFormContext } from 'react-hook-form';
import { FormData } from '../page';

const projectTypes = [
  { id: 'plv', label: 'PLV (Publicité sur Lieu de Vente)' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'print', label: 'Print / Impression' },
  { id: 'digital', label: 'Devis 3D Studio' },
  { id: 'other', label: 'Autre' },
];

export default function StepOne() {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-6">Information sur votre projet</h2>
      
      <div className="space-y-6">
        {/* Project Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Type de projet <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <div key={type.id} className="relative">
                <input
                  type="radio"
                  id={`project-type-${type.id}`}
                  value={type.id}
                  className="peer sr-only"
                  {...register('projectType', { required: 'Veuillez sélectionner un type de projet' })}
                />
                <label
                  htmlFor={`project-type-${type.id}`}
                  className="flex p-4 border rounded-lg cursor-pointer transition-colors peer-checked:border-navy peer-checked:bg-navy/5 hover:bg-gray-50"
                >
                  <span className="text-gray-900 peer-checked:text-navy">{type.label}</span>
                </label>
                <div className="absolute hidden peer-checked:block top-4 right-4 text-navy">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          {errors.projectType && (
            <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
          )}
        </div>
        
        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-gray-700 font-medium mb-2">
            Description du projet <span className="text-red-500">*</span>
          </label>
          <textarea
            id="projectDescription"
            rows={5}
            placeholder="Décrivez votre projet, vos objectifs et vos besoins spécifiques..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent resize-none"
            {...register('projectDescription', {
              required: 'Veuillez décrire votre projet',
              minLength: {
                value: 20,
                message: 'Veuillez fournir une description plus détaillée (minimum 20 caractères)'
              }
            })}
          />
          {errors.projectDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.projectDescription.message}</p>
          )}
        </div>
        
        <div className="text-sm text-gray-500 italic">
          * Champs obligatoires
        </div>
      </div>
    </div>
  );
}
