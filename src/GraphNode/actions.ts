import { useCallback } from "react";
import { atom, useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { createComponent } from "./GraphNode";
import { removeNode } from "../actions";
import { createNode } from "../Node";
import type { Node } from "../Node";
import { graphToJson } from "../Graph";
import type { GraphView } from "../Graph";
import { getCenter } from "../Position";

export function useCreateGraphNode() {
  const [, remove] = useAtom(removeNode);

  const callback = useAtomCallback<Node, GraphView>(
    useCallback((get, _set, graph) => {
      const nodes = get(graph.nodes);
      remove(nodes);
      const position = getCenter(nodes.map((n) => get(n.rect)));

      const json = graphToJson(get)(graph);

      const variable = { inputAtoms: [], outputAtoms: [atom(() => json)] };

      const prop = {
        name: "json",
        position,
        data: json,
      };
      const node = createNode(prop);
      node.component = createComponent(json);

      return node;
    }, [])
  );
  return callback;
}
