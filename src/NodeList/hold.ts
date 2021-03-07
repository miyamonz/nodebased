import { atom } from "jotai";
import { createAtomRef } from "../AtomRef";

const option = {
  name: "hold",
  init: () => {
    const condAtom = createAtomRef(atom(false));
    const inputAtom = createAtomRef(atom(null));
    const inputAtoms = [condAtom, inputAtom];

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
      }
      return get(tmpAtom);
    });
    const outputAtoms = [outAtom];
    const variable = {
      inputAtoms,
      outputAtoms,
    };
    return { variable };
  },
};
export default option;
