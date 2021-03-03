import { atom } from "jotai";
import type { Atom } from "jotai";
import { transformAtom } from "../SVGContext";

const option = {
  name: "circle",
  init: () => {
    const x = atom(atom(0));
    const y = atom(atom(0));
    const r = atom(atom(0));
    const inputAtoms = [x, y, r];
    const isDownAtom = atom(false);
    let setter: any;
    isDownAtom.onMount = (set) => {
      setter = set;
    };
    const eventAtom = atom<React.MouseEvent<SVGElement>>(null!);
    let eventSetter: any;
    eventAtom.onMount = (set) => {
      eventSetter = set;
    };
    const mouseAtom = atom((get) => {
      const transform = get(transformAtom);
      const e = get(eventAtom);
      if (e !== null) return transform(e);
      return { x: 0, y: 0 };
    });

    const outputAtoms = [
      atom((get) => {
        const get_ = <T,>(a: Atom<Atom<T>>) => get(get(a));
        return (
          <circle
            cx={get_(x)}
            cy={get_(y)}
            r={get_(r)}
            onMouseDown={(e) => {
              eventSetter(e);
              setter(true);
            }}
            onMouseUp={(e) => {
              eventSetter(e);
              setter(false);
            }}
            onMouseMove={(e) => {
              eventSetter(e);
            }}
            fill="blue"
          />
        );
      }),
      isDownAtom,
      eventAtom,
      mouseAtom,
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};

export default option;
