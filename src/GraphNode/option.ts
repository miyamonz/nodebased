import { createComponent } from "./Component";
import { atom } from "jotai";
import type { GraphJSON } from "../Graph";
import type { NodeDefinition } from "../NodeList/types";

import { createOneOutputVariable } from "../Variable";

const option: NodeDefinition = {
  name: "graph",
  outputs: [{ type: "Json" }],
  init: (args?: { data?: {} }) => {
    const jsonAtom = atom(
      (args?.data ?? { nodes: [], connections: [] }) as GraphJSON
    );
    const variable = createOneOutputVariable(jsonAtom);
    const component = createComponent(jsonAtom);
    return { variable, component, toSave: jsonAtom };
  },
};

export default option;
