import { createStreamFromFn } from "./funcs";
import { NodeDefinition } from "./types";

const inputs = [{ type: "boolean" }, { type: "any" }, { type: "any" }] as const;
const outputs = [{ type: "any" }] as const;
const option: NodeDefinition = {
  name: "if",
  inputs,
  outputs,
  init: () => {
    const stream = createStreamFromFn(
      (cond, a, b) => (cond ? a : b),
      inputs.map((v) => v.type),
      outputs[0].type
    );
    return {
      stream,
    };
  },
};
export default option;
