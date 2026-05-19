// components/SearchBar.jsx
import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const SearchBar = ({ onSearch, onUseLocation, loading, recentSearches }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  const popularCities = ['London', 'Dubai', 'Karachi', 'New York', 'Tokyo', 'Paris', 'Sydney'];

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-4 md:p-6 mb-6 animate-fade-in">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              placeholder="🔍 Search any city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSearch className="text-sm" /> Search
          </button>
          <button
            type="button"
            onClick={onUseLocation}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaMapMarkerAlt className="text-sm" /> Location
          </button>
        </div>
      </form>

      {/* Popular Cities */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-white/60 text-sm">🔥 Popular:</span>
        {popularCities.map(cityName => (
          <button
            key={cityName}
            onClick={() => onSearch(cityName)}
            disabled={loading}
            className="px-3 py-1 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-all disabled:opacity-50"
          >
            {cityName}
          </button>
        ))}
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-white/60 text-sm">🕐 Recent:</span>
          {[...new Set(recentSearches)].slice(0, 5).map((search, idx) => (
            <button
              key={idx}
              onClick={() => onSearch(search)}
              disabled={loading}
              className="px-3 py-1 rounded-full bg-white/5 text-white/80 text-sm hover:bg-white/20 transition-all disabled:opacity-50"
            >
              {search}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;