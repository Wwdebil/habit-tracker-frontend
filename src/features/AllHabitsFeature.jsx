import { useEffect, useState } from 'react'
import { apiClient } from '../shared/api/apiClient';
import HabitEntitie from '../entities/HabitEntitie';
import EditHabitWidget from '../widgets/EditHabitWidget';

function AllHabitsFeature({ habits, setHabits, isLoading, setIsLoading, setSelectedHabit, onHabitUpdated }) {
  const [selectedForEdit, setSelectedForEdit] = useState(null); // ← new

  useEffect(() => {
    apiClient('/habits')
      .then(res => res.json())
      .then(data => setHabits(data))
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) return (
    <div className="flex items-center gap-3 py-10 text-slate-400">
      <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      Loading your habits…
    </div>
  );

  if (habits.length === 0) return (
    <div className="text-center py-16 px-8 bg-blue-50 rounded-2xl border border-dashed border-blue-200">
      <p className="text-3xl mb-3">🌱</p>
      <p className="text-slate-500 font-medium">No habits yet. Start building one!</p>
    </div>
  );

  return (
    <>
      <ul className="flex flex-col gap-4">
        {habits.map((habit, i) => (
          <HabitEntitie
            key={habit.id}
            habit={habit}
            setSelectedHabit={setSelectedHabit}
            setSelectedForEdit={setSelectedForEdit} // ← pass setter down
            index={i}
          />
        ))}
      </ul>

      {/* Modal lives here, outside the list — same pattern as HabitModalWidget */}
      {selectedForEdit && (
        <EditHabitWidget
          habit={selectedForEdit}
          onClose={() => setSelectedForEdit(null)}
          onSuccess={() => {
            setSelectedForEdit(null);
            onHabitUpdated();
          }}
          onArchived={() => {
            setSelectedForEdit(null);
            onHabitUpdated();
          }}
        />
      )}
    </>
  );
}

export default AllHabitsFeature;