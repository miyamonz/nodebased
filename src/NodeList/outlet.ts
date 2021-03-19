import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import type { Stream } from "../Stream";

const option: NodeDefinition = {
  name: "outlet",
  inputs: [{ type: "any" }],
  init: () => {
    const refAtom = createAtomRef(atom(null));
    const outAtom = atom((get) => get(get(refAtom)));
    const stream: Stream = {
      inputAtoms: atom(() => [refAtom as any]),
      outputAtoms: atom(() => [outAtom]),
    };
    return { stream };
  },
};

export default option;
