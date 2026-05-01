import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './page/MainPage';
import AuthPage from './page/AuthPage';
import PrivateRoute from './shared/ui/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={
        <PrivateRoute>
          <MainPage />
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;