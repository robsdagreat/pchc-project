import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon, ChevronRight, Settings } from 'lucide-react';
import { fetchData } from '../../utils/api.js';

const ContentManager: React.FC = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchData('/content/homepage');
        const sectionArray = Object.entries(response.data)
          .filter(([_, value]) => value && typeof value === 'object' && !Array.isArray(value))
          .map(([key, value]: [string, any]) => ({
            section_name: key,
            ...value
          }));
        setSections(sectionArray);
      } catch (err) {
        console.error('Failed to load content:', err);
        setMessage({ type: 'error', text: 'Failed to load homepage sections.' });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdate = async (sectionName: string, updatedData: any) => {
    setSaving(sectionName);
    setMessage(null);
    try {
      await fetchData(`/content/${sectionName}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      });
      setMessage({ type: 'success', text: `${sectionName} updated successfully!` });
      setSections(prev => prev.map(s => s.section_name === sectionName ? { ...s, ...updatedData } : s));
    } catch (err) {
      setMessage({ type: 'error', text: `Failed to update ${sectionName}.` });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#1E4D3B] w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 font-outfit">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">Content Manager</h1>
          <p className="text-gray-400 font-medium text-sm tracking-wide uppercase opacity-70">Update your homepage sections and key website copy.</p>
        </div>
        {message && (
          <div className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest border transition-all animate-in zoom-in-95 duration-300 ${
            message.type === 'success' ? 'bg-green-50 text-[#1E4D3B] border-green-100 shadow-lg shadow-green-900/5' : 'bg-red-50 text-red-600 border-red-100 shadow-lg shadow-red-900/5'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        )}
      </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4 bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 h-fit">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-2 opacity-70">Website Sections</p>
             <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.section_name}
                    onClick={() => setSelectedSection(section.section_name)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border group duration-300 ${
                      selectedSection === section.section_name 
                        ? 'bg-[#1E4D3B] border-transparent text-white shadow-xl shadow-green-900/20 translate-x-1' 
                        : 'bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:text-[#1E4D3B]'
                    }`}
                  >
                    <span className="font-bold text-[14px] tracking-wide flex items-center gap-3 capitalize">
                       <div className={`w-2 h-2 rounded-full transition-colors ${
                         section.is_active 
                           ? (selectedSection === section.section_name ? 'bg-white' : 'bg-green-500') 
                           : 'bg-gray-200'
                       }`}></div>
                       {section.section_name.replace(/_/g, ' ')}
                    </span>
                    <ChevronRight size={16} className={`transition-all duration-300 ${selectedSection === section.section_name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                  </button>
                ))}
             </div>
          </div>

         <div className="lg:col-span-8">
            {!selectedSection ? (
               <div className="bg-white rounded-[32px] border border-gray-100 p-12 text-center shadow-sm h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-300">
                     <Settings size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Select a section to edit</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">Click on a section name from the list on the left to start editing its content.</p>
               </div>
            ) : (
               <SectionEditor 
                section={sections.find(s => s.section_name === selectedSection)} 
                onSave={handleUpdate}
                isSaving={saving === selectedSection}
               />
            )}
         </div>
      </div>
    </div>
  );
};

const SectionEditor = ({ section, onSave, isSaving }: { section: any, onSave: any, isSaving: boolean }) => {
  const [formData, setFormData] = useState({ ...section });

  useEffect(() => {
    setFormData({ ...section });
  }, [section]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as any).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(section.section_name, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 overflow-hidden animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="p-10 border-b border-gray-50 bg-gray-50/20 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1E4D3B]/5 rounded-2xl flex items-center justify-center text-[#1E4D3B]">
               <Settings size={22} className="stroke-[2.5]" />
            </div>
            <div>
               <h3 className="text-xl font-black text-gray-900 capitalize tracking-tight">{section.section_name.replace(/_/g, ' ')}</h3>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5 opacity-70">Configuration</p>
            </div>
         </div>
         <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#143629] text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-green-900/10 disabled:opacity-70 active:scale-95"
         >
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {isSaving ? 'Updating...' : 'Save Changes'}
         </button>
      </div>
      
      <div className="p-8 space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Title</label>
               <input 
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all outline-none font-medium"
               />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Subtitle</label>
               <input 
                  name="subtitle"
                  value={formData.subtitle || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all outline-none font-medium"
               />
            </div>
         </div>

         <div className="space-y-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              {section.section_name === 'impact' ? 'Impact Statistics' : 'Description'}
            </label>
            
            {section.section_name === 'impact' ? (
              <div className="space-y-3">
                {(() => {
                   let items: string[] = [];
                   try {
                     const parsed = JSON.parse(formData.description || '[]');
                     items = Array.isArray(parsed) ? parsed : [formData.description];
                   } catch (e) {
                     items = formData.description ? [formData.description] : [];
                   }
                   
                   return (
                     <>
                       {items.map((item, idx) => (
                         <div key={idx} className="flex gap-2 animate-in fade-in slide-in-from-left-4 duration-300">
                           <input
                             value={item}
                             onChange={(e) => {
                               const newItems = [...items];
                               newItems[idx] = e.target.value;
                               setFormData((prev: any) => ({ ...prev, description: JSON.stringify(newItems) }));
                             }}
                             placeholder="e.g., 20,000+ therapy sessions provided"
                             className="flex-grow px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all outline-none font-medium"
                           />
                           <button
                              type="button"
                              onClick={() => {
                                const newItems = items.filter((_, i) => i !== idx);
                                 setFormData((prev: any) => ({ ...prev, description: JSON.stringify(newItems) }));
                              }}
                              className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                           >
                              <AlertCircle size={20} />
                           </button>
                         </div>
                       ))}
                       <button
                         type="button"
                         onClick={() => {
                           const newItems = [...items, ""];
                           setFormData((prev: any) => ({ ...prev, description: JSON.stringify(newItems) }));
                         }}
                         className="w-full py-3 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-green-200 hover:text-green-500 hover:bg-green-50/30 transition-all flex items-center justify-center gap-2"
                       >
                         + Add Impact Item
                       </button>
                       <p className="text-[10px] text-gray-400 font-medium italic">These items will be displayed as animated statistics on the homepage.</p>
                     </>
                   );
                })()}
              </div>
            ) : (
              <textarea 
                name="description"
                rows={4}
                value={formData.description || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all outline-none resize-none font-medium"
              />
            )}
         </div>

         <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300">
                  <ImageIcon size={18} />
               </div>
               <input 
                  name="image_url"
                  value={formData.image_url || ''}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all outline-none text-sm font-medium"
               />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">CTA Text</label>
               <input 
                  name="cta_text"
                  value={formData.cta_text || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all outline-none font-medium"
               />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">CTA Link</label>
               <input 
                  name="cta_link"
                  value={formData.cta_link || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all outline-none font-medium"
               />
            </div>
         </div>

         <div className="flex items-center gap-4 pt-6 border-t border-gray-50 group cursor-pointer">
            <div className="relative inline-flex items-center">
              <input 
                 type="checkbox"
                 name="is_active"
                 id="is_active"
                 checked={formData.is_active}
                 onChange={handleChange}
                 className="peer w-10 h-6 bg-gray-200 rounded-full appearance-none cursor-pointer checked:bg-[#1E4D3B] transition-colors duration-300"
              />
              <span className="absolute left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4 pointer-events-none"></span>
            </div>
            <label htmlFor="is_active" className="text-xs font-black text-gray-900 uppercase tracking-widest cursor-pointer select-none">Display this section on homepage</label>
         </div>
      </div>
    </form>
  );
};

export default ContentManager;
