import { atom } from "jotai";
import type { Atom } from "jotai";
import { createComponent } from "./Component";
import type { GraphJSON, Graph } from "../Graph";

import type { Variable } from "../Variable";
import { jsonToGraph } from "../Graph";

function createVariable(graphAtom: Atom<Graph>) {
  const inletNode = atom((get) =>
    get(get(graphAtom).nodes).filter((n) => n.name === "inlet")
  );
  const outletNode = atom((get) =>
    get(get(graphAtom).nodes).filter((n) => n.name === "outlet")
  );

  const variable: Variable = {
    inputAtoms: atom((get) =>
      get(inletNode).map((n) => get(n.isockets)[0].ref)
    ),
    outputAtoms: atom((get) =>
      get(outletNode).map((n) => get(n.osockets)[0].atom)
    ),
  };
  return variable;
}

const option = {
  name: "subGraph",
  init: (args?: { data?: {} }) => {
    const json: GraphJSON = args?.data as GraphJSON;
    const jsonAtom = atom(json);
    const graphAtom = atom((get) => jsonToGraph(get)(get(jsonAtom)));
    const variable = createVariable(graphAtom);
    return {
      variable,
      component: createComponent(jsonAtom, graphAtom),
      toSave: jsonAtom,
    };
  },
};

export default option;
