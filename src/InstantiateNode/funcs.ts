// @ts-nocheck
import React from "react";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { createNode } from "../Node";
import type { Node } from "../Node";
import type { Graph } from "../Graph";
import type { Position } from "../Position";
import { createMapAtomFromArray, Stream } from "../Stream";

import type { InputSocketJSON, OutputSocketJSON } from "../Socket";

export function useCreateInstanceNode({ position }: { position: Position }) {
  return useAtomCallback<Node, Graph>(
    React.useCallback((get, _set, graph) => {
      const nodes = get(graph.nodes);
      const inletNode = nodes.filter((n) => n.name === "inlet");
      const outletNode = nodes.filter((n) => n.name === "outlet");

      const isockets: InputSocketJSON[] = inletNode.map(
        (n) => get(n.isockets)[0]
      );
      const osockets: OutputSocketJSON[] = outletNode.map(
        (n) => get(n.osockets)[0]
      );

      // TODO: subgraphと同じことする
      const stream: Stream = {};
      return createNode({
        name: "instance",
        position,
        isockets,
        osockets,
        component: () => null,
        stream,
        toSave: undefined,
      });
    }, [])
  );
}
