import { createComponent } from "./Component";
import { atom } from "jotai";

import { createAtomRef } from "../AtomRef";
import type { GraphJSON } from "../Graph";

import type { Variable } from "../Variable";

const option = {
  name: "instantiate",
  init: () => {
    const graphJsonAtom = createAtomRef(
      atom<GraphJSON>({ nodes: [], connections: [] })
    );
    const variable: Variable = {
      inputAtoms: [graphJsonAtom as any],
      outputAtoms: [],
    };
    const component = createComponent(atom((get) => get(get(graphJsonAtom))));
    return { variable, component, saveData: false };
  },
};

export default option;
