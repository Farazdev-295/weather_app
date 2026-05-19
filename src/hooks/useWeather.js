// hooks/useWeather.js
import { useState, useCallback } from 'react';
import { weatherService } from '../services/weatherService';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const getWeather = useCallback(async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Save to recent searches
      setRecentSearches(prev => {
        const newSearches = [city, ...prev.filter(c => c !== city)].slice(0, 5);
        return newSearches;
      });
      
    } catch (err) {
      setError(err.response?.data?.message || 'City not found');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getWeatherByLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await weatherService.getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
          setError('');
        } catch (err) {
          setError('Unable to get weather for your location');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Please allow location access');
        setLoading(false);
      }
    );
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    recentSearches,
    getWeather,
    getWeatherByLocation
  };
};