import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import HomePage from './pages/HomePage';
import CasesPage from './pages/CasesPage';
import CaseDetailsPage from './pages/CaseDetailsPage';
import ProfilePage from './pages/ProfilePage';
import FaqPage from './pages/FaqPage';
import BattlesPlaceholder from './pages/BattlesPlaceholder';
import AdminLayout from './layouts/AdminLayout';
import AdminCasesPage from './pages/admin/AdminCasesPage';
import AdminStatsPage from './pages/admin/AdminStatsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import { useAppStore } from './store/useAppStore';

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  // Простейшая защита роутов: если нет флага isAdmin — редиректим на главную
  const { user } = useAppStore();
  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AdminPrompt = () => {
  const { adminPromptVisible, toggleAdminPrompt, authenticateAdmin } = useAppStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const success = authenticateAdmin(password);
    if (!success) {
      setError('Неверный пароль admin. Попробуйте admin123');
    } else {
      setPassword('');
      setError('');
    }
  };

  if (!adminPromptVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-background/90 p-6">
        <h3 className="text-xl font-semibold text-white">Скрытый вход в админку</h3>
        <p className="text-sm text-white/60">Введите пароль admin</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded border border-white/20 bg-transparent px-3 py-2"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <div className="mt-4 flex justify-end gap-3">
          <button className="text-sm text-white/60" onClick={() => toggleAdminPrompt(false)}>
            Отмена
          </button>
          <button className="rounded-full bg-gradient-to-r from-neon to-accent px-4 py-2 text-sm font-semibold text-black" onClick={submit}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { toggleAdminPrompt } = useAppStore();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'a') {
        // Секретная комбинация для вызова входа в админ-панель
        toggleAdminPrompt(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleAdminPrompt]);

  return (
    <>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:caseId" element={<CaseDetailsPage />} />
          <Route path="/battles" element={<BattlesPlaceholder />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminCasesPage />} />
          <Route path="cases" element={<AdminCasesPage />} />
          <Route path="stats" element={<AdminStatsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
      <AdminPrompt />
    </>
  );
};

export default App;
