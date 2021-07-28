import { initialState } from "../../redux/initialState";
import { defaultStyles } from "@/constants";
import { toInlineStyles } from "@/core/utils";
import { parse } from "@core/parse";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCol(col, resizeIndex = -1, width) {
  return `
    <div class="column" data-type="resizable" data-col="${resizeIndex}" style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createCell(state, row) {
  const defStyle = toInlineStyles(defaultStyles);
  return function (_, col = -1) {
    const id = `${row}:${col}`;
    const value = state.dataState[id] || "";
    const styles = state.stylesState[id] || defStyle;
    return `
            <div class="cell" contenteditable="true" 
            data-type="cell"
            data-col="${col}" data-id="${row}:${col}"
            data-value="${value}"
            style="${styles}; width: ${getWidth(state.colState, col)}">
            ${parse(value)}
            </div> 
            `;
  };
}

function createRow(state, index, content) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : ``;
  return `
    <div class="row" data-type="resizable" data-row="${index}" 
    style="height: ${getHeight(state.rowState, index)}">
        <div class="row-info">
            ${index}
            ${resize}
        </div>
        <div class="row-data">
            ${content}
        </div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];
  const cols = [...Array(colsCount)]
    .map(toChar)
    .map((col, index) => {
      const width = getWidth(state.colState, index);
      return createCol(col, index, width);
    })
    .join("");

  rows.push(createRow(state, "", cols));

  for (let row = 0; row < rowsCount; ++row) {
    const cells = [...Array(colsCount)].map(createCell(state, row)).join("");
    rows.push(createRow(state, row + 1, cells));
  }
  return rows.join("");
}
