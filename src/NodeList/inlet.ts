import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { Variable } from "../Variable";

const option: NodeDefinition = {
  name: "inlet",
  outputs: [{ type: "any" }],
  init: () => {
    const refAtom = atom(atom(null));
    const outAtom = atom((get) => get(get(refAtom)));
    const variable: Variable = {
      inputAtoms: atom(() => [refAtom as any]),
      outputAtoms: atom(() => [outAtom]),
    };
    return { variable };
  },
};

export default option;
