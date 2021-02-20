import type { Atom, PrimitiveAtom } from "jotai";

type Input<T> = Atom<T>;
// TODO: PrimitiveAtom is not covariance
// you can't assign PrimitiveAtom<X> into PrimitiveAtom<X | Y>
export type InputAtom<T> = PrimitiveAtom<Input<T>>;
export type OutputAtom<T> = Atom<T>;

export type AtomFn<IN, OUT> = (inputs: InputAtom<IN>[]) => OutputAtom<OUT>;

export type Variable<IN, OUT> = {
  inputAtoms: InputAtom<IN>[];
  outputAtom: OutputAtom<OUT>;
};

export function createVariable<IN, OUT>(
  inputAtoms: InputAtom<IN>[],
  createOutput: AtomFn<IN, OUT>
): Variable<IN, OUT> {
  const outputAtom = createOutput(inputAtoms);
  return {
    inputAtoms,
    outputAtom,
  };
}
