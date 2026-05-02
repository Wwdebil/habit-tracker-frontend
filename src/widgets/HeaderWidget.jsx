import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../shared/lib/auth';
import { apiClient } from '../shared/api/apiClient';
import ArchivedHabitsWidget from './ArchivedHabitsWidget';

function HeaderWidget({ onHabitRestored }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    apiClient('/users/me')
      .then(data => setUsername(data.username))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <>
      <header className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl text-slate-900 leading-tight">
            Habit Tracker
          </h1>
          <div className="flex items-center gap-3">
            {username && (
              <span className="text-sm font-medium text-slate-500">
                👤 {username}
              </span>
            )}
            <button
              onClick={() => setShowArchive(true)}
              className="text-sm font-semibold text-slate-500 hover:text-slate-700 border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-xl transition-all duration-150 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v0a2 2 0 01-2 2M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
              Archive
            </button>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-slate-500 hover:text-red-500 border border-slate-300 hover:border-red-400 px-4 py-2 rounded-xl transition-all duration-150 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
        <div className="w-full h-px bg-slate-200" />
      </header>

      {showArchive && (
        <ArchivedHabitsWidget
          onClose={() => setShowArchive(false)}
          onRestored={onHabitRestored}
        />
      )}
    </>
  );
}

export default HeaderWidget;