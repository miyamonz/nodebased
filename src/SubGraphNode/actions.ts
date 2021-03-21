import { useCallback } from "react";
import { useAtomCallback } from "jotai/utils";
import { useRemoveNode } from "../actions";
import { createNodeByName } from "../Node";
import type { NodeJSON } from "../Node";
import type { GraphJSON } from "../Graph";
import { getCenter } from "../Position";

export function useCreateSubGraphNode() {
  const remove = useRemoveNode();

  const callback = useAtomCallback<NodeJSON, GraphJSON>(
    useCallback((get, _set, graph) => {
      const nodes = graph.nodes;
      const position = getCenter(nodes.map((n) => get(n._rect)));

      remove(nodes);
      return createNodeByName({ name: "subGraph", position, data: graph });
    }, [])
  );
  return callback;
}
