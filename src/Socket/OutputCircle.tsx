import { atom, useAtom } from "jotai";
import type { OutputSocketJSON } from "./types";
import { IOCircle } from "./IOCircle";

export const hoveredOutputSocketAtom = atom<OutputSocketJSON | null>(null);
export const OutputCircle = ({ output }: { output: OutputSocketJSON }) => {
  const [hovered, setHovered] = useAtom(hoveredOutputSocketAtom);
  const isHovered = hovered === output;

  return (
    <>
      <IOCircle
        positionAtom={output._position}
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
