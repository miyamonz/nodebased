import { useAtom } from "jotai";
import { connectionAtom } from "./atoms";
import ConnectionLine from "./ConnectionLine";
import type { Connection } from "./types";

const RenderConnectionLines: React.FC<{
  connections: Connection<unknown>[];
}> = ({ connections }) => {
  return (
    <>
      {connections.map((c) => {
        return <ConnectionLine key={c.to.atom.toString()} connection={c} />;
      })}
    </>
  );
};

export default RenderConnectionLines;
