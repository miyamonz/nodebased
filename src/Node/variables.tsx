import { atom } from "jotai";
import { createVariable, InputAtom } from "../Variable";

type Size = {
  width: number;
  height: number;
};
const inputAtoms: InputAtom<number>[] = [
  atom(atom(100)),
  atom(atom(50)),
] as any;
export const defaultNodeSizeVariable = createVariable<number, Size>(
  inputAtoms,
  (atoms: typeof inputAtoms) => {
    return atom((get) => {
      const inputValues = atoms.map(get).map(get);
      return {
        width: inputValues[0],
        height: inputValues[1],
      };
    });
  }
);
