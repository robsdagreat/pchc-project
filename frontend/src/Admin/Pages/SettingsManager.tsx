import React, { useState, useEffect } from 'react';
import { 
  UserCircle, 
  ShieldCheck, 
  Key, 
  Trash2, 
  Edit, 
  Plus, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  X,
  ShieldAlert,
  Save
} from 'lucide-react';
import { fetchData } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';

interface AdminUser {
  id: number;
  username: string;
  role: string;
  permissions: string[];
  created_at: string;
}

const SettingsManager: React.FC = () => {
  const { admin } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'access'>('profile');
  
  // Access Management State
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'admin',
    permissions: [] as string[]
  });
  const [isSaving, setIsSaving] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [pwdForm, setPwdForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSavingPwd, setIsSavingPwd] = useState(false);
  const [pwdStatusMsg, setPwdStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const showPwdStatus = (type: 'success' | 'error', text: string) => {
    setPwdStatusMsg({ type, text });
    setTimeout(() => setPwdStatusMsg(null), 3000);
  };

  useEffect(() => {
    if (activeTab === 'access') {
      loadAdmins();
    }
  }, [activeTab]);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const response = await fetchData('/users');
      setAdmins(response.data?.users || []);
    } catch (err) {
      console.error('Failed to load admins:', err);
      // Fails silently if not super admin, or we can handle it
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you absolutely certain you wish to revoke this administrative account?')) return;
    try {
      await fetchData(`/users/${id}`, { method: 'DELETE' });
      setAdmins(admins.filter(a => a.id !== id));
      showStatus('success', 'Administrative account revoked.');
    } catch (err: any) {
      console.error('Failed to delete admin:', err);
      showStatus('error', err.message || 'Failed to revoke account.');
    }
  };

  const openModal = (user: AdminUser | null = null) => {
    setEditingAdmin(user);
    if (user) {
      setFormData({
        username: user.username,
        password: '', // Cannot edit password for security reasons in this view
        role: user.role,
        permissions: user.permissions || []
      });
    } else {
      setFormData({
        username: '',
        password: '',
        role: 'admin',
        permissions: []
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAdmin(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingAdmin) {
        const res = await fetchData(`/users/${editingAdmin.id}`, {
          method: 'PUT',
          body: JSON.stringify({ role: formData.role, permissions: formData.permissions })
        });
        setAdmins(admins.map(a => a.id === editingAdmin.id ? res.data.user : a));
        showStatus('success', 'Access rights updated successfully.');
      } else {
        const payload = {
          username: formData.username,
          password: formData.password,
          role: formData.role,
          permissions: formData.permissions
        };
        const res = await fetchData('/users', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        setAdmins([res.data.user, ...admins]);
        showStatus('success', 'New administrator established.');
      }
      closeModal();
    } catch (err: any) {
      console.error('Failed to save admin:', err);
      showStatus('error', err.message || 'Verification failed. Insufficient privileges or invalid data.');
    } finally {
      setIsSaving(false);
    }
  };

  const togglePermission = (perm: string) => {
    setFormData(prev => {
      const perms = prev.permissions || [];
      if (perms.includes(perm)) {
        return { ...prev, permissions: perms.filter(p => p !== perm) };
      } else {
        return { ...prev, permissions: [...perms, perm] };
      }
    });
  };

  const availablePermissions = ['read_all', 'write_content', 'manage_users', 'view_donations', 'manage_gallery'];

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      showPwdStatus('error', 'New passwords do not match.');
      return;
    }
    
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(pwdForm.newPassword)) {
      showPwdStatus('error', 'Weak password. Use 8+ characters, uppercase, lowercase, number, and special character.');
      return;
    }
    
    setIsSavingPwd(true);
    try {
      await fetchData('/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword: pwdForm.currentPassword,
          newPassword: pwdForm.newPassword
        })
      });
      showStatus('success', 'Authentication credentials successfully updated.');
      setIsChangingPassword(false);
      setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPwdStatusMsg(null);
    } catch (err: any) {
      console.error('Failed to change password:', err);
      showPwdStatus('error', err.message || 'Failed to authorize password change.');
    } finally {
      setIsSavingPwd(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-outfit">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">System Governance</h1>
           <p className="text-gray-400 font-medium text-sm tracking-wide uppercase opacity-70">Oversee institutional parameters and administrative access.</p>
        </div>
        
        {statusMsg && (
          <div className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest border transition-all animate-in zoom-in-95 duration-300 ${
            statusMsg.type === 'success' ? 'bg-green-50 text-[#1E4D3B] border-green-100 shadow-lg shadow-green-900/5' : 'bg-red-50 text-red-600 border-red-100 shadow-lg shadow-red-900/5'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {statusMsg.text}
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-md p-2 rounded-[2rem] border border-gray-100 flex items-center gap-2 max-w-fit shadow-sm">
         <button 
           onClick={() => setActiveTab('profile')}
           className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'profile' ? 'bg-[#1E4D3B] text-white shadow-xl shadow-green-900/10 scale-100' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
         >
            <UserCircle size={16} className="stroke-[2.5]" />
            Personal Identification
         </button>
         <button 
           onClick={() => setActiveTab('access')}
           className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'access' ? 'bg-[#1E4D3B] text-white shadow-xl shadow-green-900/10 scale-100' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
         >
            <ShieldCheck size={16} className="stroke-[2.5]" />
            Access Management
         </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 p-8 lg:p-12 min-h-[500px]">
        
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
           <div className="max-w-3xl animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-50">
                 <div className="w-24 h-24 bg-[#1E4D3B]/5 rounded-[2rem] flex items-center justify-center text-[#1E4D3B] shadow-inner relative overflow-hidden group">
                    <UserCircle size={48} className="stroke-[1.5]" />
                    <div className="absolute inset-0 bg-[#1E4D3B] opactity-0 group-hover:opacity-10 transition-opacity"></div>
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{admin?.username || 'Executive'}</h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                       <ShieldAlert size={12} className="stroke-[2.5]" /> {admin?.role || 'Administrator'}
                    </span>
                 </div>
              </div>

              <div className="space-y-8">
                 <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Account Security</h3>
                    <div className="space-y-4">
                       <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400 flex-shrink-0">
                                <Key size={20} className="stroke-[2.5]" />
                             </div>
                             <div>
                                <h4 className="font-bold text-sm text-slate-900">Authentication Credentials</h4>
                                <p className="text-xs font-medium text-slate-400">Regularly update your credentials to maintain system integrity.</p>
                             </div>
                          </div>
                          
                          {!isChangingPassword ? (
                            <button 
                               onClick={() => setIsChangingPassword(true)}
                               className="px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-[#1E4D3B] text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
                            >
                               Update Credentials
                            </button>
                          ) : (
                            <button 
                               onClick={() => { setIsChangingPassword(false); setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); setPwdStatusMsg(null); }}
                               className="px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
                            >
                               Discard Changes
                            </button>
                          )}
                       </div>

                       {isChangingPassword && (
                         <div className="p-6 bg-white border border-[#1E4D3B]/10 rounded-[2rem] shadow-sm animate-in fade-in zoom-in-95 duration-300">
                           {pwdStatusMsg && (
                             <div className={`mb-6 p-4 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest border ${
                               pwdStatusMsg.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-[#1E4D3B] border-green-100'
                             }`}>
                               <AlertCircle size={16} />
                               {pwdStatusMsg.text}
                             </div>
                           )}
                           <form onSubmit={handlePasswordUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Passcode</label>
                                <input 
                                  type="password" 
                                  required
                                  value={pwdForm.currentPassword}
                                  onChange={(e) => setPwdForm({...pwdForm, currentPassword: e.target.value})}
                                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all placeholder:text-slate-300 placeholder:font-normal text-sm"
                                  placeholder="••••••••"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Passcode</label>
                                <input 
                                  type="password" 
                                  required
                                  value={pwdForm.newPassword}
                                  onChange={(e) => setPwdForm({...pwdForm, newPassword: e.target.value})}
                                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all placeholder:text-slate-300 placeholder:font-normal text-sm"
                                  placeholder="••••••••"
                                />
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">8+ chars, upper, lower, num, & special</p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirm Passcode</label>
                                <input 
                                  type="password" 
                                  required
                                  value={pwdForm.confirmPassword}
                                  onChange={(e) => setPwdForm({...pwdForm, confirmPassword: e.target.value})}
                                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all placeholder:text-slate-300 placeholder:font-normal text-sm"
                                  placeholder="••••••••"
                                />
                              </div>
                              <div className="md:col-span-3 flex justify-end mt-2">
                                <button 
                                   type="submit" 
                                   disabled={isSavingPwd}
                                   className="px-6 py-3 bg-[#1E4D3B] hover:bg-[#143629] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center gap-2"
                                >
                                   {isSavingPwd ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Execute Update
                                </button>
                              </div>
                           </form>
                         </div>
                       )}
                    </div>
                 </div>

                 <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Assigned Permissions</h3>
                    <div className="p-6 bg-[#1E4D3B]/[0.02] border border-[#1E4D3B]/[0.05] rounded-[2rem]">
                       <div className="flex flex-wrap gap-2">
                          {(admin?.permissions && admin.permissions.length > 0) ? admin.permissions.map((perm, idx) => (
                             <span key={idx} className="px-4 py-2 bg-white border border-[#1E4D3B]/10 rounded-xl text-[11px] font-bold text-[#1E4D3B] uppercase tracking-widest shadow-sm">
                                {perm.replace('_', ' ')}
                             </span>
                          )) : (
                             <span className="text-xs font-bold text-slate-400 italic">Standard access rights applied.</span>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* ACCESS MANAGEMENT TAB */}
        {activeTab === 'access' && (
           <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Governance Registry</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Super Admin Authorization Required</p>
                 </div>
                 <button 
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#143629] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-900/20 transition-all active:scale-95 whitespace-nowrap"
                 >
                    <Plus size={16} className="stroke-[3]" /> Establish Originator
                 </button>
              </div>

              {loading && admins.length === 0 ? (
                 <div className="flex items-center justify-center min-h-[200px]">
                    <Loader2 className="animate-spin w-10 h-10 text-[#1E4D3B] stroke-[1.5]" />
                 </div>
              ) : admins.length === 0 ? (
                 <div className="p-16 text-center bg-slate-50 border border-slate-100 rounded-[2rem]">
                    <ShieldAlert size={40} className="mx-auto text-slate-300 mb-4 stroke-[1.5]" />
                    <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-2">Access Restricted</h3>
                    <p className="text-sm text-slate-500 font-medium">You do not possess the required superstructure clearance to view this registry.</p>
                 </div>
              ) : (
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-slate-50/50 border-b border-gray-50/50">
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identification</th>
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Role Designation</th>
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clearance Levels</th>
                             <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {admins.map(user => (
                             <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-gradient-to-br from-[#1E4D3B] to-[#0A2E1F] rounded-2xl flex items-center justify-center text-white shadow-inner font-black text-xs uppercase">
                                         {user.username.substring(0, 2)}
                                      </div>
                                      <span className="font-bold text-sm text-slate-900 group-hover:text-[#1E4D3B] transition-colors">{user.username}</span>
                                   </div>
                                </td>
                                <td className="px-8 py-6">
                                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'super_admin' ? 'bg-[#1E4D3B] text-white' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                      {user.role}
                                   </span>
                                </td>
                                <td className="px-8 py-6">
                                   <div className="flex gap-1 flex-wrap max-w-xs">
                                      {(user.permissions || []).map((p, i) => (
                                         <span key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-400 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                                            {p.replace('_', ' ')}
                                         </span>
                                      ))}
                                      {(!user.permissions || user.permissions.length === 0) && (
                                         <span className="text-slate-300 text-[10px] font-bold italic">Standard</span>
                                      )}
                                   </div>
                                </td>
                                <td className="px-8 py-6">
                                   <div className="flex items-center justify-end gap-2 text-slate-400">
                                      <button 
                                         onClick={() => openModal(user)}
                                         className="p-3 hover:text-[#1E4D3B] hover:bg-[#1E4D3B]/5 rounded-xl transition-all active:scale-95"
                                         title="Modify Clearance"
                                      >
                                         <Edit size={16} className="stroke-[2.5]" />
                                      </button>
                                      {admin?.id !== user.id && (
                                         <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="p-3 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                                            title="Revoke Access"
                                         >
                                            <Trash2 size={16} className="stroke-[2.5]" />
                                         </button>
                                      )}
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              )}
           </div>
        )}
      </div>

      {/* Access Action Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 font-outfit">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm text-[#1E4D3B] flex items-center justify-center">
                  <ShieldCheck size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingAdmin ? 'Modify Clearance' : 'Establish Access Profile'}</h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Superstructural Governance Matrix</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:bg-gray-200 rounded-xl transition-colors">
                <X size={20} className="stroke-[3]" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleSave} className="overflow-y-auto w-full">
              <div className="p-10 space-y-8">
                
                {!editingAdmin && (
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Identification Handle</label>
                        <input 
                          type="text" 
                          required
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:bg-white focus:ring-4 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all shadow-inner"
                          placeholder="e.g., admin_johndoe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Initial Passcode</label>
                        <input 
                          type="password" 
                          required={!editingAdmin}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:bg-white focus:ring-4 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all shadow-inner"
                          placeholder="••••••••"
                        />
                      </div>
                   </div>
                )}

                <div>
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Hierarchical Role</label>
                   <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 font-bold focus:bg-white focus:ring-4 focus:ring-[#1E4D3B]/10 focus:border-[#1E4D3B]/30 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                   >
                      <option value="admin">Standard Administrator</option>
                      <option value="super_admin">Prime Originator (Super Admin)</option>
                   </select>
                </div>

                <div>
                   <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Granular Clearance Vectors</label>
                   <div className="grid grid-cols-2 gap-3">
                      {availablePermissions.map(perm => {
                         const isActive = formData.permissions.includes(perm);
                         return (
                            <div 
                               key={perm}
                               onClick={() => togglePermission(perm)}
                               className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isActive ? 'bg-[#1E4D3B]/5 border-[#1E4D3B]/20' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                            >
                               <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-[#1E4D3B]' : 'text-slate-500'}`}>{perm.replace('_', ' ')}</span>
                               <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isActive ? 'bg-[#1E4D3B] border-[#1E4D3B] text-white' : 'bg-white border-slate-300'}`}>
                                  {isActive && <CheckCircle2 size={12} className="stroke-[3]" />}
                               </div>
                            </div>
                         );
                      })}
                   </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3 rounded-b-[2.5rem]">
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
                     <><Save size={16} className="stroke-[3]" /> Execute Directive</>
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

export default SettingsManager;
