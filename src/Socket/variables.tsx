import { atom } from "jotai";
import { createVariable } from "../Variable";
import { createAtomRef } from "../AtomRef";

const inputAtoms = [createAtomRef(atom(10))];
export const socketRadiusVariable = createVariable(inputAtoms, (atoms) => {
  return atom((get) => {
    const inputValues = atoms.map(get);
    return inputValues[0];
  });
});
