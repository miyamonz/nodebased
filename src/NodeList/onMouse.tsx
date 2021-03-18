import React from "react";
import { atom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import type { WritableAtom } from "jotai";
import { NodeDefinition } from "./types";
import { transformAtom } from "../SVGContext";

const option: NodeDefinition = {
  name: "onMouse",
  inputs: [{ type: "ComponentType" }],
  outputs: [{ type: "ComponentType" }, { type: "Position" }],
  init: () => {
    const componentAtom = atom(atom<React.ReactNode | null>(null));
    const inputAtoms = [componentAtom];
    type Event = React.MouseEvent<SVGElement> | null;
    const eventAtom: WritableAtom<Event, Event> = atom<Event>(null);
    const mouseAtom = atom((get) => {
      const { fn: transform } = get(transformAtom);
      const e = get(eventAtom);
      if (e !== null) return transform(e);
      return { x: 0, y: 0 };
    });

    const outputAtoms = [
      atom((get) => {
        const componentAtom_ = get(componentAtom);
        return (props: any) => {
          const Component = useAtomValue(componentAtom_);
          const set = useUpdateAtom(eventAtom);

          const isComponent = (c: unknown): c is React.ComponentType =>
            Component !== null || typeof c !== "function";
          if (!isComponent(Component)) return null;
          return (
            <Component
              {...props}
              onMouseDown={(e: React.MouseEvent<SVGElement>) => {
                props?.onMouseDown?.(e);
                set(e);
              }}
              onMouseMove={(e: React.MouseEvent<SVGElement>) => {
                props?.onMouseMove?.(e);
                set(e);
              }}
              onMouseUp={(e: React.MouseEvent<SVGElement>) => {
                props?.onMouseUp?.(e);
                set(e);
              }}
            />
          );
        };
      }),
      mouseAtom,
    ];
    const variable = {
      inputAtoms: atom(() => inputAtoms),
      outputAtoms: atom(() => outputAtoms),
    };
    return { variable };
  },
};

export default option;
