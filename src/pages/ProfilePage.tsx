import { useAppStore } from '../store/useAppStore';
import { formatDate } from '../utils/format';

const ProfilePage = () => {
  const { user, inventory, sellItem, drops } = useAppStore();
  const history = drops.filter((drop) => drop.userName === user.name);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/60">Профиль</p>
            <h1 className="text-4xl font-semibold">{user.name}</h1>
            <p className="text-white/70">ID: {user.id}</p>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-black/30 p-6 text-right">
            <p className="text-sm text-white/60">Баланс</p>
            <p className="text-3xl font-semibold text-white">{user.balance} coins</p>
            <button className="mt-3 rounded-full border border-white/30 px-6 py-2 text-sm text-white/80">
              Пополнить (mock)
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Инвентарь</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {inventory.length === 0 && <p className="text-white/60">Пока пусто — откройте кейс!</p>}
          {inventory.map((item) => (
            <div key={item.instanceId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-xl border border-white/20 object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-white/60">{item.caseName}</p>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-white/70">{item.price} coins</p>
                  <p className="text-xs text-white/50">{formatDate(item.acquiredAt)}</p>
                </div>
                <button
                  disabled={item.sold}
                  onClick={() => sellItem(item.instanceId)}
                  className="rounded-full border border-white/30 px-4 py-2 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {item.sold ? 'Продано' : 'Продать'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">История открытий</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10 text-white/60">
              <tr>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Кейс</th>
                <th className="px-4 py-3">Предмет</th>
                <th className="px-4 py-3">Цена</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>
            <tbody>
              {history.map((drop) => (
                <tr key={drop.id} className="odd:bg-white/5">
                  <td className="px-4 py-3">{formatDate(drop.time)}</td>
                  <td className="px-4 py-3">{drop.caseName}</td>
                  <td className="px-4 py-3">{drop.itemName}</td>
                  <td className="px-4 py-3">{drop.itemPrice}</td>
                  <td className="px-4 py-3">{drop.sold ? 'Продан' : 'Инвентарь'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
