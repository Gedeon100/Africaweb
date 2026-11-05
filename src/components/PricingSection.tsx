import React from 'react';
import { Check, MessageCircle, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { getWhatsAppUrl, PricingPackage } from '../data/agencyData';

interface PricingSectionProps {
  onSelectPackage: (pkg: PricingPackage) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const { pricingPackages, trackClick } = useAgency();

  return (
    <section id="tarifs" className="py-20 bg-slate-50/70 border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#073587] mb-2">
            <span>Tarification Officielle</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>Sans Frais Cachés</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Des tarifs accessibles pour propulser votre entreprise
          </h2>
          <p className="mt-3 text-base text-slate-700 font-semibold">
            Choisissez la solution adaptée à votre activité. Tous nos projets incluent la conception sur-mesure, l'optimisation mobile Android et une assistance dédiée.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPackages.map((pkg) => {
            const isShopify = pkg.id === 'ecommerce';
            const isWebinar = pkg.id === 'webinaire';

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                  isShopify
                    ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-lg -translate-y-1'
                    : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                } p-6 sm:p-8`}
              >
                {/* Popular Tag for Marketplace */}
                {isShopify && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-black py-1 px-4 rounded-full shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Le plus demandé</span>
                  </div>
                )}

                {/* Card Top: Title & Price */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-black text-slate-900">
                      {pkg.name}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-600 mb-4 flex items-center gap-1.5 font-bold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{pkg.delay}</span>
                  </div>

                  {/* Price display with tabular-nums */}
                  <div className="pb-5 mb-5 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums font-mono">
                        {pkg.price}
                      </span>
                    </div>
                    {pkg.priceNote && (
                      <span className="text-xs font-bold text-amber-800 block mt-1">
                        {pkg.priceNote}
                      </span>
                    )}
                    <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                      {pkg.description}
                    </p>
                    {pkg.hosting && (
                      <div className="mt-3 p-2.5 bg-emerald-50/90 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs font-black text-emerald-900">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span>{pkg.hosting}</span>
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Ce qui est inclus :
                    </span>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isShopify ? 'bg-amber-100 text-amber-800' : isWebinar ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-[#073587]'
                        }`}>
                          <Check className="w-3 h-3 font-bold" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Dual Actions (High contrast on Android) */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  {/* WhatsApp Order Action */}
                  <a
                    href={getWhatsAppUrl(pkg.whatsappMessage)}
                    onClick={() => trackClick('whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isShopify
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow'
                        : isWebinar
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow'
                        : 'bg-[#073587] hover:bg-[#05235c] text-white shadow-sm hover:shadow'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Commander sur WhatsApp</span>
                  </a>

                  {/* Quote Form Trigger */}
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Remplir le formulaire de devis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner below pricing */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Vous avez un projet spécifique ou sur-mesure ?
              </h4>
              <p className="text-xs text-slate-600 font-semibold">
                Nos experts conçoivent également des CRM, applications web spécialisées et tunnels multicanaux.
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppUrl("Bonjour Africa Web, j'ai un projet spécifique sur-mesure et je souhaite obtenir un devis personnalisé.")}
            onClick={() => trackClick('whatsapp')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl whitespace-nowrap transition-colors"
          >
            Discuter de mon besoin sur-mesure
          </a>
        </div>
      </div>
    </section>
  );
};
