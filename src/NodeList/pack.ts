import { atom } from "jotai";
import { NodeDefinition } from "./types";
import type { Stream } from "../Stream";

const option: NodeDefinition = {
  name: "pack",
  inputs: [{ type: "number" }, { type: "number" }],
  outputs: [{ type: "Position" }],

  init: () => {
    const xAtom = atom(atom(0));
    const yAtom = atom(atom(0));
    const outAtom = atom((get) => {
      const x = get(get(xAtom));
      const y = get(get(yAtom));
      return { x, y };
    });

    const stream: Stream = {
      inputAtoms: atom(() => [xAtom, yAtom] as any),
      outputAtoms: atom(() => [outAtom]),
    };
    return { stream };
  },
};
export default option;
