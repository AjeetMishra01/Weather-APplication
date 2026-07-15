import React, { useState } from 'react';
import Button from './Button';

const SearchBar = ({ onSearch, initialValue = '', placeholder = 'Search for a city (e.g. New York, London)...', isLoading = false }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto my-6">
      <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-slate-300 dark:hover:border-slate-700 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-accent transition-all duration-200">
        <div className="relative flex-grow flex items-center pl-3">
          <span className="text-slate-400 text-lg mr-2 select-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent border-0 outline-none text-slate-800 dark:text-slate-100 text-sm md:text-base placeholder-slate-400 py-2 focus:ring-0"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !query.trim()}
          className="whitespace-nowrap px-6 py-2.5 rounded-lg text-xs md:text-sm font-semibold"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
