import { ReactNode } from 'react';
import clsx from 'clsx';
import { rarityColorMap } from '../utils/random';
import { Item } from '../types';

interface Props {
  item: Item;
  extra?: ReactNode;
}

const ItemCard = ({ item, extra }: Props) => (
  <div
    className={clsx(
      'rounded-xl border border-white/10 bg-gradient-to-br p-4 text-white shadow-lg shadow-black/40',
      rarityColorMap[item.rarity],
    )}
  >
    <div className="flex items-center gap-4">
      <img src={item.imageUrl} alt={item.name} className="h-16 w-16 rounded-lg border border-white/20 object-cover" />
      <div className="flex-1">
        <p className="text-xs uppercase tracking-widest text-white/70">{item.rarity}</p>
        <p className="text-lg font-semibold">{item.name}</p>
        <p className="text-sm text-white/80">{item.price} coins</p>
        <p className="text-xs text-white/70">Вес: {item.weight}</p>
      </div>
      {extra}
    </div>
  </div>
);

export default ItemCard;
