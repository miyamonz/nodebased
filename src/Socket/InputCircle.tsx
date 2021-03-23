import { atom, useAtom } from "jotai";
import type { InputSocket } from "./types";
import { IOCircle } from "./IOCircle";
import EdgeLine from "../Edge/EdgeLine";

import { currentEdgesAtom } from "../actions";

export const hoveredInputSocketAtom = atom<InputSocket<unknown> | null>(null);
export const InputCircle = <T,>({ input }: { input: InputSocket<T> }) => {
  const [hovered, setHovered] = useAtom(hoveredInputSocketAtom);
  const isHovered = hovered === input;

  const [edges] = useAtom(currentEdgesAtom);
  const myEdge = edges.find((e) => e.to === input);

  const isConnected = myEdge !== undefined;
  const [position] = useAtom(input.position);
  return (
    <>
      {myEdge && <EdgeLine edge={myEdge} />}
      <IOCircle
        positionAtom={input.position}
        fill={isHovered ? "red" : isConnected ? "lightblue" : "white"}
      />
      <text x={position.x - 4} y={position.y + 4}>
        {typeof input.name !== "number" && input.name}
      </text>
      <IOCircle
        positionAtom={input.position}
        onMouseEnter={() => {
          setHovered(input as InputSocket<unknown>);
        }}
        onMouseLeave={() => {
          setHovered(null);
        }}
        fill="transparent"
      />
    </>
  );
};
