import { atom } from "jotai";
import type { Variable } from "../Variable";

const option = {
  name: "inlet",
  init: () => {
    const refAtom = atom(atom(null));
    const outAtom = atom((get) => get(get(refAtom)));
    const variable: Variable = {
      inputAtoms: [refAtom as any],
      outputAtoms: [outAtom],
    };
    return { variable, saveData: false };
  },
};

export default option;
