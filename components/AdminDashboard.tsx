import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { Plan } from '../types';

export const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState<'hero' | 'navbar' | 'services' | 'pricing' | 'contact' | 'footer'>('hero');
  
  // Initialize tempContent with a Deep Copy to avoid reference issues
  const [tempContent, setTempContent] = useState(JSON.parse(JSON.stringify(content)));
  const [message, setMessage] = useState('');

  // Re-sync if external content changes significantly (optional, but good for resets)
  useEffect(() => {
    setTempContent(JSON.parse(JSON.stringify(content)));
  }, [content]);

  const handleSave = () => {
    updateContent(tempContent);
    setMessage('Changes saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      resetContent();
      setMessage('Content reset to default.');
    }
  };

  // Helper to update nested state immutably
  const updateSection = (section: keyof typeof content, data: any) => {
    setTempContent((prev: any) => ({ ...prev, [section]: data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
             <button onClick={handleReset} className="flex items-center px-4 py-2 text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50">
                <RotateCcw className="w-4 h-4 mr-2" /> Reset Defaults
             </button>
             <button onClick={handleSave} className="flex items-center px-6 py-2 text-white bg-brand-red rounded-lg hover:bg-red-700 shadow-md">
                <Save className="w-4 h-4 mr-2" /> Save Changes
             </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 animate-in fade-in">
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex -mb-px">
              {['hero', 'navbar', 'services', 'pricing', 'contact', 'footer'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            
            {activeTab === 'hero' && (
              <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                    <textarea 
                      value={tempContent.hero.title}
                      onChange={(e) => updateSection('hero', {...tempContent.hero, title: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={2}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <textarea 
                      value={tempContent.hero.subtitle}
                      onChange={(e) => updateSection('hero', {...tempContent.hero, subtitle: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                    <input 
                      type="text" 
                      value={tempContent.hero.ctaText}
                      onChange={(e) => updateSection('hero', {...tempContent.hero, ctaText: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                 </div>
              </div>
            )}

            {activeTab === 'navbar' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Navigation Menu Items</h3>
                <div className="grid gap-4">
                  {tempContent.navbar.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const newNav = tempContent.navbar.map((n: any, i: number) => 
                              i === idx ? { ...n, label: e.target.value } : n
                            );
                            updateSection('navbar', newNav);
                          }}
                          className="w-full px-3 py-2 border rounded-md focus:ring-brand-red focus:border-brand-red"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Section ID (Read-only)</label>
                        <input
                          type="text"
                          value={item.id}
                          disabled
                          className="w-full px-3 py-2 border bg-gray-100 rounded-md text-gray-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                      <input 
                        type="text" 
                        value={tempContent.services.title}
                        onChange={(e) => updateSection('services', {...tempContent.services, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <input 
                        type="text" 
                        value={tempContent.services.subtitle}
                        onChange={(e) => updateSection('services', {...tempContent.services, subtitle: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                 </div>
                 
                 <div className="mt-8">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Service Cards</h4>
                    <div className="grid gap-6">
                      {tempContent.services.items.map((item: any, idx: number) => (
                        <div key={idx} className="border p-4 rounded-lg relative">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs text-gray-500">Title</label>
                                <input 
                                  type="text" 
                                  value={item.title}
                                  onChange={(e) => {
                                    const newItems = tempContent.services.items.map((s: any, i: number) => 
                                      i === idx ? { ...s, title: e.target.value } : s
                                    );
                                    updateSection('services', {...tempContent.services, items: newItems});
                                  }}
                                  className="w-full px-3 py-2 border rounded-md mt-1"
                                />
                             </div>
                             <div>
                                <label className="block text-xs text-gray-500">Icon Name</label>
                                <select 
                                  value={item.iconName}
                                  onChange={(e) => {
                                    const newItems = tempContent.services.items.map((s: any, i: number) => 
                                      i === idx ? { ...s, iconName: e.target.value } : s
                                    );
                                    updateSection('services', {...tempContent.services, items: newItems});
                                  }}
                                  className="w-full px-3 py-2 border rounded-md mt-1"
                                >
                                  <option value="ShieldCheck">ShieldCheck</option>
                                  <option value="Code2">Code2</option>
                                  <option value="Puzzle">Puzzle</option>
                                  <option value="Shield">Shield</option>
                                  <option value="Zap">Zap</option>
                                  <option value="Layout">Layout</option>
                                </select>
                             </div>
                             <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500">Description</label>
                                <textarea 
                                  value={item.description}
                                  onChange={(e) => {
                                    const newItems = tempContent.services.items.map((s: any, i: number) => 
                                      i === idx ? { ...s, description: e.target.value } : s
                                    );
                                    updateSection('services', {...tempContent.services, items: newItems});
                                  }}
                                  className="w-full px-3 py-2 border rounded-md mt-1"
                                  rows={2}
                                />
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                      <input 
                        type="text" 
                        value={tempContent.pricing.title}
                        onChange={(e) => updateSection('pricing', {...tempContent.pricing, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <input 
                        type="text" 
                        value={tempContent.pricing.subtitle}
                        onChange={(e) => updateSection('pricing', {...tempContent.pricing, subtitle: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                 </div>

                 {/* Edit Plans Helper */}
                 {['cyberPlans', 'webPlans', 'addonPlans'].map((planKey) => (
                   <div key={planKey} className="border-t pt-6">
                     <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold capitalize">
                          {planKey.replace('Plans', '')} Plans
                        </h4>
                        <button 
                          onClick={() => {
                            const newPlan: Plan = { name: 'New Plan', nadPrice: 0, features: ['Feature 1'], cta: 'Subscribe' };
                            const newPlans = [...(tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]), newPlan];
                            updateSection('pricing', {
                              ...tempContent.pricing, 
                              [planKey]: newPlans
                            });
                          }}
                          className="text-xs bg-brand-dark text-white px-3 py-1 rounded hover:bg-black"
                        >
                          + Add Plan
                        </button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]).map((plan, idx) => (
                          <div key={idx} className="border border-gray-200 p-4 rounded-lg bg-gray-50 relative group">
                            <button 
                              onClick={() => {
                                const newPlans = (tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]).filter((_, i) => i !== idx);
                                updateSection('pricing', {...tempContent.pricing, [planKey]: newPlans});
                              }}
                              className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <input 
                                className="border px-2 py-1 rounded text-sm font-bold"
                                placeholder="Plan Name"
                                value={plan.name}
                                onChange={(e) => {
                                  const newPlans = (tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]).map((p, i) => 
                                    i === idx ? { ...p, name: e.target.value } : p
                                  );
                                  updateSection('pricing', {...tempContent.pricing, [planKey]: newPlans});
                                }}
                              />
                              <input 
                                className="border px-2 py-1 rounded text-sm"
                                type="number"
                                placeholder="Price (NAD)"
                                value={plan.nadPrice}
                                onChange={(e) => {
                                  const newPlans = (tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]).map((p, i) => 
                                    i === idx ? { ...p, nadPrice: parseInt(e.target.value) || 0 } : p
                                  );
                                  updateSection('pricing', {...tempContent.pricing, [planKey]: newPlans});
                                }}
                              />
                            </div>
                            
                            <div className="mb-2">
                              <textarea
                                className="w-full border px-2 py-1 rounded text-xs"
                                placeholder="Features (comma separated)"
                                value={plan.features.join(', ')}
                                onChange={(e) => {
                                  const features = e.target.value.split(',').map(s => s.trimStart()); // preserve spaces while typing until comma
                                  const newPlans = (tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]).map((p, i) => 
                                    i === idx ? { ...p, features } : p
                                  );
                                  updateSection('pricing', {...tempContent.pricing, [planKey]: newPlans});
                                }}
                              />
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox"
                                checked={plan.isHighlight || false}
                                onChange={(e) => {
                                  const newPlans = (tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]).map((p, i) => 
                                    i === idx ? { ...p, isHighlight: e.target.checked } : p
                                  );
                                  updateSection('pricing', {...tempContent.pricing, [planKey]: newPlans});
                                }}
                              />
                              <label className="text-xs text-gray-600">Highlight</label>
                              
                              <input 
                                type="checkbox"
                                checked={plan.from || false}
                                onChange={(e) => {
                                  const newPlans = (tempContent.pricing[planKey as keyof typeof tempContent.pricing] as Plan[]).map((p, i) => 
                                    i === idx ? { ...p, from: e.target.checked } : p
                                  );
                                  updateSection('pricing', {...tempContent.pricing, [planKey]: newPlans});
                                }}
                                className="ml-2"
                              />
                              <label className="text-xs text-gray-600">"From"</label>
                            </div>

                          </div>
                        ))}
                     </div>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input 
                    type="text" 
                    value={tempContent.contact.title}
                    onChange={(e) => updateSection('contact', {...tempContent.contact, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input 
                    type="text" 
                    value={tempContent.contact.subtitle}
                    onChange={(e) => updateSection('contact', {...tempContent.contact, subtitle: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submission Email</label>
                  <input 
                    type="email" 
                    value={tempContent.contact.email}
                    onChange={(e) => updateSection('contact', {...tempContent.contact, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Footer Tagline</label>
                  <textarea 
                    value={tempContent.footer.tagline}
                    onChange={(e) => updateSection('footer', {...tempContent.footer, tagline: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                  <input 
                    type="text" 
                    value={tempContent.footer.copyrightText}
                    onChange={(e) => updateSection('footer', {...tempContent.footer, copyrightText: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};