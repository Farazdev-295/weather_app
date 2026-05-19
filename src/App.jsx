// App.jsx
import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import { useWeather } from './hooks/useWeather';

function App() {
  const {
    weather,
    forecast,
    loading,
    error,
    recentSearches,
    getWeather,
    getWeatherByLocation
  } = useWeather();

  // Load default city on mount
  useEffect(() => {
    getWeather('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-premium">
      <Navbar onRefresh={() => weather && getWeather(weather.name)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Welcome Screen - Jab koi weather data nahi hai */}
        {!weather && !loading && !error && (
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-12 md:p-20 text-center animate-fade-in">
            <div className="text-7xl md:text-8xl mb-6 animate-float">🌤️</div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent mb-3">
              Weather Pro
            </h1>
            <p className="text-white/60 text-lg">Get real-time weather updates for any city worldwide</p>
            <p className="text-white/40 text-sm mt-4">Search for a city or use your current location</p>
          </div>
        )}

        {/* Search Bar Component */}
        <SearchBar
          onSearch={getWeather}
          onUseLocation={getWeatherByLocation}
          loading={loading}
          recentSearches={recentSearches}
        />

        {/* Error Alert - Agar koi error hai */}
        {error && <ErrorAlert message={error} onDismiss={() => window.location.reload()} />}

        {/* Loading Spinner - Jab data fetch ho raha hai */}
        {loading && <LoadingSpinner />}

        {/* Weather Display - Jab data aa gaya */}
        {weather && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Weather Card - Left Side (4 columns on desktop) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <WeatherCard weather={weather} />
            </div>
            
            {/* Forecast Card - Right Side (8 columns on desktop) */}
            <div className="lg:col-span-7 xl:col-span-8">
              {forecast && <ForecastCard forecast={forecast} />}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center border-t border-white/10">
       <p className="text-white/40 text-sm">
  🌍 Weather data provided by OpenWeatherMap | Created by <strong className="text-amber-400">Faraz Shahbaz</strong>
</p>
        <p className="text-white/30 text-xs mt-2">
          © 2025 WeatherPro | Your Personal Weather Companion
        </p>
      </footer>
    </div>
  );
}

export default App;