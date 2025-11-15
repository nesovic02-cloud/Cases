const faqs = [
  {
    title: 'Как считаются шансы?',
    body:
      'Каждый предмет внутри кейса имеет вес. Сумма весов определяет 100%. Чем выше вес, тем выше вероятность выпасть.',
  },
  {
    title: 'Что значит provably fair?',
    body:
      'Перед стартом раунда мы генерируем server seed и публикуем его хэш. Пользователь выбирает client seed (например, ID сессии). После открытия мы раскрываем server seed, и любой желающий может пересчитать хэш и убедиться, что результат честный.',
  },
  {
    title: 'Это настоящий магазин?',
    body: 'Нет. Сейчас это демо/симулятор без вывода и без привязки к Steam. Баланс — фановые coins.',
  },
];

const FaqPage = () => (
  <div className="space-y-6">
    <h1 className="text-4xl font-semibold">FAQ</h1>
    <p className="text-white/70">Ответы на самые частые вопросы сообщества.</p>
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details key={faq.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <summary className="cursor-pointer text-lg font-semibold">{faq.title}</summary>
          <p className="mt-3 text-white/70">{faq.body}</p>
        </details>
      ))}
    </div>
  </div>
);

export default FaqPage;
