import { useState, useEffect } from 'react';
import { apiClient } from '../shared/api/apiClient';

function HabitModalWidget({ habit, onClose }) {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!habit) return;
    setLoadingStats(true);
    apiClient(`/habits/${habit.id}/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {})
      .finally(() => setLoadingStats(false));
  }, [habit]);

  if (!habit) return null;

  const date = new Date(habit.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl"
      >
        {/* Top accent stripe */}
        <div className="h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-200 mb-7" />

        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
          Habit Details
        </p>
        <h2 className="text-3xl text-slate-900 mb-4">{habit.title}</h2>
        <p className="text-slate-500 text-base leading-relaxed mb-6">{habit.description}</p>

        <div className="bg-blue-50 rounded-xl px-5 py-4 mb-5">
          <p className="text-xs font-semibold text-blue-600 mb-1">Started on</p>
          <p className="text-sm font-medium text-slate-900">{date}</p>
        </div>

        {/* Stats block */}
        {loadingStats ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-8">
            <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            Loading stats…
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-slate-50 rounded-xl px-4 py-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Current Streak
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.currentStreak}
                <span className="text-sm font-medium text-slate-400 ml-1">days</span>
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl px-4 py-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                This Week
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.completedDaysLast7Days}
                <span className="text-sm font-medium text-slate-400 ml-1">/ 7</span>
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl px-4 py-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Longest Streak
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.longestStreak}
                <span className="text-sm font-medium text-slate-400 ml-1">days</span>
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl px-4 py-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Total Check-ins
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.totalCheckIns}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-400 mb-8">Could not load stats.</div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors duration-150"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default HabitModalWidget;