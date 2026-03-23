import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext.js';
import { fetchData } from '../../utils/api.js';
import LoginBg from '../../assets/login-bg.png';
import Logo from '../../assets/Logo.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetchData('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.token) {
        login(response.token, response.admin);
        navigate('/admin/dashboard');
      } else {
        setError('Verification failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-outfit overflow-hidden text-gray-900">
      {/* Left Column: Visual & Branding (Hidden on mobile) */}
      <div className="hidden md:flex md:w-[50%] lg:w-[60%] xl:w-[65%] relative overflow-hidden bg-[#1E4D3B]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={LoginBg} 
            alt="Healthcare Setting" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1E4D3B] via-[#1E4D3B]/80 to-transparent"></div>
        </div>

        {/* Branding Content */}
        <div className="relative z-10 w-full flex flex-col justify-between p-16 lg:p-24 text-white">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 pr-12 border border-white/20"
          >
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm overflow-hidden">
               <img 
                 src={Logo} 
                 alt="PCHC Logo" 
                 className="w-[300%] max-w-none object-contain" 
                 style={{ objectPosition: '0% 50%' }} // Focus on the graphic part? 
               />
            </div>
            <div className="flex flex-col text-white font-bold tracking-tight leading-tight">
              <span className="text-[12px] opacity-90 uppercase tracking-[0.2em]">Pallotti</span>
              <span className="text-[16px]">Children Hope</span>
              <span className="text-[16px]">Centre</span>
            </div>
          </motion.div>

          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
                Empowering <br />
                <span className="text-green-400">Positive Choices</span> <br />
                Forward.
              </h2>
              <p className="text-xl text-white/70 font-medium leading-relaxed max-w-md">
                Managing specialized health care and rehabilitation services with modern efficiency.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1E4D3B] bg-white/10 backdrop-blur-md overflow-hidden p-0.5 shadow-xl">
                    <img src={`https://i.pravatar.cc/150?u=${i+100}`} alt="Admin" className="w-full h-full rounded-full object-cover grayscale opacity-80" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-white/50 uppercase tracking-widest leading-none">
                Trusted by our <br />dedicated team
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30"
          >
            &copy; 2026 PCHC Inc. All Rights Reserved.
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-green-300/10 rounded-full blur-[80px] pointer-events-none"></div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-white relative">
        <div className="max-w-[420px] w-full space-y-12">
          
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:hidden flex items-center gap-3 mb-10"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shadow-md overflow-hidden border border-gray-100">
                <img 
                  src={Logo} 
                  alt="PCHC Logo" 
                  className="w-[300%] max-w-none object-contain" 
                  style={{ objectPosition: '0% 50%' }}
                />
              </div>
              <div className="flex flex-col text-gray-800 font-bold tracking-tight leading-tight uppercase">
                <span className="text-[10px] opacity-60 tracking-[0.2em]">Pallotti</span>
                <span className="text-[14px]">Children Hope</span>
                <span className="text-[14px]">Centre</span>
              </div>
            </motion.div>
            
            <div className="space-y-2 text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold tracking-tight text-gray-800"
              >
                Admin Gateway
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 font-medium tracking-tight text-sm"
              >
                Enter your administrative credentials to access the secure console.
              </motion.p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-semibold flex items-center gap-3 border border-red-100 shadow-sm overflow-hidden"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600 border border-red-200">
                   <ShieldCheck size={16} />
                </div>
                <div className="flex-1">{error}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-1.5"
            >
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 opacity-80">
                User Identifier
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1E4D3B] transition-colors duration-300">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all duration-300 outline-none font-medium text-gray-700 placeholder:text-gray-300"
                  placeholder="Administrator username"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-1.5"
            >
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest opacity-80">
                  Security Passcode
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1E4D3B] transition-colors duration-300">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-14 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/30 focus:bg-white transition-all duration-300 outline-none font-medium text-gray-700 placeholder:text-gray-300"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#1E4D3B] transition-colors duration-300 outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E4D3B] hover:bg-[#143629] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-green-900/10 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden outline-none"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span className="uppercase tracking-[0.15em] text-[11px]">Verify & Authenticate</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 duration-300" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-10 text-center"
          >
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2.5 text-gray-400 hover:text-[#1E4D3B] font-bold text-[11px] uppercase tracking-widest transition-all duration-300 group outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gray-50 group-hover:bg-[#1E4D3B]/5 flex items-center justify-center transition-all group-hover:shadow-sm">
                <ArrowRight size={14} className="rotate-180" />
              </div>
              Back to main website
            </button>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#1E4D3B]/5 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#1E4D3B]/5 rounded-full blur-[100px] opacity-20 -z-10 flex items-center justify-center">
             <div className="w-32 h-32 border-[20px] border-[#1E4D3B]/5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
