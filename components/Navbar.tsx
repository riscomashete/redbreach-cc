import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  activeSection: SectionId;
  scrollToSection: (id: SectionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { content } = useContent();

  return (
    <nav className="sticky top-0 w-full z-50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="cursor-pointer group"
          onClick={() => scrollToSection(SectionId.HOME)}
        >
          <Logo className="h-12 md:h-14 w-auto" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-8">
          {content.navbar.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-base font-semibold transition-colors duration-300 ${
                activeSection === item.id 
                  ? 'text-brand-red' 
                  : 'text-brand-dark hover:text-brand-red'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-dark hover:text-brand-red transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <div className="space-y-1.5 w-6">
              <span className="block w-full h-0.5 bg-brand-red"></span>
              <span className="block w-full h-0.5 bg-brand-red"></span>
              <span className="block w-full h-0.5 bg-brand-red"></span>
            </div>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 animate-in slide-in-from-top-2 h-screen">
          <div className="flex flex-col space-y-6 mt-4">
            {content.navbar.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-xl font-semibold py-2 ${
                  activeSection === item.id
                    ? 'text-brand-red'
                    : 'text-brand-dark'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};