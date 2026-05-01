import EditHabitFeature from '../features/EditHabitFeature';

function EditHabitWidget({ habit, onClose, onSuccess, onArchived }) {
  return (
    <EditHabitFeature
      habit={habit}
      onClose={onClose}
      onSuccess={onSuccess}
      onArchived={onArchived}
    />
  );
}
export default EditHabitWidget;