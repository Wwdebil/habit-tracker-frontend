import { useNavigate } from 'react-router-dom';
import { removeToken } from '../shared/lib/auth';
import AllHabitsWidget from "../widgets/AllHabitsWidget";

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };


  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="block mb-10">
        <h1 className="text-5xl text-slate-900 leading-tight mb-3">
          Habit Tracker
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors duration-150"
        >
          Logout
        </button>
        <div className="w-12 h-0.5 bg-blue-600 rounded-full" />
      </header>

      <AllHabitsWidget />
    </div>
  );
}

export default MainPage;