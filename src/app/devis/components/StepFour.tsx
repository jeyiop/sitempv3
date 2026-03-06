'use client';

import { useFormContext } from 'react-hook-form';
import { FormData } from '../page';

export default function StepFour() {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-6">Vos coordonnées</h2>
      
      <div className="space-y-6">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              {...register('firstName', {
                required: 'Prénom requis',
              })}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              {...register('lastName', {
                required: 'Nom requis',
              })}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        {/* Company */}
        <div>
          <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">
            Société <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
            {...register('companyName', {
              required: 'Nom de l\'entreprise requis',
              minLength: {
                value: 1,
                message: 'Le nom de l\'entreprise est requis'
              }
            })}
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
          )}
        </div>
        
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              {...register('email', {
                required: 'Email requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide'
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
              {...register('phone', {
                required: 'Numéro de téléphone requis',
                pattern: {
                  value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: 'Numéro de téléphone invalide'
                }
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
        
        {/* Additional Message */}
        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message complémentaire
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Toute autre information utile pour votre demande..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent resize-none"
            {...register('message')}
          />
        </div>
        
        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              type="checkbox"
              className="w-4 h-4 accent-navy"
              {...register('acceptTerms', {
                required: 'Vous devez accepter les conditions générales'
              })}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="text-gray-600">
              J'accepte que mes données personnelles soient utilisées pour traiter ma demande de devis conformément à la <a href="/politique-confidentialite" className="text-navy hover:underline" target="_blank">politique de confidentialité</a>. <span className="text-red-500">*</span>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-500 italic">
          * Champs obligatoires
        </div>
      </div>
    </div>
  );
}
