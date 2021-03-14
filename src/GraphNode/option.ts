import { createComponent } from "./Component";
import { atom } from "jotai";
import type { GraphJSON } from "../Graph";

import { createOneOutputVariable } from "../Variable";

const option = {
  name: "graph",
  init: (args?: { data?: {} }) => {
    const jsonAtom = atom(
      (args?.data ?? { nodes: [], connections: [] }) as GraphJSON
    );
    const variable = createOneOutputVariable(jsonAtom);
    const component = createComponent(jsonAtom);
    return { variable, component, saveData: true };
  },
};

export default option;
