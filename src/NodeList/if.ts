import { createVariableFromFn } from "./funcs";

const option = {
  name: "if",
  init: () => {
    const variable = createVariableFromFn((cond, a, b) => (cond ? a : b));
    return {
      variable,
    };
  },
};
export default option;
