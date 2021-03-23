import React, { ReactElement } from "react";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { WritableAtom } from "jotai";
import { NodeDefinition } from "./types";
import { transformAtom } from "../SVGContext";
import { createMapAtomFromArray, Stream } from "../Stream";

const option: NodeDefinition = {
  name: "onMouse",
  inputs: [{ type: "ReactElement" }],
  outputs: [{ type: "ReactElement" }, { type: "Position" }],
  init: () => {
    const elemAtom = atom(atom<ReactElement | null>(null));
    const inputAtoms = [elemAtom];
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
        const elem = get(get(elemAtom));
        if (!React.isValidElement(elem)) return null;
        const Component = () => {
          const set = useUpdateAtom(eventAtom);

          return React.cloneElement(elem, {
            onMouseDown: (e: React.MouseEvent<SVGElement>) => {
              set(e);
            },
            onMouseMove: (e: React.MouseEvent<SVGElement>) => {
              set(e);
            },
            onMouseUp: (e: React.MouseEvent<SVGElement>) => {
              set(e);
            },
          });
        };
        return <Component />;
      }),
      mouseAtom,
    ];
    const stream: Stream = {
      inputMap: createMapAtomFromArray(inputAtoms as any),
      outputMap: createMapAtomFromArray(outputAtoms),
    };
    return { stream };
  },
};

export default option;
