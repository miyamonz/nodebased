import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createMapAtomFromArray, Stream } from "../Stream";

const option: NodeDefinition = {
  name: "unpack",
  inputs: [{ type: "Position" }],
  outputs: [{ type: "number" }, { type: "number" }],
  init: () => {
    const pos = atom(atom({ x: 0, y: 0 }));
    const stream: Stream = {
      inputMap: createMapAtomFromArray([pos as any]),
      outputMap: createMapAtomFromArray([
        atom((get) => get(get(pos))?.x ?? 0),
        atom((get) => get(get(pos))?.y ?? 0),
      ]),
    };
    return { stream };
  },
};
export default option;
