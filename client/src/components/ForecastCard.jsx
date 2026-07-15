import React from 'react';

const ForecastCard = ({ data }) => {
  if (!data) return null;

  const { day, condition, icon, minTemp, maxTemp } = data;

  return (
    <div className="flex flex-row md:flex-col items-center justify-between md:justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow duration-200 gap-3 md:text-center w-full md:w-36">
      {/* Day of the week */}
      <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm md:text-base md:w-full">
        {day}
      </span>

      {/* Icon placeholder */}
      <span className="text-3xl md:text-4xl p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg select-none" role="img" aria-label={condition}>
        {icon}
      </span>

      {/* Condition label */}
      <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium md:truncate md:max-w-full">
        {condition}
      </span>

      {/* Temperature Min/Max */}
      <div className="flex md:flex-row gap-2.5 text-xs md:text-sm font-medium">
        <span className="text-slate-800 dark:text-slate-100 font-semibold">{maxTemp}°</span>
        <span className="text-slate-400 dark:text-slate-500">{minTemp}°</span>
      </div>
    </div>
  );
};

export default ForecastCard;
