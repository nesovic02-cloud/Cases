import { Link } from 'react-router-dom';
import { Case } from '../types';

interface Props {
  data: Case;
}

const CaseCard = ({ data }: Props) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-neon/60">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-widest text-white/60">{data.isActive ? 'Активен' : 'Скрыт'}</p>
        <h3 className="text-xl font-semibold text-white">{data.name}</h3>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">{data.price} coins</span>
    </div>
    <p className="mb-4 text-sm text-white/70">{data.description}</p>
    <div className="mb-5 flex gap-2">
      {data.items.slice(0, 4).map((item) => (
        <img
          key={item.id}
          src={item.imageUrl}
          alt={item.name}
          className="h-14 w-14 rounded-xl border border-white/10 object-cover"
        />
      ))}
    </div>
    <Link
      to={`/cases/${data.id}`}
      className="inline-flex rounded-full bg-gradient-to-r from-neon to-accent px-5 py-2 font-semibold text-black"
    >
      Открыть
    </Link>
  </div>
);

export default CaseCard;
