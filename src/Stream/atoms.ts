import { atom } from "jotai";
import { queueAtom } from "./queue";

import type { Stream } from "../Stream";
import type { Node } from "../Node";

export const currentStreamsAtom = atom<Record<Node["id"], Stream>>({});
export const appendStreamAtom = atom<null, [Node["id"], Stream]>(
  null,
  (_get, set, [nodeId, stream]) => {
    set(currentStreamsAtom, (prev) => {
      return { ...prev, [nodeId]: stream };
    });
    set(checkConnectAtom, null);
  }
);
export const removeStreamAtom = atom<null, Node["id"]>(
  null,
  async (get, set, nodeId) => {
    set(currentStreamsAtom, (prev) => {
      // remove input connection when remove node
      if (prev[nodeId]) {
        get(prev[nodeId].inputAtoms).forEach((a) => set(a, atom(null)));
        delete prev[nodeId];
      }
      return { ...prev };
    });
    set(checkConnectAtom, null);
  }
);

export const checkConnectAtom = atom(null, async (get, set) => {
  const streamMap = get(currentStreamsAtom);
  const existNodeIds = Object.keys(streamMap);
  const queues = get(queueAtom);
  if (queues.length === 0) {
    console.log("queue is empty");
    return;
  }

  const q = queues[0];
  const existFrom = existNodeIds.includes(q.edge.from.nodeId);
  const existTo = existNodeIds.includes(q.edge.to.nodeId);

  if (q.type === "connect") {
    if (!(existFrom && existTo)) return;
    const oatom = get(streamMap[q.edge.from.nodeId].outputAtoms)[
      q.edge.from.name as number
    ];
    const iatom = get(streamMap[q.edge.to.nodeId].inputAtoms)[
      q.edge.to.name as number
    ];
    set(iatom, oatom);
  }
  if (q.type === "disconnect") {
    const iatom = get(streamMap[q.edge.to.nodeId].inputAtoms)[
      q.edge.to.name as number
    ];
    set(iatom, atom(get(iatom)));
  }
  console.log("check consumed", q, queues.length);
  set(queueAtom, (prev) => prev.filter((queue) => queue.id !== q.id));
});
