import React from 'react';

const Loader = ({ message = 'Fetching weather data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-800 border-t-accent rounded-full animate-spin mb-4"></div>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
