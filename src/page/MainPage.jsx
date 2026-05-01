import AllHabitsWidget from "../widgets/AllHabitsWidget";

function MainPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="block mb-10">
        <h1 className="text-5xl text-slate-900 leading-tight mb-3">
          Habit Tracker
        </h1>
        <div className="w-12 h-0.5 bg-blue-600 rounded-full" />
      </header>

      <AllHabitsWidget />
    </div>
  );
}

export default MainPage;