import { atom } from "jotai";
import { createStream } from "../Stream";
import { createAtomRef } from "../AtomRef";

const inputAtoms = [createAtomRef(atom(10))];
export const socketRadiusStream = createStream(inputAtoms, (inputsAtom) =>
  atom((get) => {
    const inputValues = get(inputsAtom);
    return inputValues[0];
  })
);
