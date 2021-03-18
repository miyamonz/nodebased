import ConnectionLine from "./ConnectionLine";
import type { Connection } from "./types";

const RenderConnectionLines: React.FC<{
  connections: Connection<unknown>[];
}> = ({ connections }) => {
  return (
    <>
      {connections.map((c) => {
        const key = [c.from, c.to]
          .map((n) => n.name + n.position.toString())
          .join("-");
        return <ConnectionLine key={key} connection={c} />;
      })}
    </>
  );
};

export default RenderConnectionLines;
