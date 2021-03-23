import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { createMapAtomFromArray, Stream } from "../Stream";

const inputs = [
  { type: "number", name: "x" },
  { type: "number", name: "y" },
  { type: "number", name: "r" },
] as const;
const outputs = [{ type: "ReactElement" }] as const;

const option: NodeDefinition = {
  name: "circle",
  inputs,
  outputs,

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
      inputMap: createMapAtomFromArray(
        inputAtoms as any,
        inputs.map((s) => s.name)
      ),
      outputMap: createMapAtomFromArray([outAtom]),
    };
    return { stream };
  },
};

export default option;
