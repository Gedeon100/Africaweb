import React from 'react';
import { Mail, Phone, MessageCircle, ArrowUp, Lock, ShieldCheck } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { getWhatsAppUrl } from '../data/agencyData';

interface FooterProps {
  onOpenOwnerLogin: () => void;
  onOpenOwnerDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOwnerLogin, onOpenOwnerDashboard }) => {
  const { agencyInfo, footerConfig, siteColors, isOwnerLoggedIn, trackClick } = useAgency();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans transition-colors"
      style={{ backgroundColor: siteColors.primaryDark }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info & Mission (Can be toggled by owner) */}
          {footerConfig.showBrandBlock && (
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={agencyInfo.logoUrl}
                  alt={agencyInfo.name}
                  className="h-10 w-auto object-contain bg-white/10 p-1 rounded-lg"
                />
                <span className="text-xl font-bold text-white tracking-tight">
                  Africa<span className="text-amber-400">Web</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
                {agencyInfo.slogan}
              </p>

              <p className="text-xs text-amber-300 font-bold">
                "{agencyInfo.motto}"
              </p>

              {/* Direct Contact Links */}
              <div className="pt-2 space-y-2 text-xs font-bold">
                <a
                  href={getWhatsAppUrl()}
                  onClick={() => trackClick('whatsapp')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp : {agencyInfo.whatsappDisplay}</span>
                </a>

                <a
                  href={`mailto:${agencyInfo.email}`}
                  onClick={() => trackClick('email')}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Email : {agencyInfo.email}</span>
                </a>

                {footerConfig.showDomainMention && (
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-300 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Tous nos sites sont livrés avec nom de domaine dédié et adresses emails professionnelles</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Core Services Links (Can be toggled by owner) */}
          {footerConfig.showServicesBlock && (
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Nos Solutions & Tarifs Officiels
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
                <li>
                  <a href="#tarifs" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Site Internet Vitrine pour entreprises</span>
                    <span className="text-white font-mono font-bold">50 000 FCFA</span>
                  </a>
                </li>
                <li>
                  <a href="#tarifs" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Boutique Marketplace & E-commerce</span>
                    <span className="text-white font-mono font-bold">100 000 FCFA</span>
                  </a>
                </li>
                <li>
                  <a href="#tarifs" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Plateforme Webinaire & Formations</span>
                    <span className="text-white font-mono font-bold">250 000 FCFA</span>
                  </a>
                </li>
                <li>
                  <a href="#presentation-video" className="hover:text-amber-400 transition-colors">
                    Vidéo de présentation de l'agence
                  </a>
                </li>
                <li>
                  <a href="#produit-vedette" className="hover:text-amber-400 transition-colors">
                    Produit Vedette : Guide des 150+ Recettes Béninoises
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Quick Access & Owner Login (Can be toggled by owner) */}
          {footerConfig.showQuickLinksBlock && (
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Accès Rapide & Espace Sécurisé
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
                <li>
                  <a href="#hero" className="hover:text-white transition-colors">Accueil</a>
                </li>
                <li>
                  <a href="#realisations" className="hover:text-white transition-colors">Exemplaires & Réalisations</a>
                </li>
                <li>
                  <a href="#tarifs" className="hover:text-white transition-colors">Grille Tarifaire</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">Contactez-nous</a>
                </li>
                <li className="pt-2 border-t border-slate-800">
                  {isOwnerLoggedIn ? (
                    <button
                      onClick={onOpenOwnerDashboard}
                      className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Mon Tableau de Bord Propriétaire (Connecté)</span>
                    </button>
                  ) : (
                    <button
                      onClick={onOpenOwnerLogin}
                      className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Espace Propriétaire (Connexion)</span>
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Bottom copyright & back-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <p>{footerConfig.copyrightText}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={isOwnerLoggedIn ? onOpenOwnerDashboard : onOpenOwnerLogin}
              className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Accès Propriétaire</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
