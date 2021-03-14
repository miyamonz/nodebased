import { atom } from "jotai";
import { createAtomRef } from "../AtomRef";
import type { Variable } from "../Variable";

const option = {
  name: "outlet",
  init: () => {
    const refAtom = createAtomRef(atom(null));
    const outAtom = atom((get) => get(get(refAtom)));
    const variable: Variable = {
      inputAtoms: atom(() => [refAtom as any]),
      outputAtoms: atom(() => [outAtom]),
    };
    return { variable, saveData: false };
  },
};

export default option;
