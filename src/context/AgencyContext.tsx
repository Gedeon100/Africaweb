import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AGENCY_INFO,
  PRICING_PACKAGES,
  PORTFOLIO_PROJECTS,
  TESTIMONIALS,
  PricingPackage,
  ProjectItem,
  TestimonialItem
} from '../data/agencyData';
import {
  safeLocalStorageSet,
  safeLocalStorageGet,
  getMediaBlob,
  saveMediaBlob,
  deleteMediaBlob
} from '../utils/mediaStorage';

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  clicksWhatsApp: number;
  clicksEmail: number;
  clicksFeaturedProduct: number;
  clicksQuoteForm: number;
  countryVisits: { [country: string]: number };
}

export interface VideoPresentationData {
  title: string;
  subtitle: string;
  videoUrl: string;
  videoType: 'upload' | 'embed';
  posterUrl?: string;
  duration?: string;
}

export interface SiteTypography {
  fontFamily: string;
  fontSize: number; // in pixels (e.g. 14, 16, 18, 20, 22)
  fontWeight: string; // e.g. "400", "600", "700", "800", "900"
}

export interface SiteColors {
  primary: string; // Header, primary CTA, badges (e.g. #073587)
  primaryDark: string; // Top bar, deep accents (e.g. #05235c)
  accent: string; // Highlights, stars, gold (e.g. #f59e0b)
  bgColor: string; // Background color (e.g. #ffffff)
  textColor: string; // Main text color (e.g. #0f172a)
}

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  visible: boolean;
}

export interface HeaderConfig {
  showTopBar: boolean;
  showWhatsAppBtn: boolean;
  showOrderBtn: boolean;
  brandTitle: string;
  brandHighlight: string;
  brandSubtitle: string;
  navLinks: NavLinkItem[];
}

export interface FooterConfig {
  showBrandBlock: boolean;
  showServicesBlock: boolean;
  showQuickLinksBlock: boolean;
  showDomainMention: boolean;
  copyrightText: string;
}

export interface AgencyState {
  name: string;
  slogan: string;
  motto: string;
  email: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  logoUrl: string;
  responsablePhoto: string;
  featuredProduct: {
    title: string;
    subtitle: string;
    badge: string;
    image: string;
    link: string;
    highlights: string[];
  };
}

interface AgencyContextType {
  // State
  agencyInfo: AgencyState;
  pricingPackages: PricingPackage[];
  portfolioProjects: ProjectItem[];
  testimonials: TestimonialItem[];
  videoPresentation: VideoPresentationData;
  analytics: AnalyticsData;
  siteTypography: SiteTypography;
  siteColors: SiteColors;
  headerConfig: HeaderConfig;
  footerConfig: FooterConfig;
  isOwnerLoggedIn: boolean;

