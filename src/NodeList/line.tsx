import { atom, useAtom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";

const option: NodeDefinition = {
  name: "line",
  inputs: [
    { type: "number" },
    { type: "number" },
    { type: "number" },
    { type: "number" },
  ],
  outputs: [{ type: "ComponentType" }],
  init: () => {
    const x1 = createAtomRef(atom(0));
    const y1 = createAtomRef(atom(0));
    const x2 = createAtomRef(atom(0));
    const y2 = createAtomRef(atom(0));
    const inputAtoms = [x1, y1, x2, y2];

    const outputAtoms = [
      atom((get) => {
        const x1Atom = get(x1);
        const y1Atom = get(y1);
        const x2Atom = get(x2);
        const y2Atom = get(y2);
        return (props: JSX.IntrinsicElements["line"]) => {
          const [x1] = useAtom(x1Atom);
          const [y1] = useAtom(y1Atom);
          const [x2] = useAtom(x2Atom);
          const [y2] = useAtom(y2Atom);
          return (
            <line
              {...{ x1, y1, x2, y2 }}
              fill="blue"
              stroke="blue"
              {...props}
            />
          );
        };
      }),
    ];
    const variable = {
      inputAtoms: atom(() => inputAtoms),
      outputAtoms: atom(() => outputAtoms),
    };
    return { variable };
  },
};

export default option;
