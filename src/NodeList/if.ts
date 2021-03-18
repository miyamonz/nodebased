import { createVariableFromFn } from "./funcs";
import { NodeDefinition } from "./types";

const option: NodeDefinition = {
  name: "if",
  inputs: [{ type: "boolean" }, { type: "any" }, { type: "any" }],
  outputs: [{ type: "any" }],
  init: () => {
    const variable = createVariableFromFn((cond, a, b) => (cond ? a : b));
    return {
      variable,
    };
  },
};
export default option;
