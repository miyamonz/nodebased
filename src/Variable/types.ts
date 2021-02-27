import { atom } from "jotai";
import type { Atom } from "jotai";
import type { AtomRef } from "../AtomRef";

export type InputAtom<T> = AtomRef<T>;
export type OutputAtom<T> = Atom<T>;

export type AtomFn<IN, OUT> = (inputs: Atom<IN>[]) => OutputAtom<OUT>;

export type Variable<IN, OUT> = {
  inputAtoms: InputAtom<IN>[];
  outputAtom: OutputAtom<OUT>;
};

export function createVariable<IN, OUT>(
  inputAtoms: InputAtom<IN>[],
  createOutput: AtomFn<IN, OUT>
): Variable<IN, OUT> {
  const input = inputAtoms.map((a) => atom((get) => get(get(a))));
  const outputAtom = createOutput(input);
  return {
    inputAtoms,
    outputAtom,
  };
}
