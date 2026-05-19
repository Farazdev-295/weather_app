// components/WeatherCard.jsx
import React from 'react';
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny, WiCloudy, WiRaindrop } from 'react-icons/wi';
import { FaTemperatureLow, FaTemperatureHigh } from 'react-icons/fa';

const WeatherCard = ({ weather }) => {
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const details = [
    { icon: <WiHumidity size={28} />, label: 'Humidity', value: `${weather.main?.humidity}%`, gradient: 'from-cyan-400 to-blue-500' },
    { icon: <WiStrongWind size={28} />, label: 'Wind Speed', value: `${Math.round(weather.wind?.speed)} km/h`, gradient: 'from-emerald-400 to-teal-500' },
    { icon: <WiBarometer size={28} />, label: 'Pressure', value: `${weather.main?.pressure} hPa`, gradient: 'from-orange-400 to-red-500' },
    { icon: <WiDaySunny size={28} />, label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, gradient: 'from-yellow-400 to-amber-500' },
    { icon: <WiCloudy size={28} />, label: 'Clouds', value: `${weather.clouds?.all}%`, gradient: 'from-gray-400 to-slate-500' },
    { icon: <WiRaindrop size={28} />, label: 'Min/Max', value: `${Math.round(weather.main?.temp_min)}° / ${Math.round(weather.main?.temp_max)}°`, gradient: 'from-purple-400 to-pink-500' }
  ];

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl animate-slide-up h-full">
      {/* Location & Date */}
      <div className="text-center border-b border-white/20 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {weather.name}, <span className="text-white/70 font-normal">{weather.sys?.country}</span>
        </h2>
        <p className="text-white/40 text-sm mt-1">{formatDate()}</p>
        <p className="text-white/30 text-xs">Last updated: {new Date().toLocaleTimeString()}</p>
      </div>

      {/* Main Weather */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6">
        <img 
          src={getWeatherIcon(weather.weather?.[0]?.icon)} 
          alt={weather.weather?.[0]?.description}
          className="w-28 h-28 md:w-32 md:h-32 drop-shadow-xl weather-icon-shadow"
        />
        <div className="text-center md:text-left">
          <div className="text-5xl md:text-6xl font-extrabold text-white">
            {Math.round(weather.main?.temp)}°C
          </div>
          <div className="text-white/70 text-lg capitalize mt-1">
            {weather.weather?.[0]?.description}
          </div>
          <div className="text-white/40 text-sm">
            Feels like: {Math.round(weather.main?.feels_like)}°C
          </div>
        </div>
      </div>

      {/* Temperature Range Bar */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <FaTemperatureLow className="text-blue-400 text-lg" />
            <div>
              <div className="text-white/50 text-xs">Min</div>
              <div className="text-white font-bold">{Math.round(weather.main?.temp_min)}°C</div>
            </div>
          </div>
          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
              style={{
                width: `${((weather.main?.temp - weather.main?.temp_min) / (weather.main?.temp_max - weather.main?.temp_min)) * 100}%`
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <FaTemperatureHigh className="text-red-400 text-lg" />
            <div>
              <div className="text-white/50 text-xs">Max</div>
              <div className="text-white font-bold">{Math.round(weather.main?.temp_max)}°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {details.map((detail, idx) => (
          <div 
            key={idx} 
            className={`bg-gradient-to-br ${detail.gradient} bg-opacity-10 rounded-xl p-3 text-center transition-all duration-300 hover:scale-105`}
          >
            <div className="text-white flex justify-center mb-1">{detail.icon}</div>
            <div className="text-white font-bold text-sm md:text-base">{detail.value}</div>
            <div className="text-white/50 text-xs">{detail.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;