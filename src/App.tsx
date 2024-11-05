import React, { useState } from 'react';
import { WeatherData, getWeather, getForecast } from './services/weatherApi';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city);
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {currentWeather && (
        <div className="current-weather">
          <h2>{currentWeather.name}</h2>
          <img
            src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
            alt={currentWeather.weather[0].description}
          />
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Feels like: {currentWeather.main.feels_like}°C</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Conditions: {currentWeather.weather[0].description}</p>
        </div>
      )}

      {forecast && (
        <div className="forecast">
          {/* Add 5-day forecast display logic here */}
        </div>
      )}
    </div>
  );
};

export default App;