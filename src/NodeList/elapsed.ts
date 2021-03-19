import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createStream } from "../Stream";

const option: NodeDefinition = {
  name: "elapsed",
  outputs: [{ type: "number" }],
  init: () => {
    const stream = createStream([], () => {
      const oscAtom = atom(0);
      oscAtom.onMount = (set) => {
        const id = setInterval(() => set((prev) => prev + 1));
        return () => clearInterval(id);
      };
      return oscAtom;
    });
    return {
      stream,
    };
  },
};
export default option;
