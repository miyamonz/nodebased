import { atom } from "jotai";
import type { Atom } from "jotai";
import type { AtomRef } from "../AtomRef";

export type InputAtom<T> = AtomRef<T>;
export type OutputAtom<T> = Atom<T>;

export type Variable = {
  inputAtoms: InputAtom<unknown>[];
  outputAtoms: OutputAtom<unknown>[];
};

export function createVariable(
  inputAtoms: InputAtom<unknown>[],
  createOutput: (inputValuesAtom: Atom<unknown>) => OutputAtom<unknown>
): Variable {
  const input = atom((get) => inputAtoms.map(get).map(get));
  const outputAtom: OutputAtom<unknown> = createOutput(input);
  return {
    inputAtoms,
    outputAtoms: [outputAtom],
  };
}
