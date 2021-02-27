import { atom } from "jotai";
import { createVariable, InputAtom } from "../Variable";
import { createAtomRef } from "../AtomRef";

const inputAtoms: InputAtom<number>[] = [createAtomRef(atom(10))];
export const socketRadiusVariable = createVariable<number, number>(
  inputAtoms,
  (atoms: typeof inputAtoms) => {
    return atom((get) => {
      const inputValues = atoms.map(get);
      return inputValues[0];
    });
  }
);
