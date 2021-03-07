import React from "react";
import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

const option = {
  name: "press",
  init: () => {
    const componentAtom = atom(atom<React.ReactNode | null>(null));
    const inputAtoms = [componentAtom];
    const pressAtom = atom(false);

    const outputAtoms = [
      atom((get) => {
        const componentAtom_ = get(componentAtom);
        return (props: any) => {
          const Component = useAtomValue(componentAtom_);
          const set = useUpdateAtom(pressAtom);

          React.useEffect(() => {
            const handle = () => set(false);
            window.addEventListener("mouseup", handle);
            return () => window.removeEventListener("mouseup", handle);
          }, []);

          const isComponent = (c: unknown): c is React.ComponentType =>
            Component !== null || typeof c !== "function";
          if (!isComponent(Component)) return null;
          return (
            <Component
              {...props}
              onMouseDown={(e: React.MouseEvent<SVGElement>) => {
                set(true);
                props?.onMouseDown?.(e);
              }}
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
