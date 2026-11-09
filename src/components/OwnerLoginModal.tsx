import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles, Check } from 'lucide-react';
import { useAgency } from '../context/AgencyContext';

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OwnerLoginModal: React.FC<OwnerLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginOwner } = useAgency();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleFillCredentials = () => {
    setEmail('kgmservices229@gmail.com');
    setPassword('Samuell@8');
    setError('');
  };

  const handleDirectLogin = () => {
    setEmail('kgmservices229@gmail.com');
    setPassword('Samuell@8');
    setError('');
    const success = loginOwner('kgmservices229@gmail.com', 'Samuell@8');
    if (success) {
      onSuccess();
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const success = loginOwner(cleanEmail, cleanPassword);
    if (success) {
      onSuccess();
      onClose();
    } else {
      setError("Identifiants incorrects. Veuillez vérifier l'adresse email (kgmservices229@gmail.com) et le mot de passe (Samuell@8).");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div
        className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#05235c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-black">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                Espace Propriétaire · Africa Web
              </h3>
              <p className="text-[11px] text-slate-300 font-bold">
                Connexion sécurisée au panneau d'administration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Quick Auto-Fill & 1-Click Connect Helper */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="text-[11px] text-amber-950 font-bold leading-tight">
              <span>Compte certifié :</span>
              <span className="block text-[10px] text-amber-800 font-mono mt-0.5">kgmservices229@gmail.com</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleDirectLogin}
                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-black transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                title="Connexion instantanée en 1 clic"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Connexion 1 clic</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-start gap-2 border border-red-200 font-bold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5">
              Adresse Email Propriétaire *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                placeholder="kgmservices229@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#073587] focus:border-[#073587] font-bold"
              />
            </div>
          </div>

          {/* Password field with Show/Hide toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black text-slate-800">
                Mot de passe confidentiel *
              </label>
              <span className="text-[10px] font-mono font-bold text-slate-500">
                (Samuell@8)
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Votre mot de passe secret"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#073587] focus:border-[#073587] font-bold font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me toggle */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-[#073587] rounded cursor-pointer"
              />
              <span>Rester connecté sur cet appareil</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black text-white bg-[#073587] hover:bg-[#05235c] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ouvrir mon tableau de bord propriétaire</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-bold text-center pt-2">
            🔒 Accès exclusif réservé au propriétaire d'Africa Web pour piloter et modifier le site en temps réel.
          </p>
        </form>
      </div>
    </div>
  );
};
