import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream";

const inputs = [
  { type: "number", name: "x" },
  { type: "number", name: "y" },
  { type: "number", name: "width" },
  { type: "number", name: "height" },
] as const;
const outputs = [{ type: "ReactElement" }] as const;

const option: NodeDefinition = {
  name: "rect",
  inputs,
  outputs,

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
      inputMap: createMapAtomFromArray(
        inputAtoms as any,
        inputs.map((s) => s.name)
      ),
      outputMap: createMapAtomFromArray(outputAtoms),
    };
    return { stream };
  },
};

export default option;
