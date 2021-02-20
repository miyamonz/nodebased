import { atom } from "jotai";
import type { Fn } from "../Variable/types";

export function createOutputAtom<IN, OUT>(
  inputAtoms: Parameters<Fn<IN, OUT>>[0],
  fn: (...args: IN[]) => OUT
): ReturnType<Fn<IN, OUT>> {
  const outAtom = atom((get) => {
    const inputValues = inputAtoms.map(get).map(get);
    return fn(...inputValues);
  });
  return outAtom;
}
