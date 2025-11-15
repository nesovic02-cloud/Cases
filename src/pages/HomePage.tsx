import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import DropTicker from '../components/DropTicker';
import CaseCard from '../components/CaseCard';

const HomePage = () => {
  const { cases } = useAppStore();
  const activeCases = cases.filter((c) => c.isActive);

  return (
    <div className="space-y-12">
      <section className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-r from-[#1c1e3c]/90 to-[#08101f]/80 p-10 shadow-glow md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">CS2 experience</p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Открывай кейсы и забирай топовые скины
          </h1>
          <p className="text-lg text-white/70">
            Симулятор открытия кейсов с честными шансами, визуальной анимацией и живой лентой дропов.
            Достаточно пополнить демо-баланс и крутить любимые кейсы.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/cases"
              className="rounded-full bg-gradient-to-r from-neon to-accent px-8 py-3 text-lg font-semibold text-black"
            >
              Открыть первый кейс
            </Link>
            <Link to="/faq" className="rounded-full border border-white/30 px-8 py-3 text-lg text-white/80">
              Как это работает?
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
            <p className="font-semibold text-white">Provably fair (концепт)</p>
            <p>
              Каждое открытие подписывается server seed + client seed. Пользователь видит хэш server seed заранее и
              может проверить любое вращение после раскрытия сида.
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-accent/30 bg-black/40 p-8 text-center">
          <p className="text-sm text-white/60">Превью UX</p>
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
            alt="Скины"
            className="mx-auto mb-6 rounded-2xl border border-white/10 object-cover"
          />
          <p className="text-white/80">
            Выбери кейс, запусти рулетку и смотри, как редкий скин загорается неоновым светом.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Популярные кейсы</h2>
          <Link to="/cases" className="text-sm text-accent">
            Смотреть все
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {activeCases.map((caseItem) => (
            <CaseCard key={caseItem.id} data={caseItem} />
          ))}
        </div>
      </section>

      <DropTicker />
    </div>
  );
};

export default HomePage;
