import React from "react";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { createNode } from "../Node";
import type { Node } from "../Node";
import type { Graph } from "../Graph";
import type { Position } from "../Position";
import type { Variable } from "../Variable";

export function useCreateInstanceNode({ position }: { position: Position }) {
  return useAtomCallback<Node, Graph>(
    React.useCallback((get, _set, graph) => {
      const nodes = get(graph.nodes);
      const inletNode = nodes.filter((n) => n.name === "inlet");
      const outletNode = nodes.filter((n) => n.name === "outlet");

      const variable: Variable = {
        inputAtoms: atom((get) => inletNode.map((n) => get(n.isockets)[0].ref)),
        outputAtoms: atom(() => outletNode.map((n) => get(n.osockets)[0].atom)),
      };
      return createNode({
        name: "instance",
        position,
        variable,
        component: () => null,
        toSave: undefined,
      });
    }, [])
  );
}
