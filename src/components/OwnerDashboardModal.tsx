import React, { useState } from 'react';
import {
  X,
  BarChart3,
  Globe,
  MousePointerClick,
  Upload,
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  Save,
  Check,
  RefreshCw,
  LogOut,
  Sliders,
  DollarSign,
  Smartphone,
  ExternalLink,
  Phone,
  Mail,
  Type,
  Palette,
  Layout,
  Eye,
  EyeOff,
  Server
} from 'lucide-react';
import { useAgency, NavLinkItem } from '../context/AgencyContext';
import { ProjectItem } from '../data/agencyData';
import { compressImageFile, saveMediaBlob } from '../utils/mediaStorage';

interface OwnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerDashboardModal: React.FC<OwnerDashboardModalProps> = ({ isOpen, onClose }) => {
  const {
    agencyInfo,
    pricingPackages,
    portfolioProjects,
    videoPresentation,
    analytics,
    siteTypography,
    siteColors,
    headerConfig,
    footerConfig,
    logoutOwner,
    updateAgencyInfo,
    updatePricingPackage,
    addPortfolioProject,
    deletePortfolioProject,
    updateVideoPresentation,
    updateTypography,
    updateColors,
    updateHeaderConfig,
    toggleNavLinkVisibility,
    deleteNavLink,
    addNavLink,
    updateFooterConfig,
    resetToDefaults
  } = useAgency();

  const [activeTab, setActiveTab] = useState<'stats' | 'portfolio' | 'typography' | 'colors' | 'header' | 'footer' | 'media' | 'settings'>('stats');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Media state
  const [logoPreview, setLogoPreview] = useState(agencyInfo.logoUrl);
  const [responsablePreview, setResponsablePreview] = useState(agencyInfo.responsablePhoto);
  const [productImagePreview, setProductImagePreview] = useState(agencyInfo.featuredProduct.image);
  const [productLink, setProductLink] = useState(agencyInfo.featuredProduct.link);
  const [productTitle, setProductTitle] = useState(agencyInfo.featuredProduct.title);

  // Video state
  const [videoTitle, setVideoTitle] = useState(videoPresentation.title);
  const [videoSubtitle, setVideoSubtitle] = useState(videoPresentation.subtitle);
  const [videoUrl, setVideoUrl] = useState(videoPresentation.videoUrl);

  // Settings state
  const [whatsappNum, setWhatsappNum] = useState(agencyInfo.whatsappNumber);
  const [emailAddr, setEmailAddr] = useState(agencyInfo.email);

  // Typography state
  const [tempFontFamily, setTempFontFamily] = useState(siteTypography.fontFamily);
  const [tempFontSize, setTempFontSize] = useState(siteTypography.fontSize);
  const [tempFontWeight, setTempFontWeight] = useState(siteTypography.fontWeight);

  // Colors state
  const [tempPrimary, setTempPrimary] = useState(siteColors.primary);
  const [tempDark, setTempDark] = useState(siteColors.primaryDark);
  const [tempAccent, setTempAccent] = useState(siteColors.accent);
  const [tempBg, setTempBg] = useState(siteColors.bgColor);
  const [tempText, setTempText] = useState(siteColors.textColor);

