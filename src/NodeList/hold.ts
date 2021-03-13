import { atom } from "jotai";
import { createAtomRef } from "../AtomRef";
import type { Variable } from "../Variable";

const option = {
  name: "hold",
  init: () => {
    const condAtom = createAtomRef(atom(false));
    const inputAtom = createAtomRef(atom<unknown>(null));

    const tmpAtom = atom(null);
    let setter: any;
    tmpAtom.onMount = (set) => {
      setter = set;
    };

    const outAtom = atom((get) => {
      const cond = get(get(condAtom));

      if (cond) {
        const a = get(get(inputAtom));
        setter(a);
      } else {
        const a = get(get(inputAtom));
        if (
          typeof a?.x === "number" &&
          typeof a?.y === "number" &&
          get(tmpAtom) === null &&
          setter !== undefined
        ) {
          setter({ x: 0, y: 0 });
        }
      }
      return get(tmpAtom);
    });
    const variable: Variable = {
      inputAtoms: [condAtom, inputAtom as any],
      outputAtoms: [outAtom],
    };
    return { variable };
  },
};
export default option;
