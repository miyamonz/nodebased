import { createComponent } from "./Component";
import { atom } from "jotai";
import type { GraphJSON } from "../Graph";

import type { Variable } from "../Variable";

const option = {
  name: "graph",
  init: (args?: { data?: {} }) => {
    const jsonAtom = atom(args?.data as GraphJSON);
    const variable: Variable = {
      inputAtoms: [],
      outputAtoms: [jsonAtom],
    };
    const component = createComponent(jsonAtom);
    return { variable, component, saveData: true };
  },
};

export default option;
