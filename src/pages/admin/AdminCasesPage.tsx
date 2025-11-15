import { FormEvent, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Item } from '../../types';

const rarityOptions = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

const AdminCasesPage = () => {
  const { cases, updateCaseMeta, updateItem, toggleCase, addItemToCase, removeItemFromCase } = useAppStore();
  const [newItem, setNewItem] = useState<{ [caseId: string]: Partial<Item> }>({});

  const handleNewItem = (e: FormEvent<HTMLFormElement>, caseId: string) => {
    e.preventDefault();
    const payload = newItem[caseId];
    if (!payload?.name || !payload?.price || !payload?.rarity || !payload?.weight) return;
    addItemToCase(caseId, {
      id: `${payload.name}-${Date.now()}`,
      name: payload.name,
      price: Number(payload.price),
      rarity: payload.rarity as Item['rarity'],
      weight: Number(payload.weight),
      imageUrl: payload.imageUrl || 'https://dummyimage.com/128x128/333/ffffff&text=?',
    });
    setNewItem((state) => ({ ...state, [caseId]: {} }));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Кейсы</h1>
      {cases.map((caseItem) => (
        <div key={caseItem.id} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <input
              className="rounded border border-white/20 bg-transparent px-3 py-2"
              value={caseItem.name}
              onChange={(e) => updateCaseMeta(caseItem.id, { name: e.target.value })}
            />
            <input
              type="number"
              className="w-32 rounded border border-white/20 bg-transparent px-3 py-2"
              value={caseItem.price}
              onChange={(e) => updateCaseMeta(caseItem.id, { price: Number(e.target.value) })}
            />
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={caseItem.isActive}
                onChange={(e) => toggleCase(caseItem.id, e.target.checked)}
              />
              Активен
            </label>
          </div>
          <p className="text-sm text-white/60">{caseItem.description}</p>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/10 text-white/60">
                <tr>
                  <th className="px-3 py-2 text-left">Название</th>
                  <th className="px-3 py-2 text-left">Редкость</th>
                  <th className="px-3 py-2">Цена</th>
                  <th className="px-3 py-2">Weight</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {caseItem.items.map((item) => (
                  <tr key={item.id} className="odd:bg-white/5">
                    <td className="px-3 py-2">{item.name}</td>
                    <td className="px-3 py-2">
                      <select
                        value={item.rarity}
                        onChange={(e) => updateItem(caseItem.id, item.id, { rarity: e.target.value as Item['rarity'] })}
                        className="rounded border border-white/20 bg-transparent px-2 py-1"
                      >
                        {rarityOptions.map((rarity) => (
                          <option key={rarity} value={rarity}>
                            {rarity}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(caseItem.id, item.id, { price: Number(e.target.value) })}
                        className="w-24 rounded border border-white/20 bg-transparent px-2 py-1"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => updateItem(caseItem.id, item.id, { weight: Number(e.target.value) })}
                        className="w-20 rounded border border-white/20 bg-transparent px-2 py-1"
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <button className="text-xs text-red-300" onClick={() => removeItemFromCase(caseItem.id, item.id)}>
                        удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form className="flex flex-wrap gap-2" onSubmit={(e) => handleNewItem(e, caseItem.id)}>
            <input
              placeholder="Название"
              className="flex-1 rounded border border-white/20 bg-transparent px-3 py-2"
              value={newItem[caseItem.id]?.name ?? ''}
              onChange={(e) => setNewItem((state) => ({ ...state, [caseItem.id]: { ...state[caseItem.id], name: e.target.value } }))}
            />
            <input
              placeholder="Цена"
              type="number"
              className="w-28 rounded border border-white/20 bg-transparent px-3 py-2"
              value={newItem[caseItem.id]?.price ?? ''}
              onChange={(e) => setNewItem((state) => ({ ...state, [caseItem.id]: { ...state[caseItem.id], price: Number(e.target.value) } }))}
            />
            <input
              placeholder="Вес"
              type="number"
              className="w-28 rounded border border-white/20 bg-transparent px-3 py-2"
              value={newItem[caseItem.id]?.weight ?? ''}
              onChange={(e) => setNewItem((state) => ({ ...state, [caseItem.id]: { ...state[caseItem.id], weight: Number(e.target.value) } }))}
            />
            <select
              className="w-36 rounded border border-white/20 bg-transparent px-3 py-2"
              value={newItem[caseItem.id]?.rarity ?? ''}
              onChange={(e) => setNewItem((state) => ({ ...state, [caseItem.id]: { ...state[caseItem.id], rarity: e.target.value } }))}
            >
              <option value="">Редкость</option>
              {rarityOptions.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity}
                </option>
              ))}
            </select>
            <button type="submit" className="rounded bg-gradient-to-r from-neon to-accent px-4 py-2 text-sm font-semibold text-black">
              Добавить предмет
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminCasesPage;
