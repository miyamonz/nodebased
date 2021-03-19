import React from "react";
import { atom } from "jotai";
import type { Atom, WritableAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { NodeDefinition } from "./types";
import type { Stream } from "../Stream";

function getComponent(
  componentAtom: Atom<React.ComponentType | null>,
  pressAtom: WritableAtom<boolean, boolean>
) {
  const id = Math.floor(Math.random() * 10 ** 12);
  return (props: any) => {
    const Component = useAtomValue(componentAtom);
    const set = useUpdateAtom(pressAtom);

    React.useEffect(() => {
      const handle = (e: MouseEvent) => {
        const isInside =
          e.target instanceof Element &&
          e.target.closest(`[data-select=${id}]`);
        if (isInside) return;
        set(false);
      };
      window.addEventListener("mousedown", handle);
      return () => window.removeEventListener("mousedown", handle);
    }, []);

    const isComponent = (c: unknown): c is React.ComponentType =>
      Component !== null || typeof c !== "function";
    if (!isComponent(Component)) return null;
    return (
      <Component
        {...props}
        data-select-id={id}
        onMouseDown={(e: React.MouseEvent<Element>) => {
          set(true);
          props?.onMouseDown?.(e);
        }}
      />
    );
  };
}

const option: NodeDefinition = {
  name: "select",
  inputs: [{ type: "ComponentType" }],
  outputs: [{ type: "ComponentType" }],

  init: () => {
    const componentAtom = atom(atom<React.ComponentType | null>(null));
    const pressAtom = atom(false);

    const outputAtoms = [
      atom((get) => {
        const componentAtom_ = get(componentAtom);

        return getComponent(componentAtom_, pressAtom);
      }),
      pressAtom,
    ];
    const stream: Stream = {
      inputAtoms: atom(() => [componentAtom as any]),
      outputAtoms: atom(() => outputAtoms),
    };
    return { stream };
  },
};

export default option;
