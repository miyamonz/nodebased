import React from "react";
import { atom, useAtom } from "jotai";
import type { InputSocket, OutputSocket } from "./types";
import type { PositionAtom } from "../Position";

import { socketRadiusVariable } from "./variables";

const radiusAtom = atom<number>(
  (get) => get(get(socketRadiusVariable.outputAtoms)[0]) as number
);

type IOCircleProps = {
  positionAtom: PositionAtom;
} & JSX.IntrinsicElements["circle"];
const IOCircle: React.FC<IOCircleProps> = ({ positionAtom, ...props }) => {
  const [position] = useAtom(positionAtom);
  const [r] = useAtom(radiusAtom);
  return (
    <circle
      cx={position.x}
      cy={position.y}
      fill="white"
      stroke="blue"
      r={r}
      {...props}
    />
  );
};

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
