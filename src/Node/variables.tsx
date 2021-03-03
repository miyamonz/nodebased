import { atom } from "jotai";
import { createAtomRef } from "../AtomRef";
import { createVariable, InputAtom } from "../Variable";

const inputAtoms: InputAtom<unknown>[] = [
  createAtomRef(atom(100)),
  createAtomRef(atom(50)),
];
export const defaultNodeSizeVariable = createVariable(
  inputAtoms,
  (inputsAtom) =>
    atom((get) => {
      const [width, height] = get(inputsAtom);
      return { width, height };
    })
);
