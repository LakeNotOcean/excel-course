import { storage } from "@core/utils";

function toHTML(key) {
  const model = storage(key);
  const id = key.split(":")[1];

  return `
    <li class="db__record">
        <a href="#excel/${id}">
            ${model.title}
        </a>
        <strong>${new Date(model.dateOfChange).toLocaleString()}</strong>
    </li>`;
}

// excel:id
function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; ++i) {
    const key = localStorage.key(i);
    if (key.includes("excel")) {
      keys.push(key);
    }
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (keys.length == 0) return `<p>Отсутствуют таблицы</p?`;
  return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>
    <div class="db__list">
        ${keys.map(toHTML).join("")}
    </div>`;
}
