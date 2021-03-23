import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream";

const option: NodeDefinition = {
  name: "outlet",
  inputs: [{ type: "any" }],
  outputs: [{ type: "any" }],
  init: () => {
    const refAtom = createAtomRef(atom(null));
    const outAtom = atom((get) => get(get(refAtom)));
    const stream: Stream = {
      inputMap: createMapAtomFromArray([refAtom as any]),
      outputMap: createMapAtomFromArray([outAtom]),
    };
    return { stream };
  },
};

export default option;
