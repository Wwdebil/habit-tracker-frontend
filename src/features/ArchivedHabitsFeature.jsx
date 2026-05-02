import { useState, useEffect } from 'react';
import { apiClient } from '../shared/api/apiClient';

function ArchivedHabitsFeature({ onRestored }) {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [restoringId, setRestoringId] = useState(null);

  useEffect(() => {
    apiClient('/habits/archived')
      .then(data => setHabits(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleRestore = async (habitId) => {
    setRestoringId(habitId);
    try {
      await apiClient(`/habits/${habitId}/restore`, { method: 'PATCH' });
      setHabits(prev => prev.filter(h => h.id !== habitId));
      onRestored(); // ← триггерит обновление списка на главной
    } catch (e) {}
    finally { setRestoringId(null); }
  };

  if (isLoading) return (
    <div className="flex items-center gap-3 py-10 text-slate-400">
      <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      Loading archived habits…
    </div>
  );

  if (habits.length === 0) return (
    <div className="text-center py-16 px-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
      <p className="text-3xl mb-3">📭</p>
      <p className="text-slate-500 font-medium">No archived habits.</p>
    </div>
  );

  return (
    <ul className="flex flex-col gap-4">
      {habits.map(habit => (
        <li key={habit.id}>
          <div className="bg-white border border-slate-200 rounded-2xl px-7 py-6 flex items-center gap-5 shadow-sm">
            <div className="w-1 h-12 flex-shrink-0 bg-gradient-to-b from-slate-300 to-slate-100 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-lg text-slate-400 mb-1 truncate">{habit.title}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{habit.description}</p>
            </div>
            <button
              onClick={() => handleRestore(habit.id)}
              disabled={restoringId === habit.id}
              className="flex-shrink-0 border border-blue-200 hover:bg-blue-50 text-blue-600 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {restoringId === habit.id ? 'Restoring…' : '↩ Restore'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ArchivedHabitsFeature;