import React, { useState } from 'react';
import { AgencyProvider, useAgency } from './context/AgencyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoPresentation } from './components/VideoPresentation';
import { FeaturedProduct } from './components/FeaturedProduct';
import { PricingSection } from './components/PricingSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutTeamSection } from './components/AboutTeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProjectModal } from './components/ProjectModal';
import { LiveSiteSimulator } from './components/LiveSiteSimulator';
import { OwnerLoginModal } from './components/OwnerLoginModal';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { ProjectItem, PricingPackage } from './data/agencyData';
import { LogOut } from 'lucide-react';

function MainContent() {
  const { isOwnerLoggedIn, logoutOwner, siteColors, siteTypography } = useAgency();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [simulatorProject, setSimulatorProject] = useState<ProjectItem | null>(null);
  const [selectedPlanForContact, setSelectedPlanForContact] = useState<string>('vitrine');

  // Modals for Owner
  const [isOwnerLoginOpen, setIsOwnerLoginOpen] = useState(false);
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState(false);

  const scrollToContact = (planId?: string) => {
    if (planId) {
      setSelectedPlanForContact(planId);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricing = () => {
    const element = document.getElementById('tarifs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: PricingPackage) => {
    scrollToContact(pkg.id);
  };

  return (
    <div
      style={{
        backgroundColor: siteColors.bgColor,
        color: siteColors.textColor,
        fontFamily: siteTypography.fontFamily,
        fontSize: `${siteTypography.fontSize}px`,
        fontWeight: siteTypography.fontWeight
      }}
      className="min-h-screen flex flex-col leading-relaxed selection:bg-[#073587] selection:text-white"
    >
      {/* Navigation */}
      <Navbar
        onOpenContact={() => scrollToContact()}
        onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
        onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onExplorePricing={scrollToPricing}
          onOpenContact={(planId) => scrollToContact(planId)}
        />

        {/* Video Presentation Section (Customizable by Owner) */}
        <VideoPresentation
          onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
          onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
        />

        {/* Featured Product Section (Image 2 with direct sales page redirect) */}
        <FeaturedProduct />

        {/* Services & Official Pricing Section (50 000 F / 100 000 F / 250 000 F) */}
        <PricingSection onSelectPackage={handleSelectPackage} />

        {/* Realizations & Live Portfolio Showcase with Interactive Simulator */}
        <PortfolioSection
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenSimulator={(project) => setSimulatorProject(project)}
        />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* About & Responsable Section (Image 3) */}
        <AboutTeamSection onOpenContact={() => scrollToContact()} />

        {/* Professional Contact & Quote Form */}
        <ContactSection initialPlan={selectedPlanForContact} />
      </main>

      {/* Footer with Owner Account Access */}
      <Footer
        onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
        onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
      />

      {/* Floating WhatsApp Action Button (Always reachable on Android) */}
      <FloatingWhatsApp />

      {/* Floating Owner Dashboard Access Button (Always reachable on Android & PC) */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2">
        {isOwnerLoggedIn ? (
          <>
            <button
              onClick={() => setIsOwnerDashboardOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#05235c] hover:bg-[#073587] text-white text-xs font-black shadow-xl border-2 border-amber-400 hover:scale-105 transition-all cursor-pointer group"
              title="Ouvrir le Panneau de Contrôle Propriétaire"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-300">Tableau de Bord</span>
              <span className="hidden sm:inline text-white/80 font-bold text-[11px]">· Espace Propriétaire</span>
            </button>
            <button
              onClick={logoutOwner}
              className="p-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl border-2 border-red-400 hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
              title="Se déconnecter de mon espace propriétaire"
              aria-label="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsOwnerLoginOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold shadow-lg border border-slate-700 hover:scale-105 transition-all cursor-pointer backdrop-blur-xs opacity-90 hover:opacity-100"
            title="Accès Propriétaire (Connexion)"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-slate-200">Accès Propriétaire</span>
          </button>
        )}
      </div>

      {/* Project Case Study Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOrderSimilar={(title) => {
          setSelectedProject(null);
          scrollToContact();
        }}
      />

      {/* Interactive Real Site Live Simulator (Desktop & Android Device Mockup) */}
      {simulatorProject && (
        <LiveSiteSimulator
          project={simulatorProject}
          onClose={() => setSimulatorProject(null)}
        />
      )}

      {/* Owner Login Modal (Email: kgmservices229@gmail.com / Pass: Samuell@8) */}
      <OwnerLoginModal
        isOpen={isOwnerLoginOpen}
        onClose={() => setIsOwnerLoginOpen(false)}
        onSuccess={() => setIsOwnerDashboardOpen(true)}
      />

      {/* Owner Admin Dashboard (Analytics, Media Uploads, Real Sites CMS, Settings) */}
      <OwnerDashboardModal
        isOpen={isOwnerDashboardOpen}
        onClose={() => setIsOwnerDashboardOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AgencyProvider>
      <MainContent />
    </AgencyProvider>
  );
}