  // Header state
  const [tempBrandTitle, setTempBrandTitle] = useState(headerConfig.brandTitle);
  const [tempBrandHighlight, setTempBrandHighlight] = useState(headerConfig.brandHighlight);
  const [tempBrandSubtitle, setTempBrandSubtitle] = useState(headerConfig.brandSubtitle);
  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavHref, setNewNavHref] = useState('');

  // Footer state
  const [tempCopyright, setTempCopyright] = useState(footerConfig.copyrightText);

  // Portfolio addition state
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectClient, setNewProjectClient] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<'vitrine' | 'ecommerce' | 'webinaire'>('vitrine');
  const [newProjectLink, setNewProjectLink] = useState('');
  const [newProjectHosting, setNewProjectHosting] = useState('Nom de Domaine Dédié & Certificat SSL');
  const [newProjectOutcome, setNewProjectOutcome] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectImage, setNewProjectImage] = useState<string>('');

  if (!isOpen) return null;

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Safe Image Upload with automatic canvas compression (under 200KB, never crashes localStorage or freezes UI)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("Optimisation et traitement de l'image...");
    try {
      const compressedDataUrl = await compressImageFile(file, 1200, 1200, 0.85);
      callback(compressedDataUrl);
      showToast("Photo importée et optimisée avec succès !");
    } catch (err) {
      console.error(err);
      showToast("Erreur lors de l'import de l'image. Veuillez réessayer.");
    } finally {
      setIsUploading(false);
      setUploadStatus('');
      e.target.value = '';
    }
  };

  // Safe Video Upload with IndexedDB storage (never crashes localStorage or freezes UI)
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      showToast("Veuillez sélectionner un fichier vidéo valide (MP4, WebM, etc.).");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Importation sécurisée de la vidéo depuis votre appareil...");
    try {
      // 1. Save binary Blob into IndexedDB
      await saveMediaBlob('presentation_video', file);

      // 2. Create ultra-fast instant Blob URL for smooth playback without lag
      const blobUrl = URL.createObjectURL(file);
      setVideoUrl(blobUrl);
      updateVideoPresentation({ videoUrl: blobUrl });
      showToast("Vidéo importée avec succès ! Prête pour la lecture.");
    } catch (err) {
      console.error(err);
      showToast("Erreur lors de l'importation de la vidéo.");
    } finally {
      setIsUploading(false);
      setUploadStatus('');
      e.target.value = '';
    }
  };

  // Save Media
  const handleSaveMedia = () => {
    updateAgencyInfo({
      logoUrl: logoPreview,
      responsablePhoto: responsablePreview,
      featuredProduct: {
        ...agencyInfo.featuredProduct,
        image: productImagePreview,
        link: productLink,
        title: productTitle
      }
    });

    updateVideoPresentation({
      title: videoTitle,
      subtitle: videoSubtitle,
      videoUrl: videoUrl
    });

    showToast("Médias et vidéo de présentation enregistrés !");
  };

  // Save Typography
  const handleSaveTypography = () => {
    updateTypography({
      fontFamily: tempFontFamily,
      fontSize: tempFontSize,
      fontWeight: tempFontWeight
    });
    showToast("Police, taille et graisse d'écriture appliquées sur tout le site !");
  };

  // Save Colors
  const handleSaveColors = () => {
    updateColors({
      primary: tempPrimary,
      primaryDark: tempDark,
      accent: tempAccent,
      bgColor: tempBg,
      textColor: tempText
    });
    showToast("Palette de couleurs du site enregistrée !");
  };

  // Preset color helper
  const applyColorPreset = (preset: { primary: string; dark: string; accent: string; bg: string; text: string; name: string }) => {
    setTempPrimary(preset.primary);
    setTempDark(preset.dark);
    setTempAccent(preset.accent);
    setTempBg(preset.bg);
    setTempText(preset.text);
    updateColors({
      primary: preset.primary,
      primaryDark: preset.dark,
      accent: preset.accent,
      bgColor: preset.bg,
      textColor: preset.text
    });
    showToast(`Palette "${preset.name}" appliquée !`);
  };

  // Save Header
  const handleSaveHeader = () => {
    updateHeaderConfig({
      brandTitle: tempBrandTitle,
      brandHighlight: tempBrandHighlight,
      brandSubtitle: tempBrandSubtitle
    });
    showToast("Configuration de l'entête principale enregistrée !");
  };

  // Add nav link
  const handleAddNavLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNavLabel.trim() || !newNavHref.trim()) return;
    addNavLink({
      id: `nav-${Date.now()}`,
      label: newNavLabel.trim(),
      href: newNavHref.trim(),
      visible: true
    });
    setNewNavLabel('');
    setNewNavHref('');
    showToast("Nouvel onglet ajouté à l'entête !");
  };

  // Save Footer
  const handleSaveFooter = () => {
    updateFooterConfig({
      copyrightText: tempCopyright
    });
    showToast("Bas de page mis à jour !");
  };

  // Save Settings
  const handleSaveSettings = () => {
    updateAgencyInfo({
      whatsappNumber: whatsappNum,
      whatsappDisplay: whatsappNum.startsWith('229')
        ? `+229 ${whatsappNum.slice(3, 5)} ${whatsappNum.slice(5, 7)} ${whatsappNum.slice(7, 9)} ${whatsappNum.slice(9, 11)}`
        : whatsappNum,
      email: emailAddr
    });
    showToast("Coordonnées et boutons WhatsApp/Email enregistrés !");
  };

  // Add Project
  const handleAddNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !newProjectClient.trim()) {
      showToast("Veuillez renseigner au moins le titre et le client.");
      return;
    }

    const categoryLabels = {
      vitrine: "Site Vitrine Corporate",
      ecommerce: "Boutique E-commerce & Marketplace",
      webinaire: "Plateforme Webinaire & Tunnels"
    };

    const themes = {
      vitrine: {
        primary: "#0f172a",
        primaryDark: "#020617",
        accent: "#0284c7",
        lightBg: "#f0f9ff",
        border: "#bae6fd",
        badgeBg: "#e0f2fe",
        badgeText: "#0369a1"
      },
      ecommerce: {
        primary: "#9a3412",
        primaryDark: "#7c2d12",
        accent: "#d97706",
        lightBg: "#fef3c7",
        border: "#fde68a",
        badgeBg: "#fef3c7",
        badgeText: "#b45309"
      },
      webinaire: {
        primary: "#312e81",
        primaryDark: "#1e1b4b",
        accent: "#6366f1",
        lightBg: "#eef2ff",
        border: "#c7d2fe",
        badgeBg: "#e0e7ff",
        badgeText: "#4338ca"
      }
    };

    const newProj: ProjectItem = {
      id: `custom-${Date.now()}`,
      title: newProjectTitle,
      client: newProjectClient,
      category: newProjectCategory,
      categoryLabel: categoryLabels[newProjectCategory],
      externalLink: newProjectLink.trim() || undefined,
      image: newProjectImage || undefined,
      outcome: newProjectOutcome.trim() || "Plateforme déployée et active en production",
      description: newProjectDesc.trim() || "Site web conçu et optimisé par Africa Web avec nom de domaine dédié.",
      technologies: ["Déploiement Africa Web", "Nom de Domaine Dédié", "Responsive Mobile", "SSL", "Paiements"],
      hosting: newProjectHosting.trim() || "Nom de Domaine Dédié Inclus",
      layoutFormat: newProjectCategory === 'ecommerce' ? 'amazon-jumia' : newProjectCategory === 'webinaire' ? 'facebook-social' : 'blueprint-corporate',
      heroSlogan: "Plateforme d'exception développée par Africa Web",
      accentColorName: newProjectCategory === 'ecommerce' ? 'Orange & Noir E-commerce' : newProjectCategory === 'webinaire' ? 'Bleu Social & Blanc' : 'Bleu Acier & Marine',
      colorTheme: themes[newProjectCategory]
    };

    addPortfolioProject(newProj);
    showToast(`Le site vitrine "${newProjectTitle}" a été publié sur la page d'accueil !`);

    // Reset fields
    setNewProjectTitle('');
    setNewProjectClient('');
    setNewProjectLink('');
    setNewProjectOutcome('');
    setNewProjectDesc('');
    setNewProjectImage('');
  };

  const totalClicks = analytics.clicksWhatsApp + analytics.clicksEmail + analytics.clicksFeaturedProduct + analytics.clicksQuoteForm;
  const ctrRate = analytics.totalVisits > 0
    ? ((totalClicks / analytics.totalVisits) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 right-4 z-50 bg-emerald-600 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Uploading Status Banner */}
        {isUploading && (
          <div className="absolute top-4 left-4 z-50 bg-amber-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{uploadStatus || "Importation du fichier en cours..."}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="bg-[#05235c] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>Panneau de Contrôle Propriétaire · Africa Web</span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  Connecté : kgmservices229@gmail.com
                </span>
              </h2>
              <p className="text-xs text-slate-300 font-bold">
                Modifiez tout ce que vous voulez : polices, tailles, couleurs, entête, bas de page, sites vitrines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutOwner();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-200 bg-red-900/50 hover:bg-red-800 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Scrollable horizontally) */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 flex overflow-x-auto gap-1.5 py-2">
          {[
            { id: 'stats', label: '1. Statistiques', icon: BarChart3 },
            { id: 'portfolio', label: '2. Sites & Vitrines', icon: Globe },
            { id: 'typography', label: '3. Polices & Tailles', icon: Type },
            { id: 'colors', label: '4. Couleurs', icon: Palette },
            { id: 'header', label: '5. Entête (Onglets)', icon: Layout },
            { id: 'footer', label: '6. Bas de Page', icon: Layout },
            { id: 'media', label: '7. Médias & Vidéo', icon: Upload },
            { id: 'settings', label: '8. Tarifs & Coordonnées', icon: DollarSign },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#073587] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {/* TAB 1: STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Visites Totales</span>
                    <BarChart3 className="w-4 h-4 text-[#073587]" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-mono">
                    {analytics.totalVisits.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">+12% cette semaine</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Visiteurs Uniques</span>
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-mono">
                    {analytics.uniqueVisitors.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold mt-1">Mobiles Android et PC</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Taux de Clics (CTR)</span>
                    <MousePointerClick className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-3xl font-black text-amber-600 font-mono">{ctrRate}%</div>
                  <p className="text-[11px] text-slate-500 font-bold mt-1">{totalClicks} clics qualifiés</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Clics WhatsApp</span>
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-emerald-600 font-mono">
                    {analytics.clicksWhatsApp}
                  </div>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1">Contacts directs</p>
                </div>
              </div>

              {/* Geographic Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#073587]" />
                  <span>Origine des Visiteurs par Pays</span>
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics.countryVisits).map(([country, count]) => {
                    const percentage = Math.round((count / analytics.totalVisits) * 100);
                    return (
                      <div key={country} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-black text-slate-800">
                          <span>{country}</span>
                          <span className="font-mono text-slate-600">{count} visites ({percentage}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#073587] to-amber-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO & MULTI SITES VITRINES */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              {/* Quick Add Presets */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
                <span className="text-xs font-black text-[#073587] uppercase tracking-wider block">
                  Ajout rapide de sites réalisés :
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setNewProjectCategory('vitrine');
                      setNewProjectTitle('Site Vitrine Entreprise Démo');
                      setNewProjectClient('Client PME Bénin');
                      setNewProjectDesc('Site vitrine corporate avec nom de domaine dédié et formulaire WhatsApp.');
                    }}
                    className="px-3 py-1.5 bg-white text-[#073587] border border-blue-300 rounded-xl text-xs font-black hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    + Pré-remplir Site Vitrine
                  </button>

                  <button
                    onClick={() => {
                      setNewProjectCategory('ecommerce');
                      setNewProjectTitle('Boutique E-commerce Mode & Vente');
                      setNewProjectClient('Maison de Mode Africaine');
                      setNewProjectDesc('Boutique e-commerce avec paiements Mobile Money MTN, Moov et Wave.');
                    }}
                    className="px-3 py-1.5 bg-white text-amber-800 border border-amber-300 rounded-xl text-xs font-black hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    + Pré-remplir Boutique E-commerce
                  </button>

                  <button
                    onClick={() => {
                      setNewProjectCategory('webinaire');
                      setNewProjectTitle('Académie en Ligne & Cours');
                      setNewProjectClient('Coach & Formateur International');
                      setNewProjectDesc('Plateforme webinaire et cours vidéo avec espace membres privé sécurisé.');
                    }}
                    className="px-3 py-1.5 bg-white text-indigo-800 border border-indigo-300 rounded-xl text-xs font-black hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    + Pré-remplir Plateforme Webinaire
                  </button>
                </div>
              </div>

              {/* Form to Add New Site */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#073587]" />
                  <span>Publier un nouveau site vitrine / boutique sur la page d'accueil</span>
                </h3>

                <form onSubmit={handleAddNewProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Titre du site vitrine / boutique * :
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: AfrikBât Architecture & Construction"
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Nom du client / Entreprise * :
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Cabinet AfrikBât Bénin"
                        value={newProjectClient}
                        onChange={(e) => setNewProjectClient(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">Catégorie :</label>
                      <select
                        value={newProjectCategory}
                        onChange={(e) => setNewProjectCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold bg-white"
                      >
                        <option value="vitrine">Site Internet Simple / Vitrine Entreprise</option>
                        <option value="ecommerce">Boutique E-commerce / Marketplace</option>
                        <option value="webinaire">Plateforme Webinaire & Formations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">Lien réel du site (URL) :</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newProjectLink}
                        onChange={(e) => setNewProjectLink(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono font-bold text-[#073587]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">Hébergement :</label>
                      <input
                        type="text"
                        value={newProjectHosting}
                        onChange={(e) => setNewProjectHosting(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">Résultat mesuré :</label>
                      <input
                        type="text"
                        placeholder="Ex: +180% de devis en 30 jours"
                        value={newProjectOutcome}
                        onChange={(e) => setNewProjectOutcome(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Capture d'écran / Photo (Android ou PC) :
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={(e) => handleImageUpload(e, setNewProjectImage)}
                        className="block w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-white cursor-pointer"
                      />
                      {newProjectImage && (
                        <div className="mt-2 flex items-center gap-2">
                          <img src={newProjectImage} alt="Aperçu nouveau projet" className="w-12 h-9 object-cover rounded border border-slate-300" />
                          <span className="text-[10px] text-emerald-600 font-bold">Image chargée et prête</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Description :</label>
                    <textarea
                      rows={2}
                      placeholder="Présentez les spécificités du site..."
                      value={newProjectDesc}
                      onChange={(e) => setNewProjectDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publier ce site vitrine sur la page d'accueil</span>
                  </button>
                </form>
              </div>

              {/* Existing Sites List with Delete */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
                  Sites vitrines & boutiques actuellement en ligne ({portfolioProjects.length}) :
                </h3>

                <div className="space-y-3">
                  {portfolioProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="w-12 h-10 object-cover rounded-md border border-slate-300 shrink-0" />
                        ) : (
                          <div className="w-12 h-10 bg-[#073587] text-white flex items-center justify-center font-black text-xs rounded-md shrink-0">
                            WEB
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-slate-900 truncate">{p.title}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold">
                            <span>{p.client}</span>
                            <span>·</span>
                            <span className="text-[#073587]">{p.categoryLabel}</span>
                          </div>
                          <span className="text-[10px] text-emerald-700 font-bold block">{p.hosting}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Confirmez-vous la suppression du site "${p.title}" de la page d'accueil ?`)) {
                            deletePortfolioProject(p.id);
                            showToast(`Site "${p.title}" supprimé.`);
                          }
                        }}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                        title="Supprimer ce site"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TYPOGRAPHY (FONT FAMILY & FONT SIZE) */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#073587]" />
                  <span>Changer la Police d'Écriture du Site</span>
                </h3>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">
                    Sélectionner une police populaire :
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {[
                      { label: "Arial", value: "Arial, Helvetica, sans-serif" },
                      { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
                      { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
                      { label: "Georgia", value: "Georgia, serif" },
                      { label: "Montserrat", value: "Montserrat, sans-serif" },
                      { label: "Poppins", value: "Poppins, sans-serif" },
                      { label: "Roboto", value: "Roboto, sans-serif" },
                      { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
                    ].map(f => (
                      <button
                        key={f.label}
                        type="button"
                        onClick={() => setTempFontFamily(f.value)}
                        className={`p-2.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                          tempFontFamily.includes(f.label)
                            ? 'bg-[#073587] text-white border-[#073587]'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                        style={{ fontFamily: f.value }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Ou saisir le nom de n'importe quelle police personnalisée :
                  </label>
                  <input
                    type="text"
                    value={tempFontFamily}
                    onChange={(e) => setTempFontFamily(e.target.value)}
                    placeholder="Ex: Arial, Tahoma, Helvetica..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                  />
                </div>

                {/* Font Size Selector */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black text-slate-700">
                      Taille de base des écritures :
                    </label>
                    <span className="text-base font-black text-[#073587] font-mono">
                      {tempFontSize}px
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={13}
                      max={26}
                      step={1}
                      value={tempFontSize}
                      onChange={(e) => setTempFontSize(Number(e.target.value))}
                      className="w-full accent-[#073587] cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {[14, 15, 16, 17, 18, 20, 22].map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setTempFontSize(size)}
                        className={`px-3 py-1 rounded-lg text-xs font-black border cursor-pointer ${
                          tempFontSize === size
                            ? 'bg-[#073587] text-white border-[#073587]'
                            : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Weight Selector */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-black text-slate-700 mb-2">
                    Graisse des écritures :
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Normal (400)", val: "400" },
                      { label: "Semi-Gras (600)", val: "600" },
                      { label: "Gras (700)", val: "700" },
                      { label: "Extra-Gras (800)", val: "800" },
                      { label: "Noir Intense (900)", val: "900" },
                    ].map(w => (
                      <button
                        key={w.val}
                        type="button"
                        onClick={() => setTempFontWeight(w.val)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black border cursor-pointer ${
                          tempFontWeight === w.val
                            ? 'bg-[#073587] text-white border-[#073587]'
                            : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Preview Box */}
                <div className="p-4 rounded-xl border border-slate-300 bg-slate-50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    Aperçu en direct du texte :
                  </span>
                  <p
                    style={{
                      fontFamily: tempFontFamily,
                      fontSize: `${tempFontSize}px`,
                      fontWeight: tempFontWeight
                    }}
                    className="text-slate-900 leading-snug"
                  >
                    Africa Web · Création de sites vitrines et boutiques e-commerce d'exception en Afrique.
                  </p>
                </div>

                <button
                  onClick={handleSaveTypography}
                  className="w-full py-3 px-5 bg-[#073587] hover:bg-[#05235c] text-white text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Appliquer cette police et cette taille à tout le site</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: COLORS */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              {/* Presets */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider block">
                  Palettes prédéfinies en 1 clic :
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Bleu Royal & Or (Défaut)", primary: "#073587", dark: "#05235c", accent: "#f59e0b", bg: "#ffffff", text: "#0f172a" },
                    { name: "Émeraude & Or Africain", primary: "#15803d", dark: "#052e16", accent: "#d97706", bg: "#ffffff", text: "#0f172a" },
                    { name: "Bordeaux Impérial & Cuivre", primary: "#881337", dark: "#4c0519", accent: "#ea580c", bg: "#ffffff", text: "#0f172a" },
                    { name: "Obsidienne & Cobalt", primary: "#1e3a8a", dark: "#0f172a", accent: "#38bdf8", bg: "#ffffff", text: "#0f172a" },
                    { name: "Terracotta & Chaleur", primary: "#9a3412", dark: "#431407", accent: "#f59e0b", bg: "#fffbeb", text: "#1c1917" }
                  ].map(preset => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => applyColorPreset(preset)}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-black hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }} />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Pickers */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#073587]" />
                  <span>Personnaliser les Couleurs du Site</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Primary Color */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <label className="block text-xs font-black text-slate-800">
                      Couleur Principale (Boutons, titres, logo) :
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={tempPrimary}
                        onChange={(e) => setTempPrimary(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={tempPrimary}
                        onChange={(e) => setTempPrimary(e.target.value)}
                        className="w-full px-2 py-1 text-xs font-mono font-black rounded border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Primary Dark Color */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <label className="block text-xs font-black text-slate-800">
                      Couleur Sombre (Entête haute & Pied de page) :
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={tempDark}
                        onChange={(e) => setTempDark(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={tempDark}
                        onChange={(e) => setTempDark(e.target.value)}
                        className="w-full px-2 py-1 text-xs font-mono font-black rounded border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <label className="block text-xs font-black text-slate-800">
                      Couleur d'Accent (Or, étoiles, promotions) :
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={tempAccent}
                        onChange={(e) => setTempAccent(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={tempAccent}
                        onChange={(e) => setTempAccent(e.target.value)}
                        className="w-full px-2 py-1 text-xs font-mono font-black rounded border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <label className="block text-xs font-black text-slate-800">
                      Couleur de Fond du Site :
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={tempBg}
                        onChange={(e) => setTempBg(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={tempBg}
                        onChange={(e) => setTempBg(e.target.value)}
                        className="w-full px-2 py-1 text-xs font-mono font-black rounded border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Text Color */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <label className="block text-xs font-black text-slate-800">
                      Couleur du Texte Principal :
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={tempText}
                        onChange={(e) => setTempText(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"
                      />
                      <input
                        type="text"
                        value={tempText}
                        onChange={(e) => setTempText(e.target.value)}
                        className="w-full px-2 py-1 text-xs font-mono font-black rounded border border-slate-300"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveColors}
                  className="w-full py-3 px-5 bg-[#073587] hover:bg-[#05235c] text-white text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer et appliquer ces couleurs</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: HEADER (ENTÊTE PRINCIPALE) */}
          {activeTab === 'header' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Layout className="w-4 h-4 text-[#073587]" />
                  <span>Gérer l'Entête Principale & les Onglets</span>
                </h3>

                {/* Toggles for header elements */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-black text-slate-800">Micro-barre du haut :</span>
                    <input
                      type="checkbox"
                      checked={headerConfig.showTopBar}
                      onChange={(e) => updateHeaderConfig({ showTopBar: e.target.checked })}
                      className="w-4 h-4 accent-[#073587]"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-black text-slate-800">Bouton WhatsApp entête :</span>
                    <input
                      type="checkbox"
                      checked={headerConfig.showWhatsAppBtn}
                      onChange={(e) => updateHeaderConfig({ showWhatsAppBtn: e.target.checked })}
                      className="w-4 h-4 accent-[#073587]"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-black text-slate-800">Bouton "Commander" entête :</span>
                    <input
                      type="checkbox"
                      checked={headerConfig.showOrderBtn}
                      onChange={(e) => updateHeaderConfig({ showOrderBtn: e.target.checked })}
                      className="w-4 h-4 accent-[#073587]"
                    />
                  </label>
                </div>

                {/* Brand title customization */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Titre de marque :</label>
                    <input
                      type="text"
                      value={tempBrandTitle}
                      onChange={(e) => setTempBrandTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Texte en surbrillance :</label>
                    <input
                      type="text"
                      value={tempBrandHighlight}
                      onChange={(e) => setTempBrandHighlight(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Sous-titre :</label>
                    <input
                      type="text"
                      value={tempBrandSubtitle}
                      onChange={(e) => setTempBrandSubtitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveHeader}
                  className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-black rounded-xl cursor-pointer"
                >
                  Mettre à jour le titre de l'entête
                </button>

                {/* Manage and Delete Nav Links */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                    Onglets de Navigation (Afficher, Masquer ou Supprimer) :
                  </h4>
                  <div className="space-y-2 mb-4">
                    {headerConfig.navLinks.map((link) => (
                      <div
                        key={link.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleNavLinkVisibility(link.id)}
                            className={`p-1.5 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer ${
                              link.visible
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                            title={link.visible ? "Masquer cet onglet" : "Afficher cet onglet"}
                          >
                            {link.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{link.visible ? "Visible" : "Masqué"}</span>
                          </button>
                          <span className={`text-xs font-black ${link.visible ? 'text-slate-900' : 'text-slate-400 line-through'}`}>
                            {link.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">({link.href})</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Supprimer l'onglet "${link.label}" ?`)) {
                              deleteNavLink(link.id);
                              showToast(`Onglet "${link.label}" supprimé.`);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="Supprimer cet onglet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Nav Link Form */}
                  <form onSubmit={handleAddNavLink} className="p-3.5 bg-blue-50/50 border border-blue-200 rounded-xl flex flex-wrap gap-2 items-center">
                    <input
                      type="text"
                      required
                      placeholder="Nom de l'onglet (ex: Blog)"
                      value={newNavLabel}
                      onChange={(e) => setNewNavLabel(e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-bold bg-white flex-1 min-w-[140px]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Lien ancre (ex: #contact)"
                      value={newNavHref}
                      onChange={(e) => setNewNavHref(e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-bold bg-white flex-1 min-w-[140px]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#073587] text-white text-xs font-black rounded-lg hover:bg-[#05235c] cursor-pointer whitespace-nowrap"
                    >
                      + Ajouter un onglet
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FOOTER (BAS DE PAGE) */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Layout className="w-4 h-4 text-[#073587]" />
                  <span>Personnaliser ou Supprimer des Éléments du Bas de Page</span>
                </h3>

                {/* Toggles for footer blocks */}
                <div className="space-y-2">
                  <label className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-black text-slate-800">
                      Bloc 1 : Présentation de la marque, slogan & coordonnées :
                    </span>
                    <input
                      type="checkbox"
                      checked={footerConfig.showBrandBlock}
                      onChange={(e) => updateFooterConfig({ showBrandBlock: e.target.checked })}
                      className="w-4 h-4 accent-[#073587]"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-black text-slate-800">
                      Bloc 2 : Solutions & Tarifs officiels :
                    </span>
                    <input
                      type="checkbox"
                      checked={footerConfig.showServicesBlock}
                      onChange={(e) => updateFooterConfig({ showServicesBlock: e.target.checked })}
                      className="w-4 h-4 accent-[#073587]"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-black text-slate-800">
                      Bloc 3 : Accès rapide & Connexion Propriétaire :
                    </span>
                    <input
                      type="checkbox"
                      checked={footerConfig.showQuickLinksBlock}
                      onChange={(e) => updateFooterConfig({ showQuickLinksBlock: e.target.checked })}
                      className="w-4 h-4 accent-[#073587]"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-black text-slate-800">
                      Mention Nom de domaine & Adresses professionnelles :
                    </span>
                    <input
                      type="checkbox"
                      checked={footerConfig.showDomainMention}
                      onChange={(e) => updateFooterConfig({ showDomainMention: e.target.checked })}
                      className="w-4 h-4 accent-[#073587]"
                    />
                  </label>
                </div>

                {/* Copyright Text */}
                <div className="pt-2">
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Texte de Copyright & Mentions légales :
                  </label>
                  <input
                    type="text"
                    value={tempCopyright}
                    onChange={(e) => setTempCopyright(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                  />
                </div>

                <button
                  onClick={handleSaveFooter}
                  className="w-full py-3 px-5 bg-[#073587] hover:bg-[#05235c] text-white text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer les modifications du bas de page</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: MEDIAS & VIDEO */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-[#073587] font-bold flex items-center gap-2">
                <Upload className="w-4 h-4 shrink-0" />
                <span>
                  Téléchargez directement vos fichiers depuis votre ordinateur ou appareil Android.
                </span>
              </div>

              {/* Logo */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#073587]" />
                  <span>Logo Africa Web (Image 1)</span>
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-32 h-24 bg-slate-100 rounded-xl border border-slate-200 p-2 flex items-center justify-center">
                    <img src={logoPreview} alt="Aperçu logo" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-black text-slate-700">
                      Télécharger un nouveau logo depuis votre appareil (Android / PC) :
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={(e) => handleImageUpload(e, setLogoPreview)}
                      className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#073587] file:text-white cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Photo Responsable */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Photo du Responsable du Site (Image 3)</span>
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 flex items-center justify-center bg-slate-100 shrink-0">
                    <img src={responsablePreview} alt="Responsable" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-black text-slate-700">
                      Télécharger une nouvelle photo de profil :
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={(e) => handleImageUpload(e, setResponsablePreview)}
                      className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-500" />
                  <span>Rubrique Vidéo de Présentation</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Titre de la vidéo :</label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Sous-titre :</label>
                    <input
                      type="text"
                      value={videoSubtitle}
                      onChange={(e) => setVideoSubtitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      Importer une vidéo depuis votre appareil (MP4, WebM - PC ou Android) :
                    </label>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      disabled={isUploading}
                      onChange={handleVideoUpload}
                      className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-white cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-500 font-bold mt-1 block">
                      Enregistré de manière fluide et sécurisée sans bloquer le site web.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Ou saisir une URL de vidéo en ligne :
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono font-bold"
                    />
                  </div>

                  {/* Video Preview */}
                  {videoUrl && (
                    <div className="pt-2">
                      <span className="text-[11px] font-black text-slate-700 block mb-1.5">
                        Aperçu de la vidéo active :
                      </span>
                      <div className="max-w-md aspect-video bg-black rounded-xl overflow-hidden border border-slate-300">
                        <video src={videoUrl} controls className="w-full h-full object-contain" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Produit Vedette */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  <span>Produit Vedette (Image 2 & Lien de Vente)</span>
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-24 h-32 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    <img src={productImagePreview} alt="Produit vedette" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Changer la photo du produit vedette :
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={(e) => handleImageUpload(e, setProductImagePreview)}
                        className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-white cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Lien URL de redirection :
                      </label>
                      <input
                        type="url"
                        value={productLink}
                        onChange={(e) => setProductLink(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono font-bold text-[#073587]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveMedia}
                className="w-full py-3.5 px-6 rounded-xl text-xs font-black text-white bg-[#073587] hover:bg-[#05235c] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer tous les médias & la vidéo</span>
              </button>
            </div>
          )}

          {/* TAB 8: SETTINGS, TARIFS & BOUTONS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* WhatsApp & Email */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Numéro WhatsApp & Email (Boutons d'appel)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Numéro WhatsApp (ex: 2290168546237) :
                    </label>
                    <input
                      type="text"
                      value={whatsappNum}
                      onChange={(e) => setWhatsappNum(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">
                      Email officiel des commandes :
                    </label>
                    <input
                      type="email"
                      value={emailAddr}
                      onChange={(e) => setEmailAddr(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono font-bold"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer les coordonnées des boutons</span>
                </button>
              </div>

              {/* Pricing Packages */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-500" />
                  <span>Modifier les Prix des 3 Offres Officielles</span>
                </h3>

                <div className="space-y-3">
                  {pricingPackages.map((pkg) => (
                    <div key={pkg.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      <div>
                        <span className="text-xs font-black text-slate-900 block">{pkg.name}</span>
                        <span className="text-[11px] text-slate-500 font-bold">{pkg.delay}</span>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Prix affiché :</label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => updatePricingPackage(pkg.id, { price: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-black rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Hébergement :</label>
                        <input
                          type="text"
                          value={pkg.hosting || ''}
                          onChange={(e) => updatePricingPackage(pkg.id, { hosting: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs font-bold rounded border border-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Factory Settings */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-red-900">Réinitialiser les paramètres d'usine</h4>
                  <p className="text-[11px] text-red-700 font-bold">Rétablir les couleurs, polices et données par défaut</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Réinitialiser toutes les données personnalisées ?")) {
                      resetToDefaults();
                    }
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Réinitialiser</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
