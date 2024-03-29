import React, { useEffect } from "react";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Graph } from "../Graph";
import type { Edge } from "./types";

export const useEdgeEffect = (graph: Graph, edge: Edge<unknown>) => {
  const setConnect = useUpdateAtom(setConnectAtom);
  const setDisconnect = useUpdateAtom(setDisconnectAtom);
  useEffect(() => {
    setConnect([graph, edge]);
    return () => {
      setDisconnect([graph, edge]);
    };
  }, []);
};
const EdgeEffect = ({ graph, edge }: { graph: Graph; edge: Edge<unknown> }) => {
  useEdgeEffect(graph, edge);
  console.log("edge effect");
  return null;
};
const EdgeEffectMemo = React.memo(EdgeEffect);
export { EdgeEffectMemo as EdgeEffect };

const setConnectAtom = atom(
  null,
  (get, set, [graph, edge]: [Graph, Edge<unknown>]) => {
    console.log("connect", edge);
    const nodes = get(graph.nodes);

    const fromNode = nodes.find((n) => n.id === edge.from.nodeId);
    const toNode = nodes.find((n) => n.id === edge.to.nodeId);
    if (!(fromNode && toNode)) {
      throw new Error("from Node and to node not found");
    }
    const fromAtom = get(fromNode.stream.outputMap).get(edge.from.name);
    const toAtom = get(toNode.stream.inputMap).get(edge.to.name);

    if (fromAtom !== undefined && toAtom !== undefined) {
      set(toAtom, fromAtom);
    }
  }
);

const setDisconnectAtom = atom(
  null,
  (get, set, [graph, edge]: [Graph, Edge<unknown>]) => {
    console.log("disconnect", edge);
    const nodes = get(graph.nodes);

    const toNode = nodes.find((n) => n.id === edge.to.nodeId);
    // TODO たぶんnode unmountが先に動いてる
    if (!toNode) {
      return;
    }
    const toAtom = get(toNode.stream.inputMap).get(edge.to.name);

    if (toAtom !== undefined) {
      // TODO: 値を維持するか、socketの型に合わせてdefault値を入れるほうが良さそう
      set(toAtom, atom(null));
    }
  }
);
