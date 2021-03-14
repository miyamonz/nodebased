import { createComponent } from "./Component";
import { atom } from "jotai";

import { createAtomRef } from "../AtomRef";
import type { GraphJSON } from "../Graph";

import { createOneInputVariable } from "../Variable";

const option = {
  name: "instantiate",
  init: () => {
    const graphJsonAtom = createAtomRef(
      atom<GraphJSON>({ nodes: [], connections: [] })
    );
    const variable = createOneInputVariable(graphJsonAtom);
    const component = createComponent(atom((get) => get(get(graphJsonAtom))));
    return { variable, component };
  },
};

export default option;
