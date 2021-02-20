import { atom } from "jotai";

import type { NodeFn } from "../Node/types";

export function createOutputAtom<IN, OUT>(
  inputAtoms: Parameters<NodeFn<IN, OUT>>[0],
  fn: (...args: IN[]) => OUT
): ReturnType<NodeFn<IN, OUT>> {
  const outAtom = atom((get) => {
    const inputValues = inputAtoms.map(get).map(get);
    return fn(...inputValues);
  });
  return outAtom;
}
