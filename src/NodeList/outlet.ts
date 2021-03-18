import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import type { Variable } from "../Variable";

const option: NodeDefinition = {
  name: "outlet",
  inputs: [{ type: "any" }],
  init: () => {
    const refAtom = createAtomRef(atom(null));
    const outAtom = atom((get) => get(get(refAtom)));
    const variable: Variable = {
      inputAtoms: atom(() => [refAtom as any]),
      outputAtoms: atom(() => [outAtom]),
    };
    return { variable };
  },
};

export default option;
