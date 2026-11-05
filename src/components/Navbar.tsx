import React, { useState } from 'react';
import { Menu, X, MessageCircle, Mail, Phone, ChevronRight, ShieldCheck, Server } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { getWhatsAppUrl } from '../data/agencyData';

interface NavbarProps {
  onOpenContact: (prefillPackage?: string) => void;
  onOpenOwnerDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenOwnerDashboard }) => {
  const { agencyInfo, headerConfig, siteColors, isOwnerLoggedIn, trackClick } = useAgency();
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
            <div className="flex items-center gap-3 sm:gap-4 ml-auto font-bold text-xs">
              {isOwnerLoggedIn && onOpenOwnerDashboard && (
                <button
                  onClick={onOpenOwnerDashboard}
                  className="flex items-center gap-1 text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/40 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Espace Propriétaire</span>
                </button>
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
            {isOwnerLoggedIn && onOpenOwnerDashboard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOwnerDashboard();
                }}
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Ouvrir mon tableau de bord propriétaire</span>
              </button>
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
