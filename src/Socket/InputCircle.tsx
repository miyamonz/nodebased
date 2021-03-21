import { atom, useAtom } from "jotai";
import type { InputSocket, OutputSocket } from "./types";
import { IOCircle } from "./IOCircle";
import EdgeLine from "../Edge/EdgeLine";

export const hoveredInputSocketAtom = atom<InputSocket<unknown> | null>(null);
export const InputCircle = <T,>({ input }: { input: InputSocket<T> }) => {
  const [hovered, setHovered] = useAtom(hoveredInputSocketAtom);
  const isHovered = hovered === input;

  const isConnected = input.from !== undefined;
  return (
    <>
      {input.from !== undefined && (
        <WhenConnected input={input} output={input.from} />
      )}
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

function WhenConnected({
  input,
  output,
}: {
  input: InputSocket<unknown>;
  output: OutputSocket<unknown>;
}) {
  const edge = {
    from: output,
    to: input,
  };
  return <EdgeLine edge={edge} />;
}
