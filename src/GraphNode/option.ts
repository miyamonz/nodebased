import { createComponent } from "./Component";
import { atom } from "jotai";
import type { GraphJSON } from "../Graph";
import type { NodeDefinition } from "../NodeList/types";

import { createOneOutputStream } from "../Stream";

const option: NodeDefinition = {
  name: "graph",
  outputs: [{ type: "Json" }],
  init: (args?: { data?: {} }) => {
    const jsonAtom = atom(
      (args?.data ?? { nodes: [], edges: [] }) as GraphJSON
    );
    const stream = createOneOutputStream(jsonAtom);
    const component = createComponent(jsonAtom);
    return { stream, component, toSave: jsonAtom };
  },
};

export default option;
