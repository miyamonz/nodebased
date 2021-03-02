import { atom } from "jotai";
import type { Atom } from "jotai";
import type { AtomRef } from "../AtomRef";

type Refnize<T> = { [Key in keyof T]: AtomRef<T[Key]> };
export type InputAtom<Args extends unknown[]> = Atom<Refnize<Args>>;

export type OutputAtom<T> = Atom<T>;

export type Variable<IN extends unknown[], OUT> = {
  inputsAtom: InputAtom<IN>;
  outputAtoms: OutputAtom<OUT>[];
};

export function createVariable<IN extends unknown[], OUT>(
  inputsAtom: InputAtom<IN>,
  createOutput: (inputValuesAtom: Atom<IN>) => OutputAtom<OUT>
): Variable<IN, OUT> {
  const input = atom((get) => get(inputsAtom).map(get).map(get) as IN);
  const outputAtom: OutputAtom<OUT> = createOutput(input);
  return {
    inputsAtom,
    outputAtoms: [outputAtom],
  };
}
