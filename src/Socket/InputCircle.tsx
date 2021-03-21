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
  return (
    <>
      {myEdge && <EdgeLine edge={myEdge} />}
      <IOCircle
        positionAtom={input.position}
        onMouseEnter={() => {
          setHovered(input as InputSocket<unknown>);
        }}
        onMouseLeave={() => {
          setHovered(null);
        }}
        fill={isHovered ? "red" : isConnected ? "blue" : "white"}
      />
    </>
  );
};
