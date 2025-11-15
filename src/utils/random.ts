import { Item } from '../types';

export const pickByWeight = (items: Item[]): Item => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const roll = Math.random() * totalWeight;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.weight;
    // Здесь происходит ключевой выбор предмета по взвешенному рандому
    if (roll <= cumulative) {
      return item;
    }
  }
  return items[items.length - 1];
};

export const rarityColorMap: Record<string, string> = {
  common: 'from-slate-600 to-slate-800',
  uncommon: 'from-cyan-500/60 to-sky-800',
  rare: 'from-blue-500/70 to-indigo-800',
  epic: 'from-purple-500/70 to-pink-700',
  legendary: 'from-amber-400/80 to-orange-700',
  mythic: 'from-lime-200/80 to-yellow-600',
};
