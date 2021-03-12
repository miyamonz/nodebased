import { useCallback } from "react";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { createComponent } from "./GraphNode";
import { useRemoveNode } from "../actions";
import { createNode } from "../Node";
import type { Node } from "../Node";
import type { Variable } from "../Variable";
import { graphToJson } from "../Graph";
import type { GraphView } from "../Graph";
import { getCenter } from "../Position";

export function useCreateGraphNode() {
  const remove = useRemoveNode();

  const callback = useAtomCallback<Node, GraphView>(
    useCallback((get, _set, graph) => {
      const nodes = get(graph.nodes);
      remove(nodes);
      const position = getCenter(nodes.map((n) => get(n.rect)));

      const json = graphToJson(get)(graph);

      const jsonAtom = atom(json);
      const variable: Variable = {
        inputAtoms: [],
        outputAtoms: [jsonAtom],
      };
      const prop = {
        name: "graph",
        position,
        variable,
        component: createComponent(jsonAtom),
        saveData: true,
      };
      const node = createNode(prop);

      return node;
    }, [])
  );
  return callback;
}
