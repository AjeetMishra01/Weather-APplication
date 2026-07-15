import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 my-6 text-left" role="alert">
      <span className="text-xl leading-none">⚠️</span>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-red-700 dark:text-red-400 text-sm md:text-base">Error Encountered</p>
        <p className="text-red-600 dark:text-red-300 text-xs md:text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
