import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { SectionId } from './types';
import { ContentProvider } from './context/ContentContext';

function AppContent() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);
  const [currentView, setCurrentView] = useState<'home' | 'pricing' | 'admin'>('home');

  const handleNavigation = (id: SectionId) => {
    setActiveSection(id);
    
    if (id === SectionId.PRICING) {
      setCurrentView('pricing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') {
        setCurrentView('home');
        // Small delay to allow render before scrolling
        setTimeout(() => {
          scrollToElement(id);
        }, 50);
      } else {
        scrollToElement(id);
      }
    }
  };

  const scrollToElement = (id: SectionId) => {
    if (id === SectionId.HOME) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminAccess = useCallback(() => {
    // Prevent multiple prompts if already in admin
    if (currentView === 'admin') return;

    const code = prompt("Enter Admin Code:");
    if (code === "admin") { // Simple simulation auth
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (code) {
      alert("Access Denied");
    }
  }, [currentView]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Shift + A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        handleAdminAccess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdminAccess]);

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 text-brand-dark">
         {/* Simple Admin Nav */}
         <nav className="bg-brand-dark text-white p-4 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
            <span className="font-bold text-xl">RedBreach Admin</span>
            <button 
              onClick={() => setCurrentView('home')} 
              className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors"
            >
              Exit to Site
            </button>
         </nav>
         <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark selection:bg-brand-red selection:text-white flex flex-col">
      <Navbar activeSection={activeSection} scrollToSection={handleNavigation} />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero scrollToSection={handleNavigation} />
            <Services onPricingClick={() => handleNavigation(SectionId.PRICING)} />
            <Contact />
          </>
        ) : (
          <Pricing />
        )}
      </main>
      
      <Footer onAdminClick={handleAdminAccess} />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}