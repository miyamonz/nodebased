import React from "react";
import { RectProp } from "./types";
import { useAtom } from "jotai";
import { PrimitiveAtom } from "jotai";
import type { InputAtom } from "./atoms";

const SliderComponent = ({
  inputAtom,
  rectAtom,
}: {
  inputAtom: InputAtom;
  rectAtom: PrimitiveAtom<RectProp>;
}) => {
  const [input, setInput] = useAtom(inputAtom);
  const [rect] = useAtom(rectAtom);
  return (
    <>
      <text {...rect}>{input} </text>
      <foreignObject {...rect} y={rect.y + rect.height}>
        <input
          type="range"
          min={0}
          max={100}
          value={input}
          onChange={(e) => setInput(parseInt(e.target.value, 10))}
        />
      </foreignObject>
    </>
  );
};

export default React.memo(SliderComponent);
