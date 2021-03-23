import React, { ReactElement } from "react";
import { atom } from "jotai";
import type { WritableAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { NodeDefinition } from "./types";
import { createMapAtomFromArray, Stream } from "../Stream"

function getElement(
  elem: ReactElement,
  pressAtom: WritableAtom<boolean, boolean>
) {
  const id = Math.floor(Math.random() * 10 ** 5).toString();
  const Component = (props: any) => {
    const set = useUpdateAtom(pressAtom);

    React.useEffect(() => {
      const handle = (e: MouseEvent) => {
        const isInside =
          e.target instanceof Element &&
          e.target.closest(`[data-select-id="${id}"]`);
        if (isInside) return;
        set(false);
      };
      window.addEventListener("mousedown", handle);
      return () => window.removeEventListener("mousedown", handle);
    }, []);

    return React.cloneElement(elem, {
      ...props,
      onMouseDown: (e: React.MouseEvent<Element>) => {
        set(true);
        props?.onMouseDown?.(e);
      },
      "data-select-id": id,
    });
  };

  return <Component />;
}

const option: NodeDefinition = {
  name: "select",
  inputs: [{ type: "ReactElement" }],
  outputs: [{ type: "ReactElement" }, { type: "boolean" }],

  init: () => {
    const elemAtom = atom(atom<React.ReactElement | null>(null));
    const pressAtom = atom(false);

    const outputAtoms = [
      atom((get) => {
        const elem = get(get(elemAtom));
        if (!React.isValidElement(elem)) return null;
        return getElement(elem, pressAtom);
      }),
      pressAtom,
    ];
    const stream: Stream = {
      inputMap: createMapAtomFromArray([elemAtom as any]),
      outputMap: createMapAtomFromArray(outputAtoms),
    };
    return { stream };
  },
};

export default option;
