import { createStreamFromFn } from "./funcs";
import { NodeDefinition } from "./types";

const option: NodeDefinition = {
  name: "if",
  inputs: [{ type: "boolean" }, { type: "any" }, { type: "any" }],
  outputs: [{ type: "any" }],
  init: () => {
    const stream = createStreamFromFn((cond, a, b) => (cond ? a : b));
    return {
      stream,
    };
  },
};
export default option;
