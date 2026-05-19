// components/ErrorAlert.jsx
import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';

const ErrorAlert = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-500/90 backdrop-blur-sm rounded-xl p-4 mb-6 flex items-center justify-between animate-fade-in border border-red-400/30">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <span className="text-white font-semibold">Error!</span>
          <span className="text-white/90 ml-2">{message}</span>
        </div>
      </div>
      <button 
        onClick={onDismiss} 
        className="text-white/70 hover:text-white transition-all duration-200 hover:rotate-90"
      >
        <IoCloseCircle size={24} />
      </button>
    </div>
  );
};

export default ErrorAlert;