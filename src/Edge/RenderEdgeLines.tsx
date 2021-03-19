import EdgeLine from "./EdgeLine";
import type { Edge } from "./types";

const RenderEdgeLines: React.FC<{
  edges: Edge<unknown>[];
}> = ({ edges }) => {
  return (
    <>
      {edges.map((c) => {
        const key = [c.from, c.to]
          .map((n) => n.name + n.position.toString())
          .join("-");
        return <EdgeLine key={key} edge={c} />;
      })}
    </>
  );
};

export default RenderEdgeLines;
