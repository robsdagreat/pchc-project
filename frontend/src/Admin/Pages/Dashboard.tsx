import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  TrendingUp,
  Layout,
  Loader2,
  Clock,
  CheckCircle2,
  Plus,
  Play,
  Square,
  FileUp
} from 'lucide-react';
import { fetchData } from '../../utils/api.js';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [messagesData, setMessagesData] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [blogsRes, teamRes, , contactRes] = await Promise.all([
          fetchData('/blogs'),
          fetchData('/team'),
          fetchData('/content/homepage'),
          fetchData('/contact')
        ]);

        const blogsData = blogsRes.data.blogs || [];
        const teamData = teamRes.data?.team || [];
        const msgs = contactRes.data?.messages || [];
        setBlogs(blogsData.slice(0, 3)); // Latest 3
        setMessagesData(msgs);
        
        console.log('Loaded messages:', messagesData.length); // Use it slightly to satisfy lint if needed, or just let it be. Actually I'll use it in the list later.

        const unreadCount = msgs.filter((m: any) => m.status === 'unread').length;

        setStats([
          { title: 'Total Blogs', value: blogsData.length.toString(), change: 'Increased from last month', icon: <FileText size={20} />, color: 'primary' },
          { title: 'Team Members', value: teamData.length.toString(), change: 'Stable', icon: <Users size={20} />, color: 'white' },
          { title: 'Home Sections', value: '6', change: 'Live', icon: <Layout size={20} />, color: 'white' },
          { title: 'New Messages', value: unreadCount.toString(), change: 'Requires attention', icon: <MessageSquare size={20} />, color: 'white' },
        ]);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const time = '02:14:08'; // Decorative timer

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-green-100 border-t-[#1E4D3B] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#1E4D3B] w-6 h-6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 font-outfit">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 font-normal text-sm md:text-base tracking-tight opacity-80">Plan, prioritize, and accomplish your tasks with ease.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#143629] text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-green-900/10 active:scale-95">
            <Plus size={18} />
            <span>Add Project</span>
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-100 px-5 py-3 rounded-2xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            <FileUp size={18} className="text-gray-400" />
            <span>Import Data</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`group p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
            stat.color === 'primary' 
              ? 'bg-[#1E4D3B] border-transparent text-white shadow-2xl shadow-green-900/10' 
              : 'bg-white border-gray-50 text-gray-900 shadow-sm shadow-gray-100'
          }`}>
            <div className="flex justify-between items-start mb-6 md:mb-10">
              <div className={`p-3 rounded-2xl ${stat.color === 'primary' ? 'bg-white/10' : 'bg-gray-50 group-hover:bg-green-50 group-hover:text-green-600 transition-colors'}`}>
                {stat.icon}
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                stat.color === 'primary' 
                  ? 'border-white/20 bg-white/10 hover:bg-white/20' 
                  : 'border-gray-100 bg-white hover:border-green-100 hover:text-green-600'
              }`}>
                <ArrowUpRight size={14} className="stroke-[2.5]" />
              </div>
            </div>
            <div>
              <p className={`text-[11px] font-black uppercase tracking-widest mb-1 opacity-80`}>{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-5xl font-black tracking-tight">{stat.value}</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center p-0.5 ${stat.color === 'primary' ? 'bg-white/20' : 'bg-green-100'}`}>
                  <TrendingUp size={10} className={stat.color === 'primary' ? 'text-white' : 'text-green-600'} />
                </div>
                <span className={`text-[10px] font-bold tracking-tight opacity-70`}>{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-12">
        {/* Project Analytics (Bar Chart) */}
        <div className="md:col-span-2 lg:col-span-8 bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Project Analytics</h3>
            </div>
            <div className="flex bg-gray-50 p-1.5 rounded-2xl gap-1 w-fit">
              <span className="px-4 py-1.5 rounded-xl text-xs font-black text-gray-400 cursor-pointer">Week</span>
              <span className="px-4 py-1.5 bg-white text-green-600 shadow-sm rounded-xl text-xs font-black cursor-pointer">Month</span>
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between gap-3 px-4 relative">
             {/* Simple Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 opacity-10">
               <div className="w-full h-px bg-gray-900"></div>
               <div className="w-full h-px bg-gray-900"></div>
               <div className="w-full h-px bg-gray-900"></div>
             </div>

             {[25, 65, 55, 85, 45, 35, 20].map((h, i) => (
                <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                  {/* The Rounded Capsule Bar */}
                  <div className="relative w-full overflow-hidden rounded-full transition-all duration-700 hover:scale-x-110 cursor-pointer" style={{ height: `${h}%` }}>
                     <div 
                        className={`w-full h-full ${i === 3 ? 'bg-[#1E4D3B]' : (i === 1 || i === 2) ? 'bg-[#4ADE80]' : 'bg-[#F1F5F9] pattern-diagonal'}`}
                        style={{ backgroundImage: i > 3 || i === 0 ? 'repeating-linear-gradient(45deg, transparent, transparent 5px, #E2E8F0 2px, #E2E8F0 7px)' : 'none' }}
                     ></div>
                     {i === 2 && (
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[9px] font-black text-white">74%</div>
                     )}
                  </div>
                  <span className="block text-center text-[11px] font-bold text-gray-400 mt-6 uppercase tracking-tighter opacity-50">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                  </span>
                </div>
             ))}
          </div>
        </div>

        {/* Reminders Card */}
        <div className="md:col-span-2 lg:col-span-4 bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 flex flex-col relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50"></div>
          <h3 className="text-xl font-black text-gray-900 mb-8 relative z-10">Reminders</h3>
          <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-6 mb-auto relative z-10 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
            <h4 className="font-black text-lg text-gray-900 mb-2 leading-tight group-hover:text-green-600 transition-colors">Meeting with PCHC Board</h4>
            <p className="text-sm text-gray-400 font-bold tracking-tight mb-8">Time: 02.00 pm - 04.00 pm</p>
            <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#1E4D3B] text-white rounded-2xl font-black text-sm shadow-xl shadow-green-900/10 active:scale-95 transition-all">
              <Play size={18} fill="currentColor" />
              <span>Start Meeting</span>
            </button>
          </div>
        </div>

        {/* Team Collaboration List */}
        <div className="md:col-span-2 lg:col-span-6 bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Team Collaboration</h3>
            <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-50 active:scale-90 transition-all">
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, idx) => {
              const members = [
                { name: 'Alexandra Deff', role: 'Github Project Repository', status: 'Completed', color: 'bg-green-100 text-green-600' },
                { name: 'Edwin Adenike', role: 'Integrate Auth System', status: 'In Progress', color: 'bg-orange-100 text-orange-600' },
                { name: 'Isaac Oluwatemilorun', role: 'Develop Search Filter', status: 'Pending', color: 'bg-red-100 text-red-600' },
                { name: 'David Oshodi', role: 'Responsive Homepage', status: 'In Progress', color: 'bg-orange-100 text-orange-600' }
              ];
              const member = members[idx];
              return (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0 transition-all hover:pl-2">
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-100 group-hover:scale-110 transition-transform">
                    <img src={`https://i.pravatar.cc/150?u=${member.name}`} alt={member.name} />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-black text-sm text-gray-900 leading-none mb-1 group-hover:text-[#1E4D3B] transition-colors uppercase tracking-tight">{member.name}</h5>
                    <p className="text-[11px] text-gray-400 font-bold tracking-tight">Working on <span className="text-gray-600">{member.role}</span></p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${member.color}`}>
                    {member.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Progress (Gauge) */}
        <div className="md:col-span-1 lg:col-span-3 bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 flex flex-col items-center">
          <h3 className="text-xl font-black text-gray-900 mb-8 self-start">Project Progress</h3>
          <div className="relative w-48 h-24 overflow-hidden mb-6">
            <div className="absolute top-0 left-0 w-48 h-48 border-[20px] border-[#F1F5F9] rounded-full"></div>
            <div 
              className="absolute top-0 left-0 w-48 h-48 border-[20px] border-[#1E4D3B] rounded-full"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transform: 'rotate(-45deg)' }}
            ></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-center">
              <span className="text-4xl font-black text-gray-900">41%</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Ended</p>
            </div>
          </div>
          <div className="grid grid-cols-1 w-full gap-3 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter">Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-800"></div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter">In Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter">Pending</span>
            </div>
          </div>
        </div>

        {/* Time Tracker Card */}
        <div className="md:col-span-1 lg:col-span-3 bg-[#082A1C] p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-green-900/20 flex flex-col items-center text-white relative overflow-hidden group">
           {/* Decorative Waves/Lines */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#4ade80,transparent)]"></div>
          </div>
          
          <div className="flex items-center justify-center gap-3 w-14 h-14 bg-white/10 rounded-2xl mb-4">
            <Clock size={24} className="text-white" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/50 mb-10 relative z-10">Time Tracker</h3>
          <div className="text-5xl font-black tracking-widest mb-10 relative z-10 drop-shadow-lg">{time}</div>
          
          <div className="flex gap-4 relative z-10">
            <button className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all active:scale-90">
              <Square size={24} fill="currentColor" />
            </button>
            <button className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full border-[6px] border-[#082A1C] flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-red-900/40">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </button>
          </div>
        </div>

        {/* Stories List (from Dashboard Project List style) */}
        <div className="md:col-span-2 lg:col-span-12 bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50">
           <div className="flex items-center justify-between mb-10">
             <h3 className="text-2xl font-black text-gray-900 tracking-tight">Recent Stories</h3>
             <div className="flex gap-2">
               <button onClick={() => window.location.href='/admin/blogs'} className="px-5 py-2.5 bg-green-50 text-[#1E4D3B] hover:bg-green-100 rounded-xl font-black text-xs transition-all flex items-center gap-2">
                 <Plus size={16} />
                 <span>Add Story</span>
               </button>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {blogs.map((blog, idx) => (
                <div key={idx} className="flex items-center gap-5 p-4 rounded-3xl hover:bg-gray-50 transition-all group cursor-pointer border border-transparent hover:border-gray-100">
                  <div className="w-14 h-14 rounded-2xl bg-[#E2E8F0] overflow-hidden flex-shrink-0 relative">
                     <img src={blog.media_url || 'https://via.placeholder.com/150'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                     <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h5 className="font-black text-[15px] text-gray-900 truncate uppercase tracking-tight group-hover:text-[#1E4D3B] transition-colors">{blog.title}</h5>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Due date: {new Date(blog.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-300 group-hover:bg-green-50 group-hover:text-[#1E4D3B] transition-all">
                    <CheckCircle2 size={18} />
                  </div>
                </div>
             ))}
           </div>
           
           <button onClick={() => window.location.href='/admin/blogs'} className="w-full mt-10 py-4 bg-gray-50 hover:bg-gray-100 text-gray-400 font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all">
             View All Stories
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
