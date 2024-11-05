import React, { useState } from 'react';
import { WeatherData, ForecastData, getWeather, getForecast } from './services/weatherApi';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);

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

  const getDailyForecast = (forecastData: ForecastData) => {
    const dailyData = new Map();
    
    forecastData.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData.has(date)) {
        dailyData.set(date, item);
      }
    });

    return Array.from(dailyData.values()).slice(1, 6); // Get next 5 days
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
          <h2>5-Day Forecast</h2>
          <div className="forecast-container">
            {getDailyForecast(forecast).map((item) => (
              <div key={item.dt} className="forecast-item">
                <h3>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                <p>Temp: {Math.round(item.main.temp)}°C</p>
                <p>Humidity: {item.main.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;