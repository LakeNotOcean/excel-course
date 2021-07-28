import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CURRENT_STYLE,
  APPLY_STYLE,
  CHANGE_TITLE,
  CHANGE_DATE,
} from "./types";
import { toInlineStyles } from "@core/utils";

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      if (action.data.rowOrCol === "col") {
        value(state, "colState", action);
      } else {
        value(state, "rowState", action);
      }
      return state;
    case CHANGE_TEXT:
      value(state, "dataState", action);
      state.currentText = action.data.value;
      return state;
    case CURRENT_STYLE:
      state.currentStyles = action.data;
      return state;
    case APPLY_STYLE:
      state.stylesState = state.stylesState || {};
      state.currentStyles = { ...state.currentStyles, ...action.data.value };
      action.data.ids.forEach((id) => {
        state.stylesState[id] = toInlineStyles(state.currentStyles);
      });
      return state;
    case CHANGE_TITLE:
      state.title = action.data;
      return state;
    case CHANGE_DATE:
      state.dateOfChange = action.data;
    default:
      return state;
  }
}

function value(state, field, action) {
  state[field] = state[field] || {};
  state[field][action.data.id] = action.data.value;
}
