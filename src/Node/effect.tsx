import { useEffect } from "react";
import { atom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import type { NodeJSON } from "./types";
import { appendStreamAtom, removeStreamAtom } from "../Stream";

import { mountEdgeAtom, unmountEdgeAtom } from "../Edge/effect";

export const useNodeEffect = (node: NodeJSON) => {
  const mount = useUpdateAtom(mountAtom);
  const unmount = useUpdateAtom(unmountAtom);
  useEffect(() => {
    mount(node);
    return () => {
      unmount(node);
    };
  }, []);
};

export function NodeEffect({ node }: { node: NodeJSON }) {
  useNodeEffect(node);
  return null;
}

const mountAtom = atom(null, async (get, set, node: NodeJSON) => {
  console.log("add stream");
  const { stream } = node;
  set(appendStreamAtom, [node.id, stream]);

  node.isockets.map((input) => {
    if (input.from) {
      const edge = {
        from: input.from,
        to: input,
      };
      set(mountEdgeAtom, edge);
    }
  });
});

const unmountAtom = atom(null, (get, set, node: NodeJSON) => {
  console.log("remove stream");
  node.isockets.map((input) => {
    if (input.from) {
      const edge = {
        from: input.from,
        to: input,
      };
      set(unmountEdgeAtom, edge);
    }
  });
  set(removeStreamAtom, node.id);
});
