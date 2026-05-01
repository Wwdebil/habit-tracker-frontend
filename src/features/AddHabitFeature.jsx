import { useState } from 'react'
import { apiClient } from '../shared/api/apiClient';

function AddHabitFeature({ onSuccess, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Frontend validation
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await apiClient('/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
        return;
      }

      onSuccess();
    } catch (e) {
      setError('Could not reach the server. Is the backend running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-200 mb-7" />

        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
          New Habit
        </p>
        <h2 className="text-3xl text-slate-900 mb-7">Add a Habit</h2>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Morning run"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What does this habit involve?"
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-3.5 rounded-xl transition-colors duration-150 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3.5 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving…' : 'Save Habit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabitFeature;