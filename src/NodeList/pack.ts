import { atom } from "jotai";

const option = {
  name: "pack",
  init: () => {
    const xAtom = atom(atom(0));
    const yAtom = atom(atom(0));
    const inputAtoms = [xAtom, yAtom];
    const outputAtoms = [
      atom((get) => {
        const x = get(get(xAtom));
        const y = get(get(yAtom));
        return { x, y };
      }),
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};
export default option;
