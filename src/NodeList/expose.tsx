import React, { ReactElement } from "react";
import { atom, useAtom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createMapAtomFromArray, Stream } from "../Stream";
import { NodeComponent } from "../Node";

const inputs = [
  { type: "ReactElement", name: "element" },
  { type: "number", name: "width" },
  { type: "number", name: "height" },
] as const;
const option: NodeDefinition = {
  name: "expose",
  inputs,
  outputs: [{ type: "ReactElement" }, { type: "Size" }],
  init: () => {
    const elmAtomRef = createAtomRef(atom<ReactElement | null>(null));
    const widthAtomRef = createAtomRef(atom(100));
    const heightAtomRef = createAtomRef(atom(100));
    const inputAtoms = [elmAtomRef, widthAtomRef, heightAtomRef];

    const elmAtom = atom((get) => get(get(elmAtomRef)));
    const widthAtom = atom((get) => get(get(widthAtomRef)));
    const heightAtom = atom((get) => get(get(heightAtomRef)));
    const innerSize = atom((get) => {
      const width = get(widthAtom);
      const height = get(heightAtom);
      return { width, height };
    });
    const outAtom = atom((get) => {
      const element = get(elmAtom);
      return React.isValidElement(element) ? React.cloneElement(element) : null;
    });
    const baseAtom = atom((get) => {
      const width = get(widthAtom);
      const height = get(heightAtom);
      return <rect {...{ width, height }} fill="transparent" stroke="black" />;
    });
    const stream: Stream = {
      inputMap: createMapAtomFromArray(
        inputAtoms as any,
        inputs.map((s) => s.name)
      ),
      outputMap: createMapAtomFromArray([outAtom, innerSize]),
    };
    const Render: NodeComponent = ({ node }) => {
      const [element] = useAtom(elmAtom);
      const [base] = useAtom(baseAtom);
      const [height] = useAtom(heightAtom);
      const [rect] = useAtom(node.rect);
      return (
        <g transform={`translate(${rect.x} ${rect.y + rect.height - height})`}>
          {base}
          {element}
        </g>
      );
    };

    return { stream, component: Render, innerSize };
  },
};

export default option;
