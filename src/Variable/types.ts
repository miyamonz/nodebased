import { atom } from "jotai";
import type { NodeFn, InputAtom, OutputAtom } from "../Node/types";

export type Variable<IN, OUT> = {
  inputAtoms: InputAtom<IN>[];
  outputAtom: OutputAtom<OUT>;
};

export function createVariable<IN, OUT>(
  inputAtoms: InputAtom<IN>[],
  createOutput: NodeFn<IN, OUT>
): Variable<IN, OUT> {
  const outputAtom = createOutput(inputAtoms);
  return {
    inputAtoms,
    outputAtom,
  };
}

export function createDefaultVariable(
  num: number,
  createOutput: NodeFn<number>
) {
  const inputAtoms: InputAtom<number>[] = [...Array(num).keys()].map(() => {
    return atom(atom(0)) as any; // TODO: PrimitiveAtom is not covariance
  });
  return createVariable(inputAtoms, createOutput);
}
