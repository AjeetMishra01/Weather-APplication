import React from 'react';

const WeatherCard = ({ data, isFav = false, onToggleFav }) => {
  if (!data) return null;

  const { city, country, temperature, condition, humidity, windSpeed, icon } = data;

  const renderWeatherIcon = (iconStr, conditionName) => {
    if (!iconStr) return "⛅";
    // Check if it's an emoji (contains emojis or is longer than standard OpenWeatherMap codes like "04d")
    if (iconStr.length > 4 || /\p{Emoji}/u.test(iconStr)) {
      return <span className="select-none">{iconStr}</span>;
    }
    // Render OpenWeatherMap icon image
    return (
      <img
        src={`https://openweathermap.org/img/wn/${iconStr}@2x.png`}
        alt={conditionName}
        className="w-16 h-16 object-contain"
      />
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 max-w-2xl mx-auto my-6 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
            {city}
          </h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {country}
          </p>
        </div>
        {onToggleFav && (
          <button
            onClick={() => onToggleFav(data)}
            className={`p-2.5 rounded-full border transition-all duration-200 ${isFav
                ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/50 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-slate-600 dark:hover:text-slate-400'
              }`}
            title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
          >
            <svg
              className="w-6.5 h-6.5 fill-current"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isFav ? "0" : "2"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499c.198-.39.73-.39.927 0l2.184 4.3c.08.158.243.27.42.29l4.902.664c.43.058.602.558.28.847l-3.55 3.197a.492.492 0 0 0-.142.44l.872 4.757c.078.43-.397.74-.755.513l-4.298-2.285a.498.498 0 0 0-.448 0L7.6 19.82c-.358.228-.833-.082-.755-.513l.872-4.757a.492.492 0 0 0-.142-.44L4.03 10.6c-.322-.289-.15-.79.28-.848l4.902-.663a.5.5 0 0 0 .42-.29l2.184-4.3Z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 dark:border-slate-800/80 pb-6 mb-6">
        {/* Temp and Main Condition */}
        <div className="flex items-center gap-5 justify-center md:justify-start">
          <div className="flex items-center justify-center w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-2xl select-none" role="img" aria-label={condition}>
            {renderWeatherIcon(icon, condition)}
          </div>
          <div className="text-left">
            <div className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              {Math.round(temperature)}°C
            </div>
            <p className="text-base md:text-lg font-medium text-slate-600 dark:text-slate-300 mt-1">
              {condition}
            </p>
          </div>
        </div>

        {/* Extra Weather Info (Humidity & Wind Speed) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/30 text-center md:text-left">
            <span className="text-xl md:text-2xl mb-1.5 block select-none">💧</span>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Humidity</p>
            <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">{humidity}%</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/30 text-center md:text-left">
            <span className="text-xl md:text-2xl mb-1.5 block select-none">💨</span>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Wind Speed</p>
            <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">{windSpeed} m/s</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 text-center md:text-left">
      </p>
    </div>
  );
};

export default WeatherCard;
