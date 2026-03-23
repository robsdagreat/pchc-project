import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, DollarSign, Globe, Users, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { fetchData } from '../utils/api';

interface DonationTierProps {
  amount?: number;
  description: string;
  isCustom?: boolean;
  isActive: boolean;
  onClick: () => void;
}

const DonationTier: React.FC<DonationTierProps> = ({ amount, description, isCustom, isActive, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 ${
      isActive 
      ? 'bg-white border-green-500 shadow-xl shadow-green-100' 
      : 'bg-white border-transparent hover:border-green-200'
    }`}
  >
    <div className="flex flex-col h-full">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-500'}`}>
        {isCustom ? <DollarSign size={20} /> : <Heart size={20} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1 font-serif">
        {isCustom ? 'Custom Amount' : `$${amount}`}
      </h3>
      <p className="text-gray-500 text-[11px] font-outfit mb-4 flex-grow">
        {description}
      </p>
      <div className={`mt-auto flex items-center gap-2 text-sm font-bold font-outfit uppercase tracking-wider ${isActive ? 'text-green-500' : 'text-gray-300'}`}>
        {isActive && <CheckCircle2 size={16} />}
        <span>{isActive ? 'Selected' : 'Select'}</span>
      </div>
    </div>
  </motion.div>
);

const Donate = () => {
  const [tiers, setTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | 'custom' | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);

  useEffect(() => {
    const loadTiers = async () => {
      try {
        const response = await fetchData('/donations/tiers');
        const tiersArray = response.data.tiers;
        const formattedTiers = tiersArray.map((t: any) => ({
          ...t,
          description: t.impact_description,
          amount: parseFloat(t.amount)
        }));
        setTiers(formattedTiers);
        if (formattedTiers.length > 0) {
          setSelectedTier(formattedTiers[1]?.amount || formattedTiers[0].amount);
        }
      } catch (err) {
        setError('Failed to load donation tiers.');
      } finally {
        setLoading(false);
      }
    };
    loadTiers();
  }, []);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedTier === 'custom' ? customAmount : selectedTier;
    console.log(`Processing ${isMonthly ? 'monthly' : 'one-time'} donation of $${finalAmount}`);
    alert("This is a demonstration. Thank you for your interest in supporting our cause!");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FCF8F2]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#FCF8F2] font-bold text-red-500">{error}</div>;

  return (
    <div className="w-full bg-[#FCF8F2] min-h-screen pt-40 pb-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 flex items-start justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          
          {/* Left Side: Impact & Content */}
          <div className="flex flex-col lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-green-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block font-outfit">Make a Difference</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight font-serif">
                Your Support <span className="text-green-500">Changes Lives</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-outfit font-light mb-8 max-w-xl">
                Every contribution to Pallotti Children Hope Center directly impacts the lives of vulnerable children. Join us in our mission to provide education, care, and a future full of possibility.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-green-500 shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-0.5 font-serif uppercase tracking-wider text-[13px]">Global Transparency</h4>
                    <p className="text-xs text-gray-500 font-outfit">100% of your donation is used for direct project implementation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-green-500 shrink-0">
                    <Users size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-0.5 font-serif uppercase tracking-wider text-[13px]">Empowering Communities</h4>
                    <p className="text-xs text-gray-500 font-outfit">We work locally to ensure sustainable development.</p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white/50 border border-white p-6 rounded-3xl flex items-center gap-6 max-w-sm">
                <ShieldCheck className="text-green-500 w-12 h-12" />
                <div>
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-1 font-outfit">Secure Donation</h5>
                  <p className="text-[10px] text-gray-400 font-outfit uppercase tracking-wider">PCI-DSS Compliant & End-to-End Encryption</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Donation Form */}
          <div className="w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-green-900/5 border border-gray-100 w-full max-w-[550px]"
            >
              {/* Toggle One-time/Monthly */}
              <div className="flex bg-[#FCF8F2] p-1.5 rounded-2xl mb-8 w-full">
                <button 
                  onClick={() => setIsMonthly(false)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 font-outfit ${!isMonthly ? 'bg-white shadow-md text-green-600' : 'text-gray-400'}`}
                >
                  One-Time
                </button>
                <button 
                  onClick={() => setIsMonthly(true)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 font-outfit ${isMonthly ? 'bg-white shadow-md text-green-600' : 'text-gray-400'}`}
                >
                  Monthly
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-8 border-l-4 border-green-500 pl-4 font-serif uppercase tracking-wide">Choose an Amount</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {tiers.map((tier) => (
                  <DonationTier
                    key={tier.amount}
                    amount={tier.amount}
                    description={tier.description}
                    isActive={selectedTier === tier.amount}
                    onClick={() => setSelectedTier(tier.amount)}
                  />
                ))}
                <DonationTier
                  isCustom={true}
                  description="Enter whatever amount you can spare."
                  isActive={selectedTier === 'custom'}
                  onClick={() => setSelectedTier('custom')}
                />
              </div>

              <AnimatePresence>
                {selectedTier === 'custom' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-8 overflow-hidden"
                  >
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                      <input 
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Enter custom amount"
                        className="w-full bg-[#FCF8F2] border-2 border-transparent focus:border-green-500 rounded-2xl py-4 pl-10 pr-4 outline-none font-bold transition-all font-outfit"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleDonate}>
                <button 
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-3xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-green-200 uppercase tracking-[0.2em] text-[11px] mb-8 font-outfit"
                >
                  Donate Now
                </button>
              </form>

              <div className="flex flex-col items-center">
                <div className="flex gap-4 opacity-40 mb-4 grayscale">
                  <CreditCard size={24} />
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center max-w-[250px] font-outfit">
                  By donating, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donate;
