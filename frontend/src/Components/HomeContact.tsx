import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Loader2, CheckCircle2 } from 'lucide-react';
import { fetchData } from '../utils/api.js';
import { HOME_CONTENT } from '../constants/content';

const HomeContact = () => {
  const { contact } = HOME_CONTENT;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fetchData('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Inquiry from Get In Touch (Homepage)',
          message: formData.message
        })
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full relative py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#FCF8F2] pb-16 lg:pb-0">
      <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-6">
        <div className="max-w-6xl mx-auto relative group">
          {/* Main Card */}
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 relative z-10">
            
            {/* Left Side: Form */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-1 lg:mb-2">{contact.title}</h2>
              <p className="text-gray-500 mb-6 lg:mb-8 text-sm sm:text-base">{contact.subtitle}</p>
              
              {submitted ? (
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in duration-500">
                   <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                      <CheckCircle2 size={24} />
                   </div>
                   <h3 className="text-lg font-bold text-green-800">Message Sent!</h3>
                   <p className="text-green-600 text-sm">Thank you for reaching out. We've received your message and will get back to you shortly.</p>
                   <button onClick={() => setSubmitted(false)} className="text-sm font-bold text-green-600 hover:text-green-700 underline mt-2">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <p className="text-red-500 text-sm font-semibold p-3 bg-red-50 rounded-xl">{error}</p>}
                  <div>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name" 
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400 outline-none text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email address" 
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400 outline-none text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Go ahead, we are listening..." 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400 resize-none outline-none text-sm sm:text-base"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full border-2 border-green-500 font-bold py-3 pt-3.5 rounded-lg transition-all duration-300 text-center text-xs md:text-sm uppercase tracking-widest mt-2 shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed bg-green-500 text-white hover:bg-green-600"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : 'Submit'}
                  </button>
                </form>
              )}
            </div>

            {/* Right Side: Info & Image */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 bg-gray-50/10 flex flex-col items-center lg:items-start pb-12 lg:pb-10">
              {/* Top area with caring imagery */}
              <div className="relative mb-8 w-full">
                <div className="w-full h-40 sm:h-56 md:h-64 lg:h-48 rounded-2xl overflow-hidden shadow-lg bg-white p-1.5">
                  <img 
                    src={contact.image} 
                    alt="Caring and Connection" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Stylized background shape */}
                <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-full blur-2xl -z-10"></div>
              </div>

              {/* Contact Details */}
              <div className="space-y-5 w-full max-w-sm lg:pr-8">
                <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md rounded-xl flex items-center justify-center text-green-600 border border-green-50 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-0.5">Address</span>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base leading-tight">{contact.details.address}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md rounded-xl flex items-center justify-center text-green-600 border border-green-50 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-0.5">Phone</span>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base leading-tight">{contact.details.phone}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md rounded-full flex items-center justify-center text-green-600 border border-green-50 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-0.5">Email</span>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base leading-tight break-all sm:break-normal">{contact.details.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Floating Sidebar - Arranged horizontally on mobile, vertically on desktop */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex flex-row lg:flex-col gap-6 lg:gap-4 bg-green-600 py-3.5 px-8 lg:py-6 lg:px-3.5 rounded-[2rem] shadow-[0_10px_30px_rgba(22,163,74,0.3)] border-[4px] lg:border-[5px] border-white z-20 transition-transform duration-500 hover:scale-105 lg:top-1/2 lg:left-auto lg:right-0 lg:-translate-y-1/2 lg:translate-x-1/2">
            <a href={contact.socials.facebook} className="text-white hover:text-green-100 transition-all transform hover:scale-125 focus:outline-none">
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </a>
            <a href={contact.socials.instagram} className="text-white hover:text-green-100 transition-all transform hover:scale-125 focus:outline-none">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </a>
            <a href={contact.socials.twitter} className="text-white hover:text-green-100 transition-all transform hover:scale-125 focus:outline-none">
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
