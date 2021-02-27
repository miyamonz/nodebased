import { atom } from "jotai";
import { createAtomRef } from "../AtomRef";
import { createVariable, InputAtom } from "../Variable";

type Size = {
  width: number;
  height: number;
};
const inputAtoms: InputAtom<number>[] = [
  createAtomRef(atom(100)),
  createAtomRef(atom(50)),
];
export const defaultNodeSizeVariable = createVariable<number, Size>(
  inputAtoms,
  (atoms) => {
    return atom((get) => {
      const inputValues = atoms.map(get);
      return {
        width: inputValues[0],
        height: inputValues[1],
      };
    });
  }
);
