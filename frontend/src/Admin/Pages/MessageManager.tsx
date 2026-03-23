import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Search, 
  Trash2, 
  Archive, 
  MessageSquare, 
  Star, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Inbox,
  Send,
  MoreVertical,
  Check,
  ChevronRight,
  Clock,
  User as UserIcon,
  Tag
} from 'lucide-react';
import { fetchData } from '../../utils/api';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const MessageManager: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await fetchData('/contact');
      setMessages(response.data?.messages || []);
    } catch (err) {
      console.error('Failed to load messages:', err);
      setStatusMsg({ type: 'error', text: 'Failed to access communication registry.' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await fetchData(`/contact/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
      setStatusMsg({ type: 'success', text: `Message updated to ${newStatus}` });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      console.error('Failed to update status:', err);
      setStatusMsg({ type: 'error', text: 'Registry update failure.' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you certain you wish to decommission this inquiry from the registry?')) return;
    try {
      await fetchData(`/contact/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      setStatusMsg({ type: 'success', text: 'Inquiry purged from archive.' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      console.error('Failed to delete message:', err);
      setStatusMsg({ type: 'error', text: 'Purge operation failed.' });
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesTab = 
      (activeTab === 'Inbox' && m.status !== 'archived') ||
      (activeTab === 'Archived' && m.status === 'archived');
    
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesTab && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader2 className="animate-spin text-[#1E4D3B] w-12 h-12 stroke-[1.5]" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-outfit">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">Message Center</h1>
           <p className="text-gray-400 font-medium text-sm tracking-wide uppercase opacity-70">Monitor and govern institutional inquiries and correspondence.</p>
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
                placeholder="Search archive..." 
                className="pl-12 pr-6 py-4 bg-transparent text-sm font-medium outline-none focus:ring-4 focus:ring-[#1E4D3B]/5 transition-all w-full md:w-80"
             />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Inbox List Section */}
        <div className="xl:col-span-4 lg:col-span-5 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 overflow-hidden">
              <div className="p-4 bg-gray-50/20 border-b border-gray-50 flex items-center justify-around">
                 {['Inbox', 'Archived'].map((tab) => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-8 py-3 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all ${
                        activeTab === tab 
                        ? 'bg-[#1E4D3B] text-white shadow-xl shadow-green-900/20' 
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                      }`}
                    >
                      {tab === 'Inbox' && <Inbox size={14} className="inline mr-2 -mt-0.5" />}
                      {tab === 'Archived' && <Archive size={14} className="inline mr-2 -mt-0.5" />}
                      {tab}
                    </button>
                 ))}
              </div>
              
              <div className="divide-y divide-gray-50 max-h-[700px] overflow-y-auto no-scrollbar">
                 {filteredMessages.length === 0 ? (
                    <div className="p-20 text-center">
                       <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-200 mb-4 border border-gray-100">
                          <MessageSquare size={32} strokeWidth={1} />
                       </div>
                       <p className="p-10 text-center text-gray-300 font-black text-[10px] uppercase tracking-widest leading-loose">The communication registry is currently clear.</p>
                    </div>
                 ) : filteredMessages.map((m) => (
                    <div 
                      key={m.id} 
                      onClick={() => {
                        setSelectedMessage(m);
                        if (m.status === 'unread') handleStatusUpdate(m.id, 'read');
                      }}
                      className={`p-6 transition-all hover:bg-gray-50/50 cursor-pointer border-l-4 group relative ${
                        selectedMessage?.id === m.id ? 'bg-[#1E4D3B]/[0.02] border-[#1E4D3B]' : 'border-transparent'
                      }`}
                    >
                       <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm border-2 transition-all ${
                            m.status === 'unread' 
                            ? 'bg-green-50 text-[#1E4D3B] border-green-100 shadow-inner' 
                            : 'bg-gray-50 text-gray-400 border-gray-100'
                          }`}>
                             {m.name.charAt(0)}
                          </div>
                          
                          <div className="flex-grow min-w-0">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm font-black tracking-tight truncate ${m.status === 'unread' ? 'text-gray-900' : 'text-gray-500'}`}>{m.name}</h4>
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter whitespace-nowrap ml-2">{formatDate(m.created_at)}</span>
                             </div>
                             <p className={`text-xs truncate transition-all ${m.status === 'unread' ? 'font-black text-[#1E4D3B]' : 'font-medium text-gray-400'}`}>
                                {m.subject || 'Institutional Inquiry'}
                             </p>
                             <p className="text-[10px] text-gray-300 truncate font-medium mt-1 uppercase tracking-tight opacity-70">{m.message}</p>
                          </div>
                          
                          {m.status === 'unread' && (
                            <div className="w-2.5 h-2.5 bg-[#1E4D3B] rounded-full mt-1.5 shadow-lg shadow-green-900/40"></div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="p-8 bg-[#1E4D3B]/[0.02] rounded-[2rem] border border-[#1E4D3B]/[0.03] text-center">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Governance Node #812 • Active Monitoring</p>
           </div>
        </div>

        {/* Message Detail Pane */}
        <div className="xl:col-span-8 lg:col-span-7">
           {selectedMessage ? (
             <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 p-12 relative animate-in zoom-in-95 duration-500 flex flex-col min-h-[600px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-50 pb-10">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-[1.75rem] bg-[#1E4D3B] text-white flex items-center justify-center font-black text-3xl shadow-2xl shadow-green-900/20">
                         {selectedMessage.name.charAt(0)}
                      </div>
                      <div>
                         <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-3">{selectedMessage.subject || 'Subject Archive #'+selectedMessage.id}</h2>
                         <div className="flex flex-wrap gap-2 items-center">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100">
                               <UserIcon size={12} className="stroke-[3]" /> {selectedMessage.name}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100">
                               <Mail size={12} className="stroke-[3]" /> {selectedMessage.email}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#1E4D3B]/5 text-[#1E4D3B] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#1E4D3B]/10">
                               <Clock size={12} className="stroke-[3]" /> {formatDate(selectedMessage.created_at)}
                            </span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(selectedMessage.id, selectedMessage.status === 'unread' ? 'read' : 'unread')}
                        className="p-3 bg-gray-50 hover:bg-white hover:shadow-md text-gray-400 hover:text-[#1E4D3B] rounded-xl transition-all border border-transparent hover:border-gray-100"
                        title="Toggle Unread"
                      >
                         <Mail size={20} className="stroke-[2.5]" />
                      </button>
                      <button 
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100"
                        title="Decommission Permanent"
                      >
                         <Trash2 size={20} className="stroke-[2.5]" />
                      </button>
                      <button 
                        onClick={() => setSelectedMessage(null)}
                        className="p-3 bg-gray-50 hover:bg-white hover:shadow-md text-gray-400 rounded-xl transition-all border border-transparent hover:border-gray-100"
                      >
                         <X size={20} className="stroke-[2.5]" />
                      </button>
                   </div>
                </div>
                
                <div className="flex-grow">
                   <div className="bg-gray-50/30 rounded-[2rem] p-10 border border-gray-50 shadow-inner relative overflow-hidden group">
                      <div className="absolute top-8 left-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                         <MessageSquare size={128} strokeWidth={1} />
                      </div>
                      <div className="relative z-10 text-gray-700 leading-loose text-lg font-medium whitespace-pre-wrap selection:bg-[#1E4D3B] selection:text-white">
                         {selectedMessage.message}
                      </div>
                   </div>
                </div>

                <div className="mt-12 pt-10 border-t border-gray-50 flex flex-wrap gap-4 items-center justify-between">
                   <div className="flex items-center gap-3">
                      <a 
                        href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                        className="px-10 py-5 bg-[#1E4D3B] hover:bg-[#143629] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-green-900/20 transition-all flex items-center gap-3 active:scale-95"
                      >
                         <Send size={18} className="stroke-[3]" />
                         Initiate Official Reply
                      </a>
                      <button 
                         onClick={() => handleStatusUpdate(selectedMessage.id, selectedMessage.status === 'archived' ? 'read' : 'archived')}
                         className="px-10 py-5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95"
                      >
                         {selectedMessage.status === 'archived' ? 'Re-activate inquiry' : 'Archive for Records'}
                      </button>
                   </div>
                   
                   <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      <Tag size={12} className="stroke-[3]" /> CLASSIFIED • {selectedMessage.status.toUpperCase()}
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 p-24 flex flex-col items-center justify-center text-center h-full min-h-[600px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-50/20 opacity-40"></div>
                <div className="relative z-10 space-y-8 animate-in zoom-in-95 duration-1000">
                   <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto text-gray-100 border border-gray-50">
                      <Inbox size={48} strokeWidth={1} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3 uppercase tracking-wider">Registry Explorer</h3>
                      <p className="text-slate-400 text-sm font-medium max-w-sm mx-auto leading-relaxed opacity-80">Select an active inquiry from the communication stream to review official correspondence and initiate governed responses.</p>
                   </div>
                   <div className="w-12 h-1 text-gray-100 bg-gray-100 rounded-full mx-auto"></div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default MessageManager;
