import { useEffect } from "react";
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
export function EdgeEffect({
  graph,
  edge,
}: {
  graph: Graph;
  edge: Edge<unknown>;
}) {
  useEdgeEffect(graph, edge);
  console.log("edge effect");
  return null;
}

const setConnectAtom = atom(
  null,
  (get, set, [graph, edge]: [Graph, Edge<unknown>]) => {
    console.log("connect", edge);
    const nodes = get(graph.nodes);

    const fromNode = nodes.find((n) => n.id === edge.from.nodeId);
    const toNode = nodes.find((n) => n.id === edge.to.nodeId);
    if (!(fromNode && toNode)) {
      throw new Error("from Node and to node not  found");
    }
    const fromAtom = get(fromNode.stream.outputAtoms)[edge.from.name as number];
    const toAtom = get(toNode.stream.inputAtoms)[edge.to.name as number];

    set(toAtom, fromAtom);
  }
);

const setDisconnectAtom = atom(
  null,
  (get, set, [graph, edge]: [Graph, Edge<unknown>]) => {
    console.log("disconnect", edge);
    const nodes = get(graph.nodes);

    const toNode = nodes.find((n) => n.id === edge.to.nodeId);
    if (!toNode) {
      throw new Error("from Node and to node not  found");
    }
    const toAtom = get(toNode.stream.inputAtoms)[edge.to.name as number];

    set(toAtom, atom(get(get(toAtom))));
  }
);