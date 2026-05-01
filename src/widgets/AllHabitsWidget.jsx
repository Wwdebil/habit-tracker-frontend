import { useState } from 'react'
import AllHabitsFeature from '../features/AllHabitsFeature';
import HabitModalWidget from './HabitModalWidget';
import AddHabitWidget from './AddHabitWidget';

function AllHabitsWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <AddHabitWidget onHabitAdded={() => setRefreshKey(k => k + 1)} />
      <AllHabitsFeature
        key={refreshKey}
        habits={habits}
        setHabits={setHabits}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSelectedHabit={setSelectedHabit}
        onHabitUpdated={() => setRefreshKey(k => k + 1)} // ← add this
      />
      <HabitModalWidget
        habit={selectedHabit}
        onClose={() => setSelectedHabit(null)}
      />
    </>
  );
}

export default AllHabitsWidget;