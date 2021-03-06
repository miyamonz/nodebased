import { atom, useAtom } from "jotai";
import { createAtomRef } from "../AtomRef";

const option = {
  name: "line",
  init: () => {
    const x1 = createAtomRef(atom(0));
    const y1 = createAtomRef(atom(0));
    const x2 = createAtomRef(atom(0));
    const y2 = createAtomRef(atom(0));
    const inputAtoms = [x1, y1, x2, y2];
    const isDownAtom = atom(false);
    let setter: any;
    isDownAtom.onMount = (set) => {
      setter = set;
    };

    const outputAtoms = [
      atom((get) => {
        const x1Atom = get(x1);
        const y1Atom = get(y1);
        const x2Atom = get(x2);
        const y2Atom = get(y2);
        return ({
          onMouseDown,
          onMouseUp,
          onMouseMove,
        }: JSX.IntrinsicElements["line"]) => {
          const [x1] = useAtom(x1Atom);
          const [y1] = useAtom(y1Atom);
          const [x2] = useAtom(x2Atom);
          const [y2] = useAtom(y2Atom);
          return (
            <line
              {...{ x1, y1, x2, y2 }}
              onMouseDown={(e) => {
                onMouseDown?.(e);
                setter(true);
              }}
              onMouseUp={(e) => {
                onMouseUp?.(e);
                setter(false);
              }}
              onMouseMove={(e) => {
                onMouseMove?.(e);
              }}
              fill="blue"
              stroke="blue"
            />
          );
        };
      }),
      isDownAtom,
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};

export default option;
