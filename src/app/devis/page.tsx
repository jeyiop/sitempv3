'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import Link from 'next/link';
import { publicApi } from '@/lib/public-api';
import { DevisFormData } from '@/types/api';

// Form steps components will be imported from separate files
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import SuccessScreen from './components/SuccessScreen';

// Main form types
export type FormData = {
  // Step 1 - Project Info
  projectType: string;
  projectDescription: string;
  
  // Step 2 - Specifications
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: string[];
  colors: string[];
  quantity: number;
  
  // Step 3 - Timeline & Budget
  deadline: string;
  budgetRange: string;
  
  // Step 4 - Contact Info
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: boolean;
};

export default function DevisPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  
  // Initialize form with useForm hook
  const methods = useForm<FormData>({
    defaultValues: {
      projectType: '',
      projectDescription: '',
      dimensions: {
        width: 0,
        height: 0,
        depth: 0,
      },
      materials: [],
      colors: [],
      quantity: 1,
      deadline: '',
      budgetRange: '',
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      message: '',
      acceptTerms: false,
    },
    mode: 'onChange',
  });
  
  const { handleSubmit, trigger, formState } = methods;
  
  // Navigate to next step after validation
  const goToNextStep = async () => {
    let fieldsToValidate: any[] = [];
    
    // Define which fields to validate for each step
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['projectType', 'projectDescription'];
        break;
      case 2:
        fieldsToValidate = ['dimensions', 'materials', 'quantity'];
        break;
      case 3:
        fieldsToValidate = ['deadline', 'budgetRange'];
        break;
      case 4:
        fieldsToValidate = ['firstName', 'lastName', 'companyName', 'email', 'phone', 'acceptTerms'];
        break;
      default:
        break;
    }
    
    // Validate the fields for the current step
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        // Submit the form
        handleSubmit(onSubmit)();
      }
    }
  };
  
  // Go back to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setApiErrors({});
    
    try {
      // Map form data to API format
      const apiData: DevisFormData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.companyName,
        projectType: data.projectType,
        description: data.projectDescription,
        budget: data.budgetRange,
        quantity: data.quantity,
        dimensions: {
          width: data.dimensions.width,
          height: data.dimensions.height,
          depth: data.dimensions.depth,
        },
        desiredDeliveryDate: data.deadline,
        acceptTerms: data.acceptTerms,
      };
      
      const response = await publicApi.submitDevisForm(apiData);
      
      if (response.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(response.message);
        if (response.errors) {
          setApiErrors(response.errors);
        }
      }
    } catch (error) {
      setSubmitError('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Progress indicator
  const progressPercentage = (currentStep / 4) * 100;
  
  return (
    <div className="min-h-screen">
      {/* Form Section */}
      <section className="pt-1 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="border-b border-[#000B58]/10 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-4 max-w-2xl"
            >
              <h1 className="text-xl md:text-2xl uppercase tracking-[0.35em] text-[#000B58]">
                Demande de devis
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#000B58]/70">
                Remplissez ce formulaire pour recevoir une proposition personnalisée pour votre projet.
              </p>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 max-w-3xl">
            {!isSubmitted ? (
              <>
                {/* Progress bar */}
                <div className="mb-10">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-navy">
                      Étape {currentStep} sur 4
                    </span>
                    <span className="text-sm font-medium text-navy">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-navy h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                
                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6"
                  >
                    <p className="text-red-600 font-medium">{submitError}</p>
                    {Object.keys(apiErrors).length > 0 && (
                      <ul className="mt-2 text-sm text-red-500">
                        {Object.entries(apiErrors).map(([field, messages]) => (
                          <li key={field}>
                            <strong>{field}:</strong> {messages.join(', ')}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
                
                {/* Form steps */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <FormProvider {...methods}>
                    <form>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {currentStep === 1 && <StepOne />}
                          {currentStep === 2 && <StepTwo />}
                          {currentStep === 3 && <StepThree />}
                          {currentStep === 4 && <StepFour />}
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Navigation buttons */}
                      <div className="flex justify-between mt-10">
                        <button
                          type="button"
                          onClick={goToPreviousStep}
                          className={`px-6 py-3 rounded-md font-medium transition-colors ${
                            currentStep === 1
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-navy bg-gray-100 hover:bg-gray-200'
                          }`}
                          disabled={currentStep === 1}
                        >
                          Précédent
                        </button>
                        <button
                          type="button"
                          onClick={goToNextStep}
                          disabled={isSubmitting}
                          className="bg-navy text-white px-6 py-3 rounded-md font-medium hover:bg-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Envoi en cours...
                            </>
                          ) : currentStep === 4 ? 'Envoyer' : 'Suivant'}
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </>
            ) : (
              <SuccessScreen />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
