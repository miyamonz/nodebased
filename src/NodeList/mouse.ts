import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { mouseAtom } from "../SVGContext";
import { createOneOutputVariable } from "../Variable";

const option: NodeDefinition = {
  name: "mouse",
  outputs: [{ type: "Position" }],
  init: () => {
    const variable = createOneOutputVariable(atom((get) => get(mouseAtom)));
    return { variable };
  },
};

export default option;
