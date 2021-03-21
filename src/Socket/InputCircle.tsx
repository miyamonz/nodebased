import { atom, useAtom } from "jotai";
import type { InputSocketJSON, OutputSocketJSON } from "./types";
import { IOCircle } from "./IOCircle";

import { EdgeLine, Edge } from "../Edge";

export const hoveredInputSocketAtom = atom<InputSocketJSON | null>(null);
export const InputCircle = <T,>({ input }: { input: InputSocketJSON }) => {
  const [hovered, setHovered] = useAtom(hoveredInputSocketAtom);
  const isHovered = hovered === input;

  const isConnected = input.from !== undefined;
  return (
    <>
      {input.from !== undefined && (
        <WhenConnected input={input} output={input.from} />
      )}
      <IOCircle
        positionAtom={input._position}
        onMouseEnter={() => {
          setHovered(input as InputSocketJSON);
        }}
        onMouseLeave={() => {
          setHovered(null);
        }}
        fill={isHovered ? "red" : isConnected ? "blue" : "white"}
      />
    </>
  );
};

function WhenConnected({
  input,
  output,
}: {
  input: InputSocketJSON;
  output: OutputSocketJSON;
}) {
  const edge: Edge = {
    from: output,
    to: input,
  };
  return <EdgeLine edge={edge} />;
}
