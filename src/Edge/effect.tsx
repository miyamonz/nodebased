import { useEffect } from "react";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Edge } from "./types";
import {
  appendConnectQueueAtom,
  appendDisconnectQueueAtom,
} from "../Stream/queue";

export const useEdgeEffect = (edge: Edge<unknown>) => {
  const setConnect = useUpdateAtom(mountEdgeAtom);
  const setDisconnect = useUpdateAtom(unmountEdgeAtom);
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

export const mountEdgeAtom = atom(null, (get, set, edge: Edge<unknown>) => {
  console.log("connect", edge);
  set(appendConnectQueueAtom, edge);
});

export const unmountEdgeAtom = atom(null, (get, set, edge: Edge<unknown>) => {
  console.log("disconnect", edge);
  set(appendDisconnectQueueAtom, edge);
});
