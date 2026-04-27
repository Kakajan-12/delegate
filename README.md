# Badge App — регистрация участников конференции

Next.js 15 + Neon Postgres + Tailwind. Деплой на Vercel за 5 минут.

## Что внутри

- Форма регистрации (имя, фамилия, компания, категория)
- 5 категорий с цветами: Делегат, Визитор, Пресс, Спикер, Организатор
- Живой предпросмотр беджа (90×55 мм)
- Список участников с поиском, фильтром, экспортом в CSV
- Автоматическое открытие диалога печати после регистрации
- Хранение в Postgres (Neon) — данные не теряются

## Локальный запуск

```bash
npm install
# Создай .env.local с DATABASE_URL (см. ниже)
echo "DATABASE_URL=postgres://..." > .env.local
npm run dev
```

Открой http://localhost:3000

## Деплой на Vercel (5 минут)

1. Залей проект в GitHub:
   ```bash
   git init && git add . && git commit -m "init"
   gh repo create badge-app --public --source=. --push
   ```

2. Открой https://vercel.com/new и импортируй репозиторий.

3. В настройках проекта на Vercel: **Storage → Create Database → Neon (Postgres)**.
   Vercel автоматически добавит `DATABASE_URL` в env vars.

4. Нажми **Deploy**. Готово — публичный URL вида `badge-app.vercel.app`.

База инициализируется автоматически при первом запросе (см. `ensureSchema` в `lib/db.ts`).

## Структура

```
app/
  page.tsx              # главная (форма + список)
  print/[id]/page.tsx   # страница печати с auto window.print()
  layout.tsx
  globals.css           # @page 90mm 55mm + @media print
components/
  Badge.tsx             # сам бейдж (используется и в превью, и в печати)
  RegistrationForm.tsx  # клиентская форма
  ParticipantsList.tsx  # список с фильтрами
  PrintTrigger.tsx      # вызывает window.print() при загрузке
lib/
  db.ts                 # подключение к Neon + категории
  actions.ts            # server actions (CRUD)
```

## Печать

Используется нативный `window.print()` + CSS `@page { size: 90mm 55mm }`.
Работает с любым принтером бейджей (Brother QL, Zebra и т.д.) и с обычным
лазерным принтером — там нужно выбрать в диалоге печати "по размеру страницы".
