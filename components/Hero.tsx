import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { useContent } from '../context/ContentContext';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section 
      id={SectionId.HOME} 
      className="relative min-h-[90vh] flex items-center justify-center text-center px-6 bg-gradient-to-br from-brand-red via-[#ff4d4d] to-[#ff6b6b]"
    >
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight whitespace-pre-wrap">
          {hero.title}
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
          {hero.subtitle}
        </p>

        <div className="pt-4">
          <button
            onClick={() => scrollToSection(SectionId.CONTACT)}
            className="inline-flex items-center px-10 py-4 bg-white text-brand-red text-lg font-bold rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            {hero.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Decorative Wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-brand-light"></path>
        </svg>
      </div>
    </section>
  );
};