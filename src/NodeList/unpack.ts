import { atom } from "jotai";

const option = {
  name: "unpack",
  init: () => {
    const pos = atom(atom({ x: 0, y: 0 }));
    const inputsAtom = atom([pos]);
    const outputAtoms = [
      atom((get) => get(get(pos)).x),
      atom((get) => get(get(pos)).y),
    ];
    const variable = { inputsAtom, outputAtoms } as any;
    return { variable };
  },
};
export default option;
