import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Trash2, 
  Edit, 
  Plus, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  X,
  DollarSign,
  Activity,
  Check
} from 'lucide-react';
import { fetchData } from '../../utils/api';

interface DonationTier {
  id: number;
  name: string;
  amount: number;
  impact_description: string;
  is_active: boolean;
}

const DonationManager: React.FC = () => {
  const [tiers, setTiers] = useState<DonationTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<DonationTier | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    impact_description: '',
    is_active: true
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadTiers();
  }, []);

  const loadTiers = async () => {
    try {
      setLoading(true);
      const response = await fetchData('/donations/tiers');
      setTiers(response.data?.tiers || []);
    } catch (err) {
      console.error('Failed to load donation tiers:', err);
      setStatusMsg({ type: 'error', text: 'Failed to access donation registry.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you certain you wish to permanently remove this donation tier?')) return;
    try {
      await fetchData(`/donations/tiers/${id}`, { method: 'DELETE' });
      setTiers(tiers.filter(t => t.id !== id));
      showStatus('success', 'Donation tier removed successfully.');
    } catch (err) {
      console.error('Failed to delete tier:', err);
      showStatus('error', 'Failed to remove donation tier.');
    }
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const openModal = (tier: DonationTier | null = null) => {
    if (tier) {
      setEditingTier(tier);
      setFormData({
        name: tier.name,
        amount: tier.amount.toString(),
        impact_description: tier.impact_description,
        is_active: tier.is_active
      });
    } else {
      setEditingTier(null);
      setFormData({
        name: '',
        amount: '',
        impact_description: '',
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTier(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      if (editingTier) {
        const res = await fetchData(`/donations/tiers/${editingTier.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        setTiers(tiers.map(t => t.id === editingTier.id ? res.data.tier : t));
        showStatus('success', 'Tier updated successfully.');
      } else {
        const res = await fetchData('/donations/tiers', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        setTiers([...tiers, res.data.tier]);
        showStatus('success', 'New tier added successfully.');
      }
      closeModal();
    } catch (err) {
      console.error('Failed to save tier:', err);
      showStatus('error', 'Failed to save tier data.');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTiers = tiers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.impact_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && tiers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="animate-spin text-[#1E4D3B] w-12 h-12 stroke-[1.5]" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-outfit">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">Donation Ecosystem</h1>
           <p className="text-gray-400 font-medium text-sm tracking-wide uppercase opacity-70">Manage contribution tiers and institutional impact levels.</p>
        </div>
        <div className="flex items-center gap-3">
          {statusMsg && (
            <div className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest border transition-all animate-in zoom-in-95 duration-300 ${
              statusMsg.type === 'success' ? 'bg-green-50 text-[#1E4D3B] border-green-100 shadow-lg shadow-green-900/5' : 'bg-red-50 text-red-600 border-red-100 shadow-lg shadow-red-900/5'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {statusMsg.text}
            </div>
          )}
          <div className="relative group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm shadow-gray-100/50">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1E4D3B] transition-colors" size={18} />
             <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tiers..." 
                className="pl-12 pr-6 py-4 bg-transparent text-sm font-medium outline-none focus:ring-4 focus:ring-[#1E4D3B]/5 transition-all w-full md:w-64"
             />
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#143629] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-900/20 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} className="stroke-[3]" /> Create Tier
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {filteredTiers.length === 0 ? (
            <div className="col-span-full p-20 text-center bg-white rounded-[2.5rem] border border-gray-50 shadow-sm">
               <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-200 mb-6 border border-gray-100">
                  <Heart size={40} strokeWidth={1} />
               </div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 uppercase">No Tiers Found</h3>
               <p className="text-slate-400 text-sm font-medium">There are currently no donation tiers registered in the system.</p>
            </div>
         ) : filteredTiers.map((tier) => (
            <div key={tier.id} className="bg-white rounded-[2rem] border border-gray-50 shadow-sm shadow-gray-100/50 overflow-hidden group hover:shadow-xl hover:shadow-[#1E4D3B]/5 transition-all duration-300 relative flex flex-col h-full">
               
               {/* Tier Header */}
               <div className="p-8 relative overflow-hidden bg-gradient-to-br from-[#1E4D3B] to-[#0A2E1F] text-white text-center">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-all"></div>
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                     <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-2">{tier.name}</span>
                     <div className="flex items-start justify-center gap-1 mb-1">
                        <DollarSign size={24} className="stroke-[3] opacity-80 mt-1" />
                        <span className="text-5xl font-black tracking-tighter">{tier.amount}</span>
                     </div>
                     <span className={`inline-flex items-center gap-1 px-3 py-1 mt-4 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 ${tier.is_active ? 'bg-white/10 text-white' : 'bg-black/20 text-white/50'}`}>
                        <Activity size={10} className="stroke-[3]" /> {tier.is_active ? 'Active Status' : 'Inactive'}
                     </span>
                  </div>
               </div>

               {/* Tier Body */}
               <div className="p-8 flex-grow flex flex-col">
                  <h4 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-3">Institutional Impact</h4>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium flex-grow mb-8">
                     {tier.impact_description}
                  </p>
                  
                  {/* Actions */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-3 mt-auto">
                     <button 
                       onClick={() => openModal(tier)}
                       className="flex items-center justify-center gap-2 flex-grow py-3 bg-gray-50 hover:bg-[#1E4D3B]/5 hover:text-[#1E4D3B] text-gray-500 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                     >
                        <Edit size={14} className="stroke-[2.5]" /> Modify
                     </button>
                     <button 
                       onClick={() => handleDelete(tier.id)}
                       className="p-3 bg-gray-50 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-xl transition-all"
                       title="Decommission Tier"
                     >
                        <Trash2 size={16} className="stroke-[2.5]" />
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* Institutional Action Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 font-outfit">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm text-[#1E4D3B] flex items-center justify-center">
                  <Heart size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingTier ? 'Modify Support Tier' : 'Establish Support Tier'}</h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Philanthropy Governance</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:bg-gray-200 rounded-xl transition-colors">
                <X size={20} className="stroke-[3]" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleSave} className="overflow-y-auto w-full">
              <div className="p-10 space-y-8">
                
                <div className="grid grid-cols-2 gap-8">
                   <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Tier Designation</label>
                     <input 
                       type="text" 
                       required
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:bg-white focus:ring-4 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all shadow-inner"
                       placeholder="e.g., General Supporter"
                     />
                   </div>
                   
                   <div>
                     <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Commitment Amount ($)</label>
                     <div className="relative">
                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2.5]" size={18} />
                        <input 
                          type="number" 
                          required
                          min="0"
                          step="0.01"
                          value={formData.amount}
                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-slate-900 font-bold focus:bg-white focus:ring-4 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all shadow-inner"
                          placeholder="0.00"
                        />
                     </div>
                   </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Impact Statement</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.impact_description}
                    onChange={(e) => setFormData({...formData, impact_description: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:bg-white focus:ring-4 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all shadow-inner"
                    placeholder="Describe the institutional impact of this contribution level..."
                  ></textarea>
                </div>

                <div className="flex items-center p-5 bg-[#1E4D3B]/[0.02] border border-[#1E4D3B]/[0.05] rounded-2xl cursor-pointer hover:bg-[#1E4D3B]/[0.04] transition-colors" onClick={() => setFormData({...formData, is_active: !formData.is_active})}>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-900 text-sm tracking-tight mb-0.5">Active Status</h4>
                    <p className="text-xs text-slate-500 font-medium">Allow public visualization and engagement with this tier.</p>
                  </div>
                  <div className="ml-4">
                    <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${formData.is_active ? 'bg-[#1E4D3B]' : 'bg-slate-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full absolute transition-transform shadow-sm flex items-center justify-center ${formData.is_active ? 'translate-x-[6px]' : 'translate-x-1'}`}>
                        {formData.is_active && <Check size={12} className="text-[#1E4D3B] stroke-[4]" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-10 py-6 bg-gray-50/50 border-t border-gray-50 flex justify-end gap-3 rounded-b-[2.5rem]">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-8 py-4 font-black text-xs text-slate-500 uppercase tracking-widest hover:bg-slate-200/50 rounded-xl transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-8 py-4 bg-[#1E4D3B] hover:bg-[#143629] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center gap-2"
                >
                  {isSaving ? (
                     <><Loader2 size={16} className="animate-spin stroke-[3]" /> Processing</>
                  ) : (
                     <><Check size={16} className="stroke-[3]" /> Execute Update</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationManager;
