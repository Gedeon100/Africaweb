export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  delay: string;
  popular?: boolean;
  hosting: string;
  features: string[];
  whatsappMessage: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'vitrine' | 'ecommerce' | 'webinaire';
  categoryLabel: string;
  client: string;
  domain?: string;
  domainBadge?: string;
  image?: string;
  externalLink?: string;
  outcome: string;
  description: string;
  technologies: string[];
  hosting?: string;
  layoutFormat: 'alibaba-b2b' | 'cinetpay-fintech' | 'facebook-social' | 'amazon-jumia' | 'culinary-funnel' | 'blueprint-corporate' | 'modern-store' | 'dark-academy' | 'fresh-market' | 'executive-law';
  heroSlogan: string;
  accentColorName: string;
  colorTheme: {
    primary: string;
    primaryDark: string;
    accent: string;
    lightBg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
  };
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  projectType: string;
}

export const AGENCY_INFO = {
  name: "Africa Web",
  brandSubtitle: "Agence Numérique",
  slogan: "Votre partenaire pour une présence en ligne réussie !",
  motto: "Innovons ensemble pour une Afrique connectée et prospère !",
  email: "kgmservices229@gmail.com",
  whatsappNumber: "2290168546237",
  whatsappDisplay: "+229 01 68 54 62 37",
  logoUrl: "/assets/aistudio/AfricaWeb_bd0cd59c.png",
  responsablePhoto: "/assets/aistudio/Capture_d__cran_2026-11-04_225610_f0c2edc0.png",
  featuredProduct: {
    title: "Le Guide Ultime des 150+ Recettes Béninoises & Africaines",
    subtitle: "Formation & Recueil Culinaire d'Exception",
    badge: "-80% de Réduction Immédiate",
    image: "/assets/aistudio/IMG-20260807-WA0001_87ce40ff.jpg",
    link: "https://kgmservice.mychariow.com/recette-africaines",
    highlights: [
      "150+ Recettes traditionnelles béninoises & africaines authentiques",
      "Techniques de cuisson pas-à-pas illustrées et vidéos explicatives",
      "Ingrédients locaux faciles à trouver sur les marchés",
      "Guide complet du débutant au professionnel de la restauration",
      "Paiements 100% sécurisés : MTN Moov Orange Airtel Wave & Visa"
    ]
  }
};

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "vitrine",
    name: "Site Internet Vitrine",
    price: "50 000 FCFA",
    priceNote: "Pack clé en main pour entreprises",
    description: "Idéal pour les entreprises, PME, prestataires et artisans qui souhaitent établir une présence en ligne crédible et capter de nouveaux clients.",
    delay: "Livraison en 3 à 5 jours",
    popular: false,
    hosting: "Nom de domaine dédié & certificat SSL sécurisé inclus",
    features: [
      "Hébergement dédié haute performance avec panneau de gestion remis au client",
      "Design moderne, sur-mesure & 100% responsive (mobile Android, tablette, PC)",
      "Jusqu'à 5 pages professionnelles (Accueil, Services, À Propos, Portfolio, Contact)",
      "Boutons d'appel direct & formulaire relié à WhatsApp et Email",
      "Intégration Google Maps pour localiser votre établissement",
      "Optimisation SEO pour être trouvé sur Google",
      "Certificat de sécurité SSL et adresses emails professionnelles",
      "Support & accompagnement personnalisé à la prise en main"
    ],
    whatsappMessage: "Bonjour Africa Web, je souhaite commander la création d'un Site Internet Vitrine à 50 000 FCFA."
  },
  {
    id: "ecommerce",
    name: "Boutique E-commerce & Marketplace",
    price: "100 000 FCFA",
    priceNote: "Tarif à débattre selon le catalogue",
    description: "Conçu pour les commerçants, créateurs de mode, cosmétique et revendeurs souhaitant vendre 24h/24 en Afrique et à l'international.",
    delay: "Livraison en 5 à 7 jours",
    popular: true,
    hosting: "Boutique Shopify ou Cloud e-commerce optimisé",
    features: [
      "Boutique Shopify ou plateforme e-commerce optimisée haute vitesse",
      "Intégration Mobile Money (MTN, Moov, Orange, Wave) & Cartes bancaires",
      "Catalogue produits illimité avec gestion facile des variantes et stocks",
      "Panier d'achat fluide et calcul automatique des frais de livraison",
      "Système de commande directe par WhatsApp pour les clients locaux",
      "Tableau de bord de suivi des ventes et des clients",
      "Session de formation vidéo offerte pour gérer votre boutique en toute autonomie"
    ],
    whatsappMessage: "Bonjour Africa Web, je souhaite échanger au sujet de la création d'une Boutique E-commerce / Marketplace à 100 000 FCFA (à débattre)."
  },
  {
    id: "webinaire",
    name: "Plateforme Webinaire & Formations",
    price: "250 000 FCFA",
    priceNote: "Solution complète avec hébergement",
    description: "Solution complète pour coachs, formateurs, conférenciers et créateurs qui veulent héberger leurs cours et automatiser leurs ventes.",
    delay: "Livraison en 7 à 10 jours",
    popular: false,
    hosting: "Infrastructure Cloud Dédiée avec streaming vidéo sécurisé",
    features: [
      "Plateforme webinaire & académie en ligne (type Système.io / espace dédié)",
      "Streaming vidéo sécurisé et bande passante fluide sans ralentissement",
      "Espace membres privé sécurisé avec accès automatique par mot de passe",
      "Tunnels de vente complets : page de capture, bon de commande, page de remerciement",
      "Configuration de webinaires automatisés (Evergreen) ou en direct",
      "Intégration des paiements automatisés et délivrance instantanée des accès",
      "Accompagnement stratégique VIP pour maximiser vos inscriptions"
    ],
    whatsappMessage: "Bonjour Africa Web, je souhaite commander la Plateforme Webinaire & Formations à 250 000 FCFA."
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: "afribaba-trade",
    title: "AfriBABA Global B2B Marketplace",
    category: "ecommerce",
    categoryLabel: "Marketplace B2B & Grossistes (Inspiré d'Alibaba)",
    client: "AfriBABA Group Panafricain",
    domain: "www.afribaba-trade.com",
    domainBadge: "B2B Gold Supplier",
    outcome: "140 000+ commandes de gros traitées · 18 pays connectés",
    description: "Grande plateforme de négoce et de gros inspirée d'Alibaba : annuaire d'usines et grossistes certifiés, demandes de cotation (RFQ), commandes groupées avec prix dégressifs et protection acheteurs.",
    technologies: ["Marketplace B2B", "Catalogue Grossistes", "Demandes RFQ", "Paiement Sécurisé"],
    hosting: "Serveur Cloud Multi-Régions Haute Capacité",
    layoutFormat: "alibaba-b2b",
    heroSlogan: "Le premier hub de commerce de gros et d'approvisionnement en Afrique",
    accentColorName: "Orange Alibaba & Or Industriel",
    colorTheme: {
      primary: "#ff6000",
      primaryDark: "#e05300",
      accent: "#f59e0b",
      lightBg: "#f5f5f7",
      border: "#fed7aa",
      badgeBg: "#fff7ed",
      badgeText: "#c2410c"
    }
  },
  {
    id: "payafrik-gateway",
    title: "PayAfrik Payment Gateway & Checkout",
    category: "vitrine",
    categoryLabel: "Passerelle Fintech & API (Inspiré de CinetPay)",
    client: "PayAfrik Technologies S.A.",
    domain: "payafrik.io",
    domainBadge: "API Uptime 99.99%",
    outcome: "+4.8 Millions de transactions Mobile Money traitées sans faille",
    description: "Infrastructure fintech moderne inspirée de CinetPay : simulateur de checkout Mobile Money (MTN, Moov, Orange, Wave, Visa), documentation SDK développeurs, tableau de bord marchand et webhooks en direct.",
    technologies: ["Passerelle API", "Mobile Money SDK", "Chiffrement PCI-DSS", "Webhooks"],
    hosting: "Architecture Fintech Sécurisée & Redondante",
    layoutFormat: "cinetpay-fintech",
    heroSlogan: "L'infrastructure de paiement unifiée pour toute l'Afrique",
    accentColorName: "Bleu Nuit Fintech & Cyan Électrique",
    colorTheme: {
      primary: "#00d2ff",
      primaryDark: "#070f26",
      accent: "#10b981",
      lightBg: "#0b193d",
      border: "#1e3a8a",
      badgeBg: "#0f275c",
      badgeText: "#38bdf8"
    }
  },
  {
    id: "africonnect-social",
    title: "AfriConnect Social & Hub Communautaire",
    category: "webinaire",
    categoryLabel: "Réseau Social & Communauté (Inspiré de Facebook)",
    client: "AfriConnect Media Network",
    domain: "m.africonnect.net",
    domainBadge: "Communauté Vérifiée",
    outcome: "350 000+ membres actifs et 12 000 groupes professionnels",
    description: "Plateforme communautaire inspirée de Facebook : fil d'actualités temps réel, stories vidéo, boîte de publication interactive, modules de réactions et partages, groupes sectoriels et profils vérifiés.",
    technologies: ["Fil d'actualité temps réel", "Stories Vidéo", "Espaces Communautaires", "Messagerie"],
    hosting: "Plateforme Sociale Haute Scalabilité",
    layoutFormat: "facebook-social",
    heroSlogan: "Connectez-vous aux opportunités, talents et leaders du continent",
    accentColorName: "Bleu Royal Facebook & Blanc Épuré",
    colorTheme: {
      primary: "#1877f2",
      primaryDark: "#0d65d9",
      accent: "#42b72a",
      lightBg: "#f0f2f5",
      border: "#cbd5e1",
      badgeBg: "#e7f3ff",
      badgeText: "#1877f2"
    }
  },
  {
    id: "superdeal-express",
    title: "SuperDeal Africa Mega Store",
    category: "ecommerce",
    categoryLabel: "Grand Magasin E-commerce (Inspiré d'Amazon & Jumia)",
    client: "SuperDeal Logistics Africa",
    domain: "superdeal.africa",
    domainBadge: "Livraison 24h Express",
    outcome: "Plus de 18 000 références livrées avec succès à domicile",
    description: "Grand magasin de vente au détail inspiré d'Amazon et Jumia : ventes flash chronométrées, avis et notations clients 5 étoiles, panier d'achat persistant et système de livraison express en Afrique de l'Ouest.",
    technologies: ["Catalogue Mega-Store", "Ventes Flash", "Calculateur d'expédition", "Mobile Money"],
    hosting: "Cloud E-commerce Haute Disponibilité",
    layoutFormat: "amazon-jumia",
    heroSlogan: "Des millions de produits au meilleur prix avec livraison express",
    accentColorName: "Noir Amazon & Ambre Vente Flash",
    colorTheme: {
      primary: "#131921",
      primaryDark: "#0f1111",
      accent: "#f68b1e",
      lightBg: "#ffffff",
      border: "#e2e8f0",
      badgeBg: "#fef3c7",
      badgeText: "#b45309"
    }
  },
  {
    id: "recettes-guide",
    title: "Le Guide Ultime des 150+ Recettes Béninoises & Africaines",
    category: "ecommerce",
    categoryLabel: "Page de Vente & Tunnel Culinaire (Produit Vedette)",
    client: "KGM Services Culinaire",
    image: "/assets/aistudio/IMG-20260807-WA0001_87ce40ff.jpg",
    domain: "kgmservice.mychariow.com/recette-africaines",
    domainBadge: "Page Officielle Auteur",
    externalLink: "https://kgmservice.mychariow.com/recette-africaines",
    outcome: "+2 400 exemplaires vendus · Taux de conversion de 8.4%",
    description: "Page de vente à fort taux de conversion aux couleurs épicées et chaleureuses de la gastronomie africaine : présentation 3D du livre, réduction immédiate de -80%, preuve sociale et encaissement sécurisé Mobile Money et Visa.",
    technologies: ["Tunnel de Vente", "Chariow Checkout", "Paiements Sécurisés", "Mobile Money"],
    hosting: "Page de Vente Haute Conversion Sécurisée",
    layoutFormat: "culinary-funnel",
    heroSlogan: "La richesse culinaire africaine à portée de clic",
    accentColorName: "Rouge Épices & Ambre Terroir",
    colorTheme: {
      primary: "#b91c1c",
      primaryDark: "#7f1d1d",
      accent: "#f59e0b",
      lightBg: "#fffbeb",
      border: "#fde68a",
      badgeBg: "#fef3c7",
      badgeText: "#991b1b"
    }
  },
  {
    id: "afrikbat-corporate",
    title: "Cabinet AfrikBât Ingénierie & BTP",
    category: "vitrine",
    categoryLabel: "Site Vitrine Corporate BTP & Architecture",
    client: "Cabinet AfrikBât S.A.R.L - Cotonou",
    domain: "cabinet-afrikbat.com",
    domainBadge: "Certifié Ordre BTP",
    outcome: "+180% de consultations et demandes de chantiers en 60 jours",
    description: "Format corporate architectural aux tons bleu acier et anthracite : portfolio de chantiers en haute résolution, spécifications de plans d'ingénierie et formulaire de demande de devis express.",
    technologies: ["Design Institutionnel", "Portfolio Chantiers", "Plans d'ingénierie", "Formulaire Devis"],
    hosting: "Portail Institutionnel avec Nom de Domaine .com",
    layoutFormat: "blueprint-corporate",
    heroSlogan: "Bâtir l'Afrique moderne avec rigueur, innovation et excellence",
    accentColorName: "Bleu Acier & Anthracite Métallique",
    colorTheme: {
      primary: "#0f172a",
      primaryDark: "#020617",
      accent: "#0284c7",
      lightBg: "#f8fafc",
      border: "#cbd5e1",
      badgeBg: "#e0f2fe",
      badgeText: "#0369a1"
    }
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    author: "M. Kodjo Lawson",
    role: "Directeur Général",
    company: "Cabinet Bâtisseurs d'Avenir",
    location: "Cotonou, Bénin",
    content: "Africa Web a configuré notre site vitrine professionnel avec notre nom de domaine, nos emails d'entreprise et un rendu digne des grands cabinets internationaux !",
    rating: 5,
    projectType: "Site Internet Vitrine Entreprise"
  },
  {
    id: "test-2",
    author: "Mme Aminata Diallo",
    role: "Fondatrice",
    company: "AfroChic Boutique",
    location: "Abidjan, Côte d'Ivoire",
    content: "L'équipe a conçu notre boutique en ligne avec les paiements Orange Money, Wave et MTN. Le design est ultra moderne et les pages se chargent en un éclair sur les téléphones de nos clientes.",
    rating: 5,
    projectType: "Boutique E-commerce & Marketplace"
  },
  {
    id: "test-3",
    author: "Dr. Eric Dossou",
    role: "Conférencier & Formateur",
    company: "Afrique Emergence",
    location: "Porto-Novo, Bénin",
    content: "La plateforme webinaire à 250 000 F m'a permis d'automatiser entièrement mes formations. Mes 600 élèves suivent leurs cours en vidéo sans aucun temps de chargement.",
    rating: 5,
    projectType: "Plateforme Webinaire & Cours"
  },
  {
    id: "test-4",
    author: "Sèna Agboton",
    role: "Auteure & Créatrice",
    company: "KGM Saveurs",
    location: "Cotonou / Diaspora",
    content: "Notre guide des 150+ recettes béninoises est devenu un best-seller grâce à la page de vente créée par Africa Web. Le design donne confiance et les paiements Mobile Money et Visa fonctionnent sans accroc.",
    rating: 5,
    projectType: "Tunnel Produit Numérique"
  }
];

export function getWhatsAppUrl(customText?: string, phoneNumber?: string): string {
  const defaultText = "Bonjour Africa Web, je visite votre site internet et je souhaite des informations pour créer mon projet web.";
  const text = encodeURIComponent(customText || defaultText);
  let rawPhone = phoneNumber;
  if (!rawPhone && typeof window !== 'undefined') {
    try {
      const savedInfo = localStorage.getItem('africa_web_cms_info');
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        if (parsed?.whatsappNumber) rawPhone = parsed.whatsappNumber;
      }
    } catch {
      // fallback
    }
  }
  const cleanNumber = (rawPhone || AGENCY_INFO.whatsappNumber).replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${text}`;
}
