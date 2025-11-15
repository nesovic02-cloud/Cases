import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CaseRoller from '../components/CaseRoller';
import ItemCard from '../components/ItemCard';
import { useAppStore } from '../store/useAppStore';

const CaseDetailsPage = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { cases, openCase, sellItem } = useAppStore();
  const targetCase = cases.find((c) => c.id === caseId);
  const [rolling, setRolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultId, setResultId] = useState<string | null>(null);
  const [resultValue, setResultValue] = useState<{ name: string; price: number; instanceId: string } | null>(null);

  if (!targetCase) {
    return (
      <div className="space-y-6">
        <p>Кейс не найден</p>
        <button className="underline" onClick={() => navigate('/cases')}>
          Вернуться
        </button>
      </div>
    );
  }

  const open = () => {
    if (rolling) return;
    setError(null);
    const response = openCase(targetCase.id);
    if (!response.success || !response.drop) {
      setError(response.message || 'Не удалось открыть кейс');
      return;
    }
    setRolling(true);
    setResultId(null);
    // Небольшая задержка чтобы успеть проиграть визуальную анимацию рулетки
    setTimeout(() => {
      setRolling(false);
      setResultId(response.drop.id);
      setResultValue({
        name: response.drop.name,
        price: response.drop.price,
        instanceId: response.drop.instanceId,
      });
    }, 3500);
  };

  const sell = () => {
    if (resultValue) {
      sellItem(resultValue.instanceId);
      setResultValue(null);
    }
  };

  const totalWeight = useMemo(
    () => targetCase.items.reduce((sum, item) => sum + item.weight, 0),
    [targetCase.items],
  );

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">case</p>
            <h1 className="text-4xl font-semibold">{targetCase.name}</h1>
            <p className="text-white/70">{targetCase.description}</p>
            <p className="mt-4 text-2xl font-semibold text-white">Цена: {targetCase.price} coins</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={open}
              className="w-full rounded-full bg-gradient-to-r from-neon to-accent px-8 py-4 text-lg font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!targetCase.isActive || rolling}
            >
              {rolling ? 'Крутится...' : 'Открыть кейс'}
            </button>
            {error && <p className="text-center text-sm text-red-400">{error}</p>}
          </div>
        </div>
      </div>

      <CaseRoller pool={targetCase.items} rolling={rolling} highlightId={resultId || undefined} />

      {resultValue && (
        <div className="rounded-2xl border border-accent/40 bg-black/40 p-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Вам выпало</p>
          <h3 className="text-3xl font-semibold text-white">{resultValue.name}</h3>
          <p className="text-white/80">Стоимость: {resultValue.price} coins</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setResultValue(null)}
              className="rounded-full border border-white/30 px-6 py-2 text-sm text-white"
            >
              Оставить в инвентаре
            </button>
            <button onClick={sell} className="rounded-full bg-gradient-to-r from-neon to-accent px-6 py-2 text-sm font-semibold text-black">
              Продать за {resultValue.price}
            </button>
          </div>
        </div>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Содержимое кейса</h2>
          <p className="text-sm text-white/60">Суммарный вес: {totalWeight}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {targetCase.items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CaseDetailsPage;
