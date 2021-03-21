import { useEffect } from "react";
import { atom } from "jotai";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { Node } from "./types";
import { appendStreamAtom, removeStreamAtom } from "../Stream";
import { EdgeEffect, Edge } from "../Edge";
import { currentEdgesAtom } from "../actions";

export const useNodeEffect = (node: Node) => {
  const mount = useUpdateAtom(mountNodeAtom);
  const unmount = useUpdateAtom(unmountNodeAtom);
  useEffect(() => {
    mount(node);
    return () => {
      unmount(node);
    };
  }, []);
};

export function NodeEffect({ node }: { node: Node }) {
  useNodeEffect(node);
  const [edges] = useAtom(currentEdgesAtom);
  const [inputs] = useAtom(node.isockets);
  return (
    <>
      {inputs
        .map((input) => edges.find((e) => e.to === input))
        .filter((edge): edge is Edge<unknown> => edge !== undefined)
        .map((edge) => {
          return <EdgeEffect edge={edge} />;
        })}
    </>
  );
}

const mountNodeAtom = atom(null, async (_get, set, node: Node) => {
  console.log("add stream");
  // stream
  const { stream } = node;
  set(appendStreamAtom, [node.id, stream]);
});

const unmountNodeAtom = atom(null, (_get, set, node: Node) => {
  // stream
  console.log("remove stream");
  set(removeStreamAtom, node.id);
});
