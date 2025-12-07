import React from 'react';
import { SectionId } from '../types';
import { Target, Zap, Shield } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 bg-gradient-to-b from-black to-cyber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Born in the <br />
              <span className="text-cyber-accent">Adversary's Shadow.</span>
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                RedBreach was founded on a singular premise: you cannot defend what you do not know how to destroy. We are a collective of former black-hat researchers and intelligence operatives turned defenders.
              </p>
              <p>
                We bridge the gap between offensive operations and modern engineering. By utilizing advanced <strong>Neural-Augmented Development</strong> workflows, we build web applications that are not just fast, but inherently hostile to unauthorized access.
              </p>
              <p>
                Our "Generative Engineering" approach allows us to simulate thousands of attack vectors during the development phase, ensuring your digital assets are battle-tested before they ever go live.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-black rounded-lg border border-cyber-700">
                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                <div className="text-xs text-cyber-accent font-mono">Exploits Mitigated</div>
              </div>
              <div className="text-center p-4 bg-black rounded-lg border border-cyber-700">
                <div className="text-2xl font-bold text-white mb-1">10x</div>
                <div className="text-xs text-cyber-accent font-mono">Faster Deployment</div>
              </div>
              <div className="text-center p-4 bg-black rounded-lg border border-cyber-700">
                <div className="text-2xl font-bold text-white mb-1">Zero</div>
                <div className="text-xs text-cyber-accent font-mono">Breaches Post-Launch</div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 space-y-6">
            <div className="group flex items-start p-6 bg-cyber-800 rounded-xl border border-cyber-700 hover:border-cyber-accent/50 transition-colors">
              <Target className="w-10 h-10 text-cyber-accent shrink-0 mr-4" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Offensive Mindset</h3>
                <p className="text-sm text-gray-400">We operate with the creativity and aggression of a threat actor, ensuring we find the weak points before they do.</p>
              </div>
            </div>

            <div className="group flex items-start p-6 bg-cyber-800 rounded-xl border border-cyber-700 hover:border-cyber-accent/50 transition-colors">
              <Zap className="w-10 h-10 text-white shrink-0 mr-4" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Neural Velocity</h3>
                <p className="text-sm text-gray-400">Our proprietary AI-driven development stack reduces build times while increasing security coverage.</p>
              </div>
            </div>

            <div className="group flex items-start p-6 bg-cyber-800 rounded-xl border border-cyber-700 hover:border-cyber-accent/50 transition-colors">
              <Shield className="w-10 h-10 text-cyber-accent shrink-0 mr-4" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Resilience First</h3>
                <p className="text-sm text-gray-400">We don't sell "safe". We sell "hardened". Our goal is to make attacking you cost-prohibitive.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};