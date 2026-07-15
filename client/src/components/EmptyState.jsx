import React from 'react';

const EmptyState = ({
  title = 'No data available',
  description = 'Try searching for a city on the dashboard to see history.',
  icon = '🔍',
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm max-w-lg mx-auto my-8">
      <div className="text-5xl mb-4 select-none">{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h3>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-6 max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
