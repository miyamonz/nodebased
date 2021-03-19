import { atom } from "jotai";
import type { Atom } from "jotai";
import { createComponent } from "./Component";
import type { GraphJSON, Graph } from "../Graph";

import type { Stream } from "../Stream";
import { jsonToGraph } from "../Graph";

function createStream(graphAtom: Atom<Graph>) {
  const inletNode = atom((get) =>
    get(get(graphAtom).nodes).filter((n) => n.name === "inlet")
  );
  const outletNode = atom((get) =>
    get(get(graphAtom).nodes).filter((n) => n.name === "outlet")
  );

  const stream: Stream = {
    inputAtoms: atom((get) => get(inletNode).map(() => atom(atom(0)) as any)),
    outputAtoms: atom((get) => get(outletNode).map(() => atom(0))),
  };
  return stream;
}

const option = {
  name: "subGraph",
  inputs: (data: GraphJSON) =>
    data.nodes
      .filter((n) => n.name === "inlet")
      .map((_, i) => ({ type: "input" as const, name: i })),
  outputs: (data: GraphJSON) =>
    data.nodes
      .filter((n) => n.name === "outlet")
      .map((_, i) => ({ type: "output" as const, name: i })),
  init: ({ data = {} }) => {
    const json: GraphJSON = data as GraphJSON;
    const jsonAtom = atom(json);
    const graphAtom = atom((get) => {
      const json = get(jsonAtom);
      console.log("graphAtom", json);

      return jsonToGraph(get)(json);
    });
    const stream = createStream(graphAtom);
    return {
      stream,
      component: createComponent(jsonAtom, graphAtom),
      toSave: jsonAtom,
    };
  },
};

export default option;
