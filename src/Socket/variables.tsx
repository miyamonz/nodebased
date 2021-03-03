import { atom } from "jotai";
import { createVariable } from "../Variable";
import { createAtomRef } from "../AtomRef";

const inputAtoms = [createAtomRef(atom(10))];
export const socketRadiusVariable = createVariable(inputAtoms, (inputsAtom) =>
  atom((get) => {
    const inputValues = get(inputsAtom);
    return inputValues[0];
  })
);
