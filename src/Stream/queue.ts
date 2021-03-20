import { atom } from "jotai";
import { checkConnectAtom } from "./atoms";

import type { Edge } from "../Edge";

type Queue = {
  id: string;
  type: "connect" | "disconnect";
  edge: Edge<unknown>;
};

export const queueAtom = atom([] as Queue[]);

const uuid = () => Math.floor(Math.random() * 10 ** 12).toString();

export const appendConnectQueueAtom = atom(
  null,
  (_get, set, edge: Edge<unknown>) => {
    const queue = {
      id: uuid(),
      type: "connect" as const,
      edge,
    };
    set(queueAtom, (prev) => [...prev, queue]);
    set(checkConnectAtom, null);
  }
);
export const appendDisconnectQueueAtom = atom(
  null,
  (_get, set, edge: Edge<unknown>) => {
    const queue = {
      id: uuid(),
      type: "disconnect" as const,
      edge,
    };
    set(queueAtom, (prev) => [...prev, queue]);
    set(checkConnectAtom, null);
  }
);
