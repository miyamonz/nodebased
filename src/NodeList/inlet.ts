import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { Stream } from "../Stream";

const option: NodeDefinition = {
  name: "inlet",
  inputs: [{ type: "any" }],
  outputs: [{ type: "any" }],
  init: () => {
    const refAtom = atom(atom(null));
    const outAtom = atom((get) => get(get(refAtom)));
    const stream: Stream = {
      inputAtoms: atom(() => [refAtom as any]),
      outputAtoms: atom(() => [outAtom]),
    };
    return { stream };
  },
};

export default option;
