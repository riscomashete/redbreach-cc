import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, SectionId } from '../types';

const defaultContent: SiteContent = {
  navbar: [
    { label: 'Home', id: SectionId.HOME },
    { label: 'Pricing', id: SectionId.PRICING },
    { label: 'Services', id: SectionId.SERVICES },
    { label: 'Contact', id: SectionId.CONTACT },
  ],
  hero: {
    title: "Cybersecurity & Web Solutions",
    subtitle: "Secure your business, enhance your web presence, and grow with confidence using our neural-augmented offensive security strategies.",
    ctaText: "Contact Us"
  },
  services: {
    title: "Our Services",
    subtitle: "Solutions tailored to your business needs",
    items: [
      {
        id: 'cyber',
        title: "Cybersecurity",
        description: "Scans, audits, penetration testing, and comprehensive security solutions for your business.",
        iconName: 'ShieldCheck'
      },
      {
        id: 'web',
        title: "Web Development",
        description: "Custom websites, maintenance, performance optimization, and secure development practices.",
        iconName: 'Code2'
      },
      {
        id: 'addons',
        title: "Add-ons & Integrations",
        description: "E-commerce setup, landing pages, CMS integrations, and performance & security enhancements.",
        iconName: 'Puzzle'
      }
    ]
  },
  pricing: {
    title: "Our Pricing Plans",
    subtitle: "Choose the package that fits your business best",
    cyberPlans: [
      { name: 'Starter', nadPrice: 500, features: ['1 Scan + Basic Report', 'Email Support'], cta: 'Get Started' },
      { name: 'Pro', nadPrice: 1500, features: ['Monthly Pentest', 'Risk Dashboard', '1 Coaching Call'], isHighlight: true, cta: 'Subscribe' },
      { name: 'Elite', nadPrice: 4000, features: ['Full Security Audit', 'Team Training', 'Incident Response Hotline'], cta: 'Subscribe' },
      { name: 'Custom', nadPrice: 8000, features: ['Tailored Solutions', 'Banks, Schools, NGOs', 'Custom Security Strategy'], cta: 'Request Quote', from: true },
    ],
    webPlans: [
      { name: 'Code Care', nadPrice: 600, features: ['Maintenance & Updates', 'Bug Fixes', 'Backups'], cta: 'Get Started' },
      { name: 'Dev Boost', nadPrice: 1500, features: ['Code Improvements', 'SEO Tweaks', 'Performance Tuning'], isHighlight: true, cta: 'Subscribe' },
      { name: 'Secure Dev Pro', nadPrice: 3000, features: ['Full Maintenance', 'Quarterly Security Audit', 'Custom Features'], cta: 'Subscribe' },
      { name: 'Custom Build', nadPrice: 7500, features: ['Tailored Website', 'HTML/CSS/JS/PHP', 'Built to Client Needs'], cta: 'Request Quote', from: true },
    ],
    addonPlans: [
      { name: 'Landing Page', nadPrice: 2500, features: ['Custom-coded design', 'Responsive layout', 'Conversion focused'], cta: 'Order Now' },
      { name: 'E-commerce', nadPrice: 5000, features: ['Shopping cart', 'Payment gateway setup', 'Product catalog'], isHighlight: true, cta: 'Get Quote', from: true },
      { name: 'Security Hardening', nadPrice: 2000, features: ['Patch vulnerabilities', 'Configure firewall', 'Strengthen authentication'], cta: 'Secure My Site' },
      { name: 'Speed Optimization', nadPrice: 1200, features: ['Faster load times', 'Image optimization', 'Better performance score'], cta: 'Boost Speed' },
    ]
  },
  contact: {
    title: "Contact Us",
    subtitle: "Send us a message and we will get back to you.",
    email: "contact@redbreach.com"
  },
  footer: {
    copyrightText: "RedBreach. All rights reserved.",
    tagline: "Elite offensive security operations and neural-augmented web development."
  }
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('redbreach_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure merged with default to pick up new structure fields (like Hero) if missing in LS
        setContent({ ...defaultContent, ...parsed });
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('redbreach_content', JSON.stringify(content));
    }
  }, [content, isLoaded]);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('redbreach_content');
  };

  if (!isLoaded) return null;

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};