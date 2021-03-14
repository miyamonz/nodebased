import React from "react";
import { atom, useAtom } from "jotai";
import type { Connection } from "./types";

function useSocket<T>(connection: Connection<T>) {
  const osocket = connection.from;
  const isocket = connection.to;
  return [osocket, isocket] as const;
}

const setConnectionAtom = atom(null, (_get, set, c: Connection<unknown>) => {
  set(c.to.ref, c.from.atom);
});

const ConnectionLine = <T,>({ connection }: { connection: Connection<T> }) => {
  const [osocket, isocket] = useSocket(connection);

  const [, setConnect] = useAtom(setConnectionAtom);
  React.useEffect(() => {
    console.log(connection);
    setConnect(connection as any);
  }, [connection]);

  const [pos] = useAtom(isocket.position);
  const [fromPos] = useAtom(osocket.position);
  const arm = Math.abs(fromPos.x - pos.x) / 3;

  return (
    <>
      {/*
      <line stroke="blue" x1={pos.x} y1={pos.y} x2={fromPos.x} y2={fromPos.y} />
      */}
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
