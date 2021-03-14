import { useCallback } from "react";
import { useAtomCallback } from "jotai/utils";
import { useRemoveNode } from "../actions";
import { createNodeByName } from "../Node";
import type { Node } from "../Node";
import { graphToJson } from "../Graph";
import type { GraphView } from "../Graph";
import { getCenter } from "../Position";

export function useCreateGraphNode() {
  const remove = useRemoveNode();

  const callback = useAtomCallback<Node, GraphView>(
    useCallback((get, _set, graph) => {
      const nodes = get(graph.nodes);
      const position = getCenter(nodes.map((n) => get(n.rect)));

      const json = graphToJson(get)(graph);
      remove(nodes);
      return createNodeByName({ name: "graph", position, data: json });
    }, [])
  );
  return callback;
}
