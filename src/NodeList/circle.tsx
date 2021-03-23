import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createMapAtomFromArray, Stream } from "../Stream";

const option: NodeDefinition = {
  name: "circle",
  inputs: [{ type: "number" }, { type: "number" }, { type: "number" }],
  outputs: [{ type: "ReactElement" }],

  init: () => {
    const x = atom(atom(0));
    const y = atom(atom(0));
    const r = atom(atom(10));
    const inputAtoms = [x, y, r];

    const outAtom = atom((get) => {
      const [cx, cy, r] = inputAtoms.map(get).map(get);
      return <circle {...{ cx, cy, r }} fill="transparent" stroke="blue" />;
    });
    const stream: Stream = {
      inputMap: createMapAtomFromArray(inputAtoms as any),
      outputMap: createMapAtomFromArray([outAtom]),
    };
    return { stream };
  },
};

export default option;
