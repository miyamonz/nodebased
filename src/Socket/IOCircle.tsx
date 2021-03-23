import React from "react";
import { atom, useAtom } from "jotai";
import type { PositionAtom } from "../Position";

import { socketRadiusStream } from "./streams";

const radiusAtom = atom<number>(
  (get) => get(get(socketRadiusStream.outputMap).get(0) as any) as number
);

type IOCircleProps = {
  positionAtom: PositionAtom;
} & JSX.IntrinsicElements["circle"];
export const IOCircle: React.FC<IOCircleProps> = ({
  positionAtom,
  ...props
}) => {
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
