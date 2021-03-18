import React from "react";
import { useAtom } from "jotai";
import type { Connection } from "./types";

import { useConnect, useDisconnect } from "./atoms";

function useSocket<T>(connection: Connection<T>) {
  const osocket = connection.from;
  const isocket = connection.to;
  return [osocket, isocket] as const;
}

export const ConnectAtomLogic = ({
  connection,
}: {
  connection: Connection<unknown>;
}) => {
  const setConnect = useConnect();
  const setDisconnect = useDisconnect();
  React.useEffect(() => {
    setConnect(connection);
    return () => {
      setDisconnect(connection);
    };
  }, []);

  return null;
};

const ConnectionLine = <T,>({ connection }: { connection: Connection<T> }) => {
  const [osocket, isocket] = useSocket(connection);

  const [pos] = useAtom(isocket.position);
  const [fromPos] = useAtom(osocket.position);
  const arm = Math.abs(fromPos.x - pos.x) / 3;

  return (
    <>
      {/*
      <line stroke="blue" x1={pos.x} y1={pos.y} x2={fromPos.x} y2={fromPos.y} />
      */}
      <ConnectAtomLogic connection={connection as Connection<unknown>} />
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

export default ConnectionLine;
