import { cloneWithJSON } from "../utils";

export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: "__INIT__" });
  let listeners = [];

  return {
    subscribe(func) {
      listeners.push(func);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== func);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return cloneWithJSON(state); //JSON.parse(JSON.stringify(state));
    },
  };
}
