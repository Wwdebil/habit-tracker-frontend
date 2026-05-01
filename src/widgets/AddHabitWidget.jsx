import { useState } from 'react'
import AddHabitFeature from '../features/AddHabitFeature'

function AddHabitWidget({ onHabitAdded }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    onHabitAdded(); // refresh the habit list in parent
  };

  return (
    <div className="mb-5">
      <div className="flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-150"
          onClick={() => setIsOpen(true)}
        >
          + Add New Habit
        </button>
      </div>

      {isOpen && (
        <AddHabitFeature
          onSuccess={handleSuccess}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default AddHabitWidget;