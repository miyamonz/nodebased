import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { mouseAtom } from "../SVGContext";
import { createOneOutputStream } from "../Stream";

const option: NodeDefinition = {
  name: "mouse",
  outputs: [{ type: "Position" }],
  init: () => {
    const stream = createOneOutputStream(atom((get) => get(mouseAtom)));
    return { stream };
  },
};

export default option;
