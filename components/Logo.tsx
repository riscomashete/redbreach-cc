import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", showTagline = false }) => {
  return (
    <div className="flex flex-col">
      <div className={`flex items-center gap-3 select-none`}>
        {/* Custom SVG Logo Icon */}
        <svg 
          viewBox="0 0 100 120" 
          className={className} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-label="RedBreach Logo Shield"
        >
          {/* Shield Outline */}
          <path d="M50 5 C15 15 5 35 5 60 C5 90 50 115 50 115 C50 115 95 90 95 60 C95 35 85 15 50 5 Z" fill="white" stroke="#000000" strokeWidth="3"/>
          
          {/* Bug Legs - Behind Body */}
          <path d="M25 45 L10 35 M75 45 L90 35 M25 65 L10 65 M75 65 L90 65 M25 85 L15 95 M75 85 L85 95" stroke="#ff0000" strokeWidth="5" strokeLinecap="round"/>

          {/* Bug Head */}
          <path d="M35 35 L40 20 L50 25 L60 20 L65 35 Z" fill="#222222" />
          {/* Antennae */}
          <path d="M40 20 L30 10 M60 20 L70 10" stroke="#222222" strokeWidth="4" strokeLinecap="round"/>

          {/* Bug Body (Split Shell) */}
          <path d="M48 35 H25 C20 35 18 50 18 65 C18 85 30 95 48 95 V35 Z" fill="#ff0000" />
          <path d="M52 35 H75 C80 35 82 50 82 65 C82 85 70 95 52 95 V35 Z" fill="#ff0000" />

          {/* Code Brackets */}
          <text x="33" y="75" fontSize="30" fontFamily="monospace" fontWeight="bold" fill="#000000" textAnchor="middle">&lt;</text>
          <text x="67" y="75" fontSize="30" fontFamily="monospace" fontWeight="bold" fill="#000000" textAnchor="middle">&gt;</text>
        </svg>

        {/* Text Logo */}
        <div className="flex flex-col justify-center leading-none">
          <div className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            <span className="text-[#000000]">Red</span>
            <span className="text-[#ff0000]">Breach</span>
          </div>
        </div>
      </div>
      
      {showTagline && (
        <div className="mt-1 text-xs md:text-sm font-serif italic text-brand-dark tracking-wide">
          &lt; building and securing the digital future &gt;
        </div>
      )}
    </div>
  );
};