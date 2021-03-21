import { atom } from "jotai";
import type { Atom } from "jotai";
import { createComponent } from "./Component";
import type { GraphJSON } from "../Graph";

import type { Stream } from "../Stream";

import { currentStreamsAtom } from "../Stream";

function createStream(graphAtom: Atom<GraphJSON>) {
  const inletNode = atom((get) =>
    get(graphAtom).nodes.filter((n) => n.name === "inlet")
  );
  const outletNode = atom((get) =>
    get(graphAtom).nodes.filter((n) => n.name === "outlet")
  );

  // TODO ここらへんcurrentStream側で吸収したり、nullableなのをなんとかしたい
  const stream: Stream = {
    inputAtoms: atom((get) => {
      const streamMap = get(currentStreamsAtom);
      return get(inletNode).map((node) => {
        const socket = node.isockets[0];
        const inputAtoms = streamMap[socket.nodeId]?.inputAtoms;
        if (inputAtoms === undefined) return atom(atom(0)) as any;
        return get(inputAtoms)[socket.name as number];
      });
    }),
    outputAtoms: atom((get) => {
      const streamMap = get(currentStreamsAtom);
      return get(outletNode).map((node) => {
        const socket = node.osockets[0];
        const outputAtoms = streamMap[socket.nodeId]?.outputAtoms;
        if (outputAtoms === undefined) return atom(1);
        return get(outputAtoms)[socket.name as number];
      });
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
    const stream = createStream(jsonAtom);
    return {
      stream,
      component: createComponent(jsonAtom),
      toSave: jsonAtom,
    };
  },
};

export default option;
