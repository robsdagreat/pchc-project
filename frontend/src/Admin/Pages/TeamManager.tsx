import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2,
  Check,
  AlertCircle,
  X,
  Briefcase,
  Camera,
  Upload,
  Search,
  User,
  ArrowUpDown
} from 'lucide-react';
import { fetchData } from '../../utils/api';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo_url: string;
  display_order: number;
}

const TeamManager: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'order'>('order');

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await fetchData('/team');
      setMembers(response.data?.team || []);
    } catch (err) {
      console.error('Failed to load team:', err);
      setMessage({ type: 'error', text: 'Failed to load team members.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to remove this team member?')) return;
    try {
      await fetchData(`/team/${id}`, { method: 'DELETE' });
      setMessage({ type: 'success', text: 'Member removed successfully.' });
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete team member.' });
    }
  };

  const handleSave = async (formData: any, file: File | null) => {
    const isEdit = !!selectedMember;
    const url = isEdit ? `/team/${selectedMember.id}` : '/team';
    const method = isEdit ? 'PUT' : 'POST';
    
    try {
      setLoading(true);
      let photoUrl = formData.photo_url;

      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const token = localStorage.getItem('adminToken');
        
        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: uploadData
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadJson = await uploadRes.json();
        photoUrl = uploadJson.data.url;
      }

      await fetchData(url, {
        method,
        body: JSON.stringify({
           ...formData,
           photo_url: photoUrl
        })
      });

      setMessage({ type: 'success', text: `Member ${isEdit ? 'updated' : 'added'} successfully.` });
      setIsFormOpen(false);
      setSelectedMember(null);
      loadMembers();
    } catch (err: any) {
      console.error('Save failed:', err);
      setMessage({ type: 'error', text: err.message || `Failed to ${isEdit ? 'update' : 'add'} member.` });
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members
    .filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.display_order - b.display_order;
    });

  if (loading && members.length === 0) {
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
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">Team Manager</h1>
          <p className="text-gray-400 font-medium text-sm tracking-wide uppercase opacity-70">Govern your institutional leadership and staff registry.</p>
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
            onClick={() => { setSelectedMember(null); setIsFormOpen(true); }}
            className="flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#143629] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-green-900/10 active:scale-95"
          >
            <Plus size={20} className="stroke-[3]" />
            Register New Member
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
           
           <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-400 focus:text-[#1E4D3B] outline-none hover:bg-white hover:shadow-md transition-all appearance-none cursor-pointer"
                >
                  <option value="order">Priority Sort</option>
                  <option value="name">Alpha Sort</option>
                </select>
                <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300" />
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-50/50">
                <th className="px-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile</th>
                <th className="px-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell">Professional Bio</th>
                <th className="px-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center hidden lg:table-cell">Priority</th>
                <th className="px-10 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 overflow-hidden border-2 border-white flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:shadow-md">
                         <img 
                          src={member.photo_url} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target as any).src = `https://ui-avatars.com/api/?name=${member.name}&background=f3f4f6&color=6b7280`}
                         />
                      </div>
                      <div className="max-w-[180px]">
                         <h4 className="font-black text-slate-900 text-[15px] tracking-tight mb-0.5 group-hover:text-[#1E4D3B] transition-colors">{member.name}</h4>
                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 group-hover:text-slate-400 transition-colors">
                            <span className="w-1 h-1 bg-[#1E4D3B]/40 rounded-full group-hover:bg-[#1E4D3B]"></span>
                            {member.position}
                         </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 hidden md:table-cell">
                    <p className="text-sm text-slate-400 font-medium line-clamp-2 max-w-sm italic opacity-70 group-hover:opacity-100 transition-opacity">
                       "{member.bio}"
                    </p>
                  </td>
                  <td className="px-10 py-6 hidden lg:table-cell text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-50 text-slate-300 text-[11px] font-black border border-slate-100 group-hover:border-[#1E4D3B]/10 group-hover:bg-[#1E4D3B]/5 group-hover:text-[#1E4D3B] transition-all duration-500">
                       {member.display_order}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                         onClick={() => { setSelectedMember(member); setIsFormOpen(true); }}
                         className="p-3 text-slate-300 hover:text-[#1E4D3B] hover:bg-[#1E4D3B]/5 rounded-2xl transition-all duration-300 active:scale-95 hover:shadow-sm"
                         title="Modify Entry"
                       >
                          <Edit2 size={19} className="stroke-[2.5]" />
                       </button>
                       <button 
                         onClick={() => handleDelete(member.id)}
                         className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50/80 rounded-2xl transition-all duration-300 active:scale-95 hover:shadow-sm"
                         title="Revoke Access"
                       >
                          <Trash2 size={19} className="stroke-[2.5]" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                   <td colSpan={4} className="px-10 py-20 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto text-gray-200 mb-4 border border-gray-100">
                         <Search size={32} strokeWidth={1} />
                      </div>
                      <p className="text-gray-400 font-black uppercase tracking-widest text-[11px]">No personnel found matching your criteria</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 bg-[#1E4D3B]/[0.02] rounded-[2rem] border border-[#1E4D3B]/[0.03] text-center">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Administrative Governance Console • PCHC Unified Dashboard</p>
      </div>

      {isFormOpen && (
        <TeamMemberForm 
          member={selectedMember} 
          onSave={handleSave} 
          onClose={() => { setIsFormOpen(false); setSelectedMember(null); }} 
        />
      )}
    </div>
  );
};

