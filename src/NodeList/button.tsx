import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import type { WritableAtom } from "jotai";
import { NodeDefinition } from "./types";
import { createAtomRef } from "../AtomRef";
import { createStream } from "../Stream";
import type { NodeComponent } from "../Node";

function getComponent(downAtom: WritableAtom<boolean, boolean>) {
  const RenderButtonNode: NodeComponent = ({ node }) => {
    const [rect] = useAtom(node.rect);
    const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    const [isDown, setDown] = useAtom(downAtom);

    const r = useMemo(() => (Math.min(rect.width, rect.height) / 2) * 0.8, [
      rect.width,
      rect.height,
    ]);

    return (
      <>
        <circle
          cx={center.x}
          cy={center.y}
          onMouseDown={() => setDown(true)}
          onMouseUp={() => setDown(false)}
          r={r}
          stroke="blue"
          fill={isDown ? "blue" : "transparent"}
        />
      </>
    );
  };
  return RenderButtonNode;
}

const option: NodeDefinition = {
  name: "button",
  inputs: [{ type: "boolean" }],
  outputs: [{ type: "boolean" }],
  init: () => {
    const input = createAtomRef(atom(false));
    const buttonAtom = atom(false);
    const stream = createStream([input], (input_) => {
      return atom((get) => {
        const [in_] = get(input_);
        return Boolean(in_ || get(buttonAtom));
      });
    });
    const downAtom = atom(
      (get) => get(get(stream.outputAtoms)[0]) as boolean,
      (_get, set, arg: boolean) => set(buttonAtom, arg)
    );
    return {
      component: getComponent(downAtom),
      stream,
    };
  },
};
export default option;
