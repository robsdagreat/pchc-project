import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  HelpCircle,
  Mail,
  Smartphone,
  Command,
  Heart,
  Search
} from 'lucide-react';
import { useAuth } from '../../Context/AuthContext.js';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { title: 'Content Manager', icon: <Settings size={20} />, path: '/admin/content' },
    { title: 'Blogs', icon: <FileText size={20} />, path: '/admin/blogs' },
    { title: 'Team', icon: <Users size={20} />, path: '/admin/team' },
    { title: 'Gallery', icon: <ImageIcon size={20} />, path: '/admin/gallery' },
    { title: 'Messages', icon: <MessageSquare size={20} />, path: '/admin/messages' },
    { title: 'Donations', icon: <Heart size={20} />, path: '/admin/donations' },
  ];

  const generalItems = [
    { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    { title: 'Help', icon: <HelpCircle size={20} />, path: '/admin/help' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-outfit text-gray-900">
      {/* Sidebar Backdrop for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer">
              <div className="w-10 h-10 bg-[#1E4D3B] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-900/10">
                <LayoutDashboard size={22} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 font-outfit uppercase">PCHC <span className="text-[#1E4D3B]">Admin</span></span>
            </div>
            
            {/* Close Button Mobile - Improved Spacing */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-3 -mr-2 text-gray-400 hover:bg-gray-50 rounded-2xl transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-grow space-y-8 overflow-y-auto overflow-x-hidden no-scrollbar">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 px-4">Menu</p>
              <div className="space-y-1.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-[#1E4D3B] text-white shadow-xl shadow-green-900/20 translate-x-1' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#1E4D3B]'
                    }`}
                  >
                    <span className={`${location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-[#1E4D3B] transition-colors'}`}>
                      {item.icon}
                    </span>
                    <span className="font-bold text-[14px] tracking-wide">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 px-4">General</p>
              <div className="space-y-1.5">
                {generalItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-[#1E4D3B] text-white shadow-xl shadow-green-900/20 translate-x-1' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#1E4D3B]'
                    }`}
                  >
                    <span className={`${location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-[#1E4D3B] transition-colors'}`}>
                      {item.icon}
                    </span>
                    <span className="font-bold text-[14px] tracking-wide">{item.title}</span>
                  </Link>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all group duration-300"
                >
                  <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                  <span className="font-bold text-[14px] tracking-wide">Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile App Download Card */}
            <div className="relative mt-8 px-2 group">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A2E1F] p-5 text-white shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                    <Smartphone size={20} className="text-white" />
                  </div>
                  <h4 className="font-black text-sm mb-1 uppercase tracking-tight">PCHC Mobile</h4>
                  <p className="text-[10px] text-white/50 mb-4 leading-relaxed font-light">Manage your content anywhere with our mobile app.</p>
                  <button className="w-full py-2.5 bg-[#1E4D3B] hover:bg-[#143629] text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all shadow-lg shadow-green-900/40">
                    Get It Now
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

  {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 min-w-0 ${sidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors md:hidden">
              <Search size={20} />
            </button>
          </div>

          <div className="hidden md:flex items-center group relative w-full md:max-w-md lg:max-w-lg transition-all duration-300">
            <div className="absolute left-4 z-10 text-gray-400 group-focus-within:text-[#1E4D3B] transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search tasks, blogs..." 
              className="bg-white/50 border border-gray-100 rounded-[1.5rem] pl-12 pr-12 py-3 text-sm w-full outline-none focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 transition-all font-medium placeholder:text-gray-400 shadow-sm shadow-gray-100/20"
            />
            <div className="absolute right-4 hidden lg:flex items-center gap-1 bg-gray-50 border border-gray-200/50 rounded-lg px-2 py-1 select-none pointer-events-none">
              <Command size={10} className="text-gray-400" />
              <span className="text-[10px] font-black text-gray-400 uppercase">F</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 relative group">
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 relative group">
                <Bell size={20} className="group-hover:scale-110 transition-transform" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-[#1E4D3B] rounded-full border-2 border-white animate-pulse"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-gray-100 group cursor-pointer hover:bg-gray-50/50 transition-colors py-1 px-1.5 rounded-2xl">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{admin?.username || 'Admin'}</p>
                <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{admin?.username ? `${admin.username.toLowerCase()}@pchc.org` : 'admin@pchc.org'}</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-xl p-0.5 flex items-center justify-center text-gray-500 overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                 <img src={`https://ui-avatars.com/api/?name=${admin?.username || 'Admin'}&background=1e4d3b&color=fff&bold=true`} alt="Avatar" className="w-full h-full object-cover rounded-[0.5rem]" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
