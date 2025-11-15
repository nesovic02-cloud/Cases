import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';

const AdminStatsPage = () => {
  const { drops, cases } = useAppStore();

  const stats = useMemo(() => {
    return cases.map((caseItem) => {
      const caseDrops = drops.filter((drop) => drop.caseId === caseItem.id);
      const totalIssued = caseDrops.reduce((sum, drop) => sum + drop.itemPrice, 0);
      const totalSpent = caseDrops.length * caseItem.price;
      return {
        id: caseItem.id,
        name: caseItem.name,
        openings: caseDrops.length,
        issued: totalIssued,
        spent: totalSpent,
        profit: totalSpent - totalIssued,
      };
    });
  }, [cases, drops]);

  const summary = stats.reduce(
    (acc, item) => ({
      openings: acc.openings + item.openings,
      issued: acc.issued + item.issued,
      spent: acc.spent + item.spent,
      profit: acc.profit + item.profit,
    }),
    { openings: 0, issued: 0, spent: 0, profit: 0 },
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Статистика</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/60">Всего открытий</p>
          <p className="text-3xl font-semibold">{summary.openings}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/60">Выдано ценности</p>
          <p className="text-3xl font-semibold">{summary.issued} coins</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/60">Профит</p>
          <p className="text-3xl font-semibold">{summary.profit} coins</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/10 text-white/60">
            <tr>
              <th className="px-4 py-3">Кейс</th>
              <th className="px-4 py-3">Открытий</th>
              <th className="px-4 py-3">Выдано</th>
              <th className="px-4 py-3">Потрачено</th>
              <th className="px-4 py-3">Профит</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((row) => (
              <tr key={row.id} className="odd:bg-white/5">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.openings}</td>
                <td className="px-4 py-3">{row.issued}</td>
                <td className="px-4 py-3">{row.spent}</td>
                <td className="px-4 py-3">{row.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStatsPage;
