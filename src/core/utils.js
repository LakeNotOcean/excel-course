import { defaultStyles } from "@/constants";
import { defaultState } from "../redux/initialState";

export function capitalize(string) {
  if (typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    start = start ^ end;
    end = start ^ end;
    start = start ^ end;
  }
  return [...Array(end - start + 1).keys()].map((i) => i + start);
}

export function matrix(target, current) {
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, col, row) {
  console.log(key);
  switch (key) {
    case "Enter":
    case "ArrowDown":
      row++;
      break;
    case "Tab":
    case "ArrowRight":
      col++;
      break;
    case "ArrowLeft":
      col--;
      break;
    case "ArrowUp":
      row--;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}

export function storage(key, data = null) {
  if (!data) {
    return (
      JSON.parse(localStorage.getItem(key)) ||
      JSON.parse(JSON.stringify(defaultState))
    );
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(defaultStyles)
    .map(
      (key) => `${camelToDashCase(key)}:${styles[key] || defaultStyles[key]}`
    )
    .join(";");
}

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function cloneWithJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event) {
  event.preventDefault;
}
