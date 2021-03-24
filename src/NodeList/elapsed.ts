import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createStream, Stream } from "../Stream";

const option: NodeDefinition = {
  name: "elapsed",
  outputs: [{ type: "number" }],
  init: () => {
    const stream: Stream = createStream([], () => {
      const oscAtom = atom(0);
      oscAtom.onMount = (set) => {
        const start = +new Date();
        const id = setInterval(() => set(+new Date() - start));
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
