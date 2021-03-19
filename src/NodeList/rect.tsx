import { atom } from "jotai";
import { NodeDefinition } from "./types";
import { useAtomValue } from "jotai/utils";
import { createAtomRef } from "../AtomRef";
import { Stream } from "../Stream";

const option: NodeDefinition = {
  name: "rect",
  inputs: [
    { type: "number" },
    { type: "number" },
    { type: "number" },
    { type: "number" },
  ],
  outputs: [{ type: "ComponentType" }],
  init: () => {
    const x = createAtomRef(atom(0));
    const y = createAtomRef(atom(0));
    const width = createAtomRef(atom(10));
    const height = createAtomRef(atom(10));
    const inputAtoms = [x, y, width, height];

    const outputAtoms = [
      atom((get) => {
        const xAtom = get(x);
        const yAtom = get(y);
        const widthAtom = get(width);
        const heightAtom = get(height);
        return (props: JSX.IntrinsicElements["rect"]) => {
          const x = useAtomValue(xAtom);
          const y = useAtomValue(yAtom);
          const width = useAtomValue(widthAtom);
          const height = useAtomValue(heightAtom);
          return <rect {...{ x, y, width, height }} fill="blue" {...props} />;
        };
      }),
    ];
    const stream: Stream = {
      inputAtoms: atom(() => inputAtoms as any),
      outputAtoms: atom(() => outputAtoms),
    };
    return { stream };
  },
};

export default option;
