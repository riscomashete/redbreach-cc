import React from 'react';
import { ShieldCheck, Code2, Puzzle, ArrowRight, Shield, Zap, Layout } from 'lucide-react';
import { SectionId } from '../types';
import { useContent } from '../context/ContentContext';

interface ServicesProps {
  onPricingClick?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'ShieldCheck': <ShieldCheck className="h-12 w-12 text-brand-blue" />,
  'Code2': <Code2 className="h-12 w-12 text-brand-green" />,
  'Puzzle': <Puzzle className="h-12 w-12 text-brand-orange" />,
  'Shield': <Shield className="h-12 w-12 text-brand-red" />,
  'Zap': <Zap className="h-12 w-12 text-yellow-500" />,
  'Layout': <Layout className="h-12 w-12 text-purple-500" />,
};

// Helper colors for default map fallback logic
const getColor = (iconName: string) => {
  switch(iconName) {
    case 'ShieldCheck': return 'bg-brand-blue/10 text-brand-blue';
    case 'Code2': return 'bg-brand-green/10 text-brand-green';
    case 'Puzzle': return 'bg-brand-orange/10 text-brand-orange';
    case 'Shield': return 'bg-brand-red/10 text-brand-red';
    case 'Zap': return 'bg-yellow-100 text-yellow-600';
    case 'Layout': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export const Services: React.FC<ServicesProps> = ({ onPricingClick }) => {
  const { content } = useContent();
  const { services } = content;

  return (
    <section id={SectionId.SERVICES} className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-red mb-4">{services.title}</h2>
          <p className="text-gray-600 text-lg">{services.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.items.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className={`mb-6 p-4 rounded-full ${getColor(service.iconName)}`}>
                {iconMap[service.iconName] || <ShieldCheck className="h-12 w-12" />}
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
           <button 
             onClick={onPricingClick}
             className="inline-flex items-center px-8 py-3 bg-brand-red text-white font-bold rounded-full hover:bg-[#c5303f] transition-all hover:scale-105"
           >
             View Pricing <ArrowRight className="ml-2 h-4 w-4" />
           </button>
        </div>

      </div>
    </section>
  );
};