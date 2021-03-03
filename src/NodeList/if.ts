import type { Variable } from "../Variable";
import { createVariableFromFn } from "./funcs";

const option = {
  name: "if",
  init: () => {
    const variable = createVariableFromFn((cond, a, b) =>
      cond ? a : b
    ) as Variable<unknown[], unknown>;
    return {
      variable,
    };
  },
};
export default option;
