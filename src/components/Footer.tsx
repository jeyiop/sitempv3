'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#000B58] pt-12 pb-10 px-4 md:px-8">
      <div className="container mx-auto rounded-lg bg-white px-8 md:px-14 py-12 text-[#000B58] shadow-xl shadow-[#000B58]/15 border border-[#000B58]/10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 mb-10">
          <div>
            <Image
              src="/image/selecta/logo/logo-white-v2.jpg"
              alt="Multi-Pôles"
              width={220}
              height={80}
              className="mb-4 h-16 w-auto object-contain"
              priority
            />
            <p className="text-sm leading-relaxed text-[#000B58]/75 mb-6 max-w-md">
              Depuis 1996, Multi-Pôles conçoit et fabrique des solutions PLV, ILV et packaging
              pour la pharmacie, la parapharmacie et la cosmétique.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-[#000B58]/20 text-[#000B58] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#000B58]/50 hover:text-[#000B58]"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-[#000B58]/20 text-[#000B58] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#000B58]/50 hover:text-[#000B58]"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.02 10.02 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-[#000B58]/20 text-[#000B58] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#000B58]/50 hover:text-[#000B58]"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#000B58] mb-4">Nos Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions#plv" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  PLV
                </Link>
              </li>
              <li>
                <Link href="/solutions#packaging" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  Packaging
                </Link>
              </li>
              <li>
                <Link href="/solutions#print" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  Print
                </Link>
              </li>
              <li>
                <Link href="/simulateur" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  Devis 3D Studio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#000B58] mb-4">Liens Utiles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/simulateur" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  Simulateur 3D
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/devis" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  Demander un devis
                </Link>
              </li>
              <li>
                <Link href="/apropos" className="text-sm text-[#000B58]/70 transition-colors hover:text-[#000B58]">
                  À propos de nous
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#000B58] mb-4">Contact</h3>
            <address className="not-italic text-sm text-[#000B58]/75 leading-relaxed space-y-2">
              <p>53 rue des Deux Communes</p>
              <p>93100 Montreuil</p>
              <p>
                <a href="tel:+33143911771" className="font-medium text-[#000B58] transition-colors hover:text-[#000B58]/80">+33 (0)1 43 91 17 71</a>
              </p>
              <p>
                <a href="mailto:digital@multi-poles.net" className="font-medium text-[#000B58] transition-colors hover:text-[#000B58]/80">digital@multi-poles.net</a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-[#000B58]/10 pt-6 mt-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#000B58]/60 md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Multi-Pôles. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs md:text-sm font-medium">
            <Link href="/mentions-legales" className="text-[#000B58]/65 transition-colors hover:text-[#000B58]">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-[#000B58]/65 transition-colors hover:text-[#000B58]">
              Politique de confidentialité
            </Link>
            <Link href="/cookies" className="text-[#000B58]/65 transition-colors hover:text-[#000B58]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
