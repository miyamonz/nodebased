import { atom } from "jotai";
import type { Atom } from "jotai";
import type { AtomRef } from "../AtomRef";

export type InputAtom<T> = AtomRef<T>;
export type OutputAtom<T> = Atom<T>;

export type Stream = {
  inputAtoms: Atom<InputAtom<unknown>[]>;
  outputAtoms: Atom<OutputAtom<unknown>[]>;
};

export function createStream<IN, OUT>(
  inputAtoms: InputAtom<IN>[],
  createOutput: (inputValuesAtom: Atom<IN[]>) => OutputAtom<OUT>
): Stream {
  const input = atom((get) => inputAtoms.map(get).map(get));
  const outputAtom = createOutput(input);
  return {
    inputAtoms: atom(() => inputAtoms as any),
    outputAtoms: atom(() => [outputAtom]),
  };
}

export function createOneOutputStream<T>(outputAtom: Atom<T>): Stream {
  return {
    inputAtoms: atom(() => []),
    outputAtoms: atom(() => [outputAtom]),
  };
}
export function createOneInputStream<T>(inputAtom: AtomRef<T>): Stream {
  return {
    inputAtoms: atom(() => [inputAtom as any]),
    outputAtoms: atom(() => []),
  };
}
