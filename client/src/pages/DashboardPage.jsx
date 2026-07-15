import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getWeather, getHistory, toggleFavorite } from "../services/weatherService";

const generateMockForecast = (temp, mainCondition) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = new Date().getDay();

  const conditionIcons = {
    "Clear": "☀️",
    "Clouds": "☁️",
    "Rain": "🌧️",
    "Drizzle": "🌧️",
    "Thunderstorm": "⛈️",
    "Snow": "❄️",
    "Mist": "🌫️",
    "Smoke": "🌫️",
    "Haze": "🌫️",
    "Dust": "🌫️",
    "Fog": "🌫️",
    "Sand": "🌫️",
    "Ash": "🌫️",
    "Squall": "💨",
    "Tornado": "🌪️",
  };
  const icon = conditionIcons[mainCondition] || "⛅";

  return Array.from({ length: 5 }).map((_, idx) => {
    const dayName = days[(currentDayIndex + idx + 1) % 7];
    const offset = Math.floor(Math.sin(idx + 1) * 3);
    const minOffset = Math.floor(Math.cos(idx + 1) * 3) - 4;
    return {
      day: dayName,
      condition: mainCondition,
      icon: icon,
      minTemp: Math.round(temp + minOffset),
      maxTemp: Math.round(temp + offset),
    };
  });
};

const DashboardPage = () => {
  const [city, setCity] = useState(() => {
    const saved = sessionStorage.getItem('selected_city');
    if (saved) {
      sessionStorage.removeItem('selected_city');
      return saved;
    }
    return 'London'; // Default
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchCity) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getWeather(searchCity);
      const apiData = response.data.data;

      // Query history logs to fetch the database ID of the search we just performed
      const historyRes = await getHistory();
      const matched = (historyRes.data.data || []).find(
        h => h.city.toLowerCase() === apiData.city.toLowerCase()
      );

      setWeatherData({
        ...apiData,
        _id: matched ? matched._id : null,
        favorite: matched ? matched.favorite : false,
        forecast: generateMockForecast(apiData.temperature, apiData.condition)
      });
      setCity(searchCity);
    } catch (err) {
      setWeatherData(null);
      setError(err.response?.data?.message || err.message || "Unable to retrieve weather. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(city);
  }, []);

  const handleToggleFav = async (data) => {
    if (!data._id) return;
    try {
      await toggleFavorite(data._id);
      setWeatherData(prev => ({
        ...prev,
        favorite: !prev.favorite
      }));
    } catch (err) {
      alert("Failed to toggle favorite: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          Weather Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Search any city to view the latest weather.
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {isLoading && (
        <Loader message={`Loading weather for ${city}...`} />
      )}

      {error && !isLoading && (
        <div className="max-w-2xl mx-auto">
          <ErrorMessage message={error} />
        </div>
      )}

      {weatherData && !isLoading && !error && (
        <div className="animate-fade-in">
          <WeatherCard
            data={weatherData}
            isFav={weatherData.favorite}
            onToggleFav={handleToggleFav}
          />

          {weatherData.forecast && (
            <div className="mt-10 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-5 text-left border-b border-slate-200 dark:border-slate-800 pb-2">
                5-Day Forecast
              </h2>

              <div className="flex flex-col md:flex-row gap-4 justify-between items-center overflow-x-auto pb-2 w-full">
                {weatherData.forecast.map((day, index) => (
                  <ForecastCard
                    key={index}
                    data={day}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;