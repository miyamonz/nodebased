import React from "react";
import { RectProp } from "./types";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";

const SliderComponent = ({
  inputAtom,
  rect,
}: {
  inputAtom: PrimitiveAtom<number>;
  rect: RectProp;
}) => {
  const [input, setInput] = useAtom(inputAtom);
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
