import { useCallback } from "react";
import { useAtomCallback } from "jotai/utils";
import { useRemoveNode } from "../actions";
import { createNodeByName } from "../Node";
import type { NodeJSON } from "../Node";
import type { GraphView } from "../Graph";
import { getCenter } from "../Position";

export function useCreateGraphNode() {
  const remove = useRemoveNode();

  const callback = useAtomCallback<NodeJSON, GraphView>(
    useCallback((get, _set, graph) => {
      const nodes = graph.nodes;
      const position = getCenter(nodes.map((n) => get(n.rect)));

      remove(nodes);
      return createNodeByName({ name: "graph", position, data: graph });
    }, [])
  );
  return callback;
}
