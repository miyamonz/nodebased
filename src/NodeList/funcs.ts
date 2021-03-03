import { atom } from "jotai";

import { createVariable } from "../Variable";

import { createAtomRef } from "../AtomRef";

const range = (num: number) => [...Array(num).keys()];

export function createVariableFromFn(fn: (...args: unknown[]) => unknown) {
  const num = fn.length;
  const inputAtoms = range(num).map(() => createAtomRef(atom(0)));
  return createVariable(inputAtoms, (inputs) =>
    atom((get) => fn(...get(inputs)))
  );
}
