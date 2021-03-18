import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createVariable } from "../Variable";

const option: NodeDefinition = {
  name: "elapsed",
  outputs: [{ type: "number" }],
  init: () => {
    const variable = createVariable([], () => {
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
