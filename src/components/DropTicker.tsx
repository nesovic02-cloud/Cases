import { useAppStore } from '../store/useAppStore';

const DropTicker = () => {
  const { drops } = useAppStore();
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Последние дропы</h3>
        <span className="text-sm text-white/60">обновляется в реальном времени</span>
      </div>
      <div className="flex flex-col gap-3">
        {drops.map((drop) => (
          <div key={drop.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm">
            <div>
              <p className="font-semibold">{drop.userName}</p>
              <p className="text-white/60">
                {drop.caseName} → <span className="text-white">{drop.itemName}</span>
              </p>
            </div>
            <span className="text-white/80">{drop.itemPrice} coins</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropTicker;
