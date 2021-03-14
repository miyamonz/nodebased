import ConnectionLine from "./ConnectionLine";
import type { Connection } from "./types";

const RenderConnectionLines: React.FC<{
  connections: Connection<unknown>[];
}> = ({ connections }) => {
  return (
    <>
      {connections.map((c) => {
        return (
          <ConnectionLine
            key={c.from.atom.toString() + c.to.atom.toString()}
            connection={c}
          />
        );
      })}
    </>
  );
};

export default RenderConnectionLines;
