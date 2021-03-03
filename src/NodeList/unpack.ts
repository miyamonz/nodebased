import { atom } from "jotai";

const option = {
  name: "unpack",
  init: () => {
    const pos = atom(atom({ x: 0, y: 0 }));
    const inputAtoms = [pos];
    const outputAtoms = [
      atom((get) => get(get(pos)).x),
      atom((get) => get(get(pos)).y),
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};
export default option;
