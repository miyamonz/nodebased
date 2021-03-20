import { useAtomValue } from "jotai/utils";
import type { Graph } from "./types";

import { NodeEffect } from "../Node/effect";
import { EdgeEffect } from "../Edge/effect";

export const useGraphEffect = (graph: Graph) => {
  const nodes = useAtomValue(graph.nodes);
  const edges = useAtomValue(graph.edges);

  nodes.forEach((n) => <NodeEffect node={n} />);
  edges.forEach((e) => <EdgeEffect edge={e} />);
};

export function GraphEffect({ graph }: { graph: Graph }) {
  const nodes = useAtomValue(graph.nodes);
  const edges = useAtomValue(graph.edges);

  return (
    <>
      {nodes.map((n) => (
        <NodeEffect key={n.id} node={n} />
      ))}
      {edges.map((e) => {
        const key = `${e.from.nodeId}-${e.from.name}-${e.to.nodeId}-${e.to.name}`;
        return <EdgeEffect key={key} edge={e} />;
      })}
    </>
  );
}
