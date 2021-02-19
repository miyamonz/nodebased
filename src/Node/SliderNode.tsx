import React from "react";
import { useAtom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { Node } from "./types";
import type { InputSocketNotConnected } from "../Socket/types";

type Props = {
  node: Node;
};
export const SliderNode: React.FC<Props> = ({ node }) => {
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
