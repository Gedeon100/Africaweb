import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap, CheckCircle2, ShoppingCart, Video, Laptop } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { getWhatsAppUrl } from '../data/agencyData';

interface HeroProps {
  onExplorePricing: () => void;
  onOpenContact: (planId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePricing, onOpenContact }) => {
  const { agencyInfo, pricingPackages, siteColors, trackClick } = useAgency();

  const vitrinePkg = pricingPackages.find(p => p.id === 'vitrine');
  const ecomPkg = pricingPackages.find(p => p.id === 'ecommerce');
  const webinarPkg = pricingPackages.find(p => p.id === 'webinaire');

  return (
    <section id="hero" className="relative bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-100 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            {/* Clean unboxed kicker with dot separator */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: siteColors.primary }}>
              <span>Agence Numérique Panafricaine</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span className="text-slate-700">Création Web & E-commerce</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.18] text-balance">
              Concevez votre site web, boutique e-commerce ou plateforme webinaire à fort impact.
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-semibold">
              <strong className="text-slate-900 font-black">{agencyInfo.name}</strong> accompagne les entreprises, commerçants, coachs et créateurs africains avec des solutions complètes : sites vitrines professionnels à partir de <span className="text-[#073587] font-black">{vitrinePkg?.price || '50 000 FCFA'}</span>, boutiques Shopify et marketplaces à <span className="text-[#073587] font-black">{ecomPkg?.price || '100 000 FCFA'}</span>, et plateformes webinaires avec hébergement inclus à <span className="text-[#073587] font-black">{webinarPkg?.price || '250 000 FCFA'}</span>.
            </p>

            {/* Quick feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-slate-800 font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paiements Mobile Money & Cartes bancaires</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Livraison rapide et clé en main (3 à 7 jours)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nom de domaine personnalisé & certificat SSL inclus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Support direct & accompagnement WhatsApp 7j/7</span>
              </div>
            </div>

            {/* Primary Action Buttons (High visibility on Android) */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplorePricing}
                style={{ backgroundColor: siteColors.primary }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer hover:opacity-90"
              >
                <span>Découvrir nos offres & tarifs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppUrl("Bonjour Africa Web, je souhaite échanger directement avec vous pour commander un site web.")}
                onClick={() => trackClick('whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 rounded-xl shadow-sm transition-all whitespace-nowrap group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/30 group-hover:scale-110 transition-transform" />
                <span>WhatsApp ({agencyInfo.whatsappDisplay})</span>
              </a>
            </div>

            {/* Trust markers */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-bold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#073587]" />
                <span>Plateforme 100% au nom et sous le contrôle du client</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Adapté à tous les smartphones Android</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor with Africa Web Logo & 3 Offer Strips */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm relative">
              {/* Logo Presentation Banner */}
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-5 flex flex-col items-center text-center">
                <img
                  src={agencyInfo.logoUrl}
                  alt={agencyInfo.name}
                  className="h-20 sm:h-24 w-auto object-contain mb-3"
                />
                <p className="text-xs font-bold text-slate-800 italic">
                  "{agencyInfo.slogan}"
                </p>
                <div className="mt-1.5 text-[11px] text-slate-600 font-bold">
                  {agencyInfo.motto}
                </div>
              </div>

              {/* 3 Core Solution Strips */}
              <div className="space-y-3">
                {/* 1. Sites Vitrines */}
                <div
                  onClick={() => onOpenContact('vitrine')}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#073587] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#073587] flex items-center justify-center shrink-0">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#073587] transition-colors">
                        Site Internet Vitrine
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold">Présence professionnelle PME</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-[#073587] block font-mono">
                      {vitrinePkg?.price || '50 000 FCFA'}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">Clé en main</span>
                  </div>
                </div>

                {/* 2. Boutique E-commerce / Marketplace */}
                <div
                  onClick={() => onOpenContact('ecommerce')}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        Boutique Marketplace & E-commerce
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold">Shopify & Mobile Money</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-amber-600 block font-mono">
                      {ecomPkg?.price || '100 000 FCFA'}
                    </span>
                    <span className="text-[10px] text-slate-600 font-bold">À débattre</span>
                  </div>
                </div>

                {/* 3. Plateforme Webinaire */}
                <div
                  onClick={() => onOpenContact('webinaire')}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Plateforme Webinaire & Formations
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold">Espace membres & cours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-indigo-700 block font-mono">
                      {webinarPkg?.price || '250 000 FCFA'}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">Hébergement inclus</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Touch */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-700 font-bold">
                <span className="text-[11px]">Besoin d'un conseil immédiat ?</span>
                <a
                  href={getWhatsAppUrl("Bonjour Africa Web, pouvez-vous me conseiller sur l'offre la plus adaptée pour mon projet ?")}
                  onClick={() => trackClick('whatsapp')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Écrire sur WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
