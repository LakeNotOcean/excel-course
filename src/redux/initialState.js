import { defaultStyles } from "../constants";
import { storage, cloneWithJSON } from "@core/utils";

export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: "",
  currentStyles: defaultStyles,
  stylesState: {},
  title: "Новая Таблица",
  dateOfChange: 0,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : cloneWithJSON(defaultState); //JSON.parse(JSON.stringify(defaultState));
}

// export const initialState = storage("excel-state")
//   ? normalize(storage("excel-state"))
//   : defaultState;
