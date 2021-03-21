import { useAtomValue } from "jotai/utils";
import type { Graph } from "./types";

import { NodeEffect } from "../Node/effect";

export const useGraphEffect = (graph: Graph) => {
  <GraphEffect graph={graph} />;
};

export function GraphEffect({ graph }: { graph: Graph }) {
  const nodes = useAtomValue(graph.nodes);

  return (
    <>
      {nodes.map((n) => (
        <NodeEffect key={n.id} graph={graph} node={n} />
      ))}
    </>
  );
}
