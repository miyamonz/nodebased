import { atom } from "jotai";
import { NodeDefinition } from "./types";
import type { Stream } from "../Stream";

const option: NodeDefinition = {
  name: "unpack",
  inputs: [{ type: "Position" }],
  outputs: [{ type: "number" }, { type: "number" }],
  init: () => {
    const pos = atom(atom({ x: 0, y: 0 }));
    const stream: Stream = {
      inputAtoms: atom(() => [pos as any]),
      outputAtoms: atom(() => [
        atom((get) => get(get(pos))?.x ?? 0),
        atom((get) => get(get(pos))?.y ?? 0),
      ]),
    };
    return { stream };
  },
};
export default option;
