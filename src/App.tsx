import React, { useState } from 'react';
import { AgencyProvider, useAgency } from './context/AgencyContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VideoPresentation } from './components/VideoPresentation';
import { FeaturedProduct } from './components/FeaturedProduct';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutTeamSection } from './components/AboutTeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OwnerLoginModal } from './components/OwnerLoginModal';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { BusinessCardGeneratorModal } from './components/BusinessCardGeneratorModal';
import { PricingPackage } from './data/agencyData';

function MainContent() {
  const { isOwnerLoggedIn, logoutOwner, siteColors, siteTypography } = useAgency();
  const [selectedPlanForContact, setSelectedPlanForContact] = useState<string>('video-ia');

  // Modals for Owner & Business Card Generator
  const [isOwnerLoginOpen, setIsOwnerLoginOpen] = useState(false);
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState(false);
  const [isCardGeneratorOpen, setIsCardGeneratorOpen] = useState(false);

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
      className="min-h-screen flex flex-col leading-relaxed selection:bg-[#073587] selection:text-white w-full max-w-full overflow-x-hidden"
    >
      {/* Navigation (Single-line Main Header) */}
      <Navbar
        onOpenContact={() => scrollToContact()}
        onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
        onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
        onOpenBusinessCardGenerator={() => setIsCardGeneratorOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onExplorePricing={scrollToPricing}
          onOpenContact={(planId) => scrollToContact(planId)}
          onOpenBusinessCardGenerator={() => setIsCardGeneratorOpen(true)}
        />

        {/* Video Presentation Section (Customizable / Togglable by Owner) */}
        <VideoPresentation
          onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
          onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
        />

        {/* Featured Product Section (Guide Culinaire ou Produit Vedette) */}
        <FeaturedProduct />

        {/* Formations & Tarifs Section with Free Business Card Generator Button */}
        <PricingSection
          onSelectPackage={handleSelectPackage}
          onOpenBusinessCardGenerator={() => setIsCardGeneratorOpen(true)}
        />

        {/* Client Testimonials */}
        <TestimonialsSection />

        {/* About & Responsable Section */}
        <AboutTeamSection onOpenContact={() => scrollToContact()} />

        {/* Professional Contact & Inscription Form */}
        <ContactSection initialPlan={selectedPlanForContact} />
      </main>

      {/* Footer with Owner Account Access in the bottom corner */}
      <Footer
        onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
        onOpenOwnerDashboard={() => setIsOwnerDashboardOpen(true)}
        onOpenBusinessCardGenerator={() => setIsCardGeneratorOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Free Professional Business Card Generator Modal */}
      <BusinessCardGeneratorModal
        isOpen={isCardGeneratorOpen}
        onClose={() => setIsCardGeneratorOpen(false)}
      />

      {/* Owner Login Modal */}
      <OwnerLoginModal
        isOpen={isOwnerLoginOpen}
        onClose={() => setIsOwnerLoginOpen(false)}
        onSuccess={() => setIsOwnerDashboardOpen(true)}
      />

      {/* Owner Admin Dashboard */}
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
