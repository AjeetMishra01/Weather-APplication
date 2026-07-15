import React, { useState, useEffect } from 'react';
import HistoryTable from '../components/HistoryTable';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import {
  getHistory,
  deleteHistory,
  toggleFavorite
} from '../services/weatherService';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [exportMessage, setExportMessage] = useState(null);

  const fetchHistoryList = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getHistory();
      setHistory(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load search history.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);
      // Update local state without full reload
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      alert("Failed to delete log entry: " + (err.response?.data?.message || err.message));
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all your search history?")) {
      try {
        setIsLoading(true);
        // Clear all entries sequentially/concurrently via backend IDs
        await Promise.all(history.map(item => deleteHistory(item._id)));
        setHistory([]);
      } catch (err) {
        setError("Failed to clear search history fully.");
        fetchHistoryList(); // reload state
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggleFavoriteInHistory = async (id) => {
    try {
      await toggleFavorite(id);
      // Toggle local state directly for responsive feedback
      setHistory(prev => prev.map(item => {
        if (item._id === id) {
          return { ...item, favorite: !item.favorite };
        }
        return item;
      }));
    } catch (err) {
      alert("Failed to update favorite: " + (err.response?.data?.message || err.message));
    }
  };

  const handleExport = (format) => {
    if (history.length === 0) return;
    
    // Prepare data
    const exportData = history.map(item => ({
      date: new Date(item.createdAt).toLocaleString(),
      city: item.city,
      country: item.country,
      temperature: item.temperature,
      condition: item.condition,
      humidity: item.humidity,
      windSpeed: item.windSpeed,
      favorite: item.favorite
    }));

    if (format === 'JSON') {
      const jsonStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `weather_history_${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // CSV Format
      const headers = ['Date Searched', 'City', 'Country', 'Temperature (°C)', 'Condition', 'Humidity (%)', 'Wind Speed (km/h)', 'Favorite'];
      const rows = exportData.map(item => [
        `"${item.date}"`,
        `"${item.city}"`,
        `"${item.country}"`,
        item.temperature,
        `"${item.condition}"`,
        item.humidity,
        item.windSpeed,
        item.favorite
      ]);
      const csvStr = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvStr], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `weather_history_${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }

    setExportMessage(`Successfully exported ${history.length} search records as ${format}! Check your downloads folder.`);
    setTimeout(() => {
      setExportMessage(null);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Search History
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Review previous searches, bookmark favorites, or export logs.
          </p>
        </div>
        {history.length > 0 && !isLoading && (
          <Button
            variant="danger"
            onClick={handleClearAll}
            className="mt-4 md:mt-0 text-xs md:text-sm font-semibold"
          >
            Clear History
          </Button>
        )}
      </div>

      {exportMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 px-4 py-3 rounded-lg text-sm mb-6 flex justify-between items-center transition-all duration-300">
          <span>{exportMessage}</span>
          <button onClick={() => setExportMessage(null)} className="font-bold hover:opacity-85 text-base">&times;</button>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto my-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {isLoading ? (
        <Loader message="Loading search history logs from backend database..." />
      ) : history.length === 0 ? (
        <EmptyState
          title="No search history yet"
          description="Cities you search for on the dashboard will appear here automatically."
          icon="⏳"
        />
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* History List/Table */}
          <HistoryTable
            history={history}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavoriteInHistory}
          />

          {/* Export Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
              Export Section
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Export your search log history in either JSON or CSV format.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => handleExport('JSON')}
                className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 font-semibold"
              >
                <span>📄</span> Export JSON
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleExport('CSV')}
                className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 bg-slate-50 hover:bg-slate-100 font-semibold"
              >
                <span>📊</span> Export CSV
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
