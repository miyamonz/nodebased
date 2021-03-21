import React from "react";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { createNode } from "../Node";
import type { NodeJSON } from "../Node";
import type { GraphJSON } from "../Graph";
import type { Position } from "../Position";
import type { Stream } from "../Stream";

import type { InputSocketJSON, OutputSocketJSON } from "../Socket";

export function useCreateInstanceNode({ position }: { position: Position }) {
  return useAtomCallback<NodeJSON, GraphJSON>(
    React.useCallback((_get, _set, graph) => {
      const nodes = graph.nodes;
      const inletNode = nodes.filter((n) => n.name === "inlet");
      const outletNode = nodes.filter((n) => n.name === "outlet");

      const isockets: InputSocketJSON[] = inletNode.map((n) => n.isockets[0]);
      const osockets: OutputSocketJSON[] = outletNode.map((n) => n.osockets[0]);

      const stream: Stream = {
        inputAtoms: atom(() => inletNode.map(() => atom(atom(0)) as any)),
        outputAtoms: atom(() => outletNode.map(() => atom(0))),
      };
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
