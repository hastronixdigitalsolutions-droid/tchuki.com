import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

import { HeroSection } from './components/home/HeroSection';
import { EcosystemSection } from './components/home/EcosystemSection';
import { BusinessesSection } from './components/home/BusinessesSection';
import { ServicesSection } from './components/home/ServicesSection';
import { ProductShowcase } from './components/home/ProductShowcase';
import { ProjectsSection } from './components/home/ProjectsSection';
import { GlanceStatsSection } from './components/home/GlanceStatsSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { ArticlesSection } from './components/home/ArticlesSection';
import { PartnershipCTA } from './components/home/PartnershipCTA';

import { AboutPage } from './components/pages/AboutPage';
import { BusinessesPage } from './components/pages/BusinessesPage';
import { BusinessDetailPage } from './components/pages/BusinessDetailPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { InsightsPage } from './components/pages/InsightsPage';
import { ContactPage } from './components/pages/ContactPage';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

function MainApp() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [detailSlug, setDetailSlug] = useState<string>('tchuki-farms');
  const { isAuthenticated } = useAuth();

  const handleNavigate = (view: string, slug?: string) => {
    if (slug) {
      setDetailSlug(slug);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on admin view
  if (currentView === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setCurrentView('admin')}
          onBackToPublic={() => setCurrentView('home')}
        />
      );
    }
    return <AdminLayout onBackToPublic={() => setCurrentView('home')} />;
  }

  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onSuccess={() => setCurrentView('admin')}
        onBackToPublic={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onScrollToSection={handleScrollToSection}
            />
            <EcosystemSection onNavigate={handleNavigate} />
            <BusinessesSection onNavigate={handleNavigate} />
            <ServicesSection onNavigate={handleNavigate} />
            <ProductShowcase onNavigate={handleNavigate} />
            <ProjectsSection onNavigate={handleNavigate} />
            <GlanceStatsSection />
            <TestimonialsSection />
            <ArticlesSection onNavigate={handleNavigate} />
            <PartnershipCTA onNavigate={handleNavigate} />
          </>
        )}

        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentView === 'businesses' && <BusinessesPage onNavigate={handleNavigate} />}

        {currentView === 'business-detail' && (
          <BusinessDetailPage
            businessSlug={detailSlug}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'services' && <ServicesPage onNavigate={handleNavigate} />}

        {currentView === 'projects' && <ProjectsPage onNavigate={handleNavigate} />}

        {currentView === 'insights' && (
          <InsightsPage initialSlug={detailSlug} onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Corporate Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Quick Contact Action */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <MainApp />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

