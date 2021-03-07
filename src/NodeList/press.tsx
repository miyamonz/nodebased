import React from "react";
import { atom, useAtom } from "jotai";

const option = {
  name: "press",
  init: () => {
    const componentAtom = atom(atom<React.ReactNode | null>(null));
    const inputAtoms = [componentAtom];
    const pressAtom = atom(false);

    const outputAtoms = [
      atom((get) => {
        const componentAtom_ = get(componentAtom);
        return (props: React.ReactNode) => {
          const [Component] = useAtom(componentAtom_);
          const [, set] = useAtom(pressAtom);

          React.useEffect(() => {
            const handle = () => set(false);
            window.addEventListener("mouseup", handle);
            return () => window.removeEventListener("mouseup", handle);
          }, []);
          if (Component === null || typeof Component !== "function")
            return null;
          return (
            <Component
              onMouseDown={() => set(true)}
              onMouseUp={() => set(false)}
              {...props}
            />
          );
        };
      }),
      pressAtom,
    ];
    const variable = { inputAtoms, outputAtoms };
    return { variable };
  },
};

export default option;
