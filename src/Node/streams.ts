import { atom } from "jotai";
import { createAtomRef } from "../AtomRef";
import { createStream } from "../Stream";

const inputAtoms = [createAtomRef(atom(100)), createAtomRef(atom(50))];
export const defaultNodeSizeStream = createStream(
  inputAtoms,
  (inputsAtom) =>
    atom((get) => {
      const [width, height] = get(inputsAtom);
      return { width, height };
    })
);
