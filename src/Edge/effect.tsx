import { useEffect } from "react";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Edge } from "./types";
import { currentStreamsAtom } from "../Stream";

export const useEdgeEffect = (edge: Edge<unknown>) => {
  const setConnect = useUpdateAtom(setConnectAtom);
  const setDisconnect = useUpdateAtom(setDisconnectAtom);
  useEffect(() => {
    setConnect(edge);
    return () => {
      setDisconnect(edge);
    };
  }, []);
};
export function EdgeEffect({ edge }: { edge: Edge<unknown> }) {
  useEdgeEffect(edge);
  return null;
}

const setConnectAtom = atom(null, (get, set, edge: Edge<unknown>) => {
  const streamMap = get(currentStreamsAtom);
  const fromStream = streamMap[edge.from.nodeId];
  const toStream = streamMap[edge.to.nodeId];
  console.log(streamMap, fromStream, toStream);
  const outputAtom = get(streamMap[edge.from.nodeId].outputAtoms)[
    edge.from.name as number
  ];
  const inputAtom = get(streamMap[edge.to.nodeId].inputAtoms)[
    edge.to.name as number
  ];

  console.log("connect", inputAtom.toString(), outputAtom.toString());
  set(inputAtom, outputAtom);
});

const setDisconnectAtom = atom(null, (get, set, edge: Edge<unknown>) => {
  const streamMap = get(currentStreamsAtom);
  console.log("disconnect", streamMap);
  const fromNode = streamMap[edge.from.nodeId];
  // TODO: connectionがunmount時に既にnodeが無いと壊れるのでifで確認してる
  if (fromNode === undefined) return;
  const outputAtom = get(fromNode.outputAtoms)[edge.from.name as number];
  const inputAtom = get(streamMap[edge.to.nodeId].inputAtoms)[
    edge.to.name as number
  ];

  const v = get(outputAtom);
  set(inputAtom, atom(v));
});
