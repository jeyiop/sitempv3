'use client';

import { useFormContext } from 'react-hook-form';
import { FormData } from '../page';

const budgetRanges = [
  { id: 'less-than-5k', label: 'Moins de 5 000 €' },
  { id: '5k-10k', label: '5 000 € - 10 000 €' },
  { id: '10k-20k', label: '10 000 € - 20 000 €' },
  { id: '20k-50k', label: '20 000 € - 50 000 €' },
  { id: 'more-than-50k', label: 'Plus de 50 000 €' },
  { id: 'not-defined', label: 'Pas encore défini' },
];

export default function StepThree() {
  const { register, formState: { errors } } = useFormContext<FormData>();
  
  // Calculate min date (today) for the deadline field
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-2xl font-bold text-navy mb-6">Planning et budget</h2>
      
      <div className="space-y-8">
        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">
            Date souhaitée de livraison <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="deadline"
            min={formattedToday}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
            {...register('deadline', {
              required: 'Veuillez indiquer une date de livraison souhaitée',
              validate: value => {
                const selectedDate = new Date(value);
                return selectedDate > today || 'La date doit être dans le futur';
              }
            })}
          />
          <p className="mt-1 text-sm text-gray-500">
            Nous ferons notre possible pour respecter cette date
          </p>
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
          )}
        </div>
        
        {/* Budget Range */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Budget prévisionnel <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {budgetRanges.map((range) => (
              <div key={range.id} className="relative">
                <input
                  type="radio"
                  id={`budget-${range.id}`}
                  value={range.id}
                  className="peer sr-only"
                  {...register('budgetRange', {
                    required: 'Veuillez sélectionner une fourchette de budget'
                  })}
                />
                <label
                  htmlFor={`budget-${range.id}`}
                  className="flex p-3 border rounded-lg cursor-pointer transition-colors text-sm peer-checked:border-navy peer-checked:bg-navy/5 hover:bg-gray-50"
                >
                  <span className="text-gray-900 peer-checked:text-navy">{range.label}</span>
                </label>
                <div className="absolute hidden peer-checked:block top-3 right-3 text-navy">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Cette information nous aide à adapter notre proposition à votre budget
          </p>
          {errors.budgetRange && (
            <p className="mt-1 text-sm text-red-600">{errors.budgetRange.message}</p>
          )}
        </div>
        
        <div className="text-sm text-gray-500 italic">
          * Champs obligatoires
        </div>
      </div>
    </div>
  );
}
