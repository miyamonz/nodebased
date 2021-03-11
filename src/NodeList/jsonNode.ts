import { atom } from "jotai";
import type { InputAtom, OutputAtom } from "../Variable";

const option = {
  name: "json",
  init: (args?: { data?: JSON }) => {
    const dataAtomRef = atom(atom(args?.data ?? {}));
    const inputAtoms: InputAtom<unknown>[] = [];
    const outputAtoms: OutputAtom<unknown>[] = [
      atom((get) => get(get(dataAtomRef))),
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable, saveData: true };
  },
};

export default option;
