import React from 'react';
import Logo from '../assets/Logo.jpeg';

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-100 flex items-center justify-center p-4">
      {/* Red Vibrating Animation Styles */}
      <style>{`
        @keyframes vibrate {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -2px) rotate(-0.5deg); }
          20% { transform: translate(2px, -1px) rotate(0.5deg); }
          30% { transform: translate(-2px, 2px) rotate(0deg); }
          40% { transform: translate(2px, 1px) rotate(-0.5deg); }
          50% { transform: translate(-1px, -2px) rotate(0.5deg); }
          60% { transform: translate(2px, 2px) rotate(0deg); }
          70% { transform: translate(-2px, 1px) rotate(-0.5deg); }
          80% { transform: translate(1px, -2px) rotate(0.5deg); }
          90% { transform: translate(-1px, 2px) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        .animate-vibrate {
          animation: vibrate 0.25s linear infinite;
        }

        /* Red glowing pulse */
        @keyframes pulse-red-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.45), 0 10px 40px rgba(220, 38, 38, 0.25);
            border-color: rgba(239, 68, 68, 0.7);
          }
          50% {
            box-shadow: 0 0 35px rgba(239, 68, 68, 0.8), 0 15px 60px rgba(220, 38, 38, 0.45);
            border-color: rgba(220, 38, 38, 1);
          }
        }

        .card-red-glow {
          animation: pulse-red-glow 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Red Vibrating Card */}
      <div className="animate-vibrate card-red-glow max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border-2 border-red-500 flex flex-col items-center text-center select-none shadow-2xl">
        
        {/* Logo */}
        <div className="mb-6 relative">
          <img
            src={Logo}
            alt="Pallotti Children's Hope Centre"
            className="h-28 sm:h-36 w-auto object-contain rounded-2xl shadow-sm border border-red-100"
          />
          {/* Red pulsing indicator dot */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
          </span>
        </div>

        {/* Title in Bold Red */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 tracking-tight mb-3">
          Under Maintenance
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base font-medium">
          We will be back soon.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
