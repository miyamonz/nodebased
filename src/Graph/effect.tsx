import type { GraphJSON } from "./types";

import { NodeEffect } from "../Node/effect";

export const useGraphEffect = (graph: GraphJSON) => {
  graph.nodes.forEach((n) => <NodeEffect node={n} />);
};

export function GraphEffect({ graph }: { graph: GraphJSON }) {
  const { nodes } = graph;

  return (
    <>
      {nodes.map((n) => (
        <NodeEffect key={n.id} node={n} />
      ))}
    </>
  );
}
