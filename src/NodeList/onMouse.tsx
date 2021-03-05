import React from "react";
import { atom, useAtom } from "jotai";
import { transformAtom } from "../SVGContext";

const option = {
  name: "onMouse",
  init: () => {
    const componentAtom = atom(atom<React.ReactNode | null>(null));
    const inputAtoms = [componentAtom];
    const eventAtom = atom<React.MouseEvent<SVGElement>>(null!);
    const mouseAtom = atom((get) => {
      const { fn: transform } = get(transformAtom);
      const e = get(eventAtom);
      if (e !== null) return transform(e);
      return { x: 0, y: 0 };
    });

    const outputAtoms = [
      atom(() => {
        return (props: React.ReactNode) => {
          const [ca] = useAtom(componentAtom);
          const [Component] = useAtom(ca);
          const [, set] = useAtom(eventAtom);
          if (Component === null || typeof Component !== "function")
            return null;
          return (
            <Component
              onMouseDown={set}
              onMouseMove={set}
              onMouseUp={set}
              {...props}
            />
          );
        };
      }),
      mouseAtom,
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};

export default option;
