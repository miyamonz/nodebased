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

  // TODO ここらへんcurrentStream側で吸収したり、nullableなのをなんとかしたい
  const stream: Stream = {
    inputMap: atom((get) => {
      const inputAtoms = get(inletNode).map((node) => {
        const { inputMap } = node.stream;
        const inputAtom = get(inputMap).get(0);
        if (inputAtom === undefined)
          throw new Error("inlet node should contain inputAtom at 0");
        return inputAtom;
      });
      return new Map(inputAtoms.map((anAtom, i) => [i, anAtom]));
    }),
    outputMap: atom((get) => {
      const outputAtoms = get(outletNode).map((node) => {
        const { outputMap } = node.stream;
        const outputAtom = get(outputMap).get(0);
        if (outputAtom === undefined)
          throw new Error("outlet node should contain outputAtom at 0");
        return outputAtom;
      });
      return new Map(outputAtoms.map((anAtom, i) => [i, anAtom]));
    }),
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
      return jsonToGraph(get)(json);
    });
    const stream = createStream(graphAtom);

    const exposedAtom = atom((get) => {
      const exposeNode = get(get(graphAtom).nodes).find(
        (n) => n.name === "expose"
      );
      if (!exposeNode) return null;
      const outputAtom = get(exposeNode.stream.outputMap).get(0);
      if (outputAtom === undefined)
        throw new Error("expose node should contain outputAtom at 0");
      console.log(get(outputAtom));
      return get(outputAtom) as React.ReactElement;
    });

    return {
      stream,
      component: createComponent(jsonAtom, graphAtom, exposedAtom),
      toSave: jsonAtom,
    };
  },
};

export default option;
