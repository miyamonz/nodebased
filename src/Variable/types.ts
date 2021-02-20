import { atom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";

type Input<T> = Atom<T> | PrimitiveAtom<T>;
// TODO: PrimitiveAtom is not covariance
// you can't assign PrimitiveAtom<X> into PrimitiveAtom<X | Y>
export type InputAtom<T> = PrimitiveAtom<Input<T>>;
export type OutputAtom<T> = Atom<T>;

export type Fn<IN, OUT> = (inputs: InputAtom<IN>[]) => OutputAtom<OUT>;

export type Variable<IN, OUT> = {
  inputAtoms: InputAtom<IN>[];
  outputAtom: OutputAtom<OUT>;
};

export function createVariable<IN, OUT>(
  inputAtoms: InputAtom<IN>[],
  createOutput: Fn<IN, OUT>
): Variable<IN, OUT> {
  const outputAtom = createOutput(inputAtoms);
  return {
    inputAtoms,
    outputAtom,
  };
}

export function createDefaultVariable(
  num: number,
  createOutput: Fn<number, number>
) {
  const inputAtoms: InputAtom<number>[] = [...Array(num).keys()].map(() => {
    return atom(atom(0)) as any; // TODO: PrimitiveAtom is not covariance
  });
  return createVariable(inputAtoms, createOutput);
}
