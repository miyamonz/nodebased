import { atom } from "jotai";
import type { AtomFn } from "../Variable/types";

export function createOutputAtom<IN, OUT>(
  inputAtoms: Parameters<AtomFn<IN, OUT>>[0],
  fn: (...args: IN[]) => OUT
): ReturnType<AtomFn<IN, OUT>> {
  const outAtom = atom((get) => {
    const inputValues = inputAtoms.map(get).map(get);
    return fn(...inputValues);
  });
  return outAtom;
}
