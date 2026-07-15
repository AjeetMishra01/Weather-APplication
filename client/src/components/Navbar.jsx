import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "text-accent border-b-2 border-accent px-1 py-4 font-semibold text-sm md:text-base";
  const inactiveClass = "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 px-1 py-4 font-medium text-sm md:text-base transition-colors duration-200";

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl">🌦️</span>
              <span className="text-lg md:text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                SkyBrief
              </span>
            </NavLink>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              History
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              Favorites
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="sm:hidden border-b border-slate-200 dark:border-slate-800" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-900">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-accent/10 text-accent font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/history"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-accent/10 text-accent font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              History
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-accent/10 text-accent font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              Favorites
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
