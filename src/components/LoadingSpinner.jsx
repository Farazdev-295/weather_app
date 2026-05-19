// components/LoadingSpinner.jsx - Simple Version
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-12 text-center animate-fade-in">
      {/* Simple Spinner */}
      <div className="w-16 h-16 mx-auto border-4 border-white/20 border-t-amber-500 rounded-full animate-spin"></div>
      <p className="text-white/80 mt-6">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;