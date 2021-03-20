import { useEffect } from "react";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Node } from "./types";
import { nodeOptions } from "../NodeList";
import { appendStreamAtom, removeStreamAtom } from "../Stream";

export const useNodeEffect = (node: Node) => {
  const mount = useUpdateAtom(setConnectAtom);
  const unmount = useUpdateAtom(setDisconnectAtom);
  useEffect(() => {
    mount(node);
    return () => {
      unmount(node);
    };
  }, []);
};

export function NodeEffect({ node }: { node: Node }) {
  useNodeEffect(node);
  return null;
}

const setConnectAtom = atom(null, (_get, set, node: Node) => {
  console.log("add stream");
  const option = nodeOptions.find((option) => option.name === node.name);
  if (option === undefined) throw new Error(`${node.name} not found`);

  const { stream } = node;

  set(appendStreamAtom, [node.id, stream]);
});

const setDisconnectAtom = atom(null, (_get, set, node: Node) => {
  console.log("remove stream");
  set(removeStreamAtom, node.id);
});
