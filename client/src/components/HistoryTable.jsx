import React from 'react';
import Button from './Button';

const HistoryTable = ({ history, onDelete, onToggleFavorite }) => {
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

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 md:px-6">Date Searched</th>
              <th className="py-3 px-4 md:px-6">City</th>
              <th className="py-3 px-4 md:px-6 text-center">Temp</th>
              <th className="py-3 px-4 md:px-6">Weather</th>
              <th className="py-3 px-4 md:px-6 text-center">Favorite</th>
              <th className="py-3 px-4 md:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {history.map((item) => {
              const favorited = item.favorite;
              return (
                <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  {/* Date */}
                  <td className="py-3.5 px-4 md:px-6 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  {/* City */}
                  <td className="py-3.5 px-4 md:px-6 font-semibold text-slate-800 dark:text-slate-200">
                    {item.city}, <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">{item.country}</span>
                  </td>
                  {/* Temp */}
                  <td className="py-3.5 px-4 md:px-6 text-center font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {Math.round(item.temperature)}°C
                  </td>
                  {/* Weather Condition */}
                  <td className="py-3.5 px-4 md:px-6 text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-lg select-none">{getConditionEmoji(item.condition)}</span>
                      {item.condition}
                    </span>
                  </td>
                  {/* Favorite Indicator */}
                  <td className="py-3.5 px-4 md:px-6 text-center">
                    <button
                      onClick={() => onToggleFavorite(item._id)}
                      className={`hover:scale-110 transition-transform ${
                        favorited ? 'text-purple-600 dark:text-purple-400' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'
                      }`}
                      title={favorited ? "Remove Favorite" : "Add Favorite"}
                    >
                      <svg className="w-5.5 h-5.5 fill-current mx-auto" viewBox="0 0 24 24">
                        <path d="M11.48 3.499c.198-.39.73-.39.927 0l2.184 4.3c.08.158.243.27.42.29l4.902.664c.43.058.602.558.28.847l-3.55 3.197a.492.492 0 0 0-.142.44l.872 4.757c.078.43-.397.74-.755.513l-4.298-2.285a.498.498 0 0 0-.448 0L7.6 19.82c-.358.228-.833-.082-.755-.513l.872-4.757a.492.492 0 0 0-.142-.44L4.03 10.6c-.322-.289-.15-.79.28-.848l4.902-.663a.5.5 0 0 0 .42-.29l2.184-4.3Z" />
                      </svg>
                    </button>
                  </td>
                  {/* Action (Delete) */}
                  <td className="py-3.5 px-4 md:px-6 text-right">
                    <button
                      onClick={() => onDelete(item._id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline px-2.5 py-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      title="Delete Search Log"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
