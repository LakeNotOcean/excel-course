import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CURRENT_STYLE,
  APPLY_STYLE,
  CHANGE_TITLE,
  CHANGE_DATE,
} from "./types";

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CURRENT_STYLE,
    data,
  };
}

export function changeDate(data) {
  return {
    type: CHANGE_DATE,
    data,
  };
}

// value, ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  };
}
