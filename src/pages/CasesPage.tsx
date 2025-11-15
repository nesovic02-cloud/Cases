import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import CaseCard from '../components/CaseCard';

const CasesPage = () => {
  const { cases } = useAppStore();
  const [priceFilter, setPriceFilter] = useState('all');
  const [onlyActive, setOnlyActive] = useState(true);

  const filtered = useMemo(() => {
    return cases.filter((caseItem) => {
      if (onlyActive && !caseItem.isActive) return false;
      if (priceFilter === 'low') return caseItem.price < 150;
      if (priceFilter === 'mid') return caseItem.price >= 150 && caseItem.price < 400;
      if (priceFilter === 'high') return caseItem.price >= 400;
      return true;
    });
  }, [cases, priceFilter, onlyActive]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm"
        >
          <option value="all">Все цены</option>
          <option value="low">До 150 coins</option>
          <option value="mid">150-399 coins</option>
          <option value="high">400+ coins</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={onlyActive}
            onChange={(e) => setOnlyActive(e.target.checked)}
            className="accent-accent"
          />
          Только активные
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((caseItem) => (
          <CaseCard key={caseItem.id} data={caseItem} />
        ))}
      </div>
    </div>
  );
};

export default CasesPage;
