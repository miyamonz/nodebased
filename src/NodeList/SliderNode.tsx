import React from "react";
import { useAtom } from "jotai";
import type { Atom } from "jotai";
import type { NodeComponent } from "../Node";
import type { InputSocketNotConnected } from "../Socket";

export const SliderNode: NodeComponent = ({ node }) => {
  const isocket = node.inputs[0] as InputSocketNotConnected<number>;
  const [inputAtom] = useAtom(isocket.atom);
  const [, setInput] = useAtom(inputAtom);

  const [num] = useAtom(node.output.atom as Atom<number>);

  const [rect] = useAtom(node.rect);
  return (
    <>
      <foreignObject {...rect} y={rect.y + rect.height}>
        <input
          type="range"
          min={0}
          max={100}
          value={num}
          onChange={(e) => setInput(parseInt(e.target.value, 10))}
        />
      </foreignObject>
    </>
  );
};

export default React.memo(SliderNode);
