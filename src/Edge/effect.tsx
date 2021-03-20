import { useEffect } from "react";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Edge } from "./types";
import {
  appendConnectQueueAtom,
  appendDisconnectQueueAtom,
} from "../Stream/queue";

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
  console.log("connect", edge);
  set(appendConnectQueueAtom, edge);
});

const setDisconnectAtom = atom(null, (get, set, edge: Edge<unknown>) => {
  console.log("disconnect", edge);
  set(appendDisconnectQueueAtom, edge);
});
