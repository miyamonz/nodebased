import React from "react";
import { RectProp } from "./types";
import { useAtom } from "jotai";
import { Atom, PrimitiveAtom } from "jotai";
import type { Node, InputSocket, OutputSocket } from "./atoms";

const SliderComponent = ({
  inputAtom,
  rectAtom,
}: {
  inputAtom: PrimitiveAtom<number>;
  rectAtom: PrimitiveAtom<RectProp>;
}) => {
  const [num, setInput] = useAtom(inputAtom);
  const [rect] = useAtom(rectAtom);
  return (
    <>
      <text {...rect}>{num} </text>
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

const ReactiveComponent = ({
  input,
  rectAtom,
  from,
}: {
  input: InputSocket;
  rectAtom: PrimitiveAtom<RectProp>;
  from: OutputSocket;
}) => {
  const [num] = useAtom(input.atom);
  const [pos] = useAtom(input.position);
  const [rect] = useAtom(rectAtom);
  const [fromPos] = useAtom(from.position);
  return (
    <>
      <text {...rect}>{num}</text>
      <line stroke="blue" x1={pos.x} y1={pos.y} x2={fromPos.x} y2={fromPos.y} />
    </>
  );
};

const SliderNode = ({ node }: { node: Node }) => {
  if (node.input.atom.hasOwnProperty("write")) {
    return (
      <SliderComponent
        inputAtom={node.input.atom as PrimitiveAtom<number>}
        rectAtom={node.rect}
      />
    );
  } else {
    return (
      <ReactiveComponent
        input={node.input}
        rectAtom={node.rect}
        from={node.input.from as OutputSocket}
      />
    );
  }
};

export default SliderNode;
