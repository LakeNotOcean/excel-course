import { evaluate } from "mathjs";

export function parse(value = "") {
  if (value.startsWith("=")) {
    let res = "";

    try {
      res = evaluate(value.slice(1));
    } catch (e) {
      return value;
    }
    return res;
  }
  return value;
}
