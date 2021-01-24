import React from "react";
import { RectProp } from "./types";
import { useAtom } from "jotai";
import { Atom, PrimitiveAtom } from "jotai";
import type { Node, InputSocket, OutputSocket } from "./atoms";

import { isPrimitive } from "./util";

const SliderComponent = ({
  inputAtom,
  outputAtom,
  rectAtom,
}: {
  inputAtom: PrimitiveAtom<number>;
  outputAtom: Atom<number>;
  rectAtom: PrimitiveAtom<RectProp>;
}) => {
  const [, setInput] = useAtom(inputAtom);
  const [num] = useAtom(outputAtom);
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
  input: InputSocket<number>;
  rectAtom: PrimitiveAtom<RectProp>;
  from: OutputSocket<number>;
}) => {
  const [inputRef] = useAtom(input.atom);
  const [num] = useAtom(inputRef);

  const [pos] = useAtom(input.position);
  const [rect] = useAtom(rectAtom);
  const [fromPos] = useAtom(from.position);
  const arm = Math.abs(fromPos.x - pos.x) / 3;

  return (
    <>
      <text {...rect}>{num}</text>
      {/*
      <line stroke="blue" x1={pos.x} y1={pos.y} x2={fromPos.x} y2={fromPos.y} />
      */}
      <path
        stroke="blue"
        fill="none"
        d={`M ${fromPos.x} ${fromPos.y} C ${fromPos.x + arm} ${fromPos.y}, ${
          pos.x - arm
        } ${pos.y}, ${pos.x} ${pos.y} `}
      />
    </>
  );
};

const SliderNode = ({ node }: { node: Node<number, number> }) => {
  const [input] = useAtom(node.input.atom);

  if (isPrimitive(input)) {
    return (
      <SliderComponent
        inputAtom={input}
        outputAtom={node.output.atom}
        rectAtom={node.rect}
      />
    );
  } else {
    return (
      <ReactiveComponent
        input={node.input}
        rectAtom={node.rect}
        from={node.input.from as OutputSocket<number>}
      />
    );
  }
};

export default SliderNode;
