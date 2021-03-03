import { atom } from "jotai";
import { createVariable } from "../Variable";

const option = {
  name: "elapsed",
  init: () => {
    const variable = createVariable(atom([]), () => {
      const oscAtom = atom(0);
      oscAtom.onMount = (set) => {
        const id = setInterval(() => set((prev) => prev + 1));
        return () => clearInterval(id);
      };
      return oscAtom;
    });
    return {
      variable,
    };
  },
};
export default option;
