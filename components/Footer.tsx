import React from 'react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';
import { Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const { content } = useContent();
  const { footer } = content;

  return (
    <footer className="bg-brand-dark text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <div className="mb-4 bg-white/5 inline-block p-4 rounded-xl backdrop-blur-sm border border-white/10">
             <Logo className="h-10 w-auto" showTagline={true} />
          </div>
          <p className="text-sm opacity-60 max-w-sm mb-6">
            {footer.tagline}
            <br />
            &copy; {new Date().getFullYear()} {footer.copyrightText}
          </p>
          
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-brand-red transition-colors"
            aria-label="Admin Access"
          >
            <Lock className="w-3 h-3" />
            Admin Access
          </button>
        </div>

        <div className="flex flex-col space-y-4">
           <h4 className="font-bold text-lg">Stay in the loop</h4>
           <div className="flex w-full max-w-md">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="flex-1 px-5 py-3 rounded-l-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-brand-red placeholder-gray-400"
             />
             <button className="px-6 py-3 bg-brand-red text-white font-bold rounded-r-lg hover:bg-[#c5303f] transition-colors border border-brand-red">
               Subscribe
             </button>
          </div>
        </div>

      </div>
    </footer>
  );
};