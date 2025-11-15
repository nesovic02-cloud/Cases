import { useMemo } from 'react';
import { Item } from '../types';

interface Props {
  pool: Item[];
  highlightId?: string;
  rolling: boolean;
}

const CaseRoller = ({ pool, highlightId, rolling }: Props) => {
  const sequence = useMemo(() => {
    const extended = Array.from({ length: 30 }, (_, index) => pool[index % pool.length]);
    return extended;
  }, [pool]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="absolute left-1/2 top-0 z-20 h-full w-1 border-l border-white/60" />
      <div className="flex gap-3" style={{ width: 'max-content' }}>
        <div className={rolling ? 'case-roll-active flex gap-3' : 'flex gap-3'}>
          {sequence.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`min-w-[90px] rounded-xl border px-3 py-2 text-center text-xs uppercase tracking-wide ${
                highlightId === item.id ? 'border-accent bg-accent/20' : 'border-white/10 bg-white/5'
              }`}
            >
              <img src={item.imageUrl} alt={item.name} className="mx-auto mb-1 h-12 w-12 rounded" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseRoller;
