import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream";

const option: NodeDefinition = {
  name: "line",
  inputs: [
    { type: "number" },
    { type: "number" },
    { type: "number" },
    { type: "number" },
  ],
  outputs: [{ type: "ReactElement" }],
  init: () => {
    const x1 = createAtomRef(atom(0));
    const y1 = createAtomRef(atom(0));
    const x2 = createAtomRef(atom(0));
    const y2 = createAtomRef(atom(0));
    const inputAtoms = [x1, y1, x2, y2];

    const outputAtoms = [
      atom((get) => {
        const [x1, y1, x2, y2] = inputAtoms.map(get).map(get);
        return <line {...{ x1, y1, x2, y2 }} fill="blue" stroke="blue" />;
      }),
    ];
    const stream: Stream = {
      inputMap: createMapAtomFromArray(inputAtoms as any),
      outputMap: createMapAtomFromArray(outputAtoms),
    };
    return { stream };
  },
};

export default option;
