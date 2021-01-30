import React from "react";
import { useAtom } from "jotai";
import { connectTargetAtom, hoveredInputSocketAtom } from "../atoms";
import type { PositionAtom } from "../atoms";
import type { InputSocket, OutputSocket } from "../Socket";

const IOCircle = ({
  positionAtom,
  ...props
}: {
  positionAtom: PositionAtom;
  [x: string]: any;
}) => {
  const [position] = useAtom(positionAtom);
  return (
    <circle
      {...props}
      cx={position.x}
      cy={position.y}
      fill="white"
      stroke="blue"
      r={7}
    />
  );
};

export const InputCircle = <T extends unknown>({
  input,
}: {
  input: InputSocket<T>;
}) => {
  const [, setHovered] = useAtom(hoveredInputSocketAtom);
  return (
    <IOCircle
      positionAtom={input.position}
      onMouseEnter={() => {
        setHovered(input as InputSocket<unknown>);
      }}
      onMouseLeave={() => {
        setHovered(null);
      }}
    />
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
