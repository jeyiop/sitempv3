'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';

import { ContactFormData } from '@/types/api';
import { publicApi } from '@/lib/public-api';

const fieldClasses =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100';

export default function ContactPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setApiError(null);
    setIsSuccess(false);

    try {
      await publicApi.submitContactForm(data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting contact form', error);
      setApiError("Nous n'avons pas pu envoyer votre message. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="bg-white py-14 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <h1 className="text-4xl font-semibold uppercase tracking-[0.18em] text-slate-900">
            Contactez-nous
          </h1>
          <p className="max-w-2xl text-sm text-slate-600">
            Une question, un projet ou simplement l’envie d’échanger ? Remplissez le formulaire, appelez-nous ou écrivez-nous :
            nous sommes disponibles par téléphone, email, ou directement au bureau.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,_1.6fr)_minmax(0,_1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-lg border border-slate-200 bg-slate-50/80 p-8 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Nous écrire</h2>
            <p className="mt-1 text-sm text-slate-600">
              Laissez-nous vos coordonnées et nous vous répondons rapidement.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="firstName">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName', { required: 'Le prénom est obligatoire.' })}
                    className={fieldClasses}
                    placeholder="Votre prénom"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="lastName">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName', { required: 'Le nom est obligatoire.' })}
                    className={fieldClasses}
                    placeholder="Votre nom"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: "L'email est obligatoire.",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Veuillez entrer une adresse email valide.",
                      },
                    })}
                    className={fieldClasses}
                    placeholder="nom@entreprise.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="phone">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: "Le numéro de téléphone est obligatoire.",
                      minLength: { value: 6, message: 'Numéro de téléphone invalide.' },
                    })}
                    className={fieldClasses}
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="company">
                  Entreprise (optionnel)
                </label>
                <input
                  id="company"
                  type="text"
                  {...register('company')}
                  className={fieldClasses}
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', {
                    required: 'Merci de nous donner quelques détails sur votre projet.',
                    minLength: {
                      value: 20,
                      message: 'Votre message doit contenir au moins 20 caractères.',
                    },
                  })}
                  className={`${fieldClasses} resize-none`}
                  placeholder="Parlez-nous de votre projet..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                )}
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  {...register('acceptTerms', {
                    required: "Vous devez accepter notre politique de confidentialité.",
                  })}
                  className="mt-1 h-4 w-4 rounded border border-slate-300 text-red-600 focus:ring-red-500"
                />
                <span>
                  J’accepte que mes informations soient utilisées pour être recontacté·e. Consultez notre politique de confidentialité pour en savoir plus.
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="-mt-4 text-xs text-red-600">{errors.acceptTerms.message}</p>
              )}

              {apiError && (
                <div className="flex items-center gap-3 rounded-lg border border-[#000B58]/15 bg-[#000B58]/5 px-4 py-3 text-sm text-[#000B58]">
                  <AlertCircle className="h-4 w-4 text-[#000B58]" aria-hidden="true" />
                  <span>{apiError}</span>
                </div>
              )}

              {isSuccess && (
                <div className="flex items-center gap-3 rounded-lg border border-[#000B58]/15 bg-[#000B58]/5 px-4 py-3 text-sm text-[#000B58]">
                  <CheckCircle2 className="h-4 w-4 text-[#000B58]" aria-hidden="true" />
                  <span>Merci pour votre message ! Nous revenons vers vous très vite.</span>
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-[#000B58] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#001973] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000B58]/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#000B58]/40"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Informations de contact</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[#000B58]" />
                  <div>
                    <p className="font-medium text-slate-900">Téléphone</p>
                    <a href="tel:+33143911771" className="text-slate-600 hover:text-red-600">
                      +33 (0)1 43 91 17 71
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#000B58]" />
                  <div>
                    <p className="font-medium text-slate-900">Email</p>
                    <a href="mailto:digital@multi-poles.net" className="text-slate-600 hover:text-red-600">
                      digital@multi-poles.net
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#000B58]" />
                  <div>
                    <p className="font-medium text-slate-900">Adresse</p>
                    <p className="text-slate-600">
                      53 rue des Deux Communes<br />
                      93100 Montreuil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Horaires</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-[#000B58]" />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-900">Lundi - Vendredi</span>
                      <span>9h00 - 18h00</span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="font-medium text-slate-900">Samedi</span>
                      <span>9h00 - 13h00</span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="font-medium text-slate-900">Dimanche</span>
                      <span>Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-12 overflow-hidden rounded-lg border border-slate-200 shadow-sm"
        >
          <iframe
            title="Multipoles localisation"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9!2d2.4389!3d48.8597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d8e6e8d1f1f%3A0x0!2s53+Rue+des+Deux+Communes%2C+93100+Montreuil!5e0!3m2!1sfr!2sfr!4v1"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
