import React from "react";
import { useAtom } from "jotai";
import { connectTargetAtom, hoveredInputSocketAtom } from "../Drag";
import ConnectedLine from "./ConnectedLine";
import { isConnected } from "./types";
import type { InputSocket, OutputSocket } from "./types";
import type { PositionAtom } from "../types";

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

export const InputCircle = <T extends unknown>({
  input,
}: {
  input: InputSocket<T>;
}) => {
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
export const OutputCircle = <T extends unknown>({
  output,
}: {
  output: OutputSocket<T>;
}) => {
  const [, setConnectTarget] = useAtom(connectTargetAtom);

  return (
    <IOCircle
      positionAtom={output.position}
      onMouseDown={() => {
        setConnectTarget(output);
      }}
    />
  );
};
