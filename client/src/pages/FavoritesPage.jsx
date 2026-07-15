import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getHistory, toggleFavorite } from '../services/weatherService';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getConditionEmoji = (condition) => {
    const map = {
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
    };
    return map[condition] || "⛅";
  };

  const fetchFavoritesList = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getHistory();
      const allHistory = response.data.data || [];
      
      // Filter for unique cities that are currently favorited
      const uniqueFavs = [];
      const citiesSeen = new Set();
      
      for (const item of allHistory) {
        if (item.favorite) {
          const lowerCity = item.city.toLowerCase();
          if (!citiesSeen.has(lowerCity)) {
            citiesSeen.add(lowerCity);
            uniqueFavs.push(item);
          }
        }
      }
      
      setFavorites(uniqueFavs);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch favorite locations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoritesList();
  }, []);

  const handleRemoveFavorite = async (e, favItem) => {
    e.stopPropagation(); // prevent navigating to dashboard on click
    try {
      await toggleFavorite(favItem._id);
      // Remove from local state
      setFavorites(prev => prev.filter(item => item.city.toLowerCase() !== favItem.city.toLowerCase()));
    } catch (err) {
      alert("Failed to remove favorite: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCardClick = (cityName) => {
    sessionStorage.setItem('selected_city', cityName);
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Favorite Cities
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Monitor current conditions of your pinned locations at a glance.
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto my-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {isLoading ? (
        <Loader message="Loading favorite locations from backend database..." />
      ) : favorites.length === 0 ? (
        <EmptyState
          title="No favorite cities yet"
          description="Click the star/favorite icon in your search history list or searched current weather card to pin cities here."
          icon="⭐"
          action={
            <Button variant="primary" onClick={() => navigate('/')}>
              Go to Dashboard
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              onClick={() => handleCardClick(fav.city)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-900/60 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
            >
              {/* Top Row: Name and Remove */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {fav.city}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                    {fav.country}
                  </p>
                </div>
                <button
                  onClick={(e) => handleRemoveFavorite(e, fav)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  title="Remove from favorites"
                >
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 1 1-1.06-1.06L12 13.06l-5.47 5.47a.75.75 0 1 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Middle Row: Temp and Condition */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl select-none" role="img" aria-label={fav.condition}>
                  {getConditionEmoji(fav.condition)}
                </span>
                <div>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {Math.round(fav.temperature)}°C
                  </span>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {fav.condition}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Specs */}
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500">Humidity</span>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">{fav.humidity}%</p>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500">Wind Speed</span>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">{fav.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
