import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Edge } from "./types";

const setConnectAtom = atom(
  null,
  (_get, _set, _c: Edge<unknown> | Edge<unknown>[]) => {
    console.log("connect");
    //const conns = Array.isArray(c) ? c : [c];
    //conns.forEach((c) => set(c.to.ref, c.from.atom));
  }
);
export function useConnect() {
  return useUpdateAtom(setConnectAtom);
}

const setDisconnectAtom = atom(
  null,
  (_get, _set, _c: Edge<unknown> | Edge<unknown>[]) => {
    console.log("disconnect");
    //const _conns = Array.isArray(c) ? c : [c];
    //conns.forEach((c) => set(c.to.ref, atom(null)));
  }
);
export function useDisconnect() {
  return useUpdateAtom(setDisconnectAtom);
}
