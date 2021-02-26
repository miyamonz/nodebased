import { atom } from "jotai";
import { createVariable, InputAtom } from "../Variable";

const inputAtoms: InputAtom<number>[] = [atom(atom(10))] as any;
export const socketRadiusVariable = createVariable<number, number>(
  inputAtoms,
  (atoms: typeof inputAtoms) => {
    return atom((get) => {
      const inputValues = atoms.map(get).map(get);
      return inputValues[0];
    });
  }
);
