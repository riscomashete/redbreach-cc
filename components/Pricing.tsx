import React, { useState } from 'react';
import { SectionId } from '../types';
import { Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

type Currency = 'N$' | 'USD';
type Tab = 'cyber' | 'webdev' | 'addons';

const CONVERSION_RATE = 0.056;

export const Pricing: React.FC = () => {
  const { content } = useContent();
  const { pricing } = content;
  
  const [currency, setCurrency] = useState<Currency>('N$');
  const [activeTab, setActiveTab] = useState<Tab>('cyber');

  const formatPrice = (nad: number, from?: boolean) => {
    let priceString = '';
    if (currency === 'N$') {
      priceString = `N$${nad.toLocaleString()}`;
    } else {
      priceString = `$${(nad * CONVERSION_RATE).toFixed(2)}`;
    }
    
    // Check if it's a one-time service (Add-ons usually are) or monthly
    const isMonthly = activeTab !== 'addons';
    
    if (from) return `From ${priceString}`;
    return isMonthly ? `${priceString} / mo` : priceString;
  };

  const currentPlans = activeTab === 'cyber' ? pricing.cyberPlans : activeTab === 'webdev' ? pricing.webPlans : pricing.addonPlans;

  return (
    <section id={SectionId.PRICING} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl font-bold text-brand-dark mb-4">{pricing.title}</h2>
        <p className="text-gray-500 text-lg mb-8">{pricing.subtitle}</p>

        {/* Currency Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              onClick={() => setCurrency('N$')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                currency === 'N$' ? 'bg-brand-red text-white shadow-md' : 'text-gray-600 hover:text-brand-dark'
              }`}
            >
              NAD
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                currency === 'USD' ? 'bg-brand-red text-white shadow-md' : 'text-gray-600 hover:text-brand-dark'
              }`}
            >
              USD
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'cyber', label: 'Cybersecurity' },
            { id: 'webdev', label: 'Web Development' },
            { id: 'addons', label: 'Add-ons' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-dark text-white shadow-lg transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentPlans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col ${
                plan.isHighlight 
                  ? 'border-brand-red shadow-xl scale-105 z-10' 
                  : 'border-gray-200 shadow-lg hover:-translate-y-2'
              }`}
            >
              {plan.isHighlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-brand-dark mb-2">{plan.name}</h3>
              <div className="text-2xl font-bold text-brand-red mb-6">
                {formatPrice(plan.nadPrice, plan.from)}
              </div>
              
              <ul className="space-y-4 mb-8 text-left flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-sm text-gray-600">
                    <Check className="h-5 w-5 text-brand-red mr-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full font-bold transition-colors ${
                plan.isHighlight
                  ? 'bg-brand-red text-white hover:bg-[#c5303f]'
                  : 'bg-brand-dark text-white hover:bg-gray-800'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};