// components/ForecastCard.jsx
import React from 'react';

const ForecastCard = ({ forecast }) => {
  const dailyForecast = forecast?.list?.filter((item, index) => index % 8 === 0).slice(0, 5);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en', { weekday: 'short' });
  };

  const getDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 animate-slide-up h-full">
      <h3 className="text-white text-lg md:text-xl font-semibold mb-5 flex items-center gap-2">
        <span className="text-2xl">📅</span> 5-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {dailyForecast?.map((day, idx) => (
          <div 
            key={idx} 
            className="bg-white/5 rounded-xl p-3 text-center transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            <div className="text-white font-semibold text-sm md:text-base">{getDayName(day.dt_txt)}</div>
            <div className="text-white/40 text-xs">{getDate(day.dt_txt)}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="w-12 h-12 md:w-14 md:h-14 mx-auto my-2"
            />
            <div className="text-white font-bold text-base md:text-lg">{Math.round(day.main.temp)}°C</div>
            <div className="text-white/40 text-xs truncate">{day.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;