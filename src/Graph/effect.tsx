import { useAtomValue } from "jotai/utils";
import type { Graph } from "./types";

import { NodeEffect } from "../Node/effect";

export const useGraphEffect = (graph: Graph) => {
  const nodes = useAtomValue(graph.nodes);

  nodes.forEach((n) => <NodeEffect node={n} />);
};

export function GraphEffect({ graph }: { graph: Graph }) {
  const nodes = useAtomValue(graph.nodes);

  return (
    <>
      {nodes.map((n) => (
        <NodeEffect key={n.id} node={n} />
      ))}
    </>
  );
}
