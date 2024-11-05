import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY; // Get from .env file
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};

export const getForecast = async (city: string) => {
  const response = await axios.get(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};