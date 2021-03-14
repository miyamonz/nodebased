import { atom } from "jotai";
import type { Atom } from "jotai";
import type { AtomRef } from "../AtomRef";

export type InputAtom<T> = AtomRef<T>;
export type OutputAtom<T> = Atom<T>;

export type Variable = {
  inputAtoms: Atom<InputAtom<unknown>[]>;
  outputAtoms: Atom<OutputAtom<unknown>[]>;
};

export function createVariable<IN, OUT>(
  inputAtoms: InputAtom<IN>[],
  createOutput: (inputValuesAtom: Atom<IN[]>) => OutputAtom<OUT>
): Variable {
  const input = atom((get) => inputAtoms.map(get).map(get));
  const outputAtom = createOutput(input);
  return {
    inputAtoms: atom(() => inputAtoms as any),
    outputAtoms: atom(() => [outputAtom]),
  };
}

export function createOneOutputVariable<T>(outputAtom: Atom<T>): Variable {
  return {
    inputAtoms: atom(() => []),
    outputAtoms: atom(() => [outputAtom]),
  };
}
export function createOneInputVariable<T>(inputAtom: AtomRef<T>): Variable {
  return {
    inputAtoms: atom(() => [inputAtom as any]),
    outputAtoms: atom(() => []),
  };
}
