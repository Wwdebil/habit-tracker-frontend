import { useState, useEffect } from 'react';
import { apiClient } from '../shared/api/apiClient';

function HabitEntitie({ habit, setSelectedHabit, setSelectedForEdit, index }) {
  const [completedToday, setCompletedToday] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [loadingCheckIn, setLoadingCheckIn] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    apiClient(`/habits/${habit.id}/check-ins`)
      .then(res => res.json())
      .then(checkIns => {
        const todayCheckIn = checkIns.find(c => c.checkInDate === today);
        if (todayCheckIn) setCompletedToday(true);
      })
      .catch(() => {})
      .finally(() => setLoadingCheckIn(false));
  }, [habit.id]);

  const handleCheck = async () => {
    if (completedToday || isChecking) return;
    setIsChecking(true);
    try {
      const res = await apiClient(`/habits/${habit.id}/check-ins`, {
        method: 'POST',
      });
      if (res.ok) setCompletedToday(true);
    } catch (e) {}
    finally { setIsChecking(false); }
  };

  const date = new Date(habit.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <li className="habit-card" style={{ animationDelay: `${index * 80}ms` }}>
      <div className={`border rounded-2xl px-7 py-6 flex items-center gap-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${
        completedToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'
      }`}>

        {/* Checkbox */}
        <button
          onClick={handleCheck}
          disabled={completedToday || isChecking || loadingCheckIn}
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            completedToday
              ? 'bg-blue-600 border-blue-600 cursor-default'
              : 'border-slate-300 hover:border-blue-400 cursor-pointer'
          }`}
        >
          {isChecking || loadingCheckIn ? (
            <div className="w-3 h-3 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          ) : completedToday ? (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : null}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-lg mb-1 truncate transition-colors duration-200 ${
            completedToday ? 'text-blue-700' : 'text-slate-900'
          }`}>
            {habit.title}
          </p>
          <p className="text-sm text-slate-500 mb-3 leading-relaxed">{habit.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {date}
            </span>
            {completedToday && (
              <span className="inline-block text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                ✓ Done today
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setSelectedForEdit(habit)}
            className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150"
          >
            Edit
          </button>
          <button
            onClick={() => setSelectedHabit(habit)}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150"
          >
            Info →
          </button>
        </div>
      </div>
    </li>
  );
}

export default HabitEntitie;