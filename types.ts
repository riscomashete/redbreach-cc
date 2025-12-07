import { ReactNode } from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Changed from icon: ReactNode to string for serialization
}

export interface Plan {
  name: string;
  nadPrice: number;
  features: string[];
  isHighlight?: boolean;
  cta: string;
  from?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HOME = 'home',
  PRICING = 'pricing',
  SERVICES = 'services',
  ABOUT = 'about',
  CONTACT = 'contact',
}

export interface NavItem {
  label: string;
  id: SectionId;
}

export interface SiteContent {
  navbar: NavItem[];
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  pricing: {
    title: string;
    subtitle: string;
    cyberPlans: Plan[];
    webPlans: Plan[];
    addonPlans: Plan[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
  };
  footer: {
    copyrightText: string;
    tagline: string;
  };
}