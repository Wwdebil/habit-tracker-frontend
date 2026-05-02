import { useState } from 'react'
import { apiClient } from '../shared/api/apiClient';

function EditHabitFeature({ habit, onSuccess, onClose, onArchived }) {
  const [title, setTitle] = useState(habit.title);
  const [description, setDescription] = useState(habit.description);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) { setError('Title is required.'); return; }
    setIsSubmitting(true);
    setError('');
    try {
      await apiClient(`/habits/${habit.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      onSuccess();
    } catch (e) {
      setError(e.message || 'Could not reach the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArchive = async () => {
    setIsArchiving(true);
    setError('');
    try {
      await apiClient(`/habits/${habit.id}`, { method: 'DELETE' });
      onArchived();
    } catch (e) {
      setError(e.message || 'Could not archive habit.');
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-200 mb-7" />
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">Edit Habit</p>
        <h2 className="text-3xl text-slate-900 mb-7">Update Habit</h2>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">{error}</div>
        )}

        <div className="flex gap-3 mb-6">
          <button onClick={onClose} disabled={isSubmitting || isArchiving}
            className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-3.5 rounded-xl transition-colors duration-150 disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={isSubmitting || isArchiving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3.5 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <button onClick={handleArchive} disabled={isArchiving || isSubmitting}
            className="w-full text-sm text-slate-400 hover:text-red-500 font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
            {isArchiving ? 'Archiving…' : '🗄 Archive this habit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditHabitFeature;