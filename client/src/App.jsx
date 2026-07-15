import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
        <Navbar />

        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
          <div className="max-w-6xl mx-auto px-4">
            <p>Name: Ajeet Mishra | Email: ajeet.mishra2005@gmail.com</p>
            <p className="mt-1">Built with React, React Router & Tailwind CSS.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
