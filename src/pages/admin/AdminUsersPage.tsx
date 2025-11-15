import { useAppStore } from '../../store/useAppStore';

const AdminUsersPage = () => {
  const { users, updateUserBalance, toggleBan } = useAppStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Пользователи</h1>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/10 text-white/60">
            <tr>
              <th className="px-4 py-3">Ник</th>
              <th className="px-4 py-3">Баланс</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="odd:bg-white/5">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.balance} coins</td>
                <td className="px-4 py-3">{user.isBanned ? 'Заблокирован' : 'Активен'}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className="rounded-full border border-white/30 px-3 py-1 text-xs"
                    onClick={() => updateUserBalance(user.id, 100)}
                  >
                    +100
                  </button>
                  <button
                    className="rounded-full border border-white/30 px-3 py-1 text-xs"
                    onClick={() => updateUserBalance(user.id, -100)}
                  >
                    -100
                  </button>
                  <button
                    className="rounded-full border border-red-400 px-3 py-1 text-xs text-red-300"
                    onClick={() => toggleBan(user.id)}
                  >
                    {user.isBanned ? 'Разблокировать' : 'Забанить'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
