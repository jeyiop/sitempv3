'use client';

import { useFormContext } from 'react-hook-form';
import { FormData } from '../page';

const materials = [
  { id: 'cardboard', label: 'Carton' },
  { id: 'plastic', label: 'Plastique' },
  { id: 'wood', label: 'Bois' },
  { id: 'metal', label: 'Métal' },
  { id: 'glass', label: 'Verre' },
  { id: 'acrylic', label: 'Acrylique' },
  { id: 'fabric', label: 'Tissu' },
  { id: 'eco', label: 'Matériaux écologiques' },
];

const colors = [
  { id: 'brand', label: 'Couleurs de votre marque' },
  { id: 'white', label: 'Blanc' },
  { id: 'black', label: 'Noir' },
  { id: 'blue', label: 'Bleu' },
  { id: 'red', label: 'Rouge' },
  { id: 'green', label: 'Vert' },
  { id: 'yellow', label: 'Jaune' },
  { id: 'transparent', label: 'Transparent' },
  { id: 'other', label: 'Autre (à préciser)' },
];

export default function StepTwo() {
  const { register, formState: { errors }, watch } = useFormContext<FormData>();
  const watchQuantity = watch('quantity');

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-6">Spécifications techniques</h2>
      
      <div className="space-y-8">
        {/* Dimensions */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Dimensions approximatives (en cm) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="width" className="block text-sm text-gray-600 mb-1">Largeur</label>
              <input
                type="number"
                id="width"
                min="0"
                placeholder="cm"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                {...register('dimensions.width', {
                  required: 'Largeur requise',
                  min: {
                    value: 0,
                    message: 'La valeur doit être positive'
                  }
                })}
              />
              {errors.dimensions?.width && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.width.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="height" className="block text-sm text-gray-600 mb-1">Hauteur</label>
              <input
                type="number"
                id="height"
                min="0"
                placeholder="cm"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                {...register('dimensions.height', {
                  required: 'Hauteur requise',
                  min: {
                    value: 0,
                    message: 'La valeur doit être positive'
                  }
                })}
              />
              {errors.dimensions?.height && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.height.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="depth" className="block text-sm text-gray-600 mb-1">Profondeur</label>
              <input
                type="number"
                id="depth"
                min="0"
                placeholder="cm"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                {...register('dimensions.depth', {
                  required: 'Profondeur requise',
                  min: {
                    value: 0,
                    message: 'La valeur doit être positive'
                  }
                })}
              />
              {errors.dimensions?.depth && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.depth.message}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Materials */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Matériaux souhaités <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {materials.map((material) => (
              <div key={material.id} className="relative">
                <input
                  type="checkbox"
                  id={`material-${material.id}`}
                  value={material.id}
                  className="peer sr-only"
                  {...register('materials', {
                    required: 'Veuillez sélectionner au moins un matériau'
                  })}
                />
                <label
                  htmlFor={`material-${material.id}`}
                  className="flex p-3 border rounded-lg cursor-pointer transition-colors text-sm peer-checked:border-navy peer-checked:bg-navy/5 hover:bg-gray-50"
                >
                  <span className="text-gray-900 peer-checked:text-navy">{material.label}</span>
                </label>
                <div className="absolute hidden peer-checked:block top-3 right-3 text-navy">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          {errors.materials && (
            <p className="mt-1 text-sm text-red-600">{errors.materials.message}</p>
          )}
        </div>
        
        {/* Colors */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Couleurs souhaitées <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {colors.map((color) => (
              <div key={color.id} className="relative">
                <input
                  type="checkbox"
                  id={`color-${color.id}`}
                  value={color.id}
                  className="peer sr-only"
                  {...register('colors', {
                    required: 'Veuillez sélectionner au moins une couleur'
                  })}
                />
                <label
                  htmlFor={`color-${color.id}`}
                  className="flex p-3 border rounded-lg cursor-pointer transition-colors text-sm peer-checked:border-navy peer-checked:bg-navy/5 hover:bg-gray-50"
                >
                  <span className="text-gray-900 peer-checked:text-navy">{color.label}</span>
                </label>
                <div className="absolute hidden peer-checked:block top-3 right-3 text-navy">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          {errors.colors && (
            <p className="mt-1 text-sm text-red-600">{errors.colors.message}</p>
          )}
        </div>
        
        {/* Quantity */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Quantité estimée <span className="text-red-500">*</span>
          </label>
          <div className="max-w-xs">
            <input
              type="range"
              min="1"
              max="1000"
              step="1"
              className="w-full accent-navy"
              {...register('quantity', {
                required: 'Veuillez spécifier une quantité',
                min: {
                  value: 1,
                  message: 'La quantité minimale est 1'
                }
              })}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>1</span>
              <span>100</span>
              <span>500</span>
              <span>1000+</span>
            </div>
            <div className="text-center mt-2 font-medium text-navy">
              {watchQuantity === 1000 ? '1000+' : watchQuantity}
            </div>
          </div>
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
          )}
        </div>
        
        <div className="text-sm text-gray-500 italic">
          * Champs obligatoires
        </div>
      </div>
    </div>
  );
}
