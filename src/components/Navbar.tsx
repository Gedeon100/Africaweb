import React, { useState } from 'react';
import { Menu, X, MessageCircle, Mail, Phone, ChevronRight, ShieldCheck, Lock, LogOut } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { getWhatsAppUrl } from '../data/agencyData';

interface NavbarProps {
  onOpenContact: (prefillPackage?: string) => void;
  onOpenOwnerDashboard?: () => void;
  onOpenOwnerLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenOwnerDashboard, onOpenOwnerLogin }) => {
  const { agencyInfo, headerConfig, siteColors, isOwnerLoggedIn, logoutOwner, trackClick } = useAgency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter only visible links configured by the owner
  const visibleNavLinks = headerConfig.navLinks.filter(l => l.visible);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs font-sans w-full">
      {/* Top Micro-bar: Can be toggled by owner */}
      {headerConfig.showTopBar && (
        <div
          className="text-white text-xs py-2 px-4 sm:px-6 transition-colors"
          style={{ backgroundColor: siteColors.primaryDark }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Brand announcement */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-black text-amber-300">
                {headerConfig.brandTitle}{headerConfig.brandHighlight}
              </span>
              <span className="text-slate-400">·</span>
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold bg-white/10 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sites Vitrines, Boutiques & Plateformes Web</span>
              </span>
              <span className="hidden md:inline text-slate-300 font-medium">| {agencyInfo.slogan}</span>
            </div>

            {/* Quick Contact & Owner Shortcut */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto font-bold text-xs">
              {isOwnerLoggedIn ? (
                <div className="flex items-center gap-1.5">
                  {onOpenOwnerDashboard && (
                    <button
                      onClick={onOpenOwnerDashboard}
                      className="flex items-center gap-1 text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded border border-amber-400/40 cursor-pointer transition-colors"
                      title="Ouvrir mon tableau de bord propriétaire"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tableau de Bord</span>
                    </button>
                  )}
                  <button
                    onClick={logoutOwner}
                    className="flex items-center gap-1 text-red-100 bg-red-600/80 hover:bg-red-600 px-2 py-0.5 rounded border border-red-400/50 cursor-pointer transition-colors font-black"
                    title="Se déconnecter de mon espace propriétaire"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                onOpenOwnerLogin && (
                  <button
                    onClick={onOpenOwnerLogin}
                    className="flex items-center gap-1 text-amber-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded border border-white/20 cursor-pointer transition-colors"
                    title="Connexion Espace Propriétaire (kgmservices229@gmail.com)"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Accès Propriétaire</span>
                  </button>
                )
              )}

              <a
                href={`mailto:${agencyInfo.email}`}
                onClick={() => trackClick('email')}
                className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{agencyInfo.email}</span>
              </a>

              <a
                href={getWhatsAppUrl()}
                onClick={() => trackClick('whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{agencyInfo.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar: Strictly framed with max-w-7xl mx-auto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 gap-4 lg:gap-6">
          {/* Zone 1: Logo & Brand Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 shrink-0 group py-1"
          >
            <img
              src={agencyInfo.logoUrl}
              alt="Africa Web Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
            />
            <div className="flex flex-col">
              <span
                className="text-xl sm:text-2xl font-black tracking-tight leading-none"
                style={{ color: siteColors.primary }}
              >
                {headerConfig.brandTitle}
                <span style={{ color: siteColors.accent }}>{headerConfig.brandHighlight}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">
                {headerConfig.brandSubtitle}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Customized by owner) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[15px] xl:text-[16px] font-bold text-slate-800 whitespace-nowrap">
            {visibleNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:opacity-80 transition-colors py-1 border-b-2 border-transparent"
                style={{ borderColor: 'transparent' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Quick WhatsApp Button */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Quick Owner Button */}
            {isOwnerLoggedIn ? (
              onOpenOwnerDashboard && (
                <button
                  onClick={onOpenOwnerDashboard}
                  className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors cursor-pointer"
                  title="Mon Tableau de Bord Propriétaire"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              )
            ) : (
              onOpenOwnerLogin && (
                <button
                  onClick={onOpenOwnerLogin}
                  className="p-2 text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Accès Propriétaire (Connexion)"
                >
                  <Lock className="w-4 h-4" />
                </button>
              )
            )}

            {headerConfig.showWhatsAppBtn && (
              <a
                href={getWhatsAppUrl("Bonjour Africa Web, je souhaite un devis pour la création de mon site internet.")}
                onClick={() => trackClick('whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/30" />
                <span>WhatsApp</span>
              </a>
            )}

            {headerConfig.showOrderBtn && (
              <button
                onClick={() => onOpenContact()}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white rounded-xl shadow-xs hover:shadow transition-all whitespace-nowrap cursor-pointer"
                style={{ backgroundColor: siteColors.primary }}
              >
                <span>Commander un site</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={getWhatsAppUrl()}
              onClick={() => trackClick('whatsapp')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 cursor-pointer"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Customized by owner) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {visibleNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-2.5 text-base font-bold text-slate-900 hover:text-[#073587] border-b border-slate-100 last:border-none"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            {isOwnerLoggedIn ? (
              <div className="flex flex-col gap-2">
                {onOpenOwnerDashboard && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenOwnerDashboard();
                    }}
                    className="w-full py-3 px-4 text-xs font-black text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Mon Tableau de Bord Propriétaire (Connecté)</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutOwner();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-black text-white bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se Déconnecter de mon Compte Propriétaire</span>
                </button>
              </div>
            ) : (
              onOpenOwnerLogin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOwnerLogin();
                  }}
                  className="w-full py-3 px-4 text-xs font-black text-slate-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-amber-700" />
                  <span>Connexion Compte Propriétaire (Accès CMS)</span>
                </button>
              )
            )}

            {headerConfig.showWhatsAppBtn && (
              <a
                href={getWhatsAppUrl("Bonjour Africa Web, je souhaite échanger directement avec vous sur WhatsApp.")}
                onClick={() => trackClick('whatsapp')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Contacter sur WhatsApp ({agencyInfo.whatsappDisplay})</span>
              </a>
            )}

            {headerConfig.showOrderBtn && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 px-4 text-xs font-bold text-white rounded-xl shadow-xs cursor-pointer"
                style={{ backgroundColor: siteColors.primary }}
              >
                Demander un devis / Commander
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
