import { useCallback } from "react";
import { atom, useAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { createComponent } from "./GraphNode";
import { removeNode } from "../actions";
import { createNode } from "../Node";
import type { Node } from "../Node";
import { graphToJson } from "../Graph";
import type { GraphView } from "../Graph";

export function useCreateGraphNode() {
  const [, remove] = useAtom(removeNode);

  const callback = useAtomCallback<Node, GraphView>(
    useCallback((get, _set, graph) => {
      const nodes = get(graph.nodes);
      remove(nodes);
      const sum = nodes
        .map((node) => get(node.rect))
        .reduce((acc, rect) => ({ x: acc.x + rect.x, y: acc.y + rect.y }), {
          x: 0,
          y: 0,
        });
      const position = {
        x: sum.x / nodes.length,
        y: sum.y / nodes.length,
      };

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
