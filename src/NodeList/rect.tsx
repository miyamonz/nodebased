import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream"

const option: NodeDefinition = {
  name: "rect",
  inputs: [
    { type: "number" },
    { type: "number" },
    { type: "number" },
    { type: "number" },
  ],
  outputs: [{ type: "ReactElement" }],
  init: () => {
    const x = createAtomRef(atom(0));
    const y = createAtomRef(atom(0));
    const width = createAtomRef(atom(10));
    const height = createAtomRef(atom(10));
    const inputAtoms = [x, y, width, height];

    const outputAtoms = [
      atom((get) => {
        const [x, y, width, height] = inputAtoms.map(get).map(get);
        return <rect {...{ x, y, width, height }} fill="blue" />;
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
