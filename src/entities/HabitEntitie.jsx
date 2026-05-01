function HabitEntitie({ habit, setSelectedHabit, setSelectedForEdit, index }) {
  const date = new Date(habit.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <li className="habit-card" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="bg-white border border-slate-200 rounded-2xl px-7 py-6 flex items-center gap-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

        <div className="w-1 h-12 flex-shrink-0 bg-gradient-to-b from-blue-600 to-blue-200 rounded-full" />

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-lg text-slate-900 mb-1 truncate">{habit.title}</p>
          <p className="text-sm text-slate-500 mb-3 leading-relaxed">{habit.description}</p>
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {date}
          </span>
        </div>

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