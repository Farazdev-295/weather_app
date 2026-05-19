// services/weatherService.js
import axios from 'axios';

// Yahan apni API key paste karo
const API_KEY = '0c8be6d2bdabcb4c4c6993f4622f8988';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  getCurrentWeather: async (city) => {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  },

  getForecast: async (city) => {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  },

  getWeatherByCoords: async (lat, lon) => {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  }
};