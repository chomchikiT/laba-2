// ─────────────────────────────────────────────
// ЛР2 · Учёт консультаций · script.js
// ─────────────────────────────────────────────

// ══════════════════════════════════════════════
// 2.1. Конфигурация приложения (const/let)
// ══════════════════════════════════════════════

const appConfig = {
  appTitle: "КонсультПро — Учёт консультаций",
  defaultStatus: "new",
  minValueForFilter: 800
};

let actionCount = 0;
actionCount += 1;
actionCount += 1;
actionCount++;

appConfig.minValueForFilter = 900;

console.log("=== 2.1. Конфигурация ===");
console.log("actionCount:", actionCount);
console.log("appConfig:", appConfig);

// ══════════════════════════════════════════════
// 2.2. Данные предметной области (6 объектов)
// ══════════════════════════════════════════════

const consultations = [
  {
    id: 1,
    title: "Консультация по трудовому праву",
    value: 1500,
    status: "new",
    createdAt: "2025-03-01"
  },
  {
    id: 2,
    title: "Налоговое планирование для ИП",
    value: 2200,
    status: "done",
    createdAt: "2025-03-05"
  },
  {
    id: 3,
    title: "Анализ договора аренды",
    value: 700,
    status: "new",
    createdAt: "2025-03-08"
  },
  {
    id: 4,
    title: "Консультация по семейному праву",
    value: 1100,
    status: "new",
    createdAt: "2025-03-10"
  },
  {
    id: 5,
    title: "Юридическая проверка сделки",
    value: 3000,
    status: "done",
    createdAt: "2025-03-12"
  },
  {
    id: 6,
    title: "Консультация по банкротству",
    value: 500,
    status: "new",
    createdAt: "2025-03-15"
  }
];

console.log("\n=== 2.2. Данные ===");
console.log(consultations);

// ══════════════════════════════════════════════
// 2.3. Приведение типов и ввод данных
// ══════════════════════════════════════════════

const inputMinValue = "900";
const minValue = Number(inputMinValue);

console.log("\n=== 2.3. Приведение типов ===");
if (Number.isNaN(minValue)) {
  console.log("Ошибка: введено не число");
} else {
  console.log("Порог фильтрации:", minValue);
}

// ══════════════════════════════════════════════
// 2.4. Операторы: проверка доступа
// ══════════════════════════════════════════════

const userAge = 25;
const isBlocked = false;
const hasAccess = userAge >= 18 && userAge < 65 && !isBlocked;

console.log("\n=== 2.4. Доступ ===");
console.log("hasAccess:", hasAccess);

// ══════════════════════════════════════════════
// 2.5. Условия: switch + if/else
// ══════════════════════════════════════════════

console.log("\n=== 2.5. Условия ===");

const item = consultations[0];

switch (item.status) {
  case "new":
    console.log("Статус: Новая запись");
    break;
  case "done":
    console.log("Статус: Завершено");
    break;
  default:
    console.log("Статус: Неизвестный статус");
}

if (item.value >= 1000) {
  console.log("Категория: Высокое значение");
} else if (item.value >= 700) {
  console.log("Категория: Среднее значение");
} else {
  console.log("Категория: Низкое значение");
}

// ══════════════════════════════════════════════
// 2.6. Циклы: подсчёт status === "new"
// ══════════════════════════════════════════════

let newCount = 0;
for (let i = 0; i < consultations.length; i++) {
  if (consultations[i].status === "new") {
    newCount++;
  }
}

console.log("\n=== 2.6. Циклы ===");
console.log('Количество status="new":', newCount);

// ══════════════════════════════════════════════
// Вспомогательные функции
// ══════════════════════════════════════════════

function getStatusLabel(status) {
  switch (status) {
    case "new":  return "Новая";
    case "done": return "Завершена";
    default:     return "Неизвестно";
  }
}

function getValueCategory(value) {
  if (value >= 1000) return "Высокое значение";
  if (value >= 700)  return "Среднее значение";
  return "Низкое значение";
}

// ══════════════════════════════════════════════
// 3. Интерактивный вывод — обработчики кнопок
// ══════════════════════════════════════════════

const output = document.getElementById("output");
const btnAll   = document.getElementById("btnAll");
const btnNew   = document.getElementById("btnNew");
const btnStats = document.getElementById("btnStats");

// ── Кнопка: Показать все записи ──
btnAll.addEventListener("click", function () {
  let text = "══ ВСЕ КОНСУЛЬТАЦИИ ══\n\n";

  for (let i = 0; i < consultations.length; i++) {
    const c = consultations[i];
    text += "#" + c.id + " · " + c.title + "\n";
    text += "   Статус:   " + getStatusLabel(c.status) + "\n";
    text += "   Стоимость: " + c.value + " ₽  (" + getValueCategory(c.value) + ")\n";
    text += "   Дата:      " + c.createdAt + "\n\n";
  }

  text += "Итого записей: " + consultations.length;
  output.textContent = text;
});

// ── Кнопка: Показать только NEW ──
btnNew.addEventListener("click", function () {
  let text = "══ ТОЛЬКО НОВЫЕ (status = \"new\") ══\n\n";
  let count = 0;

  for (let i = 0; i < consultations.length; i++) {
    const c = consultations[i];
    if (c.status === "new") {
      text += "#" + c.id + " · " + c.title + "\n";
      text += "   Стоимость: " + c.value + " ₽\n";
      text += "   Дата:      " + c.createdAt + "\n\n";
      count++;
    }
  }

  text += "Найдено новых записей: " + count;
  output.textContent = text;
});

// ── Кнопка: Показать статистику ──
btnStats.addEventListener("click", function () {
  const inputMinStr = "900";
  const filterMin = Number(inputMinStr);

  let sum = 0;
  let max = consultations[0].value;
  let countNew = 0;

  for (let i = 0; i < consultations.length; i++) {
    const c = consultations[i];
    sum += c.value;
    if (c.value > max) {
      max = c.value;
    }
    if (c.status === "new") {
      countNew++;
    }
  }

  let text = "══ СТАТИСТИКА ══\n\n";

  if (Number.isNaN(filterMin)) {
    text += "⚠ Порог фильтрации: ошибка ввода (NaN)\n\n";
  } else {
    text += "Данные корректны\n\n";
  }

  text += "Всего записей:          " + consultations.length + "\n";
  text += "Сумма стоимостей:       " + sum + " ₽\n";
  text += "Максимальная стоимость: " + max + " ₽\n";
  text += "Кол-во status=\"new\":   " + countNew + "\n\n";

  text += "── Фильтр: стоимость ≥ " + filterMin + " ₽ ──\n";

  let hasFiltered = false;
  let n = 0;
  while (n < consultations.length) {
    const c = consultations[n];
    if (c.value >= filterMin) {
      text += "  #" + c.id + " · " + c.title + " — " + c.value + " ₽\n";
      hasFiltered = true;
    }
    n++;
  }

  if (!hasFiltered) {
    text += "  Записей с таким значением не найдено.";
  }

  output.textContent = text;
});

// ══════════════════════════════════════════════
// Hero — обновить счётчики
// ══════════════════════════════════════════════

document.getElementById("statTotal").textContent = consultations.length;
document.getElementById("statNew").textContent   = newCount;
