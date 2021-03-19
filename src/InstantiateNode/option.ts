import { createComponent } from "./Component";
import { atom } from "jotai";

import { createAtomRef } from "../AtomRef";
import type { GraphJSON } from "../Graph";

import { createOneInputStream } from "../Stream";

const option = {
  name: "instantiate",
  inputs: [{ type: "Json" }],
  init: () => {
    const graphJsonAtom = createAtomRef(
      atom<GraphJSON>({ nodes: [], connections: [] })
    );
    const stream = createOneInputStream(graphJsonAtom);
    const component = createComponent(atom((get) => get(get(graphJsonAtom))));
    return { stream, component };
  },
};

export default option;
