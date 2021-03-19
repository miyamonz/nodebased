import React from "react";
import { useAtom } from "jotai";
import type { Edge } from "./types";

import { useConnect, useDisconnect } from "./connectionEffect";

function useSocket<T>(edge: Edge<T>) {
  const osocket = edge.from;
  const isocket = edge.to;
  return [osocket, isocket] as const;
}

export const ConnectAtomLogic = ({ edge }: { edge: Edge<unknown> }) => {
  const setConnect = useConnect();
  const setDisconnect = useDisconnect();
  React.useEffect(() => {
    setConnect(edge);
    return () => {
      setDisconnect(edge);
    };
  }, []);

  return null;
};

const EdgeLine = <T,>({ edge }: { edge: Edge<T> }) => {
  const [osocket, isocket] = useSocket(edge);

  const [pos] = useAtom(isocket.position);
  const [fromPos] = useAtom(osocket.position);
  const arm = Math.abs(fromPos.x - pos.x) / 3;

  return (
    <>
      {/*
      <line stroke="blue" x1={pos.x} y1={pos.y} x2={fromPos.x} y2={fromPos.y} />
      */}
      <ConnectAtomLogic edge={edge as Edge<unknown>} />
      <path
        stroke="blue"
        fill="none"
        d={`M ${fromPos.x} ${fromPos.y} C ${fromPos.x + arm} ${fromPos.y}, ${
          pos.x - arm
        } ${pos.y}, ${pos.x} ${pos.y} `}
      />
    </>
  );
};

export default EdgeLine;
