import { atom } from "jotai";
import { createAtomRef } from "../AtomRef";
import { createVariable } from "../Variable";

const inputAtoms = [createAtomRef(atom(100)), createAtomRef(atom(50))];
export const defaultNodeSizeVariable = createVariable(
  inputAtoms,
  (inputsAtom) =>
    atom((get) => {
      const [width, height] = get(inputsAtom);
      return { width, height };
    })
);
