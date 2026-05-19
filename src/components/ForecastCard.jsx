// components/ForecastCard.jsx
import React from 'react';

const ForecastCard = ({ forecast }) => {
  // FIXED: Properly get 5 days starting from tomorrow
  const getDailyForecast = () => {
    if (!forecast?.list) return [];
    
    const today = new Date().toDateString();
    const dailyData = [];
    const processedDates = new Set();
    
    for (const item of forecast.list) {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      // Skip today's data
      if (dateString === today) continue;
      
      // Only take one item per day (12:00 PM approx)
      if (!processedDates.has(dateString)) {
        processedDates.add(dateString);
        dailyData.push(item);
      }
      
      // Stop when we have 5 days
      if (dailyData.length === 5) break;
    }
    
    return dailyData;
  };

  const dailyForecast = getDailyForecast();

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en', { weekday: 'short' });
  };

  const getDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  };

  if (dailyForecast.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-5 md:p-6 text-center">
        <p className="text-white/60">Loading forecast...</p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-5 md:p-6 animate-slide-up h-full">
      <h3 className="text-white text-lg md:text-xl font-semibold mb-5 flex items-center gap-2">
        <span className="text-2xl">📅</span> 5-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {dailyForecast.map((day, idx) => {
          const date = new Date(day.dt * 1000);
          return (
            <div key={idx} className="bg-white/5 rounded-xl p-3 text-center transition-all hover:bg-white/10 hover:scale-105">
              <div className="text-white font-semibold text-sm md:text-base">{getDayName(date)}</div>
              <div className="text-white/40 text-xs">{getDate(date)}</div>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-12 h-12 md:w-14 md:h-14 mx-auto my-2"
              />
              <div className="text-white font-bold text-base md:text-lg">{Math.round(day.main.temp)}°C</div>
              <div className="text-white/40 text-xs truncate">{day.weather[0].description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;