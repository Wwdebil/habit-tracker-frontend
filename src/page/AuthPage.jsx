import { useState } from 'react';
import LoginFeature from '../features/auth/LoginFeature';
import RegisterFeature from '../features/auth/RegisterFeature';

function AuthPage() {
  const [tab, setTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center px-6" 
         style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #eff6ff 100%)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <div className="h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-200 mb-7" />

        <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-2">
          Habit Tracker
        </p>
        <h1 className="text-3xl text-slate-900 mb-7">
          {tab === 'login' ? 'Welcome back' : 'Create account'}
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-7">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
              tab === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
              tab === 'register'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Register
          </button>
        </div>

        {tab === 'login' ? <LoginFeature /> : <RegisterFeature />}
      </div>
    </div>
  );
}

export default AuthPage;