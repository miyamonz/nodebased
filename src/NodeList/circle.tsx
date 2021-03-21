import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";
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
      const xAtom = get(x);
      const yAtom = get(y);
      const rAtom = get(r);
      return (props: JSX.IntrinsicElements["circle"]) => {
        const cx = useAtomValue(xAtom);
        const cy = useAtomValue(yAtom);
        const r = useAtomValue(rAtom);
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
