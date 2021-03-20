import { atom, useAtom } from "jotai";
import type { InputSocket } from "./types";
import { IOCircle } from "./IOCircle";

export const hoveredInputSocketAtom = atom<InputSocket<unknown> | null>(null);
export const InputCircle = <T,>({ input }: { input: InputSocket<T> }) => {
  const [hovered, setHovered] = useAtom(hoveredInputSocketAtom);
  const isHovered = hovered === input;

  const isConnected = false;
  return (
    <>
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
