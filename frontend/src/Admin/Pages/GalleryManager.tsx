import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  X, 
  Image as ImageIcon,
  Camera,
  Upload,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { fetchData } from '../../utils/api';

interface GalleryItem {
  id: number;
  title: string;
  url: string;
  category: string;
  media_type: string;
  created_at: string;
}

const GalleryManager: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'General', 'Events', 'Programs', 'Impact'];

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await fetchData('/gallery');
      setImages(res.data?.gallery || []);
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to remove this visual asset?')) return;
    
    try {
      await fetchData(`/gallery/${id}`, { method: 'DELETE' });
      setMessage({ type: 'success', text: 'Asset removed successfully.' });
      setImages(images.filter(img => img.id !== id));
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to delete image:', err);
      setMessage({ type: 'error', text: 'Failed to delete asset.' });
    }
  };

  const filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || img.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading && images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#1E4D3B] w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-outfit">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">Gallery Manager</h1>
          <p className="text-gray-400 font-medium text-sm tracking-wide uppercase opacity-70">Govern your institutional visual assets and media repository.</p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <div className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest border transition-all animate-in zoom-in-95 duration-300 ${
              message.type === 'success' ? 'bg-green-50 text-[#1E4D3B] border-green-100 shadow-lg shadow-green-900/5' : 'bg-red-50 text-red-600 border-red-100 shadow-lg shadow-red-900/5'
            }`}>
              {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#143629] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-green-900/10 active:scale-95"
          >
            <Plus size={20} className="stroke-[3]" />
            Add Visual Asset
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-50/10">
           <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1E4D3B] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search repository..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-medium outline-none focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/10 focus:bg-white transition-all duration-300"
              />
           </div>
           
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 whitespace-nowrap rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-[#1E4D3B] text-white shadow-lg shadow-green-900/10' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#1E4D3B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {filteredImages.length === 0 ? (
          <div className="p-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-gray-200 mb-6 border border-gray-100 shadow-inner">
                 <ImageIcon size={40} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Repository is Empty</h3>
              <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto mb-8 opacity-70">Begin populating your institutional media database to showcase impact and organizational milestones.</p>
              <button 
                onClick={() => setShowModal(true)} 
                className="text-[#1E4D3B] text-xs font-black uppercase tracking-widest hover:underline"
              >
                Register First Asset
              </button>
          </div>
        ) : (
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredImages.map((img) => (
                <div key={img.id} className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm aspect-square bg-gray-50 transition-all duration-500 hover:shadow-xl hover:shadow-green-900/5 hover:-translate-y-1">
                  {img.media_type === 'video' ? (
                    <video 
                      src={img.url} 
                      className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                      autoPlay muted loop playsInline
                    />
                  ) : (
                    <img 
                      src={img.url} 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400'; }}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                      alt={img.title || 'gallery image'} 
                    />
                  )}
                  
                  {/* Glassmorphism Overlays */}
                  <div className="absolute inset-0 bg-[#1E4D3B]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 backdrop-blur-sm">
                      <div className="flex justify-end gap-2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <a 
                          href={img.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-3 bg-white/20 hover:bg-white rounded-[1.25rem] text-white hover:text-[#1E4D3B] transition-all backdrop-blur-md shadow-lg"
                          title="View Full Resolution"
                        >
                            <ExternalLink size={18} className="stroke-[2.5]" />
                        </a>
                        <button 
                          onClick={() => handleDelete(img.id)} 
                          className="p-3 bg-white/20 hover:bg-red-500 rounded-[1.25rem] text-white transition-all backdrop-blur-md shadow-lg"
                          title="Decommission Asset"
                        >
                            <Trash2 size={18} className="stroke-[2.5]" />
                        </button>
                      </div>
                      <div className="translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                            <p className="text-white font-black text-xs uppercase tracking-wider truncate mb-1">{img.title || 'Untitled Archive'}</p>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">{img.category}</p>
                         </div>
                      </div>
                  </div>
                  
                  {/* Category Badge (Top Left - Always Visible slightly) */}
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-[#1E4D3B] border border-white/50 shadow-sm opacity-90 group-hover:opacity-0 transition-opacity">
                        {img.category}
                     </span>
                  </div>
                </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-8 bg-[#1E4D3B]/[0.02] rounded-[2rem] border border-[#1E4D3B]/[0.03] text-center">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Visual Registry Governance Console • PCHC Unified Dashboard</p>
      </div>

      {showModal && (
        <GalleryUploadModal 
          onSave={() => { loadGallery(); closeModal(); }} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

const GalleryUploadModal = ({ onSave, onClose }: { onSave: any, onClose: any }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'General'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please provide a visual asset for ingestion.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const API_URL = import.meta.env.VITE_API_URL || 'https://pchc-project.onrender.com/api';
      const token = localStorage.getItem('adminToken');
      
      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: uploadData
      });

      if (!uploadRes.ok) throw new Error('Ingestion failed at media layer.');
      const uploadJson = await uploadRes.json();
      const imageUrl = uploadJson.data.url;

      await fetchData('/gallery', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title || file.name.split('.')[0],
          url: imageUrl,
          category: formData.category,
          media_type: file.type.startsWith('video/') ? 'video' : 'image'
        })
      });
      
      onSave();
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Operation failed. Verify administrative permissions.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500 font-outfit">
       <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all border border-gray-100 flex flex-col animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1E4D3B]/5 rounded-2xl flex items-center justify-center text-[#1E4D3B]">
                   <ImageIcon size={24} className="stroke-[3]" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight">Ingest Visual Asset</h3>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5 opacity-70">Media Registry Entry</p>
                </div>
             </div>
             <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all active:scale-90 border border-transparent hover:border-gray-100">
                <X size={24} className="text-gray-400" />
             </button>
          </div>
          
          <form onSubmit={handleUpload} className="p-10 space-y-10 overflow-y-auto flex-grow no-scrollbar">
             {error && (
                <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake duration-500">
                   <AlertCircle size={20} />
                   <p className="text-xs font-black uppercase tracking-widest">{error}</p>
                </div>
             )}

             {/* Asset Upload Zone */}
             <div className="flex flex-col items-center justify-center gap-6">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] opacity-70">Official Archive Portrait (Image or Video)</label>
                <div className="relative group w-full h-64 rounded-[2rem] overflow-hidden border-2 border-dashed border-gray-100 bg-gray-50/50 hover:border-[#1E4D3B]/30 hover:bg-white transition-all duration-500 flex flex-col items-center justify-center text-center p-2 shadow-inner">
                   {previewUrl ? (
                      <>
                        {file?.type.startsWith('video/') ? (
                          <video src={previewUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop />
                        ) : (
                          <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-[#1E4D3B]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                           <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl animate-in zoom-in-50 duration-300">
                             <Upload size={24} className="stroke-[3]" />
                           </div>
                        </div>
                      </>
                   ) : (
                      <div className="space-y-4 animate-in fade-in duration-1000">
                         <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto text-gray-300 group-hover:text-[#1E4D3B] group-hover:shadow-lg transition-all duration-500">
                            <Camera size={32} className="stroke-[1.5]" />
                         </div>
                         <div>
                            <p className="text-sm font-black text-gray-900 tracking-tight">Select archival media</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">High-Resolution Still or Motion</p>
                         </div>
                      </div>
                   )}
                   <input 
                      type="file" 
                      accept="image/*,video/mp4,video/webm" 
                      onChange={handleFileChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                   />
                </div>
             </div>

             <div className="space-y-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Asset Designation / Title</label>
                   <input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.25rem] focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-black text-sm tracking-wide transition-all placeholder:text-gray-300"
                      placeholder="e.g. Annual Community Health Workshop 2024"
                   />
                </div>
                
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Classification / Category</label>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['General', 'Events', 'Programs', 'Impact'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({...formData, category: cat})}
                          className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            formData.category === cat 
                            ? 'bg-[#1E4D3B] text-white shadow-lg' 
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#1E4D3B]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             <div className="pt-8 flex gap-5 sticky bottom-0 bg-white/80 backdrop-blur-md">
                <button 
                  type="button" 
                  disabled={uploading}
                  onClick={onClose} 
                  className="flex-1 py-5 bg-gray-50 hover:bg-gray-100 rounded-2xl font-black text-xs uppercase tracking-[.2em] text-gray-400 transition-all active:scale-95 disabled:opacity-50"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="flex-2 py-5 bg-[#1E4D3B] hover:bg-[#143629] rounded-2xl font-black text-xs uppercase tracking-[.2em] text-white transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 px-12"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : 'Finalize Ingestion'}
                </button>
             </div>
          </form>
       </div>
    </div>
  );
};

export default GalleryManager;
