import { atom, useAtom } from "jotai";
import type { OutputSocket } from "./types";
import { IOCircle } from "./IOCircle";

import { currentEdgesAtom } from "../actions";

export const hoveredOutputSocketAtom = atom<OutputSocket<unknown> | null>(null);
export const OutputCircle = <T,>({ output }: { output: OutputSocket<T> }) => {
  const [hovered, setHovered] = useAtom(hoveredOutputSocketAtom);
  const isHovered = hovered === output;

  const [edges] = useAtom(currentEdgesAtom);
  const myEdge = edges.find((e) => e.from === output);
  const isConnected = myEdge !== undefined;
  const [position] = useAtom(output.position);
  return (
    <>
      <IOCircle
        positionAtom={output.position}
        fill={isHovered ? "red" : isConnected ? "lightblue" : "white"}
      />
      <text x={position.x - 4} y={position.y + 4}>
        {typeof output.name !== "number" && output.name}
      </text>
      <IOCircle
        positionAtom={output.position}
        onMouseEnter={() => {
          setHovered(output);
        }}
        onMouseLeave={() => {
          setHovered(null);
        }}
        fill="transparent"
      />
    </>
  );
};
