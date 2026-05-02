import HeaderWidget from '../widgets/HeaderWidget';
import AllHabitsWidget from '../widgets/AllHabitsWidget';
import { useState } from 'react';

function MainPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <HeaderWidget onHabitRestored={() => setRefreshKey(k => k + 1)} />
      <AllHabitsWidget key={refreshKey} />
    </div>
  );
}

export default MainPage;