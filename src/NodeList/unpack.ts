import { atom } from "jotai";
import { NodeDefinition } from "./types";
import type { Variable } from "../Variable";

const option: NodeDefinition = {
  name: "unpack",
  inputs: [{ type: "Position" }],
  outputs: [{ type: "number" }, { type: "number" }],
  init: () => {
    const pos = atom(atom({ x: 0, y: 0 }));
    const variable: Variable = {
      inputAtoms: atom(() => [pos as any]),
      outputAtoms: atom(() => [
        atom((get) => get(get(pos))?.x ?? 0),
        atom((get) => get(get(pos))?.y ?? 0),
      ]),
    };
    return { variable };
  },
};
export default option;