const TeamMemberForm = ({ member, onSave, onClose }: { member: any, onSave: any, onClose: any }) => {
  const [formData, setFormData] = useState(member || {
    name: '',
    position: '',
    bio: '',
    photo_url: '',
    display_order: 0
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(member?.photo_url || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    onSave(formData, file);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500 font-outfit">
       <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all border border-gray-100 flex flex-col animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1E4D3B]/5 rounded-2xl flex items-center justify-center text-[#1E4D3B]">
                   <User size={24} className="stroke-[3]" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight">{member ? 'Update Personnel' : 'Register Member'}</h3>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5 opacity-70">Governance Registry Entry</p>
                </div>
             </div>
             <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all active:scale-90 border border-transparent hover:border-gray-100">
                <X size={24} className="text-gray-400" />
             </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-10 overflow-y-auto flex-grow no-scrollbar">
             {/* Photo Upload Area */}
             <div className="flex flex-col items-center justify-center gap-6">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] opacity-70">Official Portrait (Image Only)</label>
                <div className="relative group w-36 h-44 rounded-3xl overflow-hidden border-2 border-dashed border-gray-100 bg-gray-50/50 hover:border-[#1E4D3B]/30 hover:bg-white transition-all duration-500 flex flex-col items-center justify-center text-center p-2 shadow-inner">
                   {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#1E4D3B]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                           <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl animate-in zoom-in-50 duration-300">
                             <Upload size={24} className="stroke-[3]" />
                           </div>
                        </div>
                      </>
                   ) : (
                      <div className="space-y-4 animate-in fade-in duration-1000">
                         <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-gray-300 group-hover:text-[#1E4D3B] group-hover:shadow-lg transition-all duration-500">
                            <Camera size={24} className="stroke-[1.5]" />
                         </div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Portrait Zone</p>
                      </div>
                   )}
                   <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Full Identification</label>
                   <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.25rem] focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-black text-sm tracking-wide transition-all placeholder:text-gray-300"
                      placeholder="e.g. Dr. Sarah Jenkins"
                   />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Designated Role</label>
                   <div className="relative">
                      <input 
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.25rem] focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-black text-sm tracking-wide transition-all placeholder:text-gray-300"
                        placeholder="e.g. Executive Director"
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 opacity-30">
                         <Briefcase size={16} />
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Personnel Biography</label>
                <textarea 
                   required
                   rows={4}
                   value={formData.bio}
                   onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                   className="w-full px-8 py-6 bg-gray-50 border border-transparent rounded-[2rem] focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-medium text-[14px] leading-relaxed transition-all resize-none no-scrollbar placeholder:text-gray-300 italic"
                   placeholder="Administrative background and personal statement..."
                />
             </div>

             <div className="flex items-center gap-6">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Display Priority</label>
                   <div className="relative group">
                      <input 
                        type="number"
                        min="0"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        className="w-32 px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-black text-sm text-center transition-all"
                      />
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                         <ArrowUpDown size={14} className="text-gray-300" />
                      </div>
                   </div>
                </div>
                <div className="pt-8 text-[9px] font-black text-gray-300 uppercase tracking-widest max-w-[200px] leading-tight opacity-50">
                   Prioritize members by assigning lower display orders for top priority positions.
                </div>
             </div>

             <div className="pt-8 flex gap-5 sticky bottom-0 bg-white/80 backdrop-blur-md">
                <button 
                  type="button" 
                  disabled={isUploading}
                  onClick={onClose} 
                  className="flex-1 py-5 bg-gray-50 hover:bg-gray-100 rounded-2xl font-black text-xs uppercase tracking-[.2em] text-gray-400 transition-all active:scale-95 disabled:opacity-50"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="flex-2 py-5 bg-[#1E4D3B] hover:bg-[#143629] rounded-2xl font-black text-xs uppercase tracking-[.2em] text-white transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 px-12"
                >
                  {isUploading ? <Loader2 size={18} className="animate-spin" /> : member ? 'Update Entry' : 'Finalize Registry'}
                </button>
             </div>
          </form>
       </div>
    </div>
  );
};

export default TeamManager;
