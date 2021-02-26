import React from "react";
import { atom, useAtom } from "jotai";
import ConnectedLine from "./ConnectedLine";
import { isConnected } from "./types";
import type { InputSocket, OutputSocket } from "./types";
import type { PositionAtom } from "../Position";

type IOCircleProps = {
  positionAtom: PositionAtom;
} & JSX.IntrinsicElements["circle"];
const IOCircle: React.FC<IOCircleProps> = ({ positionAtom, ...props }) => {
  const [position] = useAtom(positionAtom);
  return (
    <circle
      cx={position.x}
      cy={position.y}
      fill="white"
      stroke="blue"
      r={7}
      {...props}
    />
  );
};

export const hoveredInputSocketAtom = atom<InputSocket<unknown> | null>(null);
export const InputCircle = <T,>({ input }: { input: InputSocket<T> }) => {
  const [hovered, setHovered] = useAtom(hoveredInputSocketAtom);
  const isHovered = hovered === input;
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
        fill={isHovered ? "red" : isConnected(input) ? "blue" : "white"}
      />

      {isConnected(input) && <ConnectedLine input={input} />}
    </>
  );
};

export const hoveredOutputSocketAtom = atom<OutputSocket<unknown> | null>(null);
export const OutputCircle = <T,>({ output }: { output: OutputSocket<T> }) => {
  const [hovered, setHovered] = useAtom(hoveredOutputSocketAtom);
  const isHovered = hovered === output;

  return (
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
  );
};
