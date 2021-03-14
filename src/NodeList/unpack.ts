import { atom } from "jotai";
import type { Variable } from "../Variable";

const option = {
  name: "unpack",
  init: () => {
    const pos = atom(atom({ x: 0, y: 0 }));
    const variable: Variable = {
      inputAtoms: atom(() => [pos as any]),
      outputAtoms: atom(() => [
        atom((get) => get(get(pos))?.x),
        atom((get) => get(get(pos))?.y),
      ]),
    };
    return { variable };
  },
};
export default option;
