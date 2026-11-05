import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';
import { getWhatsAppUrl } from '../data/agencyData';

export const FloatingWhatsApp: React.FC = () => {
  const { trackClick } = useAgency();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end font-sans">
      {/* Floating greeting pill */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border-2 border-slate-200 flex items-center gap-2 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="leading-tight">
            Besoin d'un devis rapide ? <strong>Écrivez-nous sur WhatsApp</strong>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-700 ml-1 cursor-pointer"
            title="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button (Prominent on Android) */}
      <a
        href={getWhatsAppUrl("Bonjour Africa Web, je visite votre site internet et je souhaite des informations sur vos offres.")}
        onClick={() => trackClick('whatsapp')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-108 group relative cursor-pointer"
        aria-label="Contacter Africa Web sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 group-hover:scale-110 transition-transform" />

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-30 animate-ping -z-10" />
      </a>
    </div>
  );
};
