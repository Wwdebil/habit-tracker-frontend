import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../shared/api/authApi';
import { saveToken } from '../../shared/lib/auth';

function LoginFeature() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await loginRequest(email, password);
      saveToken(data.token);
      navigate('/');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="e.g. john@email.com"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3.5 rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? 'Signing in…' : 'Login'}
      </button>
    </div>
  );
}

export default LoginFeature;