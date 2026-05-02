import ArchivedHabitsFeature from '../features/ArchivedHabitsFeature';

function ArchivedHabitsWidget({ onClose, onRestored }) {
  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-10 max-w-2xl w-full shadow-2xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1 rounded-full bg-gradient-to-r from-slate-400 to-slate-200 mb-7 flex-shrink-0" />
        <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2 flex-shrink-0">Archive</p>
        <h2 className="text-3xl text-slate-900 mb-7 flex-shrink-0">Archived Habits</h2>

        <div className="overflow-y-auto flex-1">
          <ArchivedHabitsFeature onRestored={onRestored} />
        </div>

        <button
          onClick={onClose}
          className="w-full mt-7 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-3.5 rounded-xl transition-colors duration-150 flex-shrink-0"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ArchivedHabitsWidget;