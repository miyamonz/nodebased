import { atom, useAtom } from "jotai";
import type { OutputSocket } from "./types";
import { IOCircle } from "./IOCircle";

export const hoveredOutputSocketAtom = atom<OutputSocket<unknown> | null>(null);
export const OutputCircle = <T,>({ output }: { output: OutputSocket<T> }) => {
  const [hovered, setHovered] = useAtom(hoveredOutputSocketAtom);
  const isHovered = hovered === output;

  return (
    <>
      <IOCircle
        positionAtom={output.position}
        onMouseEnter={() => {
          setHovered(output);
        }}
        onMouseLeave={() => {
          setHovered(null);
        }}
        fill={isHovered ? "red" : "white"}
      />
    </>
  );
};