  // Actions
  loginOwner: (email: string, pass: string) => boolean;
  logoutOwner: () => void;
  updateAgencyInfo: (data: Partial<AgencyState>) => void;
  updatePricingPackage: (id: string, data: Partial<PricingPackage>) => void;
  addPortfolioProject: (project: ProjectItem) => void;
  updatePortfolioProject: (id: string, project: Partial<ProjectItem>) => void;
  deletePortfolioProject: (id: string) => void;
  updateVideoPresentation: (data: Partial<VideoPresentationData>) => void;
  updateTypography: (data: Partial<SiteTypography>) => void;
  updateColors: (data: Partial<SiteColors>) => void;
  updateHeaderConfig: (data: Partial<HeaderConfig>) => void;
  toggleNavLinkVisibility: (id: string) => void;
  deleteNavLink: (id: string) => void;
  addNavLink: (link: NavLinkItem) => void;
  updateFooterConfig: (data: Partial<FooterConfig>) => void;
  trackClick: (type: 'whatsapp' | 'email' | 'product' | 'quote') => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY_PREFIX = 'africa_web_cms_';

const defaultAnalytics: AnalyticsData = {
  totalVisits: 1420,
  uniqueVisitors: 890,
  clicksWhatsApp: 384,
  clicksEmail: 92,
  clicksFeaturedProduct: 512,
  clicksQuoteForm: 178,
  countryVisits: {
    'Bénin 🇧🇯': 640,
    'Côte d\'Ivoire 🇨🇮': 310,
    'Sénégal 🇸🇳': 185,
    'Togo 🇹🇬': 110,
    'Cameroun 🇨🇲': 95,
    'France 🇫🇷': 80
  }
};

const defaultVideoPresentation: VideoPresentationData = {
  title: "Présentation Officielle d'Africa Web Agence Numérique",
  subtitle: "Découvrez nos méthodes de conception de sites vitrines, boutiques e-commerce et tunnels webinaires performants.",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  videoType: "upload",
  duration: "02:45 min"
};

const defaultTypography: SiteTypography = {
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: 18,
  fontWeight: "700"
};

const defaultColors: SiteColors = {
  primary: "#073587",
  primaryDark: "#05235c",
  accent: "#f59e0b",
  bgColor: "#ffffff",
  textColor: "#0f172a"
};

const defaultHeaderConfig: HeaderConfig = {
  showTopBar: true,
  showWhatsAppBtn: true,
  showOrderBtn: true,
  brandTitle: "Africa",
  brandHighlight: "Web",
  brandSubtitle: "Agence Numérique",
  navLinks: [
    { id: "hero", label: "Accueil", href: "#hero", visible: true },
    { id: "tarifs", label: "Tarifs", href: "#tarifs", visible: true },
    { id: "realisations", label: "Réalisations", href: "#realisations", visible: true },
    { id: "video", label: "Vidéo", href: "#presentation-video", visible: true },
    { id: "produit", label: "Produit Vedette", href: "#produit-vedette", visible: true },
    { id: "temoignages", label: "Témoignages", href: "#temoignages", visible: true },
    { id: "contact", label: "Contact", href: "#contact", visible: true }
  ]
};

const defaultFooterConfig: FooterConfig = {
  showBrandBlock: true,
  showServicesBlock: true,
  showQuickLinksBlock: true,
  showDomainMention: true,
  copyrightText: "© 2026 Africa Web. Tous droits réservés. Agence Numérique Panafricaine."
};

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Agency Info
  const [agencyInfo, setAgencyInfo] = useState<AgencyState>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}info`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: AGENCY_INFO.name,
      slogan: AGENCY_INFO.slogan,
      motto: AGENCY_INFO.motto,
      email: AGENCY_INFO.email,
      whatsappNumber: AGENCY_INFO.whatsappNumber,
      whatsappDisplay: AGENCY_INFO.whatsappDisplay,
      logoUrl: AGENCY_INFO.logoUrl,
      responsablePhoto: AGENCY_INFO.responsablePhoto,
      featuredProduct: AGENCY_INFO.featuredProduct
    };
  });

  // 2. Pricing Packages
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}pricing`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!saved.includes('Hostinger')) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return PRICING_PACKAGES;
  });

  // 3. Portfolio Projects
  const [portfolioProjects, setPortfolioProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}portfolio`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((p: any) => p.id === 'afribaba-trade')) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return PORTFOLIO_PROJECTS;
  });

  // 4. Testimonials
  const [testimonials] = useState<TestimonialItem[]>(TESTIMONIALS);

  // 5. Video Presentation
  const [videoPresentation, setVideoPresentation] = useState<VideoPresentationData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}video`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultVideoPresentation;
  });

  // 6. Analytics
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}analytics`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultAnalytics;
  });

  // 7. Typography (Font Family, Font Size, Font Weight)
  const [siteTypography, setSiteTypography] = useState<SiteTypography>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}typography`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultTypography;
  });

  // 8. Colors (Primary, Dark, Accent, Background, Text)
  const [siteColors, setSiteColors] = useState<SiteColors>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}colors`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultColors;
  });

  // 9. Header Config (Nav links, display toggles)
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}header`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultHeaderConfig;
  });

  // 10. Footer Config (Blocks, copyright)
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}footer`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return defaultFooterConfig;
  });

  // 11. Owner Authentication
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(`${STORAGE_KEY_PREFIX}owner_auth`) === 'true';
  });

  // Track session visit once per mount
  useEffect(() => {
    const hasVisitedSession = sessionStorage.getItem(`${STORAGE_KEY_PREFIX}visited_session`);
    if (!hasVisitedSession) {
      sessionStorage.setItem(`${STORAGE_KEY_PREFIX}visited_session`, 'true');
      setAnalytics(prev => {
        const updated = {
          ...prev,
          totalVisits: prev.totalVisits + 1,
          uniqueVisitors: prev.uniqueVisitors + 1,
          countryVisits: {
            ...prev.countryVisits,
            'Bénin 🇧🇯': (prev.countryVisits['Bénin 🇧🇯'] || 0) + 1
          }
        };
        localStorage.setItem(`${STORAGE_KEY_PREFIX}analytics`, JSON.stringify(updated));
        return updated;
      });
    }
  }, []);

  // Synchronize CSS variables with DOM Root for real-time dynamic restyling
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontFamily = siteTypography.fontFamily;
    root.style.fontSize = `${siteTypography.fontSize}px`;
    root.style.fontWeight = siteTypography.fontWeight;

    document.body.style.fontFamily = siteTypography.fontFamily;
    document.body.style.fontSize = `${siteTypography.fontSize}px`;
    document.body.style.fontWeight = siteTypography.fontWeight;
    document.body.style.backgroundColor = siteColors.bgColor;
    document.body.style.color = siteColors.textColor;

    root.style.setProperty('--color-brand-primary', siteColors.primary);
    root.style.setProperty('--color-brand-dark', siteColors.primaryDark);
    root.style.setProperty('--color-brand-accent', siteColors.accent);
    root.style.setProperty('--color-brand-bg', siteColors.bgColor);
    root.style.setProperty('--color-brand-text', siteColors.textColor);
  }, [siteTypography, siteColors]);

  // Restore video from IndexedDB if previously uploaded
  useEffect(() => {
    let activeBlobUrl: string | null = null;
    async function restoreIndexedDBMedia() {
      try {
        const videoBlob = await getMediaBlob('presentation_video');
        if (videoBlob) {
          activeBlobUrl = URL.createObjectURL(videoBlob);
          setVideoPresentation(prev => ({
            ...prev,
            videoUrl: activeBlobUrl || prev.videoUrl
          }));
        }
      } catch (err) {
        console.warn('Could not restore video from IndexedDB', err);
      }
    }
    restoreIndexedDBMedia();

    return () => {
      if (activeBlobUrl) {
        URL.revokeObjectURL(activeBlobUrl);
      }
    };
  }, []);

  // Persist to safe storage (with quota protection to ensure site never freezes or crashes)
  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}info`, JSON.stringify(agencyInfo));
  }, [agencyInfo]);

  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}pricing`, JSON.stringify(pricingPackages));
  }, [pricingPackages]);

  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}portfolio`, JSON.stringify(portfolioProjects));
  }, [portfolioProjects]);

  useEffect(() => {
    // If videoUrl is a blob URL from an uploaded file, store lightweight reference in localStorage
    const toSave = {
      ...videoPresentation,
      videoUrl: videoPresentation.videoUrl.startsWith('blob:')
        ? 'indexeddb:presentation_video'
        : videoPresentation.videoUrl
    };
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}video`, JSON.stringify(toSave));
  }, [videoPresentation]);

  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}analytics`, JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}typography`, JSON.stringify(siteTypography));
  }, [siteTypography]);

  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}colors`, JSON.stringify(siteColors));
  }, [siteColors]);

  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}header`, JSON.stringify(headerConfig));
  }, [headerConfig]);

  useEffect(() => {
    safeLocalStorageSet(`${STORAGE_KEY_PREFIX}footer`, JSON.stringify(footerConfig));
  }, [footerConfig]);

  // Auth handler
  const loginOwner = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();
    if (cleanEmail === 'kgmservices229@gmail.com' && cleanPass === 'Samuell@8') {
      setIsOwnerLoggedIn(true);
      sessionStorage.setItem(`${STORAGE_KEY_PREFIX}owner_auth`, 'true');
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwnerLoggedIn(false);
    sessionStorage.removeItem(`${STORAGE_KEY_PREFIX}owner_auth`);
  };

  const updateAgencyInfo = (data: Partial<AgencyState>) => {
    setAgencyInfo(prev => ({ ...prev, ...data }));
  };

  const updatePricingPackage = (id: string, data: Partial<PricingPackage>) => {
    setPricingPackages(prev =>
      prev.map(p => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const addPortfolioProject = (project: ProjectItem) => {
    setPortfolioProjects(prev => [project, ...prev]);
  };

  const updatePortfolioProject = (id: string, project: Partial<ProjectItem>) => {
    setPortfolioProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...project } : p))
    );
  };

  const deletePortfolioProject = (id: string) => {
    setPortfolioProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateVideoPresentation = (data: Partial<VideoPresentationData>) => {
    setVideoPresentation(prev => ({ ...prev, ...data }));
  };

  const updateTypography = (data: Partial<SiteTypography>) => {
    setSiteTypography(prev => ({ ...prev, ...data }));
  };

  const updateColors = (data: Partial<SiteColors>) => {
    setSiteColors(prev => ({ ...prev, ...data }));
  };

  const updateHeaderConfig = (data: Partial<HeaderConfig>) => {
    setHeaderConfig(prev => ({ ...prev, ...data }));
  };

  const toggleNavLinkVisibility = (id: string) => {
    setHeaderConfig(prev => ({
      ...prev,
      navLinks: prev.navLinks.map(link =>
        link.id === id ? { ...link, visible: !link.visible } : link
      )
    }));
  };

  const deleteNavLink = (id: string) => {
    setHeaderConfig(prev => ({
      ...prev,
      navLinks: prev.navLinks.filter(link => link.id !== id)
    }));
  };

  const addNavLink = (link: NavLinkItem) => {
    setHeaderConfig(prev => ({
      ...prev,
      navLinks: [...prev.navLinks, link]
    }));
  };

  const updateFooterConfig = (data: Partial<FooterConfig>) => {
    setFooterConfig(prev => ({ ...prev, ...data }));
  };

  const trackClick = (type: 'whatsapp' | 'email' | 'product' | 'quote') => {
    setAnalytics(prev => {
      const updated = { ...prev };
      if (type === 'whatsapp') updated.clicksWhatsApp += 1;
      if (type === 'email') updated.clicksEmail += 1;
      if (type === 'product') updated.clicksFeaturedProduct += 1;
      if (type === 'quote') updated.clicksQuoteForm += 1;
      safeLocalStorageSet(`${STORAGE_KEY_PREFIX}analytics`, JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefaults = async () => {
    try {
      await deleteMediaBlob('presentation_video');
    } catch {}
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}info`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}pricing`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}portfolio`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}video`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}analytics`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}typography`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}colors`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}header`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}footer`);
    window.location.reload();
  };

  return (
    <AgencyContext.Provider
      value={{
        agencyInfo,
        pricingPackages,
        portfolioProjects,
        testimonials,
        videoPresentation,
        analytics,
        siteTypography,
        siteColors,
        headerConfig,
        footerConfig,
        isOwnerLoggedIn,
        loginOwner,
        logoutOwner,
        updateAgencyInfo,
        updatePricingPackage,
        addPortfolioProject,
        updatePortfolioProject,
        deletePortfolioProject,
        updateVideoPresentation,
        updateTypography,
        updateColors,
        updateHeaderConfig,
        toggleNavLinkVisibility,
        deleteNavLink,
        addNavLink,
        updateFooterConfig,
        trackClick,
        resetToDefaults
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
};
