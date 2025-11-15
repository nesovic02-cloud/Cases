import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useAppStore } from '../store/useAppStore';

const navLinks = [
  { path: '/cases', label: 'Кейсы' },
  { path: '/battles', label: 'Баттлы', disabled: true },
  { path: '/faq', label: 'FAQ' },
  { path: '/profile', label: 'Профиль' },
];

const SiteLayout = () => {
  const location = useLocation();
  const { user } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col bg-background/95">
      <header className="border-b border-white/5 bg-surface/60 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-semibold tracking-tight text-white">
            NeonCrates
          </Link>
          <nav className="flex items-center gap-6 text-sm uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.disabled ? '#' : link.path}
                className={clsx(
                  'transition text-white/70 hover:text-white relative',
                  link.disabled && 'cursor-not-allowed opacity-40',
                  location.pathname.startsWith(link.path) &&
                    'text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-neon after:to-accent',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-xs text-white/60">Баланс</p>
              <p className="font-semibold text-white">{user.balance} coins</p>
            </div>
            <Link
              to="/profile"
              className="rounded-full bg-gradient-to-r from-neon to-accent px-4 py-2 text-sm font-semibold text-black"
            >
              {user.name}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-fixed bg-center">
        <div className="bg-gradient-to-b from-background/90 via-background/95 to-background/98">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="border-t border-white/5 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">NeonCrates</p>
            <p>Демо-симулятор открытия кейсов. Не является азартной игрой.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/faq" className="hover:text-white">
              FAQ
            </Link>
            <a className="hover:text-white" href="#">
              Контакты
            </a>
            <a className="hover:text-white" href="#">
              Условия
            </a>
            <a className="hover:text-white" href="#">
              Конфиденциальность
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
