import React, { useState } from 'react';
import { SectionId } from '../types';
import { Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Contact: React.FC = () => {
  const { content } = useContent();
  const { contact } = content;
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent to ${contact.email}! (Simulation)`);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-white relative">
      <div className="max-w-2xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-brand-red mb-4">{contact.title}</h2>
        <p className="text-gray-600 mb-12">{contact.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <input
              type="text"
              required
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
            />
          </div>
          <div>
            <input
              type="email"
              required
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
            />
          </div>
          <div>
            <textarea
              rows={5}
              required
              placeholder="Your Message"
              value={formState.message}
              onChange={(e) => setFormState({...formState, message: e.target.value})}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-brand-red text-white font-bold rounded-full hover:bg-[#c5303f] transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
};