import { atom } from "jotai";
import { NodeDefinition } from "./types";
import type { Stream } from "../Stream";

const option: NodeDefinition = {
  name: "circle",
  inputs: [{ type: "number" }, { type: "number" }, { type: "number" }],
  outputs: [{ type: "ComponentType" }],

  init: () => {
    const x = atom(atom(0));
    const y = atom(atom(0));
    const r = atom(atom(10));
    const inputAtoms = [x, y, r];

    const outAtom = atom((get) => {
      const [cx, cy, r] = inputAtoms.map(get).map(get);
      return (props: JSX.IntrinsicElements["circle"]) => {
        return (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="transparent"
            stroke="blue"
            {...props}
          />
        );
      };
    });
    const stream: Stream = {
      inputAtoms: atom(() => inputAtoms as any),
      outputAtoms: atom(() => [outAtom]),
    };
    return { stream };
  },
};

export default option;
