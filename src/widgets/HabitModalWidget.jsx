function HabitModalWidget({ habit, onClose }) {
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
        className="bg-white rounded-3xl p-10 max-w-xl w-full shadow-2xl"
      >
        <div className="h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-200 mb-7" />

        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
          Habit Details
        </p>

        <h2 className="text-3xl text-slate-900 mb-4">
          {habit.title}
        </h2>

        <p className="text-slate-500 text-base leading-relaxed mb-6">
          {habit.description}
        </p>

        <div className="bg-blue-50 rounded-xl px-5 py-4 mb-8">
          <p className="text-xs font-semibold text-blue-600 mb-1">Started on</p>
          <p className="text-sm font-medium text-slate-900">{date}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3.5 rounded-xl transition-all duration-150"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default HabitModalWidget;