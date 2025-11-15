import { NavLink, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const links = [
  { to: '/admin/cases', label: 'Кейсы' },
  { to: '/admin/stats', label: 'Статистика' },
  { to: '/admin/users', label: 'Пользователи' },
];

const AdminLayout = () => {
  const { user } = useAppStore();
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="flex">
        <aside className="w-64 border-r border-white/10 bg-black/30 p-6 backdrop-blur">
          <p className="mb-8 text-2xl font-semibold">Admin</p>
          <p className="mb-4 text-sm text-white/60">{user.name}</p>
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded px-4 py-2 text-sm ${
                    isActive ? 'bg-gradient-to-r from-neon to-accent text-black' : 'bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className="flex-1 p-10">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
