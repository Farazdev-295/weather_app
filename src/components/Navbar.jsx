// components/Navbar.jsx
import React from 'react';
import { WiDaySunny } from 'react-icons/wi';
import { FaSyncAlt } from 'react-icons/fa';

const Navbar = ({ onRefresh }) => {
  return (
    <nav className="backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-3">
            <WiDaySunny className="text-3xl md:text-4xl text-amber-400 animate-float" />
            <div>
              <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
               Faraz's <span className="text-amber-400">WeatherPro</span>
              </span>
              <p className="text-white/40 text-xs hidden sm:block">Real-time Weather Updates</p>
            </div>
          </div>
          
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 md:px-4 md:py-2 rounded-full text-white text-sm md:text-base transition-all duration-300 "
          >
            <FaSyncAlt className="text-xs md:text-sm" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;